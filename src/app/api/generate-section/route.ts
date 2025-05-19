import { type NextRequest, NextResponse } from "next/server"
import { generateSectionContent } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { sectionType, industry, tone, existingContent } = body

        if (!sectionType || !industry || !tone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const sectionContent = await generateSectionContent(sectionType, industry, tone, existingContent)

        return NextResponse.json({ sectionContent })
    } catch (error) {
        console.error("Error generating section content:", error)
        return NextResponse.json({ error: "Failed to generate section content" }, { status: 500 })
    }
}
