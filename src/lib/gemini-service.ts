interface GeminiRequest {
    prompt: string
    temperature?: number
    maxTokens?: number
}

interface GeminiResponse {
    response: string
    usage?: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

export async function generateWithGemini(request: GeminiRequest): Promise<GeminiResponse> {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not set")
    }

    try {
        console.log("🚀 Sending request to Gemini API...")

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: request.prompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: request.temperature || 0.7,
                        maxOutputTokens: request.maxTokens || 4000,
                        topP: 0.8,
                        topK: 40,
                    },
                }),
            },
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error("❌ Gemini API error:", response.status, errorText)
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log("✅ Gemini API response received")

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error("❌ Invalid Gemini response structure:", data)
            throw new Error("Invalid response structure from Gemini API")
        }

        const generatedText = data.candidates[0].content.parts[0].text

        return {
            response: generatedText,
            usage: {
                promptTokens: data.usageMetadata?.promptTokenCount || 0,
                completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
                totalTokens: data.usageMetadata?.totalTokenCount || 0,
            },
        }
    } catch (error) {
        console.error("❌ Error calling Gemini API:", error)
        throw error
    }
}
