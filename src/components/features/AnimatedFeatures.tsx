import { cn, getAnimationClasses } from "@/lib/utils"
import { Check, ArrowRight } from "lucide-react"
import type { TextAlignment } from "@/types/index"

interface Feature {
    title: string
    description: string
    icon?: string
    iconColor?: string
    animation?: string
}

interface AnimatedFeaturesProps {
    title?: string
    subtitle?: string
    description?: string
    items?: Feature[]
    columns?: 2 | 3 | 4
    withBackground?: boolean
    withBorder?: boolean
    textAlignment?: TextAlignment
    className?: string
    keywords?: string[]
}

export default function AnimatedFeatures({
                                             title = "Features",
                                             subtitle = "What we offer",
                                             description,
                                             items = [],
                                             columns = 3,
                                             withBackground = false,
                                             withBorder = true,
                                             textAlignment = "center",
                                             className,
                                             keywords = [],
                                         }: AnimatedFeaturesProps) {
    // Ensure items is an array, even if it's undefined
    const features = Array.isArray(items) ? items : []

    // Default features if none provided
    if (features.length === 0) {
        features.push(
            {
                title: "Feature 1",
                description: "Description of feature 1",
                icon: "check",
                animation: "fade-up",
            },
            {
                title: "Feature 2",
                description: "Description of feature 2",
                icon: "check",
                animation: "fade-up",
            },
            {
                title: "Feature 3",
                description: "Description of feature 3",
                icon: "check",
                animation: "fade-up",
            },
        )
    }

    const getIconComponent = (iconName = "check") => {
        switch (iconName?.toLowerCase()) {
            case "check":
                return <Check className="h-6 w-6" />
            case "arrow":
            case "arrowright":
                return <ArrowRight className="h-6 w-6" />
            default:
                return <Check className="h-6 w-6" />
        }
    }

    const getColumnsClass = () => {
        switch (columns) {
            case 2:
                return "grid-cols-1 md:grid-cols-2"
            case 3:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            case 4:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            default:
                return "grid-cols-1 md:grid-cols-3"
        }
    }

    const getTextAlignmentClass = () => {
        switch (textAlignment) {
            case "left":
                return "text-left"
            case "center":
                return "text-center"
            case "right":
                return "text-right"
            default:
                return "text-center"
        }
    }

    return (
        <section
            className={cn("py-16", withBackground ? "bg-gray-50 dark:bg-gray-900" : "", className)}
            data-keywords={keywords.join(",")}
        >
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", getTextAlignmentClass())}>
                    {subtitle && <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{subtitle}</p>}
                    {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                    {description && <p className="text-gray-600 dark:text-gray-400 text-lg">{description}</p>}
                </div>

                <div className={cn("grid gap-8", getColumnsClass())}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-6 transition-all duration-300 hover:transform hover:-translate-y-2",
                                withBorder ? "border border-gray-200 dark:border-gray-800 rounded-lg" : "",
                                withBackground ? "bg-white dark:bg-gray-800" : "",
                                getAnimationClasses(feature.animation),
                                `animation-delay-${index * 100}`,
                            )}
                        >
                            <div className="mb-4">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                    {getIconComponent(feature.icon)}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
