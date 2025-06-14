import {
    type Theme,
    themes as baseThemes,
    getThemeById,
    generateThemeVariables,
    applyThemeToProps,
} from "./theme-system"

// Additional industry-specific themes
export const industryThemes: Theme[] = [
    {
        id: "restaurant",
        name: "Restaurant",
        description: "Warm and appetizing theme for food businesses",
        colors: {
            primary: "#e53e3e", // red-600
            secondary: "#dd6b20", // orange-600
            accent: "#f6e05e", // yellow-300
            background: "#ffffff",
            text: "#2d3748", // gray-800
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Playfair Display, serif",
            headingFontFamily: "Playfair Display, serif",
            baseFontSize: "16px",
            scaleRatio: 1.333,
            lineHeight: 1.6,
            headingLineHeight: 1.2,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "1rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
    {
        id: "healthcare",
        name: "Healthcare",
        description: "Clean, trustworthy theme for medical services",
        colors: {
            primary: "#3182ce", // blue-500
            secondary: "#4299e1", // blue-400
            accent: "#63b3ed", // blue-300
            background: "#ffffff",
            text: "#2d3748", // gray-800
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
            headingFontFamily: "Montserrat, sans-serif",
            baseFontSize: "16px",
            scaleRatio: 1.2,
            lineHeight: 1.6,
            headingLineHeight: 1.3,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "0.75rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
    {
        id: "education",
        name: "Education",
        description: "Friendly, engaging theme for educational institutions",
        colors: {
            primary: "#6b46c1", // purple-700
            secondary: "#805ad5", // purple-500
            accent: "#d53f8c", // pink-500
            background: "#ffffff",
            text: "#2d3748", // gray-800
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Nunito, sans-serif",
            headingFontFamily: "Nunito, sans-serif",
            baseFontSize: "16px",
            scaleRatio: 1.25,
            lineHeight: 1.6,
            headingLineHeight: 1.3,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.375rem",
            medium: "0.75rem",
            large: "1.5rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
    {
        id: "tech-startup",
        name: "Tech Startup",
        description: "Modern, innovative theme for tech companies",
        colors: {
            primary: "#5a67d8", // indigo-500
            secondary: "#667eea", // indigo-400
            accent: "#f687b3", // pink-400
            background: "#ffffff",
            text: "#1a202c", // gray-900
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Inter, sans-serif",
            baseFontSize: "16px",
            scaleRatio: 1.25,
            lineHeight: 1.5,
            headingLineHeight: 1.2,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "1rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
    {
        id: "real-estate",
        name: "Real Estate",
        description: "Professional, trustworthy theme for property businesses",
        colors: {
            primary: "#2c5282", // blue-800
            secondary: "#3182ce", // blue-500
            accent: "#f6ad55", // orange-400
            background: "#ffffff",
            text: "#2d3748", // gray-800
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
            headingFontFamily: "Playfair Display, serif",
            baseFontSize: "16px",
            scaleRatio: 1.2,
            lineHeight: 1.6,
            headingLineHeight: 1.3,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "0.75rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
    {
        id: "ecommerce",
        name: "E-commerce",
        description: "Clean, conversion-focused theme for online stores",
        colors: {
            primary: "#38a169", // green-600
            secondary: "#48bb78", // green-500
            accent: "#f6e05e", // yellow-300
            background: "#ffffff",
            text: "#2d3748", // gray-800
            muted: "#e2e8f0", // gray-200
            border: "#edf2f7", // gray-100
        },
        typography: {
            fontFamily: "Inter, sans-serif",
            baseFontSize: "16px",
            scaleRatio: 1.25,
            lineHeight: 1.5,
            headingLineHeight: 1.2,
        },
        spacing: {
            unit: "1rem",
            scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48],
        },
        borderRadius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "0.75rem",
            full: "9999px",
        },
        shadows: {
            small: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            medium: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
            large: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
        },
        animation: {
            duration: {
                fast: "150ms",
                medium: "300ms",
                slow: "500ms",
            },
            easing: {
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
                easeOut: "cubic-bezier(0, 0, 0.2, 1)",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
        isDark: false,
    },
]

// Combine base themes with industry themes
export const allThemes: Theme[] = [...baseThemes, ...industryThemes]

// Map industries to appropriate themes
export const industryThemeMap: Record<string, string> = {
    technology: "tech-startup",
    tech: "tech-startup",
    startup: "tech-startup",
    software: "tech-startup",
    healthcare: "healthcare",
    medical: "healthcare",
    hospital: "healthcare",
    clinic: "healthcare",
    education: "education",
    school: "education",
    university: "education",
    college: "education",
    restaurant: "restaurant",
    food: "restaurant",
    cafe: "restaurant",
    catering: "restaurant",
    realestate: "real-estate",
    "real estate": "real-estate",
    property: "real-estate",
    ecommerce: "ecommerce",
    retail: "ecommerce",
    shop: "ecommerce",
    store: "ecommerce",
    creative: "creative",
    design: "creative",
    art: "creative",
    corporate: "corporate",
    business: "corporate",
    finance: "corporate",
    consulting: "corporate",
    legal: "corporate",
}

// Get theme by industry
export function getThemeByIndustry(industry: string): Theme {
    const normalizedIndustry = industry.toLowerCase().trim()
    const themeId = industryThemeMap[normalizedIndustry] || "light-default"
    return getThemeById(themeId)
}

// Apply theme to tailwind classes
export function applyThemeToTailwind(theme: Theme, props: any): any {
    const updatedProps = { ...props }

    // Map theme colors to Tailwind classes
    if (!props.backgroundColor) {
        updatedProps.backgroundColor = "bg-white"
    }

    if (!props.textColor) {
        updatedProps.textColor = "text-gray-900"
    }

    if (!props.primaryColor) {
        // Extract the color from the theme and convert to appropriate Tailwind class
        // This is simplified - you'd need a more robust conversion in a real implementation
        if (theme.colors.primary === "#3b82f6") {
            updatedProps.primaryColor = "blue-500"
        } else if (theme.colors.primary === "#10b981") {
            updatedProps.primaryColor = "emerald-500"
        } else if (theme.colors.primary === "#f59e0b") {
            updatedProps.primaryColor = "amber-500"
        } else {
            updatedProps.primaryColor = "blue-500" // Default fallback
        }
    }

    return updatedProps
}

export { getThemeById, generateThemeVariables, applyThemeToProps }
