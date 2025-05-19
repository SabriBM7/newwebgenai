"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Header Components
const MinimalHeader = dynamic(() => import("./headers/minimal-header"))
const EducationHeader = dynamic(() => import("./headers/education-header"))
const EcommerceHeader = dynamic(() => import("./headers/ecommerce-header"))
const CreativeHeader = dynamic(() => import("./headers/creative-header"))
const CorporateHeader = dynamic(() => import("./headers/corporate-header"))
const SaaSHeader = dynamic(() => import("./headers/saas-header"))

// Hero Components
const StandardHero = dynamic(() => import("./heroes/StandardHero"))
const SplitHero = dynamic(() => import("./heroes/SplitHero"))
const VideoHero = dynamic(() => import("./heroes/VideoHero"))

// Features Components
const GridFeatures = dynamic(() => import("./features/GridFeatures"))

// Other Components
const TestimonialsSection = dynamic(() => import("./testimonials-section"))
const CTASection = dynamic(() => import("./cta-section"))
const PricingSection = dynamic(() => import("./pricing/PricingSection"))
const FAQSection = dynamic(() => import("./faq/FAQSection"))
const StatsSection = dynamic(() => import("./stats/StatsSection"))
const TeamSection = dynamic(() => import("./team/TeamSection"))
const NewsletterSection = dynamic(() => import("./newsletter/NewsletterSection"))
const Footer = dynamic(() => import("./footer"))

// Component Map
const COMPONENT_MAP: Record<string, Record<string, any>> = {
    header: {
        minimal: MinimalHeader,
        education: EducationHeader,
        ecommerce: EcommerceHeader,
        creative: CreativeHeader,
        corporate: CorporateHeader,
        saas: SaaSHeader,
        default: MinimalHeader,
    },
    hero: {
        standard: StandardHero,
        split: SplitHero,
        video: VideoHero,
        default: StandardHero,
    },
    features: {
        grid: GridFeatures,
        default: GridFeatures,
    },
    testimonials: {
        default: TestimonialsSection,
    },
    cta: {
        default: CTASection,
    },
    pricing: {
        default: PricingSection,
    },
    faq: {
        default: FAQSection,
    },
    stats: {
        default: StatsSection,
    },
    team: {
        default: TeamSection,
    },
    newsletter: {
        default: NewsletterSection,
    },
    footer: {
        default: Footer,
    },
}

// Helper to sanitize props
function sanitizeProps(props: any = {}) {
    if (!props) return {}

    // Create a new object without the className property
    const { className, ...sanitizedProps } = props

    // Ensure menu items have valid hrefs
    if (sanitizedProps.menu && Array.isArray(sanitizedProps.menu)) {
        sanitizedProps.menu = sanitizedProps.menu.map((item: any) => ({
            ...item,
            link: item.link || "#",
        }))
    }

    // Ensure logo is a string
    if (sanitizedProps.logo === undefined || sanitizedProps.logo === null) {
        sanitizedProps.logo = ""
    }

    // Ensure other common props have default values
    if (sanitizedProps.title === undefined) sanitizedProps.title = ""
    if (sanitizedProps.subtitle === undefined) sanitizedProps.subtitle = ""
    if (sanitizedProps.description === undefined) sanitizedProps.description = ""

    return sanitizedProps
}

export default function SafeComponentRenderer({
                                                  type,
                                                  variant = "default",
                                                  props = {},
                                              }: {
    type: string
    variant?: string
    props?: any
}) {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Reset status on props or component change
        setLoading(true)
        setError(null)

        // Short timeout to prevent hydration issues
        const timer = setTimeout(() => {
            setLoading(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [type, variant, props])

    try {
        // Check if component type exists in map
        const componentCategory = COMPONENT_MAP[type]
        if (!componentCategory) {
            return (
                <div className="p-4 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded m-4">
                    Unknown component type: {type}
                </div>
            )
        }

        // Get component or fallback to default
        const Component = componentCategory[variant] || componentCategory.default

        if (!Component) {
            return (
                <div className="p-4 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded m-4">
                    Unknown variant: {variant} for component type: {type}
                </div>
            )
        }

        // Sanitize props to prevent React.Fragment error
        const safeProps = sanitizeProps(props)

        // If still loading, show placeholder
        if (loading) {
            return <div className="min-h-[100px] bg-gray-100 animate-pulse rounded m-4"></div>
        }

        // Render the component with sanitized props
        return <Component {...safeProps} />
    } catch (err) {
        // Handle any errors during rendering
        const errorMessage = err instanceof Error ? err.message : String(err)
        setError(errorMessage)

        return (
            <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded m-4">
                <h3 className="font-bold">Error rendering {type} component:</h3>
                <pre className="mt-2 text-xs overflow-auto">{errorMessage}</pre>
            </div>
        )
    }
}
