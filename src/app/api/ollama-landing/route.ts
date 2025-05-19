import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { prompt, industry } = await request.json()

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
        }

        // Build our Ollama prompt
        const ollamaPrompt = `
      Create a modern landing page content for a ${industry} business with the following description:
      "${prompt}"

      Return ONLY a JSON object with the following structure (no explanation, no markdown, just the JSON):

      {
        "header": {
          "logo": "Company Name",
          "menu": [
            { "label": "Menu Item 1", "link": "#" },
            { "label": "Menu Item 2", "link": "#" }
          ],
          "style": "minimal" or "saas"
        },
        "hero": {
          "title": "Main headline",
          "subtitle": "Subtitle",
          "description": "Longer description",
          "buttonText": "Call to action",
          "buttonLink": "#",
          "imageUrl": "/placeholder.svg?key=ede4p"
        },
        "features": {
          "title": "Features Section Title",
          "subtitle": "Features Section Subtitle",
          "items": [
            {
              "title": "Feature 1",
              "description": "Description of feature 1",
              "icon": "icon-name"
            },
            {
              "title": "Feature 2",
              "description": "Description of feature 2",
              "icon": "icon-name"
            },
            {
              "title": "Feature 3",
              "description": "Description of feature 3",
              "icon": "icon-name"
            }
          ]
        },
        "footer": {
          "companyName": "Company Name",
          "copyright": "Copyright text",
          "links": [
            { "label": "Link 1", "link": "#" },
            { "label": "Link 2", "link": "#" }
          ],
          "socialLinks": [
            { "platform": "Twitter", "link": "#" },
            { "platform": "LinkedIn", "link": "#" }
          ]
        }
      }

      The JSON must be valid with no trailing commas. For icons, use one of: settings, zap, shield, star, bell, home, users, message-circle, heart, bar-chart, calendar, clipboard, dollar-sign, shopping-cart, coffee, globe, plus-circle, check-circle, lock, unlock, pie-chart, layers, map, activity, book, briefcase, camera, mail
    `

        // Make request to local Ollama instance
        const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3",
                prompt: ollamaPrompt,
                stream: false,
            }),
        })

        if (!ollamaResponse.ok) {
            return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
        }

        const ollamaData = await ollamaResponse.json()

        // Extract the JSON from the response
        let jsonContent
        try {
            // Use regex to extract JSON object from the response
            const jsonMatch = ollamaData.response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                jsonContent = JSON.parse(jsonMatch[0])
            } else {
                throw new Error("No valid JSON found in response")
            }
        } catch (error) {
            console.error("Error parsing JSON:", error)
            // Fallback content in case parsing fails
            jsonContent = {
                header: {
                    logo: "Your Logo",
                    menu: [
                        { label: "Home", link: "#" },
                        { label: "Features", link: "#features" },
                        { label: "Pricing", link: "#pricing" },
                        { label: "Contact", link: "#contact" },
                    ],
                    style: "minimal",
                },
                hero: {
                    title: "Transform Your Business with AI",
                    subtitle: "Powerful Solutions",
                    description: "Our AI-powered platform helps businesses automate tasks, gain insights, and grow faster.",
                    buttonText: "Get Started",
                    buttonLink: "#",
                    imageUrl: "/placeholder.svg?key=th2cy",
                },
                features: {
                    title: "Key Features",
                    subtitle: "What makes us different",
                    items: [
                        {
                            title: "Automation",
                            description: "Save time with smart automation tools",
                            icon: "settings",
                        },
                        {
                            title: "Analytics",
                            description: "Gain insights from your data",
                            icon: "bar-chart",
                        },
                        {
                            title: "Integration",
                            description: "Works with your existing tools",
                            icon: "plug",
                        },
                    ],
                },
                footer: {
                    companyName: "YourCompany",
                    copyright: "© 2023 YourCompany. All rights reserved.",
                    links: [
                        { label: "Privacy", link: "#" },
                        { label: "Terms", link: "#" },
                        { label: "Contact", link: "#" },
                    ],
                    socialLinks: [
                        { platform: "Twitter", link: "#" },
                        { platform: "LinkedIn", link: "#" },
                        { platform: "Facebook", link: "#" },
                    ],
                },
            }
        }

        return NextResponse.json(jsonContent)
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
