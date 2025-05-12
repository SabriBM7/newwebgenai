"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EducationHeaderProps {
    logo: string
    logoUrl?: string
    menu: Array<{ label: string; link: string; submenu?: Array<{ label: string; link: string }> }>
    buttonText?: string
    buttonLink?: string
    backgroundColor?: string
    textColor?: string
    sticky?: boolean
}

export default function EducationHeader({
                                            logo,
                                            logoUrl,
                                            menu,
                                            buttonText,
                                            buttonLink = "#",
                                            backgroundColor = "#ffffff",
                                            textColor = "#000000",
                                            sticky = false,
                                        }: EducationHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)

    const toggleSubmenu = (index: number) => {
        setOpenSubmenu(openSubmenu === index ? null : index)
    }

    return (
        <header
            className={cn("w-full py-4 z-50", sticky ? "sticky top-0" : "", isMenuOpen ? "bg-opacity-100" : "")}
            style={{ backgroundColor, color: textColor }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            {logoUrl ? (
                                <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10 w-auto mr-2" />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl mr-2">
                                    {logo.charAt(0)}
                                </div>
                            )}
                            <span className="text-xl font-bold">{logo}</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-6">
                            {menu.map((item, index) => (
                                <li key={index} className="relative group">
                                    {item.submenu ? (
                                        <button
                                            className="flex items-center py-2 text-base font-medium hover:text-purple-600 transition-colors"
                                            onClick={() => toggleSubmenu(index)}
                                        >
                                            {item.label}
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.link}
                                            className="py-2 text-base font-medium hover:text-purple-600 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {item.submenu && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                            {item.submenu.map((subitem, subindex) => (
                                                <Link
                                                    key={subindex}
                                                    href={subitem.link}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {subitem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {buttonText && (
                            <Button asChild className="bg-purple-600 hover:bg-purple-700">
                                <Link href={buttonLink}>{buttonText}</Link>
                            </Button>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4">
                        <ul className="space-y-2">
                            {menu.map((item, index) => (
                                <li key={index}>
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                className="flex items-center justify-between w-full py-2 text-base font-medium hover:text-purple-600"
                                                onClick={() => toggleSubmenu(index)}
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${openSubmenu === index ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                            {openSubmenu === index && (
                                                <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                                                    {item.submenu.map((subitem, subindex) => (
                                                        <li key={subindex}>
                                                            <Link href={subitem.link} className="block py-2 text-sm hover:text-purple-600">
                                                                {subitem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <Link href={item.link} className="block py-2 text-base font-medium hover:text-purple-600">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {buttonText && (
                            <div className="mt-4">
                                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Link href={buttonLink}>{buttonText}</Link>
                                </Button>
                            </div>
                        )}
                    </nav>
                )}
            </div>
        </header>
    )
}
