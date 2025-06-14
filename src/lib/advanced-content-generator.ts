// src/lib/advanced-content-generator.ts

import type { GenerateWebsiteParams } from "@/types";
import type { WebsiteStrategy } from "./core-generation.service";
import { callAI } from "./ai-helpers";

class IntelligentContentGenerator {
    public async generateWebsiteStrategy(params: GenerateWebsiteParams): Promise<WebsiteStrategy> {
        const { industry, websiteName, description, aiProvider } = params;

        const prompt = `
            You are a world-class brand strategist and marketing expert.
            Analyze the following business and generate a comprehensive WEBSITE STRATEGY DOCUMENT.

            Business Name: "${websiteName}"
            Industry: "${industry}"
            Business Description: "${description}"

            Your output must be a single, valid JSON object with the following structure:
            {
              "brandIdentity": {
                "name": "${websiteName}",
                "tagline": "A catchy, memorable tagline for the business.",
                "coreConcept": "A 1-2 sentence description of the business's unique theme and value proposition.",
                "toneOfVoice": "Describe the desired tone (e.g., 'Professional and trustworthy, but friendly', 'Luxurious and exclusive', 'Playful and creative')."
              },
              "sitemap": "A JSON array of recommended page names for the website navigation. e.g., [\"Home\", \"Services\", \"About\", \"Portfolio\", \"Contact\"]",
              "keyContent": {
                "uniqueSellingPoints": "A JSON array of 3-4 key benefits or features that make this business stand out.",
                "heroHeadline": "A powerful, attention-grabbing headline for the hero section of the website.",
                "aboutStory": "A brief, 2-sentence story concept for the 'About Us' section that builds trust and connection."
              },
              "visuals": {
                "mood": "Describe the visual mood in a few words (e.g., 'Clean, modern, and tech-focused', 'Warm, rustic, and inviting', 'Minimalist and serene').",
                "imageKeywords": "A detailed, comma-separated list of keywords for searching for stock photos (e.g., 'modern restaurant interior, italian pasta dish, happy customers dining, chef preparing food')."
              }
            }
        `;

        const responseText = await callAI(prompt, aiProvider);
        return JSON.parse(responseText);
    }
}

export const intelligentContentGenerator = new IntelligentContentGenerator();