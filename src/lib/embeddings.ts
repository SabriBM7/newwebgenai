import { createServerClient } from "./supabase-server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate embeddings for a text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
        })

        return response.data[0].embedding
    } catch (error) {
        console.error("Error generating embedding:", error)

        // Return a mock embedding for development/fallback
        console.warn("Using fallback random embedding")
        return Array(1536)
            .fill(0)
            .map(() => Math.random() * 2 - 1)
    }
}

/**
 * Store a document chunk with its embedding in Supabase
 */
export async function storeDocumentChunk(content: string, metadata: any, embedding: number[]): Promise<number> {
    const supabase = createServerClient()

    const { data, error } = await supabase
        .from("document_chunks")
        .insert({
            content,
            metadata,
            embedding,
        })
        .select("id")
        .single()

    if (error) {
        console.error("Error storing document chunk:", error)
        throw new Error("Failed to store document chunk")
    }

    return data.id
}

/**
 * Perform a similarity search using the provided query embedding
 */
export async function similaritySearch(queryEmbedding: number[], threshold = 0.7, limit = 5) {
    const supabase = createServerClient()

    const { data, error } = await supabase.rpc("match_documents", {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit,
    })

    if (error) {
        console.error("Error performing similarity search:", error)
        return []
    }

    return data || []
}
