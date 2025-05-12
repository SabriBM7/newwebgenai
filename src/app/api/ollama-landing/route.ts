import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { prompt, industry, styles } = await request.json()

        // This is a mock response. In a real implementation, you would call your AI service here.
        const mockResponse = generateMockResponse(prompt, industry, styles)

        return NextResponse.json(mockResponse)
    } catch (error) {
        console.error("Error in ollama-landing API:", error)
        return NextResponse.json({ error: "Failed to generate landing page" }, { status: 500 })
    }
}

function generateMockResponse(prompt: string, industry: string, styles: any) {
    // Create a mock response based on the prompt, industry, and styles
    const lowercasePrompt = prompt.toLowerCase()

    // Determine the type of business based on keywords in the prompt
    let businessType = "technology"
    if (lowercasePrompt.includes("ecommerce") || lowercasePrompt.includes("shop") || lowercasePrompt.includes("store")) {
        businessType = "ecommerce"
    } else if (
        lowercasePrompt.includes("health") ||
        lowercasePrompt.includes("medical") ||
        lowercasePrompt.includes("wellness")
    ) {
        businessType = "healthcare"
    } else if (
        lowercasePrompt.includes("finance") ||
        lowercasePrompt.includes("bank") ||
        lowercasePrompt.includes("invest")
    ) {
        businessType = "finance"
    } else if (
        lowercasePrompt.includes("education") ||
        lowercasePrompt.includes("school") ||
        lowercasePrompt.includes("learn")
    ) {
        businessType = "education"
    } else if (
        lowercasePrompt.includes("creative") ||
        lowercasePrompt.includes("design") ||
        lowercasePrompt.includes("art")
    ) {
        businessType = "creative"
    }

    // Generate a business name based on the industry
    let businessName = "TechSolutions"
    switch (businessType) {
        case "ecommerce":
            businessName = "ShopEase"
            break
        case "healthcare":
            businessName = "HealthPlus"
            break
        case "finance":
            businessName = "WealthWise"
            break
        case "education":
            businessName = "LearnHub"
            break
        case "creative":
            businessName = "CreativeFlow"
            break
    }

    // Generate a tagline based on the industry
    let tagline = "Innovative Solutions for Modern Businesses"
    switch (businessType) {
        case "ecommerce":
            tagline = "Shop Smarter, Live Better"
            break
        case "healthcare":
            tagline = "Your Health, Our Priority"
            break
        case "finance":
            tagline = "Secure Your Financial Future"
            break
        case "education":
            tagline = "Unlock Your Learning Potential"
            break
        case "creative":
            tagline = "Where Imagination Meets Innovation"
            break
    }

    // Generate features based on the industry
    const features = []
    switch (businessType) {
        case "ecommerce":
            features.push(
                {
                    title: "Easy Shopping",
                    description: "Browse thousands of products with our intuitive interface",
                    icon: "shopping-bag",
                },
                {
                    title: "Fast Delivery",
                    description: "Get your orders delivered to your doorstep in record time",
                    icon: "truck",
                },
                {
                    title: "Secure Payments",
                    description: "Shop with confidence with our secure payment system",
                    icon: "shield",
                },
            )
            break
        case "healthcare":
            features.push(
                {
                    title: "Online Consultations",
                    description: "Connect with healthcare professionals from the comfort of your home",
                    icon: "video",
                },
                { title: "Health Records", description: "Access your medical records anytime, anywhere", icon: "file-text" },
                { title: "Medication Reminders", description: "Never miss a dose with our reminder system", icon: "bell" },
            )
            break
        case "finance":
            features.push(
                {
                    title: "Investment Planning",
                    description: "Plan your investments with our expert advisors",
                    icon: "trending-up",
                },
                {
                    title: "Secure Banking",
                    description: "Bank with confidence with our state-of-the-art security",
                    icon: "lock",
                },
                {
                    title: "Financial Insights",
                    description: "Gain valuable insights into your financial health",
                    icon: "pie-chart",
                },
            )
            break
        case "education":
            features.push(
                {
                    title: "Interactive Courses",
                    description: "Learn with our engaging and interactive courses",
                    icon: "book-open",
                },
                { title: "Expert Instructors", description: "Learn from industry experts and professionals", icon: "users" },
                { title: "Flexible Learning", description: "Learn at your own pace, anytime, anywhere", icon: "clock" },
            )
            break
        case "creative":
            features.push(
                { title: "Creative Tools", description: "Access a suite of powerful creative tools", icon: "pen-tool" },
                { title: "Collaboration", description: "Collaborate with team members in real-time", icon: "users" },
                { title: "Portfolio Showcase", description: "Showcase your work to potential clients", icon: "image" },
            )
            break
        default:
            features.push(
                {
                    title: "Advanced Analytics",
                    description: "Gain insights from your data with our advanced analytics",
                    icon: "bar-chart",
                },
                {
                    title: "Cloud Integration",
                    description: "Seamlessly integrate with your existing cloud services",
                    icon: "cloud",
                },
                {
                    title: "24/7 Support",
                    description: "Get help whenever you need it with our 24/7 support",
                    icon: "headphones",
                },
            )
    }

    return {
        header: {
            logo: businessName,
            menu: [
                { label: "Home", link: "#" },
                { label: "Features", link: "#features" },
                { label: "Pricing", link: "#pricing" },
                { label: "Contact", link: "#contact" },
            ],
            style: styles.header,
        },
        hero: {
            title: `Transform Your ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Business`,
            subtitle: tagline,
            description: prompt,
            buttonText: "Get Started",
            buttonLink: "#",
            imageUrl: `/placeholder.svg?height=400&width=600&query=${businessType}%20business`,
            style: styles.hero,
        },
        features: {
            title: "Our Features",
            subtitle: "What makes us different",
            items: features,
            style: styles.features,
        },
        footer: {
            companyName: businessName,
            copyright: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
            links: [
                { label: "About", link: "#" },
                { label: "Features", link: "#" },
                { label: "Pricing", link: "#" },
                { label: "Contact", link: "#" },
            ],
            socialLinks: [
                { platform: "Twitter", link: "#" },
                { platform: "LinkedIn", link: "#" },
                { platform: "Facebook", link: "#" },
            ],
            style: styles.footer,
        },
    }
}
