import type { WebsiteData } from "@/types"

// Using Picsum Photos API for placeholder images and Unsplash API for better images
export async function generateWebsiteImages(
    websiteData: WebsiteData,
    description: string,
    industry: string,
): Promise<WebsiteData> {
    try {
        console.log("Generating images for website...")

        // Create a copy of the website data
        const updatedWebsiteData = JSON.parse(JSON.stringify(websiteData))

        // Generate images for each component
        for (let i = 0; i < updatedWebsiteData.components.length; i++) {
            const component = updatedWebsiteData.components[i]

            if (component.type === "HeroSection" && component.props) {
                // Generate hero image
                const heroImageUrl = await generateHeroImage(description, industry)
                component.props.imageUrl = heroImageUrl
            }

            if (component.type === "FeaturesSection" && component.props?.features) {
                // Generate feature icons/images
                for (let j = 0; j < component.props.features.length; j++) {
                    const feature = component.props.features[j]
                    if (feature.title) {
                        const featureImageUrl = await generateFeatureImage(feature.title, industry)
                        feature.imageUrl = featureImageUrl
                    }
                }
            }

            if (component.type === "TestimonialsSection" && component.props?.testimonials) {
                // Generate avatar images
                for (let j = 0; j < component.props.testimonials.length; j++) {
                    const testimonial = component.props.testimonials[j]
                    const avatarUrl = await generateAvatarImage(testimonial.author)
                    testimonial.avatar = avatarUrl
                }
            }
        }

        console.log("Images generated successfully")
        return updatedWebsiteData
    } catch (error) {
        console.error("Error generating images:", error)
        return websiteData // Return original data if image generation fails
    }
}

async function generateHeroImage(description: string, industry: string): Promise<string> {
    // Use v0 placeholder system instead of external URLs
    const query = getImageQuery(description, industry)
    return `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(query)}`
}

async function generateFeatureImage(featureTitle: string, industry: string): Promise<string> {
    return `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(featureTitle)}`
}

async function generateAvatarImage(authorName: string): Promise<string> {
    return `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(authorName.charAt(0))}`
}

function getImageQuery(description: string, industry: string): string {
    const industryKeywords: Record<string, string[]> = {
        technology: ["technology", "computer", "software", "digital", "innovation"],
        healthcare: ["medical", "healthcare", "doctor", "hospital", "health"],
        education: ["education", "learning", "school", "students", "classroom"],
        finance: ["finance", "business", "money", "banking", "investment"],
        ecommerce: ["shopping", "retail", "store", "products", "commerce"],
        restaurant: ["food", "restaurant", "dining", "cuisine", "chef"],
        realestate: ["house", "property", "real estate", "home", "building"],
        creative: ["creative", "design", "art", "studio", "portfolio"],
        fitness: ["fitness", "gym", "exercise", "health", "workout"],
        legal: ["law", "legal", "justice", "lawyer", "courthouse"],
        automotive: ["car", "automotive", "vehicle", "transportation", "auto"],
        travel: ["travel", "vacation", "tourism", "destination", "adventure"],
    }

    const keywords = industryKeywords[industry] || ["business", "professional"]
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]

    // Extract key terms from description
    const descriptionWords = description
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3)
        .slice(0, 2)

    return [randomKeyword, ...descriptionWords].join(",")
}

// Alternative free image generation using Lorem Picsum with custom overlays
export async function generatePlaceholderImage(
    width: number,
    height: number,
    text: string,
    seed?: string,
): Promise<string> {
    const baseUrl = "https://picsum.photos"
    const seedParam = seed ? `/seed/${seed}` : ""
    return `${baseUrl}${seedParam}/${width}/${height}?blur=1`
}

// Generate industry-specific color schemes for images
export function getIndustryImageStyle(industry: string): { filter: string; overlay: string } {
    const styles: Record<string, { filter: string; overlay: string }> = {
        technology: {
            filter: "sepia(0) saturate(1.2) hue-rotate(200deg)",
            overlay: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
        },
        healthcare: {
            filter: "sepia(0) saturate(1.1) hue-rotate(120deg)",
            overlay: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))",
        },
        finance: {
            filter: "sepia(0) saturate(1.1) hue-rotate(220deg)",
            overlay: "linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(55, 48, 163, 0.3))",
        },
        creative: {
            filter: "sepia(0) saturate(1.3) hue-rotate(300deg)",
            overlay: "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.3))",
        },
    }

    return styles[industry] || styles.technology
}

export async function generateImageUrl(
    prompt: string,
    aspectRatio: "landscape" | "portrait" | "square" = "landscape",
): Promise<string> {
    const dimensions = {
        landscape: { width: 1200, height: 600 },
        portrait: { width: 600, height: 800 },
        square: { width: 600, height: 600 },
    }

    const { width, height } = dimensions[aspectRatio]
    return `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(prompt)}`
}

export async function generateAvatarUrl(name: string): Promise<string> {
    return `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(name.charAt(0))}`
}
