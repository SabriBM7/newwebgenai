export interface ComponentDefinition {
    name: string
    category: string
    description: string
    props: ComponentProp[]
    variations: string[]
    industries: string[]
    requiredImages?: number
}

export interface ComponentProp {
    name: string
    type: string
    required: boolean
    default?: any
    description: string
}

export const COMPREHENSIVE_COMPONENT_LIBRARY: Record<string, ComponentDefinition> = {
    // HEADERS (5 variations)
    ModernHeader: {
        name: "ModernHeader",
        category: "headers",
        description: "Clean, modern header with gradient background",
        props: [
            { name: "logo", type: "string", required: true, description: "Company logo text" },
            { name: "menu", type: "array", required: true, description: "Navigation menu items" },
            { name: "ctaButton", type: "object", required: false, description: "Call-to-action button" },
        ],
        variations: ["transparent", "solid", "gradient", "minimal"],
        industries: ["technology", "startup", "saas", "consulting"],
    },

    ClassicHeader: {
        name: "ClassicHeader",
        category: "headers",
        description: "Traditional header with centered logo",
        props: [
            { name: "logo", type: "string", required: true, description: "Company logo" },
            { name: "menu", type: "array", required: true, description: "Navigation items" },
        ],
        variations: ["centered", "left-aligned", "with-tagline"],
        industries: ["legal", "finance", "healthcare", "education"],
    },

    CreativeHeader: {
        name: "CreativeHeader",
        category: "headers",
        description: "Artistic header with unique design elements",
        props: [
            { name: "logo", type: "string", required: true, description: "Brand name" },
            { name: "menu", type: "array", required: true, description: "Navigation" },
        ],
        variations: ["artistic", "bold", "colorful", "animated"],
        industries: ["creative", "agency", "portfolio", "entertainment"],
    },

    MinimalistHeader: {
        name: "MinimalistHeader",
        category: "headers",
        description: "Ultra-clean minimalist header",
        props: [
            { name: "logo", type: "string", required: true, description: "Simple logo" },
            { name: "menu", type: "array", required: true, description: "Minimal navigation" },
        ],
        variations: ["ultra-minimal", "text-only", "icon-based"],
        industries: ["architecture", "design", "luxury", "fashion"],
    },

    EcommerceHeader: {
        name: "EcommerceHeader",
        category: "headers",
        description: "Header optimized for online stores",
        props: [
            { name: "logo", type: "string", required: true, description: "Store logo" },
            { name: "searchBar", type: "boolean", required: false, default: true, description: "Include search" },
            { name: "cartIcon", type: "boolean", required: false, default: true, description: "Shopping cart" },
        ],
        variations: ["with-search", "with-categories", "mega-menu"],
        industries: ["ecommerce", "retail", "marketplace"],
    },

    // HEROES (8 variations)
    GradientHero: {
        name: "GradientHero",
        category: "heroes",
        description: "Hero with beautiful gradient background",
        props: [
            { name: "title", type: "string", required: true, description: "Main headline" },
            { name: "subtitle", type: "string", required: false, description: "Supporting text" },
            { name: "ctaButtons", type: "array", required: true, description: "Action buttons" },
        ],
        variations: ["diagonal", "radial", "animated", "particles"],
        industries: ["technology", "startup", "saas"],
        requiredImages: 1,
    },

    VideoHero: {
        name: "VideoHero",
        category: "heroes",
        description: "Hero section with background video",
        props: [
            { name: "title", type: "string", required: true, description: "Overlay title" },
            { name: "videoUrl", type: "string", required: true, description: "Background video" },
        ],
        variations: ["overlay-dark", "overlay-light", "no-overlay"],
        industries: ["entertainment", "travel", "fitness", "restaurant"],
        requiredImages: 0,
    },

    SplitHero: {
        name: "SplitHero",
        category: "heroes",
        description: "Split layout with text and image",
        props: [
            { name: "title", type: "string", required: true, description: "Main title" },
            { name: "description", type: "string", required: true, description: "Description text" },
            { name: "image", type: "string", required: true, description: "Hero image" },
        ],
        variations: ["left-text", "right-text", "diagonal-split"],
        industries: ["consulting", "agency", "professional"],
        requiredImages: 1,
    },

    AnimatedHero: {
        name: "AnimatedHero",
        category: "heroes",
        description: "Hero with animated elements and interactions",
        props: [
            { name: "title", type: "string", required: true, description: "Animated title" },
            { name: "animations", type: "array", required: false, description: "Animation configs" },
        ],
        variations: ["typewriter", "fade-in", "slide-up", "parallax"],
        industries: ["creative", "technology", "gaming"],
    },

    CarouselHero: {
        name: "CarouselHero",
        category: "heroes",
        description: "Hero with rotating slides",
        props: [
            { name: "slides", type: "array", required: true, description: "Hero slides" },
            { name: "autoplay", type: "boolean", required: false, default: true, description: "Auto rotation" },
        ],
        variations: ["fade", "slide", "zoom"],
        industries: ["ecommerce", "portfolio", "travel"],
        requiredImages: 3,
    },

    InteractiveHero: {
        name: "InteractiveHero",
        category: "heroes",
        description: "Hero with interactive elements",
        props: [
            { name: "title", type: "string", required: true, description: "Interactive title" },
            { name: "interactions", type: "array", required: false, description: "Interactive elements" },
        ],
        variations: ["hover-effects", "click-animations", "scroll-triggered"],
        industries: ["gaming", "creative", "technology"],
    },

    ProductHero: {
        name: "ProductHero",
        category: "heroes",
        description: "Hero showcasing a specific product",
        props: [
            { name: "productName", type: "string", required: true, description: "Product name" },
            { name: "productImage", type: "string", required: true, description: "Product image" },
            { name: "features", type: "array", required: false, description: "Key features" },
        ],
        variations: ["3d-product", "multiple-angles", "with-specs"],
        industries: ["ecommerce", "technology", "automotive"],
        requiredImages: 1,
    },

    TestimonialHero: {
        name: "TestimonialHero",
        category: "heroes",
        description: "Hero featuring customer testimonials",
        props: [
            { name: "testimonial", type: "object", required: true, description: "Featured testimonial" },
            { name: "backgroundImage", type: "string", required: false, description: "Background image" },
        ],
        variations: ["quote-focused", "customer-photo", "video-testimonial"],
        industries: ["service", "consulting", "healthcare"],
        requiredImages: 1,
    },

    // FEATURES (6 variations)
    GridFeatures: {
        name: "GridFeatures",
        category: "features",
        description: "Features displayed in a grid layout",
        props: [
            { name: "title", type: "string", required: true, description: "Section title" },
            { name: "features", type: "array", required: true, description: "Feature list" },
            { name: "columns", type: "number", required: false, default: 3, description: "Grid columns" },
        ],
        variations: ["2-column", "3-column", "4-column", "masonry"],
        industries: ["technology", "saas", "consulting"],
    },

    IconFeatures: {
        name: "IconFeatures",
        category: "features",
        description: "Features with prominent icons",
        props: [{ name: "features", type: "array", required: true, description: "Features with icons" }],
        variations: ["large-icons", "animated-icons", "gradient-icons"],
        industries: ["technology", "startup", "service"],
    },

    ComparisonFeatures: {
        name: "ComparisonFeatures",
        category: "features",
        description: "Before/after or comparison features",
        props: [{ name: "comparisons", type: "array", required: true, description: "Comparison items" }],
        variations: ["before-after", "vs-competition", "upgrade-benefits"],
        industries: ["saas", "consulting", "service"],
    },

    TimelineFeatures: {
        name: "TimelineFeatures",
        category: "features",
        description: "Features displayed as a timeline",
        props: [{ name: "timeline", type: "array", required: true, description: "Timeline items" }],
        variations: ["vertical", "horizontal", "zigzag"],
        industries: ["consulting", "agency", "education"],
    },

    InteractiveFeatures: {
        name: "InteractiveFeatures",
        category: "features",
        description: "Features with interactive demonstrations",
        props: [{ name: "features", type: "array", required: true, description: "Interactive features" }],
        variations: ["hover-demos", "click-reveals", "animated-previews"],
        industries: ["technology", "saas", "software"],
    },

    BenefitsFeatures: {
        name: "BenefitsFeatures",
        category: "features",
        description: "Features focused on customer benefits",
        props: [{ name: "benefits", type: "array", required: true, description: "Customer benefits" }],
        variations: ["outcome-focused", "roi-focused", "problem-solution"],
        industries: ["consulting", "service", "b2b"],
    },

    // SERVICES (5 variations)
    CardServices: {
        name: "CardServices",
        category: "services",
        description: "Services displayed as cards",
        props: [{ name: "services", type: "array", required: true, description: "Service cards" }],
        variations: ["hover-effects", "pricing-included", "icon-cards"],
        industries: ["consulting", "agency", "professional"],
        requiredImages: 3,
    },

    ListServices: {
        name: "ListServices",
        category: "services",
        description: "Services in a detailed list format",
        props: [{ name: "services", type: "array", required: true, description: "Service list" }],
        variations: ["detailed", "minimal", "with-pricing"],
        industries: ["legal", "healthcare", "finance"],
    },

    TabServices: {
        name: "TabServices",
        category: "services",
        description: "Services organized in tabs",
        props: [{ name: "serviceCategories", type: "array", required: true, description: "Service tabs" }],
        variations: ["horizontal-tabs", "vertical-tabs", "accordion"],
        industries: ["technology", "consulting", "agency"],
    },

    ProcessServices: {
        name: "ProcessServices",
        category: "services",
        description: "Services shown as a process flow",
        props: [{ name: "processSteps", type: "array", required: true, description: "Process steps" }],
        variations: ["step-by-step", "circular-flow", "timeline"],
        industries: ["consulting", "agency", "service"],
    },

    PackageServices: {
        name: "PackageServices",
        category: "services",
        description: "Services bundled into packages",
        props: [{ name: "packages", type: "array", required: true, description: "Service packages" }],
        variations: ["tiered", "custom", "enterprise"],
        industries: ["saas", "consulting", "agency"],
    },

    // TESTIMONIALS (4 variations)
    CarouselTestimonials: {
        name: "CarouselTestimonials",
        category: "testimonials",
        description: "Rotating testimonial carousel",
        props: [{ name: "testimonials", type: "array", required: true, description: "Customer testimonials" }],
        variations: ["single-slide", "multi-slide", "fade-transition"],
        industries: ["service", "ecommerce", "saas"],
        requiredImages: 3,
    },

    GridTestimonials: {
        name: "GridTestimonials",
        category: "testimonials",
        description: "Testimonials in grid layout",
        props: [{ name: "testimonials", type: "array", required: true, description: "Testimonial grid" }],
        variations: ["masonry", "equal-height", "staggered"],
        industries: ["consulting", "agency", "professional"],
        requiredImages: 6,
    },

    VideoTestimonials: {
        name: "VideoTestimonials",
        category: "testimonials",
        description: "Video testimonials from customers",
        props: [{ name: "videoTestimonials", type: "array", required: true, description: "Video testimonials" }],
        variations: ["modal-popup", "inline-player", "thumbnail-grid"],
        industries: ["service", "consulting", "healthcare"],
    },

    SocialTestimonials: {
        name: "SocialTestimonials",
        category: "testimonials",
        description: "Social media testimonials and reviews",
        props: [{ name: "socialReviews", type: "array", required: true, description: "Social reviews" }],
        variations: ["twitter-style", "instagram-style", "mixed-platforms"],
        industries: ["ecommerce", "restaurant", "service"],
    },

    // PRICING (4 variations)
    TieredPricing: {
        name: "TieredPricing",
        category: "pricing",
        description: "Traditional tiered pricing plans",
        props: [{ name: "plans", type: "array", required: true, description: "Pricing tiers" }],
        variations: ["3-tier", "4-tier", "enterprise-plus"],
        industries: ["saas", "software", "service"],
    },

    UsagePricing: {
        name: "UsagePricing",
        category: "pricing",
        description: "Usage-based pricing model",
        props: [{ name: "usageMetrics", type: "array", required: true, description: "Usage metrics" }],
        variations: ["pay-per-use", "volume-discounts", "credits-based"],
        industries: ["saas", "api", "cloud"],
    },

    CustomPricing: {
        name: "CustomPricing",
        category: "pricing",
        description: "Custom pricing with quote requests",
        props: [{ name: "baseServices", type: "array", required: true, description: "Base service options" }],
        variations: ["quote-request", "consultation-based", "project-based"],
        industries: ["consulting", "agency", "custom"],
    },

    FreemiumPricing: {
        name: "FreemiumPricing",
        category: "pricing",
        description: "Free tier with premium upgrades",
        props: [
            { name: "freeTier", type: "object", required: true, description: "Free plan details" },
            { name: "premiumTiers", type: "array", required: true, description: "Premium plans" },
        ],
        variations: ["feature-limited", "usage-limited", "time-limited"],
        industries: ["saas", "software", "app"],
    },

    // GALLERIES (4 variations)
    MasonryGallery: {
        name: "MasonryGallery",
        category: "galleries",
        description: "Pinterest-style masonry gallery",
        props: [{ name: "images", type: "array", required: true, description: "Gallery images" }],
        variations: ["2-column", "3-column", "responsive"],
        industries: ["creative", "portfolio", "photography"],
        requiredImages: 12,
    },

    SliderGallery: {
        name: "SliderGallery",
        category: "galleries",
        description: "Horizontal scrolling gallery",
        props: [{ name: "images", type: "array", required: true, description: "Slider images" }],
        variations: ["infinite-scroll", "thumbnail-nav", "fullscreen"],
        industries: ["portfolio", "real-estate", "travel"],
        requiredImages: 8,
    },

    FilterableGallery: {
        name: "FilterableGallery",
        category: "galleries",
        description: "Gallery with category filters",
        props: [
            { name: "categories", type: "array", required: true, description: "Image categories" },
            { name: "images", type: "array", required: true, description: "Categorized images" },
        ],
        variations: ["tag-filters", "dropdown-filters", "search-filters"],
        industries: ["portfolio", "ecommerce", "creative"],
        requiredImages: 15,
    },

    LightboxGallery: {
        name: "LightboxGallery",
        category: "galleries",
        description: "Gallery with lightbox popup",
        props: [{ name: "images", type: "array", required: true, description: "Lightbox images" }],
        variations: ["zoom-enabled", "slideshow", "info-overlay"],
        industries: ["photography", "portfolio", "real-estate"],
        requiredImages: 10,
    },

    // TEAM (3 variations)
    CardTeam: {
        name: "CardTeam",
        category: "team",
        description: "Team members in card format",
        props: [{ name: "teamMembers", type: "array", required: true, description: "Team member cards" }],
        variations: ["hover-info", "social-links", "role-focused"],
        industries: ["agency", "consulting", "startup"],
        requiredImages: 6,
    },

    ListTeam: {
        name: "ListTeam",
        category: "team",
        description: "Team members in list format",
        props: [{ name: "teamMembers", type: "array", required: true, description: "Team member list" }],
        variations: ["detailed-bios", "minimal-info", "department-grouped"],
        industries: ["professional", "healthcare", "legal"],
        requiredImages: 8,
    },

    HierarchyTeam: {
        name: "HierarchyTeam",
        category: "team",
        description: "Team shown in organizational hierarchy",
        props: [{ name: "orgChart", type: "object", required: true, description: "Organization structure" }],
        variations: ["tree-view", "department-view", "role-view"],
        industries: ["corporate", "enterprise", "government"],
        requiredImages: 10,
    },

    // CONTACT (4 variations)
    FormContact: {
        name: "FormContact",
        category: "contact",
        description: "Contact form with validation",
        props: [
            { name: "formFields", type: "array", required: true, description: "Form fields" },
            { name: "submitAction", type: "string", required: true, description: "Form submission" },
        ],
        variations: ["multi-step", "single-page", "modal-form"],
        industries: ["service", "consulting", "professional"],
    },

    MapContact: {
        name: "MapContact",
        category: "contact",
        description: "Contact info with interactive map",
        props: [
            { name: "location", type: "object", required: true, description: "Business location" },
            { name: "contactInfo", type: "object", required: true, description: "Contact details" },
        ],
        variations: ["google-maps", "custom-map", "multiple-locations"],
        industries: ["local-business", "retail", "restaurant"],
    },

    ChatContact: {
        name: "ChatContact",
        category: "contact",
        description: "Live chat integration",
        props: [{ name: "chatConfig", type: "object", required: true, description: "Chat configuration" }],
        variations: ["popup-chat", "embedded-chat", "ai-chat"],
        industries: ["ecommerce", "saas", "support"],
    },

    CalendarContact: {
        name: "CalendarContact",
        category: "contact",
        description: "Appointment booking calendar",
        props: [{ name: "availability", type: "object", required: true, description: "Available times" }],
        variations: ["time-slots", "duration-based", "recurring"],
        industries: ["healthcare", "consulting", "service"],
    },

    // INDUSTRY-SPECIFIC COMPONENTS
    MenuSection: {
        name: "MenuSection",
        category: "industry-specific",
        description: "Restaurant menu with categories",
        props: [
            { name: "menuCategories", type: "array", required: true, description: "Menu categories" },
            { name: "menuItems", type: "array", required: true, description: "Menu items" },
        ],
        variations: ["grid-layout", "list-layout", "accordion"],
        industries: ["restaurant", "cafe", "catering"],
        requiredImages: 8,
    },

    ProductGrid: {
        name: "ProductGrid",
        category: "industry-specific",
        description: "E-commerce product grid",
        props: [
            { name: "products", type: "array", required: true, description: "Product list" },
            { name: "filters", type: "array", required: false, description: "Product filters" },
        ],
        variations: ["with-filters", "infinite-scroll", "quick-view"],
        industries: ["ecommerce", "retail", "marketplace"],
        requiredImages: 12,
    },

    PropertyListing: {
        name: "PropertyListing",
        category: "industry-specific",
        description: "Real estate property listings",
        props: [{ name: "properties", type: "array", required: true, description: "Property listings" }],
        variations: ["grid-view", "list-view", "map-view"],
        industries: ["real-estate", "rental", "property"],
        requiredImages: 15,
    },

    CourseGrid: {
        name: "CourseGrid",
        category: "industry-specific",
        description: "Educational course listings",
        props: [{ name: "courses", type: "array", required: true, description: "Course list" }],
        variations: ["category-filters", "difficulty-levels", "instructor-info"],
        industries: ["education", "training", "online-learning"],
        requiredImages: 6,
    },

    AppointmentBooking: {
        name: "AppointmentBooking",
        category: "industry-specific",
        description: "Healthcare appointment booking",
        props: [
            { name: "services", type: "array", required: true, description: "Medical services" },
            { name: "providers", type: "array", required: true, description: "Healthcare providers" },
        ],
        variations: ["time-slots", "provider-selection", "service-selection"],
        industries: ["healthcare", "medical", "dental"],
    },

    PortfolioShowcase: {
        name: "PortfolioShowcase",
        category: "industry-specific",
        description: "Creative portfolio showcase",
        props: [{ name: "projects", type: "array", required: true, description: "Portfolio projects" }],
        variations: ["masonry", "slider", "filterable"],
        industries: ["creative", "agency", "freelancer"],
        requiredImages: 20,
    },

    EventCalendar: {
        name: "EventCalendar",
        category: "industry-specific",
        description: "Event calendar and listings",
        props: [{ name: "events", type: "array", required: true, description: "Event list" }],
        variations: ["calendar-view", "list-view", "card-view"],
        industries: ["events", "entertainment", "education"],
    },

    JobListings: {
        name: "JobListings",
        category: "industry-specific",
        description: "Job posting and application system",
        props: [{ name: "jobs", type: "array", required: true, description: "Job openings" }],
        variations: ["detailed-view", "quick-apply", "filter-search"],
        industries: ["recruitment", "hr", "corporate"],
    },

    // ADVANCED COMPONENTS
    ChatBot: {
        name: "ChatBot",
        category: "advanced",
        description: "AI-powered chatbot interface",
        props: [{ name: "botConfig", type: "object", required: true, description: "Chatbot configuration" }],
        variations: ["popup", "embedded", "fullscreen"],
        industries: ["saas", "ecommerce", "support"],
    },

    SearchInterface: {
        name: "SearchInterface",
        category: "advanced",
        description: "Advanced search with filters",
        props: [{ name: "searchConfig", type: "object", required: true, description: "Search configuration" }],
        variations: ["autocomplete", "faceted", "ai-powered"],
        industries: ["ecommerce", "directory", "database"],
    },

    DataVisualization: {
        name: "DataVisualization",
        category: "advanced",
        description: "Charts and data visualization",
        props: [
            { name: "chartData", type: "array", required: true, description: "Chart data" },
            { name: "chartType", type: "string", required: true, description: "Chart type" },
        ],
        variations: ["interactive", "real-time", "dashboard"],
        industries: ["analytics", "finance", "research"],
    },

    PaymentIntegration: {
        name: "PaymentIntegration",
        category: "advanced",
        description: "Payment processing interface",
        props: [{ name: "paymentMethods", type: "array", required: true, description: "Payment options" }],
        variations: ["stripe", "paypal", "crypto"],
        industries: ["ecommerce", "saas", "service"],
    },

    SocialFeed: {
        name: "SocialFeed",
        category: "advanced",
        description: "Social media feed integration",
        props: [{ name: "socialPlatforms", type: "array", required: true, description: "Social platforms" }],
        variations: ["instagram", "twitter", "mixed"],
        industries: ["social", "marketing", "personal"],
    },
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
    return Object.values(COMPREHENSIVE_COMPONENT_LIBRARY).filter((comp) => comp.category === category)
}

export function getComponentsByIndustry(industry: string): ComponentDefinition[] {
    return Object.values(COMPREHENSIVE_COMPONENT_LIBRARY).filter((comp) => comp.industries.includes(industry))
}

export function getAllComponents(): ComponentDefinition[] {
    return Object.values(COMPREHENSIVE_COMPONENT_LIBRARY)
}

export function getComponentCategories(): string[] {
    return [...new Set(Object.values(COMPREHENSIVE_COMPONENT_LIBRARY).map((comp) => comp.category))]
}
