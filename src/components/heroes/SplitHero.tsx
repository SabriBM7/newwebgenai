"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SplitHeroProps {
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
    imagePosition?: "left" | "right"
    keywords?: string[]
}

export default function SplitHero({
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
                                      imagePosition = "right",
                                      keywords = [],
                                  }: SplitHeroProps) {
    const containerStyle = {
        backgroundColor,
        color: textColor,
    }

    const ContentSection = () => (
        <div className="flex flex-col justify-center">
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
    )

    const ImageSection = () => (
        <div className="flex justify-center items-center">
            {imageUrl && (
                <div className="relative w-full h-[300px] md:h-[500px]">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={imageAlt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    )

    return (
        <section className="py-16 md:py-24 lg:py-32" style={containerStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {imagePosition === "left" ? (
                        <>
                            <ImageSection />
                            <ContentSection />
                        </>
                    ) : (
                        <>
                            <ContentSection />
                            <ImageSection />
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
