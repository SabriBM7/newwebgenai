export interface ImageRequest {
    query: string
    width?: number
    height?: number
    category?: string
}

export class ImageService {
    private static readonly UNSPLASH_BASE = "https://source.unsplash.com"
    private static readonly DEFAULT_WIDTH = 800
    private static readonly DEFAULT_HEIGHT = 600

    static getImageUrl(request: ImageRequest): string {
        const { query, width = this.DEFAULT_WIDTH, height = this.DEFAULT_HEIGHT } = request
        const cleanQuery = query.replace(/[^a-zA-Z0-9\s]/g, "").trim()
        const encodedQuery = encodeURIComponent(cleanQuery)
        return `${this.UNSPLASH_BASE}/${width}x${height}/?${encodedQuery}`
    }

    static getIndustryImages(industry: string): Record<string, string> {
        const imageQueries = this.getIndustryImageQueries(industry)
        const images: Record<string, string> = {}
        Object.entries(imageQueries).forEach(([key, query]) => {
            images[key] = this.getImageUrl({ query })
        })
        return images
    }

    static async getSectionImages(
        sectionType: string,
        theme: string,
        keywords: string
    ): Promise<string[]> {
        const queries = this.getSectionQueries(sectionType, theme, keywords)
        return Promise.all(
            queries.map(query => this.getImageUrl({ query }))
        )
    }

    static async getRestaurantImages(cuisine: string): Promise<Record<string, string>> {
        const imageKeys = [
            'hero', 'about', 'gallery1', 'gallery2',
            'gallery3', 'menu1', 'menu2', 'contact'
        ]

        const images: Record<string, string> = {}

        await Promise.all(imageKeys.map(async key => {
            const query = this.getRestaurantQuery(key, cuisine)
            images[key] = this.getImageUrl({ query })
        }))

        return images
    }

    private static getSectionQueries(
        sectionType: string,
        theme: string,
        keywords: string
    ): string[] {
        const styleMap: Record<string, string> = {
            modern: "minimalist professional",
            professional: "corporate business",
            creative: "artistic creative",
            luxury: "luxury elegant premium",
            vintage: "retro classic"
        }

        const sectionMap: Record<string, string> = {
            hero: `${keywords} ${styleMap[theme]} hero banner`,
            features: `${keywords} features benefits ${styleMap[theme]}`,
            about: `${keywords} team story ${styleMap[theme]}`,
            testimonials: `${keywords} customer review ${styleMap[theme]}`,
            contact: `${keywords} location map ${styleMap[theme]}`,
            gallery: `${keywords} gallery showcase ${styleMap[theme]}`,
            menu: `${keywords} dish food ${styleMap[theme]}`
        }

        return [
            sectionMap[sectionType] || `${keywords} ${sectionType} ${styleMap[theme]}`,
            ...Array(3).fill(sectionMap[sectionType] || keywords)
        ]
    }

    private static getRestaurantQuery(key: string, cuisine: string): string {
        const queryMap: Record<string, string> = {
            hero: `elegant ${cuisine} restaurant interior dining`,
            about: `${cuisine} chef cooking professional kitchen`,
            gallery1: `gourmet ${cuisine} food plating`,
            gallery2: `fresh ingredients for ${cuisine} cooking`,
            menu1: `${cuisine} main dish presentation`,
            menu2: `${cuisine} dessert plating`,
            contact: `${cuisine} restaurant exterior building`
        }

        return queryMap[key] || cuisine
    }

    private static getIndustryImageQueries(industry: string): Record<string, string> {
        // ... existing industry queries (unchanged) ...
    }
}