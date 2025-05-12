import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { matchComponents, generateDefaultProps } from "./component-matcher"
import { COMPONENT_TYPES } from "./dataset"

export interface WebsiteGenerationRequest {
    query: string
    industry?: string
    tone?: string
    audience?: string
}

export interface GeneratedWebsite {
    components: any[]
    metadata: {
        title: string
        description: string
        industry: string
        tone: string
        audience: string
    }
}

/**
 * Generates a complete website based on user input
 */
export async function generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsite> {
    try {
        // Step 1: Extract key information from the query using AI
        const enrichedData = await enrichUserQuery(request.query)

        // Step 2: Match components based on the enriched data
        const matchOptions = {
            query: request.query,
            industry: enrichedData.industry || request.industry,
            tone: enrichedData.tone || request.tone,
            audience: enrichedData.audience || request.audience,
        }

        const matchedComponents = matchComponents(matchOptions)

        // Step 3: Ensure we have all required component types
        const requiredTypes = [
            COMPONENT_TYPES.HEADER,
            COMPONENT_TYPES.HERO,
            COMPONENT_TYPES.FEATURES,
            COMPONENT_TYPES.FOOTER,
        ]

        requiredTypes.forEach((type) => {
            if (!matchedComponents.some((c) => c.component === type)) {
                const defaultComponent = generateDefaultProps(type, request.query)
                if (defaultComponent) {
                    matchedComponents.push(defaultComponent)
                }
            }
        })

        // Step 4: Customize component content based on the query
        const customizedComponents = await customizeComponentContent(matchedComponents, request.query, enrichedData)

        // Step 5: Return the generated website
        return {
            components: customizedComponents,
            metadata: {
                title: enrichedData.title || `${enrichedData.industry || "Business"} Website`,
                description: enrichedData.description || `A website for ${request.query}`,
                industry: enrichedData.industry || request.industry || "general",
                tone: enrichedData.tone || request.tone || "professional",
                audience: enrichedData.audience || request.audience || "general",
            },
        }
    } catch (error) {
        console.error("Error generating website:", error)
        throw error
    }
}

/**
 * Uses AI to enrich the user query with additional information
 */
async function enrichUserQuery(query: string) {
    const prompt = `
    Analyze this website request: "${query}"
    
    Extract the following information:
    1. Industry/category (e.g., e-commerce, portfolio, blog, education)
    2. Tone (e.g., professional, friendly, technical, creative)
    3. Target audience (e.g., consumers, professionals, students)
    4. A good website title
    5. A brief website description
    
    Return ONLY a JSON object with these fields: industry, tone, audience, title, description
  `

    try {
        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: prompt,
        })

        return JSON.parse(text)
    } catch (error) {
        console.error("Error enriching user query:", error)
        // Return default values if AI processing fails
        return {
            industry: guessIndustry(query),
            tone: "professional",
            audience: "general",
            title: `${query} Website`,
            description: `A website for ${query}`,
        }
    }
}

/**
 * Simple function to guess the industry from the query
 */
function guessIndustry(query: string): string {
    const q = query.toLowerCase()
    if (q.includes("shop") || q.includes("store") || q.includes("ecommerce") || q.includes("e-commerce")) {
        return "e-commerce"
    } else if (q.includes("portfolio") || q.includes("showcase")) {
        return "portfolio"
    } else if (q.includes("blog") || q.includes("news")) {
        return "blog"
    } else if (q.includes("learn") || q.includes("course") || q.includes("education")) {
        return "education"
    } else {
        return "business"
    }
}

/**
 * Customizes component content based on the user query
 */
async function customizeComponentContent(components: any[], query: string, enrichedData: any) {
    // For each component, customize its content based on the query and enriched data
    const customizedComponents = [...components]

    // Example: Customize header
    const header = customizedComponents.find((c) => c.component === COMPONENT_TYPES.HEADER)
    if (header) {
        header.props.logo = enrichedData.title || header.props.logo
    }

    // Example: Customize hero
    const hero = customizedComponents.find((c) => c.component === COMPONENT_TYPES.HERO)
    if (hero) {
        hero.props.title = enrichedData.title || hero.props.title
        hero.props.description = enrichedData.description || hero.props.description
    }

    // For more complex customization, you could use AI to generate content for each component
    // This would be an extension point for future development

    return customizedComponents
}
