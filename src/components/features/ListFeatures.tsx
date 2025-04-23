"use client"

import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

export interface ListFeaturesProps {
    title?: string
    subtitle?: string
    features: {
        title: string
        description: string
        icon?: React.ReactNode
    }[]
    style?: "simple" | "detailed" | "numbered"
    textAlignment?: "left" | "center"
    backgroundColor?: string
    textColor?: string
    maxWidth?: string
}

export default function ListFeatures({
                                         title,
                                         subtitle,
                                         features,
                                         style = "simple",
                                         textAlignment = "left",
                                         backgroundColor = "transparent",
                                         textColor = "inherit",
                                         maxWidth = "1200px",
                                     }: ListFeaturesProps) {
    const containerClasses = cn(
        "space-y-8",
        textAlignment === "center" ? "text-center" : "text-left"
    )

    return (
        <section
            className="w-full py-12 md:py-20"
            style={{ backgroundColor, color: textColor }}
        >
            <div className="container mx-auto px-4" style={{ maxWidth }}>
                {(title || subtitle) && (
                    <div className={containerClasses}>
                        {title && <h2 className="text-3xl font-bold">{title}</h2>}
                        {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
                    </div>
                )}

                <div className={cn("mt-10 space-y-8", style === "detailed" && "divide-y")}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex gap-4",
                                style === "numbered" && "items-start"
                            )}
                        >
                            {style === "numbered" && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    {index + 1}
                                </div>
                            )}

                            {style !== "numbered" && feature.icon ? (
                                feature.icon
                            ) : (
                                <CheckCircle className="flex-shrink-0 h-6 w-6 text-primary mt-0.5" />
                            )}

                            <div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-1 text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}