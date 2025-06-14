"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Award } from "lucide-react"

interface CTASectionProps {
    title?: string
    subtitle?: string
    description?: string
    primaryButtonText?: string
    secondaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonLink?: string
    backgroundImage?: string
    variant?: "default" | "gradient" | "image" | "minimal"
    showStats?: boolean
    stats?: Array<{
        number: string
        label: string
    }>
}

export default function CTASection({
                                       title = "Ready to Get Started?",
                                       subtitle = "Join thousands of satisfied customers",
                                       description = "Take the next step towards achieving your goals. Our team is ready to help you succeed.",
                                       primaryButtonText = "Get Started Today",
                                       secondaryButtonText = "Learn More",
                                       primaryButtonLink = "#",
                                       secondaryButtonLink = "#",
                                       backgroundImage,
                                       variant = "default",
                                       showStats = true,
                                       stats = [],
                                   }: CTASectionProps) {
    const defaultStats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "99%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support Available" },
    ]

    const displayStats = stats.length > 0 ? stats : defaultStats

    const getBackgroundClasses = () => {
        switch (variant) {
            case "gradient":
                return "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
            case "image":
                return backgroundImage ? "" : "bg-gray-900"
            case "minimal":
                return "bg-gray-50"
            default:
                return "bg-blue-600"
        }
    }

    const getTextClasses = () => {
        return variant === "minimal" ? "text-gray-900" : "text-white"
    }

    const backgroundStyle =
        variant === "image" && backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
            : {}

    return (
        <section className={`py-20 ${getBackgroundClasses()}`} style={backgroundStyle}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${getTextClasses()}`}>{title}</h2>

                    <p
                        className={`text-xl md:text-2xl mb-4 ${variant === "minimal" ? "text-blue-600" : "text-blue-100"} font-semibold`}
                    >
                        {subtitle}
                    </p>

                    <p className={`text-lg mb-12 max-w-2xl mx-auto ${variant === "minimal" ? "text-gray-600" : "text-gray-200"}`}>
                        {description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            size="lg"
                            className={`px-8 py-4 text-lg font-semibold ${
                                variant === "minimal"
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-white text-blue-600 hover:bg-gray-100"
                            }`}
                            asChild
                        >
                            <a href={primaryButtonLink}>
                                {primaryButtonText}
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </a>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className={`px-8 py-4 text-lg font-semibold ${
                                variant === "minimal"
                                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                    : "border-white text-white hover:bg-white hover:text-blue-600"
                            }`}
                            asChild
                        >
                            <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                        </Button>
                    </div>

                    {/* Stats */}
                    {showStats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className={`text-3xl md:text-4xl font-bold mb-2 ${getTextClasses()}`}>{stat.number}</div>
                                    <div className={`text-sm md:text-base ${variant === "minimal" ? "text-gray-600" : "text-gray-200"}`}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Trust Indicators */}
                    <div
                        className={`flex items-center justify-center space-x-8 mt-12 ${variant === "minimal" ? "text-gray-600" : "text-gray-200"}`}
                    >
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">5-Star Rated</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-1" />
                            <span className="text-sm">Trusted by Thousands</span>
                        </div>
                        <div className="flex items-center">
                            <Award className="h-5 w-5 mr-1" />
                            <span className="text-sm">Award Winning</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
