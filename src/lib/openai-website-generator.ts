import { getThemeByIndustry } from "./theme-system-enhanced"

export interface WebsiteData {
    metadata: {
        title: string
        description: string
        industry: string
        style: string
        primaryColor: string
        secondaryColor: string
        themeId?: string
    }
    components: Array<{
        type: string
        props: Record<string, any>
    }>
    isFallback?: boolean
    fallbackReason?: string
}

export async function generateWebsiteWithOpenAI(description: string): Promise<WebsiteData> {
    try {
        console.log("Starting OpenAI generation for:", description)

        // Create a detailed prompt for OpenAI
        const prompt = `
You are a professional web designer. Based on the following description, generate a complete website structure with specific React component props.

Description: "${description}"

Generate a JSON response with this exact structure:

{
  "metadata": {
    "title": "Website title based on description",
    "description": "SEO description",
    "industry": "detected industry (e.g., technology, healthcare, restaurant, etc.)",
    "style": "design style (modern, minimal, corporate, vibrant, playful)",
    "primaryColor": "#hexcolor",
    "secondaryColor": "#hexcolor"
  },
  "components": [
    {
      "type": "ModernHeader",
      "props": {
        "logo": "Company Name",
        "navigation": [
          {"label": "Home", "href": "#"},
          {"label": "About", "href": "#about"},
          {"label": "Services", "href": "#services"},
          {"label": "Contact", "href": "#contact"}
        ],
        "ctaText": "Get Started",
        "ctaHref": "#cta",
        "backgroundColor": "bg-white",
        "textColor": "text-gray-900"
      }
    },
    {
      "type": "HeroSection",
      "props": {
        "title": "Compelling headline based on description",
        "subtitle": "Supporting subtitle",
        "description": "Detailed description paragraph",
        "primaryButtonText": "Primary CTA",
        "primaryButtonHref": "#cta",
        "secondaryButtonText": "Secondary CTA",
        "secondaryButtonHref": "#about",
        "backgroundColor": "bg-gradient-to-r from-blue-600 to-purple-600",
        "textColor": "text-white",
        "layout": "centered"
      }
    }
  ]
}

Available component types:
- ModernHeader: Navigation header with logo, links, and CTA
- HeroSection: Main hero section with title, description, and buttons
- FeaturesGrid: Grid of features with icons and descriptions
- TestimonialsSection: Customer testimonials with ratings and avatars
- TeamSection: Team members with photos, roles, and social links
- PricingSection: Pricing plans with features and CTAs
- ContactSection: Contact information and form
- GallerySection: Image gallery with optional captions
- FAQSection: Frequently asked questions in accordion or grid format
- CTASection: Call-to-action section with buttons
- ModernFooter: Footer with links, social media, and contact info

Important guidelines:
1. Make the content specific to the description provided
2. Choose appropriate colors based on the industry
3. Include 4-7 components that make sense for the website type
4. Use appropriate icons from: zap, shield, users, lightbulb, star, check
5. Make sure all text is professional and industry-appropriate
6. Return ONLY the JSON, no additional text

Generate the website now:
`

        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional web designer who creates JSON structures for websites.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.7,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`OpenAI API error: ${response.status} ${JSON.stringify(errorData)}`)
        }

        const data = await response.json()
        console.log("Received response from OpenAI")

        // Extract the JSON from the response
        const text = data.choices[0].message.content
        const jsonMatch = text.match(/\{[\s\S]*\}/)

        if (!jsonMatch) {
            console.error("No valid JSON found in OpenAI response:", text)
            throw new Error("No valid JSON found in OpenAI response")
        }

        try {
            const websiteData = JSON.parse(jsonMatch[0]) as WebsiteData

            // Enhance the website data with theme information
            if (websiteData.metadata.industry) {
                const theme = getThemeByIndustry(websiteData.metadata.industry)
                websiteData.metadata.themeId = theme.id

                // Apply theme to components if they don't have explicit styling
                websiteData.components = websiteData.components.map((component) => {
                    // Only apply default theme styling if not explicitly set
                    if (!component.props.backgroundColor && !component.props.textColor) {
                        if (component.type === "ModernHeader") {
                            component.props.backgroundColor = "bg-white"
                            component.props.textColor = "text-gray-900"
                        } else if (component.type === "HeroSection") {
                            component.props.backgroundColor = `bg-gradient-to-r from-${theme.id === "tech-startup" ? "indigo" : "blue"}-600 to-${theme.id === "creative" ? "pink" : "purple"}-600`
                            component.props.textColor = "text-white"
                        } else if (component.type === "FeaturesGrid") {
                            component.props.backgroundColor = "bg-gray-50"
                            component.props.textColor = "text-gray-900"
                        } else if (component.type === "TestimonialsSection") {
                            component.props.backgroundColor = "bg-white"
                            component.props.textColor = "text-gray-900"
                        } else if (component.type === "CTASection") {
                            component.props.backgroundColor = `bg-${theme.id === "tech-startup" ? "indigo" : theme.id === "ecommerce" ? "green" : "blue"}-600`
                            component.props.textColor = "text-white"
                        } else if (component.type === "ModernFooter") {
                            component.props.backgroundColor = "bg-gray-900"
                            component.props.textColor = "text-white"
                        }
                    }
                    return component
                })
            }

            console.log("Successfully parsed and enhanced JSON response")
            return websiteData
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError, "Raw text:", text)
            throw new Error("Failed to parse OpenAI response as JSON")
        }
    } catch (error) {
        console.error("Error generating website with OpenAI:", error)
        throw error
    }
}

// Check if OpenAI API key is available
export function isOpenAIAvailable(): boolean {
    return !!process.env.OPENAI_API_KEY
}
