import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, GitlabIcon as GitHub, Mail, Phone, MapPin } from "lucide-react"

interface FooterLink {
    label: string
    link: string
}

interface SocialLink {
    platform: string
    link: string
}

interface ModernFooterProps {
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
    columns?: 1 | 2 | 3 | 4
    showNewsletter?: boolean
    contactInfo?: {
        email?: string
        phone?: string
        address?: string
    }
}

export default function ModernFooter({
                                         companyName,
                                         logo,
                                         logoUrl,
                                         description = "We provide innovative solutions for your business needs.",
                                         links = [],
                                         socialLinks = [],
                                         copyright,
                                         backgroundColor = "#0f172a",
                                         textColor = "#ffffff",
                                         accentColor = "#7c3aed",
                                         columns = 3,
                                         showNewsletter = false,
                                         contactInfo,
                                     }: ModernFooterProps) {
    const getSocialIcon = (platform: string) => {
        const iconProps = { size: 20, className: "text-gray-400 hover:text-white transition-colors" }

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

    // Group links into columns
    const linkGroups = []
    const linksPerColumn = Math.ceil(links.length / (columns - 1))

    for (let i = 0; i < links.length; i += linksPerColumn) {
        linkGroups.push(links.slice(i, i + linksPerColumn))
    }

    return (
        <footer style={{ backgroundColor, color: textColor }} className="pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 mb-12`}>
                    <div className="col-span-1">
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

                        {contactInfo && (
                            <div className="space-y-3 mb-6">
                                {contactInfo.email && (
                                    <div className="flex items-center">
                                        <Mail size={16} className="mr-2 text-gray-400" />
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                )}
                                {contactInfo.phone && (
                                    <div className="flex items-center">
                                        <Phone size={16} className="mr-2 text-gray-400" />
                                        <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-white transition-colors">
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                )}
                                {contactInfo.address && (
                                    <div className="flex items-start">
                                        <MapPin size={16} className="mr-2 mt-1 text-gray-400" />
                                        <span className="text-gray-400">{contactInfo.address}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                                    {getSocialIcon(social.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {linkGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="col-span-1">
                            <h3 className="text-lg font-semibold mb-4">Links</h3>
                            <ul className="space-y-2">
                                {group.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.link} className="text-gray-400 hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {showNewsletter && (
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
                            <p className="text-gray-400 mb-4">Stay updated with our latest news and updates.</p>
                            <form className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 rounded font-medium transition-colors"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="pt-8 border-t border-gray-800 text-center md:text-left md:flex md:justify-between md:items-center">
                    <p className="text-gray-500 text-sm">
                        {copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
                    </p>
                    <div className="mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm mr-4">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
