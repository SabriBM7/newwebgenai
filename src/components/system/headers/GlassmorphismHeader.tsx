"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GlassmorphismHeaderProps {
    logo?: string
    companyName?: string
    navigation?: Array<{ name: string; href: string }>
    showSearch?: boolean
    showNotifications?: boolean
    showProfile?: boolean
    theme?: any
}

export function GlassmorphismHeader({
                                        logo,
                                        companyName = "Your Company",
                                        navigation = [
                                            { name: "Home", href: "#" },
                                            { name: "About", href: "#about" },
                                            { name: "Services", href: "#services" },
                                            { name: "Portfolio", href: "#portfolio" },
                                            { name: "Contact", href: "#contact" },
                                        ],
                                        showSearch = true,
                                        showNotifications = true,
                                        showProfile = true,
                                        theme,
                                    }: GlassmorphismHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? "bg-white/20 backdrop-blur-xl border-b border-white/20" : "bg-white/10 backdrop-blur-lg"
            }`}
            style={{
                background: isScrolled ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
            }}
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        {logo && (
                            <div className="relative">
                                <img
                                    src={logo || "/placeholder.svg"}
                                    alt={companyName}
                                    className="h-10 w-10 rounded-full border-2 border-white/30 shadow-lg"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
                            </div>
                        )}
                        <span className="text-xl font-bold text-white drop-shadow-lg">{companyName}</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigation.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="relative text-white/90 hover:text-white transition-all duration-300 group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        {showSearch && (
                            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white">
                                <Search className="h-5 w-5" />
                            </button>
                        )}

                        {/* Notifications */}
                        {showNotifications && (
                            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        )}

                        {/* Profile */}
                        {showProfile && (
                            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white">
                                <User className="h-5 w-5" />
                            </button>
                        )}

                        {/* CTA Button */}
                        <Button className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            Get Started
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden transition-all duration-300 overflow-hidden ${
                        isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        className="rounded-2xl p-4 space-y-3"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        {navigation.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-white/20">
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
