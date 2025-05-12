export interface Template {
    id: string
    name: string
    description: string
    thumbnail?: string
    keywords?: string[]
    headerProps: any
    heroProps: any
    type: "tech" | "creative" | "corporate"
}

export function getTemplates(): Template[] {
    return [
        {
            id: "tech-startup",
            name: "Tech Startup",
            description: "Modern design for tech startups and SaaS products",
            thumbnail: "/placeholder.svg?height=400&width=600",
            keywords: ["technology", "startup", "modern"],
            type: "tech",
            headerProps: {
                logo: "TechSolutions",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "Features", link: "#features" },
                    { label: "Pricing", link: "#pricing" },
                    { label: "Documentation", link: "#docs" },
                    {
                        label: "Resources",
                        link: "#",
                        subItems: [
                            { label: "Blog", link: "#blog" },
                            { label: "Tutorials", link: "#tutorials" },
                        ],
                    },
                ],
                keywords: ["technology", "solutions", "innovative"],
                style: "modern",
                backgroundColor: "#0f172a",
                textColor: "#ffffff",
                sticky: true,
                glassEffect: true,
            },
            heroProps: {
                title: "Build Powerful AI Solutions",
                subtitle: "Accelerate your business with cutting-edge technology",
                description:
                    "Our platform helps you leverage artificial intelligence to solve complex problems and drive innovation across your organization.",
                backgroundColor: "#0f172a",
                textColor: "#ffffff",
                buttons: [
                    { label: "Get Started", link: "#", type: "primary" },
                    { label: "Watch Demo", link: "#", type: "outline" },
                ],
                imageUrl: "/placeholder.svg?height=400&width=600",
                keywords: ["technology", "innovation", "AI"],
                showStats: true,
                gradientText: true,
            },
        },
        {
            id: "creative-portfolio",
            name: "Creative Portfolio",
            description: "Artistic design for creative professionals and agencies",
            thumbnail: "/placeholder.svg?height=400&width=600",
            keywords: ["creative", "portfolio", "design"],
            type: "creative",
            headerProps: {
                logo: "DesignStudio",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "Portfolio", link: "#portfolio" },
                    { label: "About", link: "#about" },
                    { label: "Services", link: "#services" },
                    { label: "Contact", link: "#contact" },
                ],
                keywords: ["creative", "design", "artistic"],
                style: "creative",
                backgroundColor: "#ffffff",
                textColor: "#333333",
                colorAccent: "#ff6b6b",
                searchEnabled: true,
                logoAnimation: true,
            },
            heroProps: {
                title: "Bringing Ideas to Life",
                subtitle: "Creative solutions for modern brands",
                description:
                    "We craft beautiful, functional designs that help your brand stand out in today's competitive landscape.",
                backgroundColor: "#ffffff",
                textColor: "#333333",
                buttons: [
                    { label: "View Portfolio", link: "#", type: "primary" },
                    { label: "Our Process", link: "#", type: "outline" },
                ],
                imageUrl: "/placeholder.svg?height=400&width=600",
                keywords: ["creative", "design", "branding"],
                colorAccent: "#ff6b6b",
                showParticles: true,
                imageStyle: "angled",
                titleEffect: "highlight",
                decorativeElements: true,
            },
        },
        {
            id: "corporate-business",
            name: "Corporate Business",
            description: "Professional design for enterprises and businesses",
            thumbnail: "/placeholder.svg?height=400&width=600",
            keywords: ["business", "corporate", "professional"],
            type: "corporate",
            headerProps: {
                logo: "BizCorp",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "About Us", link: "#about" },
                    { label: "Services", link: "#services" },
                    { label: "Case Studies", link: "#case-studies" },
                    {
                        label: "Industries",
                        link: "#",
                        subItems: [
                            { label: "Healthcare", link: "#healthcare" },
                            { label: "Finance", link: "#finance" },
                        ],
                    },
                    { label: "Contact", link: "#contact" },
                ],
                keywords: ["business", "enterprise", "professional"],
                style: "corporate",
                backgroundColor: "#ffffff",
                textColor: "#333333",
                topBar: true,
                contactInfo: {
                    phone: "+1 (555) 123-4567",
                    email: "info@bizcorp.com",
                },
                shadow: true,
            },
            heroProps: {
                title: "Enterprise Solutions for Global Businesses",
                subtitle: "Driving transformation and growth",
                description:
                    "We provide comprehensive business solutions that help enterprises optimize operations, reduce costs, and accelerate growth.",
                backgroundColor: "#f8f9fa",
                textColor: "#333333",
                buttons: [
                    { label: "Request Demo", link: "#", type: "primary" },
                    { label: "Case Studies", link: "#", type: "outline" },
                ],
                imageUrl: "/placeholder.svg?height=400&width=600",
                keywords: ["enterprise", "business", "solutions"],
                showTrustBadges: true,
                showBulletPoints: true,
                showCta: true,
                shadow: true,
            },
        },
    ]
}

export function getTemplateById(id: string): Template | undefined {
    return getTemplates().find((template) => template.id === id)
}