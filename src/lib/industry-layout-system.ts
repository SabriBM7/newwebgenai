export interface IndustryLayoutTemplate {
    name: string
    displayName: string
    sections: LayoutSection[]
    emphasis: string[] // Sections that should be visually prominent
    optional: string[] // Sections that can be omitted for simpler layouts
    variations: LayoutVariation[]
}

export interface LayoutSection {
    type: string
    size: "small" | "medium" | "large" | "hero"
    prominence: "primary" | "secondary" | "tertiary"
    required: boolean
}

export interface LayoutVariation {
    name: string
    description: string
    sections: LayoutSection[]
    targetAudience: string
}

export const INDUSTRY_LAYOUTS: Record<string, IndustryLayoutTemplate> = {
    restaurant: {
        name: "restaurant",
        displayName: "Restaurant & Food Service",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "MenuSection", size: "large", prominence: "primary", required: true },
            { type: "GallerySection", size: "large", prominence: "primary", required: false },
            { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
            { type: "EventsSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["MenuSection", "GallerySection", "EventsSection"],
        optional: ["StatsSection", "FAQSection", "TeamSection"],
        variations: [
            {
                name: "fine-dining",
                description: "Elegant fine dining restaurant",
                targetAudience: "upscale diners",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "MenuSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "casual-dining",
                description: "Family-friendly casual restaurant",
                targetAudience: "families and casual diners",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "MenuSection", size: "large", prominence: "primary", required: true },
                    { type: "GallerySection", size: "large", prominence: "primary", required: true },
                    { type: "EventsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "fast-casual",
                description: "Quick service with quality food",
                targetAudience: "busy professionals and students",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "MenuSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "medium", prominence: "secondary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    technology: {
        name: "technology",
        displayName: "Technology & Software",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ServicesSection", size: "large", prominence: "primary", required: true },
            { type: "PortfolioSection", size: "large", prominence: "primary", required: true },
            { type: "ProcessSection", size: "medium", prominence: "secondary", required: false },
            { type: "TeamSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ServicesSection", "PortfolioSection", "ProcessSection"],
        optional: ["AboutSection", "StatsSection", "FAQSection"],
        variations: [
            {
                name: "software-agency",
                description: "Custom software development agency",
                targetAudience: "businesses needing custom software",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "ProcessSection", size: "large", prominence: "primary", required: true },
                    { type: "PortfolioSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "saas-product",
                description: "Software as a Service product",
                targetAudience: "potential SaaS customers",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ValueProposition", size: "large", prominence: "primary", required: true },
                    { type: "FeaturesSection", size: "large", prominence: "primary", required: true },
                    { type: "PricingSection", size: "large", prominence: "primary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "FAQSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "tech-startup",
                description: "Early-stage technology startup",
                targetAudience: "investors and early adopters",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ValueProposition", size: "large", prominence: "primary", required: true },
                    { type: "AboutSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TeamSection", size: "large", prominence: "primary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    healthcare: {
        name: "healthcare",
        displayName: "Healthcare & Medical",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ServicesSection", size: "large", prominence: "primary", required: true },
            { type: "BookingSystem", size: "large", prominence: "primary", required: true },
            { type: "TeamSection", size: "large", prominence: "primary", required: true },
            { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ServicesSection", "BookingSystem", "TeamSection"],
        optional: ["StatsSection", "FAQSection", "GallerySection"],
        variations: [
            {
                name: "medical-practice",
                description: "General medical practice",
                targetAudience: "patients seeking primary care",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "large", prominence: "primary", required: true },
                    { type: "BookingSystem", size: "medium", prominence: "primary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "specialist-clinic",
                description: "Specialized medical clinic",
                targetAudience: "patients needing specialized care",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "large", prominence: "primary", required: true },
                    { type: "ProcessSection", size: "medium", prominence: "secondary", required: false },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "BookingSystem", size: "medium", prominence: "primary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    ecommerce: {
        name: "ecommerce",
        displayName: "E-commerce & Retail",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ProductGrid", size: "large", prominence: "primary", required: true },
            { type: "ValueProposition", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "NewsletterSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ProductGrid", "ValueProposition"],
        optional: ["AboutSection", "StatsSection", "FAQSection", "TeamSection"],
        variations: [
            {
                name: "fashion-store",
                description: "Fashion and apparel store",
                targetAudience: "fashion-conscious shoppers",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ProductGrid", size: "large", prominence: "primary", required: true },
                    { type: "GallerySection", size: "large", prominence: "primary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "NewsletterSection", size: "medium", prominence: "secondary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "electronics-store",
                description: "Electronics and gadgets store",
                targetAudience: "tech enthusiasts",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ProductGrid", size: "large", prominence: "primary", required: true },
                    { type: "FeaturesSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "FAQSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    education: {
        name: "education",
        displayName: "Education & Training",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "CourseGrid", size: "large", prominence: "primary", required: true },
            { type: "FacultyProfiles", size: "large", prominence: "primary", required: true },
            { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
            { type: "EventsSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["CourseGrid", "FacultyProfiles", "EventsSection"],
        optional: ["StatsSection", "FAQSection", "GallerySection"],
        variations: [
            {
                name: "university",
                description: "University or college",
                targetAudience: "prospective students and parents",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "CourseGrid", size: "large", prominence: "primary", required: true },
                    { type: "FacultyProfiles", size: "large", prominence: "primary", required: true },
                    { type: "StatsSection", size: "medium", prominence: "secondary", required: true },
                    { type: "EventsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "training-center",
                description: "Professional training center",
                targetAudience: "working professionals",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "CourseGrid", size: "large", prominence: "primary", required: true },
                    { type: "ValueProposition", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    realestate: {
        name: "realestate",
        displayName: "Real Estate",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "PropertyListingSection", size: "large", prominence: "primary", required: true },
            { type: "ServicesSection", size: "medium", prominence: "secondary", required: true },
            { type: "TeamSection", size: "large", prominence: "primary", required: true },
            { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["PropertyListingSection", "TeamSection", "ServicesSection"],
        optional: ["StatsSection", "FAQSection", "GallerySection"],
        variations: [
            {
                name: "residential-agency",
                description: "Residential real estate agency",
                targetAudience: "home buyers and sellers",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "PropertyListingSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TeamSection", size: "large", prominence: "primary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "commercial-realestate",
                description: "Commercial real estate services",
                targetAudience: "business owners and investors",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "PropertyListingSection", size: "large", prominence: "primary", required: true },
                    { type: "AboutSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TeamSection", size: "medium", prominence: "secondary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    fitness: {
        name: "fitness",
        displayName: "Fitness & Wellness",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ServicesSection", size: "large", prominence: "primary", required: true },
            { type: "GallerySection", size: "large", prominence: "primary", required: true },
            { type: "TeamSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ServicesSection", "GallerySection", "TeamSection"],
        optional: ["AboutSection", "StatsSection", "FAQSection"],
        variations: [
            {
                name: "gym",
                description: "Traditional fitness gym",
                targetAudience: "fitness enthusiasts",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "GallerySection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "medium", prominence: "secondary", required: true },
                    { type: "PricingSection", size: "medium", prominence: "secondary", required: true },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
            {
                name: "wellness-center",
                description: "Holistic wellness center",
                targetAudience: "health-conscious individuals",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    legal: {
        name: "legal",
        displayName: "Legal Services",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ServicesSection", size: "large", prominence: "primary", required: true },
            { type: "TeamSection", size: "large", prominence: "primary", required: true },
            { type: "AboutSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ServicesSection", "TeamSection"],
        optional: ["StatsSection", "FAQSection", "GallerySection"],
        variations: [
            {
                name: "law-firm",
                description: "Traditional law firm",
                targetAudience: "clients needing legal representation",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "TeamSection", size: "large", prominence: "primary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },

    finance: {
        name: "finance",
        displayName: "Financial Services",
        sections: [
            { type: "Header", size: "small", prominence: "primary", required: true },
            { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
            { type: "ServicesSection", size: "large", prominence: "primary", required: true },
            { type: "ServicePackages", size: "large", prominence: "primary", required: true },
            { type: "CalculatorTools", size: "medium", prominence: "secondary", required: false },
            { type: "TeamSection", size: "medium", prominence: "secondary", required: false },
            { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
            { type: "ContactSection", size: "medium", prominence: "primary", required: true },
            { type: "Footer", size: "small", prominence: "tertiary", required: true },
        ],
        emphasis: ["ServicesSection", "ServicePackages", "CalculatorTools"],
        optional: ["AboutSection", "StatsSection", "FAQSection"],
        variations: [
            {
                name: "financial-advisor",
                description: "Personal financial advisory",
                targetAudience: "individuals seeking financial planning",
                sections: [
                    { type: "Header", size: "small", prominence: "primary", required: true },
                    { type: "BusinessHero", size: "hero", prominence: "primary", required: true },
                    { type: "AboutSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicesSection", size: "large", prominence: "primary", required: true },
                    { type: "ServicePackages", size: "medium", prominence: "secondary", required: true },
                    { type: "TestimonialsSection", size: "medium", prominence: "secondary", required: false },
                    { type: "ContactSection", size: "medium", prominence: "primary", required: true },
                    { type: "Footer", size: "small", prominence: "tertiary", required: true },
                ],
            },
        ],
    },
}

export function getIndustryLayout(industry: string, variation?: string): IndustryLayoutTemplate {
    const layout = INDUSTRY_LAYOUTS[industry] || INDUSTRY_LAYOUTS.technology

    if (variation) {
        const selectedVariation = layout.variations.find((v) => v.name === variation)
        if (selectedVariation) {
            return {
                ...layout,
                sections: selectedVariation.sections,
            }
        }
    }

    return layout
}

export function getLayoutVariations(industry: string): LayoutVariation[] {
    const layout = INDUSTRY_LAYOUTS[industry]
    return layout?.variations || []
}

export function getAllIndustryLayouts(): IndustryLayoutTemplate[] {
    return Object.values(INDUSTRY_LAYOUTS)
}
