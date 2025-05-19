"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

interface FooterColumn {
    title: string
    links: Array<{ label: string; url: string }>
}

interface SocialLink {
    platform: string
    url: string
}

interface ModernFooterProps {
    logo?: string
    logoUrl?: string
    columns?: FooterColumn[]
    socialLinks?: SocialLink[]
    copyright?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export default function ModernFooter({
                                         logo = "YourBrand",
                                         logoUrl,
                                         columns = [],
                                         socialLinks = [],
                                         copyright = `© ${new Date().getFullYear()} YourBrand. All rights reserved.`,
                                         backgroundColor = "#0f172a",
                                         textColor = "#ffffff",
                                         accentColor = "#6366f1",
                                     }: ModernFooterProps) {
    // Default columns if none provided
    const defaultColumns: FooterColumn[] = [
        {
            title: "Product",
            links: [
                { label: "Features", url: "#features" },
                { label: "Pricing", url: "#pricing" },
                { label: "Testimonials", url: "#testimonials" },
                { label: "FAQ", url: "#faq" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", url: "#about" },
                { label: "Careers", url: "#careers" },
                { label: "Blog", url: "#blog" },
                { label: "Contact", url: "#contact" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", url: "#docs" },
                { label: "Guides", url: "#guides" },
                { label: "Support", url: "#support" },
                { label: "API", url: "#api" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", url: "#privacy" },
                { label: "Terms of Service", url: "#terms" },
                { label: "Cookie Policy", url: "#cookies" },
            ],
        },
    ]

    // Default social links if none provided
    const defaultSocialLinks: SocialLink[] = [
        { platform: "twitter", url: "#twitter" },
        { platform: "facebook", url: "#facebook" },
        { platform: "instagram", url: "#instagram" },
        { platform: "linkedin", url: "#linkedin" },
    ]

    const displayColumns = columns.length > 0 ? columns : defaultColumns
    const displaySocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks

    // Social icon map
    const socialIcons: Record<string, React.ReactNode> = {
        twitter: <Twitter size={20} />,
        facebook: <Facebook size={20} />,
        instagram: <Instagram size={20} />,
        linkedin: <Linkedin size={20} />,
        github: <Github size={20} />,
    }

    return (
        <footer style={{ backgroundColor, color: textColor }} className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            {logoUrl ? (
                                <Image src={logoUrl || "/placeholder.svg"} alt={logo} width={40} height={40} className="mr-2" />
                            ) : (
                                <div
                                    className="w-10 h-10 rounded-md flex items-center justify-center mr-2"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    <span className="text-white font-bold">{logo.charAt(0)}</span>
                                </div>
                            )}
                            <span className="text-xl font-bold">{logo}</span>
                        </div>
                        <p className="opacity-80 mb-4">
                            Empowering businesses with innovative solutions to help them grow and succeed.
                        </p>
                        <div className="flex space-x-4">
                            {displaySocialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                    aria-label={`Follow us on ${link.platform}`}
                                >
                                    {socialIcons[link.platform.toLowerCase()] || <span>{link.platform}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {displayColumns.map((column, index) => (
                        <div key={index} className="lg:col-span-1">
                            <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.url} className="opacity-80 hover:opacity-100 hover:underline transition-opacity">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="opacity-80 text-sm mb-4 md:mb-0">{copyright}</p>
                        <div className="flex space-x-6">
                            <Link href="#privacy" className="text-sm opacity-80 hover:opacity-100 hover:underline">
                                Privacy Policy
                            </Link>
                            <Link href="#terms" className="text-sm opacity-80 hover:opacity-100 hover:underline">
                                Terms of Service
                            </Link>
                            <Link href="#cookies" className="text-sm opacity-80 hover:opacity-100 hover:underline">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
