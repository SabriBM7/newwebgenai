import type { WebsiteGenerationPrompt } from "./ai-service"

type Message = {
    role: "user" | "assistant"
    content: string
}

type RequirementsResult = {
    readyToGenerate: boolean
    industry?: string
    purpose?: string
    targetAudience?: string
    style?: string
    features?: string[]
    tone?: string
    additionalInfo?: string
}

/**
 * Extracts website requirements from chat messages
 */
export function extractWebsiteRequirements(messages: Message[]): RequirementsResult {
    // Default result
    const result: RequirementsResult = {
        readyToGenerate: false,
    }

    // Combine all user messages into one text for analysis
    const userText = messages
        .filter((msg) => msg.role === "user")
        .map((msg) => msg.content)
        .join(" ")

    // Extract industry (simple approach - in production you'd use more robust NLP)
    const industryMatch = userText.match(/industry[:\s]+([^,.]+)/i)
    if (industryMatch) result.industry = industryMatch[1].trim()

    // Extract purpose
    const purposeMatch = userText.match(/purpose[:\s]+([^,.]+)/i)
    if (purposeMatch) result.purpose = purposeMatch[1].trim()

    // Extract target audience
    const audienceMatch = userText.match(/audience[:\s]+([^,.]+)/i)
    if (audienceMatch) result.targetAudience = audienceMatch[1].trim()

    // Extract style
    const styleMatch = userText.match(/style[:\s]+([^,.]+)/i)
    if (styleMatch) result.style = styleMatch[1].trim()

    // Extract features (very simple approach)
    const featuresMatch = userText.match(/features[:\s]+([^,.]+)/i)
    if (featuresMatch) {
        result.features = featuresMatch[1]
            .split(/[,&]/)
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
    }

    // Extract tone
    const toneMatch = userText.match(/tone[:\s]+([^,.]+)/i)
    if (toneMatch) result.tone = toneMatch[1].trim()

    // Check if we have enough information to generate
    result.readyToGenerate = !!(
        result.industry &&
        result.purpose &&
        (result.targetAudience || result.style || result.features)
    )

    return result
}

/**
 * Converts extracted requirements to a WebsiteGenerationPrompt
 */
export function createGenerationPrompt(requirements: RequirementsResult): WebsiteGenerationPrompt {
    return {
        industry: requirements.industry || "general",
        purpose: requirements.purpose || "informational",
        targetAudience: requirements.targetAudience || "general audience",
        style: requirements.style || "modern and professional",
        features: requirements.features || ["about", "contact"],
        tone: requirements.tone || "professional",
        additionalInfo: requirements.additionalInfo,
    }
}
