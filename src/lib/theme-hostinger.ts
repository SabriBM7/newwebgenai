// This file adds Hostinger-inspired theme colors that can be toggled

import { createTheme } from "./theme-system"

export const hostingerTheme = createTheme({
    name: "hostinger",
    colors: {
        light: {
            primary: "oklch(0.45 0.27 296)", // Purple
            "primary-foreground": "oklch(0.985 0 0)",
            secondary: "oklch(0.97 0 0)",
            "secondary-foreground": "oklch(0.45 0.27 296)",
            accent: "oklch(0.45 0.27 296 / 15%)",
            "accent-foreground": "oklch(0.45 0.27 296)",
            background: "oklch(1 0 0)",
            foreground: "oklch(0.145 0 0)",
        },
        dark: {
            primary: "oklch(0.65 0.27 296)", // Lighter purple for dark mode
            "primary-foreground": "oklch(0.145 0 0)",
            secondary: "oklch(0.269 0 0)",
            "secondary-foreground": "oklch(0.65 0.27 296)",
            accent: "oklch(0.65 0.27 296 / 25%)",
            "accent-foreground": "oklch(0.65 0.27 296)",
            background: "oklch(0.145 0 0)",
            foreground: "oklch(0.985 0 0)",
        },
    },
})

// Add a function to apply the Hostinger theme
export function applyHostingerTheme() {
    document.documentElement.style.setProperty("--primary", "oklch(0.45 0.27 296)")
    document.documentElement.style.setProperty("--primary-foreground", "oklch(0.985 0 0)")
    document.documentElement.style.setProperty("--accent", "oklch(0.45 0.27 296 / 15%)")
    document.documentElement.style.setProperty("--accent-foreground", "oklch(0.45 0.27 296)")

    // For dark mode
    document.documentElement.style.setProperty("--dark-primary", "oklch(0.65 0.27 296)")
    document.documentElement.style.setProperty("--dark-primary-foreground", "oklch(0.145 0 0)")
    document.documentElement.style.setProperty("--dark-accent", "oklch(0.65 0.27 296 / 25%)")
    document.documentElement.style.setProperty("--dark-accent-foreground", "oklch(0.65 0.27 296)")
}
