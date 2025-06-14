// src/lib/styling-helpers.ts

export function applyAdvancedStyling(websiteData: any, style: string, industry: string) {
    const styling = {
        theme: style,
        industry: industry,
        typography: getAdvancedTypography(style),
        spacing: getAdvancedSpacing(style),
        animations: getStyleAnimations(style),
        responsive: true,
        accessibility: true,
    };

    return {
        ...websiteData,
        styling,
        ux_enhancements: {
            smooth_scrolling: true,
            loading_animations: true,
            hover_effects: true,
            micro_interactions: true,
        },
    };
}

export function getIndustryColors(industry: string, style: string) {
    const colorMap: Record<string, Record<string, any>> = {
        restaurant: {
            modern: { primary: "#e53e3e", secondary: "#feb2b2", accent: "#822727" },
            luxury: { primary: "#b7791f", secondary: "#faf089", accent: "#744210" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
        },
        healthcare: {
            modern: { primary: "#3182ce", secondary: "#bee3f8", accent: "#2c5282" },
            luxury: { primary: "#2d3748", secondary: "#e2e8f0", accent: "#1a202c" },
            minimal: { primary: "#4a5568", secondary: "#f7fafc", accent: "#2d3748" },
        },
        technology: {
            modern: { primary: "#805ad5", secondary: "#d6bcfa", accent: "#553c9a" },
            luxury: { primary: "#2d3748", secondary: "#e2e8f0", accent: "#1a202c" },
            minimal: { primary: "#4a5568", secondary: "#f7fafc", accent: "#2d3748" },
        },
    };

    return colorMap[industry]?.[style] || { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" };
}

function getAdvancedTypography(style: string) {
    const typographyMap: Record<string, any> = {
        modern: {
            headings: "Inter, system-ui, sans-serif",
            body: "Inter, system-ui, sans-serif",
            scale: "1.25",
            weight_contrast: "high",
        },
        luxury: {
            headings: "Playfair Display, serif",
            body: "Source Sans Pro, sans-serif",
            scale: "1.333",
            weight_contrast: "medium",
        },
        minimal: {
            headings: "Helvetica Neue, sans-serif",
            body: "Helvetica Neue, sans-serif",
            scale: "1.2",
            weight_contrast: "low",
        },
    };

    return typographyMap[style] || typographyMap.modern;
}

function getAdvancedSpacing(style: string) {
    const spacingMap: Record<string, any> = {
        modern: { base: "1rem", scale: "1.5", rhythm: "1.5rem" },
        luxury: { base: "1.25rem", scale: "1.618", rhythm: "2rem" },
        minimal: { base: "1rem", scale: "1.25", rhythm: "1.25rem" },
    };

    return spacingMap[style] || spacingMap.modern;
}

function getStyleAnimations(style: string) {
    const animationMap: Record<string, any> = {
        modern: {
            entrance: "fadeInUp",
            duration: "0.6s",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        luxury: {
            entrance: "fadeIn",
            duration: "0.8s",
            easing: "ease-out",
        },
        minimal: {
            entrance: "fadeInUp",
            duration: "0.4s",
            easing: "ease",
        },
    };

    return animationMap[style] || animationMap.modern;
}