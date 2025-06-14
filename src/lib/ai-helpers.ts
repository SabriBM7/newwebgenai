// src/lib/ai-helpers.ts

import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { Ollama } from "ollama"; // Import from the correct 'ollama' package

// Instantiate the AI providers
const openai = createOpenAI({});
const ollama = new Ollama({
    // Assumes Ollama is running on http://localhost:11434
    // You can configure host if it's different, e.g., host: 'http://192.168.1.100:11434'
});

/**
 * A centralized function to call our AI models.
 * It now uses the official `ollama` package for local models.
 */
export async function callAI(prompt: string, provider: string = "enhanced"): Promise<string> {
    try {
        console.log(`   - Calling AI Provider: ${provider}...`);

        if (provider === "openai") {
            // --- OpenAI Path ---
            const { text } = await generateText({
                model: openai("gpt-4o-mini"),
                prompt: prompt,
                temperature: 0.7,
                maxTokens: 4096,
            });
            return extractJson(text);

        } else {
            // --- Ollama Path (for 'enhanced', 'ollama', 'wizardlm', etc.) ---
            let modelName;
            switch (provider) {
                case "wizardlm":
                    modelName = "wizardlm2";
                    break;
                case "enhanced":
                case "ollama":
                default:
                    modelName = "llama3"; // Default to llama3 for local generation
                    break;
            }

            console.log(`   - Using Ollama model: ${modelName}`);

            const response = await ollama.generate({
                model: modelName,
                prompt: prompt,
                stream: false, // We want the full response, not a stream
                format: "json", // Instruct Ollama to output valid JSON
            });

            return response.response;
        }

    } catch (error) {
        console.error(`❌ AI Call Failed for provider ${provider}:`, error);
        throw new Error(`AI provider ${provider} failed.`);
    }
}

// Helper function to extract JSON from a string that might be wrapped in markdown
function extractJson(text: string): string {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
        return jsonMatch[0];
    }
    // If no JSON object/array is found, we assume the AI might have returned a raw string,
    // which could be the case for non-JSON-formatted prompts. We'll return it as is.
    return text;
}