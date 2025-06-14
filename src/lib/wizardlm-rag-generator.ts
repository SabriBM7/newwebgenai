import { generateWithWizardLM } from "./wizardlm-service"
import { getRelevantDocuments } from "./embeddings"
import { getIndustryTemplate } from "./comprehensive-industry-templates"

interface WebsiteGenerationParams {
    description: string
    websiteName: string
    industry: string
    style: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
    includeImages?: boolean
}

export async function generateWebsiteWithWizardLMRAG(params: WebsiteGenerationParams) {
    try {
        console.log("🚀 Starting WizardLM RAG website generation...")

        // Step 1: Get relevant documents based on industry and description
        const relevantDocs = await getRelevantDocuments(params.industry, params.description)
        console.log(`📚 Retrieved ${relevantDocs.length} relevant documents`)

        // Step 2: Get industry-specific template
        const industryTemplate = getIndustryTemplate(params.industry)

        // Step 3: Create enhanced prompt with RAG context
        const prompt = createEnhancedPrompt(params, relevantDocs, industryTemplate)

        // Step 4: Generate website content with WizardLM
        const wizardResponse = await generateWithWizardLM({
            prompt: prompt,
            temperature: 0.7,
            maxTokens: 4000,
        })

        // Step 5: Parse and structure the response
        const websiteData = parseWizardLMResponse(wizardResponse.response, params)

        // Step 6: Format the response for the renderer
        return {
            success: true,
            data: {
                components: websiteData.components,
                metadata: {
                    title: `${params.websiteName} - Professional ${params.industry} Website`,
                    description: params.description.substring(0, 160),
                    industry: params.industry,
                    style: params.style,
                    aiUsed: "WizardLM-RAG",
                    generatedAt: new Date().toISOString(),
                },
                content: websiteData.content,
                images: websiteData.images,
                colors: websiteData.colors,
            },
        }
    } catch (error) {
        console.error("❌ Error generating website with WizardLM RAG:", error)
        throw error
    }
}

function createEnhancedPrompt(params: WebsiteGenerationParams, relevantDocs: any[], industryTemplate: any): string {
    // Create context from relevant documents
    const ragContext = relevantDocs.map((doc) => `${doc.title}: ${doc.content}`).join("\n\n")

    return `You are a professional web designer and copywriter. Create a comprehensive website for a ${params.industry} business.

BUSINESS DETAILS:
- Name: ${params.websiteName}
- Industry: ${params.industry}
- Description: ${params.description}
- Style: ${params.style}
${params.targetAudience ? `- Target Audience: ${params.targetAudience}` : ""}
${params.businessGoals?.length ? `- Business Goals: ${params.businessGoals.join(", ")}` : ""}
${params.uniqueSellingPoints?.length ? `- Unique Selling Points: ${params.uniqueSellingPoints.join(", ")}` : ""}

INDUSTRY-SPECIFIC KNOWLEDGE:
${ragContext}

INDUSTRY TEMPLATE REFERENCE:
${JSON.stringify(industryTemplate, null, 2)}

TASK: Generate a comprehensive website structure with ALL necessary components for a ${params.industry} business. Include specialized sections like ${getIndustrySpecificSections(params.industry)}.

OUTPUT FORMAT:
Return a JSON object with the following structure:
{
  "components": [
    {
      "type": "ComponentType",
      "props": {
        // Component properties
      }
    },
    // More components...
  ],
  "content": {
    // Website content organized by section
  },
  "images": {
    // Image descriptions and URLs
  },
  "colors": {
    // Color scheme
  }
}

IMPORTANT:
1. Include ALL industry-specific components
2. Create professional, compelling content
3. Return ONLY valid JSON, no additional text
4. Include at least 8-12 components for a complete website
5. Ensure all component types match the available components in the system`
}

function parseWizardLMResponse(response: string, params: WebsiteGenerationParams) {
    try {
        // Extract JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error("No valid JSON found in WizardLM response")
        }

        const parsedData = JSON.parse(jsonMatch[0])

        // Validate and ensure required structure
        if (!parsedData.components || !Array.isArray(parsedData.components)) {
            throw new Error("Invalid components structure in response")
        }

        // Ensure each component has the correct structure
        const validatedComponents = parsedData.components.map((component: any) => {
            // Make sure component has type and props
            if (!component.type) {
                component.type = "TextSection"
            }

            if (!component.props) {
                component.props = {}
            }

            return component
        })

        return {
            components: validatedComponents,
            content: parsedData.content || {},
            images: parsedData.images || {},
            colors: parsedData.colors || getDefaultColors(params.industry, params.style),
        }
    } catch (error) {
        console.error("Error parsing WizardLM response:", error)

        // Return fallback structure
        return {
            components: generateFallbackComponents(params),
            content: {
                hero: {
                    title: `Welcome to ${params.websiteName}`,
                    subtitle: `Professional ${params.industry} services`,
                },
            },
            images: {},
            colors: getDefaultColors(params.industry, params.style),
        }
    }
}

function getIndustrySpecificSections(industry: string): string {
    const industryMap: Record<string, string> = {
        restaurant: "Menu, Events Calendar, Gallery, Reservations",
        technology: "Portfolio, Process Timeline, Team, Services",
        healthcare: "Services, Team, Appointment Booking, Patient Resources",
        education: "Courses, Faculty, Events Calendar, Resources",
        ecommerce: "Product Catalog, Shopping Cart, Featured Products, Categories",
        realestate: "Property Listings, Search, Virtual Tours, Agent Profiles",
        fitness: "Class Schedule, Trainer Profiles, Membership Plans, Testimonials",
        photography: "Portfolio Gallery, Services, Booking Form, Client Testimonials",
        legal: "Practice Areas, Team, Testimonials, FAQ",
        finance: "Services, Calculator Tools, Team, Resources",
        construction: "Projects, Services, Equipment, Testimonials",
        automotive: "Vehicle Listings, Services, Team, Testimonials",
        travel: "Destinations, Tours, Booking System, Testimonials",
        nonprofit: "Mission, Programs, Donation Form, Events",
    }

    return industryMap[industry] || "Portfolio, Services, Team, Contact"
}

function generateFallbackComponents(params: WebsiteGenerationParams) {
    // Generate basic fallback components if parsing fails
    const components = [
        {
            type: "Header",
            props: {
                logo: params.websiteName,
                links: [
                    { text: "Home", url: "#home" },
                    { text: "About", url: "#about" },
                    { text: "Services", url: "#services" },
                    { text: "Contact", url: "#contact" },
                ],
            },
        },
        {
            type: "HeroSection",
            props: {
                title: `Welcome to ${params.websiteName}`,
                subtitle: `Professional ${params.industry} services`,
                description: params.description.substring(0, 200),
                buttonText: "Learn More",
                buttonLink: "#about",
                image: "/placeholder.svg?height=600&width=800&text=Hero+Image",
            },
        },
        {
            type: "AboutSection",
            props: {
                title: "About Us",
                subtitle: "Our Story",
                description: params.description,
                image: "/placeholder.svg?height=400&width=600&text=About+Image",
            },
        },
        {
            type: "ContactSection",
            props: {
                title: "Contact Us",
                subtitle: "Get in Touch",
                description: "We'd love to hear from you! Reach out for inquiries and support.",
                formFields: [
                    { label: "Name", type: "text", required: true },
                    { label: "Email", type: "email", required: true },
                    { label: "Message", type: "textarea", required: true },
                ],
                submitButtonText: "Send Message",
            },
        },
    ]

    // Add industry-specific components
    if (params.industry === "restaurant") {
        components.push({
            type: "MenuSection",
            props: {
                title: "Our Menu",
                subtitle: "Delicious Options",
                categories: ["Appetizers", "Main Courses", "Desserts"],
                items: [
                    {
                        name: "Signature Dish",
                        description: "A delicious specialty of our restaurant",
                        price: "$24.99",
                        image: "/placeholder.svg?height=200&width=300&text=Signature+Dish",
                        category: "Main Courses",
                    },
                ],
            },
        })
    } else if (params.industry === "technology") {
        components.push({
            type: "PortfolioSection",
            props: {
                title: "Our Projects",
                subtitle: "Recent Work",
                projects: [
                    {
                        title: "Project 1",
                        description: "A showcase of our technical expertise",
                        image: "/placeholder.svg?height=300&width=400&text=Project+1",
                        category: "Web Development",
                    },
                ],
                categories: ["Web Development", "Mobile Apps", "AI Solutions"],
            },
        })
    }

    return components
}

function getDefaultColors(industry: string, style: string) {
    // Default color schemes by industry and style
    const colorMap: Record<string, Record<string, any>> = {
        restaurant: {
            modern: { primary: "#e53e3e", secondary: "#feb2b2", accent: "#822727" },
            luxury: { primary: "#b7791f", secondary: "#faf089", accent: "#744210" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
            creative: { primary: "#ed8936", secondary: "#fbd38d", accent: "#9c4221" },
        },
        technology: {
            modern: { primary: "#3182ce", secondary: "#bee3f8", accent: "#2c5282" },
            minimal: { primary: "#2d3748", secondary: "#e2e8f0", accent: "#1a202c" },
            professional: { primary: "#4299e1", secondary: "#ebf8ff", accent: "#2b6cb0" },
            creative: { primary: "#667eea", secondary: "#c3dafe", accent: "#4c51bf" },
        },
        healthcare: {
            modern: { primary: "#38b2ac", secondary: "#b2f5ea", accent: "#285e61" },
            professional: { primary: "#4299e1", secondary: "#ebf8ff", accent: "#2b6cb0" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
        },
        education: {
            modern: { primary: "#6b46c1", secondary: "#e9d8fd", accent: "#553c9a" },
            professional: { primary: "#4299e1", secondary: "#ebf8ff", accent: "#2b6cb0" },
            playful: { primary: "#ed64a6", secondary: "#fed7e2", accent: "#b83280" },
        },
    }

    return colorMap[industry]?.[style] || { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" }
}
