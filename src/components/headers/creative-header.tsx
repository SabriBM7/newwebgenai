"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CreativeHeaderProps } from "@/lib/types"

export default function CreativeHeader({
                                           logo,
                                           logoUrl,
                                           backgroundColor = "#ffffff",
                                           textColor = "#333333",
                                           menu,
                                           keywords = ["creative", "design", "innovation"],
                                           fontSize = "16px",
                                           height = "80px",
                                           sticky = true,
                                           animation = "fade-in",
                                           accentColor = "#ff6b6b",
                                           transparent = false,
                                           buttonText = "Contact",
                                       }: CreativeHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Use transparent background only when at the top of the page
    const headerStyle = {
        backgroundColor: transparent && !scrolled ? "transparent" : backgroundColor,
        color: textColor,
        height,
        fontSize,
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
    }

    return (
        <header
            className={cn(
                "w-full transition-all duration-300",
                sticky && "fixed top-0 left-0 z-50",
                transparent && "absolute",
            )}
            style={headerStyle}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {logoUrl ? (
                        <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10" />
                    ) : (
                        <div className="font-bold text-2xl">{logo}</div>
                    )}
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {menu.map((item) => (
                        <Link
                            key={item.label}
                            href={item.link}
                            className="text-sm font-medium hover:text-primary transition-colors relative group"
                        >
                            {item.label}
                            <span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: accentColor }}
                            ></span>
                        </Link>
                    ))}
                    <Button variant="default" size="sm">
                        {buttonText}
                    </Button>
                </nav>

                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden py-4 px-4 border-t" style={{ backgroundColor }}>
                    <nav className="flex flex-col space-y-4">
                        {menu.map((item) => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Button variant="default" size="sm" className="mt-2">
                            {buttonText}
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
