import type React from "react"
import { COMPONENT_TYPES } from "@/lib/dataset"

// Headers
import CreativeHeader from "./headers/creative-header"
import CorporateHeader from "./headers/corporate-header"
import MinimalHeader from "./headers/minimal-header"
import EcommerceHeader from "./headers/ecommerce-header"
import EducationHeader from "./headers/education-header"
import SaaSHeader from "./headers/saas-header"

// Heroes
import StandardHero from "./heroes/StandardHero"
import SplitHero from "./heroes/SplitHero"
import VideoHero from "./heroes/VideoHero"

// Features
import GridFeatures from "./features/GridFeatures"

// Pricing
import PricingSection from "./pricing/PricingSection"

// FAQ
import FAQSection from "./faq/FAQSection"

// Stats
import StatsSection from "./stats/StatsSection"

// Team
import TeamSection from "./team/TeamSection"

// Newsletter
import NewsletterSection from "./newsletter/NewsletterSection"

// Testimonials
import TestimonialsSection from "./testimonials-section"

// CTA
import CTASection from "./cta-section"

// Higher-order component to safely render components
const withSafeRendering = (Component: React.ComponentType<any>) => {
    return function SafeComponent(props: any) {
        // Create a new object without the className property
        const { className, ...rest } = props || {}

        // Ensure menu items have valid hrefs if this is a header component
        if (rest.menu && Array.isArray(rest.menu)) {
            rest.menu = rest.menu.map((item: any) => ({
                ...item,
                link: item.link || "#",
            }))
        }

        // Ensure logo is a string
        if (rest.logo === undefined || rest.logo === null) {
            rest.logo = ""
        }

        // Ensure title is a string
        if (rest.title === undefined) rest.title = ""

        // Ensure subtitle is a string
        if (rest.subtitle === undefined) rest.subtitle = ""

        // Ensure description is a string
        if (rest.description === undefined) rest.description = ""

        // Render the component with sanitized props
        return <Component {...rest} />
    }
}

// Create a component map with safe wrappers
export const componentMap = {
    [COMPONENT_TYPES.HEADER]: {
        creative: withSafeRendering(CreativeHeader),
        corporate: withSafeRendering(CorporateHeader),
        minimal: withSafeRendering(MinimalHeader),
        ecommerce: withSafeRendering(EcommerceHeader),
        education: withSafeRendering(EducationHeader),
        saas: withSafeRendering(SaaSHeader),
        default: withSafeRendering(CreativeHeader),
    },
    [COMPONENT_TYPES.HERO]: {
        standard: withSafeRendering(StandardHero),
        split: withSafeRendering(SplitHero),
        video: withSafeRendering(VideoHero),
        default: withSafeRendering(StandardHero),
    },
    [COMPONENT_TYPES.FEATURES]: {
        default: withSafeRendering(GridFeatures),
    },
    pricing: {
        default: withSafeRendering(PricingSection),
    },
    faq: {
        default: withSafeRendering(FAQSection),
    },
    stats: {
        default: withSafeRendering(StatsSection),
    },
    team: {
        default: withSafeRendering(TeamSection),
    },
    newsletter: {
        default: withSafeRendering(NewsletterSection),
    },
    testimonials: {
        default: withSafeRendering(TestimonialsSection),
    },
    cta: {
        default: withSafeRendering(CTASection),
    },
}
