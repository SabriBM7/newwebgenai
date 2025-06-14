"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award } from "lucide-react"

interface AboutSectionProps {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    stats?: Array<{
        number: string
        label: string
        icon?: string
    }>
    features?: Array<{
        title: string
        description: string
        icon?: string
    }>
    mission?: string
    vision?: string
}

export default function AboutSection({
                                         title = "About Our Company",
                                         subtitle = "Building the future together",
                                         description = "We are a forward-thinking company dedicated to delivering exceptional solutions that drive innovation and create lasting value for our clients and communities.",
                                         image,
                                         stats = [],
                                         features = [],
                                         mission,
                                         vision,
                                     }: AboutSectionProps) {
    const defaultStats = [
        { number: "10+", label: "Years Experience", icon: "📅" },
        { number: "500+", label: "Happy Clients", icon: "😊" },
        { number: "50+", label: "Team Members", icon: "👥" },
        { number: "99%", label: "Success Rate", icon: "🎯" },
    ]

    const defaultFeatures = [
        {
            title: "Innovation First",
            description: "We embrace cutting-edge technologies and creative solutions",
            icon: "💡",
        },
        {
            title: "Client-Focused",
            description: "Your success is our priority, always",
            icon: "🤝",
        },
        {
            title: "Quality Assured",
            description: "We maintain the highest standards in everything we do",
            icon: "✨",
        },
    ]

    const displayStats = stats.length > 0 ? stats : defaultStats
    const displayFeatures = features.length > 0 ? features : defaultFeatures

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
                        <p className="text-xl text-blue-600 font-semibold mb-4">{subtitle}</p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>

                        {mission && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                                    Our Mission
                                </h3>
                                <p className="text-gray-600">{mission}</p>
                            </div>
                        )}

                        {vision && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                                    <Award className="h-5 w-5 mr-2 text-blue-600" />
                                    Our Vision
                                </h3>
                                <p className="text-gray-600">{vision}</p>
                            </div>
                        )}

                        <Button className="bg-blue-600 hover:bg-blue-700">Learn More About Us</Button>
                    </div>

                    <div className="relative">
                        {image ? (
                            <img
                                src={image || "/placeholder.svg"}
                                alt="About us"
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <Users className="h-16 w-16 mx-auto mb-4" />
                                    <p className="text-lg font-medium">Our Team</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {displayStats.map((stat, index) => (
                        <Card key={index} className="text-center p-6 bg-white hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayFeatures.map((feature, index) => (
                        <Card key={index} className="text-center p-6 bg-white hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
