import { generateEmbedding, storeDocumentChunk } from "./embeddings"
import { createServerClient } from "./supabase-server"

/**
 * Split text into chunks of roughly equal size
 */
export function splitIntoChunks(text: string, chunkSize = 1000, overlap = 200): string[] {
    if (!text || text.length <= chunkSize) {
        return [text]
    }

    const chunks: string[] = []
    let startIndex = 0

    while (startIndex < text.length) {
        // Find a good breaking point near the chunk size
        let endIndex = Math.min(startIndex + chunkSize, text.length)

        // If we're not at the end of the text, try to find a natural break point
        if (endIndex < text.length) {
            // Look for paragraph breaks, then sentence breaks, then word breaks
            const paragraphBreak = text.lastIndexOf("\n\n", endIndex)
            const sentenceBreak = text.lastIndexOf(". ", endIndex)
            const wordBreak = text.lastIndexOf(" ", endIndex)

            if (paragraphBreak > startIndex && paragraphBreak > endIndex - 200) {
                endIndex = paragraphBreak + 2 // Include the paragraph break
            } else if (sentenceBreak > startIndex && sentenceBreak > endIndex - 100) {
                endIndex = sentenceBreak + 2 // Include the period and space
            } else if (wordBreak > startIndex) {
                endIndex = wordBreak + 1 // Include the space
            }
        }

        chunks.push(text.substring(startIndex, endIndex).trim())
        startIndex = endIndex - overlap // Create overlap between chunks
    }

    return chunks
}

/**
 * Process a document by splitting it into chunks, generating embeddings, and storing in Supabase
 */
export async function processDocument(content: string, metadata: any): Promise<{ ids: number[]; chunkCount: number }> {
    // Split the document into chunks
    const chunks = splitIntoChunks(content)

    // Store the document in the documents table
    const supabase = createServerClient()
    const { data: documentData, error: documentError } = await supabase
        .from("documents")
        .insert({
            title: metadata.title || "Untitled Document",
            description: metadata.description,
            file_path: metadata.filePath,
            file_type: metadata.fileType,
            user_id: metadata.userId,
        })
        .select("id")
        .single()

    if (documentError) {
        console.error("Error storing document:", documentError)
        throw new Error("Failed to store document")
    }

    // Add document ID to metadata
    metadata.documentId = documentData.id

    // Process each chunk
    const chunkIds: number[] = []

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]

        // Add chunk metadata
        const chunkMetadata = {
            ...metadata,
            chunkIndex: i,
            totalChunks: chunks.length,
        }

        // Generate embedding for the chunk
        const embedding = await generateEmbedding(chunk)

        // Store the chunk with its embedding
        const chunkId = await storeDocumentChunk(chunk, chunkMetadata, embedding)
        chunkIds.push(chunkId)
    }

    return {
        ids: chunkIds,
        chunkCount: chunks.length,
    }
}
