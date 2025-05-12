import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { query } = await request.json()

        // This is a mock response. In a real implementation, you would call your AI service here.
        const mockResponse = generateMockWebsite(query)

        return NextResponse.json(mockResponse)
    } catch (error) {
        console.error("Error generating website:", error)
        return NextResponse.json({ error: "Failed to generate website" }, { status: 500 })
    }
}

function generateMockWebsite(query: string) {
    // Extract keywords from the query to customize the response
    const keywords = query.toLowerCase()

    let title = "My Website"
    let subtitle = "Welcome to our platform"
    let industry = "technology"

    if (keywords.includes("saas") || keywords.includes("software")) {
        title = "SaaS Platform"
        subtitle = "Powerful software solutions for your business"
        industry = "saas"
    } else if (keywords.includes("ecommerce") || keywords.includes("shop") || keywords.includes("store")) {
        title = "Online Store"
        subtitle = "Quality products delivered to your doorstep"
        industry = "ecommerce"
    } else if (keywords.includes("portfolio") || keywords.includes("photographer")) {
        title = "Creative Portfolio"
        subtitle = "Showcasing my best work"
        industry = "creative"
    } else if (keywords.includes("blog") || keywords.includes("news")) {
        title = "The Blog"
        subtitle = "Latest insights and updates"
        industry = "blog"
    }

    return {
        title: title,
        description: `A ${industry} website generated based on: "${query}"`,
        components: [
            {
                type: "header",
                props: {
                    title: title,
                    logo: "Logo",
                    menu: [
                        { label: "Home", url: "#" },
                        { label: "Features", url: "#features" },
                        { label: "Pricing", url: "#pricing" },
                        { label: "Contact", url: "#contact" },
                    ],
                },
            },
            {
                type: "hero",
                props: {
                    title: title,
                    subtitle: subtitle,
                    cta: "Get Started",
                    image: null,
                },
            },
            {
                type: "features",
                props: {
                    title: "Key Features",
                    features: [
                        {
                            icon: "✨",
                            title: "Feature 1",
                            description: "Description of feature 1 tailored to your needs.",
                        },
                        {
                            icon: "🚀",
                            title: "Feature 2",
                            description: "Description of feature 2 tailored to your needs.",
                        },
                        {
                            icon: "🔒",
                            title: "Feature 3",
                            description: "Description of feature 3 tailored to your needs.",
                        },
                    ],
                },
            },
            {
                type: "testimonials",
                props: {
                    title: "What Our Customers Say",
                    testimonials: [
                        {
                            quote: "This product has transformed how we work. Highly recommended!",
                            name: "Jane Smith",
                            title: "CEO, Company Inc.",
                        },
                        {
                            quote: "The best solution we've found after trying many alternatives.",
                            name: "John Doe",
                            title: "CTO, Tech Corp",
                        },
                    ],
                },
            },
            {
                type: "cta",
                props: {
                    title: "Ready to Get Started?",
                    subtitle: "Join thousands of satisfied customers today.",
                    buttonText: "Sign Up Now",
                },
            },
            {
                type: "footer",
                props: {
                    copyright: `© ${new Date().getFullYear()} ${title}. All rights reserved.`,
                    links: [
                        { label: "Privacy Policy", url: "#" },
                        { label: "Terms of Service", url: "#" },
                        { label: "Contact Us", url: "#" },
                    ],
                },
            },
        ],
    }
}
