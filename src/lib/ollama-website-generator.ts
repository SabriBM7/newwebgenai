export interface WebsiteData {
    metadata: {
        title: string
        description: string
        industry: string
        style: string
        primaryColor: string
        secondaryColor: string
    }
    components: Array<{
        type: string
        props: Record<string, any>
    }>
}

export async function generateWebsiteWithOllama(description: string): Promise<WebsiteData> {
    try {
        console.log("Starting Ollama generation for:", description)

        // Create a detailed prompt for Ollama
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

        // Call Ollama API
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3", // Use llama3 model
                prompt: prompt,
                stream: false, // Don't stream the response
            }),
        })

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Received response from Ollama")

        // Extract the JSON from the response
        const text = data.response
        const jsonMatch = text.match(/\{[\s\S]*\}/)

        if (!jsonMatch) {
            console.error("No valid JSON found in Ollama response:", text)
            throw new Error("No valid JSON found in Ollama response")
        }

        try {
            const websiteData = JSON.parse(jsonMatch[0])
            console.log("Successfully parsed JSON response")
            return websiteData as WebsiteData
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError, "Raw text:", text)
            throw new Error("Failed to parse Ollama response as JSON")
        }
    } catch (error) {
        console.error("Error generating website with Ollama:", error)
        throw error
    }
}

// Check if Ollama is available
export async function isOllamaAvailable(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:11434/api/version", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.ok
    } catch (error) {
        console.error("Ollama availability check failed:", error)
        return false
    }
}
