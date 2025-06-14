interface Document {
    id: string
    title: string
    content: string
    industry: string
    tags: string[]
}

// Mock database of industry-specific documents
const documents: Document[] = [
    {
        id: "restaurant-1",
        title: "Restaurant Website Best Practices",
        content:
            "Restaurant websites should include menu sections with high-quality food photography, reservation systems, event calendars for special dinners or tastings, and testimonials from satisfied customers. Include information about the chef, cuisine specialties, and any awards or recognition.",
        industry: "restaurant",
        tags: ["menu", "reservations", "events"],
    },
    {
        id: "restaurant-2",
        title: "Restaurant Menu Design",
        content:
            "Effective restaurant menus should be categorized by appetizers, main courses, desserts, and beverages. Include descriptions that highlight ingredients, preparation methods, and any allergen information. Photos of signature dishes can increase sales by up to 30%.",
        industry: "restaurant",
        tags: ["menu", "design", "food"],
    },
    {
        id: "technology-1",
        title: "Technology Company Website Structure",
        content:
            "Technology company websites should showcase their portfolio of projects, include detailed case studies, feature a team section highlighting expertise, and provide clear service offerings. Include a process section explaining how you work with clients from discovery to delivery.",
        industry: "technology",
        tags: ["portfolio", "services", "process"],
    },
    {
        id: "technology-2",
        title: "Software Development Process",
        content:
            "Effective technology websites should explain their development process with steps like discovery, planning, design, development, testing, deployment, and maintenance. Visual timelines help clients understand project phases and deliverables.",
        industry: "technology",
        tags: ["process", "development", "timeline"],
    },
    {
        id: "healthcare-1",
        title: "Healthcare Website Requirements",
        content:
            "Healthcare websites should include provider directories, service descriptions, patient resources, appointment booking systems, and insurance information. Ensure HIPAA compliance and accessibility for all users.",
        industry: "healthcare",
        tags: ["providers", "services", "appointments"],
    },
    {
        id: "education-1",
        title: "Education Website Components",
        content:
            "Education websites should feature course catalogs, faculty profiles, campus information, event calendars, and admission processes. Include student testimonials, virtual tours, and resources for current and prospective students.",
        industry: "education",
        tags: ["courses", "faculty", "events"],
    },
]

export async function getRelevantDocuments(industry: string, query: string): Promise<Document[]> {
    // In a real implementation, this would use vector embeddings to find similar documents
    // For now, we'll use simple keyword matching

    console.log(`🔍 Finding relevant documents for industry: ${industry}, query: ${query}`)

    // First filter by industry
    const industryDocs = documents.filter((doc) => doc.industry === industry)

    if (industryDocs.length === 0) {
        // If no industry-specific docs, return general docs
        return documents.slice(0, 3)
    }

    // Simple relevance scoring based on keyword matching
    const scoredDocs = industryDocs.map((doc) => {
        const queryWords = query.toLowerCase().split(/\s+/)
        const contentWords = doc.content.toLowerCase()
        const titleWords = doc.title.toLowerCase()

        let score = 0
        queryWords.forEach((word) => {
            if (word.length < 3) return // Skip short words

            if (contentWords.includes(word)) score += 1
            if (titleWords.includes(word)) score += 2

            doc.tags.forEach((tag) => {
                if (tag.includes(word)) score += 3
            })
        })

        return { doc, score }
    })

    // Sort by score and return top results
    const sortedDocs = scoredDocs.sort((a, b) => b.score - a.score).map((item) => item.doc)

    return sortedDocs.slice(0, 5) // Return top 5 most relevant docs
}
