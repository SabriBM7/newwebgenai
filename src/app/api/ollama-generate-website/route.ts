import { NextResponse } from "next/server"
import { COMPONENT_TYPES, HEADER_VARIANTS, HERO_VARIANTS, FEATURES_VARIANTS } from "@/lib/dataset"

export async function POST(req: Request) {
    try {
        const { requirements } = await req.json()

        // Validate input
        if (!requirements) {
            return NextResponse.json({ error: "Website requirements are required" }, { status: 400 })
        }

        // Check if we should use Ollama or return a sample response
        const useOllama = process.env.USE_OLLAMA === "true"

        if (!useOllama) {
            // Return a sample response for testing
            return NextResponse.json({
                website: {
                    title: "AI-Powered Marketing Automation",
                    description: "Grow your audience and increase conversions with our AI tools",
                    sections: [
                        {
                            type: "header",
                            variant: "minimal",
                            props: {
                                logo: "MarketAI",
                                menu: [
                                    { label: "Home", link: "#home" },
                                    { label: "Features", link: "#features" },
                                    { label: "Pricing", link: "#pricing" },
                                    { label: "Contact", link: "#contact" },
                                ],
                            },
                        },
                        {
                            type: "hero",
                            variant: "split",
                            props: {
                                title: "Transform Your Marketing with AI",
                                subtitle: "Automate, Optimize, Convert",
                                description:
                                    "Our AI-powered marketing tools help small businesses grow their audience and increase conversions without the complexity.",
                                buttonText: "Get Started Free",
                                buttonLink: "#signup",
                                imageUrl: "/placeholder.svg?height=600&width=600&text=Marketing+Automation",
                            },
                        },
                        {
                            type: "features",
                            variant: "grid",
                            props: {
                                title: "Powerful Features",
                                subtitle: "Everything you need to succeed",
                                features: [
                                    {
                                        title: "AI Content Generation",
                                        description: "Create engaging content that converts with our AI writing assistant.",
                                        icon: "Sparkles",
                                    },
                                    {
                                        title: "Automated Campaigns",
                                        description: "Set up marketing campaigns that run on autopilot.",
                                        icon: "Zap",
                                    },
                                    {
                                        title: "Smart Analytics",
                                        description: "Get actionable insights to improve your marketing performance.",
                                        icon: "BarChart",
                                    },
                                ],
                            },
                        },
                    ],
                },
            })
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
            let jsonString = jsonMatch ? jsonMatch[0] : data.response

            // Try to clean up the JSON string
            jsonString = jsonString
                .replace(/\\n/g, " ")
                .replace(/\\"/g, '"')
                .replace(/"{/g, "{")
                .replace(/}"/g, "}")
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure property names are quoted
                .replace(/,\s*}/g, "}") // Remove trailing commas

            let websiteStructure

            try {
                websiteStructure = JSON.parse(jsonString)
            } catch (parseError) {
                console.error("Error parsing JSON, trying to fix:", parseError)

                // If parsing fails, return the sample response
                return NextResponse.json({
                    website: {
                        title: "Generated Website",
                        description: "A website generated with AI",
                        sections: [
                            {
                                type: "header",
                                variant: "minimal",
                                props: {
                                    logo: "Company Name",
                                    menu: [
                                        { label: "Home", link: "#home" },
                                        { label: "Features", link: "#features" },
                                        { label: "Contact", link: "#contact" },
                                    ],
                                },
                            },
                            {
                                type: "hero",
                                variant: "standard",
                                props: {
                                    title: "Welcome to Our Website",
                                    subtitle: "Your journey starts here",
                                    description: "We provide the best services for your needs",
                                    buttonText: "Get Started",
                                    buttonLink: "#get-started",
                                    imageUrl: "/placeholder.svg?height=600&width=600&text=Hero+Image",
                                },
                            },
                            {
                                type: "features",
                                variant: "grid",
                                props: {
                                    title: "Our Features",
                                    subtitle: "What we offer",
                                    features: [
                                        {
                                            title: "Feature 1",
                                            description: "Description of feature 1",
                                            icon: "Star",
                                        },
                                        {
                                            title: "Feature 2",
                                            description: "Description of feature 2",
                                            icon: "Heart",
                                        },
                                        {
                                            title: "Feature 3",
                                            description: "Description of feature 3",
                                            icon: "Zap",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    error: "Failed to parse JSON from Ollama response, using fallback",
                    rawResponse: data.response,
                })
            }

            // Validate and clean up the structure
            const cleanedStructure = validateAndCleanStructure(websiteStructure)

            return NextResponse.json({
                website: cleanedStructure,
            })
        } catch (error) {
            console.error("Error parsing JSON from Ollama response:", error)

            // Return a fallback response
            return NextResponse.json({
                website: {
                    title: "Generated Website",
                    description: "A website generated with AI",
                    sections: [
                        {
                            type: "header",
                            variant: "minimal",
                            props: {
                                logo: "Company Name",
                                menu: [
                                    { label: "Home", link: "#home" },
                                    { label: "Features", link: "#features" },
                                    { label: "Contact", link: "#contact" },
                                ],
                            },
                        },
                        {
                            type: "hero",
                            variant: "standard",
                            props: {
                                title: "Welcome to Our Website",
                                subtitle: "Your journey starts here",
                                description: "We provide the best services for your needs",
                                buttonText: "Get Started",
                                buttonLink: "#get-started",
                                imageUrl: "/placeholder.svg?height=600&width=600&text=Hero+Image",
                            },
                        },
                    ],
                },
                error: "Failed to parse JSON from Ollama response, using fallback",
                rawResponse: data.response,
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
