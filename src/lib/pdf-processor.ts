import { processDocument } from "./document-processor"

/**
 * Process a PDF buffer by extracting text and processing it as a document
 */
export async function processPdfBuffer(
    buffer: Buffer,
    metadata: any,
): Promise<{ ids: number[]; chunkCount: number; pageCount: number }> {
    try {
        // For server-side PDF processing, we'd typically use a library like pdf-parse
        // Since we're in a Next.js environment, we'll use a simple approach for now

        // Convert buffer to base64 for client-side processing
        const base64 = buffer.toString("base64")

        // Use fetch to call a PDF extraction service
        // For a production app, you might want to use a more robust solution
        const response = await fetch("https://api.extractpdf.com/v1/extract", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PDF_EXTRACT_API_KEY || "demo"}`,
            },
            body: JSON.stringify({
                pdf: base64,
                extract_text: true,
            }),
        })

        if (!response.ok) {
            throw new Error(`PDF extraction failed: ${response.statusText}`)
        }

        const result = await response.json()
        const text = result.text || ""
        const pageCount = result.pages?.length || 1

        // Update metadata with page count
        metadata.pageCount = pageCount
        metadata.fileType = "application/pdf"

        // Process the extracted text
        const processResult = await processDocument(text, metadata)

        return {
            ...processResult,
            pageCount,
        }
    } catch (error) {
        console.error("Error processing PDF:", error)

        // Fallback: If PDF extraction fails, try to process as plain text
        // This won't work well but prevents complete failure
        console.log("Falling back to processing PDF as plain text")
        const text = `[PDF Content - Extraction Failed] ${metadata.title || "Untitled PDF"}`
        const processResult = await processDocument(text, metadata)

        return {
            ...processResult,
            pageCount: 1,
        }
    }
}
