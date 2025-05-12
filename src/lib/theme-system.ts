// Theme system for consistent styling across components

export type ColorScheme = {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
    border: string
}

export type Typography = {
    fontFamily: string
    headingFontFamily?: string
    baseFontSize: string
    scaleRatio: number
    lineHeight: number
    headingLineHeight: number
}

export type Spacing = {
    unit: string
    scale: number[]
}

export type BorderRadius = {
    small: string
    medium: string
    large: string
    full: string
}

export type Shadows = {
    small: string
    medium: string
    large: string
}

export type Animation = {
    duration: {
        fast: string
        medium: string
        slow: string
    }
    easing: {
        easeIn: string
        easeOut: string
        easeInOut: string
    }
}

export interface Theme {
    id: string
    name: string
    description: string
    colors: ColorScheme
    typography: Typography
    spacing: Spacing
    borderRadius: BorderRadius
    shadows: Shadows
    animation: Animation
    isDark: boolean
}

// Predefined themes
export const themes: Theme[] = [
    {
        id: "light-default",
        name: "Light Default",
        description: "Clean, minimal light theme",
        colors: {
            primary: "#3b82f6",
            secondary: "#10b981",
            accent: "#f59e0b",
            background: "#ffffff",
            text: "#0f172a",
            muted: "#f1f5f9",
            border: "#e2e8f0",
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
        id: "dark-default",
        name: "Dark Default",
        description: "Sleek dark theme",
        colors: {
            primary: "#3b82f6",
            secondary: "#10b981",
            accent: "#f59e0b",
            background: "#0f172a",
            text: "#f8fafc",
            muted: "#1e293b",
            border: "#334155",
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
            small: "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.6)",
            medium: "0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)",
            large: "0 10px 25px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.2)",
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
        isDark: true,
    },
    {
        id: "corporate",
        name: "Corporate",
        description: "Professional business theme",
        colors: {
            primary: "#0f4c81",
            secondary: "#6c757d",
            accent: "#ffc107",
            background: "#ffffff",
            text: "#212529",
            muted: "#f8f9fa",
            border: "#dee2e6",
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
            small: "0.2rem",
            medium: "0.375rem",
            large: "0.5rem",
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
        id: "creative",
        name: "Creative",
        description: "Bold, artistic theme",
        colors: {
            primary: "#ff6b6b",
            secondary: "#4ecdc4",
            accent: "#ffd166",
            background: "#f7f7f7",
            text: "#2d3436",
            muted: "#e6e6e6",
            border: "#dddddd",
        },
        typography: {
            fontFamily: "Poppins, sans-serif",
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
            small: "0.5rem",
            medium: "1rem",
            large: "2rem",
            full: "9999px",
        },
        shadows: {
            small: "0 2px 10px rgba(0,0,0,0.05)",
            medium: "0 15px 25px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05)",
            large: "0 20px 40px rgba(0,0,0,0.1)",
        },
        animation: {
            duration: {
                fast: "200ms",
                medium: "400ms",
                slow: "600ms",
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

// Theme context and provider
export function getThemeById(id: string): Theme {
    return themes.find((theme) => theme.id === id) || themes[0]
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
      --color-border: ${theme.colors.border};
      
      --font-family: ${theme.typography.fontFamily};
      --heading-font-family: ${theme.typography.headingFontFamily || theme.typography.fontFamily};
      --base-font-size: ${theme.typography.baseFontSize};
      --line-height: ${theme.typography.lineHeight};
      --heading-line-height: ${theme.typography.headingLineHeight};
      
      --border-radius-small: ${theme.borderRadius.small};
      --border-radius-medium: ${theme.borderRadius.medium};
      --border-radius-large: ${theme.borderRadius.large};
      --border-radius-full: ${theme.borderRadius.full};
      
      --shadow-small: ${theme.shadows.small};
      --shadow-medium: ${theme.shadows.medium};
      --shadow-large: ${theme.shadows.large};
      
      --animation-duration-fast: ${theme.animation.duration.fast};
      --animation-duration-medium: ${theme.animation.duration.medium};
      --animation-duration-slow: ${theme.animation.duration.slow};
      --animation-easing-ease-in: ${theme.animation.easing.easeIn};
      --animation-easing-ease-out: ${theme.animation.easing.easeOut};
      --animation-easing-ease-in-out: ${theme.animation.easing.easeInOut};
    }
  `
}

// Apply theme to component props
export function applyThemeToProps(props: any, theme: Theme): any {
    // This is a simplified example - you would expand this based on your component needs
    return {
        ...props,
        backgroundColor: props.backgroundColor || theme.colors.background,
        textColor: props.textColor || theme.colors.text,
        accentColor: props.accentColor || theme.colors.primary,
        fontFamily: props.fontFamily || theme.typography.fontFamily,
    }
}
