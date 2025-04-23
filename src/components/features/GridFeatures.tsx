"use client"

import { cn } from "@/lib/utils"
import { Star, CheckCircle, Zap } from "lucide-react"

export interface FeatureItem {
    title: string
    description: string
    icon?: string
    color?: string
}

export interface GridFeaturesProps {
    title?: string
    subtitle?: string
    features: FeatureItem[]
    columns?: 2 | 3 | 4
    style?: "card" | "minimal" | "icon"
    textAlignment?: "left" | "center"
    backgroundColor?: string
    textColor?: string
    maxWidth?: string
}

const iconComponents = {
    star: Star,
    check: CheckCircle,
    zap: Zap,
}

export default function GridFeatures({
                                         title,
                                         subtitle,
                                         features,
                                         columns = 3,
                                         style = "card",
                                         textAlignment = "left",
                                         backgroundColor = "transparent",
                                         textColor = "inherit",
                                         maxWidth = "1200px",
                                     }: GridFeaturesProps) {
    const gridClasses = cn(
        "grid gap-6",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-4"
    )

    const textClasses = cn(
        "space-y-2",
        textAlignment === "center" ? "text-center" : "text-left"
    )

    return (
        <section
            className="w-full py-12 md:py-20"
            style={{ backgroundColor, color: textColor }}
        >
            <div className="container mx-auto px-4" style={{ maxWidth }}>
                {(title || subtitle) && (
                    <div className={textClasses}>
                        {title && <h2 className="text-3xl font-bold">{title}</h2>}
                        {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
                    </div>
                )}

                <div className={cn(gridClasses, "mt-10")}>
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon ? iconComponents[feature.icon as keyof typeof iconComponents] : Star

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "p-6 rounded-lg",
                                    style === "card" && "bg-background shadow-md",
                                    style === "minimal" && "border",
                                    style === "icon" && "text-center"
                                )}
                            >
                                {IconComponent && (
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                                            style !== "icon" && "text-left"
                                        )}
                                        style={{ backgroundColor: `${feature.color || '#3b82f6'}20` }}
                                    >
                                        <IconComponent
                                            className="h-6 w-6"
                                            style={{ color: feature.color || '#3b82f6' }}
                                        />
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}