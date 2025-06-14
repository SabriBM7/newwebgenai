"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MegaMenuHeaderProps {
    logo?: string
    companyName?: string
    megaMenuItems?: Array<{
        name: string
        href: string
        sections?: Array<{
            title: string
            items: Array<{ name: string; href: string; description?: string }>
        }>
    }>
    regularItems?: Array<{ name: string; href: string }>
    theme?: any
}

export function MegaMenuHeader({
                                   logo,
                                   companyName = "Your Company",
                                   megaMenuItems = [
                                       {
                                           name: "Services",
                                           href: "#services",
                                           sections: [
                                               {
                                                   title: "Web Development",
                                                   items: [
                                                       { name: "Frontend Development", href: "#frontend", description: "Modern React & Next.js solutions" },
                                                       { name: "Backend Development", href: "#backend", description: "Scalable server-side applications" },
                                                       { name: "Full-Stack Solutions", href: "#fullstack", description: "End-to-end web applications" },
                                                   ],
                                               },
                                               {
                                                   title: "Design Services",
                                                   items: [
                                                       { name: "UI/UX Design", href: "#uiux", description: "User-centered design approach" },
                                                       { name: "Brand Identity", href: "#branding", description: "Complete brand design packages" },
                                                       { name: "Web Design", href: "#webdesign", description: "Beautiful, responsive websites" },
                                                   ],
                                               },
                                               {
                                                   title: "Consulting",
                                                   items: [
                                                       { name: "Strategy Consulting", href: "#strategy", description: "Digital transformation guidance" },
                                                       { name: "Technical Audit", href: "#audit", description: "Comprehensive system reviews" },
                                                       {
                                                           name: "Performance Optimization",
                                                           href: "#optimization",
                                                           description: "Speed and efficiency improvements",
                                                       },
                                                   ],
                                               },
                                           ],
                                       },
                                       {
                                           name: "Solutions",
                                           href: "#solutions",
                                           sections: [
                                               {
                                                   title: "By Industry",
                                                   items: [
                                                       { name: "E-commerce", href: "#ecommerce", description: "Online store solutions" },
                                                       { name: "Healthcare", href: "#healthcare", description: "HIPAA-compliant systems" },
                                                       { name: "Education", href: "#education", description: "Learning management systems" },
                                                   ],
                                               },
                                               {
                                                   title: "By Technology",
                                                   items: [
                                                       { name: "React Applications", href: "#react", description: "Modern web applications" },
                                                       { name: "Mobile Apps", href: "#mobile", description: "iOS and Android development" },
                                                       { name: "Cloud Solutions", href: "#cloud", description: "AWS, Azure, and GCP" },
                                                   ],
                                               },
                                           ],
                                       },
                                   ],
                                   regularItems = [
                                       { name: "About", href: "#about" },
                                       { name: "Portfolio", href: "#portfolio" },
                                       { name: "Contact", href: "#contact" },
                                   ],
                                   theme,
                               }: MegaMenuHeaderProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-lg relative z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        {logo && <img src={logo || "/placeholder.svg"} alt={companyName} className="h-8 w-8" />}
                        <span className="text-xl font-bold text-gray-900">{companyName}</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {megaMenuItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(item.name)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                    <span>{item.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                {/* Mega Menu Dropdown */}
                                {activeMenu === item.name && item.sections && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-200 p-8">
                                        <div className="grid grid-cols-3 gap-8">
                                            {item.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex}>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                                                    <div className="space-y-3">
                                                        {section.items.map((subItem, subIndex) => (
                                                            <a key={subIndex} href={subItem.href} className="block group">
                                                                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center space-x-2">
                                      <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                        {subItem.name}
                                      </span>
                                                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                                                        </div>
                                                                        {subItem.description && (
                                                                            <p className="text-sm text-gray-600 mt-1">{subItem.description}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {regularItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="space-y-4">
                            {megaMenuItems.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 font-medium">
                                        {item.name}
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    {item.sections && (
                                        <div className="pl-4 space-y-3">
                                            {item.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex}>
                                                    <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                                                    <div className="space-y-1 pl-4">
                                                        {section.items.map((subItem, subIndex) => (
                                                            <a
                                                                key={subIndex}
                                                                href={subItem.href}
                                                                className="block text-gray-600 hover:text-blue-600 py-1"
                                                            >
                                                                {subItem.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {regularItems.map((item, index) => (
                                <a key={index} href={item.href} className="block text-gray-700 hover:text-blue-600 py-2">
                                    {item.name}
                                </a>
                            ))}

                            <div className="pt-4 border-t border-gray-200">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
