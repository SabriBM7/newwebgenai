interface ImageRequest {
    query: string
    width: number
    height: number
    category?: string
}

export async function generateProfessionalImage(request: ImageRequest): Promise<string> {
    try {
        // Try Unsplash API first for real professional photos
        const unsplashUrl = await getUnsplashImage(request)
        if (unsplashUrl) return unsplashUrl

        // Fallback to enhanced placeholder
        return generateEnhancedPlaceholder(request)
    } catch (error) {
        console.error("Error generating image:", error)
        return generateEnhancedPlaceholder(request)
    }
}

async function getUnsplashImage(request: ImageRequest): Promise<string | null> {
    try {
        // Using Unsplash Source API (no API key required for basic usage)
        const searchTerm = encodeURIComponent(request.query)
        const unsplashUrl = `https://source.unsplash.com/${request.width}x${request.height}/?${searchTerm}`

        // Test if the image loads
        const response = await fetch(unsplashUrl, { method: "HEAD" })
        if (response.ok) {
            return unsplashUrl
        }

        return null
    } catch (error) {
        console.error("Unsplash API error:", error)
        return null
    }
}

function generateEnhancedPlaceholder(request: ImageRequest): string {
    const { query, width, height } = request

    // Create a more sophisticated placeholder with gradients and text
    const colors = getIndustryColors(request.category || "default")
    const encodedQuery = encodeURIComponent(query)

    return `/placeholder.svg?height=${height}&width=${width}&text=${encodedQuery}&bg=${colors.bg}&fg=${colors.fg}`
}

function getIndustryColors(category: string) {
    const colorSchemes: Record<string, { bg: string; fg: string }> = {
        restaurant: { bg: "f59e0b", fg: "ffffff" }, // Warm orange
        technology: { bg: "3b82f6", fg: "ffffff" }, // Tech blue
        healthcare: { bg: "10b981", fg: "ffffff" }, // Medical green
        finance: { bg: "1e40af", fg: "ffffff" }, // Professional blue
        education: { bg: "7c3aed", fg: "ffffff" }, // Academic purple
        default: { bg: "6366f1", fg: "ffffff" }, // Default indigo
    }

    return colorSchemes[category] || colorSchemes.default
}

export async function generateIndustryImages(industry: string, websiteName: string) {
    const imageQueries = getIndustryImageQueries(industry, websiteName)

    const images = await Promise.all([
        generateProfessionalImage({ query: imageQueries.hero, width: 1200, height: 600, category: industry }),
        generateProfessionalImage({ query: imageQueries.about, width: 800, height: 600, category: industry }),
        generateProfessionalImage({ query: imageQueries.team, width: 400, height: 400, category: industry }),
        ...imageQueries.gallery.map((query) =>
            generateProfessionalImage({ query, width: 400, height: 300, category: industry }),
        ),
    ])

    return {
        hero: images[0],
        about: images[1],
        team: images[2],
        gallery: images.slice(3),
    }
}

function getIndustryImageQueries(industry: string, websiteName: string) {
    const queries: Record<string, any> = {
        restaurant: {
            hero: `delicious ${industry} food restaurant interior`,
            about: `professional chef cooking kitchen`,
            team: `restaurant staff team professional`,
            gallery: [
                `gourmet ${industry} dish plated beautifully`,
                `fresh ingredients ${industry} cooking`,
                `restaurant dining room atmosphere`,
                `${industry} food presentation artistic`,
            ],
        },
        technology: {
            hero: `modern technology office workspace`,
            about: `software development team collaboration`,
            team: `tech professionals working computers`,
            gallery: [
                `modern office technology workspace`,
                `software development coding`,
                `tech team meeting collaboration`,
                `innovative technology solutions`,
            ],
        },
        healthcare: {
            hero: `modern medical facility healthcare`,
            about: `healthcare professionals medical team`,
            team: `doctors nurses medical staff`,
            gallery: [
                `modern medical equipment facility`,
                `healthcare consultation patient care`,
                `medical professionals working`,
                `clean modern clinic interior`,
            ],
        },
        ecommerce: {
            hero: `modern ecommerce shopping experience`,
            about: `online shopping technology`,
            team: `ecommerce team professionals`,
            gallery: [
                `product photography ecommerce`,
                `online shopping website`,
                `warehouse fulfillment center`,
                `customer service team`,
            ],
        },
    }

    return queries[industry] || queries.technology
}

export function generateAvatarImage(name: string): string {
    // Generate a consistent avatar based on name
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    return `/placeholder.svg?height=100&width=100&text=${initials}&bg=6366f1&fg=ffffff`
}
