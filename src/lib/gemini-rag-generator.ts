import { retrieveIndustryDocuments } from './enhanced-rag-database';
import { getAvailableComponentsForIndustry } from './component-utils';
import { createComprehensivePrompt } from './gemini-prompt';
import { generateGeminiResponse } from './gemini-client'; // Your AI SDK wrapper
import { buildWebsiteFromResponse } from './response-parser'; // To structure AI output
import { WebsiteGenerationParams, WebsiteGenerationResult } from './types';

export async function generateWebsiteWithGeminiRAG(
    params: WebsiteGenerationParams
): Promise<WebsiteGenerationResult> {
    try {
        console.log('🚀 Starting Gemini RAG generation...');
        const { industry } = params;

        // 🔍 1. Load knowledge base documents for the selected industry
        const industryDocs = await retrieveIndustryDocuments(industry);
        if (!industryDocs.length) {
            throw new Error(`No documents found for industry "${industry}"`);
        }
        console.log(`✅ Retrieved ${industryDocs.length} documents for industry: ${industry}`);

        // 🧱 2. Load available TSX component metadata for the industry
        const components = await getAvailableComponentsForIndustry(industry);
        if (!components.length) {
            throw new Error(`No components available for industry "${industry}"`);
        }
        console.log(`✅ Found ${components.length} components for industry "${industry}"`);

        // 🧠 3. Build the full RAG prompt
        const prompt = createComprehensivePrompt(params, industryDocs, components);
        console.log('🧠 Prompt constructed');

        // 🤖 4. Send prompt to Gemini
        const aiResponse = await generateGeminiResponse(prompt);
        if (!aiResponse || !aiResponse.content) {
            throw new Error('AI response is empty');
        }

        // 🏗️ 5. Transform AI response into website data structure
        const website = buildWebsiteFromResponse(aiResponse.content, params, components);

        return {
            success: true,
            ...website
        };
    } catch (error: any) {
        console.error('❌ Gemini RAG generation failed:', error.message || error);
        return {
            success: false,
            error: `Gemini RAG generation failed: ${error.message || error}`
        };
    }
}
