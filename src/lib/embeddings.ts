import { OpenAIEmbeddings } from "./openai-embeddings"
import { createClient } from "@supabase/supabase-js"

// Initialize the OpenAI embeddings client
const embeddingsClient = new OpenAIEmbeddings()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Generate an embedding for a text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        return await embeddingsClient.embed(text)
    } catch (error) {
        console.error("Error generating embedding:", error)
        throw error
    }
}

/**
 * Perform a similarity search in the document_chunks table
 */
export async function similaritySearch(
    embedding: number[],
    threshold = 0.7,
    limit = 5,
): Promise<Array<{ id: number; content: string; metadata: any; similarity: number }>> {
    try {
        const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: limit,
        })

        if (error) {
            console.error("Error performing similarity search:", error)
            return []
        }

        return data || []
    } catch (error) {
        console.error("Error in similarity search:", error)
        return []
    }
}
