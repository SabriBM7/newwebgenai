import { ollamaService } from "./ollama-service"

interface ComprehensivePromptConfig {
    industry: string
    style: string
    description: string
    websiteName: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

export class EnhancedOllamaIntegration {
    private static generateComprehensivePrompt(config: ComprehensivePromptConfig): string {
        const {
            industry,
            style,
            description,
            websiteName,
            targetAudience,
            businessGoals = [],
            uniqueSellingPoints = [],
        } = config

        return `You are an expert web developer and business analyst. Create a comprehensive website structure for "${websiteName}" in the ${industry} industry.

BUSINESS CONTEXT:
- Business Name: ${websiteName}
- Industry: ${industry}
- Description: ${description}
- Target Audience: ${targetAudience || "General audience"}
- Business Goals: ${businessGoals.length > 0 ? businessGoals.join(", ") : "Not specified"}
- Unique Selling Points: ${uniqueSellingPoints.length > 0 ? uniqueSellingPoints.join(", ") : "Not specified"}
- Design Style: ${style}

REQUIREMENTS:
1. Generate a complete website with 8-12 sections minimum
2. Include industry-specific components and features
3. Create realistic, professional content for each section
4. Ensure the design matches the ${style} style
5. Include interactive elements appropriate for ${industry}

REQUIRED SECTIONS FOR ${industry.toUpperCase()}:
${this.getIndustrySpecificSections(industry)}

STYLE GUIDELINES FOR ${style.toUpperCase()}:
${this.getStyleGuidelines(style)}

OUTPUT FORMAT:
Return a valid JSON object with this exact structure:
{
  "websiteName": "${websiteName}",
  "industry": "${industry}",
  "style": "${style}",
  "components": [
    {
      "type": "Header",
      "props": {
        "websiteName": "${websiteName}",
        "navigation": ["Home", "About", "Services", "Contact"],
        "style": "${style}"
      }
    },
    // ... more components with realistic content
  ]
}

IMPORTANT:
- Each component must have realistic, professional content
- Include at least 8 components
- Use industry-specific terminology and features
- Ensure all content is relevant to ${websiteName}
- Make the website comprehensive and professional`
    }

    private static getIndustrySpecificSections(industry: string): string {
        const sectionMap: Record<string, string> = {
            restaurant: `
- Header with navigation and contact info
- Hero section with restaurant ambiance
- About section with chef/restaurant story
- Menu section with detailed food items
- Gallery section with food and interior photos
- Events section for special occasions
- Testimonials from satisfied customers
- Contact section with location and hours
- Footer with social media and policies`,

            technology: `
- Header with modern navigation
- Hero section with value proposition
- About section with company mission
- Services/Products section with detailed offerings
- Portfolio section with case studies
- Process section showing methodology
- Team section with key personnel
- Testimonials from clients
- Contact section with multiple channels
- Footer with resources and links`,

            healthcare: `
- Header with appointment booking
- Hero section with trust-building message
- About section with practice information
- Services section with medical offerings
- Process section for patient journey
- Team section with doctor profiles
- Testimonials from patients
- Events section for health programs
- Contact section with location and insurance
- Footer with patient resources`,

            default: `
- Header with clear navigation
- Hero section with compelling message
- About section with business story
- Services/Products section
- Features or Benefits section
- Testimonials or Reviews
- Contact section
- Footer with important links`,
        }

        return sectionMap[industry] || sectionMap.default
    }

    private static getStyleGuidelines(style: string): string {
        const styleMap: Record<string, string> = {
            modern: `
- Clean, minimalist design with plenty of white space
- Sans-serif fonts (Inter, Roboto, or similar)
- Subtle shadows and rounded corners
- Gradient accents and modern color schemes
- Grid-based layouts with consistent spacing`,

            professional: `
- Conservative, business-appropriate design
- Traditional typography with clear hierarchy
- Neutral color palette with accent colors
- Structured layouts with clear sections
- Trust-building elements and credentials`,

            creative: `
- Bold, artistic design with unique layouts
- Creative typography and font combinations
- Vibrant colors and artistic elements
- Asymmetrical layouts and creative spacing
- Interactive elements and animations`,

            minimal: `
- Ultra-clean design with maximum white space
- Simple typography with excellent readability
- Monochromatic or very limited color palette
- Focused content with clear hierarchy
- Subtle interactions and clean lines`,

            luxury: `
- Elegant, sophisticated design
- Premium typography (serif or elegant sans-serif)
- Rich color palette with gold/silver accents
- High-quality imagery and refined layouts
- Exclusive feel with premium positioning`,

            default: `
- Clean, professional design
- Good typography and readability
- Balanced color scheme
- Well-organized layout
- User-friendly navigation`,
        }

        return styleMap[style] || styleMap.default
    }

    static async generateComprehensiveWebsite(config: ComprehensivePromptConfig): Promise<any> {
        try {
            const prompt = this.generateComprehensivePrompt(config)

            console.log("🤖 Generating comprehensive website with Ollama...")
            console.log("📝 Using enhanced prompt for:", config.industry, config.style)

            const response = await ollamaService.generateContent(prompt)

            if (!response) {
                throw new Error("No response from Ollama")
            }

            // Parse and validate the response
            const parsedResponse = this.parseAndValidateResponse(response, config)

            console.log("✅ Successfully generated comprehensive website structure")
            console.log("📊 Components generated:", parsedResponse.components?.length || 0)

            return parsedResponse
        } catch (error) {
            console.error("❌ Error in comprehensive Ollama generation:", error)
            throw error
        }
    }

    private static parseAndValidateResponse(response: string, config: ComprehensivePromptConfig): any {
        try {
            // Clean the response to extract JSON
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error("No valid JSON found in response")
            }

            const parsed = JSON.parse(jsonMatch[0])

            // Validate required structure
            if (!parsed.components || !Array.isArray(parsed.components)) {
                throw new Error("Invalid component structure")
            }

            // Ensure minimum component count
            if (parsed.components.length < 6) {
                console.warn("⚠️ Generated fewer components than expected, enhancing...")
                parsed.components = this.enhanceComponentList(parsed.components, config)
            }

            // Add metadata
            parsed.metadata = {
                generatedAt: new Date().toISOString(),
                aiProvider: "ollama-enhanced",
                componentCount: parsed.components.length,
                industry: config.industry,
                style: config.style,
            }

            return parsed
        } catch (error) {
            console.error("❌ Error parsing Ollama response:", error)
            // Return fallback structure
            return this.generateFallbackStructure(config)
        }
    }

    private static enhanceComponentList(components: any[], config: ComprehensivePromptConfig): any[] {
        const requiredComponents = [
            "Header",
            "HeroSection",
            "AboutSection",
            "ServicesSection",
            "FeaturesSection",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ]

        const existingTypes = components.map((c) => c.type)
        const missingComponents = requiredComponents.filter((type) => !existingTypes.includes(type))

        // Add missing components with basic structure
        missingComponents.forEach((type) => {
            components.push({
                type,
                props: this.generateDefaultProps(type, config),
            })
        })

        return components
    }

    private static generateDefaultProps(componentType: string, config: ComprehensivePromptConfig): any {
        const baseProps = {
            websiteName: config.websiteName,
            industry: config.industry,
            style: config.style,
        }

        switch (componentType) {
            case "Header":
                return {
                    ...baseProps,
                    navigation: ["Home", "About", "Services", "Contact"],
                }
            case "HeroSection":
                return {
                    ...baseProps,
                    title: `Welcome to ${config.websiteName}`,
                    subtitle: config.description,
                }
            case "AboutSection":
                return {
                    ...baseProps,
                    title: "About Us",
                    content: `Learn more about ${config.websiteName} and our commitment to excellence.`,
                }
            default:
                return baseProps
        }
    }

    private static generateFallbackStructure(config: ComprehensivePromptConfig): any {
        return {
            websiteName: config.websiteName,
            industry: config.industry,
            style: config.style,
            components: [
                {
                    type: "Header",
                    props: {
                        websiteName: config.websiteName,
                        navigation: ["Home", "About", "Services", "Contact"],
                        style: config.style,
                    },
                },
                {
                    type: "HeroSection",
                    props: {
                        title: `Welcome to ${config.websiteName}`,
                        subtitle: config.description,
                        style: config.style,
                    },
                },
                {
                    type: "AboutSection",
                    props: {
                        title: "About Us",
                        content: `${config.websiteName} is dedicated to providing exceptional ${config.industry} services.`,
                        style: config.style,
                    },
                },
                {
                    type: "ServicesSection",
                    props: {
                        title: "Our Services",
                        services: ["Service 1", "Service 2", "Service 3"],
                        style: config.style,
                    },
                },
                {
                    type: "ContactSection",
                    props: {
                        title: "Contact Us",
                        websiteName: config.websiteName,
                        style: config.style,
                    },
                },
                {
                    type: "Footer",
                    props: {
                        websiteName: config.websiteName,
                        style: config.style,
                    },
                },
            ],
            metadata: {
                generatedAt: new Date().toISOString(),
                aiProvider: "ollama-fallback",
                componentCount: 6,
                industry: config.industry,
                style: config.style,
            },
        }
    }
}
