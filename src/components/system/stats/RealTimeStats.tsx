"use client"

import { useState, useEffect } from "react"
import { Activity, TrendingUp, Users, DollarSign, Clock, Zap } from "lucide-react"

interface RealTimeStat {
    label: string
    value: number
    change: number
    changeType: "increase" | "decrease"
    icon: any
    color: string
    unit?: string
    format?: "number" | "currency" | "percentage"
}

interface RealTimeStatsProps {
    title?: string
    subtitle?: string
    stats?: RealTimeStat[]
    updateInterval?: number
    theme?: any
}

export function RealTimeStats({
                                  title = "Live Performance Dashboard",
                                  subtitle = "Real-time metrics and analytics",
                                  stats = [
                                      {
                                          label: "Active Users",
                                          value: 1247,
                                          change: 12.5,
                                          changeType: "increase",
                                          icon: Users,
                                          color: "blue",
                                          format: "number",
                                      },
                                      {
                                          label: "Revenue Today",
                                          value: 24580,
                                          change: 8.2,
                                          changeType: "increase",
                                          icon: DollarSign,
                                          color: "green",
                                          format: "currency",
                                      },
                                      {
                                          label: "Conversion Rate",
                                          value: 3.24,
                                          change: -0.5,
                                          changeType: "decrease",
                                          icon: TrendingUp,
                                          color: "purple",
                                          format: "percentage",
                                          unit: "%",
                                      },
                                      {
                                          label: "Server Response",
                                          value: 142,
                                          change: -15.3,
                                          changeType: "increase",
                                          icon: Activity,
                                          color: "orange",
                                          format: "number",
                                          unit: "ms",
                                      },
                                      {
                                          label: "Uptime",
                                          value: 99.98,
                                          change: 0.02,
                                          changeType: "increase",
                                          icon: Clock,
                                          color: "indigo",
                                          format: "percentage",
                                          unit: "%",
                                      },
                                      {
                                          label: "API Calls",
                                          value: 15420,
                                          change: 23.1,
                                          changeType: "increase",
                                          icon: Zap,
                                          color: "red",
                                          format: "number",
                                      },
                                  ],
                                  updateInterval = 3000,
                                  theme,
                              }: RealTimeStatsProps) {
    const [currentStats, setCurrentStats] = useState(stats)
    const [isLive, setIsLive] = useState(true)

    useEffect(() => {
        if (!isLive) return

        const interval = setInterval(() => {
            setCurrentStats((prevStats) =>
                prevStats.map((stat) => ({
                    ...stat,
                    value: stat.value + (Math.random() - 0.5) * (stat.value * 0.02),
                    change: (Math.random() - 0.5) * 20,
                    changeType: Math.random() > 0.5 ? "increase" : "decrease",
                })),
            )
        }, updateInterval)

        return () => clearInterval(interval)
    }, [isLive, updateInterval])

    const formatValue = (value: number, format?: string, unit?: string) => {
        let formattedValue = ""

        switch (format) {
            case "currency":
                formattedValue = `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                break
            case "percentage":
                formattedValue = value.toFixed(2)
                break
            default:
                formattedValue = Math.round(value).toLocaleString()
        }

        return unit ? `${formattedValue}${unit}` : formattedValue
    }

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50" },
            green: { bg: "bg-green-500", text: "text-green-600", light: "bg-green-50" },
            purple: { bg: "bg-purple-500", text: "text-purple-600", light: "bg-purple-50" },
            orange: { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-50" },
            indigo: { bg: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50" },
            red: { bg: "bg-red-500", text: "text-red-600", light: "bg-red-50" },
        }
        return colorMap[color as keyof typeof colorMap] || colorMap.blue
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                        <p className="text-xl text-gray-600">{subtitle}</p>
                    </div>

                    {/* Live Toggle */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
                            <span className="text-sm font-medium text-gray-600">{isLive ? "Live Updates" : "Paused"}</span>
                        </div>
                        <button
                            onClick={() => setIsLive(!isLive)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isLive
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {isLive ? "Pause" : "Resume"}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentStats.map((stat, index) => {
                        const IconComponent = stat.icon
                        const colors = getColorClasses(stat.color)

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${colors.light}`}>
                                        <IconComponent className={`h-6 w-6 ${colors.text}`} />
                                    </div>
                                    <div
                                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                                            stat.changeType === "increase" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        <TrendingUp className={`h-3 w-3 ${stat.changeType === "decrease" ? "rotate-180" : ""}`} />
                                        <span>{Math.abs(stat.change).toFixed(1)}%</span>
                                    </div>
                                </div>

                                {/* Value */}
                                <div className="mb-2">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {formatValue(stat.value, stat.format, stat.unit)}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
                                        style={{
                                            width: `${Math.min(100, (stat.value / (stat.value * 1.5)) * 100)}%`,
                                        }}
                                    ></div>
                                </div>

                                {/* Last Updated */}
                                <div className="mt-3 text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
                            </div>
                        )
                    })}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    {/* Performance Summary */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Overall Health</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">92%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">System Load</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-yellow-600">67%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Error Rate</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "3%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-red-600">0.03%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">New user registration spike detected</span>
                                <span className="text-xs text-gray-400">2m ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">API response time improved</span>
                                <span className="text-xs text-gray-400">5m ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">High traffic volume on checkout</span>
                                <span className="text-xs text-gray-400">8m ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Database optimization completed</span>
                                <span className="text-xs text-gray-400">12m ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
