"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { themes, type Theme, getThemeById } from "@/lib/theme-customization"
import { cn } from "@/lib/utils"

interface ThemeCustomizerProps {
    onThemeChange?: (theme: Theme) => void
    initialThemeId?: string
    className?: string
}

export function ThemeCustomizer({ onThemeChange, initialThemeId = "default-light", className }: ThemeCustomizerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState<Theme>(getThemeById(initialThemeId))
    const [mode, setMode] = useState<"light" | "dark">("light")

    useEffect(() => {
        // Load theme from localStorage if available
        const savedThemeId = localStorage.getItem("theme-id")
        if (savedThemeId) {
            const theme = getThemeById(savedThemeId)
            setSelectedTheme(theme)
            setMode(theme.isDark ? "dark" : "light")
            if (onThemeChange) {
                onThemeChange(theme)
            }
        }
    }, [onThemeChange])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleThemeSelect = (theme: Theme) => {
        setSelectedTheme(theme)
        setMode(theme.isDark ? "dark" : "light")
        localStorage.setItem("theme-id", theme.id)

        if (onThemeChange) {
            onThemeChange(theme)
        }

        setIsOpen(false)
    }

    const toggleMode = () => {
        const newMode = mode === "light" ? "dark" : "light"
        setMode(newMode)

        // Find a matching theme with the same base but opposite mode
        const currentThemeBase = selectedTheme.id.replace(/-dark$/, "")
        const matchingTheme = themes.find((theme) => {
            const isMatchingMode = newMode === "dark" ? theme.isDark : !theme.isDark
            const themeBase = theme.id.replace(/-dark$/, "")
            return themeBase === currentThemeBase && isMatchingMode
        })

        if (matchingTheme) {
            handleThemeSelect(matchingTheme)
        }
    }

    // Filter themes based on current mode
    const filteredThemes = themes.filter((theme) => theme.isDark === (mode === "dark"))

    return (
        <div className={cn("relative", className)}>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={toggleDropdown}>
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: selectedTheme.colors.primary }} />
                    <span>{selectedTheme.name}</span>
                    <ChevronDown size={16} />
                </Button>

                <Button variant="outline" size="sm" onClick={toggleMode}>
                    {mode === "light" ? "Dark" : "Light"}
                </Button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 p-2 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-1">
                        {filteredThemes.map((theme) => (
                            <button
                                key={theme.id}
                                className={cn(
                                    "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left",
                                    selectedTheme.id === theme.id && "bg-gray-100 dark:bg-gray-700",
                                )}
                                onClick={() => handleThemeSelect(theme)}
                            >
                                <div
                                    className="h-5 w-5 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: theme.colors.primary }}
                                >
                                    {selectedTheme.id === theme.id && <Check size={12} className="text-white" />}
                                </div>
                                <span>{theme.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
