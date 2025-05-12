import { sampleDataset, COMPONENT_TYPES } from "./dataset"

type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES]

interface MatchOptions {
    query: string
    industry?: string
    tone?: string
    audience?: string
}

// Function to match components based on user input
export function matchComponents(options: MatchOptions) {
    const { query, industry, tone, audience } = options

    // Convert query to lowercase and split into keywords
    const keywords = query.toLowerCase().split(/\s+/)

    // Add industry, tone, and audience to keywords if provided
    if (industry) keywords.push(industry.toLowerCase())
    if (tone) keywords.push(tone.toLowerCase())
    if (audience) keywords.push(audience.toLowerCase())

    // Create a map to store the best match for each component type
    const bestMatches = new Map<ComponentType, { component: any; score: number }>()

    // Process each component in the dataset
    sampleDataset.forEach((component) => {
        // Extract component keywords
        const componentKeywords = component.props.keywords || []

        // Calculate match score based on keyword matches
        let score = 0
        keywords.forEach((keyword) => {
            if (componentKeywords.some((ck: string) => ck.toLowerCase().includes(keyword))) {
                score += 1
            }
        })

        // If this is the best match so far for this component type, store it
        const currentBest = bestMatches.get(component.component)
        if (!currentBest || score > currentBest.score) {
            bestMatches.set(component.component, { component, score })
        }
    })

    // Convert the map to an array of components
    return Array.from(bestMatches.values())
        .filter((match) => match.score > 0) // Only include matches with a positive score
        .map((match) => match.component)
        .sort((a, b) => {
            // Sort by component type order: header, hero, features, testimonials, cta, footer
            const order = [
                COMPONENT_TYPES.HEADER,
                COMPONENT_TYPES.HERO,
                COMPONENT_TYPES.FEATURES,
                COMPONENT_TYPES.TESTIMONIALS,
                COMPONENT_TYPES.CTA,
                COMPONENT_TYPES.FOOTER,
            ]
            return order.indexOf(a.component) - order.indexOf(b.component)
        })
}

// Function to generate default props for missing components
export function generateDefaultProps(componentType: ComponentType, query: string) {
    // Find a default component of this type from the dataset
    const defaultComponent = sampleDataset.find((c) => c.component === componentType)

    if (defaultComponent) {
        return {
            ...defaultComponent,
            props: {
                ...defaultComponent.props,
                // Customize some props based on the query
                ...(componentType === COMPONENT_TYPES.HEADER && { logo: generateBusinessName(query) }),
                ...(componentType === COMPONENT_TYPES.HERO && {
                    title: generateHeroTitle(query),
                    description: generateHeroDescription(query),
                }),
            },
        }
    }

    // Return null if no default component is found
    return null
}

// Helper function to generate a business name from the query
function generateBusinessName(query: string): string {
    const words = query.split(/\s+/)

    // If query has multiple words, use first letters of each word
    if (words.length > 1) {
        return words
            .filter((word) => word.length > 2) // Filter out short words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")
    }

    // If query is a single word, use it directly
    return words[0].charAt(0).toUpperCase() + words[0].slice(1)
}

// Helper function to generate a hero title from the query
function generateHeroTitle(query: string): string {
    if (query.toLowerCase().includes("ecommerce") || query.toLowerCase().includes("shop")) {
        return "Your One-Stop Online Shop"
    } else if (query.toLowerCase().includes("portfolio")) {
        return "Showcase Your Creative Work"
    } else if (query.toLowerCase().includes("blog")) {
        return "Share Your Stories With The World"
    } else {
        return "Welcome to Your New Website"
    }
}

// Helper function to generate a hero description from the query
function generateHeroDescription(query: string): string {
    if (query.toLowerCase().includes("ecommerce") || query.toLowerCase().includes("shop")) {
        return "Discover our curated collection of products designed to meet your needs and exceed your expectations."
    } else if (query.toLowerCase().includes("portfolio")) {
        return "A professional showcase of projects and skills designed to impress potential clients and employers."
    } else if (query.toLowerCase().includes("blog")) {
        return "A platform to share your thoughts, ideas, and expertise with readers around the world."
    } else {
        return "A custom website built to help you achieve your goals and connect with your audience."
    }
}
