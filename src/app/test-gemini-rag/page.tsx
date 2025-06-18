"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Database, Cpu } from "lucide-react"

export default function TestGeminiRAGPage() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [formData, setFormData] = useState({
        websiteName: "Bella Vista",
        description: "An authentic Italian restaurant specializing in traditional pasta dishes and wood-fired pizzas",
        industry: "restaurant",
        style: "modern",
        targetAudience: "Families and food enthusiasts",
        businessGoals: "Increase reservations and build brand awareness",
        uniqueSellingPoints: "Fresh homemade pasta, authentic Italian recipes, cozy atmosphere",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleGenerate = async () => {
        setIsGenerating(true)
        setGeneratedWebsite(null)

        try {
            const response = await fetch("/api/generate-gemini-rag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    businessGoals: formData.businessGoals.split(",").map((g) => g.trim()),
                    uniqueSellingPoints: formData.uniqueSellingPoints.split(",").map((p) => p.trim()),
                    includeImages: true,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setGeneratedWebsite(data.website)
            } else {
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error("Generation error:", error)
            alert("Failed to generate website. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-purple-600" />
                        Gemini RAG Website Generator
                    </h1>
                    <p className="text-lg text-gray-600">
                        Generate enhanced websites using Google Gemini AI with Retrieval-Augmented Generation
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Website Configuration
                            </CardTitle>
                            <CardDescription>Configure your website parameters for AI generation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="websiteName">Website Name</Label>
                                <Input
                                    id="websiteName"
                                    value={formData.websiteName}
                                    onChange={(e) => handleInputChange("websiteName", e.target.value)}
                                    placeholder="Enter website name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="realestate">Real Estate</SelectItem>
                                        <SelectItem value="fitness">Fitness</SelectItem>
                                        <SelectItem value="legal">Legal</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Business Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Describe your business..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="style">Design Style</Label>
                                <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">Modern</SelectItem>
                                        <SelectItem value="elegant">Elegant</SelectItem>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                        <SelectItem value="minimal">Minimal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">Target Audience</Label>
                                <Input
                                    id="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                                    placeholder="e.g., Young professionals, families"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="businessGoals">Business Goals (comma-separated)</Label>
                                <Input
                                    id="businessGoals"
                                    value={formData.businessGoals}
                                    onChange={(e) => handleInputChange("businessGoals", e.target.value)}
                                    placeholder="e.g., Increase sales, Build brand awareness"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="uniqueSellingPoints">Unique Selling Points (comma-separated)</Label>
                                <Input
                                    id="uniqueSellingPoints"
                                    value={formData.uniqueSellingPoints}
                                    onChange={(e) => handleInputChange("uniqueSellingPoints", e.target.value)}
                                    placeholder="e.g., 24/7 support, Organic ingredients"
                                />
                            </div>

                            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating with Gemini RAG...
                                    </>
                                ) : (
                                    <>
                                        <Cpu className="mr-2 h-4 w-4" />
                                        Generate Website with AI
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Website</CardTitle>
                            <CardDescription>AI-generated website structure and content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {generatedWebsite ? (
                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">✅ Generation Successful!</h3>
                                        <p className="text-green-700 text-sm">
                                            Generated {generatedWebsite.components.length} components using {generatedWebsite.metadata.aiUsed}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold mb-2">Website Metadata:</h4>
                                            <div className="bg-gray-50 rounded p-3 text-sm">
                                                <p>
                                                    <strong>Title:</strong> {generatedWebsite.metadata.title}
                                                </p>
                                                <p>
                                                    <strong>Industry:</strong> {generatedWebsite.metadata.industry}
                                                </p>
                                                <p>
                                                    <strong>Style:</strong> {generatedWebsite.metadata.style}
                                                </p>
                                                <p>
                                                    <strong>AI Used:</strong> {generatedWebsite.metadata.aiUsed}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Generated Components:</h4>
                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                {generatedWebsite.components.map((component: any, index: number) => (
                                                    <div key={index} className="bg-blue-50 border border-blue-200 rounded p-2">
                                                        <p className="font-medium text-blue-800">{component.type}</p>
                                                        {component.props.title && <p className="text-blue-600 text-sm">{component.props.title}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Color Scheme:</h4>
                                            <div className="flex gap-2">
                                                <div
                                                    className="w-8 h-8 rounded border"
                                                    style={{ backgroundColor: generatedWebsite.colors.primary }}
                                                    title={`Primary: ${generatedWebsite.colors.primary}`}
                                                />
                                                <div
                                                    className="w-8 h-8 rounded border"
                                                    style={{ backgroundColor: generatedWebsite.colors.secondary }}
                                                    title={`Secondary: ${generatedWebsite.colors.secondary}`}
                                                />
                                                <div
                                                    className="w-8 h-8 rounded border"
                                                    style={{ backgroundColor: generatedWebsite.colors.accent }}
                                                    title={`Accent: ${generatedWebsite.colors.accent}`}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                localStorage.setItem("generatedWebsite", JSON.stringify(generatedWebsite))
                                                window.open("/preview", "_blank")
                                            }}
                                            className="w-full"
                                        >
                                            Preview Website
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Generate a website to see results here</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
