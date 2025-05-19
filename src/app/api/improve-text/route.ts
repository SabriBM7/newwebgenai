import { type NextRequest, NextResponse } from "next/server"
import { improveTextContent } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { content, tone, purpose } = body

        if (!content || !tone || !purpose) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const improvedContent = await improveTextContent(content, tone, purpose)

        return NextResponse.json({ improvedContent })
    } catch (error) {
        console.error("Error improving text content:", error)
        return NextResponse.json({ error: "Failed to improve text content" }, { status: 500 })
    }
}
