"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn, getAnimationClasses } from "@/lib/utils"
import type { MenuItem, HeaderStyle, Animation } from "@/types"

export interface BaseHeaderProps {
    logo: string
    backgroundColor?: string
    textColor?: string
    logoUrl?: string
    menu: MenuItem[]
    style: HeaderStyle
    height?: string
    fontSize?: string
    animation?: Animation
    sticky?: boolean
    keywords?: string[]
}

export default function BaseHeader({
                                       logo,
                                       backgroundColor = "#ffffff",
                                       textColor = "#000000",
                                       logoUrl,
                                       menu,
                                       style,
                                       height = "80px",
                                       fontSize = "16px",
                                       animation = "none",
                                       sticky = false,
                                       keywords = [],
                                   }: BaseHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        if (sticky) {
            const handleScroll = () => {
                setScrolled(window.scrollY > 20)
            }
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [sticky])

    const headerClasses = cn("w-full transition-all duration-300", getAnimationClasses(animation), {
        "fixed top-0 left-0 z-50": sticky,
        "shadow-md": scrolled && sticky,
    })

    const headerStyles = {
        backgroundColor: backgroundColor,
        color: textColor,
        height: height,
    }

    const menuItemStyles = {
        fontSize: fontSize,
    }

    return (
        <header className={headerClasses} style={headerStyles} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl flex items-center">
                        {logoUrl ? (
                            <Image src={logoUrl || "/placeholder.svg"} alt={logo} width={40} height={40} className="mr-2" />
                        ) : (
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-2">
                                {logo.charAt(0)}
                            </div>
                        )}
                        <span>{logo}</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="hover:text-primary transition-colors duration-200"
                            style={menuItemStyles}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden py-4 px-4" style={{ backgroundColor: backgroundColor }}>
                    <nav className="flex flex-col space-y-4">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className="hover:text-primary transition-colors duration-200"
                                style={menuItemStyles}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
