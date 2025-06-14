interface UnsplashImage {
    id: string
    url: string
    alt: string
    width: number
    height: number
    blurHash?: string
    color?: string
    userName?: string
    userLink?: string
}

interface UnsplashSearchParams {
    query: string
    page?: number
    perPage?: number
    orientation?: "landscape" | "portrait" | "squarish"
}

export class UnsplashService {
    private accessKey: string
    private baseUrl = "https://api.unsplash.com"
    private cache: Map<string, UnsplashImage[]> = new Map()
    private cacheExpiry: Map<string, number> = new Map()
    private cacheDuration = 3600000 // 1 hour in milliseconds

    constructor(accessKey?: string) {
        // Try multiple ways to get the access key
        this.accessKey = accessKey || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY || ""

        console.log("🔑 Unsplash Service Initialization:")
        console.log("- Access key provided:", !!accessKey)
        console.log("- Environment key exists:", !!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY)
        console.log("- Final key length:", this.accessKey.length)
        console.log("- Key preview:", this.accessKey ? this.accessKey.substring(0, 10) + "..." : "No key")
    }

    isConfigured(): boolean {
        const configured = !!this.accessKey && this.accessKey.length > 10
        console.log("🔍 Unsplash isConfigured check:", configured)
        return configured
    }

    async testConnection(): Promise<{ success: boolean; error?: string; data?: any }> {
        if (!this.isConfigured()) {
            return {
                success: false,
                error: "Unsplash access key not configured",
            }
        }

        try {
            const response = await fetch(`${this.baseUrl}/photos/random?client_id=${this.accessKey}&count=1`, {
                headers: {
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                return {
                    success: false,
                    error: `API Error ${response.status}: ${errorText}`,
                }
            }

            const data = await response.json()
            return {
                success: true,
                data: {
                    imageId: data?.[0]?.id,
                    rateLimit: response.headers.get("X-Ratelimit-Remaining"),
                },
            }
        } catch (error) {
            return {
                success: false,
                error: `Connection error: ${error instanceof Error ? error.message : "Unknown error"}`,
            }
        }
    }

    async searchImages(params: UnsplashSearchParams): Promise<UnsplashImage[]> {
        if (!this.isConfigured()) {
            console.log("⚠️ Unsplash not configured, returning placeholder images")
            return this.getPlaceholderImages(params.query, params.perPage || 10)
        }

        const cacheKey = `search:${params.query}:${params.page || 1}:${params.perPage || 10}:${params.orientation || "landscape"}`

        // Check cache first
        if (this.cache.has(cacheKey) && this.cacheExpiry.get(cacheKey)! > Date.now()) {
            console.log("📦 Returning cached Unsplash images for:", params.query)
            return this.cache.get(cacheKey)!
        }

        try {
            const searchParams = new URLSearchParams({
                query: params.query,
                page: (params.page || 1).toString(),
                per_page: (params.perPage || 10).toString(),
                client_id: this.accessKey,
            })

            if (params.orientation) {
                searchParams.append("orientation", params.orientation)
            }

            console.log("🔍 Searching Unsplash for:", params.query)

            const response = await fetch(`${this.baseUrl}/search/photos?${searchParams.toString()}`, {
                headers: {
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("❌ Unsplash API error:", response.status, errorText)
                throw new Error(`Unsplash API error: ${response.status}`)
            }

            const data = await response.json()
            console.log("✅ Unsplash search successful, found:", data.results?.length || 0, "images")

            const images: UnsplashImage[] = (data.results || []).map((image: any) => ({
                id: image.id,
                url: image.urls.regular,
                alt: image.alt_description || image.description || params.query,
                width: image.width,
                height: image.height,
                blurHash: image.blur_hash,
                color: image.color,
                userName: image.user?.name,
                userLink: image.user?.links?.html,
            }))

            // Cache the results
            this.cache.set(cacheKey, images)
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheDuration)

            return images
        } catch (error) {
            console.error("❌ Error fetching images from Unsplash:", error)
            return this.getPlaceholderImages(params.query, params.perPage || 10)
        }
    }

    async getRandomImage(query: string): Promise<UnsplashImage> {
        if (!this.isConfigured()) {
            return this.getPlaceholderImage(query)
        }

        try {
            const searchParams = new URLSearchParams({
                query,
                client_id: this.accessKey,
            })

            const response = await fetch(`${this.baseUrl}/photos/random?${searchParams.toString()}`, {
                headers: {
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`)
            }

            const image = await response.json()

            return {
                id: image.id,
                url: image.urls.regular,
                alt: image.alt_description || image.description || query,
                width: image.width,
                height: image.height,
                blurHash: image.blur_hash,
                color: image.color,
                userName: image.user?.name,
                userLink: image.user?.links?.html,
            }
        } catch (error) {
            console.error("Error fetching random image from Unsplash:", error)
            return this.getPlaceholderImage(query)
        }
    }

    async getIndustryImages(industry: string, count = 10): Promise<UnsplashImage[]> {
        // Map industry to better search terms
        const searchTerms: Record<string, string> = {
            restaurant: "restaurant food cuisine dining",
            technology: "technology office computer workspace",
            healthcare: "healthcare medical doctor hospital",
            education: "education school classroom learning",
            realestate: "real estate property home house",
            finance: "finance business professional office",
            legal: "legal office professional lawyer",
            fitness: "fitness gym workout exercise",
            beauty: "beauty salon spa wellness",
            automotive: "car dealership automotive vehicle",
            travel: "travel vacation destination tourism",
            construction: "construction building architecture",
            creative: "creative design studio art",
            ecommerce: "product photography retail shopping",
        }

        const query = searchTerms[industry.toLowerCase()] || industry
        return this.searchImages({ query, perPage: count, orientation: "landscape" })
    }

    private getPlaceholderImage(query: string): UnsplashImage {
        return {
            id: "placeholder",
            url: `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(query)}`,
            alt: query,
            width: 800,
            height: 600,
        }
    }

    private getPlaceholderImages(query: string, count: number): UnsplashImage[] {
        return Array(count)
            .fill(0)
            .map((_, i) => ({
                id: `placeholder-${i}`,
                url: `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(query)}-${i + 1}`,
                alt: `${query} ${i + 1}`,
                width: 800,
                height: 600,
            }))
    }
}

// Export a singleton instance
export const unsplashService = new UnsplashService()

// Helper functions for easy use
export function getIndustryHeroImage(industry: string, businessName: string): Promise<UnsplashImage> {
    const query = `${industry} ${businessName} professional business`
    return unsplashService.getRandomImage(query)
}

export function getIndustryGalleryImages(industry: string, count = 6): Promise<UnsplashImage[]> {
    return unsplashService.getIndustryImages(industry, count)
}

export function getTeamMemberImages(count = 4): Promise<UnsplashImage[]> {
    return unsplashService.searchImages({
        query: "professional headshot business person",
        perPage: count,
        orientation: "squarish",
    })
}

export function getCustomerAvatars(count = 3): Promise<UnsplashImage[]> {
    return unsplashService.searchImages({
        query: "happy customer portrait professional",
        perPage: count,
        orientation: "squarish",
    })
}

export function getFoodImages(count = 6): Promise<UnsplashImage[]> {
    return unsplashService.searchImages({
        query: "delicious food restaurant cuisine",
        perPage: count,
        orientation: "landscape",
    })
}
