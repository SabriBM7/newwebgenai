"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MenuItem {
    label: string
    link: string
    subItems?: MenuItem[]
}

export interface CorporateHeaderProps {
    logo: string
    logoUrl?: string
    backgroundColor?: string
    textColor?: string
    menu: MenuItem[]
    style?: "corporate" | "professional" | "enterprise"
    keywords?: string[]
    fontSize?: string
    height?: string
    sticky?: boolean
    contactInfo?: {
        phone?: string
        email?: string
    }
    buttonText?: string
    topBar?: boolean
    topBarColor?: string
    logoAlignment?: "left" | "center"
    menuAlignment?: "left" | "center" | "right"
    shadow?: boolean
}

export default function CorporateHeader({
                                            logo,
                                            logoUrl,
                                            backgroundColor = "#ffffff",
                                            textColor = "#333333",
                                            menu,
                                            style = "corporate",
                                            keywords = ["business", "enterprise", "professional"],
                                            fontSize = "16px",
                                            height = "80px",
                                            sticky = true,
                                            contactInfo,
                                            buttonText = "Contact Us",
                                            topBar = false,
                                            topBarColor = "#f5f5f5",
                                            logoAlignment = "left",
                                            menuAlignment = "right",
                                            shadow = true,
                                        }: CorporateHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

    const toggleDropdown = (label: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [label]: !prev[label],
        }))
    }

    const getStyleClasses = () => {
        switch (style) {
            case "professional":
                return "font-serif"
            case "enterprise":
                return "font-sans tracking-wide"
            default:
                return "font-sans"
        }
    }

    const getLogoAlignmentClass = () => {
        switch (logoAlignment) {
            case "center":
                return "justify-center"
            default:
                return "justify-start"
        }
    }

    const getMenuAlignmentClass = () => {
        switch (menuAlignment) {
            case "left":
                return "justify-start"
            case "center":
                return "justify-center"
            default:
                return "justify-end"
        }
    }

    const headerClasses = cn("w-full transition-all duration-300", getStyleClasses(), {
        "fixed top-0 left-0 z-50": sticky,
        "shadow-md": shadow,
    })

    return (
        <>
            {topBar && (
                <div className="w-full py-2 text-sm" style={{ backgroundColor: topBarColor }}>
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {contactInfo?.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone size={14} />
                                    <span>{contactInfo.phone}</span>
                                </div>
                            )}
                            {contactInfo?.email && (
                                <div className="flex items-center gap-1">
                                    <Mail size={14} />
                                    <span>{contactInfo.email}</span>
                                </div>
                            )}
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            {keywords && keywords.length > 0 && (
                                <div className="flex gap-2">
                                    {keywords.map((keyword, index) => (
                                        <span key={index} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {keyword}
                    </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header
                className={headerClasses}
                style={{
                    backgroundColor,
                    color: textColor,
                    height,
                    fontSize,
                    top: topBar ? "32px" : "0",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    <div className={cn("flex items-center", getLogoAlignmentClass())}>
                        <Link href="/public" className="flex items-center gap-2">
                            {logoUrl ? (
                                <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10" />
                            ) : (
                                <div className="font-bold text-2xl">{logo}</div>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={cn("hidden md:flex items-center gap-6", getMenuAlignmentClass())}>
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
                                            "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
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
                        <Button variant="default" size="sm">
                            {buttonText}
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

                            {keywords && keywords.length > 0 && (
                                <div className="flex flex-wrap gap-2 my-2">
                                    {keywords.map((keyword, index) => (
                                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {keyword}
                    </span>
                                    ))}
                                </div>
                            )}

                            <Button className="w-full mt-2" onClick={() => setIsMenuOpen(false)}>
                                {buttonText}
                            </Button>
                        </nav>
                    </div>
                )}
            </header>
        </>
    )
}

