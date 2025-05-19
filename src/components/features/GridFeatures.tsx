"use client"

import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface Feature {
    title: string
    description: string
    icon?: string
    iconColor?: string
}

interface GridFeaturesProps {
    title: string
    subtitle?: string
    features: Feature[]
    columns?: 2 | 3 | 4
    backgroundColor?: string
    textColor?: string
    iconColor?: string
    alignment?: "left" | "center"
    keywords?: string[]
}

export default function GridFeatures({
                                         title,
                                         subtitle,
                                         features,
                                         columns = 3,
                                         backgroundColor = "#ffffff",
                                         textColor = "#000000",
                                         iconColor = "#3b82f6",
                                         alignment = "center",
                                         keywords = [],
                                     }: GridFeaturesProps) {
    const containerStyle = {
        backgroundColor,
        color: textColor,
    }

    const getIcon = (iconName: string): LucideIcon => {
        // @ts-ignore - Dynamic icon import
        return LucideIcons[iconName] || LucideIcons.Sparkles
    }

    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-2 lg:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-4",
    }

    const alignmentClasses = {
        left: "text-left",
        center: "text-center",
    }

    return (
        <section className="py-16 md:py-24" style={containerStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={`max-w-3xl mx-auto mb-16 ${alignmentClasses[alignment]}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon ? getIcon(feature.icon) : null

                        return (
                            <div
                                key={index}
                                className={`p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${alignmentClasses[alignment]}`}
                            >
                                {Icon && (
                                    <div className="mb-4">
                                        <Icon size={32} color={feature.iconColor || iconColor} />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="opacity-80">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
