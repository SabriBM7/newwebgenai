"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Heart, Globe, Calendar } from "lucide-react"

interface ImpactStat {
    id: string
    title: string
    value: number
    unit: string
    description: string
    icon: string
    trend: number
    category: string
    color: string
}

export function ImpactStats(props: any) {
    const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

    const stats: ImpactStat[] = props.stats || [
        {
            id: "lives-impacted",
            title: "Lives Impacted",
            value: 15420,
            unit: "",
            description: "People directly helped through our programs",
            icon: "❤️",
            trend: 23,
            category: "impact",
            color: "from-red-500 to-pink-500",
        },
        {
            id: "volunteers",
            title: "Active Volunteers",
            value: 847,
            unit: "",
            description: "Dedicated volunteers making a difference",
            icon: "👥",
            trend: 15,
            category: "community",
            color: "from-blue-500 to-cyan-500",
        },
        {
            id: "donations",
            title: "Funds Raised",
            value: 2850000,
            unit: "$",
            description: "Total donations received this year",
            icon: "💰",
            trend: 31,
            category: "funding",
            color: "from-green-500 to-emerald-500",
        },
        {
            id: "programs",
            title: "Active Programs",
            value: 28,
            unit: "",
            description: "Ongoing community programs",
            icon: "🎯",
            trend: 8,
            category: "programs",
            color: "from-purple-500 to-violet-500",
        },
        {
            id: "communities",
            title: "Communities Served",
            value: 156,
            unit: "",
            description: "Local communities we actively support",
            icon: "🏘️",
            trend: 12,
            category: "reach",
            color: "from-orange-500 to-amber-500",
        },
        {
            id: "meals",
            title: "Meals Provided",
            value: 89340,
            unit: "",
            description: "Nutritious meals served to families in need",
            icon: "🍽️",
            trend: 45,
            category: "impact",
            color: "from-teal-500 to-cyan-500",
        },
    ]

    useEffect(() => {
        const animateCounters = () => {
            stats.forEach((stat) => {
                let current = 0
                const increment = stat.value / 100
                const timer = setInterval(() => {
                    current += increment
                    if (current >= stat.value) {
                        current = stat.value
                        clearInterval(timer)
                    }
                    setAnimatedValues((prev) => ({
                        ...prev,
                        [stat.id]: Math.floor(current),
                    }))
                }, 20)
            })
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters()
                    observer.disconnect()
                }
            },
            { threshold: 0.1 },
        )

        const element = document.getElementById("impact-stats")
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const formatValue = (value: number, unit: string) => {
        if (unit === "$") {
            if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(0)}K`
            }
            return `$${value.toLocaleString()}`
        }

        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`
        }
        return value.toLocaleString()
    }

    return (
        <section id="impact-stats" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Our Impact in Numbers"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "See the real difference we're making in communities around the world"}
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stats.map((stat) => (
                        <Card key={stat.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="p-0">
                                <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-4xl">{stat.icon}</div>
                                        <Badge className="bg-white/20 text-white border-white/30">
                                            <TrendingUp className="h-3 w-3 mr-1" />+{stat.trend}%
                                        </Badge>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold mb-2">
                                        {formatValue(animatedValues[stat.id] || 0, stat.unit)}
                                    </div>
                                    <div className="text-lg font-semibold opacity-90">{stat.title}</div>
                                </div>
                                <div className="p-6 bg-white">
                                    <p className="text-gray-600 text-sm">{stat.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Impact Timeline */}
                <Card className="bg-white shadow-lg mb-12">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-center mb-8">Our Journey This Year</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-blue-600" />
                                </div>
                                <h4 className="font-semibold mb-2">Q1 2024</h4>
                                <p className="text-sm text-gray-600">Launched 8 new community programs</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-green-600" />
                                </div>
                                <h4 className="font-semibold mb-2">Q2 2024</h4>
                                <p className="text-sm text-gray-600">Reached 5,000+ new beneficiaries</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-purple-600" />
                                </div>
                                <h4 className="font-semibold mb-2">Q3 2024</h4>
                                <p className="text-sm text-gray-600">Expanded to 25 new communities</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="h-8 w-8 text-orange-600" />
                                </div>
                                <h4 className="font-semibold mb-2">Q4 2024</h4>
                                <p className="text-sm text-gray-600">International expansion begins</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Impact Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                        <CardContent className="p-6 text-center">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Community Impact</h3>
                            <p className="text-blue-100 text-sm">
                                Building stronger, more resilient communities through education, healthcare, and social programs.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
                        <CardContent className="p-6 text-center">
                            <Heart className="h-12 w-12 mx-auto mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Direct Aid</h3>
                            <p className="text-green-100 text-sm">
                                Providing immediate assistance to families and individuals facing crisis situations.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                        <CardContent className="p-6 text-center">
                            <Globe className="h-12 w-12 mx-auto mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                            <p className="text-purple-100 text-sm">
                                Expanding our mission worldwide to create lasting change on a global scale.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
