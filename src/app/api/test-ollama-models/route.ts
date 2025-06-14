import { NextResponse } from "next/server"
import { ollamaAPI } from "@/lib/ollama-api"

export async function GET() {
    try {
        const availability = await ollamaAPI.checkAvailability()

        if (availability.available) {
            // If available, get the list of models
            const models = await ollamaAPI.listModels()
            return NextResponse.json({ available: true, models })
        }

        return NextResponse.json({ available: false })
    } catch (error) {
        console.error("Error testing Ollama:", error)
        return NextResponse.json({ available: false, error: "Failed to connect to Ollama" })
    }
}
