"use client"

import { useState, useEffect, useRef } from "react"
import { TrendingUp, Users, Award, Globe, Target, Zap } from "lucide-react"

interface StatItem {
    label: string
    value: number
    suffix?: string
    prefix?: string
    icon?: any
    color?: string
    description?: string
}

interface AnimatedCountersProps {
    title?: string
    subtitle?: string
    stats?: StatItem[]
    theme?: any
}

export function AnimatedCounters({
                                     title = "Our Impact in Numbers",
                                     subtitle = "Trusted by thousands of businesses worldwide",
                                     stats = [
                                         {
                                             label: "Happy Clients",
                                             value: 2500,
                                             suffix: "+",
                                             icon: Users,
                                             color: "blue",
                                             description: "Satisfied customers globally",
                                         },
                                         {
                                             label: "Projects Completed",
                                             value: 10000,
                                             suffix: "+",
                                             icon: Award,
                                             color: "green",
                                             description: "Successful project deliveries",
                                         },
                                         {
                                             label: "Countries Served",
                                             value: 45,
                                             suffix: "+",
                                             icon: Globe,
                                             color: "purple",
                                             description: "Global presence and reach",
                                         },
                                         {
                                             label: "Success Rate",
                                             value: 99,
                                             suffix: "%",
                                             icon: Target,
                                             color: "orange",
                                             description: "Project success rate",
                                         },
                                         {
                                             label: "Years Experience",
                                             value: 15,
                                             suffix: "+",
                                             icon: TrendingUp,
                                             color: "red",
                                             description: "Industry expertise",
                                         },
                                         {
                                             label: "Team Members",
                                             value: 150,
                                             suffix: "+",
                                             icon: Zap,
                                             color: "indigo",
                                             description: "Expert professionals",
                                         },
                                     ],
                                     theme,
                                 }: AnimatedCountersProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0))
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                    animateCounters()
                }
            },
            { threshold: 0.3 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    const animateCounters = () => {
        stats.forEach((stat, index) => {
            const duration = 2000 // 2 seconds
            const steps = 60
            const increment = stat.value / steps
            let current = 0

            const timer = setInterval(() => {
                current += increment
                if (current >= stat.value) {
                    current = stat.value
                    clearInterval(timer)
                }

                setAnimatedValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = Math.floor(current)
                    return newValues
                })
            }, duration / steps)
        })
    }

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600",
            red: "bg-red-100 text-red-600",
            indigo: "bg-indigo-100 text-indigo-600",
        }
        return colorMap[color as keyof typeof colorMap] || colorMap.blue
    }

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
                    <p className="text-xl text-gray-300">{subtitle}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon
                        const animatedValue = animatedValues[index]

                        return (
                            <div
                                key={index}
                                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${getColorClasses(stat.color || "blue")} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="h-8 w-8" />
                                    </div>

                                    {/* Counter */}
                                    <div className="mb-4">
                                        <div className="text-4xl md:text-5xl font-bold mb-2">
                      <span className="tabular-nums">
                        {stat.prefix}
                          {animatedValue.toLocaleString()}
                          {stat.suffix}
                      </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-200 mb-2">{stat.label}</h3>
                                        {stat.description && <p className="text-gray-400 text-sm">{stat.description}</p>}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r transition-all duration-2000 ease-out ${
                                                stat.color === "blue"
                                                    ? "from-blue-400 to-blue-600"
                                                    : stat.color === "green"
                                                        ? "from-green-400 to-green-600"
                                                        : stat.color === "purple"
                                                            ? "from-purple-400 to-purple-600"
                                                            : stat.color === "orange"
                                                                ? "from-orange-400 to-orange-600"
                                                                : stat.color === "red"
                                                                    ? "from-red-400 to-red-600"
                                                                    : "from-indigo-400 to-indigo-600"
                                            }`}
                                            style={{
                                                width: isVisible ? "100%" : "0%",
                                                transitionDelay: `${index * 200}ms`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-300 mb-6 text-lg">
                        Join thousands of satisfied customers who trust us with their success
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                            Get Started Today
                        </button>
                        <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    ></div>
                ))}
            </div>
        </section>
    )
}
