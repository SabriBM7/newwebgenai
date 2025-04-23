import Link from "next/link"
import Image from "next/image"
import { cn, getButtonClasses, getTextAlignmentClasses } from "@/lib/utils"
import type { ButtonType, ButtonStyle, TextAlignment } from "@/types"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
    title?: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    overlayColor?: string
    textColor?: string
    fontFamily?: string
    buttons?: ButtonType[]
    imageUrl?: string
    imageAlt?: string
    buttonStyle?: ButtonStyle
    textAlignment?: TextAlignment
    keywords?: string[]
}

export default function HeroSection({
                                        title = "Create Websites with AI",
                                        subtitle = "Transform your ideas into fully functional websites through a simple conversation",
                                        description = "No coding required. Just describe what you want, and our AI will build it for you.",
                                        backgroundImage,
                                        overlayColor = "rgba(0,0,0,0.5)",
                                        textColor = "#ffffff",
                                        fontFamily = "sans-serif",
                                        buttons,
                                        imageUrl = "/placeholder.svg?height=600&width=600&text=AI+Website+Generator",
                                        imageAlt = "Hero Image",
                                        buttonStyle = "rounded",
                                        textAlignment = "left",
                                        keywords = [],
                                    }: HeroSectionProps) {
    // Default buttons if none are provided
    const defaultButtons: ButtonType[] = [
        { label: "Get Started", link: "/create", type: "primary" },
        { label: "View Examples", link: "/examples", type: "secondary" },
    ]

    // Use provided buttons or fall back to default buttons
    const displayButtons = buttons || defaultButtons

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const containerStyle = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: textColor,
        fontFamily: fontFamily,
    }

    const overlayStyle = {
        backgroundColor: overlayColor,
    }

    return (
        <section className="relative py-20 md:py-32" style={containerStyle} data-keywords={keywords.join(",")}>
            {backgroundImage && <div className="absolute inset-0 z-0" style={overlayStyle}></div>}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className={cn("space-y-6", textAlignmentClass)}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
                        {subtitle && <h2 className="text-xl md:text-2xl font-medium opacity-90">{subtitle}</h2>}
                        {description && <p className="text-base md:text-lg opacity-80 max-w-lg">{description}</p>}
                        {displayButtons && displayButtons.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {displayButtons.map((button, index) => (
                                    <Link key={index} href={button.link} className={getButtonClasses(button.type, buttonStyle)}>
                                        {button.label}
                                        {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {imageUrl && (
                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
                                <Image
                                    src={imageUrl || "/placeholder.svg"}
                                    alt={imageAlt}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="drop-shadow-xl"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
