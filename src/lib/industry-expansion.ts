// Industry Expansion - Add new industries to your existing structure
export interface IndustryExpansion {
    name: string
    displayName: string
    description: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    components: string[]
    sections: {
        required: string[]
        optional: string[]
        industrySpecific: string[]
    }
    images: {
        hero: string[]
        gallery: string[]
        services: string[]
        team: string[]
    }
    content: {
        heroTitles: string[]
        taglines: string[]
        services: any[]
        features: any[]
        testimonials: any[]
    }
}

export const EXPANDED_INDUSTRIES: Record<string, IndustryExpansion> = {
    // AUTOMOTIVE INDUSTRY
    automotive: {
        name: "automotive",
        displayName: "Automotive & Transportation",
        description: "Car dealerships, auto repair, transportation services",
        primaryColor: "#dc2626",
        secondaryColor: "#fef2f2",
        accentColor: "#991b1b",
        components: [
            "Header",
            "BusinessHero",
            "VehicleInventory",
            "ServicesSection",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "VehicleInventory", "ContactSection", "Footer"],
            optional: ["ServicesSection", "TestimonialsSection", "AboutSection"],
            industrySpecific: ["VehicleInventory", "ServiceScheduler", "FinancingCalculator"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: [
                "Your Trusted Automotive Partner",
                "Quality Vehicles, Exceptional Service",
                "Drive Your Dreams Home Today",
            ],
            taglines: ["Where quality meets reliability", "Your journey starts here", "Excellence in automotive service"],
            services: [
                {
                    title: "Vehicle Sales",
                    description: "Wide selection of new and pre-owned vehicles",
                    price: "Competitive Pricing",
                    features: ["Financing Available", "Trade-In Accepted", "Warranty Included"],
                    icon: "🚗",
                },
            ],
            features: [
                {
                    title: "Certified Technicians",
                    description: "ASE-certified mechanics with years of experience",
                    icon: "🔧",
                    benefit: "Expert service",
                },
            ],
            testimonials: [
                {
                    name: "John Smith",
                    role: "Customer",
                    company: "",
                    content: "Outstanding service and great selection of vehicles. Highly recommended!",
                    rating: 5,
                },
            ],
        },
    },

    // TRAVEL INDUSTRY
    travel: {
        name: "travel",
        displayName: "Travel & Tourism",
        description: "Travel agencies, tour operators, hospitality services",
        primaryColor: "#0891b2",
        secondaryColor: "#ecfeff",
        accentColor: "#0e7490",
        components: [
            "Header",
            "BusinessHero",
            "TravelPackages",
            "DestinationGallery",
            "TestimonialsSection",
            "BookingSystem",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "TravelPackages", "BookingSystem", "Footer"],
            optional: ["DestinationGallery", "TestimonialsSection", "AboutSection"],
            industrySpecific: ["TravelPackages", "DestinationGallery", "TravelItinerary"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: ["Discover Amazing Destinations", "Your Adventure Awaits", "Create Unforgettable Memories"],
            taglines: ["Explore the world with us", "Adventure is calling", "Travel beyond imagination"],
            services: [
                {
                    title: "Vacation Packages",
                    description: "All-inclusive vacation packages to exotic destinations",
                    price: "From $999",
                    features: ["Flights Included", "Hotel Accommodation", "Local Tours", "24/7 Support"],
                    icon: "✈️",
                },
            ],
            features: [
                {
                    title: "Expert Travel Guides",
                    description: "Local experts who know the best hidden gems",
                    icon: "🗺️",
                    benefit: "Authentic experiences",
                },
            ],
            testimonials: [
                {
                    name: "Sarah Johnson",
                    role: "Traveler",
                    company: "",
                    content: "Amazing trip! Everything was perfectly organized and the destinations were breathtaking.",
                    rating: 5,
                },
            ],
        },
    },

    // NONPROFIT INDUSTRY
    nonprofit: {
        name: "nonprofit",
        displayName: "Nonprofit & Charity",
        description: "Charitable organizations, foundations, social causes",
        primaryColor: "#059669",
        secondaryColor: "#ecfdf5",
        accentColor: "#047857",
        components: [
            "Header",
            "BusinessHero",
            "CauseSection",
            "ImpactStats",
            "DonationForm",
            "VolunteerSection",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "CauseSection", "DonationForm", "Footer"],
            optional: ["ImpactStats", "VolunteerSection", "TestimonialsSection"],
            industrySpecific: ["DonationForm", "VolunteerSection", "ImpactStats"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: ["Making a Difference Together", "Hope for a Better Tomorrow", "Join Our Mission of Change"],
            taglines: ["Every donation counts", "Together we can change the world", "Hope through action"],
            services: [
                {
                    title: "Community Outreach",
                    description: "Direct support to families and individuals in need",
                    price: "Donation-based",
                    features: ["Food Distribution", "Educational Support", "Healthcare Access", "Emergency Aid"],
                    icon: "🤝",
                },
            ],
            features: [
                {
                    title: "Transparent Impact",
                    description: "See exactly how your donations make a difference",
                    icon: "📊",
                    benefit: "Trust and accountability",
                },
            ],
            testimonials: [
                {
                    name: "Maria Garcia",
                    role: "Volunteer",
                    company: "",
                    content: "Being part of this organization has been incredibly rewarding. We're truly making a difference.",
                    rating: 5,
                },
            ],
        },
    },

    // ENTERTAINMENT INDUSTRY
    entertainment: {
        name: "entertainment",
        displayName: "Entertainment & Media",
        description: "Entertainment companies, media production, event management",
        primaryColor: "#7c3aed",
        secondaryColor: "#f3f4f6",
        accentColor: "#5b21b6",
        components: [
            "Header",
            "BusinessHero",
            "ShowcaseGallery",
            "EventsSection",
            "ArtistProfiles",
            "TicketingSystem",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ShowcaseGallery", "EventsSection", "Footer"],
            optional: ["ArtistProfiles", "TicketingSystem", "TestimonialsSection"],
            industrySpecific: ["ShowcaseGallery", "ArtistProfiles", "TicketingSystem"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: ["Entertainment That Inspires", "Creating Unforgettable Experiences", "Where Stories Come to Life"],
            taglines: ["Entertainment redefined", "Stories that move you", "Experience the extraordinary"],
            services: [
                {
                    title: "Event Production",
                    description: "Full-service event production and management",
                    price: "Custom Quote",
                    features: ["Venue Management", "Technical Production", "Artist Booking", "Marketing"],
                    icon: "🎭",
                },
            ],
            features: [
                {
                    title: "Creative Excellence",
                    description: "Award-winning creative team with industry expertise",
                    icon: "🏆",
                    benefit: "Outstanding productions",
                },
            ],
            testimonials: [
                {
                    name: "David Wilson",
                    role: "Event Organizer",
                    company: "",
                    content: "Their production quality is exceptional. Every event is a masterpiece.",
                    rating: 5,
                },
            ],
        },
    },

    // MANUFACTURING INDUSTRY
    manufacturing: {
        name: "manufacturing",
        displayName: "Manufacturing & Industrial",
        description: "Manufacturing companies, industrial services, B2B solutions",
        primaryColor: "#1f2937",
        secondaryColor: "#f9fafb",
        accentColor: "#374151",
        components: [
            "Header",
            "BusinessHero",
            "ProductCatalog",
            "ManufacturingProcess",
            "QualityAssurance",
            "ClientTestimonials",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ProductCatalog", "ManufacturingProcess", "Footer"],
            optional: ["QualityAssurance", "ClientTestimonials", "AboutSection"],
            industrySpecific: ["ProductCatalog", "ManufacturingProcess", "QualityAssurance"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: ["Precision Manufacturing Solutions", "Quality You Can Trust", "Industrial Excellence Since 1985"],
            taglines: ["Precision in every product", "Manufacturing excellence", "Built to last"],
            services: [
                {
                    title: "Custom Manufacturing",
                    description: "Precision manufacturing to your exact specifications",
                    price: "Quote on Request",
                    features: ["CAD Design", "Prototyping", "Quality Testing", "Bulk Production"],
                    icon: "⚙️",
                },
            ],
            features: [
                {
                    title: "ISO Certified",
                    description: "ISO 9001:2015 certified quality management system",
                    icon: "🏅",
                    benefit: "Guaranteed quality",
                },
            ],
            testimonials: [
                {
                    name: "Robert Chen",
                    role: "Procurement Manager",
                    company: "TechCorp Industries",
                    content: "Outstanding quality and reliability. They consistently exceed our expectations.",
                    rating: 5,
                },
            ],
        },
    },

    // AGRICULTURE INDUSTRY
    agriculture: {
        name: "agriculture",
        displayName: "Agriculture & Farming",
        description: "Farms, agricultural services, sustainable farming solutions",
        primaryColor: "#059669",
        secondaryColor: "#ecfdf5",
        accentColor: "#047857",
        components: [
            "Header",
            "BusinessHero",
            "ProductShowcase",
            "SustainabilitySection",
            "FarmingProcess",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ProductShowcase", "ContactSection", "Footer"],
            optional: ["SustainabilitySection", "FarmingProcess", "TestimonialsSection"],
            industrySpecific: ["ProductShowcase", "SustainabilitySection", "FarmingProcess"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            ],
            services: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop"],
            team: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"],
        },
        content: {
            heroTitles: ["Sustainable Farming Solutions", "Fresh from Farm to Table", "Growing Tomorrow's Harvest Today"],
            taglines: ["Naturally grown, sustainably harvested", "From our farm to your table", "Cultivating quality"],
            services: [
                {
                    title: "Organic Produce",
                    description: "Fresh, organic fruits and vegetables grown sustainably",
                    price: "Seasonal Pricing",
                    features: ["Certified Organic", "Locally Grown", "Seasonal Variety", "Farm Fresh"],
                    icon: "🌱",
                },
            ],
            features: [
                {
                    title: "Sustainable Practices",
                    description: "Environmentally responsible farming methods",
                    icon: "🌍",
                    benefit: "Eco-friendly production",
                },
            ],
            testimonials: [
                {
                    name: "Lisa Martinez",
                    role: "Restaurant Owner",
                    company: "Farm Table Bistro",
                    content: "The quality and freshness of their produce is unmatched. Our customers love it!",
                    rating: 5,
                },
            ],
        },
    },
}

// Function to get all industries (existing + new)
export function getAllIndustries(): string[] {
    return [
        // Your existing industries
        "restaurant",
        "technology",
        "healthcare",
        "education",
        "ecommerce",
        "realestate",
        "legal",
        "finance",
        "fitness",
        "spa",
        // New expanded industries
        ...Object.keys(EXPANDED_INDUSTRIES),
    ]
}

// Function to get industry configuration
export function getIndustryConfig(industry: string): IndustryExpansion | null {
    return EXPANDED_INDUSTRIES[industry] || null
}

// Function to get components for expanded industries
export function getExpandedIndustryComponents(industry: string): string[] {
    const config = getIndustryConfig(industry)
    return config ? config.components : []
}
