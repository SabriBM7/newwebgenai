"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CorporateHeaderProps } from "@/lib/types"
import { COLORS } from "@/lib/constants"

export default function CorporateHeader({
                                            logo,
                                            logoUrl,
                                            backgroundColor = COLORS.white,
                                            textColor = COLORS.dark,
                                            menu,
                                            keywords = ["business", "enterprise"],
                                            fontSize = "16px",
                                            height = "80px",
                                            sticky = true,
                                            contactInfo,
                                            buttonText = "Contact Us",
                                            topBar = false,
                                            topBarColor = COLORS.gray100,
                                            logoAlignment = "left",
                                            menuAlignment = "right",
                                        }: CorporateHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Alignment utilities using constants
    const alignmentClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }

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
                            {keywords?.map((keyword, index) => (
                                <span
                                    key={`keyword-${index}-${keyword}`}
                                    className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
                                >
                  {keyword}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <header
                className={cn("w-full transition-all duration-300", sticky && "fixed top-0 left-0 z-50", "shadow-md")}
                style={{
                    backgroundColor,
                    color: textColor,
                    height,
                    fontSize,
                    top: topBar ? "32px" : "0",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    <div className={cn("flex items-center", alignmentClasses[logoAlignment])}>
                        <Link href="/" className="flex items-center gap-2">
                            {logoUrl ? (
                                <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10" />
                            ) : (
                                <div className="font-bold text-2xl">{logo}</div>
                            )}
                        </Link>
                    </div>

                    <nav className={cn("hidden md:flex items-center gap-6", alignmentClasses[menuAlignment])}>
                        {menu.map((item, index) => (
                            <Link
                                key={`menu-${index}-${item.label}`}
                                href={item.link || "#"}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {item.label}
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
                            {menu.map((item, index) => (
                                <Link
                                    key={`mobile-menu-${index}-${item.label}`}
                                    href={item.link || "#"}
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
        </>
    )
}
