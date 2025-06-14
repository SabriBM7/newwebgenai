import { NextResponse } from "next/server"
import {
    generateEducationWebsite,
    generateHealthcareWebsite,
    generateTechWebsite,
    generateEcommerceWebsite,
    generateRealEstateWebsite,
    generateRestaurantWebsite,
    generateGenericWebsite,
} from "@/lib/ai-generator"

export const maxDuration = 30 // Set max duration to 30 seconds

export async function POST(request: Request) {
    try {
        const { prompt, industry, style } = await request.json()

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
        }

        try {
            console.log("Attempting to connect to Ollama...")

            // Create an AbortController with a 10-second timeout
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

            const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3",
                    prompt: `Generate a complete website structure for a ${industry} business with a ${style} design style. The website is for: ${prompt}.
    
    Return a valid JSON object with the following structure:
    {
      "metadata": {
        "title": "Website Title",
        "description": "Website description",
        "businessName": "Business Name",
        "industry": "${industry}",
        "style": "${style}",
        "primaryColor": "#hexcolor",
        "secondaryColor": "#hexcolor"
      },
      "header": {
        "type": "header",
        "variant": "minimal|corporate|creative",
        "props": {
          "logo": "Business Name",
          "menu": [
            {"label": "Home", "link": "#"},
            {"label": "Features", "link": "#features"},
            {"label": "About", "link": "#about"},
            {"label": "Contact", "link": "#contact"}
          ]
        }
      },
      "hero": {
        "type": "hero",
        "variant": "standard|split|video",
        "props": {
          "title": "Main headline",
          "subtitle": "Subheadline",
          "description": "Longer description",
          "primaryButton": {"label": "Get Started", "link": "#contact"},
          "secondaryButton": {"label": "Learn More", "link": "#features"},
          "image": "/path-to-image.jpg"
        }
      },
      "sections": [
        {
          "type": "features",
          "variant": "grid|cards|steps",
          "props": {
            "title": "Our Features",
            "subtitle": "What makes us different",
            "features": [
              {"title": "Feature 1", "description": "Description", "icon": "icon-name"},
              {"title": "Feature 2", "description": "Description", "icon": "icon-name"},
              {"title": "Feature 3", "description": "Description", "icon": "icon-name"}
            ]
          }
        },
        {
          "type": "testimonials",
          "variant": "standard|carousel",
          "props": {
            "title": "What Our Clients Say",
            "testimonials": [
              {"quote": "Great service!", "author": "John Doe", "role": "CEO, Company", "avatar": "/avatar1.jpg"},
              {"quote": "Amazing product!", "author": "Jane Smith", "role": "Director, Company", "avatar": "/avatar2.jpg"}
            ]
          }
        }
      ],
      "footer": {
        "type": "footer",
        "variant": "simple|complex",
        "props": {
          "logo": "Business Name",
          "copyright": "© 2023 Business Name. All rights reserved.",
          "links": [
            {"label": "Privacy Policy", "link": "#"},
            {"label": "Terms of Service", "link": "#"}
          ],
          "socialLinks": [
            {"platform": "twitter", "link": "#"},
            {"platform": "facebook", "link": "#"},
            {"platform": "instagram", "link": "#"}
          ]
        }
      }
    }
    
    Make sure to include at least 3 sections in the "sections" array, with appropriate content for a ${industry} business. Use realistic and specific content, not placeholder text.
    
    IMPORTANT: Return ONLY the JSON object, with no additional text before or after.`,
                    stream: false,
                }),
                signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (!ollamaResponse.ok) {
                throw new Error(`Ollama returned status: ${ollamaResponse.status}`)
            }

            const data = await ollamaResponse.json()

            try {
                // Try to parse the response as JSON
                const jsonStart = data.response.indexOf("{")
                const jsonEnd = data.response.lastIndexOf("}") + 1

                if (jsonStart >= 0 && jsonEnd > jsonStart) {
                    const jsonStr = data.response.substring(jsonStart, jsonEnd)
                    const websiteData = JSON.parse(jsonStr)
                    return NextResponse.json(websiteData)
                } else {
                    throw new Error("Could not extract valid JSON from Ollama response")
                }
            } catch (parseError) {
                console.error("Error parsing Ollama response:", parseError)
                console.log("Raw response:", data.response)
                throw new Error("Failed to parse Ollama response as JSON")
            }
        } catch (ollamaError) {
            console.error("Error with Ollama:", ollamaError)
            console.log("Using fallback data generator...")

            // Use industry-specific fallback generators
            let websiteData

            switch (industry.toLowerCase()) {
                case "education":
                    websiteData = generateEducationWebsite(prompt, style)
                    break
                case "healthcare":
                    websiteData = generateHealthcareWebsite(prompt, style)
                    break
                case "technology":
                    websiteData = generateTechWebsite(prompt, style)
                    break
                case "e-commerce":
                    websiteData = generateEcommerceWebsite(prompt, style)
                    break
                case "real estate":
                    websiteData = generateRealEstateWebsite(prompt, style)
                    break
                case "restaurant":
                    websiteData = generateRestaurantWebsite(prompt, style)
                    break
                default:
                    websiteData = generateGenericWebsite(prompt, industry, style)
            }

            return NextResponse.json(websiteData)
        }
    } catch (error) {
        console.error("Error in API route:", error)
        return NextResponse.json({ error: "Failed to generate website" }, { status: 500 })
    }
}
