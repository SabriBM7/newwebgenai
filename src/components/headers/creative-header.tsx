"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { Menu, X, Sparkles, Search } from "lucide-react"
import { cn } from "../../../../lib/utils"

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

    const getAnimationClass = () => {
        switch (animation) {
            case "bounce":
                return "hover:animate-bounce"
            case "float":
                return "hover:animate-pulse"
            default:
                return ""
        }
    }

    const getStyleClasses = () => {
        switch (style) {
            case "artistic":
                return "font-serif italic"
            case "playful":
                return "font-mono tracking-wide"
            default:
                return "font-sans"
        }
    }

    const getButtonClasses = () => {
        switch (buttonStyle) {
            case "pill":
                return "rounded-full px-6"
            case "square":
                return "rounded-none"
            default:
                return "rounded-md"
        }
    }

    const getBorderClass = () => {
        switch (borderStyle) {
            case "dotted":
                return "border-dotted"
            case "dashed":
                return "border-dashed"
            default:
                return "border-none"
        }
    }

    const getSpacingClass = () => {
        switch (itemSpacing) {
            case "tight":
                return "gap-2"
            case "wide":
                return "gap-8"
            default:
                return "gap-6"
        }
    }

    return (
        <header
            className={cn("w-full transition-all duration-300 border-b", getStyleClasses(), getBorderClass())}
            style={{
                backgroundColor,
                color: textColor,
                height,
                fontSize,
                borderColor: colorAccent,
            }}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/public" className="flex items-center gap-2">
                        {logoUrl ? (
                            <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10" />
                        ) : (
                            <div
                                className={cn(
                                    "font-bold text-2xl flex items-center gap-1",
                                    logoAnimation && "hover:scale-105 transition-transform",
                                )}
                            >
                                {logo}
                                <Sparkles size={20} className="text-primary" style={{ color: colorAccent }} />
                            </div>
                        )}
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={cn("hidden md:flex items-center", getSpacingClass())}>
                    {keywords && keywords.length > 0 && (
                        <div className="flex gap-2 mr-4">
                            {keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ backgroundColor: `${colorAccent}20`, color: colorAccent }}
                                >
                  {keyword}
                </span>
                            ))}
                        </div>
                    )}

                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={cn("text-sm font-medium transition-colors relative group", getAnimationClass())}
                        >
                            {item.label}
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                style={{ backgroundColor: colorAccent }}
                            ></span>
                        </Link>
                    ))}

                    {searchEnabled && (
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                            <Search size={18} />
                        </button>
                    )}

                    <Button className={getButtonClasses()} style={{ backgroundColor: colorAccent, color: "#fff" }}>
                        Get in Touch
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
                <div className="container mx-auto px-4 py-2 border-t">
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="w-full p-2 pl-10 rounded-md border" />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    </div>
                </div>
            )}

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden py-4 pb-6 border-t">
                    <nav className="flex flex-col space-y-4">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ color: textColor, ":hover": { color: colorAccent } }}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {keywords && keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 my-2">
                                {keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-full"
                                        style={{ backgroundColor: `${colorAccent}20`, color: colorAccent }}
                                    >
                    {keyword}
                  </span>
                                ))}
                            </div>
                        )}

                        <Button
                            className={cn("w-full mt-2", getButtonClasses())}
                            style={{ backgroundColor: colorAccent, color: "#fff" }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get in Touch
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

