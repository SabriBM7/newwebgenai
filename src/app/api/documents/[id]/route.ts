import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const supabase = createServerClient()

        // Get the document
        const { data: document, error: documentError } = await supabase.from("documents").select("*").eq("id", id).single()

        if (documentError) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 })
        }

        // Get the document chunks
        const { data: chunks, error: chunksError } = await supabase
            .from("document_chunks")
            .select("*")
            .filter("metadata->documentId", "eq", id)
            .order("id")

        if (chunksError) {
            console.error("Error fetching document chunks:", chunksError)
        }

        return NextResponse.json({
            document,
            chunks: chunks || [],
        })
    } catch (error) {
        console.error("Error fetching document:", error)
        return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const supabase = createServerClient()

        // Delete the document chunks first
        const { error: chunksError } = await supabase
            .from("document_chunks")
            .delete()
            .filter("metadata->documentId", "eq", id)

        if (chunksError) {
            console.error("Error deleting document chunks:", chunksError)
            return NextResponse.json({ error: "Failed to delete document chunks" }, { status: 500 })
        }

        // Then delete the document
        const { error: documentError } = await supabase.from("documents").delete().eq("id", id)

        if (documentError) {
            console.error("Error deleting document:", documentError)
            return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: "Document deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting document:", error)
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
    }
}
