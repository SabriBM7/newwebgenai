import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavItem {
    label: string
    href?: string
}

interface CreativeHeaderProps {
    logo?: string
    logoText?: string
    navigation?: NavItem[]
    ctaText?: string
    ctaHref?: string
    theme?: "light" | "dark"
}

export const CreativeHeader: React.FC<CreativeHeaderProps> = ({
                                                                  logo,
                                                                  logoText = "Studio",
                                                                  navigation = [
                                                                      { label: "Home", href: "/" },
                                                                      { label: "Work", href: "/work" },
                                                                      { label: "Services", href: "/services" },
                                                                      { label: "About", href: "/about" },
                                                                      { label: "Contact", href: "/contact" },
                                                                  ],
                                                                  ctaText = "Let's Talk",
                                                                  ctaHref = "/contact",
                                                                  theme = "light",
                                                              }) => {
    const isLight = theme === "light"

    return (
        <header className={`py-6 ${isLight ? "bg-white" : "bg-black"}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    {logo ? (
                        <img src={logo || "/placeholder.svg"} alt={logoText} className="h-10 w-auto" />
                    ) : (
                        <span className={`text-2xl font-bold ${isLight ? "text-black" : "text-white"}`}>{logoText}</span>
                    )}
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {navigation.map((item, index) => (
                        <Link
                            key={`nav-item-${index}`}
                            href={item.href || "#"}
                            className={`${
                                isLight ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
                            } text-sm font-medium`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div>
                    <Button
                        variant={isLight ? "default" : "outline"}
                        asChild
                        className={isLight ? "" : "border-white text-white hover:bg-white hover:text-black"}
                    >
                        <Link href={ctaHref || "#"}>{ctaText}</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default CreativeHeader
