import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch("http://localhost:11434/api/tags", {
            method: "GET",
        })

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: "Ollama not running",
                    message: "Make sure Ollama is installed and running on port 11434",
                    status: response.status,
                },
                { status: 503 },
            )
        }

        const data = await response.json()
        return NextResponse.json({
            success: true,
            message: "Ollama is running",
            models: data.models || [],
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: "Connection failed",
                message: "Could not connect to Ollama. Make sure it's running on localhost:11434",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 503 },
        )
    }
}
