import { NextResponse } from "next/server"
import { COMPONENT_TYPES, HEADER_VARIANTS, HERO_VARIANTS, FEATURES_VARIANTS } from "@/lib/dataset"

export async function POST(req: Request) {
    try {
        const { requirements } = await req.json()

        // Validate input
        if (!requirements) {
            return NextResponse.json({ error: "Website requirements are required" }, { status: 400 })
        }

        // Create a detailed prompt for website generation
        const prompt = `
You are a professional website designer and developer. Create a detailed website structure based on the following requirements:

${JSON.stringify(requirements, null, 2)}

Generate a complete website structure with the following sections:
1. A header (choose from: ${Object.values(HEADER_VARIANTS).join(", ")})
2. A hero section (choose from: ${Object.values(HERO_VARIANTS).join(", ")})
3. A features section (choose from: ${Object.values(FEATURES_VARIANTS).join(", ")})
4. A testimonials section
5. A call-to-action section

For each section, provide:
- Type of section (use exact values from this list: ${Object.values(COMPONENT_TYPES).join(", ")})
- Variant (use appropriate variants for each component type)
- Props (all required props for that component type)

Format your response as a valid JSON object with the following structure:
{
  "title": "Website Title",
  "description": "Brief website description",
  "sections": [
    {
      "type": "header",
      "variant": "minimal",
      "props": {
        "logo": "Company Name",
        "logoUrl": "/placeholder.svg?height=40&width=40&text=Logo",
        "menu": [
          { "label": "Home", "link": "#home" },
          { "label": "Features", "link": "#features" }
        ]
      }
    },
    {
      "type": "hero",
      "variant": "standard",
      "props": {
        "title": "Main Headline",
        "subtitle": "Subheadline",
        "description": "Detailed description",
        "buttonText": "Get Started",
        "buttonLink": "#get-started",
        "imageUrl": "/placeholder.svg?height=600&width=600&text=Hero+Image"
      }
    }
  ]
}

Make sure your response is ONLY the JSON object, with no additional text.
`

        // Call Ollama API
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3:8b",
                prompt,
                stream: false,
            }),
        })

        if (!response.ok) {
            const error = await response.text()
            console.error("Ollama API error:", error)
            return NextResponse.json({ error: "Failed to communicate with Ollama" }, { status: 500 })
        }

        const data = await response.json()

        // Try to parse the response as JSON
        try {
            // Find JSON in the response
            const jsonMatch = data.response.match(/\{[\s\S]*\}/)
            const jsonString = jsonMatch ? jsonMatch[0] : data.response
            const websiteStructure = JSON.parse(jsonString)

            // Validate and clean up the structure
            const cleanedStructure = validateAndCleanStructure(websiteStructure)

            return NextResponse.json({
                website: cleanedStructure,
            })
        } catch (error) {
            console.error("Error parsing JSON from Ollama response:", error)
            return NextResponse.json({
                rawResponse: data.response,
                error: "Failed to parse website structure from Ollama response",
            })
        }
    } catch (error) {
        console.error("Error in ollama-generate-website route:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

// Helper function to validate and clean up the structure
function validateAndCleanStructure(structure: any) {
    // Ensure the structure has the required fields
    const cleaned = {
        title: structure.title || "Generated Website",
        description: structure.description || "A website generated with AI",
        sections: [],
    }

    // Process each section
    if (Array.isArray(structure.sections)) {
        cleaned.sections = structure.sections.map((section: any) => {
            // Ensure each section has the required fields
            const cleanedSection = {
                type: section.type || "hero",
                variant: section.variant || "standard",
                props: section.props || {},
            }

            // Add default props based on component type if missing
            if (cleanedSection.type === COMPONENT_TYPES.HEADER && Object.keys(cleanedSection.props).length === 0) {
                cleanedSection.props = {
                    logo: "Company Name",
                    menu: [
                        { label: "Home", link: "#home" },
                        { label: "Features", link: "#features" },
                        { label: "Contact", link: "#contact" },
                    ],
                }
            }

            if (cleanedSection.type === COMPONENT_TYPES.HERO && Object.keys(cleanedSection.props).length === 0) {
                cleanedSection.props = {
                    title: "Welcome to Our Website",
                    subtitle: "Your journey starts here",
                    description: "We provide the best services for your needs",
                    buttonText: "Get Started",
                    buttonLink: "#get-started",
                }
            }

            return cleanedSection
        })
    }

    return cleaned
}
