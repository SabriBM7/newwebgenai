"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, ChevronRight } from "lucide-react"

interface InteractiveFeature {
    id: string
    title: string
    description: string
    icon: string
    demo?: {
        type: "animation" | "counter" | "progress" | "toggle"
        config?: any
    }
    benefits: string[]
    color: string
}

interface InteractiveFeaturesProps {
    title?: string
    subtitle?: string
    features?: InteractiveFeature[]
}

export default function InteractiveFeatures({
                                                title = "Interactive Features",
                                                subtitle = "Experience our features in action",
                                                features = [],
                                            }: InteractiveFeaturesProps) {
    const [activeFeature, setActiveFeature] = useState<string | null>(null)
    const [demoStates, setDemoStates] = useState<Record<string, any>>({})

    const defaultFeatures: InteractiveFeature[] = [
        {
            id: "1",
            title: "Real-time Analytics",
            description: "Watch your data update in real-time with our advanced analytics dashboard",
            icon: "📊",
            demo: {
                type: "counter",
                config: { start: 0, end: 1000, duration: 2000 },
            },
            benefits: ["Live data updates", "Custom dashboards", "Export capabilities"],
            color: "bg-blue-500",
        },
        {
            id: "2",
            title: "Progress Tracking",
            description: "Monitor your progress with visual indicators and milestone tracking",
            icon: "📈",
            demo: {
                type: "progress",
                config: { duration: 3000 },
            },
            benefits: ["Visual progress bars", "Milestone alerts", "Goal setting"],
            color: "bg-green-500",
        },
        {
            id: "3",
            title: "Smart Automation",
            description: "Automate repetitive tasks with our intelligent workflow system",
            icon: "🤖",
            demo: {
                type: "toggle",
                config: { states: ["Manual", "Automated"] },
            },
            benefits: ["Workflow automation", "Smart triggers", "Time savings"],
            color: "bg-purple-500",
        },
        {
            id: "4",
            title: "Dynamic Content",
            description: "Content that adapts and changes based on user interactions",
            icon: "🎭",
            demo: {
                type: "animation",
                config: { duration: 2000 },
            },
            benefits: ["Personalized content", "Dynamic layouts", "User engagement"],
            color: "bg-orange-500",
        },
    ]

    const displayFeatures = features.length > 0 ? features : defaultFeatures

    const handleFeatureClick = (featureId: string) => {
        setActiveFeature(activeFeature === featureId ? null : featureId)
    }

    const runDemo = (feature: InteractiveFeature) => {
        if (!feature.demo) return

        switch (feature.demo.type) {
            case "counter":
                animateCounter(feature.id, feature.demo.config)
                break
            case "progress":
                animateProgress(feature.id, feature.demo.config)
                break
            case "toggle":
                toggleState(feature.id, feature.demo.config)
                break
            case "animation":
                triggerAnimation(feature.id)
                break
        }
    }

    const animateCounter = (id: string, config: any) => {
        const { start, end, duration } = config
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.floor(start + (end - start) * progress)

            setDemoStates((prev) => ({ ...prev, [id]: current }))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        animate()
    }

    const animateProgress = (id: string, config: any) => {
        const { duration } = config
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1) * 100

            setDemoStates((prev) => ({ ...prev, [id]: progress }))

            if (progress < 100) {
                requestAnimationFrame(animate)
            }
        }

        animate()
    }

    const toggleState = (id: string, config: any) => {
        const { states } = config
        const currentIndex = demoStates[id] || 0
        const nextIndex = (currentIndex + 1) % states.length
        setDemoStates((prev) => ({ ...prev, [id]: nextIndex }))
    }

    const triggerAnimation = (id: string) => {
        setDemoStates((prev) => ({ ...prev, [id]: Date.now() }))
    }

    const resetDemo = (id: string) => {
        setDemoStates((prev) => ({ ...prev, [id]: 0 }))
    }

    const renderDemo = (feature: InteractiveFeature) => {
        if (!feature.demo) return null

        const state = demoStates[feature.id] || 0

        switch (feature.demo.type) {
            case "counter":
                return (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{state}</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                )

            case "progress":
                return (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{Math.round(state)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-100"
                                style={{ width: `${state}%` }}
                            />
                        </div>
                    </div>
                )

            case "toggle":
                const states = feature.demo.config.states
                const currentState = states[state] || states[0]
                return (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900 mb-2">Mode: {currentState}</div>
                        <div
                            className={`w-12 h-6 rounded-full transition-colors ${
                                state === 1 ? "bg-green-500" : "bg-gray-300"
                            } relative`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    state === 1 ? "translate-x-6" : "translate-x-0.5"
                                }`}
                            />
                        </div>
                    </div>
                )

            case "animation":
                return (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                            className={`w-16 h-16 ${feature.color} rounded-full mx-auto transition-all duration-500 ${
                                state ? "animate-bounce scale-110" : ""
                            }`}
                        >
                            <span className="text-2xl flex items-center justify-center h-full">{feature.icon}</span>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayFeatures.map((feature) => (
                        <Card
                            key={feature.id}
                            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                activeFeature === feature.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                            }`}
                            onClick={() => handleFeatureClick(feature.id)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                                        <span className="text-xl">{feature.icon}</span>
                                    </div>
                                    <ChevronRight
                                        className={`h-5 w-5 text-gray-400 transition-transform ${
                                            activeFeature === feature.id ? "rotate-90" : ""
                                        }`}
                                    />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 mb-4">{feature.description}</p>

                                {/* Demo Area */}
                                {activeFeature === feature.id && (
                                    <div className="mt-6 space-y-4">
                                        {renderDemo(feature)}

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    runDemo(feature)
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Play className="h-3 w-3 mr-1" />
                                                Run Demo
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    resetDemo(feature.id)
                                                }}
                                            >
                                                <RotateCcw className="h-3 w-3 mr-1" />
                                                Reset
                                            </Button>
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                                            <ul className="space-y-1">
                                                {feature.benefits.map((benefit, index) => (
                                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeFeature !== feature.id && (
                                    <div className="flex flex-wrap gap-1 mt-4">
                                        {feature.benefits.slice(0, 2).map((benefit, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {benefit}
                                            </Badge>
                                        ))}
                                        {feature.benefits.length > 2 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{feature.benefits.length - 2} more
                                            </Badge>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">
                        Click on any feature card to see it in action and explore its capabilities
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Explore All Features</Button>
                </div>
            </div>
        </section>
    )
}
