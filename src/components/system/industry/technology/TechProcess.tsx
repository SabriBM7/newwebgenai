"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

interface TechProcessProps {
    title?: string
    subtitle?: string
    steps?: Array<{
        title: string
        description: string
        icon: string
        duration: string
    }>
}

export default function TechProcess({ title, subtitle, steps }: TechProcessProps) {
    const defaultSteps = [
        {
            title: "Discovery & Planning",
            description:
                "We analyze your requirements, define project scope, and create a comprehensive development roadmap.",
            icon: "🔍",
            duration: "1-2 weeks",
        },
        {
            title: "Design & Architecture",
            description: "Our team designs the user interface and system architecture, ensuring scalability and performance.",
            icon: "🎨",
            duration: "2-3 weeks",
        },
        {
            title: "Development & Testing",
            description: "We build your solution using agile methodology with continuous testing and quality assurance.",
            icon: "⚡",
            duration: "4-12 weeks",
        },
        {
            title: "Deployment & Launch",
            description: "We deploy your application to production and ensure everything runs smoothly for launch.",
            icon: "🚀",
            duration: "1 week",
        },
        {
            title: "Support & Maintenance",
            description: "Ongoing support, monitoring, and updates to keep your application running at peak performance.",
            icon: "🛠️",
            duration: "Ongoing",
        },
    ]

    const processSteps = steps || defaultSteps

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Our Development Process"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "A proven methodology that delivers results"}
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Timeline */}
                    <div className="hidden lg:block">
                        <div className="flex items-center justify-between mb-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white mb-4">
                                            {step.icon}
                                        </div>
                                        <div className="text-center max-w-xs">
                                            <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                                            <span className="text-xs text-blue-600 font-medium">{step.duration}</span>
                                        </div>
                                    </div>
                                    {index < processSteps.length - 1 && <ArrowRight className="h-6 w-6 text-gray-400 mx-4" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-6">
                        {processSteps.map((step, index) => (
                            <Card key={index} className="relative">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl text-white flex-shrink-0">
                                            {step.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                                <span className="text-sm text-blue-600 font-medium">{step.duration}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                    {index < processSteps.length - 1 && (
                                        <div className="absolute left-8 top-16 w-0.5 h-6 bg-gray-200"></div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-8">
                            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                            <p className="text-gray-600">
                                Every step of our process is designed to deliver high-quality, scalable solutions that exceed
                                expectations.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
