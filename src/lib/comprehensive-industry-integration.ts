export interface ComprehensiveIndustryConfig {
    name: string
    displayName: string
    description: string
    tier: "basic" | "standard" | "premium" | "enterprise"
    colors: {
        primary: string
        secondary: string
        accent: string
    }
    components: {
        required: string[]
        optional: string[]
        advanced: string[]
        industrySpecific: string[]
    }
    features: string[]
    targetAudience: string[]
    businessGoals: string[]
}

// Merge your existing industries with expanded ones
export const COMPREHENSIVE_INDUSTRIES: Record<string, ComprehensiveIndustryConfig> = {
    // YOUR EXISTING INDUSTRIES (enhanced)
    restaurant: {
        name: "restaurant",
        displayName: "Restaurant & Food Service",
        description: "Restaurants, cafes, catering, and food service businesses",
        tier: "standard",
        colors: {
            primary: "#dc2626",
            secondary: "#fef2f2",
            accent: "#991b1b",
        },
        components: {
            required: ["MinimalistHeader", "BusinessHero", "MenuSection", "ContactSection", "ModernFooter"],
            optional: ["AboutSection", "GallerySection", "TestimonialsSection", "FAQSection"],
            advanced: ["OnlineOrderingSystem", "TableReservationSystem", "MenuBuilder"],
            industrySpecific: ["MenuSection", "EventsSection", "RestaurantGallery"],
        },
        features: ["Online Ordering", "Reservations", "Menu Management", "Event Hosting"],
        targetAudience: ["Food Lovers", "Local Diners", "Event Planners", "Tourists"],
        businessGoals: ["Increase Reservations", "Online Ordering", "Brand Awareness", "Customer Loyalty"],
    },

    technology: {
        name: "technology",
        displayName: "Technology & Software",
        description: "Software development, IT services, and technology consulting",
        tier: "premium",
        colors: {
            primary: "#2563eb",
            secondary: "#eff6ff",
            accent: "#1d4ed8",
        },
        components: {
            required: ["CorporateHeader", "GradientHero", "TechServices", "TechPortfolio", "ContactSection", "ModernFooter"],
            optional: ["TechTeam", "TechTestimonials", "TechStats", "TechPricing"],
            advanced: ["APIDocumentation", "TechStackShowcase", "CodePlayground"],
            industrySpecific: ["TechPortfolio", "TechProcess", "TechServices", "TechTeam"],
        },
        features: ["Portfolio Showcase", "Technical Documentation", "Team Profiles", "Case Studies"],
        targetAudience: ["Businesses", "Startups", "Enterprises", "Developers"],
        businessGoals: ["Lead Generation", "Portfolio Showcase", "Technical Authority", "Client Acquisition"],
    },

    healthcare: {
        name: "healthcare",
        displayName: "Healthcare & Medical",
        description: "Medical practices, clinics, hospitals, and healthcare services",
        tier: "premium",
        colors: {
            primary: "#059669",
            secondary: "#ecfdf5",
            accent: "#047857",
        },
        components: {
            required: ["CorporateHeader", "BusinessHero", "ServicesSection", "TeamSection", "ContactSection", "ModernFooter"],
            optional: ["AboutSection", "TestimonialsSection", "FAQSection", "StatsSection"],
            advanced: ["AppointmentScheduler", "SymptomChecker", "TelehealthPortal"],
            industrySpecific: ["BookingSystem", "HealthcareTeam", "MedicalServices"],
        },
        features: ["Appointment Booking", "Patient Portal", "Telehealth", "Medical Records"],
        targetAudience: ["Patients", "Families", "Healthcare Seekers", "Insurance Providers"],
        businessGoals: ["Patient Acquisition", "Online Booking", "Trust Building", "Service Awareness"],
    },

    // NEW EXPANDED INDUSTRIES
    automotive: {
        name: "automotive",
        displayName: "Automotive & Transportation",
        description: "Car dealerships, auto repair, transportation services",
        tier: "standard",
        colors: {
            primary: "#dc2626",
            secondary: "#fef2f2",
            accent: "#991b1b",
        },
        components: {
            required: ["CorporateHeader", "BusinessHero", "VehicleInventory", "ContactSection", "ModernFooter"],
            optional: ["ServicesSection", "TestimonialsSection", "AboutSection", "StatsSection"],
            advanced: ["FinancingCalculator", "ServiceScheduler", "TradeInEvaluator"],
            industrySpecific: ["VehicleInventory", "ServiceScheduler", "FinancingCalculator"],
        },
        features: ["Vehicle Inventory", "Financing Options", "Service Scheduling", "Trade-In Evaluation"],
        targetAudience: ["Car Buyers", "Vehicle Owners", "Fleet Managers", "Auto Enthusiasts"],
        businessGoals: ["Vehicle Sales", "Service Bookings", "Lead Generation", "Customer Retention"],
    },

    travel: {
        name: "travel",
        displayName: "Travel & Tourism",
        description: "Travel agencies, tour operators, hospitality services",
        tier: "premium",
        colors: {
            primary: "#0891b2",
            secondary: "#ecfeff",
            accent: "#0e7490",
        },
        components: {
            required: ["CreativeHeader", "VideoBackgroundHero", "TravelPackages", "BookingSystem", "ModernFooter"],
            optional: ["DestinationGallery", "TestimonialsSection", "AboutSection"],
            advanced: ["TravelItinerary", "VirtualTourViewer", "WeatherIntegration"],
            industrySpecific: ["TravelPackages", "DestinationGallery", "TravelItinerary"],
        },
        features: ["Package Booking", "Destination Guides", "Itinerary Planning", "Travel Insurance"],
        targetAudience: ["Travelers", "Adventure Seekers", "Families", "Business Travelers"],
        businessGoals: ["Booking Conversions", "Destination Promotion", "Customer Experience", "Repeat Bookings"],
    },

    nonprofit: {
        name: "nonprofit",
        displayName: "Nonprofit & Charity",
        description: "Charitable organizations, foundations, social causes",
        tier: "standard",
        colors: {
            primary: "#059669",
            secondary: "#ecfdf5",
            accent: "#047857",
        },
        components: {
            required: ["MinimalistHeader", "BusinessHero", "CauseSection", "DonationForm", "ModernFooter"],
            optional: ["ImpactStats", "VolunteerSection", "TestimonialsSection", "EventsSection"],
            advanced: ["VolunteerPortal", "ImpactTracker", "CampaignManager"],
            industrySpecific: ["DonationForm", "VolunteerSection", "ImpactStats"],
        },
        features: ["Online Donations", "Volunteer Management", "Impact Tracking", "Event Management"],
        targetAudience: ["Donors", "Volunteers", "Beneficiaries", "Community Members"],
        businessGoals: ["Fundraising", "Volunteer Recruitment", "Awareness", "Community Engagement"],
    },

    entertainment: {
        name: "entertainment",
        displayName: "Entertainment & Media",
        description: "Entertainment companies, media production, event management",
        tier: "premium",
        colors: {
            primary: "#7c3aed",
            secondary: "#f3f4f6",
            accent: "#5b21b6",
        },
        components: {
            required: ["CreativeHeader", "InteractiveHero", "ShowcaseGallery", "EventsSection", "ModernFooter"],
            optional: ["ArtistProfiles", "TicketingSystem", "TestimonialsSection"],
            advanced: ["LiveStreamingPortal", "FanEngagementHub", "MerchandiseStore"],
            industrySpecific: ["ShowcaseGallery", "ArtistProfiles", "TicketingSystem"],
        },
        features: ["Event Ticketing", "Artist Profiles", "Media Gallery", "Fan Engagement"],
        targetAudience: ["Fans", "Event Attendees", "Media", "Industry Professionals"],
        businessGoals: ["Ticket Sales", "Fan Engagement", "Brand Building", "Content Distribution"],
    },

    manufacturing: {
        name: "manufacturing",
        displayName: "Manufacturing & Industrial",
        description: "Manufacturing companies, industrial services, B2B solutions",
        tier: "enterprise",
        colors: {
            primary: "#1f2937",
            secondary: "#f9fafb",
            accent: "#374151",
        },
        components: {
            required: [
                "CorporateHeader",
                "BusinessHero",
                "ProductCatalog",
                "ManufacturingProcess",
                "ContactSection",
                "CorporateFooter",
            ],
            optional: ["QualityAssurance", "ClientTestimonials", "AboutSection", "StatsSection"],
            advanced: ["SupplyChainTracker", "QualityDashboard", "B2BPortal"],
            industrySpecific: ["ProductCatalog", "ManufacturingProcess", "QualityAssurance"],
        },
        features: ["Product Catalog", "Quality Assurance", "Supply Chain", "B2B Portal"],
        targetAudience: ["B2B Clients", "Procurement Managers", "Industry Partners", "Suppliers"],
        businessGoals: ["B2B Sales", "Quality Demonstration", "Partnership Building", "Process Transparency"],
    },

    agriculture: {
        name: "agriculture",
        displayName: "Agriculture & Farming",
        description: "Farms, agricultural services, sustainable farming solutions",
        tier: "standard",
        colors: {
            primary: "#059669",
            secondary: "#ecfdf5",
            accent: "#047857",
        },
        components: {
            required: ["MinimalistHeader", "BusinessHero", "ProductShowcase", "ContactSection", "ModernFooter"],
            optional: ["SustainabilitySection", "FarmingProcess", "TestimonialsSection"],
            advanced: ["CropTracker", "WeatherIntegration", "MarketPriceTracker"],
            industrySpecific: ["ProductShowcase", "SustainabilitySection", "FarmingProcess"],
        },
        features: ["Product Showcase", "Sustainability Info", "Farming Process", "Market Integration"],
        targetAudience: ["Consumers", "Restaurants", "Distributors", "Local Markets"],
        businessGoals: ["Product Sales", "Sustainability Awareness", "Direct-to-Consumer", "B2B Partnerships"],
    },
}

// Helper functions for comprehensive industry integration
export function getIndustryByTier(tier: string): ComprehensiveIndustryConfig[] {
    return Object.values(COMPREHENSIVE_INDUSTRIES).filter((industry) => industry.tier === tier)
}

export function getIndustryComponents(industryName: string, tier = "standard"): string[] {
    const industry = COMPREHENSIVE_INDUSTRIES[industryName]
    if (!industry) return []

    const tierComponents = {
        basic: [...industry.components.required],
        standard: [...industry.components.required, ...industry.components.optional.slice(0, 2)],
        premium: [
            ...industry.components.required,
            ...industry.components.optional,
            ...industry.components.advanced.slice(0, 2),
        ],
        enterprise: [
            ...industry.components.required,
            ...industry.components.optional,
            ...industry.components.advanced,
            ...industry.components.industrySpecific,
        ],
    }

    return tierComponents[tier as keyof typeof tierComponents] || tierComponents.standard
}

export function getAdvancedComponentsForIndustry(industryName: string): string[] {
    const industry = COMPREHENSIVE_INDUSTRIES[industryName]
    if (!industry) return []

    return [...industry.components.advanced, ...industry.components.industrySpecific]
}

export function getAllIndustryNames(): string[] {
    return Object.keys(COMPREHENSIVE_INDUSTRIES)
}

export function getIndustryConfig(industryName: string): ComprehensiveIndustryConfig | null {
    return COMPREHENSIVE_INDUSTRIES[industryName] || null
}

export function getIndustriesByBusinessGoal(goal: string): ComprehensiveIndustryConfig[] {
    return Object.values(COMPREHENSIVE_INDUSTRIES).filter((industry) =>
        industry.businessGoals.some((businessGoal) => businessGoal.toLowerCase().includes(goal.toLowerCase())),
    )
}

export function getIndustriesByAudience(audience: string): ComprehensiveIndustryConfig[] {
    return Object.values(COMPREHENSIVE_INDUSTRIES).filter((industry) =>
        industry.targetAudience.some((target) => target.toLowerCase().includes(audience.toLowerCase())),
    )
}
