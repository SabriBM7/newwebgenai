// AI Service for handling AI-related operations
import type { Website } from "@/types"

export interface AIServiceInterface {
    generateWebsite(prompt: string, industry: string, style: string): Promise<Website>
    isAvailable(): Promise<boolean>
}

class AIService implements AIServiceInterface {
    private baseUrl: string

    constructor(baseUrl = "/api/ollama-advanced") {
        this.baseUrl = baseUrl
    }

    async isAvailable(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/health`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store", // Add this to prevent caching
            })

            if (response.ok) {
                const data = await response.json()
                console.log("Ollama health check response:", data)
                return data.status === "available"
            }
            return false
        } catch (error) {
            console.error("AI service health check failed:", error)
            return false
        }
    }

    async generateWebsite(prompt: string, industry: string, style: string): Promise<Website> {
        try {
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt,
                    industry,
                    style,
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error("Error generating website:", error)
            throw error
        }
    }
}

export const aiService = new AIService()
