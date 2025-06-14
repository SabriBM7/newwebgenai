"use client"

import { Zap, Shield, Smartphone, Users, BarChart3, Clock, Star, Rocket } from "lucide-react"

interface Feature {
    icon: string
    title: string
    description: string
    color?: string
}

interface IconFeaturesProps {
    title?: string
    subtitle?: string
    description?: string
    features?: Feature[]
    backgroundColor?: string
    theme?: any
}

const iconMap = {
    zap: Zap,
    shield: Shield,
    smartphone: Smartphone,
    users: Users,
    chart: BarChart3,
    clock: Clock,
    star: Star,
    rocket: Rocket,
}

export function IconFeatures({
                                 title = "Powerful Features",
                                 subtitle = "Everything you need to succeed",
                                 description = "Our comprehensive suite of features is designed to help you achieve your goals faster and more efficiently.",
                                 features = [
                                     {
                                         icon: "zap",
                                         title: "Lightning Fast",
                                         description: "Experience blazing-fast performance that keeps you ahead of the competition.",
                                         color: "text-yellow-500",
                                     },
                                     {
                                         icon: "shield",
                                         title: "Secure & Reliable",
                                         description: "Enterprise-grade security ensures your data is always protected.",
                                         color: "text-green-500",
                                     },
                                     {
                                         icon: "smartphone",
                                         title: "Mobile Optimized",
                                         description: "Perfect experience across all devices and screen sizes.",
                                         color: "text-blue-500",
                                     },
                                     {
                                         icon: "users",
                                         title: "Team Collaboration",
                                         description: "Work together seamlessly with powerful collaboration tools.",
                                         color: "text-purple-500",
                                     },
                                     {
                                         icon: "chart",
                                         title: "Advanced Analytics",
                                         description: "Get deep insights with comprehensive analytics and reporting.",
                                         color: "text-red-500",
                                     },
                                     {
                                         icon: "clock",
                                         title: "Real-time Updates",
                                         description: "Stay synchronized with instant real-time updates and notifications.",
                                         color: "text-indigo-500",
                                     },
                                 ],
                                 backgroundColor = "bg-gray-50",
                                 theme,
                             }: IconFeaturesProps) {
    return (
        <section className={`py-20 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 mb-4">{subtitle}</p>
                    <p className="text-lg text-gray-500">{description}</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap

                        return (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div
                                        className={`p-4 rounded-2xl bg-gray-100 group-hover:bg-gray-50 transition-colors ${feature.color || "text-blue-500"}`}
                                    >
                                        <IconComponent className="h-8 w-8" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>

                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Explore All Features
                    </button>
                </div>
            </div>
        </section>
    )
}
