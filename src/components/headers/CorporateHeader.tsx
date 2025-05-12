"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuItem {
    label: string
    link: string
    submenu?: MenuItem[]
}

interface CorporateHeaderProps {
    logo?: string
    logoUrl?: string
    menu: MenuItem[]
    buttonText?: string
    buttonLink?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    showTopBar?: boolean
    contactPhone?: string
    contactEmail?: string
}

export default function CorporateHeader({
                                            logo = "Company",
                                            logoUrl,
                                            menu = [],
                                            buttonText = "Contact Us",
                                            buttonLink = "#contact",
                                            backgroundColor = "#ffffff",
                                            textColor = "#000000",
                                            accentColor = "#2563eb",
                                            showTopBar = true,
                                            contactPhone,
                                            contactEmail,
                                        }: CorporateHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const toggleSubmenu = (label: string) => {
        if (activeSubmenu === label) {
            setActiveSubmenu(null)
        } else {
            setActiveSubmenu(label)
        }
    }

    const headerStyle = {
        backgroundColor,
        color: textColor,
    }

    const buttonStyle = {
        backgroundColor: accentColor,
    }

    return (
        <header style={headerStyle}>
            {showTopBar && (
                <div className="bg-gray-100 py-2 text-sm border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                {contactPhone && (
                                    <a href={`tel:${contactPhone}`} className="flex items-center hover:text-gray-600">
                                        <Phone size={14} className="mr-1" />
                                        <span>{contactPhone}</span>
                                    </a>
                                )}
                                {contactEmail && (
                                    <a href={`mailto:${contactEmail}`} className="flex items-center hover:text-gray-600">
                                        <Mail size={14} className="mr-1" />
                                        <span>{contactEmail}</span>
                                    </a>
                                )}
                            </div>
                            <div>
                                <a href="#" className="hover:text-gray-600 mr-4">
                                    Support
                                </a>
                                <a href="#" className="hover:text-gray-600">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        {logoUrl ? (
                            <Link href="/">
                                <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-10 w-auto" />
                            </Link>
                        ) : (
                            <Link href="/" className="text-xl font-bold">
                                {logo}
                            </Link>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menu.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.submenu ? (
                                    <button
                                        className="flex items-center text-base font-medium hover:text-gray-600 py-2"
                                        onClick={() => toggleSubmenu(item.label)}
                                    >
                                        {item.label}
                                        <ChevronDown size={16} className="ml-1" />
                                    </button>
                                ) : (
                                    <Link href={item.link} className="text-base font-medium hover:text-gray-600">
                                        {item.label}
                                    </Link>
                                )}

                                {item.submenu && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                        {item.submenu.map((subitem) => (
                                            <Link key={subitem.label} href={subitem.link} className="block px-4 py-2 hover:bg-gray-100">
                                                {subitem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button asChild style={buttonStyle}>
                            <Link href={buttonLink}>{buttonText}</Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden bg-white absolute left-0 right-0 z-20 shadow-lg transition-transform duration-300 transform",
                    mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
                )}
            >
                <div className="container mx-auto px-4 py-4">
                    <nav className="space-y-4">
                        {menu.map((item) => (
                            <div key={item.label} className="py-2">
                                {item.submenu ? (
                                    <div>
                                        <button
                                            className="flex items-center justify-between w-full text-left text-base font-medium"
                                            onClick={() => toggleSubmenu(item.label)}
                                        >
                                            {item.label}
                                            <ChevronDown
                                                size={16}
                                                className={cn(
                                                    "transition-transform duration-200",
                                                    activeSubmenu === item.label ? "rotate-180" : "",
                                                )}
                                            />
                                        </button>
                                        {activeSubmenu === item.label && (
                                            <div className="mt-2 ml-4 space-y-2">
                                                {item.submenu.map((subitem) => (
                                                    <Link
                                                        key={subitem.label}
                                                        href={subitem.link}
                                                        className="block py-2 text-sm"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {subitem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link href={item.link} className="block text-base font-medium" onClick={toggleMobileMenu}>
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Button asChild className="w-full" style={buttonStyle}>
                                <Link href={buttonLink} onClick={toggleMobileMenu}>
                                    {buttonText}
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
