/**
 * Adapts component props to handle different naming conventions
 * This helps with compatibility between different JSON formats
 */
export function adaptProps(props: any, componentType: string): any {
    if (!props) return {}

    // Create a new object to avoid mutating the original
    const adaptedProps = { ...props }

    // Handle hero component props
    if (componentType === "hero") {
        // Handle CTA button naming
        if (adaptedProps.cta && !adaptedProps.buttonText) {
            adaptedProps.buttonText = adaptedProps.cta
        }
        if (adaptedProps.ctaLink && !adaptedProps.buttonLink) {
            adaptedProps.buttonLink = adaptedProps.ctaLink
        }

        // Handle secondary CTA button naming
        if (adaptedProps.secondaryCta && !adaptedProps.secondaryButtonText) {
            adaptedProps.secondaryButtonText = adaptedProps.secondaryCta
        }
        if (adaptedProps.secondaryCtaLink && !adaptedProps.secondaryButtonLink) {
            adaptedProps.secondaryButtonLink = adaptedProps.secondaryCtaLink
        }
    }

    // Handle header component props
    if (componentType === "header") {
        // Ensure menu items have valid hrefs
        if (adaptedProps.menu && Array.isArray(adaptedProps.menu)) {
            adaptedProps.menu = adaptedProps.menu.map((item: any) => ({
                ...item,
                link: item.link || "#",
            }))
        }

        // Ensure logo is a string
        if (adaptedProps.logo === undefined || adaptedProps.logo === null) {
            adaptedProps.logo = ""
        }
    }

    return adaptedProps
}
