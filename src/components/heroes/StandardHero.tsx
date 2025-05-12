"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StandardHeroProps {
    title: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    imageUrl?: string
    imageAlt?: string
    backgroundColor?: string
    textColor?: string
    alignment?: "left" | "center" | "right"
    keywords?: string[]
}

export default function StandardHero({
                                         title,
                                         subtitle,
                                         description,
                                         buttonText = "Get Started",
                                         buttonLink = "#",
                                         secondaryButtonText,
                                         secondaryButtonLink = "#",
                                         imageUrl,
                                         imageAlt = "Hero Image",
                                         backgroundColor = "#ffffff",
                                         textColor = "#000000",
                                         alignment = "left",
                                         keywords = [],
                                     }: StandardHeroProps) {
    const alignmentClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }

    const containerStyle = {
        backgroundColor,
        color: textColor,
    }

    return (
        <section className="py-16 md:py-24 lg:py-32" style={containerStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={cn("max-w-2xl", alignmentClasses[alignment])}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
                        {subtitle && <p className="text-xl md:text-2xl mb-4 opacity-80">{subtitle}</p>}
                        {description && <p className="text-lg mb-8 opacity-70">{description}</p>}

                        <div className="flex flex-wrap gap-4">
                            {buttonText && (
                                <Button asChild>
                                    <Link href={buttonLink}>{buttonText}</Link>
                                </Button>
                            )}

                            {secondaryButtonText && (
                                <Button variant="outline" asChild>
                                    <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
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
