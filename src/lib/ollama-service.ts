// Enhanced Ollama service with better error handling and fallbacks

interface OllamaOptions {
    model?: string
    prompt: string
    temperature?: number
    maxTokens?: number
    stream?: boolean
}

interface OllamaResponse {
    response: string
    done: boolean
}

export class OllamaService {
    private baseUrl: string
    private defaultModel: string
    private isAvailable = false
    private lastChecked = 0
    private checkInterval = 60000 // 1 minute
    private availableModels: string[] = []

    constructor(baseUrl = "http://localhost:11434", defaultModel = "llama3:latest") {
        this.baseUrl = baseUrl
        this.defaultModel = defaultModel
    }

    async checkAvailability(): Promise<boolean> {
        // Only check availability if we haven't checked recently
        const now = Date.now()
        if (now - this.lastChecked < this.checkInterval) {
            return this.isAvailable
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // Add a short timeout to prevent long waits
                signal: AbortSignal.timeout(3000),
            })

            this.isAvailable = response.ok
            this.lastChecked = now

            if (response.ok) {
                const data = await response.json()
                this.availableModels = data.models?.map((model: any) => model.name) || []
                console.log("✅ Ollama is available with models:", this.availableModels)

                // If default model isn't available, use the first available one
                if (!this.availableModels.includes(this.defaultModel) && this.availableModels.length > 0) {
                    this.defaultModel = this.availableModels[0]
                    console.log(`🔄 Switched to available model: ${this.defaultModel}`)
                }
            } else {
                console.log(`❌ Ollama check failed: ${response.status}`)
            }

            return this.isAvailable
        } catch (error) {
            console.error("❌ Ollama availability check error:", error)
            this.isAvailable = false
            this.lastChecked = now
            return false
        }
    }

    async getModels(): Promise<string[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status}`)
            }

            const data = await response.json()
            const models = data.models?.map((model: any) => model.name) || []
            this.availableModels = models
            return models
        } catch (error) {
            console.error("Error getting Ollama models:", error)
            return []
        }
    }

    getBestAvailableModel(): string {
        // Prefer llama3 models, then wizardlm2, then any available
        const preferredOrder = ["llama3:latest", "llama3:8b", "wizardlm2:latest", "llama2:latest", "llama2"]

        for (const preferred of preferredOrder) {
            if (this.availableModels.includes(preferred)) {
                return preferred
            }
        }

        // If none of the preferred models are available, use the first one
        return this.availableModels[0] || this.defaultModel
    }

    async generate(options: OllamaOptions): Promise<string> {
        // First check if Ollama is available
        const available = await this.checkAvailability()
        if (!available) {
            throw new Error("Ollama service is not available")
        }

        // Use the best available model if none specified
        const modelToUse = options.model || this.getBestAvailableModel()

        try {
            console.log(`🤖 Generating with Ollama model: ${modelToUse}`)

            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: modelToUse,
                    prompt: options.prompt,
                    stream: options.stream || false,
                    options: {
                        temperature: options.temperature || 0.7,
                        num_predict: options.maxTokens || 4000,
                    },
                }),
            })

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status} - Model: ${modelToUse}`)
            }

            const data = await response.json()
            console.log(`✅ Successfully generated content with ${modelToUse}`)
            return data.response
        } catch (error) {
            console.error("Error generating with Ollama:", error)
            throw error
        }
    }

    async generateWebsiteContent(params: {
        industry: string
        style: string
        description: string
        websiteName: string
    }): Promise<any> {
        const prompt = `You are a professional web designer. Create a COMPREHENSIVE website structure for a ${params.industry} business with EXACTLY 9 components.

Business Details:
- Name: "${params.websiteName}"
- Industry: ${params.industry}
- Style: ${params.style}
- Description: ${params.description}

IMPORTANT: You MUST generate EXACTLY these 9 components in this order:
1. Header
2. HeroSection
3. AboutSection
4. FeaturesSection
5. MenuSection (or ServicesSection for non-restaurants)
6. GallerySection
7. TestimonialsSection
8. ContactSection
9. Footer

Generate a JSON response with this EXACT structure (no additional text, just valid JSON):

{
  "components": [
    {
      "type": "Header",
      "props": {
        "logo": "${params.websiteName}",
        "menu": [
          {"label": "Home", "link": "#home"},
          {"label": "About", "link": "#about"},
          {"label": "Services", "link": "#services"},
          {"label": "Gallery", "link": "#gallery"},
          {"label": "Contact", "link": "#contact"}
        ],
        "buttonText": "Get Started",
        "buttonLink": "#contact"
      }
    },
    {
      "type": "HeroSection", 
      "props": {
        "title": "Welcome to ${params.websiteName}",
        "subtitle": "Professional ${params.industry} Services",
        "description": "${params.description}",
        "buttonText": "Learn More",
        "buttonLink": "#about",
        "image": "/placeholder.svg?height=600&width=800&text=Hero+Image"
      }
    },
    {
      "type": "AboutSection",
      "props": {
        "title": "About ${params.websiteName}",
        "subtitle": "Our Story",
        "description": "Learn about our journey and what makes ${params.websiteName} special in the ${params.industry} industry.",
        "image": "/placeholder.svg?height=400&width=600&text=About+Image",
        "stats": [
          {"number": "10+", "label": "Years Experience"},
          {"number": "500+", "label": "Happy Clients"},
          {"number": "100%", "label": "Satisfaction"},
          {"number": "24/7", "label": "Support"}
        ]
      }
    },
    {
      "type": "FeaturesSection",
      "props": {
        "title": "Why Choose Us",
        "subtitle": "What makes us different",
        "features": [
          {
            "title": "Quality Service",
            "description": "We provide top-quality service",
            "icon": "⭐"
          },
          {
            "title": "Expert Team", 
            "description": "Our experienced professionals",
            "icon": "👥"
          },
          {
            "title": "Fast Delivery",
            "description": "Quick and efficient service",
            "icon": "🚀"
          },
          {
            "title": "24/7 Support",
            "description": "Always here to help",
            "icon": "🛟"
          }
        ]
      }
    },
    {
      "type": "${params.industry === 'restaurant' ? 'MenuSection' : 'ServicesSection'}",
      "props": {
        "title": "${params.industry === 'restaurant' ? 'Our Menu' : 'Our Services'}",
        "subtitle": "${params.industry === 'restaurant' ? 'Delicious offerings' : 'What we offer'}",
        "items": [
          {
            "name": "Service 1",
            "description": "Description of our first service",
            "price": "$99",
            "image": "/placeholder.svg?height=200&width=300&text=Service+1"
          },
          {
            "name": "Service 2",
            "description": "Description of our second service",
            "price": "$149",
            "image": "/placeholder.svg?height=200&width=300&text=Service+2"
          },
          {
            "name": "Service 3",
            "description": "Description of our third service",
            "price": "$199",
            "image": "/placeholder.svg?height=200&width=300&text=Service+3"
          }
        ]
      }
    },
    {
      "type": "GallerySection",
      "props": {
        "title": "Gallery",
        "subtitle": "See our work",
        "images": [
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+1", "alt": "Gallery Image 1"},
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+2", "alt": "Gallery Image 2"},
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+3", "alt": "Gallery Image 3"},
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+4", "alt": "Gallery Image 4"},
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+5", "alt": "Gallery Image 5"},
          {"src": "/placeholder.svg?height=300&width=400&text=Gallery+6", "alt": "Gallery Image 6"}
        ]
      }
    },
    {
      "type": "TestimonialsSection",
      "props": {
        "title": "What Our Customers Say",
        "subtitle": "Customer Reviews",
        "testimonials": [
          {
            "name": "John Doe",
            "role": "Happy Customer",
            "content": "Excellent service and quality. Highly recommended!",
            "rating": 5,
            "image": "/placeholder.svg?height=100&width=100&text=JD"
          },
          {
            "name": "Jane Smith",
            "role": "Regular Client",
            "content": "Professional team and outstanding results.",
            "rating": 5,
            "image": "/placeholder.svg?height=100&width=100&text=JS"
          },
          {
            "name": "Mike Johnson",
            "role": "Business Owner",
            "content": "Best decision we made for our business!",
            "rating": 5,
            "image": "/placeholder.svg?height=100&width=100&text=MJ"
          }
        ]
      }
    },
    {
      "type": "ContactSection",
      "props": {
        "title": "Get In Touch",
        "subtitle": "Contact Us Today",
        "description": "Ready to get started? Contact ${params.websiteName} today!",
        "phone": "(555) 123-4567",
        "email": "info@${params.websiteName.toLowerCase().replace(/\s+/g, '')}.com",
        "address": "123 Business Street, City, State 12345",
        "formFields": [
          {"label": "Name", "type": "text", "required": true},
          {"label": "Email", "type": "email", "required": true},
          {"label": "Message", "type": "textarea", "required": true}
        ]
      }
    },
    {
      "type": "Footer",
      "props": {
        "logo": "${params.websiteName}",
        "description": "Professional ${params.industry} services you can trust.",
        "links": [
          {"label": "Privacy Policy", "url": "#privacy"},
          {"label": "Terms of Service", "url": "#terms"}
        ],
        "socialLinks": [
          {"platform": "facebook", "url": "#"},
          {"platform": "instagram", "url": "#"},
          {"platform": "twitter", "url": "#"}
        ],
        "copyrightText": "© 2024 ${params.websiteName}. All rights reserved."
      }
    }
  ],
  "metadata": {
    "title": "${params.websiteName} - Professional ${params.industry} Services",
    "description": "Professional ${params.industry} services from ${params.websiteName}"
  },
  "content": {
    "hero": {
      "title": "Welcome to ${params.websiteName}",
      "subtitle": "Professional ${params.industry} Services"
    }
  },
  "colors": {
    "primary": "#3182ce",
    "secondary": "#bee3f8", 
    "accent": "#2c5282"
  }
}

CRITICAL: Return ONLY the JSON above, no other text. Must have exactly 9 components.`

        try {
            const response = await this.generate({
                prompt,
                temperature: 0.3, // Lower temperature for more consistent output
                maxTokens: 6000, // Increased for comprehensive content
            })

            // Try to extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                try {
                    const parsed = JSON.parse(jsonMatch[0])

                    // Validate that we have the required components
                    if (!parsed.components || !Array.isArray(parsed.components)) {
                        throw new Error("Invalid components structure")
                    }

                    if (parsed.components.length < 8) {
                        console.warn(`⚠️ Only ${parsed.components.length} components generated, expected 9+`)
                    }

                    console.log(`✅ Successfully parsed AI-generated website structure with ${parsed.components.length} components`)
                    return parsed
                } catch (parseError) {
                    console.error("Error parsing Ollama JSON response:", parseError)
                    console.log("Raw response:", response)
                    throw new Error("Invalid JSON response from Ollama")
                }
            } else {
                console.error("No JSON found in Ollama response:", response)
                throw new Error("No JSON found in Ollama response")
            }
        } catch (error) {
            console.error("Error generating website content:", error)
            throw error
        }
    }

// Export a singleton instance with the correct default model\
    export const ollamaService = new OllamaService(
    process.env.OLLAMA_HOST || "http://localhost:11434",
    process.env.OLLAMA_MODEL || "llama3:latest"
)
