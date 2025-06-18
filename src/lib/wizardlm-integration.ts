import { generateWithWizardLM } from "./wizardlm-service"
import { getRelevantDocuments } from "./embeddings"
import { getIndustryTemplate } from "./comprehensive-industry-templates"
import componentDataset from "@/lib/componentDataset.json"

interface WebsiteGenerationParams {
    description: string
    websiteName: string
    industry: string
    style: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
    includeImages?: boolean
}

function getAvailableComponentsForIndustry(industry: string): string[] {
    return componentDataset.components
        .filter((c) => c.industries.includes(industry) || c.industries.includes("all"))
        .map((c) => c.component_name)
}

export async function generateWebsiteWithWizardLMRAG(params: WebsiteGenerationParams) {
    try {
        console.log("🚀 Starting WizardLM RAG website generation...")

        // Step 1: Get relevant documents based on industry and description
        const relevantDocs = await getRelevantDocuments(params.industry, params.description)
        console.log(`📚 Retrieved ${relevantDocs.length} relevant documents`)

        // Step 2: Get industry-specific template
        const industryTemplate = getIndustryTemplate(params.industry)

        // Step 3: Create enhanced prompt with RAG context
        const prompt = createEnhancedPrompt(params, relevantDocs, industryTemplate)

        // Step 4: Generate website content with WizardLM
        const wizardResponse = await generateWithWizardLM({
            prompt: prompt,
            temperature: 0.7,
            maxTokens: 4000,
        })

        // Step 5: Parse and structure the response
        const websiteData = parseWizardLMResponse(wizardResponse.response, params)

        // Step 6: Format the response for the renderer
    @@ -43,67 +50,72 @@ export async function generateWebsiteWithWizardLMRAG(params: WebsiteGenerationPa
        data: {
            components: websiteData.components,
                metadata: {
                title: `${params.websiteName} - Professional ${params.industry} Website`,
                    description: params.description.substring(0, 160),
                    industry: params.industry,
                    style: params.style,
                    aiUsed: "WizardLM-RAG",
                    generatedAt: new Date().toISOString(),
            },
            content: websiteData.content,
                images: websiteData.images,
                colors: websiteData.colors,
        },
    }
} catch (error) {
    console.error("❌ Error generating website with WizardLM RAG:", error)
    throw error
}
}

function createEnhancedPrompt(params: WebsiteGenerationParams, relevantDocs: any[], industryTemplate: any): string {
    // Create context from relevant documents
    const ragContext = relevantDocs.map((doc) => `${doc.title}: ${doc.content}`).join("\n\n")

    const availableComponents = getAvailableComponentsForIndustry(params.industry).join(', ')

    return `You are a professional web designer and copywriter. Create a comprehensive website for a ${params.industry} business.

BUSINESS DETAILS:
- Name: ${params.websiteName}
- Industry: ${params.industry}
- Description: ${params.description}
- Style: ${params.style}
${params.targetAudience ? `- Target Audience: ${params.targetAudience}` : ""}
${params.businessGoals?.length ? `- Business Goals: ${params.businessGoals.join(", ")}` : ""}
${params.uniqueSellingPoints?.length ? `- Unique Selling Points: ${params.uniqueSellingPoints.join(", ")}` : ""}

INDUSTRY-SPECIFIC KNOWLEDGE:
${ragContext}

INDUSTRY TEMPLATE REFERENCE:
${JSON.stringify(industryTemplate, null, 2)}

AVAILABLE COMPONENTS:
${availableComponents}

TASK: Generate a comprehensive website structure with ALL necessary components for a ${params.industry} business. Include specialized sections like ${getIndustrySpecificSections(params.industry)}.

OUTPUT FORMAT:
Return a JSON object with the following structure:
{
  "components": [
    {
      "type": "ComponentType",
      "props": {
        // Component properties
      }
    },
    // More components...
  ],
  "content": {
    // Website content organized by section
  },
  "images": {
    // Image descriptions and URLs
  },
  "colors": {
    // Color scheme
  }
}