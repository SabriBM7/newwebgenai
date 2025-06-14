import { NextResponse } from "next/server"
import { ollamaContentGenerator } from "@/lib/ollama-content-generator"
import { getIndustryConfig } from "@/lib/industry-config"

export async function POST(request: Request) {
    try {
        const { websiteName, industry, description, targetAudience, businessGoals, uniqueSellingPoints } =
            await request.json()

        // Validate required fields
        if (!websiteName || !industry) {
            return NextResponse.json({ error: "Missing required fields: websiteName and industry" }, { status: 400 })
        }

        console.log("🚀 Testing Ollama content generation for:", websiteName)

        // Get industry configuration
        const industryConfig = getIndustryConfig(industry)

        // Generate content
        const content = await ollamaContentGenerator.generateWebsiteContent(
            {
                websiteName,
                industry,
                description: description || `A professional ${industry} business`,
                targetAudience,
                businessGoals: businessGoals ? (Array.isArray(businessGoals) ? businessGoals : [businessGoals]) : undefined,
                uniqueSellingPoints: uniqueSellingPoints
                    ? Array.isArray(uniqueSellingPoints)
                        ? uniqueSellingPoints
                        : [uniqueSellingPoints]
                    : undefined,
            },
            industryConfig,
        )

        return NextResponse.json({
            success: true,
            content,
            metadata: {
                generatedAt: new Date().toISOString(),
                model: process.env.OLLAMA_MODEL || "wizardlm2",
                industry,
            },
        })
    } catch (error) {
        console.error("❌ Error in Ollama content generation test:", error)

        return NextResponse.json(
            {
                error: "Failed to generate content",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
