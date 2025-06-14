import { type NextRequest, NextResponse } from "next/server"
import { ollamaService } from "@/lib/ollama-service"
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
        // Add debugging for the request
        console.log("📥 Received request to /api/generate")
        console.log("📋 Request headers:", Object.fromEntries(request.headers.entries()))

        // Get the raw body first for debugging
        const body = await request.text()
        console.log("📄 Raw request body:", body)
        console.log("📏 Body length:", body.length)

        // Check if body is empty
        if (!body || body.trim() === "") {
            console.log("❌ Empty request body received")
            return NextResponse.json(
                {
                    success: false,
                    error: "No data provided in request body",
                    debug: {
                        bodyLength: body.length,
                        bodyContent: body,
                    },
                },
                { status: 400 },
            )
        }

        // Try to parse the JSON
        let params: WebsiteGenerationParams
        try {
            params = JSON.parse(body)
            console.log("✅ Successfully parsed JSON params")
        } catch (parseError) {
            console.error("❌ JSON parse error:", parseError)
            console.log("🔍 Attempting to fix common JSON issues...")

            // Try to fix common JSON issues
            let fixedBody = body.trim()

            // Remove any trailing commas
            fixedBody = fixedBody.replace(/,(\s*[}\]])/g, "$1")

            try {
                params = JSON.parse(fixedBody)
                console.log("✅ Successfully parsed fixed JSON")
            } catch (secondParseError) {
                console.error("❌ Still can't parse JSON after fixes:", secondParseError)
                return NextResponse.json(
                    {
                        success: false,
                        error: "Invalid JSON in request body",
                        debug: {
                            originalError: parseError.message,
                            bodyContent: body,
                            bodyLength: body.length,
                        },
                    },
                    { status: 400 },
                )
            }
        }

        console.log("🚀 Generating website with params:", params)

        // Validate required parameters
        if (!params.websiteName || !params.industry || !params.description) {
            console.log("❌ Missing required parameters")
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required parameters: websiteName, industry, and description are required",
                    received: params,
                },
                { status: 400 },
            )
        }

        let websiteData
        let aiUsed = false

        // Check if Ollama is available
        if (params.aiProvider === "ollama") {
            try {
                const isAvailable = await ollamaService.checkAvailability()

                if (isAvailable) {
                    console.log("🤖 Generating with Ollama...")
                    websiteData = await ollamaService.generateWebsiteContent({
                        industry: params.industry,
                        style: params.style,
                        description: params.description,
                        websiteName: params.websiteName,
                    })
                    aiUsed = true
                    console.log("✅ Ollama generation successful")
                } else {
                    console.log("⚠️ Ollama not available, falling back to templates")
                }
            } catch (error) {
                console.error("❌ Ollama generation error:", error)
            }
        }

        // If AI generation failed or wasn't used, fall back to templates
        if (!websiteData) {
            console.log("📄 Using template fallback")
            websiteData = createBasicWebsiteStructure(params)
        }

        // Add real images if requested
        if (params.includeImages) {
            try {
                websiteData = await addRealImages(websiteData, params.industry)
                console.log("🖼️ Added real images to website data")
            } catch (imageError) {
                console.error("⚠️ Error adding images:", imageError)
            }
        }

        console.log("✅ Final website data:", {
            componentsCount: websiteData.components?.length || 0,
            componentTypes: websiteData.components?.map((c: any) => c.type) || [],
            aiUsed: aiUsed ? "ollama" : "template",
        })

        return NextResponse.json({
            success: true,
            data: websiteData,
            debug: {
                aiUsed: aiUsed ? "ollama" : "template",
                componentsGenerated: websiteData.components?.length || 0,
                imagesIncluded: params.includeImages || false,
            },
        })
    } catch (error) {
        console.error("❌ Error generating website:", error)

        // Create a fallback response
        const fallbackData = createBasicWebsiteStructure({
            websiteName: "My Website",
            industry: "business",
            style: "modern",
            description: "A professional website",
            aiProvider: "template",
        })

        return NextResponse.json({
            success: true,
            data: fallbackData,
            debug: {
                error: error.message,
                fallbackUsed: true,
            },
        })
    }
}

async function addRealImages(websiteData: any, industry: string) {
    // Only proceed if Unsplash is configured
    if (!unsplashService.isConfigured()) {
        console.log("⚠️ Unsplash not configured, using placeholder images")
        return websiteData
    }

    try {
        // Get industry-specific images
        const images = await unsplashService.getIndustryImages(industry, 10)

        if (!images || images.length === 0) {
            return websiteData
        }

        // Clone the website data to avoid mutations
        const enhancedData = JSON.parse(JSON.stringify(websiteData))

        // Replace placeholder images with real ones
        let imageIndex = 0

        // Helper function to replace image URLs in props
        const replaceImagesInProps = (props: any) => {
            if (!props) return

            Object.keys(props).forEach((key) => {
                // Replace direct image URLs
                if (key === "image" && typeof props[key] === "string" && props[key].includes("/placeholder.svg")) {
                    props[key] = images[imageIndex % images.length].url
                    imageIndex++
                }

                // Replace image URLs in arrays
                if (key === "images" && Array.isArray(props[key])) {
                    props[key].forEach((img: any, idx: number) => {
                        if (typeof img === "string" && img.includes("/placeholder.svg")) {
                            props[key][idx] = images[imageIndex % images.length].url
                            imageIndex++
                        } else if (img && typeof img === "object" && img.src && img.src.includes("/placeholder.svg")) {
                            img.src = images[imageIndex % images.length].url
                            imageIndex++
                        }
                    })
                }

                // Handle items with images (like menu items, products, etc.)
                if (key === "items" && Array.isArray(props[key])) {
                    props[key].forEach((item: any) => {
                        if (item && typeof item === "object" && item.image && item.image.includes("/placeholder.svg")) {
                            item.image = images[imageIndex % images.length].url
                            imageIndex++
                        }
                    })
                }

                // Recursively process nested objects
                if (props[key] && typeof props[key] === "object" && !Array.isArray(props[key])) {
                    replaceImagesInProps(props[key])
                }
            })
        }

        // Process all components
        enhancedData.components.forEach((component: any) => {
            replaceImagesInProps(component.props)
        })

        return enhancedData
    } catch (error) {
        console.error("Error adding real images:", error)
        return websiteData
    }
}

function createBasicWebsiteStructure(params: WebsiteGenerationParams) {
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
                    { label: "Contact", link: "#contact" },
                ],
                buttonText: "Get Started",
                buttonLink: "#contact",
            },
        },
        {
            type: "HeroSection",
            props: {
                title: `Welcome to ${websiteName}`,
                subtitle: `Professional ${industry} services`,
                description: description,
                buttonText: "Learn More",
                buttonLink: "#about",
                image: "/placeholder.svg?height=600&width=800&text=Hero+Image",
            },
        },
        {
            type: "FeaturesSection",
            props: {
                title: "Our Features",
                subtitle: "What makes us special",
                features: [
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
                ],
            },
        },
        {
            type: "AboutSection",
            props: {
                title: "About Us",
                subtitle: "Our Story",
                description: description,
                image: "/placeholder.svg?height=400&width=600&text=About+Image",
                stats: [
                    { number: "10+", label: "Years Experience" },
                    { number: "500+", label: "Happy Clients" },
                    { number: "50+", label: "Projects Completed" },
                    { number: "24/7", label: "Support" },
                ],
            },
        },
    ]

    // Add industry-specific components
    if (industry === "restaurant") {
        components.push(
            {
                type: "MenuSection",
                props: {
                    title: "Our Menu",
                    subtitle: "Delicious Italian Cuisine",
                    categories: ["Appetizers", "Main Courses", "Desserts"],
                    items: [
                        {
                            name: "Signature Pasta",
                            description: "Our famous homemade pasta with special marinara sauce",
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
                },
            },
            {
                type: "GallerySection",
                props: {
                    title: "Gallery",
                    subtitle: "See our restaurant",
                    images: [
                        { src: "/placeholder.svg?height=300&width=400&text=Restaurant+Interior", alt: "Restaurant Interior" },
                        { src: "/placeholder.svg?height=300&width=400&text=Food+1", alt: "Delicious Food" },
                        { src: "/placeholder.svg?height=300&width=400&text=Food+2", alt: "Fresh Ingredients" },
                    ],
                },
            },
        )
    }

    components.push(
        {
            type: "TestimonialsSection",
            props: {
                title: "What Our Clients Say",
                subtitle: "Customer Reviews",
                testimonials: [
                    {
                        name: "John Smith",
                        role: "Customer",
                        content: "Excellent service and quality. Highly recommended!",
                        rating: 5,
                        image: "/placeholder.svg?height=100&width=100&text=JS",
                    },
                    {
                        name: "Sarah Johnson",
                        role: "Regular Client",
                        content: "Always professional and delivers on time.",
                        rating: 5,
                        image: "/placeholder.svg?height=100&width=100&text=SJ",
                    },
                ],
            },
        },
        {
            type: "ContactSection",
            props: {
                title: "Contact Us",
                subtitle: "Get in Touch",
                description: "We'd love to hear from you! Reach out for inquiries and support.",
                phone: "(555) 123-4567",
                email: "info@example.com",
                address: "123 Business Street, City, State 12345",
                formFields: [
                    { label: "Name", type: "text", required: true },
                    { label: "Email", type: "email", required: true },
                    { label: "Message", type: "textarea", required: true },
                ],
                submitButtonText: "Send Message",
            },
        },
        {
            type: "Footer",
            props: {
                logo: websiteName,
                description: description.substring(0, 100),
                links: [
                    { label: "Privacy Policy", url: "#privacy" },
                    { label: "Terms of Service", url: "#terms" },
                    { label: "Contact", url: "#contact" },
                ],
                socialLinks: [
                    { platform: "facebook", url: "#" },
                    { platform: "twitter", url: "#" },
                    { platform: "instagram", url: "#" },
                ],
                copyrightText: `© 2024 ${websiteName}. All rights reserved.`,
            },
        },
    )

    return {
        components,
        metadata: {
            title: `${websiteName} - Professional ${industry} Website`,
            description: description.substring(0, 160),
            industry,
            style,
            aiUsed: "template-fallback",
            generatedAt: new Date().toISOString(),
        },
        content: {
            hero: {
                title: `Welcome to ${websiteName}`,
                subtitle: `Professional ${industry} services`,
            },
        },
        images: {},
        colors: getDefaultColors(industry, style),
    }
}

function getDefaultColors(industry: string, style: string) {
    const colorMap: Record<string, Record<string, any>> = {
        restaurant: {
            luxury: { primary: "#b7791f", secondary: "#faf089", accent: "#744210" },
            modern: { primary: "#e53e3e", secondary: "#feb2b2", accent: "#822727" },
            minimal: { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" },
        },
        technology: {
            modern: { primary: "#3182ce", secondary: "#bee3f8", accent: "#2c5282" },
            minimal: { primary: "#2d3748", secondary: "#e2e8f0", accent: "#1a202c" },
        },
    }

    return colorMap[industry]?.[style] || { primary: "#4a5568", secondary: "#e2e8f0", accent: "#2d3748" }
}
