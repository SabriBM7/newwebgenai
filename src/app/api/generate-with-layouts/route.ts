import { type NextRequest, NextResponse } from "next/server"
import { enhancedWebsiteGeneratorV2 } from "@/lib/enhanced-website-generator-v2"
import { getLayoutVariations } from "@/lib/industry-layout-system"

export async function POST(request: NextRequest) {
    try {
        const params = await request.json()

        // Validate required fields
        if (!params.websiteName || !params.industry || !params.style) {
            return NextResponse.json({ error: "Please provide all the required fields" }, { status: 400 })
        }

        console.log("🚀 Starting website generation with industry-specific layouts:", {
            websiteName: params.websiteName,
            industry: params.industry,
            style: params.style,
            layoutVariation: params.layoutVariation,
            includeImages: params.includeImages,
        })

        // Generate website using the new layout system
        const website = await enhancedWebsiteGeneratorV2.generateWebsite({
            description: params.description || `A professional ${params.industry} business`,
            websiteName: params.websiteName,
            industry: params.industry,
            style: params.style,
            aiProvider: params.aiProvider || "enhanced",
            includeImages: params.includeImages !== false,
            targetAudience: params.targetAudience,
            businessGoals: params.businessGoals,
            uniqueSellingPoints: params.uniqueSellingPoints,
            layoutVariation: params.layoutVariation,
        })

        console.log("✅ Website generation with layouts completed successfully")

        return NextResponse.json({
            success: true,
            data: website.data,
            metadata: {
                generatedAt: new Date().toISOString(),
                aiUsed: website.data.metadata?.aiUsed || "Industry Layout Templates",
                industry: params.industry,
                style: params.style,
                layoutVariation: params.layoutVariation || "default",
                hasRealImages: website.data.metadata?.hasRealImages || false,
                componentsCount: website.data.components?.length || 0,
                availableVariations: getLayoutVariations(params.industry).map((v) => ({
                    name: v.name,
                    description: v.description,
                    targetAudience: v.targetAudience,
                })),
            },
        })
    } catch (error) {
        console.error("❌ Error in layout-based website generation:", error)

        return NextResponse.json(
            {
                error: "Failed to generate website with layouts",
                details: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        )
    }
}
