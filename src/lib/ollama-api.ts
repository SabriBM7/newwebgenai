/**
 * Service for interacting with the local Ollama API
 */
export class OllamaAPI {
    private baseUrl = "http://localhost:11434"

    /**
     * Checks if Ollama is available and returns available models
     */
    async checkAvailability(): Promise<{ available: boolean; models?: string[] }> {
        try {
            console.log("🔍 Checking Ollama availability...")
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // Short timeout to avoid hanging
                signal: AbortSignal.timeout(5000),
            })

            if (!response.ok) {
                console.warn(`⚠️ Ollama API not available: ${response.status} ${response.statusText}`)
                return { available: false }
            }

            const data = await response.json()
            const models = data.models?.map((model: any) => model.name) || []
            console.log(`✅ Ollama is available with models: ${models.join(", ")}`)
            return { available: true, models }
        } catch (error) {
            console.warn("⚠️ Ollama API not available:", error)
            return { available: false }
        }
    }

    /**
     * Generates text using the specified Ollama model
     */
    async generateText({
                           prompt,
                           model = "llama3",
                           temperature = 0.7,
                           maxTokens = 2048,
                       }: {
        prompt: string
        model?: string
        temperature?: number
        maxTokens?: number
    }): Promise<string> {
        try {
            console.log(`📝 Sending prompt to Ollama API (model: ${model})...`)

            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model,
                    prompt,
                    stream: false,
                    options: {
                        temperature,
                        num_predict: maxTokens,
                    },
                }),
            })

            if (!response.ok) {
                console.error(`❌ Ollama API error: ${response.status} ${response.statusText}`)
                throw new Error(`Ollama API error: ${response.status}`)
            }

            const data = await response.json()
            console.log("✅ Received response from Ollama")
            return data.response
        } catch (error) {
            console.error("❌ Error calling Ollama:", error)
            throw error
        }
    }

    /**
     * Lists all available models in the Ollama instance
     */
    async listModels(): Promise<string[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status}`)
            }

            const data = await response.json()
            return data.models?.map((model: any) => model.name) || []
        } catch (error) {
            console.error("❌ Error listing Ollama models:", error)
            return []
        }
    }
}

export const ollamaAPI = new OllamaAPI()
