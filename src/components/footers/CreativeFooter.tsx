"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, GitlabIcon as GitHub, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FooterLink {
    label: string
    link: string
}

interface SocialLink {
    platform: string
    link: string
}

interface CreativeFooterProps {
    companyName: string
    logo?: string
    logoUrl?: string
    description?: string
    links: FooterLink[]
    socialLinks: SocialLink[]
    copyright?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    showNewsletter?: boolean
    newsletterTitle?: string
    newsletterDescription?: string
}

export default function CreativeFooter({
                                           companyName,
                                           logo,
                                           logoUrl,
                                           description = "We create innovative digital experiences that inspire and engage.",
                                           links = [],
                                           socialLinks = [],
                                           copyright,
                                           backgroundColor = "#111827",
                                           textColor = "#ffffff",
                                           accentColor = "#8b5cf6",
                                           showNewsletter = true,
                                           newsletterTitle = "Subscribe to our newsletter",
                                           newsletterDescription = "Get the latest updates and news delivered to your inbox.",
                                       }: CreativeFooterProps) {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setEmail("")
        }, 1000)
    }

    const getSocialIcon = (platform: string) => {
        const iconProps = {
            size: 20,
            className: "text-gray-400 group-hover:text-white transition-colors",
        }

        switch (platform.toLowerCase()) {
            case "facebook":
                return <Facebook {...iconProps} />
            case "twitter":
                return <Twitter {...iconProps} />
            case "instagram":
                return <Instagram {...iconProps} />
            case "linkedin":
                return <Linkedin {...iconProps} />
            case "github":
                return <GitHub {...iconProps} />
            default:
                return <Twitter {...iconProps} />
        }
    }

    return (
        <footer style={{ backgroundColor, color: textColor }} className="pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            {logoUrl ? (
                                <img src={logoUrl || "/placeholder.svg"} alt={companyName} className="h-10 w-auto mr-2" />
                            ) : logo ? (
                                <div
                                    className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl mr-2"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {logo.charAt(0)}
                                </div>
                            ) : null}
                            <span className="text-xl font-bold">{companyName}</span>
                        </div>
                        <p className="text-gray-400 mb-6">{description}</p>

                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="group">
                                    {getSocialIcon(social.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {links.slice(0, Math.ceil(links.length / 2)).map((link, index) => (
                                <li key={index}>
                                    <Link href={link.link} className="text-gray-400 hover:text-white transition-colors flex items-center">
                                        <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {links.slice(Math.ceil(links.length / 2)).map((link, index) => (
                                <li key={index}>
                                    <Link href={link.link} className="text-gray-400 hover:text-white transition-colors flex items-center">
                                        <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {showNewsletter && (
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold mb-4">{newsletterTitle}</h3>
                            <p className="text-gray-400 mb-4">{newsletterDescription}</p>

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-2">
                                    <div className="flex">
                                        <Input
                                            type="email"
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full rounded-r-none bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="rounded-l-none"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            {isSubmitting ? "..." : "Subscribe"}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-900/30 text-green-400 p-3 rounded-md"
                                >
                                    Thank you for subscribing!
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>

                <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
                    <p className="text-gray-500 text-sm">
                        {copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
                    </p>
                    <div className="mt-4 md:mt-0 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-gray-400 mr-4">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-gray-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
