/**
 * Sanitizes component props to prevent className from being passed to React.Fragment
 * and ensures all required props have default values
 */
export function sanitizeProps(props: any = {}) {
    if (!props) return {}

    // Create a new object without the className property
    const { className, ...filteredProps } = props

    // Ensure menu items have valid hrefs if this is a header component
    if (filteredProps.menu && Array.isArray(filteredProps.menu)) {
        filteredProps.menu = filteredProps.menu.map((item: any) => ({
            ...item,
            link: item.link || "#",
        }))
    }

    // Ensure logo is a string
    if (filteredProps.logo === undefined || filteredProps.logo === null) {
        filteredProps.logo = ""
    }

    // Ensure other common props have default values
    if (filteredProps.title === undefined) filteredProps.title = ""
    if (filteredProps.subtitle === undefined) filteredProps.subtitle = ""
    if (filteredProps.description === undefined) filteredProps.description = ""

    // Return the sanitized props
    return filteredProps
}
