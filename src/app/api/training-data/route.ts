import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await request.json()

        // Validate the data
        if (!data.industry || !data.purpose || !data.targetAudience || !data.style || !data.features || !data.tone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Get Supabase client
        const supabase = createClient()

        // Add timestamp and user info
        const trainingEntry = {
            ...data,
            user_id: session.user?.id,
        }

        // Save to database
        const { error } = await supabase.from("training_data").insert(trainingEntry)

        if (error) {
            console.error("Database error:", error)
            return NextResponse.json({ error: "Failed to save training data" }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: "Training data received",
        })
    } catch (error) {
        console.error("Error saving training data:", error)
        return NextResponse.json({ error: "Failed to save training data" }, { status: 500 })
    }
}
