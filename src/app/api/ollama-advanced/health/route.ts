import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Try to connect to Ollama using the version endpoint
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 2000) // 2 second timeout

        const response = await fetch("http://localhost:11434/api/version", {
            method: "GET",
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json(
                {
                    status: "available",
                    version: data.version,
                },
                { status: 200 },
            )
        } else {
            return NextResponse.json(
                {
                    status: "unavailable",
                    error: `Ollama returned status: ${response.status}`,
                },
                { status: 503 },
            )
        }
    } catch (error) {
        console.error("Error checking Ollama health:", error)
        return NextResponse.json(
            {
                status: "unavailable",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 503 },
        )
    }
}
