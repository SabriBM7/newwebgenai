import { NextResponse } from "next/server"
import { generateEmbedding, similaritySearch } from "@/lib/embeddings"

export async function POST(request: Request) {
    try {
        const { messages, threshold = 0.7, limit = 5 } = await request.json()

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 })
        }

        // Get the last user message
        const lastUserMessage = messages.filter((m) => m.role === "user").pop()

        if (!lastUserMessage) {
            return NextResponse.json({ error: "No user message found" }, { status: 400 })
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(lastUserMessage.content)

        // Perform similarity search
        const searchResults = await similaritySearch(queryEmbedding, threshold, limit)

        // Format context from search results
        let context = ""
        if (searchResults && searchResults.length > 0) {
            context = searchResults
                .map((result) => {
                    return `Content: ${result.content}\nSource: ${result.metadata?.title || "Unknown"}\nRelevance: ${Math.round(result.similarity * 100)}%`
                })
                .join("\n\n")
        }

        // Call OpenAI API with the context and messages
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            return NextResponse.json({
                message: {
                    role: "assistant",
                    content: "I'm sorry, but I'm not configured properly. Please contact the administrator.",
                },
                context: [],
            })
        }

        const systemMessage = {
            role: "system",
            content: `You are a helpful assistant. Use the following retrieved documents to answer the user's question. If you don't know the answer, just say you don't know.\n\nRetrieved documents:\n${context}`,
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [systemMessage, ...messages],
                    temperature: 0.7,
                    stream: false,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(`OpenAI API error: ${JSON.stringify(error)}`)
            }

            const result = await response.json()

            return NextResponse.json({
                message: {
                    role: "assistant",
                    content: result.choices[0].message.content,
                },
                context: searchResults || [],
            })
        } catch (error) {
            console.error("OpenAI API error:", error)

            // Return a fallback response
            return NextResponse.json({
                message: {
                    role: "assistant",
                    content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
                },
                context: searchResults || [],
            })
        }
    } catch (error) {
        console.error("Chat error:", error)
        return NextResponse.json(
            {
                message: {
                    role: "assistant",
                    content: "An error occurred while processing your request.",
                },
                context: [],
            },
            { status: 500 },
        )
    }
}
