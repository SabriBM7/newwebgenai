import type { Website } from "@/types"

export const techStartupTemplate: Website = {
    metadata: {
        title: "InnovateTech - Cutting-Edge Software Solutions",
        description: "Innovative software solutions for modern businesses",
        businessName: "InnovateTech",
        industry: "Technology",
        style: "Modern",
        primaryColor: "#6366F1",
        secondaryColor: "#10B981",
        fontPrimary: "Inter",
        fontSecondary: "Poppins",
    },
    header: {
        type: "header",
        variant: "saas",
        props: {
            logo: "InnovateTech",
            logoType: "text",
            menu: [
                { label: "Home", link: "#" },
                { label: "Products", link: "#products" },
                { label: "Solutions", link: "#solutions" },
                { label: "Pricing", link: "#pricing" },
                { label: "About", link: "#about" },
            ],
            cta: { label: "Get Started", link: "#contact" },
            sticky: true,
            transparent: false,
        },
    },
    hero: {
        type: "hero",
        variant: "split",
        props: {
            title: "Transform Your Business with AI-Powered Solutions",
            subtitle: "Intelligent software for the modern enterprise",
            description:
                "Our cutting-edge AI platform helps businesses automate processes, gain insights from data, and make better decisions faster than ever before.",
            image: "/placeholder.svg?height=600&width=800&text=Tech+Product+Dashboard",
            imageAlt: "AI-powered dashboard interface",
            primaryButton: { label: "Start Free Trial", link: "#trial" },
            secondaryButton: { label: "Watch Demo", link: "#demo" },
            backgroundType: "gradient",
            backgroundGradient: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
            alignment: "left",
        },
    },
    sections: [
        {
            type: "features",
            variant: "grid",
            props: {
                title: "Powerful Features",
                subtitle: "Everything you need to succeed",
                features: [
                    {
                        title: "AI-Powered Analytics",
                        description: "Gain deep insights from your data with our advanced machine learning algorithms.",
                        icon: "bar-chart",
                    },
                    {
                        title: "Seamless Integration",
                        description: "Connects with your existing tools and workflows with minimal setup.",
                        icon: "puzzle",
                    },
                    {
                        title: "Real-time Collaboration",
                        description: "Work together with your team in real-time, from anywhere in the world.",
                        icon: "users",
                    },
                    {
                        title: "Enterprise Security",
                        description: "Bank-level security ensures your data is always protected.",
                        icon: "shield",
                    },
                ],
                backgroundColor: "#FFFFFF",
                textColor: "#333333",
            },
        },
        {
            type: "testimonials",
            variant: "cards",
            props: {
                title: "Trusted by Innovative Companies",
                subtitle: "See what our customers have to say",
                testimonials: [
                    {
                        quote:
                            "InnovateTech's platform has completely transformed how we analyze customer data. We've seen a 40% increase in conversion rates since implementation.",
                        author: "Sarah Johnson",
                        role: "CTO",
                        company: "TechCorp",
                        avatar: "/placeholder.svg?height=100&width=100&text=SJ",
                        rating: 5,
                    },
                    {
                        quote:
                            "The AI capabilities are truly next-level. We're making better decisions faster, and our team is more productive than ever.",
                        author: "Michael Chen",
                        role: "Director of Operations",
                        company: "Global Solutions",
                        avatar: "/placeholder.svg?height=100&width=100&text=MC",
                        rating: 5,
                    },
                ],
                backgroundColor: "#F9FAFB",
                textColor: "#333333",
            },
        },
        {
            type: "pricing",
            variant: "cards",
            props: {
                title: "Simple, Transparent Pricing",
                subtitle: "Choose the plan that works for you",
                plans: [
                    {
                        name: "Starter",
                        price: "$49",
                        billing: "monthly",
                        description: "Perfect for small teams and startups",
                        features: ["Up to 5 users", "Basic analytics", "24/7 support", "API access", "1GB storage"],
                        cta: { label: "Get Started", link: "#" },
                        popular: false,
                    },
                    {
                        name: "Pro",
                        price: "$99",
                        billing: "monthly",
                        description: "Ideal for growing businesses",
                        features: [
                            "Up to 20 users",
                            "Advanced analytics",
                            "Priority support",
                            "API access",
                            "10GB storage",
                            "Custom integrations",
                        ],
                        cta: { label: "Get Started", link: "#" },
                        popular: true,
                        highlighted: true,
                    },
                    {
                        name: "Enterprise",
                        price: "Custom",
                        billing: "monthly",
                        description: "For large organizations with specific needs",
                        features: [
                            "Unlimited users",
                            "Enterprise analytics",
                            "Dedicated support",
                            "API access",
                            "Unlimited storage",
                            "Custom integrations",
                            "On-premise option",
                        ],
                        cta: { label: "Contact Sales", link: "#" },
                        popular: false,
                    },
                ],
                backgroundColor: "#FFFFFF",
                textColor: "#333333",
            },
        },
        {
            type: "cta",
            variant: "split",
            props: {
                title: "Ready to Transform Your Business?",
                description: "Join thousands of companies already using our platform to drive growth and innovation.",
                primaryButton: { label: "Start Free Trial", link: "#trial" },
                secondaryButton: { label: "Schedule Demo", link: "#demo" },
                image: "/placeholder.svg?height=600&width=800&text=Product+Demo",
                backgroundColor: "#6366F1",
                textColor: "#FFFFFF",
            },
        },
    ],
    footer: {
        type: "footer",
        variant: "multicolumn",
        props: {
            logo: "InnovateTech",
            tagline: "Intelligent software for the modern enterprise",
            copyright: "© 2023 InnovateTech, Inc. All rights reserved.",
            columns: [
                {
                    title: "Product",
                    links: [
                        { label: "Features", link: "#" },
                        { label: "Pricing", link: "#" },
                        { label: "Integrations", link: "#" },
                        { label: "Changelog", link: "#" },
                    ],
                },
                {
                    title: "Resources",
                    links: [
                        { label: "Documentation", link: "#" },
                        { label: "Guides", link: "#" },
                        { label: "API Reference", link: "#" },
                        { label: "Blog", link: "#" },
                    ],
                },
                {
                    title: "Company",
                    links: [
                        { label: "About", link: "#" },
                        { label: "Careers", link: "#" },
                        { label: "Contact", link: "#" },
                        { label: "Press", link: "#" },
                    ],
                },
            ],
            socialLinks: [
                { platform: "Twitter", link: "#", icon: "twitter" },
                { platform: "LinkedIn", link: "#", icon: "linkedin" },
                { platform: "GitHub", link: "#", icon: "github" },
            ],
            backgroundColor: "#1F2937",
            textColor: "#FFFFFF",
        },
    },
}
