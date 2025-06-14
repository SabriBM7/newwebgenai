import { ollamaService } from "./ollama-service"
import type { IndustryConfig } from "./industry-config"

export interface ContentGenerationParams {
    websiteName: string
    industry: string
    description: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

export interface GeneratedContent {
    hero: {
        title: string
        subtitle: string
        description: string
        primaryButton: string
        secondaryButton: string
    }
    about: {
        title: string
        content: string
        mission: string
        vision: string
    }
    features: {
        title: string
        subtitle: string
        features: Array<{
            title: string
            description: string
            icon: string
            benefit: string
        }>
    }
    services: {
        title: string
        subtitle: string
        services: Array<{
            title: string
            description: string
            price: string
            features: string[]
            icon: string
        }>
    }
    testimonials: {
        title: string
        subtitle: string
        testimonials: Array<{
            name: string
            role: string
            company: string
            content: string
            rating: number
        }>
    }
    faq: {
        title: string
        subtitle: string
        faqs: Array<{
            question: string
            answer: string
        }>
    }
    cta: {
        title: string
        description: string
        primaryButton: string
        secondaryButton: string
    }
}

export class OllamaContentGenerator {
    private model: string

    constructor(model = "wizardlm2") {
        // WizardLM2 is generally better for structured outputs, but fallback to llama3 if needed
        this.model = model
    }

    /**
     * Generates personalized website content based on user inputs and industry
     */
    async generateWebsiteContent(
        params: ContentGenerationParams,
        industryConfig: IndustryConfig,
    ): Promise<GeneratedContent> {
        try {
            console.log(`🤖 Generating content with Ollama (${this.model}) for website:`, params.websiteName)

            // Check if Ollama is available
            const isAvailable = await ollamaService.checkAvailability()
            if (!isAvailable) {
                console.warn("⚠️ Ollama service unavailable, using fallback content")
                return this.getFallbackContent(params, industryConfig)
            }

            // Generate content for each section separately to improve reliability
            const [heroContent, aboutContent, featuresContent, servicesContent, testimonialsContent, faqContent, ctaContent] =
                await Promise.all([
                    this.generateHeroContent(params),
                    this.generateAboutContent(params),
                    this.generateFeaturesContent(params, industryConfig),
                    this.generateServicesContent(params, industryConfig),
                    this.generateTestimonialsContent(params),
                    this.generateFAQContent(params),
                    this.generateCTAContent(params),
                ])

            console.log("✅ Content generation completed successfully")

            return {
                hero: heroContent,
                about: aboutContent,
                features: featuresContent,
                services: servicesContent,
                testimonials: testimonialsContent,
                faq: faqContent,
                cta: ctaContent,
            }
        } catch (error) {
            console.error("❌ Content generation failed:", error)
            return this.getFallbackContent(params, industryConfig)
        }
    }

    /**
     * Generate hero section content
     */
    private async generateHeroContent(params: ContentGenerationParams): Promise<GeneratedContent["hero"]> {
        const prompt = `
Create a compelling hero section for a website for a ${params.industry} business called "${params.websiteName}".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}

Generate a JSON object with the following structure:
{
  "title": "A compelling headline (5-7 words)",
  "subtitle": "A supporting subheading (8-12 words)",
  "description": "A brief, engaging description (2-3 sentences)",
  "primaryButton": "Primary call-to-action text (2-4 words)",
  "secondaryButton": "Secondary call-to-action text (2-4 words)"
}

Make the content authentic, professional, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("Hero content generation failed:", error)
            return {
                title: `Welcome to ${params.websiteName}`,
                subtitle: `Professional ${params.industry} services tailored to your needs`,
                description: params.description || `We provide high-quality ${params.industry} services to meet your needs.`,
                primaryButton: "Get Started",
                secondaryButton: "Learn More",
            }
        }
    }

    /**
     * Generate about section content
     */
    private async generateAboutContent(params: ContentGenerationParams): Promise<GeneratedContent["about"]> {
        const prompt = `
Create an "About Us" section for a website for a ${params.industry} business called "${params.websiteName}".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}
${
            params.uniqueSellingPoints && params.uniqueSellingPoints.length > 0
                ? `Unique Selling Points: ${params.uniqueSellingPoints.join(", ")}`
                : ""
        }

Generate a JSON object with the following structure:
{
  "title": "About section heading",
  "content": "Detailed about content (3-4 paragraphs)",
  "mission": "Mission statement (1-2 sentences)",
  "vision": "Vision statement (1-2 sentences)"
}

Make the content authentic, professional, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("About content generation failed:", error)
            return {
                title: `About ${params.websiteName}`,
                content: `${params.websiteName} is a leading provider of ${params.industry} services. ${
                    params.description || ""
                }`,
                mission: `Our mission is to provide exceptional ${params.industry} services to our clients.`,
                vision: "We strive to be the industry leader in quality and customer satisfaction.",
            }
        }
    }

    /**
     * Generate features section content
     */
    private async generateFeaturesContent(
        params: ContentGenerationParams,
        industryConfig: IndustryConfig,
    ): Promise<GeneratedContent["features"]> {
        const prompt = `
Create a "Features" or "Why Choose Us" section for a website for a ${params.industry} business called "${
            params.websiteName
        }".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}
${
            params.uniqueSellingPoints && params.uniqueSellingPoints.length > 0
                ? `Unique Selling Points: ${params.uniqueSellingPoints.join(", ")}`
                : ""
        }

Generate a JSON object with the following structure:
{
  "title": "Features section heading",
  "subtitle": "Features section subheading",
  "features": [
    {
      "title": "Feature 1 title (3-5 words)",
      "description": "Feature 1 description (1-2 sentences)",
      "icon": "Suggested icon emoji",
      "benefit": "Key benefit (3-6 words)"
    },
    {
      "title": "Feature 2 title",
      "description": "Feature 2 description",
      "icon": "Suggested icon emoji",
      "benefit": "Key benefit"
    },
    {
      "title": "Feature 3 title",
      "description": "Feature 3 description",
      "icon": "Suggested icon emoji",
      "benefit": "Key benefit"
    }
  ]
}

Make the content authentic, professional, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("Features content generation failed:", error)
            return {
                title: "Why Choose Us",
                subtitle: "What sets us apart",
                features: industryConfig.content.features.slice(0, 3),
            }
        }
    }

    /**
     * Generate services section content
     */
    private async generateServicesContent(
        params: ContentGenerationParams,
        industryConfig: IndustryConfig,
    ): Promise<GeneratedContent["services"]> {
        const prompt = `
Create a "Services" section for a website for a ${params.industry} business called "${params.websiteName}".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}

Generate a JSON object with the following structure:
{
  "title": "Services section heading",
  "subtitle": "Services section subheading",
  "services": [
    {
      "title": "Service 1 name",
      "description": "Service 1 description (1-2 sentences)",
      "price": "Service 1 pricing information",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "icon": "Suggested icon emoji"
    },
    {
      "title": "Service 2 name",
      "description": "Service 2 description",
      "price": "Service 2 pricing information",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "icon": "Suggested icon emoji"
    },
    {
      "title": "Service 3 name",
      "description": "Service 3 description",
      "price": "Service 3 pricing information",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "icon": "Suggested icon emoji"
    }
  ]
}

Make the content authentic, professional, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("Services content generation failed:", error)
            return {
                title: "Our Services",
                subtitle: "What we offer",
                services: industryConfig.content.services.slice(0, 3),
            }
        }
    }

    /**
     * Generate testimonials section content
     */
    private async generateTestimonialsContent(
        params: ContentGenerationParams,
    ): Promise<GeneratedContent["testimonials"]> {
        const prompt = `
Create realistic testimonials for a website for a ${params.industry} business called "${params.websiteName}".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}

Generate a JSON object with the following structure:
{
  "title": "Testimonials section heading",
  "subtitle": "Testimonials section subheading",
  "testimonials": [
    {
      "name": "Realistic person name",
      "role": "Customer role/title",
      "company": "Company name if applicable",
      "content": "Realistic testimonial content (2-3 sentences)",
      "rating": 5
    },
    {
      "name": "Realistic person name",
      "role": "Customer role/title",
      "company": "Company name if applicable",
      "content": "Realistic testimonial content",
      "rating": 5
    }
  ]
}

Make the testimonials authentic, believable, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("Testimonials content generation failed:", error)
            return {
                title: "What Our Clients Say",
                subtitle: "Testimonials from satisfied customers",
                testimonials: [
                    {
                        name: "John Smith",
                        role: "Customer",
                        company: "",
                        content: `I've been extremely satisfied with the services provided by ${params.websiteName}. Their team is professional and delivers excellent results.`,
                        rating: 5,
                    },
                    {
                        name: "Jane Doe",
                        role: "Client",
                        company: "ABC Company",
                        content: `Working with ${params.websiteName} has been a great experience. They understand our needs and consistently exceed our expectations.`,
                        rating: 5,
                    },
                ],
            }
        }
    }

    /**
     * Generate FAQ section content
     */
    private async generateFAQContent(params: ContentGenerationParams): Promise<GeneratedContent["faq"]> {
        const prompt = `
Create a FAQ (Frequently Asked Questions) section for a website for a ${params.industry} business called "${
            params.websiteName
        }".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}

Generate a JSON object with the following structure:
{
  "title": "FAQ section heading",
  "subtitle": "FAQ section subheading",
  "faqs": [
    {
      "question": "Common question about the business",
      "answer": "Detailed, helpful answer (2-3 sentences)"
    },
    {
      "question": "Another common question",
      "answer": "Detailed, helpful answer"
    },
    {
      "question": "Another common question",
      "answer": "Detailed, helpful answer"
    },
    {
      "question": "Another common question",
      "answer": "Detailed, helpful answer"
    }
  ]
}

Make the questions and answers authentic, helpful, and specific to ${params.websiteName} and the ${
            params.industry
        } industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("FAQ content generation failed:", error)
            return {
                title: "Frequently Asked Questions",
                subtitle: "Common questions about our services",
                faqs: [
                    {
                        question: `What services does ${params.websiteName} offer?`,
                        answer: `We offer a comprehensive range of ${params.industry} services tailored to meet your specific needs.`,
                    },
                    {
                        question: "How can I get started?",
                        answer:
                            "Contact us today for a consultation to discuss your requirements and how we can help you achieve your goals.",
                    },
                    {
                        question: "What makes your services unique?",
                        answer: `Our team of experienced professionals, commitment to quality, and personalized approach make ${params.websiteName} the ideal choice for your ${params.industry} needs.`,
                    },
                ],
            }
        }
    }

    /**
     * Generate CTA section content
     */
    private async generateCTAContent(params: ContentGenerationParams): Promise<GeneratedContent["cta"]> {
        const prompt = `
Create a Call-to-Action (CTA) section for a website for a ${params.industry} business called "${params.websiteName}".

Business Description: ${params.description}
${params.targetAudience ? `Target Audience: ${params.targetAudience}` : ""}

Generate a JSON object with the following structure:
{
  "title": "Call to action heading (5-8 words)",
  "description": "Compelling CTA description (1-2 sentences)",
  "primaryButton": "Primary button text (2-4 words)",
  "secondaryButton": "Secondary button text (2-4 words)"
}

Make the content compelling, action-oriented, and specific to ${params.websiteName} and the ${params.industry} industry.
`

        try {
            const response = await ollamaService.generateCompletion(prompt, {
                model: this.model,
                temperature: 0.7,
            })

            // Extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }

            throw new Error("Could not extract JSON from response")
        } catch (error) {
            console.error("CTA content generation failed:", error)
            return {
                title: "Ready to Get Started?",
                description: `Contact ${params.websiteName} today to learn how we can help you achieve your goals.`,
                primaryButton: "Contact Us",
                secondaryButton: "Learn More",
            }
        }
    }

    /**
     * Provides fallback content based on industry templates if AI generation fails
     */
    private getFallbackContent(params: ContentGenerationParams, industryConfig: IndustryConfig): GeneratedContent {
        console.log("⚠️ Using fallback content templates for", params.industry)

        // Use the industry templates from the config
        const { content } = industryConfig

        return {
            hero: {
                title: content.heroTitles[0].replace(/\{\{name\}\}/g, params.websiteName),
                subtitle: content.taglines[0],
                description: params.description || `Professional ${industryConfig.displayName.toLowerCase()} services.`,
                primaryButton: "Get Started",
                secondaryButton: "Learn More",
            },
            about: {
                title: `About ${params.websiteName}`,
                content: `${params.websiteName} is a leading provider of ${industryConfig.displayName.toLowerCase()} services. ${
                    params.description || ""
                }`,
                mission: `Our mission is to provide exceptional ${industryConfig.displayName.toLowerCase()} services to our clients.`,
                vision: "We strive to be the industry leader in quality and customer satisfaction.",
            },
            features: {
                title: "Why Choose Us",
                subtitle: "What sets us apart",
                features: content.features.slice(0, 3),
            },
            services: {
                title: "Our Services",
                subtitle: "What we offer",
                services: content.services.slice(0, 3),
            },
            testimonials: {
                title: "What Our Clients Say",
                subtitle: "Testimonials from satisfied customers",
                testimonials: content.testimonials.slice(0, 2),
            },
            faq: {
                title: "Frequently Asked Questions",
                subtitle: "Common questions about our services",
                faqs: [
                    {
                        question: `What services does ${params.websiteName} offer?`,
                        answer: `We offer a comprehensive range of ${industryConfig.displayName.toLowerCase()} services tailored to meet your specific needs.`,
                    },
                    {
                        question: "How can I get started?",
                        answer:
                            "Contact us today for a consultation to discuss your requirements and how we can help you achieve your goals.",
                    },
                    {
                        question: "What makes your services unique?",
                        answer: `Our team of experienced professionals, commitment to quality, and personalized approach make ${params.websiteName} the ideal choice for your ${industryConfig.displayName.toLowerCase()} needs.`,
                    },
                ],
            },
            cta: {
                title: "Ready to Get Started?",
                description: `Contact ${params.websiteName} today to learn how we can help you achieve your goals.`,
                primaryButton: "Contact Us",
                secondaryButton: "Learn More",
            },
        }
    }
}

// Create a singleton instance with WizardLM2 as the default model
export const ollamaContentGenerator = new OllamaContentGenerator(process.env.OLLAMA_MODEL || "wizardlm2")
