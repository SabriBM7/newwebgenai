"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface TechFeaturesProps {
    title?: string
    subtitle?: string
    features?: Array<{
        title: string
        description: string
        icon: string
        benefits: string[]
    }>
}

export default function TechFeatures({ title, subtitle, features }: TechFeaturesProps) {
    const defaultFeatures = [
        {
            title: "Scalable Architecture",
            description:
                "Built to grow with your business, our solutions can handle increased traffic and data without compromising performance.",
            icon: "📈",
            benefits: ["Auto-scaling capabilities", "Load balancing", "Microservices architecture", "Cloud-native design"],
        },
        {
            title: "Security First",
            description:
                "Enterprise-grade security measures to protect your data and ensure compliance with industry standards.",
            icon: "🔒",
            benefits: ["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "GDPR compliance"],
        },
        {
            title: "Modern Tech Stack",
            description:
                "We use the latest technologies and frameworks to ensure your application is future-proof and maintainable.",
            icon: "⚡",
            benefits: ["Latest frameworks", "Best practices", "Clean code standards", "Comprehensive testing"],
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock monitoring and support to ensure your applications run smoothly at all times.",
            icon: "🛠️",
            benefits: ["Proactive monitoring", "Instant alerts", "Quick response times", "Expert technical support"],
        },
        {
            title: "Agile Development",
            description:
                "Iterative development process with regular feedback loops to ensure we deliver exactly what you need.",
            icon: "🔄",
            benefits: ["Sprint-based delivery", "Regular demos", "Continuous feedback", "Flexible requirements"],
        },
        {
            title: "Performance Optimized",
            description:
                "Every line of code is optimized for speed and efficiency, ensuring the best user experience possible.",
            icon: "🚀",
            benefits: ["Fast load times", "Optimized databases", "CDN integration", "Performance monitoring"],
        },
    ]

    const techFeatures = features || defaultFeatures

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title || "Why Choose Our Technology Solutions"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Built with cutting-edge technology and industry best practices"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techFeatures.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
                            <CardContent className="p-6 text-center h-full flex flex-col">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-6 flex-1">{feature.description}</p>

                                <div className="mt-auto">
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit, benefitIndex) => (
                                            <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
