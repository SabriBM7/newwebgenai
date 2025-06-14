"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Play, ArrowRight, Star, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InteractiveHeroProps {
    title?: string
    subtitle?: string
    description?: string
    primaryCTA?: string
    secondaryCTA?: string
    backgroundImage?: string
    stats?: Array<{ label: string; value: string; icon?: any }>
    features?: string[]
    theme?: any
}

export function InteractiveHero({
                                    title = "Transform Your Business with AI-Powered Solutions",
                                    subtitle = "Innovation Meets Excellence",
                                    description = "Discover cutting-edge technology solutions that drive growth, enhance efficiency, and deliver exceptional results for your business.",
                                    primaryCTA = "Start Your Journey",
                                    secondaryCTA = "Watch Demo",
                                    backgroundImage = "/placeholder.svg?height=800&width=1200",
                                    stats = [
                                        { label: "Happy Clients", value: "500+", icon: Users },
                                        { label: "Projects Completed", value: "1000+", icon: Award },
                                        { label: "Client Satisfaction", value: "99%", icon: Star },
                                    ],
                                    features = ["AI-Powered Analytics", "24/7 Support", "Custom Solutions", "Scalable Architecture"],
                                    theme,
                                }: InteractiveHeroProps) {
    const [activeFeature, setActiveFeature] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [features.length])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        })
    }

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(79, 70, 229, 0.1) 100%)`,
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-8">
                        {/* Subtitle with animation */}
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium">{subtitle}</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            {title.split(" ").map((word, index) => (
                                <span
                                    key={index}
                                    className="inline-block mr-4 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                  {word}
                </span>
                            ))}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">{description}</p>

                        {/* Interactive Features */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Key Features:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                                            activeFeature === index
                                                ? "bg-white/20 border-white/40 scale-105"
                                                : "bg-white/5 border-white/20 hover:bg-white/10"
                                        }`}
                                        onClick={() => setActiveFeature(index)}
                                    >
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                {primaryCTA}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 group">
                                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                {secondaryCTA}
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="flex justify-center mb-2">
                                        <stat.icon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Interactive Visual */}
                    <div className="relative">
                        <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
                            <img
                                src={backgroundImage || "/placeholder.svg"}
                                alt="Hero Visual"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                            {/* Floating Cards */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-gray-800">Live Analytics</span>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float"
                                style={{ animationDelay: "1s" }}
                            >
                                <div className="text-2xl font-bold text-gray-800">98.5%</div>
                                <div className="text-sm text-gray-600">Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    )
}
