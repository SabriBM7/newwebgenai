"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface GradientHeroProps {
    title?: string
    subtitle?: string
    description?: string
    primaryButton?: {
        text: string
        link: string
    }
    secondaryButton?: {
        text: string
        link: string
    }
    backgroundGradient?: string
    textColor?: string
    image?: string
    theme?: any
}

export function GradientHero({
                                 title = "Transform Your Business Today",
                                 subtitle = "Innovation Meets Excellence",
                                 description = "Discover cutting-edge solutions that drive growth and success for your business.",
                                 primaryButton = { text: "Get Started", link: "#" },
                                 secondaryButton = { text: "Watch Demo", link: "#" },
                                 backgroundGradient = "from-purple-600 via-pink-600 to-blue-600",
                                 textColor = "white",
                                 image,
                                 theme,
                             }: GradientHeroProps) {
    return (
        <section
            className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${backgroundGradient}`}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={`text-${textColor} space-y-6`}>
                        <div className="space-y-4">
                            <h2 className="text-sm font-semibold tracking-widest uppercase opacity-90">{subtitle}</h2>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">{title}</h1>
                            <p className="text-xl opacity-90 max-w-lg">{description}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3">
                                {primaryButton.text}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                {secondaryButton.text}
                            </Button>
                        </div>

                        {/* Stats or features */}
                        <div className="flex space-x-8 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold">10K+</div>
                                <div className="text-sm opacity-75">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">99%</div>
                                <div className="text-sm opacity-75">Satisfaction Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">24/7</div>
                                <div className="text-sm opacity-75">Support</div>
                            </div>
                        </div>
                    </div>

                    {image && (
                        <div className="relative">
                            <div className="relative z-10">
                                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto rounded-2xl shadow-2xl" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </section>
    )
}
