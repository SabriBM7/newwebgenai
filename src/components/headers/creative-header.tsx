"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MenuItem {
    label: string
    link: string
}

export interface CreativeHeaderProps {
    logo: string
    logoUrl?: string
    backgroundColor?: string
    textColor?: string
    menu: MenuItem[]
    style?: "creative" | "artistic" | "playful"
    keywords?: string[]
    fontSize?: string
    height?: string
    animation?: "bounce" | "float" | "none"
    buttonStyle?: "rounded" | "pill" | "square"
    logoAnimation?: boolean
    searchEnabled?: boolean
    colorAccent?: string
    borderStyle?: "none" | "dotted" | "dashed"
    itemSpacing?: "tight" | "normal" | "wide"
}

export default function CreativeHeader({
                                           logo,
                                           logoUrl,
                                           backgroundColor = "#ffffff",
                                           textColor = "#333333",
                                           menu,
                                           style = "creative",
                                           keywords = ["creative", "design", "artistic"],
                                           fontSize = "16px",
                                           height = "80px",
                                           animation = "float",
                                           buttonStyle = "rounded",
                                           logoAnimation = true,
                                           searchEnabled = false,
                                           colorAccent = "#ff6b6b",
                                           borderStyle = "none",
                                           itemSpacing = "normal",
                                       }: CreativeHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    // Style generators
    const getAnimationClass = () => {
        switch (animation) {
            case "bounce": return "hover:animate-bounce"
            case "float": return "hover:animate-pulse"
            default: return ""
        }
    }

    const getStyleClasses = () => {
        switch (style) {
            case "artistic": return "font-serif italic"
            case "playful": return "font-mono tracking-wide"
            default: return "font-sans"
        }
    }

    const getButtonClasses = () => {
        switch (buttonStyle) {
            case "pill": return "rounded-full px-6"
            case "square": return "rounded-none"
            default: return "rounded-md"
        }
    }

    const getBorderClass = () => {
        switch (borderStyle) {
            case "dotted": return "border-dotted"
            case "dashed": return "border-dashed"
            default: return "border-none"
        }
    }

    const getSpacingClass = () => {
        switch (itemSpacing) {
            case "tight": return "gap-2"
            case "wide": return "gap-8"
            default: return "gap-6"
        }
    }

    // Fixed hover style for mobile links
    const mobileLinkClass = cn(
        "text-sm font-medium transition-colors",
        `hover:text-[${colorAccent}]` // Dynamic hover color
    )

    return (
        <header
            className={cn(
                "w-full transition-all duration-300 border-b",
                getStyleClasses(),
                getBorderClass()
            )}
            style={{
                backgroundColor,
                color: textColor,
                height,
                fontSize,
                borderColor: colorAccent,
            }}
        >
            {/* Header content remains the same until mobile navigation */}

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden py-4 pb-6 border-t">
                    <nav className="flex flex-col space-y-4">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className={mobileLinkClass}
                                style={{ color: textColor }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Rest of mobile content remains the same */}
                    </nav>
                </div>
            )}
        </header>
    )
}