import { unsplashService } from "./unsplash-service"
import { getIndustryColors } from "./design-system"

interface EnhancedGenerateParams {
    description: string
    websiteName: string
    industry: string
    style: string
    includeImages: boolean
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

export async function generateEnhancedWebsiteWithWizardLM(params: EnhancedGenerateParams) {
    try {
        console.log("🧙‍♂️ Starting enhanced generation...")

        // Step 1: Business Analysis (with fallback)
        const businessAnalysis = await analyzeBusinessWithFallback(params)
        console.log("📊 Business Analysis:", businessAnalysis)

        // Step 2: Generate comprehensive content (with fallback)
        const websiteContent = await generateContentWithFallback(params, businessAnalysis)
        console.log("📝 Generated Content:", websiteContent)

        // Step 3: Generate real images with Unsplash
        const imageAssets = params.includeImages ? await generateRealImages(params, websiteContent) : null
        console.log("🖼️ Generated Images:", imageAssets)

        // Step 4: Build the complete website
        const website = buildEnhancedWebsite(params, businessAnalysis, websiteContent, imageAssets)

        console.log("✅ Enhanced website generation completed!")
        return website
    } catch (error) {
        console.error("❌ Enhanced generation failed:", error)

        // Return a complete fallback website
        return generateCompleteFallbackWebsite(params)
    }
}

async function analyzeBusinessWithFallback(params: EnhancedGenerateParams) {
    // Try WizardLM first, but always fall back to template
    try {
        if (process.env.USE_OLLAMA === "true") {
            return await analyzeBusinessWithWizardLM(params)
        }
    } catch (error) {
        console.log("WizardLM not available, using template analysis")
    }

    return generateFallbackAnalysis(params)
}

async function generateContentWithFallback(params: EnhancedGenerateParams, analysis: any) {
    // Try WizardLM first, but always fall back to template
    try {
        if (process.env.USE_OLLAMA === "true") {
            return await generateComprehensiveContent(params, analysis)
        }
    } catch (error) {
        console.log("WizardLM not available, using template content")
    }

    return generateFallbackContent(params, analysis)
}

async function analyzeBusinessWithWizardLM(params: EnhancedGenerateParams) {
    const analysisPrompt = `You are a business strategy expert. Analyze this business and provide comprehensive insights in valid JSON format:

BUSINESS: ${params.websiteName}
INDUSTRY: ${params.industry}
DESCRIPTION: ${params.description}

Respond with ONLY valid JSON in this exact format:
{
  "businessType": "${params.industry}",
  "targetMarket": {
    "primary": "main target audience",
    "demographics": "age, income, location"
  },
  "valueProposition": {
    "main": "primary value proposition",
    "supporting": ["benefit 1", "benefit 2", "benefit 3"]
  },
  "competitiveAdvantages": ["advantage 1", "advantage 2", "advantage 3"],
  "contentStrategy": {
    "tone": "professional",
    "messaging": "core message",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
}`

    const response = await callWizardLM(analysisPrompt)
    return JSON.parse(response)
}

async function generateComprehensiveContent(params: EnhancedGenerateParams, analysis: any) {
    const contentPrompt = `Generate professional website content for ${params.websiteName} in the ${params.industry} industry.

Respond with ONLY valid JSON in this exact format:
{
  "hero": {
    "headline": "Compelling headline",
    "subheadline": "Supporting text",
    "description": "Brief description",
    "primaryCTA": "Call to action",
    "secondaryCTA": "Secondary action"
  },
  "about": {
    "title": "About ${params.websiteName}",
    "story": "Company story",
    "mission": "Mission statement",
    "values": ["value1", "value2", "value3"]
  },
  "services": {
    "title": "Our Services",
    "subtitle": "What we offer",
    "services": [
      {
        "name": "Service 1",
        "description": "Service description",
        "benefits": ["benefit1", "benefit2"]
      }
    ]
  },
  "features": {
    "title": "Why Choose Us",
    "features": [
      {
        "title": "Feature 1",
        "description": "Feature description",
        "icon": "star"
      }
    ]
  },
  "testimonials": {
    "title": "Customer Reviews",
    "testimonials": [
      {
        "quote": "Great service!",
        "author": "John Doe",
        "role": "Customer",
        "rating": 5
      }
    ]
  },
  "faq": {
    "title": "FAQ",
    "faqs": [
      {
        "question": "Common question?",
        "answer": "Helpful answer"
      }
    ]
  },
  "cta": {
    "title": "Ready to start?",
    "description": "Get in touch today",
    "primaryCTA": "Contact Us",
    "secondaryCTA": "Learn More"
  }
}`

    const response = await callWizardLM(contentPrompt)
    return JSON.parse(response)
}

async function generateRealImages(params: EnhancedGenerateParams, content: any) {
    console.log("🎨 Generating real images with Unsplash...")

    try {
        const images = {
            hero: await unsplashService.getHeroImage(params.industry, params.websiteName),
            gallery: await unsplashService.getIndustryImages(params.industry, 6),
            team: await unsplashService.getTeamImages(4),
            testimonials: await unsplashService.getTestimonialAvatars(3),
            about: unsplashService.generateImageUrl(`${params.industry} business professional office`, 800, 600),
            services: await unsplashService.getIndustryImages(params.industry, 4),
        }

        console.log("✅ Real images generated successfully")
        return images
    } catch (error) {
        console.error("❌ Image generation failed:", error)
        return null
    }
}

function buildEnhancedWebsite(params: EnhancedGenerateParams, analysis: any, content: any, images: any) {
    const colors = getIndustryColors(params.industry)

    const components = [
        // Header
        {
            type: "ModernHeader",
            props: {
                logo: params.websiteName,
                links: generateIndustryNavigation(params.industry),
                ctaButton: {
                    text: content.hero?.primaryCTA || "Get Started",
                    url: "#contact",
                },
                backgroundColor: colors.background,
                textColor: colors.text,
            },
        },

        // Hero Section
        {
            type: "HeroSection",
            props: {
                title: content.hero?.headline || `Welcome to ${params.websiteName}`,
                subtitle: content.hero?.subheadline || `Professional ${params.industry} Services`,
                description: content.hero?.description || `Experience excellence with our ${params.industry} solutions.`,
                primaryButtonText: content.hero?.primaryCTA || "Get Started",
                primaryButtonHref: "#contact",
                secondaryButtonText: content.hero?.secondaryCTA || "Learn More",
                secondaryButtonHref: "#about",
                imageUrl: images?.hero,
                backgroundColor: `bg-gradient-to-r from-blue-600 to-purple-600`,
                textColor: "text-white",
            },
        },

        // Features Section
        {
            type: "FeaturesSection",
            props: {
                title: content.features?.title || "Our Features",
                subtitle: content.features?.subtitle || "What makes us special",
                features: content.features?.features || [
                    { title: "Professional Service", description: "Expert solutions", icon: "star" },
                    { title: "Quality Results", description: "Proven outcomes", icon: "check" },
                    { title: "Customer Support", description: "24/7 assistance", icon: "support" },
                ],
                backgroundColor: colors.surface,
                textColor: colors.text,
            },
        },

        // About Section
        {
            type: "AboutSection",
            props: {
                title: content.about?.title || `About ${params.websiteName}`,
                subtitle: "Our Story",
                content: content.about?.story || `We are a leading ${params.industry} company.`,
                mission: content.about?.mission || "To deliver outstanding results.",
                values: content.about?.values || ["Quality", "Integrity", "Innovation"],
                imageUrl: images?.about,
                backgroundColor: colors.background,
                textColor: colors.text,
            },
        },

        // Services Section
        {
            type: getIndustryServiceComponent(params.industry),
            props: {
                title: content.services?.title || "Our Services",
                subtitle: content.services?.subtitle || "What we offer",
                services: content.services?.services || [
                    {
                        name: "Professional Service",
                        description: "Expert solutions for your needs",
                        benefits: ["Quality", "Reliability"],
                    },
                ],
                backgroundColor: colors.surface,
                textColor: colors.text,
            },
        },

        // Testimonials Section
        {
            type: "TestimonialsSection",
            props: {
                title: content.testimonials?.title || "Customer Reviews",
                subtitle: "What our clients say",
                testimonials: content.testimonials?.testimonials || [
                    {
                        quote: "Excellent service and professional team!",
                        author: "John Smith",
                        role: "Customer",
                        rating: 5,
                        avatar: images?.testimonials?.[0],
                    },
                ],
                backgroundColor: colors.surface,
                textColor: colors.text,
            },
        },

        // FAQ Section
        {
            type: "FAQSection",
            props: {
                title: content.faq?.title || "Frequently Asked Questions",
                subtitle: "Everything you need to know",
                faqs: content.faq?.faqs || [
                    {
                        question: "How do I get started?",
                        answer: "Contact us for a consultation and we'll guide you through the process.",
                    },
                ],
                backgroundColor: colors.background,
                textColor: colors.text,
            },
        },

        // CTA Section
        {
            type: "CTASection",
            props: {
                title: content.cta?.title || "Ready to Get Started?",
                description: content.cta?.description || "Contact us today for a consultation.",
                primaryButton: {
                    text: content.cta?.primaryCTA || "Contact Us",
                    url: "#contact",
                },
                secondaryButton: {
                    text: content.cta?.secondaryCTA || "Learn More",
                    url: "#about",
                },
                backgroundColor: `bg-gradient-to-r from-blue-600 to-purple-600`,
                textColor: "text-white",
            },
        },

        // Contact Section
        {
            type: "ContactSection",
            props: {
                title: "Contact Us",
                subtitle: "Get in touch today",
                phone: "(555) 123-4567",
                email: `info@${params.websiteName.toLowerCase().replace(/\s+/g, "")}.com`,
                address: `123 Business St, ${params.industry} District, City 12345`,
                backgroundColor: colors.surface,
                textColor: colors.text,
            },
        },

        // Footer
        {
            type: "ModernFooter",
            props: {
                logo: params.websiteName,
                tagline: analysis.valueProposition?.main || `Professional ${params.industry} Services`,
                links: generateFooterLinks(params.industry),
                social: [
                    { platform: "facebook", url: "#" },
                    { platform: "twitter", url: "#" },
                    { platform: "instagram", url: "#" },
                    { platform: "linkedin", url: "#" },
                ],
                copyright: `© 2024 ${params.websiteName}. All rights reserved.`,
                backgroundColor: colors.text,
                textColor: colors.background,
            },
        },
    ]

    return {
        metadata: {
            title: `${params.websiteName} - ${analysis.valueProposition?.main || content.hero?.subheadline}`,
            description: content.hero?.description || `Professional ${params.industry} services`,
            industry: params.industry,
            style: params.style,
            primaryColor: colors.primary,
            secondaryColor: colors.secondary,
            aiUsed: "Enhanced Template",
            generatedAt: new Date().toISOString(),
            includeImages: params.includeImages,
            hasRealImages: !!images,
        },
        components,
        isFallback: false,
    }
}

async function callWizardLM(prompt: string): Promise<string> {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "wizardlm2",
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 3000,
            },
        }),
    })

    if (!response.ok) {
        throw new Error(`WizardLM API error: ${response.status}`)
    }

    const data = await response.json()
    return data.response
}

function generateCompleteFallbackWebsite(params: EnhancedGenerateParams) {
    const analysis = generateFallbackAnalysis(params)
    const content = generateFallbackContent(params, analysis)
    const images = null // No images in fallback

    return buildEnhancedWebsite(params, analysis, content, images)
}

// Helper functions
function generateIndustryNavigation(industry: string) {
    const navMap: Record<string, any[]> = {
        restaurant: [
            { text: "Home", url: "#home" },
            { text: "Menu", url: "#menu" },
            { text: "About", url: "#about" },
            { text: "Contact", url: "#contact" },
        ],
        education: [
            { text: "Home", url: "#home" },
            { text: "Courses", url: "#courses" },
            { text: "Faculty", url: "#faculty" },
            { text: "Contact", url: "#contact" },
        ],
        finance: [
            { text: "Home", url: "#home" },
            { text: "Services", url: "#services" },
            { text: "About", url: "#about" },
            { text: "Contact", url: "#contact" },
        ],
    }
    return (
        navMap[industry] || [
            { text: "Home", url: "#home" },
            { text: "Services", url: "#services" },
            { text: "About", url: "#about" },
            { text: "Contact", url: "#contact" },
        ]
    )
}

function getIndustryServiceComponent(industry: string): string {
    const componentMap: Record<string, string> = {
        education: "CourseGrid",
        finance: "ServicePackages",
        restaurant: "MenuSection",
        ecommerce: "ProductGrid",
    }
    return componentMap[industry] || "ServicesSection"
}

function generateFooterLinks(industry: string) {
    return [
        {
            title: "Services",
            items: [
                { text: "Service 1", url: "#service1" },
                { text: "Service 2", url: "#service2" },
                { text: "Service 3", url: "#service3" },
            ],
        },
        {
            title: "Company",
            items: [
                { text: "About", url: "#about" },
                { text: "Contact", url: "#contact" },
                { text: "Careers", url: "#careers" },
            ],
        },
    ]
}

function generateFallbackAnalysis(params: EnhancedGenerateParams) {
    return {
        businessType: params.industry,
        targetMarket: {
            primary: "General consumers and businesses",
            demographics: "Adults 25-65, middle to upper income",
        },
        valueProposition: {
            main: `Professional ${params.industry} services`,
            supporting: ["Quality", "Reliability", "Expertise"],
        },
        competitiveAdvantages: ["Experience", "Customer Service", "Innovation"],
        contentStrategy: {
            tone: "professional",
            messaging: "Excellence in service delivery",
            keywords: [params.industry, "professional", "quality"],
        },
    }
}

function generateFallbackContent(params: EnhancedGenerateParams, analysis: any) {
    return {
        hero: {
            headline: `Welcome to ${params.websiteName}`,
            subheadline: `Professional ${params.industry} Services`,
            description: `Experience excellence with our comprehensive ${params.industry} solutions.`,
            primaryCTA: "Get Started",
            secondaryCTA: "Learn More",
        },
        about: {
            title: `About ${params.websiteName}`,
            story: `We are a leading ${params.industry} company dedicated to providing exceptional service.`,
            mission: "To deliver outstanding results for our clients.",
            values: ["Quality", "Integrity", "Innovation"],
        },
        services: {
            title: "Our Services",
            subtitle: "What we offer",
            services: [
                {
                    name: "Professional Service",
                    description: "Expert solutions for your needs",
                    benefits: ["Quality", "Reliability"],
                },
            ],
        },
        features: {
            title: "Our Features",
            features: [
                { title: "Professional Service", description: "Expert solutions", icon: "star" },
                { title: "Quality Results", description: "Proven outcomes", icon: "check" },
                { title: "Customer Support", description: "24/7 assistance", icon: "support" },
            ],
        },
        testimonials: {
            title: "Customer Reviews",
            testimonials: [{ quote: "Excellent service!", author: "John Doe", role: "Customer", rating: 5 }],
        },
        faq: {
            title: "FAQ",
            faqs: [{ question: "How do I get started?", answer: "Contact us for a consultation." }],
        },
        cta: {
            title: "Ready to Get Started?",
            description: "Contact us today for a consultation.",
            primaryCTA: "Contact Us",
            secondaryCTA: "Learn More",
        },
    }
}
