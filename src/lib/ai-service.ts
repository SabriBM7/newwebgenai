import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface WebsiteGenerationPrompt {
    industry: string
    purpose: string
    targetAudience: string
    style: string
    features: string[]
    tone: string
    additionalInfo?: string
}

export interface GeneratedWebsiteContent {
    title: string
    description: string
    sections: {
        type: string
        content: any
    }[]
    colorScheme: {
        primary: string
        secondary: string
        accent: string
        background: string
        text: string
    }
    fonts: {
        heading: string
        body: string
    }
}

/**
 * Generates website content based on user input
 */
export async function generateWebsiteContent(prompt: WebsiteGenerationPrompt): Promise<GeneratedWebsiteContent> {
    try {
        // Create a detailed prompt for the AI
        const aiPrompt = `
      Generate a complete website structure for a ${prompt.industry} website.
      
      Purpose: ${prompt.purpose}
      Target Audience: ${prompt.targetAudience}
      Style Preferences: ${prompt.style}
      Required Features: ${prompt.features.join(", ")}
      Tone: ${prompt.tone}
      Additional Information: ${prompt.additionalInfo || "None"}
      
      Please provide a complete website structure including:
      1. Website title and description
      2. Recommended sections (header, hero, features, etc.)
      3. Content for each section
      4. Recommended color scheme (primary, secondary, accent, background, text colors)
      5. Recommended fonts for headings and body text
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Website Title",
        "description": "Website description",
        "sections": [
          {
            "type": "header",
            "content": { ... }
          },
          {
            "type": "hero",
            "content": { ... }
          },
          ...
        ],
        "colorScheme": {
          "primary": "#color",
          "secondary": "#color",
          "accent": "#color",
          "background": "#color",
          "text": "#color"
        },
        "fonts": {
          "heading": "Font name",
          "body": "Font name"
        }
      }
    `

        // Generate the content using the AI SDK
        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: aiPrompt,
        })

        // Parse the response
        try {
            const parsedResponse = JSON.parse(text)
            return parsedResponse as GeneratedWebsiteContent
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError)
            throw new Error("Failed to parse AI response")
        }
    } catch (error) {
        console.error("Error generating website content:", error)
        throw error
    }
}

/**
 * Generates section-specific content
 */
export async function generateSectionContent(
    sectionType: string,
    industry: string,
    tone: string,
    existingContent?: any,
): Promise<any> {
    const aiPrompt = `
    Generate content for a "${sectionType}" section for a ${industry} website with a ${tone} tone.
    ${existingContent ? `Existing content to improve: ${JSON.stringify(existingContent)}` : ""}
    
    Provide the response as a JSON object with appropriate fields for this section type.
  `

    const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: aiPrompt,
    })

    try {
        return JSON.parse(text)
    } catch (error) {
        console.error("Failed to parse section content:", error)
        throw new Error("Failed to generate section content")
    }
}

/**
 * Improves existing text content
 */
export async function improveTextContent(content: string, tone: string, purpose: string): Promise<string> {
    const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Improve the following text for a ${purpose} with a ${tone} tone: "${content}"`,
    })

    return text
}

/**
 * Suggests color schemes based on industry and style
 */
export async function suggestColorSchemes(
    industry: string,
    style: string,
): Promise<
    Array<{
        name: string
        colors: { primary: string; secondary: string; accent: string; background: string; text: string }
    }>
> {
    const aiPrompt = `
    Suggest 3 color schemes for a ${industry} website with a ${style} style.
    Each color scheme should include primary, secondary, accent, background, and text colors.
    Provide the response as a JSON array of objects with "name" and "colors" properties.
  `

    const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: aiPrompt,
    })

    try {
        return JSON.parse(text)
    } catch (error) {
        console.error("Failed to parse color schemes:", error)
        throw new Error("Failed to generate color schemes")
    }
}
