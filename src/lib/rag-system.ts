import { generateWithGemini } from "./gemini-service"

interface Document {
    id: string
    title: string
    content: string
    industry: string
    tags: string[]
    embedding?: number[]
}

interface RAGContext {
    documents: Document[]
    query: string
    industry: string
}

// Enhanced document database with more comprehensive content
const documentDatabase: Document[] = [
    {
        id: "restaurant-comprehensive",
        title: "Complete Restaurant Website Guide",
        content: `
      Modern restaurant websites should include: 
      1. Hero section with appetizing food photography and clear value proposition
      2. Interactive menu with categories, dietary restrictions, and pricing
      3. Online reservation system integrated with table management
      4. Location and hours with embedded maps
      5. Chef and restaurant story for authenticity
      6. Customer testimonials and reviews integration
      7. Events calendar for special dinners, wine tastings, live music
      8. Photo gallery showcasing ambiance, dishes, and team
      9. Contact information with phone, email, and social media
      10. Online ordering system for takeout and delivery
      11. Newsletter signup for promotions and updates
      12. Mobile-responsive design for on-the-go customers
    `,
        industry: "restaurant",
        tags: ["menu", "reservations", "events", "gallery", "ordering", "mobile"],
    },
    {
        id: "restaurant-menu-design",
        title: "Restaurant Menu Psychology and Design",
        content: `
      Effective restaurant menu design principles:
      - Use descriptive language that evokes taste and aroma
      - Organize by meal progression: appetizers, soups, salads, mains, desserts
      - Highlight signature dishes with visual emphasis
      - Include dietary icons (vegetarian, vegan, gluten-free, spicy)
      - Price positioning psychology - avoid dollar signs, use clean numbers
      - Seasonal menu updates to showcase fresh ingredients
      - Wine pairing suggestions for premium dishes
      - Chef's recommendations and daily specials
      - Ingredient sourcing information for farm-to-table appeal
    `,
        industry: "restaurant",
        tags: ["menu", "design", "psychology", "pricing", "seasonal"],
    },
    {
        id: "technology-portfolio",
        title: "Technology Company Portfolio Best Practices",
        content: `
      Technology company websites should showcase:
      1. Portfolio of projects with detailed case studies
      2. Technology stack and expertise areas
      3. Client testimonials with measurable results
      4. Team profiles highlighting technical skills and experience
      5. Development process from discovery to deployment
      6. Blog with technical insights and industry trends
      7. Open source contributions and community involvement
      8. Certifications and partnerships with major platforms
      9. Contact forms for project inquiries with budget ranges
      10. Resource downloads like whitepapers and guides
    `,
        industry: "technology",
        tags: ["portfolio", "case-studies", "team", "process", "blog"],
    },
    {
        id: "healthcare-compliance",
        title: "Healthcare Website Requirements and Compliance",
        content: `
      Healthcare websites must include:
      - HIPAA-compliant patient portals and forms
      - Provider directories with specialties and credentials
      - Service descriptions with treatment options
      - Insurance acceptance and billing information
      - Online appointment scheduling with availability
      - Patient education resources and health tips
      - Emergency contact information prominently displayed
      - Accessibility compliance (WCAG 2.1 AA)
      - Privacy policy and terms of service
      - Telemedicine capabilities and virtual consultations
    `,
        industry: "healthcare",
        tags: ["compliance", "hipaa", "appointments", "providers", "telemedicine"],
    },
    {
        id: "ecommerce-conversion",
        title: "E-commerce Conversion Optimization",
        content: `
      High-converting e-commerce websites feature:
      - Product catalogs with high-quality images and 360° views
      - Advanced filtering and search functionality
      - Customer reviews and ratings system
      - Shopping cart with save-for-later functionality
      - Multiple payment options and guest checkout
      - Shipping calculator and delivery options
      - Product recommendations and cross-selling
      - Wishlist and comparison features
      - Live chat support and FAQ section
      - Mobile-first responsive design
      - Security badges and trust indicators
    `,
        industry: "ecommerce",
        tags: ["products", "cart", "payments", "reviews", "mobile", "security"],
    },
]

export async function getRelevantDocuments(industry: string, query: string, limit = 3): Promise<Document[]> {
    console.log(`🔍 Finding relevant documents for industry: ${industry}, query: ${query}`)

    // Filter by industry first
    const industryDocs = documentDatabase.filter((doc) => doc.industry === industry || doc.industry === "general")

    if (industryDocs.length === 0) {
        return documentDatabase.slice(0, limit)
    }

    // Simple keyword-based relevance scoring
    const scoredDocs = industryDocs.map((doc) => {
        const queryWords = query.toLowerCase().split(/\s+/)
        const contentWords = doc.content.toLowerCase()
        const titleWords = doc.title.toLowerCase()

        let score = 0
        queryWords.forEach((word) => {
            if (word.length < 3) return

            // Title matches are worth more
            if (titleWords.includes(word)) score += 3

            // Content matches
            if (contentWords.includes(word)) score += 1

            // Tag matches are highly relevant
            doc.tags.forEach((tag) => {
                if (tag.toLowerCase().includes(word)) score += 5
            })
        })

        return { doc, score }
    })

    // Sort by relevance and return top results
    return scoredDocs
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.doc)
}

export async function generateEnhancedContent(context: RAGContext): Promise<string> {
    const relevantDocs = await getRelevantDocuments(context.industry, context.query)

    const ragPrompt = `
You are an expert web designer and content strategist. Use the following industry knowledge to create comprehensive website content.

INDUSTRY: ${context.industry}
QUERY: ${context.query}

RELEVANT KNOWLEDGE:
${relevantDocs
        .map(
            (doc) => `
Title: ${doc.title}
Content: ${doc.content}
---
`,
        )
        .join("\n")}

Based on this knowledge, generate detailed, industry-specific website content that includes:
1. Compelling headlines and descriptions
2. Specific features and sections relevant to the industry
3. Call-to-action suggestions
4. Content that addresses user needs and pain points

Respond with structured JSON containing website sections and content.
`

    try {
        const response = await generateWithGemini({
            prompt: ragPrompt,
            temperature: 0.7,
            maxTokens: 3000,
        })

        return response.response
    } catch (error) {
        console.error("Error generating enhanced content:", error)
        throw error
    }
}
