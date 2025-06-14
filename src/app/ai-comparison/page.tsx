"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DirectWebsiteRenderer from "@/components/direct-website-renderer"

export default function AIComparisonPage() {
    const [description, setDescription] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [openaiResult, setOpenaiResult] = useState<any>(null)
    const [ollamaResult, setOllamaResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleGenerate = async () => {
        if (!description) {
            setError("Please provide a website description")
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            // Generate with OpenAI
            const openaiResponse = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: description,
                    preferredAI: "openai",
                }),
            })

            if (openaiResponse.ok) {
                const openaiData = await openaiResponse.json()
                setOpenaiResult(openaiData)
            } else {
                console.error("OpenAI generation failed")
            }

            // Generate with Ollama
            const ollamaResponse = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: description,
                    preferredAI: "ollama",
                }),
            })

            if (ollamaResponse.ok) {
                const ollamaData = await ollamaResponse.json()
                setOllamaResult(ollamaData)
            } else {
                console.error("Ollama generation failed")
            }
        } catch (err) {
            console.error("Error generating comparison:", err)
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">AI Model Comparison</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Generate Websites with Different AI Models</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Website Description
                        </label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your website in detail. Include information about the business, target audience, and key features you want to highlight."
                            rows={4}
                        />
                    </div>

                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm mb-4">{error}</div>}

                    <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                        {isGenerating ? "Generating..." : "Generate with Both AIs"}
                    </Button>
                </CardContent>
            </Card>

            {(openaiResult || ollamaResult) && (
                <Tabs defaultValue="comparison" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8">
                        <TabsTrigger value="comparison">Side-by-Side Comparison</TabsTrigger>
                        <TabsTrigger value="openai" disabled={!openaiResult}>
                            OpenAI Result
                        </TabsTrigger>
                        <TabsTrigger value="ollama" disabled={!ollamaResult}>
                            Ollama Result
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="comparison">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">OpenAI (GPT-4o)</h2>
                                {openaiResult ? (
                                    <div className="border rounded-lg overflow-hidden h-[600px] overflow-y-auto">
                                        <DirectWebsiteRenderer websiteData={openaiResult} />
                                    </div>
                                ) : (
                                    <div className="border rounded-lg p-8 text-center">
                                        <p>OpenAI result not available</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Ollama (Local LLM)</h2>
                                {ollamaResult ? (
                                    <div className="border rounded-lg overflow-hidden h-[600px] overflow-y-auto">
                                        <DirectWebsiteRenderer websiteData={ollamaResult} />
                                    </div>
                                ) : (
                                    <div className="border rounded-lg p-8 text-center">
                                        <p>Ollama result not available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="openai">
                        {openaiResult && (
                            <div className="border rounded-lg overflow-hidden">
                                <DirectWebsiteRenderer websiteData={openaiResult} />
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="ollama">
                        {ollamaResult && (
                            <div className="border rounded-lg overflow-hidden">
                                <DirectWebsiteRenderer websiteData={ollamaResult} />
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}
