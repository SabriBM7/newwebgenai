"use client"

import { useState } from "react"
import { ArrowRight, Play, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SplitScreenHeroProps {
    leftTitle?: string
    leftSubtitle?: string
    leftDescription?: string
    leftCTA?: string
    leftImage?: string
    rightTitle?: string
    rightSubtitle?: string
    rightDescription?: string
    rightCTA?: string
    rightImage?: string
    features?: string[]
    stats?: Array<{ label: string; value: string }>
    theme?: any
}

export function SplitScreenHero({
                                    leftTitle = "Transform Your Business",
                                    leftSubtitle = "Innovation Starts Here",
                                    leftDescription = "Discover cutting-edge solutions that drive growth, enhance efficiency, and deliver exceptional results for your business.",
                                    leftCTA = "Get Started",
                                    leftImage = "/placeholder.svg?height=600&width=800",
                                    rightTitle = "Proven Results",
                                    rightSubtitle = "Success Stories",
                                    rightDescription = "Join thousands of satisfied customers who have transformed their operations with our innovative solutions.",
                                    rightCTA = "View Case Studies",
                                    rightImage = "/placeholder.svg?height=600&width=800",
                                    features = ["AI-Powered Analytics", "24/7 Expert Support", "Custom Integration", "Scalable Solutions"],
                                    stats = [
                                        { label: "Success Rate", value: "99.9%" },
                                        { label: "Clients Served", value: "10K+" },
                                        { label: "Projects Completed", value: "50K+" },
                                    ],
                                    theme,
                                }: SplitScreenHeroProps) {
    const [activeSection, setActiveSection] = useState<"left" | "right">("left")

    return (
        <section className="min-h-screen flex items-center">
            <div className="w-full">
                <div className="grid lg:grid-cols-2 min-h-screen">
                    {/* Left Section */}
                    <div
                        className={`relative bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-8 lg:p-16 transition-all duration-500 ${
                            activeSection === "left" ? "lg:scale-105 z-10" : "lg:scale-95"
                        }`}
                        onMouseEnter={() => setActiveSection("left")}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
                        </div>

                        <div className="relative z-10 max-w-lg text-white">
                            {/* Subtitle */}
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm font-medium">{leftSubtitle}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">{leftTitle}</h1>

                            {/* Description */}
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">{leftDescription}</p>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Button
                                size="lg"
                                className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                {leftCTA}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20">
                                <img
                                    src={leftImage || "/placeholder.svg"}
                                    alt="Left Background"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div
                        className={`relative bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8 lg:p-16 transition-all duration-500 ${
                            activeSection === "right" ? "lg:scale-105 z-10" : "lg:scale-95"
                        }`}
                        onMouseEnter={() => setActiveSection("right")}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform skew-y-12"></div>
                        </div>

                        <div className="relative z-10 max-w-lg text-white">
                            {/* Subtitle */}
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">{rightSubtitle}</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">{rightTitle}</h2>

                            {/* Description */}
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">{rightDescription}</p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    {rightCTA}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 group">
                                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Watch Demo
                                </Button>
                            </div>

                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20">
                                <img
                                    src={rightImage || "/placeholder.svg"}
                                    alt="Right Background"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Divider */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
                    <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
