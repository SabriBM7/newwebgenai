interface WizardLMOptions {
    prompt: string
    temperature?: number
    maxTokens?: number
    topP?: number
    frequencyPenalty?: number
    presencePenalty?: number
}

interface WizardLMResponse {
    response: string
    usage: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

export async function generateWithWizardLM(options: WizardLMOptions): Promise<WizardLMResponse> {
    try {
        console.log("🧙‍♂️ Generating with WizardLM...")

        // Check if we're using local Ollama for WizardLM
        const useOllama = process.env.USE_OLLAMA === "true"

        if (useOllama) {
            return await generateWithOllama(options)
        } else {
            return await generateWithWizardLMAPI(options)
        }
    } catch (error) {
        console.error("Error generating with WizardLM:", error)
        throw error
    }
}

async function generateWithOllama(options: WizardLMOptions): Promise<WizardLMResponse> {
    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "wizardlm",
                prompt: options.prompt,
                stream: false,
                options: {
                    temperature: options.temperature || 0.7,
                    num_predict: options.maxTokens || 4000,
                    top_p: options.topP || 0.9,
                },
            }),
        })

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`)
        }

        const data = await response.json()

        return {
            response: data.response,
            usage: {
                promptTokens: data.prompt_eval_count || 0,
                completionTokens: data.eval_count || 0,
                totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
            },
        }
    } catch (error) {
        console.error("Error generating with Ollama:", error)
        throw error
    }
}

async function generateWithWizardLMAPI(options: WizardLMOptions): Promise<WizardLMResponse> {
    try {
        // This would be your API endpoint for WizardLM if you're using a hosted service
        // For now, we'll use a mock implementation
        console.log("⚠️ Using mock WizardLM API - replace with your actual API endpoint")

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Return mock response
        return {
            response: `{
        "components": [
          {
            "type": "Header",
            "props": {
              "logo": "Company Name",
              "links": [
                {"text": "Home", "url": "#home"},
                {"text": "About", "url": "#about"},
                {"text": "Services", "url": "#services"},
                {"text": "Contact", "url": "#contact"}
              ]
            }
          },
          {
            "type": "HeroSection",
            "props": {
              "title": "Welcome to Our Company",
              "subtitle": "Professional Services",
              "description": "We provide top-quality services to meet your needs.",
              "buttonText": "Learn More",
              "buttonLink": "#about",
              "image": "/placeholder.svg?height=600&width=800&text=Hero+Image"
            }
          }
        ],
        "content": {
          "hero": {
            "title": "Welcome to Our Company",
            "subtitle": "Professional Services"
          }
        },
        "images": {},
        "colors": {
          "primary": "#3182ce",
          "secondary": "#bee3f8",
          "accent": "#2c5282"
        }
      }`,
            usage: {
                promptTokens: options.prompt.length / 4,
                completionTokens: 500,
                totalTokens: options.prompt.length / 4 + 500,
            },
        }
    } catch (error) {
        console.error("Error generating with WizardLM API:", error)
        throw error
    }
}
