import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()

        console.log("Received messages:", messages)

        // Format messages for Ollama generate API (simpler than chat API)
        let prompt = "You are a helpful assistant specialized in website generation.\n\n"

        messages.forEach((msg: any) => {
            if (msg.role === "user") {
                prompt += `User: ${msg.content}\n\n`
            } else if (msg.role === "assistant") {
                prompt += `Assistant: ${msg.content}\n\n`
            }
        })

        prompt += "Assistant:"

        console.log("Sending request to Ollama...")

        // Try the generate API instead of chat API
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3:8b",
                prompt: prompt,
                stream: false,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Ollama API error: ${response.status} - ${errorText}`)
            return NextResponse.json({ error: `Ollama API error: ${response.status}` }, { status: response.status })
        }

        const data = await response.json()
        console.log("Received response from Ollama")

        // Return a properly formatted message object
        return NextResponse.json({
            message: {
                role: "assistant",
                content: data.response || "I couldn't generate a response.",
            },
        })
    } catch (error: any) {
        console.error("Error in Ollama chat API:", error)
        return NextResponse.json({ error: `Failed to process your request: ${error.message}` }, { status: 500 })
    }
}
