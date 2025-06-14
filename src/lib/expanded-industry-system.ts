export interface ExpandedIndustryConfig {
    name: string
    displayName: string
    description: string
    category: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    preferredComponents: string[]
    requiredSections: string[]
    optionalSections: string[]
    industrySpecific: string[]
    contentTemplates: IndustryContentTemplates
    imageCategories: string[]
    targetAudience: string[]
    businessGoals: string[]
}

export interface IndustryContentTemplates {
    heroTitles: string[]
    taglines: string[]
    valuePropositions: string[]
    aboutTemplates: string[]
    serviceCategories: string[]
    ctaTexts: string[]
}

export const EXPANDED_INDUSTRIES: Record<string, ExpandedIndustryConfig> = {
    // TECHNOLOGY & SOFTWARE
    technology: {
        name: "technology",
        displayName: "Technology & Software",
        description: "Software development, IT services, and technology consulting",
        category: "technology",
        primaryColor: "#2563eb",
        secondaryColor: "#eff6ff",
        accentColor: "#1d4ed8",
        preferredComponents: ["ModernHeader", "GradientHero", "GridFeatures", "PortfolioShowcase", "TieredPricing"],
        requiredSections: ["header", "hero", "features", "portfolio", "contact"],
        optionalSections: ["about", "team", "testimonials", "pricing"],
        industrySpecific: ["PortfolioShowcase", "DataVisualization", "ChatBot"],
        contentTemplates: {
            heroTitles: [
                "Innovative Technology Solutions",
                "Building Tomorrow's Software Today",
                "Transform Your Business with Technology",
                "Custom Software Development Excellence",
            ],
            taglines: [
                "Innovation meets execution",
                "Code that drives business forward",
                "Technology solutions that scale",
                "Your vision, our expertise",
            ],
            valuePropositions: [
                "Cutting-edge technology stack",
                "Agile development methodology",
                "24/7 technical support",
                "Scalable cloud solutions",
            ],
            aboutTemplates: [
                "Leading technology company with expertise in modern software development",
                "Innovative team delivering custom solutions for businesses worldwide",
                "Technology partners focused on driving digital transformation",
            ],
            serviceCategories: ["Web Development", "Mobile Apps", "Cloud Solutions", "AI/ML", "DevOps"],
            ctaTexts: ["Get Quote", "Start Project", "Free Consultation", "View Portfolio"],
        },
        imageCategories: ["coding", "technology", "software", "computers", "innovation"],
        targetAudience: ["businesses", "startups", "enterprises", "entrepreneurs"],
        businessGoals: ["digital transformation", "efficiency", "scalability", "innovation"],
    },

    saas: {
        name: "saas",
        displayName: "SaaS & Software Products",
        description: "Software as a Service platforms and digital products",
        category: "technology",
        primaryColor: "#7c3aed",
        secondaryColor: "#f3f4f6",
        accentColor: "#5b21b6",
        preferredComponents: ["ModernHeader", "ProductHero", "InteractiveFeatures", "FreemiumPricing", "ChatBot"],
        requiredSections: ["header", "hero", "features", "pricing", "contact"],
        optionalSections: ["demo", "testimonials", "integrations"],
        industrySpecific: ["ProductHero", "FreemiumPricing", "DataVisualization"],
        contentTemplates: {
            heroTitles: [
                "The All-in-One Platform for Your Business",
                "Streamline Your Workflow with Our SaaS",
                "Powerful Software, Simple Solutions",
                "Transform Your Business Operations",
            ],
            taglines: [
                "Simplify. Automate. Scale.",
                "Work smarter, not harder",
                "Your business, optimized",
                "Efficiency redefined",
            ],
            valuePropositions: [
                "Cloud-based accessibility",
                "Real-time collaboration",
                "Advanced analytics",
                "Seamless integrations",
            ],
            aboutTemplates: [
                "Revolutionary SaaS platform designed to streamline business operations",
                "Cloud-based solution trusted by thousands of businesses worldwide",
            ],
            serviceCategories: ["Core Platform", "Integrations", "Analytics", "Support", "Training"],
            ctaTexts: ["Start Free Trial", "Get Demo", "Sign Up Free", "Request Access"],
        },
        imageCategories: ["dashboard", "analytics", "software", "productivity", "collaboration"],
        targetAudience: ["businesses", "teams", "professionals", "managers"],
        businessGoals: ["productivity", "automation", "collaboration", "growth"],
    },

    // BUSINESS & PROFESSIONAL
    consulting: {
        name: "consulting",
        displayName: "Consulting & Advisory",
        description: "Business consulting, strategy, and advisory services",
        category: "professional",
        primaryColor: "#1f2937",
        secondaryColor: "#f9fafb",
        accentColor: "#374151",
        preferredComponents: ["ClassicHeader", "SplitHero", "BenefitsFeatures", "ProcessServices", "CustomPricing"],
        requiredSections: ["header", "hero", "services", "about", "contact"],
        optionalSections: ["team", "case-studies", "testimonials"],
        industrySpecific: ["ProcessServices", "CustomPricing", "DataVisualization"],
        contentTemplates: {
            heroTitles: [
                "Strategic Consulting for Business Growth",
                "Expert Advisory Services",
                "Transform Your Business Strategy",
                "Consulting Excellence, Proven Results",
            ],
            taglines: [
                "Strategy. Execution. Results.",
                "Your success is our expertise",
                "Strategic thinking, practical solutions",
                "Consulting that drives change",
            ],
            valuePropositions: ["Proven methodologies", "Industry expertise", "Measurable results", "Strategic partnerships"],
            aboutTemplates: [
                "Strategic consulting firm with decades of experience helping businesses grow",
                "Expert advisors specializing in business transformation and growth strategies",
            ],
            serviceCategories: ["Strategy", "Operations", "Technology", "Change Management", "Training"],
            ctaTexts: ["Free Consultation", "Get Started", "Contact Us", "Schedule Call"],
        },
        imageCategories: ["business", "meeting", "strategy", "professional", "growth"],
        targetAudience: ["executives", "business owners", "managers", "entrepreneurs"],
        businessGoals: ["growth", "efficiency", "transformation", "optimization"],
    },

    marketing: {
        name: "marketing",
        displayName: "Marketing & Advertising",
        description: "Digital marketing, advertising agencies, and marketing services",
        category: "professional",
        primaryColor: "#ec4899",
        secondaryColor: "#fdf2f8",
        accentColor: "#be185d",
        preferredComponents: ["CreativeHeader", "AnimatedHero", "GridFeatures", "PortfolioShowcase", "PackageServices"],
        requiredSections: ["header", "hero", "services", "portfolio", "contact"],
        optionalSections: ["team", "case-studies", "testimonials"],
        industrySpecific: ["PortfolioShowcase", "SocialFeed", "DataVisualization"],
        contentTemplates: {
            heroTitles: [
                "Marketing That Drives Results",
                "Grow Your Brand with Expert Marketing",
                "Digital Marketing Excellence",
                "Marketing Strategies That Convert",
            ],
            taglines: [
                "Creative campaigns, measurable results",
                "Your brand, amplified",
                "Marketing that matters",
                "Growth through creativity",
            ],
            valuePropositions: [
                "Data-driven strategies",
                "Creative excellence",
                "Multi-channel expertise",
                "ROI-focused campaigns",
            ],
            aboutTemplates: [
                "Full-service marketing agency specializing in digital growth strategies",
                "Creative marketing team with proven track record of driving business results",
            ],
            serviceCategories: ["Digital Marketing", "Social Media", "Content Creation", "SEO", "PPC"],
            ctaTexts: ["Get Strategy", "Start Campaign", "Free Audit", "Grow Now"],
        },
        imageCategories: ["marketing", "advertising", "creative", "social media", "campaigns"],
        targetAudience: ["businesses", "brands", "startups", "ecommerce"],
        businessGoals: ["brand awareness", "lead generation", "sales growth", "engagement"],
    },

    // HEALTHCARE & WELLNESS
    healthcare: {
        name: "healthcare",
        displayName: "Healthcare & Medical",
        description: "Medical practices, clinics, hospitals, and healthcare services",
        category: "healthcare",
        primaryColor: "#059669",
        secondaryColor: "#ecfdf5",
        accentColor: "#047857",
        preferredComponents: ["ClassicHeader", "SplitHero", "CardServices", "CardTeam", "AppointmentBooking"],
        requiredSections: ["header", "hero", "services", "team", "contact"],
        optionalSections: ["about", "testimonials", "insurance"],
        industrySpecific: ["AppointmentBooking", "CalendarContact"],
        contentTemplates: {
            heroTitles: [
                "Compassionate Healthcare Excellence",
                "Your Health, Our Priority",
                "Advanced Medical Care",
                "Comprehensive Healthcare Solutions",
            ],
            taglines: [
                "Caring for you and your family",
                "Excellence in medical care",
                "Your health journey starts here",
                "Trusted healthcare partners",
            ],
            valuePropositions: [
                "Board-certified physicians",
                "State-of-the-art equipment",
                "Patient-centered care",
                "Comprehensive services",
            ],
            aboutTemplates: [
                "Dedicated healthcare providers committed to your wellbeing and health",
                "Medical practice focused on providing compassionate, quality healthcare",
            ],
            serviceCategories: ["Primary Care", "Specialists", "Diagnostics", "Emergency", "Wellness"],
            ctaTexts: ["Book Appointment", "Schedule Visit", "Contact Us", "Emergency Care"],
        },
        imageCategories: ["medical", "healthcare", "hospital", "doctors", "wellness"],
        targetAudience: ["patients", "families", "seniors", "community"],
        businessGoals: ["patient care", "health outcomes", "accessibility", "trust"],
    },

    dental: {
        name: "dental",
        displayName: "Dental & Oral Health",
        description: "Dental practices, orthodontics, and oral health services",
        category: "healthcare",
        primaryColor: "#0891b2",
        secondaryColor: "#ecfeff",
        accentColor: "#0e7490",
        preferredComponents: ["ClassicHeader", "SplitHero", "CardServices", "AppointmentBooking"],
        requiredSections: ["header", "hero", "services", "contact"],
        optionalSections: ["about", "team", "testimonials"],
        industrySpecific: ["AppointmentBooking"],
        contentTemplates: {
            heroTitles: [
                "Beautiful Smiles, Healthy Lives",
                "Comprehensive Dental Care",
                "Your Smile is Our Passion",
                "Advanced Dental Solutions",
            ],
            taglines: [
                "Creating beautiful smiles",
                "Dental care you can trust",
                "Healthy smiles for life",
                "Excellence in dental care",
            ],
            valuePropositions: [
                "Advanced dental technology",
                "Gentle, comfortable care",
                "Comprehensive treatments",
                "Experienced dental team",
            ],
            aboutTemplates: [
                "Modern dental practice committed to providing exceptional oral healthcare",
                "Experienced dental team focused on creating healthy, beautiful smiles",
            ],
            serviceCategories: ["General Dentistry", "Cosmetic", "Orthodontics", "Oral Surgery", "Preventive"],
            ctaTexts: ["Book Appointment", "Schedule Cleaning", "Free Consultation", "Emergency Care"],
        },
        imageCategories: ["dental", "smile", "teeth", "dentist", "oral health"],
        targetAudience: ["patients", "families", "children", "adults"],
        businessGoals: ["oral health", "patient comfort", "beautiful smiles", "prevention"],
    },

    // EDUCATION & TRAINING
    education: {
        name: "education",
        displayName: "Education & Schools",
        description: "Schools, universities, training centers, and educational services",
        category: "education",
        primaryColor: "#7c3aed",
        secondaryColor: "#f3f4f6",
        accentColor: "#5b21b6",
        preferredComponents: ["ClassicHeader", "SplitHero", "CourseGrid", "CardTeam", "EventCalendar"],
        requiredSections: ["header", "hero", "programs", "faculty", "contact"],
        optionalSections: ["about", "events", "admissions"],
        industrySpecific: ["CourseGrid", "EventCalendar"],
        contentTemplates: {
            heroTitles: [
                "Empowering Minds, Shaping Futures",
                "Excellence in Education",
                "Learn, Grow, Succeed",
                "Your Educational Journey Starts Here",
            ],
            taglines: [
                "Inspiring lifelong learning",
                "Where knowledge meets opportunity",
                "Educating tomorrow's leaders",
                "Your success is our mission",
            ],
            valuePropositions: ["Expert faculty", "Modern facilities", "Comprehensive programs", "Career support"],
            aboutTemplates: [
                "Educational institution dedicated to providing quality learning experiences",
                "Academic excellence with focus on student success and career preparation",
            ],
            serviceCategories: ["Academic Programs", "Professional Development", "Online Learning", "Certifications"],
            ctaTexts: ["Apply Now", "Learn More", "Schedule Tour", "Get Info"],
        },
        imageCategories: ["education", "students", "classroom", "learning", "graduation"],
        targetAudience: ["students", "parents", "professionals", "lifelong learners"],
        businessGoals: ["student success", "academic excellence", "career preparation", "knowledge transfer"],
    },

    // RETAIL & ECOMMERCE
    ecommerce: {
        name: "ecommerce",
        displayName: "E-commerce & Online Retail",
        description: "Online stores, retail businesses, and e-commerce platforms",
        category: "retail",
        primaryColor: "#7c2d12",
        secondaryColor: "#fef7ff",
        accentColor: "#92400e",
        preferredComponents: ["EcommerceHeader", "ProductHero", "ProductGrid", "TieredPricing", "PaymentIntegration"],
        requiredSections: ["header", "hero", "products", "contact"],
        optionalSections: ["about", "testimonials", "shipping"],
        industrySpecific: ["ProductGrid", "PaymentIntegration", "SearchInterface"],
        contentTemplates: {
            heroTitles: [
                "Shop the Latest Trends",
                "Quality Products, Exceptional Service",
                "Your One-Stop Shopping Destination",
                "Discover Amazing Products",
            ],
            taglines: [
                "Quality you can trust",
                "Shop with confidence",
                "Where style meets value",
                "Your satisfaction guaranteed",
            ],
            valuePropositions: ["Quality products", "Fast shipping", "Easy returns", "Secure checkout"],
            aboutTemplates: [
                "Online retailer committed to providing quality products and exceptional service",
                "E-commerce platform offering curated selection of premium products",
            ],
            serviceCategories: ["Products", "Shipping", "Returns", "Customer Service", "Wholesale"],
            ctaTexts: ["Shop Now", "Add to Cart", "Buy Now", "View Products"],
        },
        imageCategories: ["products", "shopping", "retail", "ecommerce", "lifestyle"],
        targetAudience: ["consumers", "shoppers", "gift buyers", "businesses"],
        businessGoals: ["sales growth", "customer satisfaction", "brand loyalty", "market expansion"],
    },

    fashion: {
        name: "fashion",
        displayName: "Fashion & Apparel",
        description: "Fashion brands, clothing stores, and apparel companies",
        category: "retail",
        primaryColor: "#be185d",
        secondaryColor: "#fdf2f8",
        accentColor: "#9d174d",
        preferredComponents: ["MinimalistHeader", "CarouselHero", "FilterableGallery", "ProductGrid"],
        requiredSections: ["header", "hero", "collections", "contact"],
        optionalSections: ["about", "lookbook", "sustainability"],
        industrySpecific: ["FilterableGallery", "ProductGrid"],
        contentTemplates: {
            heroTitles: [
                "Fashion Forward, Style Conscious",
                "Discover Your Unique Style",
                "Trendsetting Fashion Collection",
                "Where Style Meets Substance",
            ],
            taglines: [
                "Style that speaks to you",
                "Fashion with purpose",
                "Wear your confidence",
                "Timeless style, modern edge",
            ],
            valuePropositions: ["Sustainable fashion", "Quality materials", "Unique designs", "Inclusive sizing"],
            aboutTemplates: [
                "Fashion brand committed to sustainable and stylish clothing for modern lifestyles",
                "Contemporary fashion label creating unique pieces for confident individuals",
            ],
            serviceCategories: ["Women's", "Men's", "Accessories", "Sustainable", "Custom"],
            ctaTexts: ["Shop Collection", "Explore Styles", "Find Your Size", "New Arrivals"],
        },
        imageCategories: ["fashion", "clothing", "style", "models", "lifestyle"],
        targetAudience: ["fashion enthusiasts", "style conscious", "millennials", "professionals"],
        businessGoals: ["brand recognition", "style leadership", "sustainability", "customer loyalty"],
    },

    // FOOD & HOSPITALITY
    restaurant: {
        name: "restaurant",
        displayName: "Restaurant & Dining",
        description: "Restaurants, cafes, catering, and food service businesses",
        category: "hospitality",
        primaryColor: "#dc2626",
        secondaryColor: "#fef2f2",
        accentColor: "#991b1b",
        preferredComponents: ["ClassicHeader", "VideoHero", "MenuSection", "EventCalendar", "MapContact"],
        requiredSections: ["header", "hero", "menu", "contact"],
        optionalSections: ["about", "events", "gallery", "reservations"],
        industrySpecific: ["MenuSection", "EventCalendar"],
        contentTemplates: {
            heroTitles: [
                "Exceptional Dining Experience",
                "Authentic Flavors, Memorable Moments",
                "Where Culinary Art Meets Hospitality",
                "Fresh Ingredients, Timeless Recipes",
            ],
            taglines: [
                "Savor the difference quality makes",
                "Every meal tells a story",
                "Crafted with passion, served with pride",
                "Your table awaits",
            ],
            valuePropositions: [
                "Farm-to-table ingredients",
                "Expert culinary team",
                "Warm hospitality",
                "Memorable experiences",
            ],
            aboutTemplates: [
                "Restaurant dedicated to providing exceptional dining experiences with fresh, quality ingredients",
                "Culinary destination offering authentic flavors and warm hospitality",
            ],
            serviceCategories: ["Dining", "Catering", "Private Events", "Takeout", "Delivery"],
            ctaTexts: ["Make Reservation", "View Menu", "Order Online", "Book Event"],
        },
        imageCategories: ["food", "restaurant", "dining", "chef", "cuisine"],
        targetAudience: ["diners", "food lovers", "families", "couples"],
        businessGoals: ["customer satisfaction", "culinary excellence", "memorable experiences", "community"],
    },

    // REAL ESTATE & PROPERTY
    realestate: {
        name: "realestate",
        displayName: "Real Estate",
        description: "Real estate agencies, property management, and real estate services",
        category: "property",
        primaryColor: "#0891b2",
        secondaryColor: "#ecfeff",
        accentColor: "#0e7490",
        preferredComponents: ["ClassicHeader", "SplitHero", "PropertyListing", "CardTeam", "MapContact"],
        requiredSections: ["header", "hero", "properties", "services", "contact"],
        optionalSections: ["about", "team", "testimonials"],
        industrySpecific: ["PropertyListing", "SearchInterface"],
        contentTemplates: {
            heroTitles: [
                "Your Dream Home Awaits",
                "Expert Real Estate Services",
                "Find Your Perfect Property",
                "Your Trusted Real Estate Partner",
            ],
            taglines: [
                "Making dreams come home",
                "Your property, our expertise",
                "Where home begins",
                "Real estate made simple",
            ],
            valuePropositions: [
                "Local market expertise",
                "Professional network",
                "Marketing excellence",
                "Personalized service",
            ],
            aboutTemplates: [
                "Real estate professionals helping clients achieve their property goals",
                "Experienced real estate team with deep local market knowledge",
            ],
            serviceCategories: ["Buying", "Selling", "Rentals", "Property Management", "Investment"],
            ctaTexts: ["View Properties", "Get Valuation", "Contact Agent", "Schedule Tour"],
        },
        imageCategories: ["real estate", "homes", "properties", "architecture", "neighborhoods"],
        targetAudience: ["home buyers", "sellers", "investors", "renters"],
        businessGoals: ["successful transactions", "client satisfaction", "market expertise", "growth"],
    },

    // FITNESS & WELLNESS
    fitness: {
        name: "fitness",
        displayName: "Fitness & Wellness",
        description: "Gyms, fitness centers, personal training, and wellness services",
        category: "wellness",
        primaryColor: "#ea580c",
        secondaryColor: "#fff7ed",
        accentColor: "#c2410c",
        preferredComponents: ["ModernHeader", "VideoHero", "GridFeatures", "CardTeam", "CalendarContact"],
        requiredSections: ["header", "hero", "services", "trainers", "contact"],
        optionalSections: ["about", "classes", "membership"],
        industrySpecific: ["CalendarContact"],
        contentTemplates: {
            heroTitles: [
                "Transform Your Body, Transform Your Life",
                "Achieve Your Fitness Goals",
                "Strength, Health, Confidence",
                "Your Fitness Journey Starts Here",
            ],
            taglines: ["Stronger every day", "Fitness for life", "Unleash your potential", "Train hard, live well"],
            valuePropositions: ["Expert trainers", "Modern equipment", "Flexible memberships", "Supportive community"],
            aboutTemplates: [
                "Fitness center dedicated to helping you achieve your health and wellness goals",
                "Modern gym with expert trainers and comprehensive fitness programs",
            ],
            serviceCategories: ["Personal Training", "Group Classes", "Nutrition", "Wellness", "Recovery"],
            ctaTexts: ["Join Now", "Free Trial", "Book Session", "Get Started"],
        },
        imageCategories: ["fitness", "gym", "workout", "health", "wellness"],
        targetAudience: ["fitness enthusiasts", "beginners", "athletes", "health conscious"],
        businessGoals: ["member satisfaction", "health outcomes", "community building", "retention"],
    },

    // AUTOMOTIVE
    automotive: {
        name: "automotive",
        displayName: "Automotive & Transportation",
        description: "Car dealerships, auto services, and transportation companies",
        category: "automotive",
        primaryColor: "#1f2937",
        secondaryColor: "#f9fafb",
        accentColor: "#374151",
        preferredComponents: ["ModernHeader", "ProductHero", "FilterableGallery", "CardServices"],
        requiredSections: ["header", "hero", "inventory", "services", "contact"],
        optionalSections: ["about", "financing", "testimonials"],
        industrySpecific: ["SearchInterface", "FilterableGallery"],
        contentTemplates: {
            heroTitles: [
                "Your Next Vehicle Awaits",
                "Quality Cars, Trusted Service",
                "Drive Your Dreams",
                "Automotive Excellence",
            ],
            taglines: ["Drive with confidence", "Quality you can trust", "Your automotive partner", "Excellence in motion"],
            valuePropositions: ["Quality vehicles", "Expert service", "Competitive pricing", "Financing options"],
            aboutTemplates: [
                "Automotive dealership committed to providing quality vehicles and exceptional service",
                "Trusted automotive partner with extensive inventory and expert service team",
            ],
            serviceCategories: ["Sales", "Service", "Parts", "Financing", "Leasing"],
            ctaTexts: ["View Inventory", "Schedule Service", "Get Quote", "Test Drive"],
        },
        imageCategories: ["cars", "automotive", "vehicles", "dealership", "service"],
        targetAudience: ["car buyers", "vehicle owners", "fleet managers", "families"],
        businessGoals: ["sales growth", "customer satisfaction", "service excellence", "loyalty"],
    },

    // BEAUTY & PERSONAL CARE
    beauty: {
        name: "beauty",
        displayName: "Beauty & Personal Care",
        description: "Beauty salons, spas, cosmetics, and personal care services",
        category: "beauty",
        primaryColor: "#ec4899",
        secondaryColor: "#fdf2f8",
        accentColor: "#be185d",
        preferredComponents: ["MinimalistHeader", "SplitHero", "CardServices", "LightboxGallery", "CalendarContact"],
        requiredSections: ["header", "hero", "services", "gallery", "contact"],
        optionalSections: ["about", "team", "products"],
        industrySpecific: ["CalendarContact", "LightboxGallery"],
        contentTemplates: {
            heroTitles: [
                "Enhance Your Natural Beauty",
                "Luxury Beauty Services",
                "Where Beauty Meets Wellness",
                "Your Beauty Transformation",
            ],
            taglines: ["Beauty redefined", "Luxury meets wellness", "Your beauty journey", "Confidence through beauty"],
            valuePropositions: ["Expert beauticians", "Premium products", "Relaxing environment", "Personalized treatments"],
            aboutTemplates: [
                "Beauty salon dedicated to enhancing your natural beauty with expert care",
                "Luxury beauty destination offering premium services and treatments",
            ],
            serviceCategories: ["Hair", "Skincare", "Makeup", "Nails", "Spa"],
            ctaTexts: ["Book Appointment", "View Services", "Get Consultation", "Spa Packages"],
        },
        imageCategories: ["beauty", "spa", "salon", "skincare", "wellness"],
        targetAudience: ["beauty enthusiasts", "women", "men", "wellness seekers"],
        businessGoals: ["client satisfaction", "beauty enhancement", "relaxation", "self-care"],
    },

    // TRAVEL & TOURISM
    travel: {
        name: "travel",
        displayName: "Travel & Tourism",
        description: "Travel agencies, tour operators, and hospitality services",
        category: "travel",
        primaryColor: "#0891b2",
        secondaryColor: "#ecfeff",
        accentColor: "#0e7490",
        preferredComponents: ["ModernHeader", "CarouselHero", "FilterableGallery", "PackageServices"],
        requiredSections: ["header", "hero", "destinations", "packages", "contact"],
        optionalSections: ["about", "testimonials", "blog"],
        industrySpecific: ["FilterableGallery", "SearchInterface"],
        contentTemplates: {
            heroTitles: [
                "Discover Your Next Adventure",
                "Unforgettable Travel Experiences",
                "Explore the World with Us",
                "Your Journey Begins Here",
            ],
            taglines: [
                "Adventure awaits",
                "Create memories that last",
                "Explore. Dream. Discover.",
                "Your travel dreams realized",
            ],
            valuePropositions: ["Expert travel planning", "Unique destinations", "Personalized itineraries", "24/7 support"],
            aboutTemplates: [
                "Travel agency specializing in creating unforgettable travel experiences",
                "Expert travel planners helping you discover amazing destinations worldwide",
            ],
            serviceCategories: ["Destinations", "Tours", "Hotels", "Flights", "Packages"],
            ctaTexts: ["Book Now", "Plan Trip", "Get Quote", "Explore Destinations"],
        },
        imageCategories: ["travel", "destinations", "vacation", "adventure", "tourism"],
        targetAudience: ["travelers", "vacationers", "adventure seekers", "families"],
        businessGoals: ["memorable experiences", "customer satisfaction", "destination expertise", "growth"],
    },

    // LEGAL SERVICES
    legal: {
        name: "legal",
        displayName: "Legal Services",
        description: "Law firms, legal consultants, and legal service providers",
        category: "professional",
        primaryColor: "#1f2937",
        secondaryColor: "#f9fafb",
        accentColor: "#374151",
        preferredComponents: ["ClassicHeader", "SplitHero", "ListServices", "CardTeam", "FormContact"],
        requiredSections: ["header", "hero", "practice-areas", "attorneys", "contact"],
        optionalSections: ["about", "results", "testimonials"],
        industrySpecific: ["FormContact"],
        contentTemplates: {
            heroTitles: [
                "Experienced Legal Representation",
                "Protecting Your Rights and Interests",
                "Expert Legal Counsel You Can Trust",
                "Your Legal Advocates",
            ],
            taglines: [
                "Justice through expertise",
                "Your rights, our mission",
                "Legal excellence, personal service",
                "Defending what matters most",
            ],
            valuePropositions: [
                "Experienced attorneys",
                "Personalized service",
                "Proven results",
                "Comprehensive legal support",
            ],
            aboutTemplates: [
                "Law firm providing experienced legal representation and personalized service",
                "Legal professionals dedicated to protecting your rights and achieving results",
            ],
            serviceCategories: ["Personal Injury", "Business Law", "Family Law", "Criminal Defense", "Estate Planning"],
            ctaTexts: ["Free Consultation", "Contact Attorney", "Get Help", "Legal Advice"],
        },
        imageCategories: ["legal", "law", "justice", "attorneys", "courthouse"],
        targetAudience: ["individuals", "businesses", "families", "accident victims"],
        businessGoals: ["client advocacy", "legal success", "justice", "protection"],
    },

    // FINANCIAL SERVICES
    finance: {
        name: "finance",
        displayName: "Financial Services",
        description: "Financial advisors, accounting firms, and financial service providers",
        category: "finance",
        primaryColor: "#1e40af",
        secondaryColor: "#eff6ff",
        accentColor: "#1d4ed8",
        preferredComponents: ["ClassicHeader", "SplitHero", "PackageServices", "DataVisualization", "FormContact"],
        requiredSections: ["header", "hero", "services", "contact"],
        optionalSections: ["about", "team", "calculators"],
        industrySpecific: ["DataVisualization", "PackageServices"],
        contentTemplates: {
            heroTitles: [
                "Secure Your Financial Future",
                "Expert Financial Guidance",
                "Your Wealth Management Partner",
                "Financial Planning Made Simple",
            ],
            taglines: [
                "Your financial success, our expertise",
                "Building wealth, securing futures",
                "Smart money, smart choices",
                "Financial freedom starts here",
            ],
            valuePropositions: [
                "Certified professionals",
                "Personalized strategies",
                "Ongoing support",
                "Proven track record",
            ],
            aboutTemplates: [
                "Financial services firm dedicated to helping you achieve your financial goals",
                "Expert financial advisors providing comprehensive wealth management solutions",
            ],
            serviceCategories: ["Financial Planning", "Investment Management", "Tax Services", "Retirement", "Insurance"],
            ctaTexts: ["Get Started", "Free Consultation", "Plan Now", "Secure Future"],
        },
        imageCategories: ["finance", "investment", "planning", "wealth", "business"],
        targetAudience: ["investors", "retirees", "business owners", "families"],
        businessGoals: ["financial security", "wealth building", "retirement planning", "tax optimization"],
    },

    // NON-PROFIT & SOCIAL
    nonprofit: {
        name: "nonprofit",
        displayName: "Non-Profit & Social Impact",
        description: "Non-profit organizations, charities, and social impact initiatives",
        category: "social",
        primaryColor: "#059669",
        secondaryColor: "#ecfdf5",
        accentColor: "#047857",
        preferredComponents: ["ClassicHeader", "TestimonialHero", "GridFeatures", "EventCalendar", "FormContact"],
        requiredSections: ["header", "hero", "mission", "programs", "contact"],
        optionalSections: ["about", "events", "volunteer", "donate"],
        industrySpecific: ["EventCalendar", "PaymentIntegration"],
        contentTemplates: {
            heroTitles: [
                "Making a Difference Together",
                "Creating Positive Change",
                "Join Our Mission",
                "Building a Better Tomorrow",
            ],
            taglines: [
                "Together we can make a difference",
                "Change starts with you",
                "Hope through action",
                "Building stronger communities",
            ],
            valuePropositions: ["Proven impact", "Community focused", "Transparent operations", "Volunteer opportunities"],
            aboutTemplates: [
                "Non-profit organization dedicated to creating positive change in our community",
                "Social impact organization working to address critical community needs",
            ],
            serviceCategories: ["Programs", "Volunteer", "Donate", "Events", "Advocacy"],
            ctaTexts: ["Donate Now", "Volunteer", "Get Involved", "Support Cause"],
        },
        imageCategories: ["community", "volunteer", "charity", "social impact", "helping"],
        targetAudience: ["donors", "volunteers", "community members", "advocates"],
        businessGoals: ["social impact", "community support", "fundraising", "awareness"],
    },
}

export function getExpandedIndustryConfig(industry: string): ExpandedIndustryConfig {
    return EXPANDED_INDUSTRIES[industry] || EXPANDED_INDUSTRIES.technology
}

export function getIndustriesByCategory(category: string): ExpandedIndustryConfig[] {
    return Object.values(EXPANDED_INDUSTRIES).filter((ind) => ind.category === category)
}

export function getAllExpandedIndustries(): ExpandedIndustryConfig[] {
    return Object.values(EXPANDED_INDUSTRIES)
}

export function getIndustryCategories(): string[] {
    return [...new Set(Object.values(EXPANDED_INDUSTRIES).map((ind) => ind.category))]
}
