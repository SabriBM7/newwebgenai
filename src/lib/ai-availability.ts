export async function checkAIAvailability(): Promise<{
    wizardlm: boolean
    ollama: boolean
}> {
    try {
        // Check if Ollama is available
        const ollamaResponse = await fetch("/api/test-ollama-connection", {
            method: "GET",
        }).catch(() => null)

        const ollamaAvailable = ollamaResponse?.ok || false

        // For now, assume WizardLM is available if we have the right environment
        const wizardlmAvailable = !!process.env.OPENAI_API_KEY

        return {
            wizardlm: wizardlmAvailable,
            ollama: ollamaAvailable,
        }
    } catch (error) {
        console.error("Error checking AI availability:", error)
        return {
            wizardlm: false,
            ollama: false,
        }
    }
}
