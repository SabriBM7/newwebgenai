import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavItem {
    label: string
    href?: string
}

interface MinimalistHeaderProps {
    logo?: string
    logoText?: string
    navigation?: NavItem[]
    ctaText?: string
    ctaHref?: string
}

export const MinimalistHeader: React.FC<MinimalistHeaderProps> = ({
                                                                      logo,
                                                                      logoText = "Brand",
                                                                      navigation = [
                                                                          { label: "Home", href: "/" },
                                                                          { label: "About", href: "/about" },
                                                                          { label: "Services", href: "/services" },
                                                                          { label: "Contact", href: "/contact" },
                                                                      ],
                                                                      ctaText = "Contact Us",
                                                                      ctaHref = "/contact",
                                                                  }) => {
    return (
        <header className="bg-white py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    {logo ? (
                        <img src={logo || "/placeholder.svg"} alt={logoText} className="h-8 w-auto" />
                    ) : (
                        <span className="text-xl font-medium">{logoText}</span>
                    )}
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {navigation.map((item, index) => (
                        <Link
                            key={`nav-item-${index}`}
                            href={item.href || "#"}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div>
                    <Button variant="outline" asChild size="sm">
                        <Link href={ctaHref || "#"}>{ctaText}</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default MinimalistHeader
