import type React from "react"
// Import from the new system structure
import { MinimalistHeader, CorporateHeader, CreativeHeader } from "@/components/system/headers"
import { MinimalistHero, CreativeHero } from "@/components/system/heroes"
import { MinimalistFeatures } from "@/components/system/features"
import { AboutSection } from "@/components/system/about"
import { AdvancedGallery } from "@/components/system/gallery"
import { AdvancedTestimonials } from "@/components/system/testimonials"
import { FAQSection } from "@/components/system/faq"
import { AdvancedTeam } from "@/components/system/team"
import { ContactSection } from "@/components/system/contact"
import { CTASection } from "@/components/system/cta"
import { ModernFooter, CreativeFooter } from "@/components/system/footers"
import { AdvancedPricing } from "@/components/system/pricing"
import { BlogSection } from "@/components/system/blog"
import { StatsSection } from "@/components/system/stats"
import { ServicesSection } from "@/components/system/services"
import { NewsletterSection } from "@/components/system/newsletter"

// Industry-specific components
import { MenuSection } from "@/components/system/industry/restaurant"
import { PropertyListingSection } from "@/components/system/industry/realestate"

export interface ComponentInfo {
    name: string
    component: React.ComponentType<any>
    category: "header" | "hero" | "content" | "footer" | "industry"
    style: "minimalist" | "corporate" | "creative" | "standard"
    description: string
    props: Record<string, any>
}

export const componentRegistry: ComponentInfo[] = [
    // Headers
    {
        name: "MinimalistHeader",
        component: MinimalistHeader,
        category: "header",
        style: "minimalist",
        description: "Clean, minimal header with light typography",
        props: {},
    },
    {
        name: "CorporateHeader",
        component: CorporateHeader,
        category: "header",
        style: "corporate",
        description: "Professional header with contact info and dropdowns",
        props: {},
    },
    {
        name: "CreativeHeader",
        component: CreativeHeader,
        category: "header",
        style: "creative",
        description: "Bold header with gradients and animations",
        props: {},
    },

    // Heroes
    {
        name: "MinimalistHero",
        component: MinimalistHero,
        category: "hero",
        style: "minimalist",
        description: "Clean hero section with typography focus",
        props: {},
    },
    {
        name: "CreativeHero",
        component: CreativeHero,
        category: "hero",
        style: "creative",
        description: "Dynamic hero with gradients and animations",
        props: {},
    },

    // Content Sections
    {
        name: "MinimalistFeatures",
        component: MinimalistFeatures,
        category: "content",
        style: "minimalist",
        description: "Clean features grid with icons",
        props: {},
    },
    {
        name: "AboutSection",
        component: AboutSection,
        category: "content",
        style: "standard",
        description: "Company about section with story and features",
        props: {},
    },
    {
        name: "AdvancedGallery",
        component: AdvancedGallery,
        category: "content",
        style: "standard",
        description: "Image gallery with hover effects",
        props: {},
    },
    {
        name: "AdvancedTestimonials",
        component: AdvancedTestimonials,
        category: "content",
        style: "standard",
        description: "Customer testimonials with ratings",
        props: {},
    },
    {
        name: "FAQSection",
        component: FAQSection,
        category: "content",
        style: "standard",
        description: "Expandable FAQ accordion",
        props: {},
    },
    {
        name: "AdvancedTeam",
        component: AdvancedTeam,
        category: "content",
        style: "standard",
        description: "Team member profiles",
        props: {},
    },
    {
        name: "ContactSection",
        component: ContactSection,
        category: "content",
        style: "standard",
        description: "Contact information with icons",
        props: {},
    },
    {
        name: "CTASection",
        component: CTASection,
        category: "content",
        style: "standard",
        description: "Call-to-action section",
        props: {},
    },
    {
        name: "AdvancedPricing",
        component: AdvancedPricing,
        category: "content",
        style: "standard",
        description: "Pricing tables with features",
        props: {},
    },
    {
        name: "BlogSection",
        component: BlogSection,
        category: "content",
        style: "standard",
        description: "Blog posts grid",
        props: {},
    },
    {
        name: "StatsSection",
        component: StatsSection,
        category: "content",
        style: "standard",
        description: "Statistics with counters",
        props: {},
    },
    {
        name: "ServicesSection",
        component: ServicesSection,
        category: "content",
        style: "standard",
        description: "Services grid with descriptions",
        props: {},
    },
    {
        name: "NewsletterSection",
        component: NewsletterSection,
        category: "content",
        style: "standard",
        description: "Newsletter signup form",
        props: {},
    },

    // Industry Components
    {
        name: "MenuSection",
        component: MenuSection,
        category: "industry",
        style: "standard",
        description: "Restaurant menu with categories",
        props: {},
    },
    {
        name: "PropertyListingSection",
        component: PropertyListingSection,
        category: "industry",
        style: "standard",
        description: "Real estate property listings",
        props: {},
    },

    // Footers
    {
        name: "ModernFooter",
        component: ModernFooter,
        category: "footer",
        style: "standard",
        description: "Modern footer with links and social media",
        props: {},
    },
    {
        name: "CreativeFooter",
        component: CreativeFooter,
        category: "footer",
        style: "creative",
        description: "Creative footer with gradients",
        props: {},
    },
]

export function getComponentByName(name: string): ComponentInfo | undefined {
    return componentRegistry.find((comp) => comp.name === name)
}

export function getComponentsByCategory(category: ComponentInfo["category"]): ComponentInfo[] {
    return componentRegistry.filter((comp) => comp.category === category)
}

export function getComponentsByStyle(style: ComponentInfo["style"]): ComponentInfo[] {
    return componentRegistry.filter((comp) => comp.style === style)
}

export const componentMap = componentRegistry.reduce(
    (map, comp) => {
        map[comp.name] = comp.component
        return map
    },
    {} as Record<string, React.ComponentType<any>>,
)
