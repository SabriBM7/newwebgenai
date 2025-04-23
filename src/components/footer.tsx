import Link from "next/link"
import type { MenuItem } from "@/types/index"

interface FooterColumn {
    title: string
    links: MenuItem[]
}

interface FooterProps {
    logo?: string
    logoUrl?: string
    columns?: FooterColumn[]
    bottomText?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    keywords?: string[]
}

export default function Footer({
                                   logo = "WebGenAI",
                                   logoUrl,
                                   columns,
                                   bottomText,
                                   backgroundColor = "#1f2937",
                                   textColor = "#ffffff",
                                   accentColor = "#3b82f6",
                                   keywords = [],
                               }: FooterProps) {
    // Default columns if none are provided
    const defaultColumns: FooterColumn[] = [
        {
            title: "Product",
            links: [
                { label: "Features", link: "#features" },
                { label: "Pricing", link: "#pricing" },
                { label: "Examples", link: "/examples" },
                { label: "Documentation", link: "#docs" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About", link: "#about" },
                { label: "Blog", link: "#blog" },
                { label: "Careers", link: "#careers" },
                { label: "Contact", link: "#contact" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Help Center", link: "#help" },
                { label: "Community", link: "#community" },
                { label: "Tutorials", link: "#tutorials" },
                { label: "Webinars", link: "#webinars" },
            ],
        },
    ]

    // Use provided columns or fall back to default columns
    const displayColumns = columns || defaultColumns

    // Use provided bottomText or generate default
    const displayBottomText = bottomText || `© ${new Date().getFullYear()} ${logo}. All rights reserved.`

    const footerStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    return (
        <footer className="pt-16 pb-8" style={footerStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4 font-bold text-xl">
                            {logoUrl ? <img src={logoUrl || "/placeholder.svg"} alt={logo} className="h-8" /> : logo}
                        </Link>
                        <p className="opacity-80 max-w-md">
                            Create professional websites in minutes with our AI-powered platform. No coding required. Just describe
                            what you want, and our AI will build it for you.
                        </p>
                    </div>

                    {displayColumns.map((column, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.link} className="opacity-80 hover:opacity-100 transition-opacity">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-700 pt-8 text-center opacity-70 text-sm">
                    <p>{displayBottomText}</p>
                </div>
            </div>
        </footer>
    )
}
