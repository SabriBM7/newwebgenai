/**
 * A class to generate embeddings using OpenAI's API
 */
export class OpenAIEmbeddings {
    private apiKey: string
    private model: string

    constructor(model = "text-embedding-3-small") {
        this.apiKey = process.env.OPENAI_API_KEY || ""
        this.model = model

        if (!this.apiKey) {
            console.warn("OpenAI API key is not set. Some features may not work properly.")
        }
    }

    /**
     * Generate an embedding for a single text
     */
    async embed(text: string): Promise<number[]> {
        if (!this.apiKey) {
            console.error("OpenAI API key is required")
            // Return a mock embedding for development
            return Array(1536)
                .fill(0)
                .map(() => Math.random())
        }

        const response = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                input: text,
                model: this.model,
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`OpenAI API error: ${JSON.stringify(error)}`)
        }

        const result = await response.json()
        return result.data[0].embedding
    }

    /**
     * Generate embeddings for multiple texts
     */
    async embedMany(texts: string[]): Promise<number[][]> {
        // Process in batches to avoid rate limits
        const batchSize = 10
        const embeddings: number[][] = []

        for (let i = 0; i < texts.length; i += batchSize) {
            const batch = texts.slice(i, i + batchSize)
            const batchPromises = batch.map((text) => this.embed(text))
            const batchEmbeddings = await Promise.all(batchPromises)
            embeddings.push(...batchEmbeddings)
        }

        return embeddings
    }
}
