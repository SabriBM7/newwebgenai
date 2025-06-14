"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ThemeSelector from "@/components/theme-selector"
import ThemePreview from "@/components/theme-preview"

export default function AIGenerator() {
    const router = useRouter()
    const [description, setDescription] = useState("")
    const [websiteName, setWebsiteName] = useState("")
    const [selectedThemeId, setSelectedThemeId] = useState("light-default")
    const [preferredAI, setPreferredAI] = useState("auto")
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [openAIAvailable, setOpenAIAvailable] = useState(false)
    const [ollamaAvailable, setOllamaAvailable] = useState(false)

    useEffect(() => {
        // Check if OpenAI is available (client-side check)
        setOpenAIAvailable(!!process.env.NEXT_PUBLIC_OPENAI_API_KEY)

        // Check if Ollama is available
        const checkOllama = async () => {
            try {
                const response = await fetch("http://localhost:11434/api/version", {
                    method: "GET",
                })
                setOllamaAvailable(response.ok)
            } catch (error) {
                setOllamaAvailable(false)
            }
        }

        checkOllama()
    }, [])

    const handleGenerate = async () => {
        if (!description) {
            setError("Please provide a website description")
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: description,
                    websiteName: websiteName || "My Website",
                    themeId: selectedThemeId,
                    preferredAI,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate website")
            }

            const data = await response.json()

            // Store the generated website data in localStorage
            localStorage.setItem("generatedWebsite", JSON.stringify(data))

            // Redirect to preview page
            router.push("/preview")
        } catch (err) {
            console.error("Error generating website:", err)
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">AI-Powered Website Generator</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Your Website</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="websiteName" className="block text-sm font-medium mb-1">
                                Website Name
                            </label>
                            <Input
                                id="websiteName"
                                value={websiteName}
                                onChange={(e) => setWebsiteName(e.target.value)}
                                placeholder="My Awesome Website"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                                Website Description
                            </label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your website in detail. Include information about the business, target audience, and key features you want to highlight."
                                rows={6}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Select Theme</label>
                            <ThemeSelector currentThemeId={selectedThemeId} onThemeChange={setSelectedThemeId} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3">AI Provider</label>
                            <RadioGroup value={preferredAI} onValueChange={setPreferredAI} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="auto" id="ai-auto" />
                                    <Label htmlFor="ai-auto" className="flex items-center">
                                        <span>Auto (Use best available)</span>
                                        {!openAIAvailable && !ollamaAvailable && (
                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                        Will use mock data
                      </span>
                                        )}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="openai" id="ai-openai" disabled={!openAIAvailable} />
                                    <Label htmlFor="ai-openai" className="flex items-center">
                                        <span>OpenAI (GPT-4o)</span>
                                        {!openAIAvailable && (
                                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Not available</span>
                                        )}
                                        {openAIAvailable && (
                                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Available</span>
                                        )}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ollama" id="ai-ollama" disabled={!ollamaAvailable} />
                                    <Label htmlFor="ai-ollama" className="flex items-center">
                                        <span>Ollama (Local LLM)</span>
                                        {!ollamaAvailable && (
                                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Not available</span>
                                        )}
                                        {ollamaAvailable && (
                                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Available</span>
                                        )}
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                            {isGenerating ? "Generating..." : "Generate Website"}
                        </Button>
                    </CardFooter>
                </Card>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Theme Preview</h2>
                    <ThemePreview themeId={selectedThemeId} />

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">AI Provider Comparison</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="font-medium">Feature</div>
                                <div className="font-medium">OpenAI (GPT-4o)</div>
                                <div className="font-medium">Ollama (Local LLM)</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-2">
                                <div>Quality</div>
                                <div>Excellent</div>
                                <div>Good</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-2">
                                <div>Speed</div>
                                <div>Fast</div>
                                <div>Varies by hardware</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-2">
                                <div>Privacy</div>
                                <div>Data sent to OpenAI</div>
                                <div>Fully local processing</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-2">
                                <div>Cost</div>
                                <div>API usage fees</div>
                                <div>Free</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>Reliability</div>
                                <div>High</div>
                                <div>Depends on local setup</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
