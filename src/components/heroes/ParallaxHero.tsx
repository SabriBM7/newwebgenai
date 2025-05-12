"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ParallaxHeroProps {
    title: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    backgroundImage?: string
    overlayColor?: string
    overlayOpacity?: number
    textColor?: string
    textAlignment?: "left" | "center" | "right"
    parallaxStrength?: number
    keywords?: string[]
}

export default function ParallaxHero({
                                         title,
                                         subtitle,
                                         description,
                                         buttonText = "Get Started",
                                         buttonLink = "#",
                                         secondaryButtonText,
                                         secondaryButtonLink = "#",
                                         backgroundImage = "/placeholder.svg?height=1080&width=1920&text=Parallax+Background",
                                         overlayColor = "#000000",
                                         overlayOpacity = 0.5,
                                         textColor = "#ffffff",
                                         textAlignment = "center",
                                         parallaxStrength = 300,
                                         keywords = [],
                                     }: ParallaxHeroProps) {
    const [scrollY, setScrollY] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)
    const [sectionTop, setSectionTop] = useState(0)
    const [sectionHeight, setSectionHeight] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        const handleResize = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                setSectionTop(rect.top + window.scrollY)
                setSectionHeight(rect.height)
                setWindowHeight(window.innerHeight)
            }
        }

        // Initial measurements
        handleResize()

        // Add event listeners
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)

        // Clean up
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    // Calculate parallax offset
    const calculateParallaxOffset = () => {
        if (sectionTop === 0 || sectionHeight === 0 || windowHeight === 0) return 0

        const sectionMiddle = sectionTop + sectionHeight / 2
        const viewportMiddle = scrollY + windowHeight / 2
        const distanceFromMiddle = viewportMiddle - sectionMiddle

        // Calculate parallax offset based on distance from middle and parallax strength
        return (distanceFromMiddle / windowHeight) * parallaxStrength
    }

    const parallaxOffset = calculateParallaxOffset()

    const backgroundStyle = {
        transform: `translateY(${parallaxOffset}px)`,
        backgroundImage: `url(${backgroundImage})`,
    }

    const overlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
    }

    const alignmentClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
            style={{ color: textColor }}
            data-keywords={keywords.join(",")}
        >
            {/* Parallax Background */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center z-0" style={backgroundStyle}></div>
            <div className="absolute inset-0 z-10" style={overlayStyle}></div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
                <div className={cn("max-w-4xl space-y-6", alignmentClasses[textAlignment])}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
                    {subtitle && <h2 className="text-xl md:text-2xl font-medium opacity-90">{subtitle}</h2>}
                    {description && <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">{description}</p>}

                    <div className={cn("flex flex-wrap gap-4", textAlignment === "center" ? "justify-center" : "")}>
                        {buttonText && (
                            <Button asChild size="lg" className="font-medium">
                                <Link href={buttonLink}>{buttonText}</Link>
                            </Button>
                        )}

                        {secondaryButtonText && (
                            <Button asChild variant="outline" size="lg" className="font-medium">
                                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
