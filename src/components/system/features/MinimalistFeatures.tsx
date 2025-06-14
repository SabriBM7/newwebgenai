import type React from "react"
import {
    Zap,
    Shield,
    Users,
    BookOpen,
    Star,
    Check,
    Lightbulb,
    Award,
    Heart,
    Clock,
    Settings,
    Compass,
} from "lucide-react"

interface Feature {
    title: string
    description: string
    icon: string
}

interface FeaturesGridProps {
    title?: string
    subtitle?: string
    description?: string
    features: Feature[]
    backgroundColor?: string
    textColor?: string
    columns?: 2 | 3 | 4
}

export default function MinimalistFeatures({
                                         title,
                                         subtitle,
                                         description,
                                         features,
                                         backgroundColor = "bg-white",
                                         textColor = "text-gray-900",
                                         columns = 3,
                                     }: FeaturesGridProps) {
    // Map icon names to Lucide components
    const iconMap: Record<string, React.ReactNode> = {
        zap: <Zap className="h-6 w-6" />,
        shield: <Shield className="h-6 w-6" />,
        users: <Users className="h-6 w-6" />,
        "book-open": <BookOpen className="h-6 w-6" />,
        star: <Star className="h-6 w-6" />,
        check: <Check className="h-6 w-6" />,
        lightbulb: <Lightbulb className="h-6 w-6" />,
        award: <Award className="h-6 w-6" />,
        heart: <Heart className="h-6 w-6" />,
        clock: <Clock className="h-6 w-6" />,
        settings: <Settings className="h-6 w-6" />,
        compass: <Compass className="h-6 w-6" />,
    }

    // Determine grid columns class
    const gridClass = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns]

    return (
        <section className={`${backgroundColor} ${textColor} py-16`}>
            <div className="container mx-auto px-4">
                {(title || subtitle || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        {subtitle && <p className="text-lg font-medium mb-3 opacity-80">{subtitle}</p>}
                        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                        {description && <p className="text-lg opacity-80">{description}</p>}
                    </div>
                )}

                <div className={`grid ${gridClass} gap-8`}>
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                                {iconMap[feature.icon] || <Star className="h-6 w-6" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="opacity-80">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
