"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Rocket } from "lucide-react"

interface Feature {
    id: string
    title: string
    description: string
    icon: string
    color: string
    delay?: number
}

interface AnimatedFeaturesProps {
    title?: string
    subtitle?: string
    features?: Feature[]
    animationType?: "fade" | "slide" | "scale" | "bounce"
}

export default function AnimatedFeatures({
                                             title = "Amazing Features",
                                             subtitle = "Discover what makes us different",
                                             features = [],
                                             animationType = "fade",
                                         }: AnimatedFeaturesProps) {
    const [visibleItems, setVisibleItems] = useState<string[]>([])
    const sectionRef = useRef<HTMLElement>(null)

    const defaultFeatures: Feature[] = [
        {
            id: "1",
            title: "Lightning Fast",
            description: "Experience blazing fast performance with our optimized solutions",
            icon: "⚡",
            color: "bg-yellow-500",
            delay: 0,
        },
        {
            id: "2",
            title: "Secure & Reliable",
            description: "Your data is protected with enterprise-grade security measures",
            icon: "🛡️",
            color: "bg-green-500",
            delay: 200,
        },
        {
            id: "3",
            title: "Scalable Growth",
            description: "Grow your business with solutions that scale with your needs",
            icon: "🚀",
            color: "bg-blue-500",
            delay: 400,
        },
        {
            id: "4",
            title: "Expert Support",
            description: "Get help from our team of experienced professionals",
            icon: "👥",
            color: "bg-purple-500",
            delay: 600,
        },
        {
            id: "5",
            title: "5-Star Rated",
            description: "Join thousands of satisfied customers who love our service",
            icon: "⭐",
            color: "bg-orange-500",
            delay: 800,
        },
        {
            id: "6",
            title: "Proven Results",
            description: "Track record of delivering measurable business outcomes",
            icon: "📈",
            color: "bg-red-500",
            delay: 1000,
        },
    ]

    const displayFeatures = features.length > 0 ? features : defaultFeatures

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate items with staggered delays
                        displayFeatures.forEach((feature, index) => {
                            setTimeout(
                                () => {
                                    setVisibleItems((prev) => [...prev, feature.id])
                                },
                                feature.delay || index * 200,
                            )
                        })
                    }
                })
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [displayFeatures])

    const getAnimationClasses = (featureId: string) => {
        const isVisible = visibleItems.includes(featureId)

        const baseClasses = "transition-all duration-700 ease-out"

        switch (animationType) {
            case "slide":
                return `${baseClasses} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`
            case "scale":
                return `${baseClasses} ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`
            case "bounce":
                return `${baseClasses} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${isVisible ? "animate-bounce" : ""}`
            default:
                return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`
        }
    }

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayFeatures.map((feature, index) => (
                        <Card
                            key={feature.id}
                            className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${getAnimationClasses(feature.id)}`}
                        >
                            <CardContent className="p-8 text-center">
                                <div
                                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                                <Badge variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    Feature {index + 1}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Floating Action Elements */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
                        <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
                        <span className="text-sm font-medium text-gray-700">Powered by Innovation</span>
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Secure & Trusted</span>
                        <Rocket className="h-5 w-5 text-blue-500" />
                    </div>
                </div>
            </div>
        </section>
    )
}
