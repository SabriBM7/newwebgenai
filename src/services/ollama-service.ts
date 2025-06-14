// services/ollama-service.ts
export async function generateWithOllama(prompt: string, options: any = {}) {
    try {
        const response = await fetch('/api/ollama', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                model: options.model || 'llama3',
                temperature: options.temperature || 0.7,
                maxTokens: options.maxTokens || 1000,
                systemPrompt: options.systemPrompt,
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error('Error generating with Ollama:', error);
        throw error;
    }
}