import { NextResponse } from "next/server"
import { ollamaWebsiteGenerator } from "@/lib/ollama-website-generator"

export async function POST(request: Request) {
    try {
        const {
            websiteName,
            industry,
            description,
            style,
            targetAudience,
            businessGoals,
            uniqueSellingPoints,
            includeImages,
        } = await request.json()

        // Validate required fields
        if (!websiteName || !industry || !style) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        console.log("🚀 Starting website generation with Ollama:", {
            websiteName,
            industry,
            style,
        })

        // Generate website with Ollama
        const website = await ollamaWebsiteGenerator.generateWebsite({
            websiteName,
            industry,
            description: description || `A professional ${industry} business`,
            style,
            targetAudience,
            businessGoals: businessGoals
                ? Array.isArray(businessGoals)
                    ? businessGoals
                    : businessGoals.split(",")
                : undefined,
            uniqueSellingPoints: uniqueSellingPoints
                ? Array.isArray(uniqueSellingPoints)
                    ? uniqueSellingPoints
                    : uniqueSellingPoints.split(",")
                : undefined,
            includeImages: includeImages !== false, // Default to true
        })

        console.log("✅ Website generation completed successfully")

        return NextResponse.json({
            success: true,
            data: website,
            metadata: {
                generatedAt: new Date().toISOString(),
                aiUsed: "Ollama",
                model: process.env.OLLAMA_MODEL || "wizardlm2",
                componentsCount: website.components.length,
            },
        })
    } catch (error) {
        console.error("❌ Error in website generation:", error)

        return NextResponse.json(
            {
                error: "Failed to generate website",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
