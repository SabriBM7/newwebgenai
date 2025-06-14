// lib/constants.ts

export const COMPONENT_TYPES = {
    HEADER: "header",
    HERO: "hero",
    FEATURES: "features",
    TESTIMONIALS: "testimonials",
    PRICING: "pricing",
    CTA: "cta",
    FAQ: "faq",
    STATS: "stats",
    TEAM: "team",
    NEWSLETTER: "newsletter",
    FOOTER: "footer",
} as const

export const ICON_NAMES = {
    star: "Star",
    check: "CheckCircle",
    zap: "Zap",
    sparkles: "Sparkles",
    cpu: "Cpu",
    database: "Database",
    layers: "Layers",
    phone: "Phone",
    mail: "Mail",
    search: "Search",
} as const

export const COLOR_PALETTE = {
    primary: "#3b82f6",
    secondary: "#10b981",
    accent: "#ff6b6b",
    dark: "#0f172a",
    light: "#f8f9fa",
}

export const FONT_FAMILIES = {
    sans: "Inter, sans-serif",
    serif: "Georgia, serif",
    mono: "Roboto Mono, monospace",
    creative: "Poppins, sans-serif",
    corporate: "Inter, sans-serif",
}

export const BREAKPOINTS = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
}

export const ANIMATIONS = {
    fade: "animate-fade-in",
    slide: "animate-slide-up",
    bounce: "animate-bounce",
    float: "animate-float",
}

export const BUTTON_STYLES = {
    rounded: "rounded-md",
    pill: "rounded-full",
    square: "rounded-none",
}

export const COLORS = {
    white: "#ffffff",
    dark: "#333333",
    gray100: "#f5f5f5",
    primary: "#3b82f6",
    secondary: "#f59e0b",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
    light: "#f3f4f6",

    // Corporate theme colors
    corporate: {
        primary: "#001f3f",
        secondary: "#0074d9",
        accent: "#7fdbff",
        text: "#ffffff",
        background: "#001f3f",
    },

    // Creative theme colors
    creative: {
        primary: "#f4f4f4",
        secondary: "#ff6b6b",
        accent: "#ffd166",
        text: "#333333",
        background: "#f4f4f4",
    },

    // Minimal theme colors
    minimal: {
        primary: "#ffffff",
        secondary: "#000000",
        accent: "#f3f4f6",
        text: "#000000",
        background: "#ffffff",
    },

    // E-commerce theme colors
    ecommerce: {
        primary: "#ffcc00",
        secondary: "#ff6b6b",
        accent: "#4caf50",
        text: "#000000",
        background: "#ffcc00",
    },

    // Education theme colors
    education: {
        primary: "#4CAF50",
        secondary: "#2196F3",
        accent: "#FFC107",
        text: "#ffffff",
        background: "#4CAF50",
    },

    // SaaS theme colors
    saas: {
        primary: "#ff7eb3",
        secondary: "#ff758c",
        accent: "#ffa69e",
        text: "#ffffff",
        background: "linear-gradient(90deg, #ff7eb3, #ff758c)",
    },
}

export const FONTS = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",

    // Font sizes
    size: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
    },

    // Font weights
    weight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
    },
}

// Layout constants
export const LAYOUT = {
    container: "container mx-auto px-4",
    sectionSpacing: "py-12 md:py-24",
    gridCols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
}
