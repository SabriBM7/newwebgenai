// src/lib/advanced-ai-generator.ts

import type { GenerateWebsiteParams, WebsiteSection } from "@/types";
import type { WebsiteStrategy } from "./core-generation.service";
import { callAI } from "./ai-helpers";
import { getOptimalComponents } from "./enhanced-component-library";

class AdvancedAIGenerator {
    public async populateComponentBlueprint(
        strategy: WebsiteStrategy,
        componentBlueprint: string[],
        params: GenerateWebsiteParams
    ): Promise<WebsiteSection[]> {
        const populatedComponents: WebsiteSection[] = [];
        const componentLibrary = getOptimalComponents(params.industry, params.style);

        for (const componentNameOrType of componentBlueprint) {
            console.log(`   - Populating: ${componentNameOrType}...`);

            // --- FINAL CORRECTED LOGIC ---
            // This is now much more flexible.
            let componentVariant =
                // 1. First, try for an exact name match (e.g., "VideoHero")
                componentLibrary.find(c => c && c.name === componentNameOrType) ||
                // 2. If not found, try to find a name that INCLUDES the type (e.g., find "CorporateHeader" from "Header")
                componentLibrary.find(c => c && c.name.includes(componentNameOrType.replace("Section", "")));
            // --- END OF FIX ---

            if (!componentVariant) {
                console.warn(`   - ⚠️ No component variant found for: ${componentNameOrType}. Skipping.`);
                continue;
            }

            const prompt = `
                You are a master copywriter. Your task is to generate the JSON props for a single React component.
                Your tone of voice is: "${strategy.brandIdentity.toneOfVoice}".
                The website is for "${strategy.brandIdentity.name}".

                Generate JSON props for the "${componentVariant.name}" component.
                Component Description: "${componentVariant.description}"
                Required Props Structure: ${JSON.stringify(componentVariant.props, null, 2)}

                Fill the props with compelling, high-quality content based on the strategy.
                ONLY respond with the valid JSON object for the props.
            `;

            try {
                const propsJson = await callAI(prompt, params.aiProvider);
                populatedComponents.push({
                    type: componentVariant.name,
                    variant: componentVariant.name,
                    props: JSON.parse(propsJson),
                });
            } catch (error) {
                console.error(`   - ❌ Failed to generate props for ${componentNameOrType}. Skipping. Error:`, error);
            }
        }
        return populatedComponents;
    }
}

export const advancedAIGenerator = new AdvancedAIGenerator();