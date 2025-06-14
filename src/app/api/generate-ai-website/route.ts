import { type NextRequest, NextResponse } from "next/server"
import { generateAdvancedWebsite } from "@/lib/advanced-ai-generator"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { description, websiteName, industry, style, aiProvider, includeImages } = body

        if (!description || !description.trim()) {
            return NextResponse.json({ error: "Website description is required" }, { status: 400 })
        }

        console.log("🚀 Starting advanced website generation...")

        const websiteData = await generateAdvancedWebsite({
            description: description.trim(),
            websiteName: websiteName || "My Website",
            industry: industry || "technology",
            style: style || "modern",
            aiProvider: aiProvider || "auto",
            includeImages: includeImages !== false,
        })

        console.log("✅ Advanced website generated successfully!")
        return NextResponse.json(websiteData)
    } catch (error) {
        console.error("❌ Error in generate-advanced-website API:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate website" },
            { status: 500 },
        )
    }
}
