// src/lib/dataset.ts

export const COMPONENT_TYPES = {
    HEADER: "header",
    HERO: "hero",
    FEATURES: "features",
    TESTIMONIALS: "testimonials",
    CTA: "cta",
    FOOTER: "footer",
}

export const HEADER_VARIANTS = {
    CREATIVE: "creative",
    CORPORATE: "corporate",
    MINIMAL: "minimal",
    ECOMMERCE: "ecommerce",
    EDUCATION: "education",
    SAAS: "saas",
}

export const HERO_VARIANTS = {
    STANDARD: "standard",
    SPLIT: "split",
    CENTERED: "centered",
    BACKGROUND_IMAGE: "background-image",
    ANIMATED: "animated",
}

export const FEATURES_VARIANTS = {
    GRID: "grid",
    CARDS: "cards",
    ICONS: "icons",
    STEPS: "steps",
}

export const TESTIMONIALS_VARIANTS = {
    CARDS: "cards",
    QUOTES: "quotes",
    SIMPLE: "simple",
    CAROUSEL: "carousel",
}

export const CTA_VARIANTS = {
    SIMPLE: "simple",
    SPLIT: "split",
    BACKGROUND: "background",
    BOX: "box",
}

export const FOOTER_VARIANTS = {
    SIMPLE: "simple",
    MULTI_COLUMN: "multi-column",
    CENTERED: "centered",
    DARK: "dark",
}

// Sample dataset for component props
export const sampleDataset = [
    {
        component: COMPONENT_TYPES.HEADER,
        variant: HEADER_VARIANTS.CREATIVE,
        props: {
            logo: "CreativeCo",
            logoUrl: "/placeholder.svg?height=40&width=40&text=C",
            backgroundColor: "#ffffff",
            textColor: "#333333",
            menu: [
                { label: "Home", link: "#home" },
                { label: "Services", link: "#services" },
                { label: "Portfolio", link: "#portfolio" },
                { label: "Contact", link: "#contact" },
            ],
            keywords: ["creative", "design", "innovation", "portfolio", "agency", "studio"],
        },
    },
    {
        component: COMPONENT_TYPES.HEADER,
        variant: HEADER_VARIANTS.CORPORATE,
        props: {
            logo: "BizCorp",
            logoUrl: "/placeholder.svg?height=40&width=40&text=B",
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            menu: [
                { label: "About", link: "#about" },
                { label: "Services", link: "#services" },
                { label: "Case Studies", link: "#case-studies" },
                { label: "Contact", link: "#contact" },
            ],
            keywords: ["business", "enterprise", "professional", "corporate", "company", "firm", "consulting"],
            contactInfo: {
                phone: "+1 (555) 123-4567",
                email: "info@bizcorp.com",
            },
            buttonText: "Get Started",
            topBar: true,
        },
    },
    {
        component: COMPONENT_TYPES.HERO,
        variant: HERO_VARIANTS.STANDARD,
        props: {
            title: "Create Beautiful Websites",
            subtitle: "Powered by AI and Your Imagination",
            description: "Our platform helps you build stunning websites in minutes without any coding knowledge required.",
            buttonText: "Get Started",
            buttonLink: "#get-started",
            secondaryButtonText: "Learn More",
            secondaryButtonLink: "#learn-more",
            imageUrl: "/placeholder.svg?height=600&width=600&text=Hero+Image",
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            keywords: ["saas", "software", "platform", "tool", "app", "application", "service"],
        },
    },
    {
        component: COMPONENT_TYPES.HERO,
        variant: HERO_VARIANTS.SPLIT,
        props: {
            title: "Transform Your Business Online",
            subtitle: "Enterprise Solutions for Digital Growth",
            description:
                "Our enterprise-grade platform provides the tools and support you need to succeed in the digital landscape.",
            buttonText: "Schedule Demo",
            buttonLink: "#demo",
            secondaryButtonText: "Contact Sales",
            secondaryButtonLink: "#contact",
            imageUrl: "/placeholder.svg?height=600&width=600&text=Enterprise+Solutions",
            backgroundColor: "#f8fafc",
            textColor: "#0f172a",
            imagePosition: "right",
            keywords: ["business", "enterprise", "corporate", "company", "professional", "b2b", "solutions"],
        },
    },
    {
        component: COMPONENT_TYPES.FEATURES,
        variant: FEATURES_VARIANTS.GRID,
        props: {
            title: "Powerful Features",
            subtitle: "Everything you need to succeed",
            features: [
                {
                    title: "AI-Powered Design",
                    description: "Our AI suggests the best designs based on your industry and preferences.",
                    icon: "Sparkles",
                },
                {
                    title: "Drag & Drop Editor",
                    description: "Easily customize your website with our intuitive drag and drop interface.",
                    icon: "Layers",
                },
                {
                    title: "Mobile Responsive",
                    description: "All websites are fully responsive and look great on any device.",
                    icon: "Smartphone",
                },
                {
                    title: "SEO Optimized",
                    description: "Built-in SEO tools to help your website rank higher in search results.",
                    icon: "Search",
                },
                {
                    title: "Fast Performance",
                    description: "Optimized for speed to provide the best user experience.",
                    icon: "Zap",
                },
                {
                    title: "24/7 Support",
                    description: "Our team is always available to help you with any questions.",
                    icon: "HeadphonesIcon",
                },
            ],
            columns: 3,
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            keywords: ["features", "capabilities", "tools", "functionality", "benefits", "advantages"],
        },
    },
    // Add an ecommerce header
    {
        component: COMPONENT_TYPES.HEADER,
        variant: HEADER_VARIANTS.ECOMMERCE,
        props: {
            logo: "ShopNow",
            logoUrl: "/placeholder.svg?height=40&width=40&text=S",
            backgroundColor: "#ffffff",
            textColor: "#333333",
            menu: [
                { label: "Home", link: "#home" },
                { label: "Shop", link: "#shop" },
                { label: "Categories", link: "#categories" },
                { label: "Cart", link: "#cart" },
                { label: "Account", link: "#account" },
            ],
            keywords: ["ecommerce", "shop", "store", "retail", "products", "shopping", "online store", "marketplace"],
        },
    },

    // Add an education header
    {
        component: COMPONENT_TYPES.HEADER,
        variant: HEADER_VARIANTS.EDUCATION,
        props: {
            logo: "LearnHub",
            logoUrl: "/placeholder.svg?height=40&width=40&text=L",
            backgroundColor: "#f8fafc",
            textColor: "#0f172a",
            menu: [
                { label: "Home", link: "#home" },
                { label: "Courses", link: "#courses" },
                { label: "Resources", link: "#resources" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            keywords: [
                "education",
                "learning",
                "courses",
                "school",
                "university",
                "academic",
                "students",
                "training",
                "teaching",
            ],
        },
    },

    // Add a SaaS header
    {
        component: COMPONENT_TYPES.HEADER,
        variant: HEADER_VARIANTS.SAAS,
        props: {
            logo: "SaaSPro",
            logoUrl: "/placeholder.svg?height=40&width=40&text=S",
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            menu: [
                { label: "Home", link: "#home" },
                { label: "Features", link: "#features" },
                { label: "Pricing", link: "#pricing" },
                { label: "Documentation", link: "#docs" },
                { label: "Contact", link: "#contact" },
            ],
            keywords: [
                "saas",
                "software",
                "app",
                "technology",
                "cloud",
                "service",
                "platform",
                "tech",
                "digital",
                "solution",
            ],
        },
    },

    // Add a centered hero
    {
        component: COMPONENT_TYPES.HERO,
        variant: HERO_VARIANTS.CENTERED,
        props: {
            title: "Your Vision, Our Expertise",
            subtitle: "Building the Future Together",
            description:
                "We combine innovative technology with industry expertise to create solutions that drive your business forward.",
            buttonText: "Get Started",
            buttonLink: "#get-started",
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            keywords: ["business", "corporate", "professional", "enterprise", "company", "services", "solutions"],
        },
    },

    // Add a background image hero
    {
        component: COMPONENT_TYPES.HERO,
        variant: HERO_VARIANTS.BACKGROUND_IMAGE,
        props: {
            title: "Discover Your Style",
            subtitle: "Fashion That Speaks For You",
            description:
                "Explore our latest collection of trendy and timeless pieces designed to elevate your personal style.",
            buttonText: "Shop Now",
            buttonLink: "#shop",
            imageUrl: "/placeholder.svg?height=800&width=1600&text=Fashion+Collection",
            overlayColor: "rgba(0,0,0,0.5)",
            textColor: "#ffffff",
            keywords: ["fashion", "clothing", "style", "ecommerce", "shop", "retail", "products", "apparel"],
        },
    },

    // Add an animated hero
    {
        component: COMPONENT_TYPES.HERO,
        variant: HERO_VARIANTS.ANIMATED,
        props: {
            title: "Innovate. Create. Elevate.",
            subtitle: "Cutting-Edge Technology Solutions",
            description: "Our platform leverages the latest technologies to help you stay ahead of the competition.",
            buttonText: "Explore Solutions",
            buttonLink: "#solutions",
            backgroundColor: "#f8fafc",
            textColor: "#0f172a",
            animationType: "fade-in",
            keywords: ["technology", "innovation", "software", "digital", "tech", "saas", "app", "startup"],
        },
    },

    // Add a cards features section
    {
        component: COMPONENT_TYPES.FEATURES,
        variant: FEATURES_VARIANTS.CARDS,
        props: {
            title: "Why Choose Us",
            subtitle: "Benefits that set us apart",
            features: [
                {
                    title: "Premium Quality",
                    description: "All our products are made with the highest quality materials and craftsmanship.",
                    icon: "Award",
                },
                {
                    title: "Fast Shipping",
                    description: "Get your orders delivered quickly with our expedited shipping options.",
                    icon: "Truck",
                },
                {
                    title: "Secure Payments",
                    description: "Shop with confidence knowing your transactions are protected.",
                    icon: "Shield",
                },
                {
                    title: "24/7 Support",
                    description: "Our customer service team is always available to assist you.",
                    icon: "HeadphonesIcon",
                },
            ],
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            keywords: ["ecommerce", "shop", "store", "retail", "products", "benefits", "features", "advantages"],
        },
    },

    // Add an icons features section
    {
        component: COMPONENT_TYPES.FEATURES,
        variant: FEATURES_VARIANTS.ICONS,
        props: {
            title: "Our Services",
            subtitle: "Comprehensive solutions for your needs",
            features: [
                {
                    title: "Web Development",
                    description: "Custom websites built to meet your specific business requirements.",
                    icon: "Code",
                },
                {
                    title: "Mobile Apps",
                    description: "Native and cross-platform mobile applications for iOS and Android.",
                    icon: "Smartphone",
                },
                {
                    title: "UI/UX Design",
                    description: "User-centered design that enhances user experience and engagement.",
                    icon: "Palette",
                },
                {
                    title: "Digital Marketing",
                    description: "Strategic marketing campaigns to increase your online presence.",
                    icon: "TrendingUp",
                },
            ],
            backgroundColor: "#f8fafc",
            textColor: "#0f172a",
            keywords: ["services", "business", "agency", "professional", "corporate", "company", "consulting"],
        },
    },

    // Add a steps features section
    {
        component: COMPONENT_TYPES.FEATURES,
        variant: FEATURES_VARIANTS.STEPS,
        props: {
            title: "How It Works",
            subtitle: "Simple steps to get started",
            features: [
                {
                    title: "Sign Up",
                    description: "Create your account in just a few minutes.",
                    icon: "UserPlus",
                    step: 1,
                },
                {
                    title: "Customize",
                    description: "Configure your settings according to your preferences.",
                    icon: "Settings",
                    step: 2,
                },
                {
                    title: "Integrate",
                    description: "Connect with your existing tools and platforms.",
                    icon: "Link",
                    step: 3,
                },
                {
                    title: "Launch",
                    description: "Go live and start seeing results immediately.",
                    icon: "Rocket",
                    step: 4,
                },
            ],
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            keywords: ["saas", "software", "app", "platform", "process", "steps", "how it works", "guide"],
        },
    },

    // Add a testimonials section
    {
        component: COMPONENT_TYPES.TESTIMONIALS,
        variant: TESTIMONIALS_VARIANTS.CARDS,
        props: {
            title: "What Our Customers Say",
            subtitle: "Trusted by businesses worldwide",
            testimonials: [
                {
                    quote: "This platform has completely transformed how we manage our online presence. Highly recommended!",
                    author: "Sarah Johnson",
                    role: "Marketing Director",
                    company: "TechCorp",
                    avatarUrl: "/placeholder.svg?height=80&width=80&text=SJ",
                },
                {
                    quote: "The ease of use and powerful features make this the best solution we've ever used.",
                    author: "Michael Chen",
                    role: "CEO",
                    company: "Innovate Inc.",
                    avatarUrl: "/placeholder.svg?height=80&width=80&text=MC",
                },
                {
                    quote: "Customer support is outstanding. They're always there when you need them.",
                    author: "Emily Rodriguez",
                    role: "Operations Manager",
                    company: "Global Solutions",
                    avatarUrl: "/placeholder.svg?height=80&width=80&text=ER",
                },
            ],
            backgroundColor: "#f8fafc",
            textColor: "#0f172a",
            keywords: ["testimonials", "reviews", "feedback", "customers", "clients", "trust", "social proof"],
        },
    },

    // Add a CTA section
    {
        component: COMPONENT_TYPES.CTA,
        variant: CTA_VARIANTS.SIMPLE,
        props: {
            title: "Ready to Get Started?",
            description: "Join thousands of satisfied customers who have transformed their business with our platform.",
            buttonText: "Sign Up Now",
            buttonLink: "#signup",
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            keywords: ["cta", "call to action", "conversion", "signup", "register", "join", "get started"],
        },
    },

    // Add a footer
    {
        component: COMPONENT_TYPES.FOOTER,
        variant: FOOTER_VARIANTS.MULTI_COLUMN,
        props: {
            logo: "YourBrand",
            logoUrl: "/placeholder.svg?height=40&width=40&text=YB",
            columns: [
                {
                    title: "Product",
                    links: [
                        { label: "Features", url: "#features" },
                        { label: "Pricing", url: "#pricing" },
                        { label: "Testimonials", url: "#testimonials" },
                        { label: "FAQ", url: "#faq" },
                    ],
                },
                {
                    title: "Company",
                    links: [
                        { label: "About Us", url: "#about" },
                        { label: "Careers", url: "#careers" },
                        { label: "Blog", url: "#blog" },
                        { label: "Contact", url: "#contact" },
                    ],
                },
                {
                    title: "Resources",
                    links: [
                        { label: "Documentation", url: "#docs" },
                        { label: "Guides", url: "#guides" },
                        { label: "Support", url: "#support" },
                        { label: "API", url: "#api" },
                    ],
                },
                {
                    title: "Legal",
                    links: [
                        { label: "Privacy Policy", url: "#privacy" },
                        { label: "Terms of Service", url: "#terms" },
                        { label: "Cookie Policy", url: "#cookies" },
                    ],
                },
            ],
            socialLinks: [
                { platform: "twitter", url: "#twitter" },
                { platform: "facebook", url: "#facebook" },
                { platform: "instagram", url: "#instagram" },
                { platform: "linkedin", url: "#linkedin" },
            ],
            copyright: `© ${new Date().getFullYear()} YourBrand. All rights reserved.`,
            backgroundColor: "#0f172a",
            textColor: "#ffffff",
            keywords: ["footer", "contact", "social", "links", "company", "information", "legal"],
        },
    },
]
