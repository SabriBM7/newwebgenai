"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

interface ParallaxHeroProps {
    title?: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    overlayOpacity?: number
    ctaButton?: {
        text: string
        link: string
    }
    theme?: any
}

export function ParallaxHero({
                                 title = "Experience the Future",
                                 subtitle = "Where Innovation Meets Reality",
                                 description = "Join us on a journey that transforms possibilities into achievements.",
                                 backgroundImage = "/placeholder.svg?height=1080&width=1920",
                                 overlayOpacity = 0.6,
                                 ctaButton = { text: "Explore Now", link: "#" },
                                 theme,
                             }: ParallaxHeroProps) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <div className="space-y-6">
                    <h2 className="text-lg font-medium tracking-widest uppercase opacity-90 animate-fade-in-up">{subtitle}</h2>

                    <h1 className="text-6xl md:text-8xl font-bold leading-tight animate-fade-in-up animation-delay-200">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                        {description}
                    </p>

                    <div className="pt-8 animate-fade-in-up animation-delay-600">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-12 py-4 rounded-full">
                            {ctaButton.text}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                <ArrowDown className="h-6 w-6" />
            </div>
        </section>
    )
}
