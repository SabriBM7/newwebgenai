import { NextResponse } from "next/server"
import { generateEmbedding, similaritySearch } from "@/lib/embeddings"

export async function POST(request: Request) {
    try {
        const { query, threshold = 0.7, limit = 5 } = await request.json()

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 })
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(query)

        // Perform similarity search
        const results = await similaritySearch(queryEmbedding, threshold, limit)

        // If no results found, return empty array
        if (!results || results.length === 0) {
            return NextResponse.json({
                results: [],
                message: "No relevant documents found",
            })
        }

        return NextResponse.json({
            results,
            count: results.length,
        })
    } catch (error) {
        console.error("RAG query error:", error)
        return NextResponse.json({ error: "Failed to process RAG query" }, { status: 500 })
    }
}
