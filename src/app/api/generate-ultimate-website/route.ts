import { type NextRequest, NextResponse } from "next/server"
import { enhancedWebsiteGenerator } from "@/lib/enhanced-website-generator"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log("🚀 Ultimate Website Generation Request:", body)

        const {
            description,
            websiteName,
            industry,
            style,
            aiProvider,
            includeImages,
            targetAudience,
            businessGoals,
            uniqueSellingPoints,
        } = body

        // Use the enhanced website generator
        const result = await enhancedWebsiteGenerator.generateWebsite({
            description: description || "Professional business website",
            websiteName: websiteName || "Your Business",
            industry: industry || "technology",
            style: style || "modern",
            aiProvider: aiProvider || "enhanced",
            includeImages: includeImages !== false,
            targetAudience,
            businessGoals: Array.isArray(businessGoals) ? businessGoals : [],
            uniqueSellingPoints: Array.isArray(uniqueSellingPoints) ? uniqueSellingPoints : [],
        })

        console.log(`✅ Generated website with ${result.data.components.length} components`)

        // Return the data in the expected format
        const responseData = {
            components: result.data.components,
            metadata: result.data.metadata || {},
            websiteName: websiteName || "Your Business",
            industry: industry || "technology",
            style: style || "modern",
            description: description || "Professional business website",
            generatedAt: new Date().toISOString(),
            success: true,
        }

        return NextResponse.json(responseData)
    } catch (error) {
        console.error("❌ Ultimate generation error:", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Generation failed",
                success: false,
            },
            { status: 500 },
        )
    }
}
