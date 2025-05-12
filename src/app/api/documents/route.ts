import { NextResponse } from "next/server"
import { processDocument } from "@/lib/document-processor"
import { processPdfBuffer } from "@/lib/pdf-processor"
import { createServerClient } from "@/lib/supabase-server"

export async function GET() {
    try {
        const supabase = createServerClient()

        // Get all documents from the documents table
        const { data: documents, error } = await supabase
            .from("documents")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            throw error
        }

        return NextResponse.json({
            documents,
        })
    } catch (error) {
        console.error("Error fetching documents:", error)
        return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        const title = formData.get("title") as string
        const description = formData.get("description") as string

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 })
        }

        const metadata = {
            title: title || file.name,
            description,
            filename: file.name,
            fileType: file.type,
            uploadedAt: new Date().toISOString(),
        }

        let result

        // Process based on file type
        if (file.type === "application/pdf") {
            // Handle PDF
            const buffer = Buffer.from(await file.arrayBuffer())
            result = await processPdfBuffer(buffer, metadata)

            return NextResponse.json({
                success: true,
                message: `PDF processed successfully. Extracted ${result.pageCount} pages.`,
            })
        } else {
            // Handle text files
            const content = await file.text()
            result = await processDocument(content, metadata)

            return NextResponse.json({
                success: true,
                message: `Document processed successfully into ${result.chunkCount} chunks`,
                documentId: result.ids[0],
            })
        }
    } catch (error) {
        console.error("Document upload error:", error)
        return NextResponse.json({ error: "Failed to process document" }, { status: 500 })
    }
}
