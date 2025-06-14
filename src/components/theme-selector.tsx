"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { allThemes } from "@/lib/theme-system-enhanced"

interface ThemeSelectorProps {
    currentThemeId: string
    onThemeChange: (themeId: string) => void
}

export default function ThemeSelector({ currentThemeId, onThemeChange }: ThemeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const currentTheme = allThemes.find((theme) => theme.id === currentThemeId) || allThemes[0]

    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                    {currentTheme.name}
                </div>
                <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1 text-base ring-1 ring-black ring-opacity-5">
                        {allThemes.map((theme) => (
                            <li
                                key={theme.id}
                                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer ${
                                    theme.id === currentThemeId ? "bg-gray-100" : "hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                    onThemeChange(theme.id)
                                    setIsOpen(false)
                                }}
                            >
                                <div className="flex items-center">
                                    <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                                    <span>{theme.name}</span>
                                </div>
                                {theme.id === currentThemeId && <Check className="w-5 h-5 text-indigo-600" />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
