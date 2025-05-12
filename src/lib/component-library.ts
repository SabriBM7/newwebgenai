// Component library organization and metadata

export type ComponentCategory =
    | "header"
    | "hero"
    | "features"
    | "content"
    | "testimonials"
    | "pricing"
    | "stats"
    | "team"
    | "faq"
    | "contact"
    | "cta"
    | "footer"
    | "gallery"
    | "blog"
    | "newsletter"

export type ComponentStyle =
    | "minimal"
    | "modern"
    | "classic"
    | "bold"
    | "gradient"
    | "outlined"
    | "card"
    | "grid"
    | "list"
    | "split"
    | "centered"
    | "animated"

export type ComponentSize = "small" | "medium" | "large"

export type ComponentColorScheme = "primary" | "secondary" | "neutral" | "accent" | "custom"

export interface ComponentMetadata {
    id: string
    name: string
    category: ComponentCategory
    style: ComponentStyle
    description: string
    screenshot?: string
    tags: string[]
    size?: ComponentSize
    colorScheme?: ComponentColorScheme
    isNew?: boolean
    isPremium?: boolean
}

// Example component metadata registry
export const componentRegistry: ComponentMetadata[] = [
    // Headers
    {
        id: "header-minimal",
        name: "Minimal Header",
        category: "header",
        style: "minimal",
        description: "A clean, minimal header with essential navigation",
        tags: ["simple", "clean", "lightweight"],
        size: "small",
    },
    {
        id: "header-corporate",
        name: "Corporate Header",
        category: "header",
        style: "classic",
        description: "Professional header with contact information and dropdown menus",
        tags: ["business", "professional", "dropdown"],
        size: "medium",
    },
    // Add more component metadata here
]

// Helper function to filter components
export function filterComponents(options: {
    category?: ComponentCategory
    style?: ComponentStyle
    tags?: string[]
    size?: ComponentSize
    isNew?: boolean
    isPremium?: boolean
}): ComponentMetadata[] {
    let filtered = [...componentRegistry]

    if (options.category) {
        filtered = filtered.filter((comp) => comp.category === options.category)
    }

    if (options.style) {
        filtered = filtered.filter((comp) => comp.style === options.style)
    }

    if (options.tags && options.tags.length > 0) {
        filtered = filtered.filter((comp) => options.tags!.some((tag) => comp.tags.includes(tag)))
    }

    if (options.size) {
        filtered = filtered.filter((comp) => comp.size === options.size)
    }

    if (options.isNew !== undefined) {
        filtered = filtered.filter((comp) => comp.isNew === options.isNew)
    }

    if (options.isPremium !== undefined) {
        filtered = filtered.filter((comp) => comp.isPremium === options.isPremium)
    }

    return filtered
}
