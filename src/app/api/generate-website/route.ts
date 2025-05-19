import { type NextRequest, NextResponse } from "next/server"
import { generateWebsiteContent, type WebsiteGenerationPrompt } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const prompt: WebsiteGenerationPrompt = body.prompt

        if (!prompt || !prompt.industry || !prompt.purpose) {
            return NextResponse.json({ error: "Missing required fields in prompt" }, { status: 400 })
        }

        const websiteContent = await generateWebsiteContent(prompt)

        return NextResponse.json({ websiteContent })
    } catch (error) {
        console.error("Error generating website:", error)
        return NextResponse.json({ error: "Failed to generate website content" }, { status: 500 })
    }
}
