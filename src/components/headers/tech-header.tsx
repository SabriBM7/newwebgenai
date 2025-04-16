"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MenuItem {
    label: string
    link: string
    subItems?: MenuItem[]
}

export interface TechHeaderProps {
    logo: string
    logoUrl?: string
    backgroundColor?: string
    textColor?: string
    menu: MenuItem[]
    style?: "modern" | "classic" | "futuristic"
    keywords?: string[]
    fontSize?: string
    height?: string
    sticky?: boolean
    animation?: "fade" | "slide" | "none"
    buttonVariant?: "default" | "outline" | "ghost"
    logoSize?: "small" | "medium" | "large"
    dropdownStyle?: "hover" | "click"
    borderBottom?: boolean
    glassEffect?: boolean
}

export default function TechHeader({
                                       logo,
                                       logoUrl,
                                       backgroundColor = "#0f172a",
                                       textColor = "#ffffff",
                                       menu,
                                       style = "modern",
                                       keywords = ["technology", "solutions", "innovative"],
                                       fontSize = "16px",
                                       height = "80px",
                                       sticky = true,
                                       animation = "fade",
                                       buttonVariant = "default",
                                       logoSize = "medium",
                                       dropdownStyle = "hover",
                                       borderBottom = true,
                                       glassEffect = false,
                                   }: TechHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

    const toggleDropdown = (label: string) => {
        if (dropdownStyle === "click") {
            setOpenDropdowns((prev) => ({
                ...prev,
                [label]: !prev[label],
            }))
        }
    }

    const getLogoSizeClass = () => {
        switch (logoSize) {
            case "small":
                return "text-xl"
            case "large":
                return "text-3xl"
            default:
                return "text-2xl"
        }
    }

    const getAnimationClass = () => {
        switch (animation) {
            case "fade":
                return "animate-fade-in"
            case "slide":
                return "animate-slide-down"
            default:
                return ""
        }
    }

    const getStyleClasses = () => {
        switch (style) {
            case "classic":
                return "font-serif"
            case "futuristic":
                return "font-mono tracking-wider"
            default:
                return "font-sans"
        }
    }

    const headerClasses = cn("w-full transition-all duration-300", getStyleClasses(), getAnimationClass(), {
        "fixed top-0 left-0": sticky,
        "border-b": borderBottom,
        "bg-opacity-80 backdrop-blur-md": glassEffect,
    })

    return (
        <header
            className={headerClasses}
            style={{
                backgroundColor,
                color: textColor,
                height,
                fontSize,
            }}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/public" className="flex items-center gap-2">
                        {logoUrl ? (
                            <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10" />
                        ) : (
                            <div className={cn("font-bold", getLogoSizeClass())}>{logo}</div>
                        )}
                    </Link>
                    {keywords && keywords.length > 0 && (
                        <div className="hidden md:flex gap-2 ml-4">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {keyword}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {menu.map((item, index) => (
                        <div key={index} className="relative group">
                            {item.subItems ? (
                                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleDropdown(item.label)}>
                                    <span className="text-sm font-medium hover:text-primary transition-colors">{item.label}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            ) : (
                                <Link href={item.link} className="text-sm font-medium hover:text-primary transition-colors">
                                    {item.label}
                                </Link>
                            )}

                            {item.subItems && (
                                <div
                                    className={cn(
                                        "absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-background border overflow-hidden transition-all duration-200",
                                        dropdownStyle === "hover"
                                            ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                                            : openDropdowns[item.label]
                                                ? "opacity-100 visible"
                                                : "opacity-0 invisible",
                                    )}
                                >
                                    <div className="py-1">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <Link key={subIndex} href={subItem.link} className="block px-4 py-2 text-sm hover:bg-muted">
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Button variant={buttonVariant} size="sm">
                        Get Started
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden py-4 pb-6 border-t">
                    <nav className="flex flex-col space-y-4">
                        {menu.map((item, index) => (
                            <div key={index}>
                                {item.subItems ? (
                                    <>
                                        <div className="flex items-center justify-between" onClick={() => toggleDropdown(item.label)}>
                                            <span className="text-sm font-medium">{item.label}</span>
                                            <ChevronDown
                                                className={cn("h-4 w-4 transition-transform", openDropdowns[item.label] ? "rotate-180" : "")}
                                            />
                                        </div>
                                        {openDropdowns[item.label] && (
                                            <div className="ml-4 mt-2 flex flex-col space-y-2">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        href={subItem.link}
                                                        className="text-sm text-muted-foreground hover:text-foreground"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.link}
                                        className="text-sm font-medium hover:text-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Button variant={buttonVariant} className="w-full mt-4" onClick={() => setIsMenuOpen(false)}>
                            Get Started
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

