"use client"

import { ErrorBoundary } from "./error-boundary"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import { COMPONENT_TYPES } from "@/lib/dataset"

// Dynamic imports for all component variants
// Headers
const CreativeHeader = dynamic(() => import("./headers/creative-header"))
const CorporateHeader = dynamic(() => import("./headers/corporate-header"))
const MinimalHeader = dynamic(() => import("./headers/minimal-header"))
const EcommerceHeader = dynamic(() => import("./headers/ecommerce-header"))
const EducationHeader = dynamic(() => import("./headers/education-header"))
const SaasHeader = dynamic(() => import("./headers/saas-header"))

// Heroes
const StandardHero = dynamic(() => import("./heroes/StandardHero"))
const SplitHero = dynamic(() => import("./heroes/SplitHero"))
const VideoHero = dynamic(() => import("./heroes/VideoHero"))
const GradientHero = dynamic(() => import("./heroes/GradientHero"), { ssr: false })
const ParallaxHero = dynamic(() => import("./heroes/ParallaxHero"), { ssr: false })
const VideoBackgroundHero = dynamic(() => import("./heroes/VideoBackgroundHero"), { ssr: false })

// Features
const GridFeatures = dynamic(() => import("./features/GridFeatures"))
const CardFeatures = dynamic(() => import("./features/CardFeatures"), { ssr: false })
const AnimatedFeatures = dynamic(() => import("./features/AnimatedFeatures"), { ssr: false })
const TimelineFeatures = dynamic(() => import("./features/TimelineFeatures"), { ssr: false })

// Other sections
const TestimonialsSection = dynamic(() => import("./testimonials-section"))
const CTASection = dynamic(() => import("./cta-section"))
const Footer = dynamic(() => import("./footer"))
const ModernFooter = dynamic(() => import("./footers/ModernFooter"), { ssr: false })
const CreativeFooter = dynamic(() => import("./footers/CreativeFooter"), { ssr: false })

// Component map to match type and variant to component
const componentMap: Record<string, Record<string, ComponentType<any>>> = {
    [COMPONENT_TYPES.HEADER.toLowerCase()]: {
        creative: CreativeHeader,
        corporate: CorporateHeader,
        minimal: MinimalHeader,
        ecommerce: EcommerceHeader,
        education: EducationHeader,
        saas: SaasHeader,
    },
    [COMPONENT_TYPES.HERO.toLowerCase()]: {
        standard: StandardHero,
        split: SplitHero,
        video: VideoHero,
        gradient: GradientHero,
        parallax: ParallaxHero,
        "video-background": VideoBackgroundHero,
        "background-image": VideoBackgroundHero, // Fallback
    },
    [COMPONENT_TYPES.FEATURES.toLowerCase()]: {
        grid: GridFeatures,
        cards: CardFeatures,
        animated: AnimatedFeatures,
        timeline: TimelineFeatures,
        steps: TimelineFeatures, // Fallback
    },
    [COMPONENT_TYPES.TESTIMONIALS.toLowerCase()]: {
        default: TestimonialsSection,
        cards: TestimonialsSection,
        quotes: TestimonialsSection,
        simple: TestimonialsSection,
        carousel: TestimonialsSection,
    },
    [COMPONENT_TYPES.CTA.toLowerCase()]: {
        default: CTASection,
        simple: CTASection,
        split: CTASection,
        background: CTASection,
        box: CTASection,
    },
    [COMPONENT_TYPES.FOOTER.toLowerCase()]: {
        default: Footer,
        simple: Footer,
        modern: ModernFooter,
        creative: CreativeFooter,
        "multi-column": Footer,
        centered: Footer,
        dark: Footer,
    },
}

// Function to safely get component
function getComponent(type: string, variant: string) {
    const componentType = type.toLowerCase()
    const componentVariant = variant.toLowerCase()

    // Check if component type exists
    if (!componentMap[componentType]) {
        console.warn(`Component type not found: ${type}`)
        return null
    }

    // Get component or fallback to default
    const Component = componentMap[componentType][componentVariant] || componentMap[componentType].default

    if (!Component) {
        console.warn(`Component variant not found: ${type} - ${variant}`)
        return null
    }

    return Component
}

// Function to sanitize props
function sanitizeProps(props: any) {
    if (!props) return {}

    // Create a clean copy without potential problematic props
    const { className, ...safeProps } = props

    // Ensure menu items have valid hrefs
    if (safeProps.menu && Array.isArray(safeProps.menu)) {
        safeProps.menu = safeProps.menu.map((item: any) => ({
            ...item,
            link: item.link || "#",
        }))
    }

    // Default values for common props
    if (safeProps.logo === undefined) safeProps.logo = ""
    if (safeProps.title === undefined) safeProps.title = ""
    if (safeProps.subtitle === undefined) safeProps.subtitle = ""
    if (safeProps.description === undefined) safeProps.description = ""

    return safeProps
}

interface WebsiteData {
    title: string
    description: string
    sections: Array<{
        component: string
        variant: string
        props: any
    }>
}

interface WebsiteRendererProps {
    website: WebsiteData
}

export default function TagBasedWebsiteRenderer({ website }: WebsiteRendererProps) {
    if (!website || !website.sections || !Array.isArray(website.sections)) {
        return (
            <div className="p-8 text-center text-gray-500">No website data available. Please generate a website first.</div>
        )
    }

    return (
        <div className="website-container">
            {website.sections.map((section, index) => {
                const Component = getComponent(section.component, section.variant)

                if (!Component) {
                    return (
                        <div key={index} className="p-4 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded m-4">
                            Component not found: {section.component} - {section.variant}
                        </div>
                    )
                }

                return (
                    <ErrorBoundary
                        key={index}
                        fallback={
                            <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded m-4">
                                <h3 className="font-bold">Error rendering {section.component} component</h3>
                                <p>Variant: {section.variant}</p>
                            </div>
                        }
                    >
                        <div data-component-type={section.component} data-component-variant={section.variant}>
                            <Component {...sanitizeProps(section.props)} />
                        </div>
                    </ErrorBoundary>
                )
            })}
        </div>
    )
}
