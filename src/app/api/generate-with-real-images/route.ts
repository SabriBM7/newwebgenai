import { type NextRequest, NextResponse } from "next/server"
import { unsplashService } from "@/lib/unsplash-service"

interface WebsiteGenerationParams {
    description: string
    websiteName: string
    industry: string
    style: string
    aiProvider: string
    includeImages?: boolean
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

export async function POST(request: NextRequest) {
    try {
        const params: WebsiteGenerationParams = await request.json()
        console.log("🚀 Generating website with real images:", params)

        // Generate the basic website structure
        const websiteData = createEnhancedWebsiteStructure(params)

        // Add real images if Unsplash is configured and requested
        if (params.includeImages && unsplashService.isConfigured()) {
            try {
                console.log("🖼️ Adding real images from Unsplash...")
                const enhancedData = await addRealImagesToWebsite(websiteData, params)
                console.log("✅ Successfully added real images")

                return NextResponse.json({
                    success: true,
                    data: enhancedData,
                    imagesUsed: "unsplash",
                    message: "Website generated with real images from Unsplash!",
                })
            } catch (imageError) {
                console.error("⚠️ Error adding real images:", imageError)
                // Fall back to placeholder images
                return NextResponse.json({
                    success: true,
                    data: websiteData,
                    imagesUsed: "placeholder",
                    message: "Website generated with placeholder images (Unsplash error)",
                })
            }
        } else {
            console.log("📄 Using placeholder images")
            return NextResponse.json({
                success: true,
                data: websiteData,
                imagesUsed: "placeholder",
                message: "Website generated with placeholder images",
            })
        }
    } catch (error) {
        console.error("❌ Error generating website:", error)

        return NextResponse.json({
            success: false,
            error: `Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        })
    }
}

async function addRealImagesToWebsite(websiteData: any, params: WebsiteGenerationParams) {
    const { industry, websiteName } = params

    // Get industry-specific images
    const [heroImages, galleryImages, teamImages, testimonialImages] = await Promise.all([
        unsplashService.searchImages({
            query: `${industry} business professional hero`,
            perPage: 1,
            orientation: "landscape",
        }),
        unsplashService.getIndustryImages(industry, 6),
        unsplashService.searchImages({
            query: "professional headshot business person",
            perPage: 4,
            orientation: "squarish",
        }),
        unsplashService.searchImages({
            query: "happy customer portrait professional",
            perPage: 3,
            orientation: "squarish",
        }),
    ])

    // Clone the website data
    const enhancedData = JSON.parse(JSON.stringify(websiteData))

    // Replace images in components
    enhancedData.components.forEach((component: any, index: number) => {
        switch (component.type) {
            case "HeroSection":
                if (heroImages.length > 0) {
                    component.props.image = heroImages[0].url
                    component.props.imageAlt = heroImages[0].alt
                }
                break

            case "AboutSection":
                if (galleryImages.length > 0) {
                    component.props.image = galleryImages[0].url
                    component.props.imageAlt = galleryImages[0].alt
                }
                break

            case "GallerySection":
                if (galleryImages.length > 0) {
                    component.props.images = galleryImages.slice(0, 6).map((img) => ({
                        src: img.url,
                        alt: img.alt,
                    }))
                }
                break

            case "TeamSection":
                if (teamImages.length > 0) {
                    component.props.members = component.props.members?.map((member: any, idx: number) => ({
                        ...member,
                        image: teamImages[idx % teamImages.length]?.url || member.image,
                    }))
                }
                break

            case "TestimonialsSection":
                if (testimonialImages.length > 0) {
                    component.props.testimonials = component.props.testimonials?.map((testimonial: any, idx: number) => ({
                        ...testimonial,
                        image: testimonialImages[idx % testimonialImages.length]?.url || testimonial.image,
                    }))
                }
                break

            case "MenuSection":
                if (industry === "restaurant" && galleryImages.length > 0) {
                    component.props.items = component.props.items?.map((item: any, idx: number) => ({
                        ...item,
                        image: galleryImages[idx % galleryImages.length]?.url || item.image,
                    }))
                }
                break

            case "ServicesSection":
                if (galleryImages.length > 0) {
                    component.props.services = component.props.services?.map((service: any, idx: number) => ({
                        ...service,
                        image: galleryImages[idx % galleryImages.length]?.url || service.image,
                    }))
                }
                break
        }
    })

    return enhancedData
}

function createEnhancedWebsiteStructure(params: WebsiteGenerationParams) {
    const { websiteName, industry, style, description } = params

    const components = [
        {
            type: "Header",
            props: {
                logo: websiteName,
                menu: [
                    { label: "Home", link: "#home" },
                    { label: "About", link: "#about" },
                    { label: "Services", link: "#services" },
                    { label: "Gallery", link: "#gallery" },
                    { label: "Contact", link: "#contact" },
                ],
                buttonText: "Get Started",
                buttonLink: "#contact",
                style: style,
            },
        },
        {
            type: "HeroSection",
            props: {
                title: `Welcome to ${websiteName}`,
                subtitle: `Professional ${industry} services that exceed expectations`,
                description: description,
                buttonText: "Learn More",
                buttonLink: "#about",
                secondaryButtonText: "Contact Us",
                secondaryButtonLink: "#contact",
                image: "/placeholder.svg?height=600&width=1200&text=Hero+Image",
                imageAlt: `${websiteName} hero image`,
                style: style,
            },
        },
        {
            type: "FeaturesSection",
            props: {
                title: "Why Choose Us",
                subtitle: "What makes us the best choice for your needs",
                features: getIndustryFeatures(industry),
                style: style,
            },
        },
        {
            type: "AboutSection",
            props: {
                title: "About Us",
                subtitle: "Our Story & Mission",
                description: `${description} We are committed to providing exceptional ${industry} services with a focus on quality, innovation, and customer satisfaction.`,
                image: "/placeholder.svg?height=400&width=600&text=About+Image",
                imageAlt: `About ${websiteName}`,
                stats: [
                    { number: "10+", label: "Years Experience" },
                    { number: "500+", label: "Happy Clients" },
                    { number: "50+", label: "Projects Completed" },
                    { number: "24/7", label: "Support Available" },
                ],
                style: style,
            },
        },
    ]

    // Add industry-specific components
    if (industry === "restaurant") {
        components.push({
            type: "MenuSection",
            props: {
                title: "Our Menu",
                subtitle: "Delicious dishes crafted with passion",
                categories: ["Appetizers", "Main Courses", "Desserts", "Beverages"],
                items: [
                    {
                        name: "Signature Pasta",
                        description: "Our famous homemade pasta with special marinara sauce and fresh herbs",
                        price: "$18.99",
                        image: "/placeholder.svg?height=200&width=300&text=Pasta",
                        category: "Main Courses",
                    },
                    {
                        name: "Margherita Pizza",
                        description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
                        price: "$16.99",
                        image: "/placeholder.svg?height=200&width=300&text=Pizza",
                        category: "Main Courses",
                    },
                    {
                        name: "Bruschetta",
                        description: "Toasted bread with fresh tomatoes, garlic, and herbs",
                        price: "$8.99",
                        image: "/placeholder.svg?height=200&width=300&text=Bruschetta",
                        category: "Appetizers",
                    },
                    {
                        name: "Tiramisu",
                        description: "Classic Italian dessert with coffee and mascarpone",
                        price: "$7.99",
                        image: "/placeholder.svg?height=200&width=300&text=Tiramisu",
                        category: "Desserts",
                    },
                ],
                style: style,
            },
        })
    } else {
        components.push({
            type: "ServicesSection",
            props: {
                title: "Our Services",
                subtitle: `Professional ${industry} solutions tailored to your needs`,
                services: getIndustryServices(industry),
                style: style,
            },
        })
    }

    components.push(
        {
            type: "GallerySection",
            props: {
                title: "Gallery",
                subtitle: `See our ${industry} work in action`,
                images: Array(6)
                    .fill(0)
                    .map((_, i) => ({
                        src: `/placeholder.svg?height=300&width=400&text=Gallery+${i + 1}`,
                        alt: `${websiteName} gallery image ${i + 1}`,
                    })),
                style: style,
            },
        },
        {
            type: "TeamSection",
            props: {
                title: "Our Team",
                subtitle: "Meet the professionals behind our success",
                members: [
                    {
                        name: "John Smith",
                        role: "Founder & CEO",
                        bio: "Leading our team with over 15 years of experience",
                        image: "/placeholder.svg?height=300&width=300&text=John+Smith",
                    },
                    {
                        name: "Sarah Johnson",
                        role: "Operations Manager",
                        bio: "Ensuring smooth operations and customer satisfaction",
                        image: "/placeholder.svg?height=300&width=300&text=Sarah+Johnson",
                    },
                    {
                        name: "Mike Davis",
                        role: "Senior Specialist",
                        bio: "Expert in delivering high-quality solutions",
                        image: "/placeholder.svg?height=300&width=300&text=Mike+Davis",
                    },
                ],
                style: style,
            },
        },
        {
            type: "TestimonialsSection",
            props: {
                title: "What Our Clients Say",
                subtitle: "Real feedback from satisfied customers",
                testimonials: [
                    {
                        name: "Emily Chen",
                        role: "Business Owner",
                        content: "Exceptional service and outstanding results. Highly recommend!",
                        rating: 5,
                        image: "/placeholder.svg?height=100&width=100&text=Emily",
                    },
                    {
                        name: "Robert Wilson",
                        role: "Manager",
                        content: "Professional, reliable, and always delivers on time.",
                        rating: 5,
                        image: "/placeholder.svg?height=100&width=100&text=Robert",
                    },
                    {
                        name: "Lisa Anderson",
                        role: "Director",
                        content: "The best decision we made for our business. Amazing team!",
                        rating: 5,
                        image: "/placeholder.svg?height=100&width=100&text=Lisa",
                    },
                ],
                style: style,
            },
        },
        {
            type: "ContactSection",
            props: {
                title: "Contact Us",
                subtitle: "Get in touch for a consultation",
                description: "Ready to get started? Contact us today and let's discuss how we can help you achieve your goals.",
                phone: "(555) 123-4567",
                email: "info@example.com",
                address: "123 Business Street, City, State 12345",
                formFields: [
                    { label: "Name", type: "text", required: true },
                    { label: "Email", type: "email", required: true },
                    { label: "Phone", type: "tel", required: false },
                    { label: "Message", type: "textarea", required: true },
                ],
                submitButtonText: "Send Message",
                style: style,
            },
        },
        {
            type: "Footer",
            props: {
                logo: websiteName,
                description: description.substring(0, 100) + "...",
                links: [
                    { label: "Privacy Policy", url: "#privacy" },
                    { label: "Terms of Service", url: "#terms" },
                    { label: "Contact", url: "#contact" },
                    { label: "About", url: "#about" },
                ],
                socialLinks: [
                    { platform: "facebook", url: "#", icon: "📘" },
                    { platform: "twitter", url: "#", icon: "🐦" },
                    { platform: "instagram", url: "#", icon: "📷" },
                    { platform: "linkedin", url: "#", icon: "💼" },
                ],
                copyrightText: `© 2024 ${websiteName}. All rights reserved.`,
                style: style,
            },
        },
    )

    return {
        components,
        metadata: {
            title: `${websiteName} - Professional ${industry} Services`,
            description: description.substring(0, 160),
            industry,
            style,
            generatedAt: new Date().toISOString(),
        },
        colors: getIndustryColors(industry, style),
    }
}

function getIndustryFeatures(industry: string) {
    const features: Record<string, any[]> = {
        restaurant: [
            {
                title: "Fresh Ingredients",
                description: "We source only the finest, freshest ingredients for our dishes",
                icon: "🥬",
            },
            {
                title: "Expert Chefs",
                description: "Our experienced chefs bring passion and skill to every meal",
                icon: "👨‍🍳",
            },
            {
                title: "Cozy Atmosphere",
                description: "Enjoy your meal in our warm and welcoming environment",
                icon: "🏠",
            },
        ],
        technology: [
            {
                title: "Cutting-Edge Solutions",
                description: "We use the latest technology to solve complex problems",
                icon: "💻",
            },
            {
                title: "Expert Team",
                description: "Our developers and engineers are industry leaders",
                icon: "👥",
            },
            {
                title: "24/7 Support",
                description: "Round-the-clock support for all your technical needs",
                icon: "🛠️",
            },
        ],
        healthcare: [
            {
                title: "Experienced Professionals",
                description: "Our medical team has years of experience and training",
                icon: "👩‍⚕️",
            },
            {
                title: "Modern Equipment",
                description: "State-of-the-art medical equipment for accurate diagnosis",
                icon: "🏥",
            },
            {
                title: "Patient-Centered Care",
                description: "We put our patients' needs and comfort first",
                icon: "❤️",
            },
        ],
    }

    return (
        features[industry] || [
            {
                title: "Quality Service",
                description: "We provide top-quality services to all our clients",
                icon: "⭐",
            },
            {
                title: "Expert Team",
                description: "Our team consists of experienced professionals",
                icon: "👥",
            },
            {
                title: "Customer Focus",
                description: "We put our customers first in everything we do",
                icon: "🎯",
            },
        ]
    )
}

function getIndustryServices(industry: string) {
    const services: Record<string, any[]> = {
        technology: [
            {
                title: "Web Development",
                description: "Custom websites and web applications",
                image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
            },
            {
                title: "Mobile Apps",
                description: "iOS and Android mobile applications",
                image: "/placeholder.svg?height=200&width=300&text=Mobile+Apps",
            },
            {
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and services",
                image: "/placeholder.svg?height=200&width=300&text=Cloud",
            },
        ],
        healthcare: [
            {
                title: "General Consultation",
                description: "Comprehensive health checkups and consultations",
                image: "/placeholder.svg?height=200&width=300&text=Consultation",
            },
            {
                title: "Specialized Care",
                description: "Expert care in various medical specialties",
                image: "/placeholder.svg?height=200&width=300&text=Specialized",
            },
            {
                title: "Emergency Services",
                description: "24/7 emergency medical care",
                image: "/placeholder.svg?height=200&width=300&text=Emergency",
            },
        ],
    }

    return (
        services[industry] || [
            {
                title: "Consultation",
                description: "Professional consultation services",
                image: "/placeholder.svg?height=200&width=300&text=Consultation",
            },
            {
                title: "Implementation",
                description: "Full implementation and setup services",
                image: "/placeholder.svg?height=200&width=300&text=Implementation",
            },
            {
                title: "Support",
                description: "Ongoing support and maintenance",
                image: "/placeholder.svg?height=200&width=300&text=Support",
            },
        ]
    )
}

function getIndustryColors(industry: string, style: string) {
    const colorMap: Record<string, Record<string, any>> = {
        restaurant: {
            luxury: { primary: "#b7791f", secondary: "#faf089", accent: "#744210" },
            modern: { primary: "#e53e3e", secondary: "#feb2b2", accent: "#822727" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
        },
        technology: {
            modern: { primary: "#3182ce", secondary: "#bee3f8", accent: "#2c5282" },
            minimal: { primary: "#2d3748", secondary: "#e2e8f0", accent: "#1a202c" },
            luxury: { primary: "#805ad5", secondary: "#d6bcfa", accent: "#553c9a" },
        },
        healthcare: {
            modern: { primary: "#38a169", secondary: "#c6f6d5", accent: "#2f855a" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
            luxury: { primary: "#3182ce", secondary: "#bee3f8", accent: "#2c5282" },
        },
    }

    return colorMap[industry]?.[style] || { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" }
}
