import SafeHeader from "@/components/safe-header"

// A simple component map that uses components we know are safe
export const safeComponentMap = {
    header: {
        safe: SafeHeader,
    },
}

// Function to get a component from the map
export function getSafeComponent(type: string, variant = "safe") {
    const componentCategory = safeComponentMap[type]
    if (!componentCategory) return null

    return componentCategory[variant] || null
}
