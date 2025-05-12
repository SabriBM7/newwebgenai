import { cn } from "@/lib/utils"
import { Check, ArrowRight } from "lucide-react"
import type { TextAlignment } from "@/types/index"

interface Feature {
    title: string
    description: string
    icon?: string
    iconColor?: string
    date?: string
}

interface TimelineFeaturesProps {
    title?: string
    subtitle?: string
    description?: string
    items?: Feature[]
    withBackground?: boolean
    withBorder?: boolean
    textAlignment?: TextAlignment
    className?: string
    keywords?: string[]
}

export default function TimelineFeatures({
                                             title = "Features",
                                             subtitle = "What we offer",
                                             description,
                                             items = [],
                                             withBackground = false,
                                             withBorder = true,
                                             textAlignment = "center",
                                             className,
                                             keywords = [],
                                         }: TimelineFeaturesProps) {
    // Ensure items is an array, even if it's undefined
    const features = Array.isArray(items) ? items : []

    // Default features if none provided
    if (features.length === 0) {
        features.push(
            {
                title: "Feature 1",
                description: "Description of feature 1",
                icon: "check",
                date: "Step 1",
            },
            {
                title: "Feature 2",
                description: "Description of feature 2",
                icon: "check",
                date: "Step 2",
            },
            {
                title: "Feature 3",
                description: "Description of feature 3",
                icon: "check",
                date: "Step 3",
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

                <div className="max-w-4xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="relative pl-8 pb-12 last:pb-0">
                            {/* Timeline line */}
                            {index < features.length - 1 && (
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 transform -translate-x-1/2"></div>
                            )}

                            {/* Timeline dot */}
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-600 z-10">
                                {getIconComponent(feature.icon)}
                            </div>

                            {/* Content */}
                            <div
                                className={cn(
                                    "ml-6",
                                    withBorder ? "border border-gray-200 dark:border-gray-800 rounded-lg p-6" : "",
                                    withBackground ? "bg-white dark:bg-gray-800" : "",
                                )}
                            >
                                {feature.date && (
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{feature.date}</p>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
