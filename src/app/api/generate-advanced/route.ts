import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { websiteName, industry, style, description } = body

        console.log("🚀 Advanced Generation Request:", { websiteName, industry, style, description })

        // Generate comprehensive website components
        const components = generateComprehensiveComponents(industry, style, websiteName, description)

        const websiteData = {
            websiteName,
            industry,
            style,
            description,
            components,
            generatedAt: new Date().toISOString(),
        }

        console.log(`✅ Generated ${components.length} components successfully`)

        return NextResponse.json({
            success: true,
            data: websiteData,
        })
    } catch (error) {
        console.error("❌ Generation error:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}

function generateComprehensiveComponents(industry: string, style: string, websiteName: string, description: string) {
    const components = []

    // 1. Header
    components.push({
        type: style === "luxury" ? "CorporateHeader" : style === "creative" ? "CreativeHeader" : "MinimalistHeader",
        props: {
            logo: websiteName,
            navigation: getNavigation(industry),
        },
    })

    // 2. Hero
    components.push({
        type: style === "luxury" ? "CorporateHero" : style === "creative" ? "CreativeHero" : "BusinessHero",
        props: {
            title: websiteName,
            subtitle: getSubtitle(industry),
            description: description,
            buttonText: getCTA(industry),
        },
    })

    // 3. Industry-specific component
    if (industry === "restaurant") {
        components.push({
            type: "MenuSection",
            props: {
                title: "Our Menu",
                subtitle: "Delicious Italian Cuisine",
                categories: [
                    {
                        name: "Appetizers",
                        items: [
                            { name: "Bruschetta", price: "$8.99", description: "Fresh tomatoes, garlic, and herbs" },
                            { name: "Antipasto", price: "$12.99", description: "Selection of cured meats and cheeses" },
                        ],
                    },
                    {
                        name: "Main Courses",
                        items: [
                            { name: "Signature Pasta", price: "$18.99", description: "Homemade pasta with marinara" },
                            { name: "Margherita Pizza", price: "$16.99", description: "Fresh mozzarella and basil" },
                        ],
                    },
                ],
            },
        })
    }

    // 4. About Section
    components.push({
        type: "AboutSection",
        props: {
            title: "About Us",
            content: `${websiteName} ${description} We are committed to excellence and customer satisfaction.`,
            stats: [
                { label: "Years Experience", value: "15+" },
                { label: "Happy Customers", value: "1000+" },
                { label: "Projects Completed", value: "500+" },
            ],
        },
    })

    // 5. Features
    components.push({
        type: "MinimalistFeatures",
        props: {
            title: "Why Choose Us",
            features: getFeatures(industry),
        },
    })

    // 6. Gallery
    components.push({
        type: "AdvancedGallery",
        props: {
            title: "Gallery",
            subtitle: "See our work",
            images: Array.from({ length: 6 }, (_, i) => ({
                src: `/placeholder.svg?height=300&width=400`,
                alt: `Gallery ${i + 1}`,
            })),
        },
    })

    // 7. Testimonials
    components.push({
        type: "AdvancedTestimonials",
        props: {
            title: "What Our Clients Say",
            testimonials: [
                {
                    name: "Sarah Johnson",
                    content: "Excellent service and quality!",
                    rating: 5,
                },
                {
                    name: "Mike Chen",
                    content: "Highly recommended!",
                    rating: 5,
                },
            ],
        },
    })

    // 8. Contact
    components.push({
        type: "ContactSection",
        props: {
            title: "Contact Us",
            contactInfo: {
                phone: "(555) 123-4567",
                email: "info@example.com",
                address: "123 Business St, City, State",
            },
        },
    })

    // 9. Footer
    components.push({
        type: style === "luxury" ? "CorporateFooter" : "ModernFooter",
        props: {
            companyName: websiteName,
            copyrightText: `© 2024 ${websiteName}. All rights reserved.`,
        },
    })

    return components
}

function getNavigation(industry: string) {
    if (industry === "restaurant") {
        return [
            { label: "Home", href: "#home" },
            { label: "Menu", href: "#menu" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
        ]
    }
    return [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
    ]
}

function getSubtitle(industry: string) {
    const subtitles = {
        restaurant: "Authentic Italian Cuisine & Exceptional Dining",
        healthcare: "Quality Healthcare Services",
        technology: "Innovative Technology Solutions",
        default: "Professional Services",
    }
    return subtitles[industry as keyof typeof subtitles] || subtitles.default
}

function getCTA(industry: string) {
    const ctas = {
        restaurant: "View Menu",
        healthcare: "Book Appointment",
        technology: "Get Started",
        default: "Learn More",
    }
    return ctas[industry as keyof typeof ctas] || ctas.default
}

function getFeatures(industry: string) {
    if (industry === "restaurant") {
        return [
            { title: "Fresh Ingredients", description: "Daily sourced ingredients" },
            { title: "Expert Chefs", description: "Experienced culinary team" },
            { title: "Cozy Atmosphere", description: "Warm dining environment" },
        ]
    }
    return [
        { title: "Quality Service", description: "Top-notch service delivery" },
        { title: "Expert Team", description: "Experienced professionals" },
        { title: "Customer Focus", description: "Client satisfaction first" },
    ]
}
