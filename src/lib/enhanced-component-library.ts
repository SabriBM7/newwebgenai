export interface ComponentVariant {
    name: string
    description: string
    props: Record<string, any>
    style: "modern" | "minimal" | "luxury" | "creative" | "corporate"
    industry: string[]
}

export const ENHANCED_COMPONENT_LIBRARY: Record<string, ComponentVariant[]> = {
    HeroSection: [
        {
            name: "GradientHero",
            description: "Modern hero with gradient background and animations",
            style: "modern",
            industry: ["technology", "startup", "creative"],
            props: {
                layout: "centered",
                background: "gradient",
                animations: true,
                video_background: false,
            },
        },
        {
            name: "VideoHero",
            description: "Hero with background video for restaurants/hospitality",
            style: "luxury",
            industry: ["restaurant", "hotel", "travel"],
            props: {
                layout: "overlay",
                background: "video",
                video_url: "required",
                overlay_opacity: 0.6,
            },
        },
        {
            name: "SplitHero",
            description: "Split layout with image and content",
            style: "minimal",
            industry: ["consulting", "professional", "healthcare"],
            props: {
                layout: "split",
                image_position: "right",
                content_alignment: "left",
            },
        },
        {
            name: "ProductHero",
            description: "Hero showcasing main product/service",
            style: "corporate",
            industry: ["ecommerce", "saas", "manufacturing"],
            props: {
                layout: "product_focused",
                product_showcase: true,
                feature_highlights: true,
            },
        },
    ],

    MenuSection: [
        {
            name: "InteractiveMenu",
            description: "Advanced menu with filtering and online ordering",
            style: "modern",
            industry: ["restaurant", "cafe", "catering"],
            props: {
                categories: true,
                filtering: true,
                search: true,
                online_ordering: true,
                dietary_filters: true,
                price_range_filter: true,
            },
        },
        {
            name: "ElegantMenu",
            description: "Luxury menu design for fine dining",
            style: "luxury",
            industry: ["restaurant", "hotel"],
            props: {
                layout: "elegant",
                wine_pairing: true,
                chef_recommendations: true,
                seasonal_items: true,
            },
        },
    ],

    ServicesSection: [
        {
            name: "ServiceGrid",
            description: "Grid layout for service offerings",
            style: "modern",
            industry: ["consulting", "agency", "professional"],
            props: {
                layout: "grid",
                service_details: true,
                pricing: true,
                booking_integration: true,
            },
        },
        {
            name: "ProcessFlow",
            description: "Step-by-step service process",
            style: "minimal",
            industry: ["consulting", "healthcare", "legal"],
            props: {
                layout: "timeline",
                step_details: true,
                estimated_duration: true,
            },
        },
    ],

    PortfolioSection: [
        {
            name: "MasonryPortfolio",
            description: "Pinterest-style portfolio grid",
            style: "creative",
            industry: ["creative", "photography", "design"],
            props: {
                layout: "masonry",
                lightbox: true,
                categories: true,
                project_details: true,
            },
        },
        {
            name: "CaseStudyPortfolio",
            description: "Detailed case studies with results",
            style: "corporate",
            industry: ["consulting", "agency", "technology"],
            props: {
                layout: "case_studies",
                results_metrics: true,
                client_testimonials: true,
                project_timeline: true,
            },
        },
    ],

    BookingSection: [
        {
            name: "CalendarBooking",
            description: "Interactive calendar for appointments",
            style: "modern",
            industry: ["healthcare", "consulting", "beauty"],
            props: {
                calendar_integration: true,
                time_slots: true,
                service_selection: true,
                payment_integration: true,
            },
        },
        {
            name: "TableReservation",
            description: "Restaurant table booking system",
            style: "luxury",
            industry: ["restaurant", "hotel"],
            props: {
                table_selection: true,
                party_size: true,
                special_requests: true,
                confirmation_system: true,
            },
        },
    ],
}

export function getOptimalComponents(industry: string, style: string): ComponentVariant[] {
    const components: ComponentVariant[] = []

    Object.entries(ENHANCED_COMPONENT_LIBRARY).forEach(([componentType, variants]) => {
        // Find the best variant for this industry and style
        const bestVariant =
            variants.find((variant) => variant.industry.includes(industry) && variant.style === style) ||
            variants.find((variant) => variant.industry.includes(industry)) ||
            variants[0]

        if (bestVariant) {
            components.push(bestVariant)
        }
    })

    return components
}
