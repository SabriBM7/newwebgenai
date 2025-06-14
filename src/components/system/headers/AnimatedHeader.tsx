"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnimatedHeaderProps {
    logo?: string
    companyName?: string
    navigation?: Array<{
        name: string
        href: string
        submenu?: Array<{ name: string; href: string }>
    }>
    ctaText?: string
    theme?: any
}

export function AnimatedHeader({
                                   logo,
                                   companyName = "Your Company",
                                   navigation = [
                                       { name: "Home", href: "#" },
                                       { name: "About", href: "#about" },
                                       { name: "Services", href: "#services" },
                                       { name: "Contact", href: "#contact" },
                                   ],
                                   ctaText = "Get Started",
                                   theme,
                               }: AnimatedHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        {logo && (
                            <img
                                src={logo || "/placeholder.svg"}
                                alt={companyName}
                                className="h-8 w-8 transition-transform duration-300 hover:scale-110"
                            />
                        )}
                        <span
                            className={`text-xl font-bold transition-colors duration-300 ${
                                isScrolled ? "text-gray-900" : "text-white"
                            }`}
                        >
              {companyName}
            </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item, index) => (
                            <div key={index} className="relative group">
                                <a
                                    href={item.href}
                                    className={`transition-all duration-300 hover:scale-105 ${
                                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-300"
                                    }`}
                                >
                                    {item.name}
                                </a>
                                {item.submenu && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <a
                                                key={subIndex}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button
                            className={`transition-all duration-300 hover:scale-105 ${
                                isScrolled ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
                            }`}
                        >
                            {ctaText}
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <X className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
                        ) : (
                            <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="pt-4 pb-2 space-y-2">
                        {navigation.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                                    isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="pt-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">{ctaText}</Button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
