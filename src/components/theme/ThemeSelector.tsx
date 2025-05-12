"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { applyHostingerTheme } from "@/lib/theme-hostinger"

interface ThemeSelectorProps {
    className?: string
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
    const [theme, setTheme] = useState<"system" | "light" | "dark" | "hostinger">("system")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "system" | "light" | "dark" | "hostinger" | null
        if (savedTheme) {
            setTheme(savedTheme)
            if (savedTheme === "hostinger") {
                applyHostingerTheme()
            }
        }
    }, [])

    useEffect(() => {
        const root = document.documentElement

        if (theme === "hostinger") {
            applyHostingerTheme()
            localStorage.setItem("theme", "hostinger")
            return
        }

        if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")}>
                    Light
                </Button>
                <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")}>
                    Dark
                </Button>
                <Button variant={theme === "hostinger" ? "default" : "outline"} size="sm" onClick={() => setTheme("hostinger")}>
                    Hostinger
                </Button>
            </div>
        </div>
    )
}
