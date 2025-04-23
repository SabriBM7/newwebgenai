import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types/index"
import type { LucideIcon } from "lucide-react"
import { MessageSquare, Code, Layout, PaintBucket, Globe, Download } from "lucide-react"

interface Feature {
    title: string
    description: string
    icon?: LucideIcon
    iconColor?: string
}

interface FeaturesSectionProps {
    title?: string
    subtitle?: string
    features?: Feature[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    columns?: 2 | 3 | 4
    textAlignment?: TextAlignment
    keywords?: string[]
}

export default function FeaturesSection({
                                            title = "Key Features",
                                            subtitle = "Our AI-powered platform makes website creation accessible to everyone",
                                            features,
                                            backgroundColor = "#ffffff",
                                            textColor = "#000000",
                                            accentColor = "#3b82f6",
                                            columns = 3,
                                            textAlignment = "center",
                                            keywords = [],
                                        }: FeaturesSectionProps) {
    // Default features if none are provided
    const defaultFeatures: Feature[] = [
        {
            icon: MessageSquare,
            title: "AI-Powered Chatbot",
            description:
                "Uses natural language processing to understand your website requirements through simple conversation.",
            iconColor: accentColor,
        },
        {
            icon: Layout,
            title: "Automated Website Generation",
            description: "AI selects design templates, text, and components based on your preferences and industry.",
            iconColor: accentColor,
        },
        {
            icon: PaintBucket,
            title: "Customization Tools",
            description:
                "User-friendly interface for modifying layouts, adding content, and adjusting styles without coding.",
            iconColor: accentColor,
        },
        {
            icon: Globe,
            title: "Hosting & Export Options",
            description: "Preview, download, or directly deploy your generated websites with just a few clicks.",
            iconColor: accentColor,
        },
        {
            icon: Code,
            title: "No Coding Required",
            description: "Create professional websites without writing a single line of code or having technical expertise.",
            iconColor: accentColor,
        },
        {
            icon: Download,
            title: "Ready-to-Use Templates",
            description: "Access a library of AI-optimized templates for various industries and purposes.",
            iconColor: accentColor,
        },
    ]

    // Use provided features or fall back to default features
    const displayFeatures = features || defaultFeatures

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-2 lg:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-4",
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-16", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
                    {displayFeatures.map((feature, index) => {
                        const Icon = feature.icon

                        return (
                            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                {Icon && (
                                    <div className="mb-4">
                                        <Icon size={32} style={{ color: feature.iconColor || accentColor }} />
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
