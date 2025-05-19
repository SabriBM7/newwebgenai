"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface MenuItem {
    label: string
    link: string
}

interface SimpleHeaderProps {
    logo?: string
    logoUrl?: string
    menu?: MenuItem[]
    buttonText?: string
    buttonLink?: string
    backgroundColor?: string
    textColor?: string
}

export default function SimpleHeader({
                                         logo = "Logo",
                                         logoUrl,
                                         menu = [],
                                         buttonText = "Get Started",
                                         buttonLink = "#",
                                         backgroundColor = "#ffffff",
                                         textColor = "#000000",
                                     }: SimpleHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Ensure menu is always an array
    const safeMenu = Array.isArray(menu) ? menu : []

    return (
        <header className="w-full py-4" style={{ backgroundColor, color: textColor }}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        {logoUrl ? (
                            <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-8" />
                        ) : (
                            <span className="text-xl font-bold">{logo}</span>
                        )}
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        {safeMenu.map((item, index) => (
                            <Link key={index} href={item.link || "#"} className="text-sm font-medium hover:opacity-80">
                                {item.label}
                            </Link>
                        ))}

                        <Button asChild>
                            <Link href={buttonLink || "#"}>{buttonText}</Link>
                        </Button>
                    </nav>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            {safeMenu.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link || "#"}
                                    className="text-sm font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Button asChild className="mt-2">
                                <Link href={buttonLink || "#"}>{buttonText}</Link>
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
