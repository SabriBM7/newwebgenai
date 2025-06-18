import { NextResponse } from "next/server"
import { enhancedWebsiteGenerator } from "@/lib/enhanced-website-generator"
import { generateWebsiteWithGeminiRAG } from "@/lib/gemini-rag-generator"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("🚀 Received generation request:", body)

        const {
            websiteName,
            description,
            industry,
            style,
            targetAudience,
            businessGoals,
            uniqueSellingPoints,
            aiProvider,
            includeImages,
        } = body

        // Validate required fields only
        if (!websiteName || !description || !industry || !style) {
            console.log("❌ Missing required fields:", { websiteName, description, industry, style })
            return NextResponse.json(
                { error: "Missing required fields: websiteName, description, industry, style" },
                { status: 400 },
            )
        }

        // Process optional fields
        const processedBusinessGoals = Array.isArray(businessGoals)
            ? businessGoals
            : typeof businessGoals === "string"
                ? businessGoals
                    .split(",")
                    .map((g) => g.trim())
                    .filter(Boolean)
                : []

        const processedUniqueSellingPoints = Array.isArray(uniqueSellingPoints)
            ? uniqueSellingPoints
            : typeof uniqueSellingPoints === "string"
                ? uniqueSellingPoints
                    .split(",")
                    .map((p) => p.trim())
                    .filter(Boolean)
                : []

        const generationParams = {
            websiteName,
            description,
            industry,
            style,
            targetAudience: targetAudience || "General audience",
            businessGoals: processedBusinessGoals,
            uniqueSellingPoints: processedUniqueSellingPoints,
            includeImages: includeImages !== false,
        }

        console.log("📋 Processed generation params:", generationParams)

        if (aiProvider === "gemini-rag") {
            console.log("🚀 Using Gemini RAG generation...")

            if (!process.env.GEMINI_API_KEY) {
                console.log("❌ Gemini API key not found")
                return NextResponse.json(
                    { error: "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables." },
                    { status: 500 },
                )
            }

            try {
                const ragWebsite = await generateWebsiteWithGeminiRAG(generationParams)
                console.log("✅ Gemini RAG generation successful:", ragWebsite)

                return NextResponse.json({
                    success: true,
                    components: ragWebsite.components,
                    metadata: ragWebsite.metadata,
                    content: ragWebsite.content,
                    colors: ragWebsite.colors,
                    message: `Generated comprehensive ${industry} website using Gemini RAG with ${ragWebsite.components.length} components`,
                })
            } catch (ragError) {
                console.error("❌ Gemini RAG generation failed:", ragError)
                // Fall back to enhanced generator
                console.log("🔄 Falling back to enhanced generator...")
            }
        }

        console.log("🚀 Using enhanced website generator...")
        const website = await enhancedWebsiteGenerator.generateWebsite({
            ...generationParams,
            aiProvider: aiProvider || "enhanced",
        })

        console.log("✅ Enhanced generation successful:", website)

        return NextResponse.json({
            success: true,
            components: website.data.components,
            metadata: website.data.metadata || {},
            content: website.data.content || {},
            colors: website.data.colors || {},
            message: `Generated comprehensive ${industry} website with ${website.data.components.length} components`,
        })
    } catch (error) {
        console.error("❌ [WEBSITE_GENERATE_ERROR]", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Internal server error",
                details: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 },
        )
    }
}
