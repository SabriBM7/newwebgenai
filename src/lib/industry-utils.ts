import { getIndustryConfig, getIndustryNames } from "./industry-config"

/**
 * Get recommended components for a specific industry
 */
export function getRecommendedComponents(industry: string): string[] {
    const config = getIndustryConfig(industry)
    return [...config.sections.required, ...config.sections.recommended, ...config.sections.industrySpecific]
}

/**
 * Get all available components for a specific industry
 */
export function getAllComponents(industry: string): string[] {
    const config = getIndustryConfig(industry)
    return [
        ...config.sections.required,
        ...config.sections.recommended,
        ...config.sections.optional,
        ...config.sections.industrySpecific,
    ]
}

/**
 * Filter industries by supported feature
 */
export function getIndustriesByFeature(feature: string): string[] {
    return getIndustryNames().filter((industry) => {
        const config = getIndustryConfig(industry)
        const allSections = [
            ...config.sections.required,
            ...config.sections.recommended,
            ...config.sections.optional,
            ...config.sections.industrySpecific,
        ]
        return allSections.includes(feature)
    })
}

/**
 * Generate AI prompt for industry-specific content
 */
export function generateIndustryPrompt(industry: string, component: string, businessName: string): string {
    const config = getIndustryConfig(industry)

    // Replace placeholders in content
    const processContent = (text: string) => {
        return text.replace(/\{\{name\}\}/g, businessName)
    }

    // Base prompt with industry context
    let prompt = `Generate content for a ${industry} business named "${businessName}" for the ${component} component.`

    // Add industry-specific guidance
    switch (component.toLowerCase()) {
        case "hero":
            const heroTitles = config.content.heroTitles.map(processContent)
            const taglines = config.content.taglines.map(processContent)
            prompt += `\nPossible titles: ${heroTitles.join(", ")}\nPossible taglines: ${taglines.join(", ")}`
            break

        case "features":
        case "feature":
            prompt += `\nInclude at least 3 key features that highlight the strengths of the business.`
            if (config.content.features.length > 0) {
                prompt += `\nExample features: ${config.content.features.map((f) => f.title).join(", ")}`
            }
            break

        case "services":
        case "service":
            prompt += `\nDescribe the main services offered by the business with pricing information if applicable.`
            if (config.content.services.length > 0) {
                prompt += `\nExample services: ${config.content.services.map((s) => s.title).join(", ")}`
            }
            break

        case "testimonials":
        case "testimonial":
            prompt += `\nCreate realistic testimonials from satisfied customers that highlight the value proposition.`
            break

        case "about":
            prompt += `\nWrite a compelling story about the business, its history, mission, and values.`
            break

        case "contact":
            prompt += `\nInclude placeholder contact information and a brief message encouraging visitors to reach out.`
            break

        case "faq":
            prompt += `\nCreate frequently asked questions and answers relevant to the ${industry} industry.`
            break

        default:
            // For industry-specific components
            if (config.sections.industrySpecific.includes(component)) {
                prompt += `\nThis is an industry-specific component for ${industry} businesses. Generate appropriate content.`
            }
    }

    return prompt
}

/**
 * Get color scheme for an industry
 */
export function getIndustryColorScheme(industry: string): {
    primary: string
    secondary: string
    accent: string
} {
    const config = getIndustryConfig(industry)
    return {
        primary: config.primaryColor,
        secondary: config.secondaryColor,
        accent: config.accentColor,
    }
}

/**
 * Get recommended images for an industry and component
 */
export function getRecommendedImages(industry: string, component: string): string[] {
    const config = getIndustryConfig(industry)

    switch (component.toLowerCase()) {
        case "hero":
            return config.images.hero
        case "gallery":
            return config.images.gallery
        case "team":
            return config.images.team
        case "services":
        case "features":
            return config.images.services
        default:
            // Return a mix of images for other components
            return [...config.images.hero, ...config.images.services.slice(0, 1)]
    }
}

/**
 * Check if a component is required for an industry
 */
export function isRequiredComponent(industry: string, component: string): boolean {
    const config = getIndustryConfig(industry)
    return config.sections.required.includes(component)
}

/**
 * Get industry-specific example content
 */
export function getExampleContent(industry: string, contentType: "features" | "services" | "testimonials"): any[] {
    const config = getIndustryConfig(industry)
    return config.content[contentType] || []
}
