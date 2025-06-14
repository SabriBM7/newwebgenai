"use client"

import { Button } from "@/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function MinimalistHero({
                                         title = "",
                                         subtitle = "",
                                         description = "",
                                         buttonText,
                                         cta,
                                         buttonLink,
                                         ctaLink,
                                         secondaryButtonText,
                                         secondaryCta,
                                         secondaryButtonLink,
                                         secondaryCtaLink,
                                         imageUrl,
                                         imageAlt = "Hero Image",
                                         backgroundColor = "#ffffff",
                                         textColor = "#000000",
                                         alignment = "left",
                                     }: {
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
    cta?: string
    buttonLink?: string
    ctaLink?: string
    secondaryButtonText?: string
    secondaryCta?: string
    secondaryButtonLink?: string
    secondaryCtaLink?: string
    imageUrl?: string
    imageAlt?: string
    backgroundColor?: string
    textColor?: string
    alignment?: "left" | "center" | "right"
}) {
    // Use first available prop for each option
    const primaryButtonText = buttonText || cta || "Get Started"
    const primaryButtonLink = buttonLink || ctaLink || "#"
    const secondaryButtonTextFinal = secondaryButtonText || secondaryCta
    const secondaryButtonLinkFinal = secondaryButtonLink || secondaryCtaLink || "#"

    // Determine text alignment classes
    const alignmentClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }

    // Create container style with background and text colors
    const containerStyle = {
        backgroundColor,
        color: textColor,
    }

    return (
        <section className="py-16 md:py-24" style={containerStyle}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={cn("max-w-2xl", alignmentClasses[alignment])}>
                        {title && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>}
                        {subtitle && <p className="text-xl md:text-2xl mb-4 opacity-80">{subtitle}</p>}
                        {description && <p className="text-lg mb-8 opacity-70">{description}</p>}

                        <div className="flex flex-wrap gap-4">
                            <Button asChild>
                                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                            </Button>

                            {secondaryButtonTextFinal && (
                                <Button variant="outline" asChild>
                                    <Link href={secondaryButtonLinkFinal}>{secondaryButtonTextFinal}</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-lg h-[300px] md:h-[400px]">
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
