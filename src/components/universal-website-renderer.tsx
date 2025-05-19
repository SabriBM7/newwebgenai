"use client"

import { ErrorBoundary } from "./error-boundary"
import SafeComponentRenderer from "./safe-component-renderer"

interface WebsiteData {
    title: string
    description: string
    sections: Array<{
        type: string
        variant: string
        props: any
    }>
}

interface UniversalWebsiteRendererProps {
    website: WebsiteData
    theme?: string
}

export default function UniversalWebsiteRenderer({ website, theme = "light" }: UniversalWebsiteRendererProps) {
    if (!website || !website.sections || !Array.isArray(website.sections)) {
        return (
            <div className="p-8 text-center text-gray-500">No website data available. Please generate a website first.</div>
        )
    }

    // Apply theme styles
    const themeStyles = {
        light: {
            backgroundColor: "#ffffff",
            textColor: "#333333",
        },
        dark: {
            backgroundColor: "#1a1a1a",
            textColor: "#ffffff",
        },
        colorful: {
            backgroundColor: "#f0f9ff",
            textColor: "#0c4a6e",
        },
    }

    const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light

    return (
        <div
            className="website-container"
            style={{ backgroundColor: currentTheme.backgroundColor, color: currentTheme.textColor }}
        >
            {website.sections.map((section, index) => (
                <ErrorBoundary
                    key={`${section.type}-${section.variant}-${index}`}
                    fallback={
                        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded m-4">
                            <h3 className="font-bold">Error rendering {section.type} component</h3>
                        </div>
                    }
                >
                    <SafeComponentRenderer
                        type={section.type}
                        variant={section.variant}
                        props={{
                            ...section.props,
                            // Apply theme colors to components that support it
                            backgroundColor: section.props.backgroundColor || currentTheme.backgroundColor,
                            textColor: section.props.textColor || currentTheme.textColor,
                        }}
                    />
                </ErrorBoundary>
            ))}
        </div>
    )
}
