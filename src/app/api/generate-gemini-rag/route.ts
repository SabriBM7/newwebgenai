import { type NextRequest, NextResponse } from "next/server"
import { generateWebsiteWithGeminiRAG } from "@/lib/gemini-rag-generator"

export async function POST(request: NextRequest) {
    try {
        console.log("🚀 Gemini RAG API endpoint called")

        const body = await request.json()
        const {
            websiteName,
            description,
            industry,
            style,
            targetAudience,
            businessGoals,
            uniqueSellingPoints,
            includeImages,
        } = body

        // Validate required fields
        if (!websiteName || !description || !industry) {
            return NextResponse.json(
                { error: "Missing required fields: websiteName, description, industry" },
                { status: 400 },
            )
        }

        // Check for Gemini API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
        }

        console.log(`🎯 Generating website for: ${websiteName} (${industry})`)

        const websiteData = await generateWebsiteWithGeminiRAG({
            websiteName,
            description,
            industry,
            style: style || "modern",
            targetAudience,
            businessGoals: businessGoals || [],
            uniqueSellingPoints: uniqueSellingPoints || [],
            includeImages: includeImages || false,
        })

        console.log(`✅ Generated website with ${websiteData.components.length} components`)

        return NextResponse.json({
            success: true,
            website: websiteData,
            message: `Successfully generated ${industry} website with ${websiteData.components.length} components using Gemini RAG`,
        })
    } catch (error) {
        console.error("❌ Error in Gemini RAG generation:", error)

        return NextResponse.json(
            {
                error: "Failed to generate website",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
