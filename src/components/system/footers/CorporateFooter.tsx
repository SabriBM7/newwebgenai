import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface CorporateFooterProps {
    logo: string
    tagline: string
    links: Array<{
        title: string
        items: Array<{
            text: string
            url: string
        }>
    }>
    contact: {
        email: string
        phone: string
        address: string
    }
    social: Array<{
        platform: "facebook" | "twitter" | "instagram" | "linkedin"
        url: string
    }>
    copyright: string
    backgroundColor?: string
    textColor?: string
}

export default function CorporateFooter({
                                            logo,
                                            tagline,
                                            links,
                                            contact,
                                            social,
                                            copyright,
                                            backgroundColor = "bg-gray-900",
                                            textColor = "text-white"
                                        }: CorporateFooterProps) {
    const iconMap = {
        facebook: Facebook,
        twitter: Twitter,
        instagram: Instagram,
        linkedin: Linkedin
    }

    return (
        <footer className={`${backgroundColor} ${textColor} py-12`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold mb-2">{logo}</h3>
                        <p className="text-gray-400 mb-4">{tagline}</p>
                        <div className="flex space-x-4">
                            {social.map((item) => {
                                const Icon = iconMap[item.platform]
                                return (
                                    <a
                                        key={item.platform}
                                        href={item.url}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        <Icon size={20} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {links.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.text}>
                                        <Link
                                            href={item.url}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Mail className="mr-2 mt-1 flex-shrink-0" size={16} />
                                <a href={`mailto:${contact.email}`} className="hover:underline">
                                    {contact.email}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="mr-2 mt-1 flex-shrink-0" size={16} />
                                <a href={`tel:${contact.phone}`} className="hover:underline">
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>{contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    {copyright}
                </div>
            </div>
        </footer>
    )
}