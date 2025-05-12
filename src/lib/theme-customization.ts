// Theme customization system

export type ThemeColor = {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
}

export type ThemeFont = {
    heading: string
    body: string
}

export type ThemeRadius = {
    small: string
    medium: string
    large: string
    full: string
}

export interface Theme {
    id: string
    name: string
    colors: ThemeColor
    fonts: ThemeFont
    radius: ThemeRadius
    isDark: boolean
}

// Predefined themes
export const themes: Theme[] = [
    {
        id: "default-light",
        name: "Default Light",
        colors: {
            primary: "#3b82f6",
            secondary: "#10b981",
            accent: "#f59e0b",
            background: "#ffffff",
            text: "#0f172a",
            muted: "#f1f5f9",
        },
        fonts: {
            heading: "Inter, sans-serif",
            body: "Inter, sans-serif",
        },
        radius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "1rem",
            full: "9999px",
        },
        isDark: false,
    },
    {
        id: "default-dark",
        name: "Default Dark",
        colors: {
            primary: "#3b82f6",
            secondary: "#10b981",
            accent: "#f59e0b",
            background: "#0f172a",
            text: "#f8fafc",
            muted: "#1e293b",
        },
        fonts: {
            heading: "Inter, sans-serif",
            body: "Inter, sans-serif",
        },
        radius: {
            small: "0.25rem",
            medium: "0.5rem",
            large: "1rem",
            full: "9999px",
        },
        isDark: true,
    },
    {
        id: "purple-dream",
        name: "Purple Dream",
        colors: {
            primary: "#8b5cf6",
            secondary: "#ec4899",
            accent: "#f59e0b",
            background: "#ffffff",
            text: "#1e1b4b",
            muted: "#f5f3ff",
        },
        fonts: {
            heading: "Poppins, sans-serif",
            body: "Inter, sans-serif",
        },
        radius: {
            small: "0.375rem",
            medium: "0.75rem",
            large: "1.5rem",
            full: "9999px",
        },
        isDark: false,
    },
    {
        id: "purple-dream-dark",
        name: "Purple Dream Dark",
        colors: {
            primary: "#8b5cf6",
            secondary: "#ec4899",
            accent: "#f59e0b",
            background: "#1e1b4b",
            text: "#f5f3ff",
            muted: "#4338ca",
        },
        fonts: {
            heading: "Poppins, sans-serif",
            body: "Inter, sans-serif",
        },
        radius: {
            small: "0.375rem",
            medium: "0.75rem",
            large: "1.5rem",
            full: "9999px",
        },
        isDark: true,
    },
    {
        id: "green-nature",
        name: "Green Nature",
        colors: {
            primary: "#10b981",
            secondary: "#3b82f6",
            accent: "#f59e0b",
            background: "#ffffff",
            text: "#064e3b",
            muted: "#ecfdf5",
        },
        fonts: {
            heading: "Montserrat, sans-serif",
            body: "Roboto, sans-serif",
        },
        radius: {
            small: "0.125rem",
            medium: "0.25rem",
            large: "0.5rem",
            full: "9999px",
        },
        isDark: false,
    },
    {
        id: "green-nature-dark",
        name: "Green Nature Dark",
        colors: {
            primary: "#10b981",
            secondary: "#3b82f6",
            accent: "#f59e0b",
            background: "#064e3b",
            text: "#ecfdf5",
            muted: "#065f46",
        },
        fonts: {
            heading: "Montserrat, sans-serif",
            body: "Roboto, sans-serif",
        },
        radius: {
            small: "0.125rem",
            medium: "0.25rem",
            large: "0.5rem",
            full: "9999px",
        },
        isDark: true,
    },
    {
        id: "corporate-blue",
        name: "Corporate Blue",
        colors: {
            primary: "#1e40af",
            secondary: "#0f766e",
            accent: "#b45309",
            background: "#ffffff",
            text: "#0f172a",
            muted: "#f1f5f9",
        },
        fonts: {
            heading: "Roboto, sans-serif",
            body: "Roboto, sans-serif",
        },
        radius: {
            small: "0.125rem",
            medium: "0.25rem",
            large: "0.375rem",
            full: "9999px",
        },
        isDark: false,
    },
    {
        id: "creative-pink",
        name: "Creative Pink",
        colors: {
            primary: "#ec4899",
            secondary: "#8b5cf6",
            accent: "#f59e0b",
            background: "#ffffff",
            text: "#831843",
            muted: "#fce7f3",
        },
        fonts: {
            heading: "Playfair Display, serif",
            body: "Poppins, sans-serif",
        },
        radius: {
            small: "0.5rem",
            medium: "1rem",
            large: "2rem",
            full: "9999px",
        },
        isDark: false,
    },
]

// Get theme by ID
export function getThemeById(id: string): Theme {
    return themes.find((theme) => theme.id === id) || themes[0]
}

// Apply theme to component props
export function applyThemeToProps(props: any, theme: Theme): any {
    return {
        ...props,
        backgroundColor: props.backgroundColor || theme.colors.background,
        textColor: props.textColor || theme.colors.text,
        accentColor: props.accentColor || theme.colors.primary,
        fontFamily: props.fontFamily || theme.fonts.body,
    }
}

// Generate CSS variables from theme
export function generateThemeVariables(theme: Theme): string {
    return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-background: ${theme.colors.background};
      --color-text: ${theme.colors.text};
      --color-muted: ${theme.colors.muted};
      
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
      
      --radius-small: ${theme.radius.small};
      --radius-medium: ${theme.radius.medium};
      --radius-large: ${theme.radius.large};
      --radius-full: ${theme.radius.full};
    }
  `
}
