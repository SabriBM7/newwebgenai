// src/components/ComponentFactory.tsx
"use client"

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

export default function ComponentFactory({
                                             component,
                                             variant,
                                             props,
                                         }: {
    component: string
    variant: string
    props: any
}) {
    switch (component) {
        case COMPONENT_TYPES.HEADER:
            switch (variant) {
                case "creative":
                    return <CreativeHeader {...props} />
                case "corporate":
                    return <CorporateHeader {...props} />
                case "minimal":
                    return <MinimalHeader {...props} />
                case "ecommerce":
                    return <EcommerceHeader {...props} />
                case "education":
                    return <EducationHeader {...props} />
                case "saas":
                    return <SaaSHeader {...props} />
                default:
                    return <CreativeHeader {...props} />
            }
        case COMPONENT_TYPES.HERO:
            switch (variant) {
                case "standard":
                    return <StandardHero {...props} />
                case "split":
                    return <SplitHero {...props} />
                case "video":
                    return <VideoHero {...props} />
                default:
                    return <StandardHero {...props} />
            }
        case COMPONENT_TYPES.FEATURES:
            return <GridFeatures {...props} />
        case "pricing":
            return <PricingSection {...props} />
        case "faq":
            return <FAQSection {...props} />
        case "stats":
            return <StatsSection {...props} />
        case "team":
            return <TeamSection {...props} />
        case "newsletter":
            return <NewsletterSection {...props} />
        case "testimonials":
            return <TestimonialsSection {...props} />
        case "cta":
            return <CTASection {...props} />
        default:
            return null
    }
}
