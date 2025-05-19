"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types/index"

interface StatItem {
    value: number
    label: string
    prefix?: string
    suffix?: string
    duration?: number
}

interface StatsSectionProps {
    title?: string
    subtitle?: string
    stats?: StatItem[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    columns?: 2 | 3 | 4
    style?: "cards" | "simple" | "bordered"
    animated?: boolean
    keywords?: string[]
}

export default function StatsSection({
                                         title = "Our Impact in Numbers",
                                         subtitle = "See the difference we've made",
                                         stats,
                                         backgroundColor = "#ffffff",
                                         textColor = "#000000",
                                         accentColor = "#3b82f6",
                                         textAlignment = "center",
                                         columns = 4,
                                         style = "simple",
                                         animated = true,
                                         keywords = [],
                                     }: StatsSectionProps) {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    const defaultStats: StatItem[] = [
        {
            value: 10000,
            label: "Websites Created",
            prefix: "",
            suffix: "+",
            duration: 2000,
        },
        {
            value: 98,
            label: "Customer Satisfaction",
            prefix: "",
            suffix: "%",
            duration: 2000,
        },
        {
            value: 24,
            label: "Average Time Saved",
            prefix: "",
            suffix: " hours",
            duration: 2000,
        },
        {
            value: 50,
            label: "Cost Reduction",
            prefix: "",
            suffix: "%",
            duration: 2000,
        },
    ]

    const displayStats = stats || defaultStats
    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-4",
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <section ref={sectionRef} className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
                    {displayStats.map((stat, index) => (
                        <StatDisplay
                            key={index}
                            stat={stat}
                            style={style}
                            accentStyle={accentStyle}
                            isVisible={isVisible && animated}
                            textAlignmentClass={textAlignmentClass}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface StatDisplayProps {
    stat: StatItem
    style: "cards" | "simple" | "bordered"
    accentStyle: React.CSSProperties
    isVisible: boolean
    textAlignmentClass: string
}

function StatDisplay({ stat, style, accentStyle, isVisible, textAlignmentClass }: StatDisplayProps) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return

        let start = 0
        const end = stat.value
        const duration = stat.duration || 2000
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start > end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [isVisible, stat.value, stat.duration])

    return (
        <div
            className={cn(
                textAlignmentClass,
                style === "cards" && "bg-white rounded-lg shadow-sm p-8",
                style === "bordered" && "border rounded-lg p-8",
                style === "simple" && "p-4",
            )}
        >
            <div className="text-4xl md:text-5xl font-bold mb-2" style={accentStyle}>
                {stat.prefix}
                {isVisible ? count : 0}
                {stat.suffix}
            </div>
            <div className="text-lg opacity-80">{stat.label}</div>
        </div>
    )
}
