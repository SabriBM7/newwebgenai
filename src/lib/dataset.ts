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
            keywords: ["creative", "design", "innovation"],
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
            keywords: ["business", "enterprise", "professional"],
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
        },
    },
]
