// Compatibility layer for existing code
export async function generateWebsite(params: {
    websiteName: string
    industry: string
    style: string
    description?: string
    includeImages?: boolean
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}) {
    try {
        console.log("🔄 Using compatibility layer for website generation")

        // Call the enhanced API route
        const response = await fetch("/api/generate-enhanced-website", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        })

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`)
        }

        const result = await response.json()

        if (!result.success) {
            throw new Error(result.error || "Generation failed")
        }

        console.log("✅ Website generated successfully via compatibility layer")
        return result.data
    } catch (error) {
        console.error("❌ Error in compatibility layer:", error)
        throw error
    }
}
