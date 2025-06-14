// Color Palettes
export const colorPalettes = {
    modern: {
        primary: "#3b82f6", // blue-500
        secondary: "#10b981", // emerald-500
        accent: "#8b5cf6", // violet-500
        background: "#ffffff",
        surface: "#f8fafc", // slate-50
        text: "#1e293b", // slate-800
        textMuted: "#64748b", // slate-500
        border: "#e2e8f0", // slate-200
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        error: "#ef4444", // red-500
    },
    minimal: {
        primary: "#000000",
        secondary: "#404040", // gray-700
        accent: "#d4d4d4", // gray-300
        background: "#ffffff",
        surface: "#fafafa", // gray-50
        text: "#171717", // gray-900
        textMuted: "#737373", // gray-500
        border: "#e5e5e5", // gray-200
        success: "#22c55e", // green-500
        warning: "#eab308", // yellow-500
        error: "#dc2626", // red-600
    },
    vibrant: {
        primary: "#f43f5e", // rose-500
        secondary: "#8b5cf6", // violet-500
        accent: "#06b6d4", // cyan-500
        background: "#ffffff",
        surface: "#fef2f2", // red-50
        text: "#18181b", // zinc-900
        textMuted: "#71717a", // zinc-500
        border: "#fecaca", // red-200
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        error: "#ef4444", // red-500
    },
    corporate: {
        primary: "#1e40af", // blue-800
        secondary: "#1e3a8a", // blue-900
        accent: "#93c5fd", // blue-300
        background: "#ffffff",
        surface: "#f1f5f9", // slate-100
        text: "#1f2937", // gray-800
        textMuted: "#6b7280", // gray-500
        border: "#d1d5db", // gray-300
        success: "#059669", // emerald-600
        warning: "#d97706", // amber-600
        error: "#dc2626", // red-600
    },
    creative: {
        primary: "#8b5cf6", // violet-500
        secondary: "#ec4899", // pink-500
        accent: "#f59e0b", // amber-500
        background: "#ffffff",
        surface: "#faf5ff", // violet-50
        text: "#18181b", // zinc-900
        textMuted: "#71717a", // zinc-500
        border: "#e4d4f4", // violet-200
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        error: "#ef4444", // red-500
    },
}

// Typography System
export const typography = {
    fontFamilies: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Poppins", "system-ui", "sans-serif"],
    },
    fontSizes: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
    },
    fontWeights: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
    },
    lineHeights: {
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
    },
}

// Spacing System
export const spacing = {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
}

// Border Radius System
export const borderRadius = {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
}

// Shadow System
export const shadows = {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
}

// Breakpoints
export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
}

// Component Variants
export const componentVariants = {
    button: {
        sizes: {
            sm: {
                padding: "0.5rem 1rem",
                fontSize: typography.fontSizes.sm,
                borderRadius: borderRadius.md,
            },
            md: {
                padding: "0.75rem 1.5rem",
                fontSize: typography.fontSizes.base,
                borderRadius: borderRadius.md,
            },
            lg: {
                padding: "1rem 2rem",
                fontSize: typography.fontSizes.lg,
                borderRadius: borderRadius.lg,
            },
        },
        variants: {
            primary: (colors: any) => ({
                backgroundColor: colors.primary,
                color: colors.background,
                border: `1px solid ${colors.primary}`,
            }),
            secondary: (colors: any) => ({
                backgroundColor: colors.secondary,
                color: colors.background,
                border: `1px solid ${colors.secondary}`,
            }),
            outline: (colors: any) => ({
                backgroundColor: "transparent",
                color: colors.primary,
                border: `1px solid ${colors.border}`,
            }),
        },
    },
    card: {
        variants: {
            default: (colors: any) => ({
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
            }),
            elevated: (colors: any) => ({
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.lg,
            }),
            flat: (colors: any) => ({
                backgroundColor: colors.surface,
                border: "none",
                borderRadius: borderRadius.lg,
            }),
        },
    },
}

// Industry-specific color mappings
export const industryColorMappings = {
    technology: "modern",
    healthcare: "minimal",
    education: "corporate",
    finance: "corporate",
    creative: "creative",
    restaurant: "vibrant",
    ecommerce: "modern",
    realestate: "corporate",
    legal: "minimal",
    automotive: "modern",
    fitness: "vibrant",
    travel: "creative",
}

// Utility functions
export function getIndustryColors(industry: string) {
    const paletteKey = industryColorMappings[industry as keyof typeof industryColorMappings] || "modern"
    return colorPalettes[paletteKey as keyof typeof colorPalettes]
}

export function generateCSSVariables(paletteKey: string) {
    const colors = colorPalettes[paletteKey as keyof typeof colorPalettes]

    return `
    :root {
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-accent: ${colors.accent};
      --color-background: ${colors.background};
      --color-surface: ${colors.surface};
      --color-text: ${colors.text};
      --color-text-muted: ${colors.textMuted};
      --color-border: ${colors.border};
      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
      --color-error: ${colors.error};
    }
  `
}

export function getComponentStyles(component: string, variant: string, size: string, colors: any) {
    const componentConfig = componentVariants[component as keyof typeof componentVariants]
    if (!componentConfig) return {}

    const variantStyles = componentConfig.variants?.[variant as keyof typeof componentConfig.variants]
    const sizeStyles = componentConfig.sizes?.[size as keyof typeof componentConfig.sizes]

    return {
        ...sizeStyles,
        ...(typeof variantStyles === "function" ? variantStyles(colors) : variantStyles),
    }
}

// Animation presets
export const animations = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
    },
    slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    },
    slideDown: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
    },
    staggerChildren: {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
}

// Grid system
export const gridSystem = {
    container: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 1rem",
    },
    columns: {
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
    },
    gaps: {
        sm: spacing[2],
        md: spacing[4],
        lg: spacing[6],
        xl: spacing[8],
    },
}
