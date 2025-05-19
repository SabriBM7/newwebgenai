import { generateEmbedding, storeDocumentChunk } from "./embeddings"
import { createServerClient } from "./supabase-server"

/**
 * Process a document by chunking it and generating embeddings
 */
export async function processDocument(text: string, metadata: any): Promise<{ ids: number[]; chunkCount: number }> {
    try {
        // Create chunks from the text
        const chunks = chunkText(text, 1000, 200)
        const chunkCount = chunks.length

        // Store document in Supabase
        const supabase = createServerClient()
        const { data: document, error } = await supabase
            .from("documents")
            .insert({
                title: metadata.title || "Untitled Document",
                description: metadata.description || "",
                file_path: metadata.filePath || "",
                file_type: metadata.fileType || "text/plain",
                user_id: metadata.userId || null,
            })
            .select("id")
            .single()

        if (error) {
            console.error("Error storing document:", error)
            throw new Error("Failed to store document")
        }

        // Add document ID to metadata
        metadata.documentId = document.id

        // Process each chunk
        const ids: number[] = []

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i]

            // Generate embedding for the chunk
            const embedding = await generateEmbedding(chunk)

            // Store chunk with embedding
            const chunkMetadata = {
                ...metadata,
                chunkIndex: i,
                totalChunks: chunks.length,
            }

            const id = await storeDocumentChunk(chunk, chunkMetadata, embedding)
            ids.push(id)
        }

        return { ids, chunkCount }
    } catch (error) {
        console.error("Error processing document:", error)
        throw new Error("Failed to process document")
    }
}

/**
 * Split text into chunks with overlap
 */
function chunkText(text: string, chunkSize: number, overlap: number): string[] {
    const chunks: string[] = []

    // Clean and normalize text
    const cleanedText = text.replace(/\s+/g, " ").trim()

    // If text is shorter than chunk size, return it as a single chunk
    if (cleanedText.length <= chunkSize) {
        return [cleanedText]
    }

    // Split text into chunks with overlap
    let startIndex = 0

    while (startIndex < cleanedText.length) {
        // Get chunk of text
        let endIndex = startIndex + chunkSize
        let chunk = cleanedText.substring(startIndex, endIndex)

        // If we're not at the end of the text, try to break at a sentence or paragraph
        if (endIndex < cleanedText.length) {
            // Look for a good breaking point (period, question mark, exclamation point, newline)
            const breakPoints = [". ", "? ", "! ", "\n"]
            let breakIndex = -1

            for (const breakPoint of breakPoints) {
                const lastIndex = chunk.lastIndexOf(breakPoint)
                if (lastIndex > breakIndex) {
                    breakIndex = lastIndex + breakPoint.length
                }
            }

            // If we found a good breaking point, use it
            if (breakIndex > 0) {
                chunk = chunk.substring(0, breakIndex)
                endIndex = startIndex + breakIndex
            }
        }

        // Add chunk to list
        chunks.push(chunk)

        // Move start index for next chunk, accounting for overlap
        startIndex = endIndex - overlap
    }

    return chunks
}
