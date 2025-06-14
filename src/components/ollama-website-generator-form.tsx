"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles } from "lucide-react"
import { getIndustryNames } from "@/lib/industry-config"

export default function OllamaWebsiteGeneratorForm() {
    const [formData, setFormData] = useState({
        websiteName: "",
        industry: "",
        style: "",
        description: "",
        targetAudience: "",
        businessGoals: "",
        uniqueSellingPoints: "",
        includeImages: true,
    })

    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const industries = getIndustryNames()
    const styles = ["modern", "minimal", "elegant", "bold", "playful", "corporate", "creative"]

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleGenerate = async () => {
        if (!formData.websiteName || !formData.industry || !formData.style) {
            setError("Please fill in all required fields")
            return
        }

        setIsGenerating(true)
        setError(null)
        setGeneratedWebsite(null)

        try {
            const response = await fetch("/api/generate-ollama-website", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    businessGoals: formData.businessGoals ? formData.businessGoals.split(",").map((g) => g.trim()) : undefined,
                    uniqueSellingPoints: formData.uniqueSellingPoints
                        ? formData.uniqueSellingPoints.split(",").map((p) => p.trim())
                        : undefined,
                }),
            })

            const result = await response.json()

            if (result.success) {
                setGeneratedWebsite(result.data)
                console.log("Generated website:", result.data)

                // Store in localStorage for preview page
                localStorage.setItem("generatedWebsite", JSON.stringify(result.data))
            } else {
                throw new Error(result.error || "Generation failed")
            }
        } catch (error) {
            console.error("Generation error:", error)
            setError(`Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI-Powered Website Generator
                </h1>
                <p className="text-gray-600 text-lg">Generate personalized website content using your local Ollama models</p>
                <Badge variant="outline" className="mt-2">
                    Powered by Ollama
                </Badge>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Website Information</CardTitle>
                    <CardDescription>Enter details about the website you want to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="websiteName">Website/Business Name *</Label>
                            <Input
                                id="websiteName"
                                placeholder="e.g., Bella Vista Restaurant"
                                value={formData.websiteName}
                                onChange={(e) => handleInputChange("websiteName", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="industry">Industry *</Label>
                            <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industries.map((industry) => (
                                        <SelectItem key={industry} value={industry}>
                                            {industry.charAt(0).toUpperCase() + industry.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Business Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your business, services, and what makes you unique..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="style">Design Style *</Label>
                            <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a design style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {styles.map((style) => (
                                        <SelectItem key={style} value={style}>
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Input
                                id="targetAudience"
                                placeholder="e.g., young professionals, families"
                                value={formData.targetAudience}
                                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="businessGoals">Business Goals (comma separated)</Label>
                            <Input
                                id="businessGoals"
                                placeholder="e.g., increase bookings, generate leads"
                                value={formData.businessGoals}
                                onChange={(e) => handleInputChange("businessGoals", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="uniqueSellingPoints">Unique Selling Points (comma separated)</Label>
                            <Input
                                id="uniqueSellingPoints"
                                placeholder="What makes your business special?"
                                value={formData.uniqueSellingPoints}
                                onChange={(e) => handleInputChange("uniqueSellingPoints", e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="lg"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Website...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Website
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Results */}
            {generatedWebsite && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Website</CardTitle>
                        <CardDescription>Your AI-generated website is ready</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-lg font-medium mb-2">Website Metadata</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="font-medium">Title:</span> {generatedWebsite.metadata.title}
                                    </div>
                                    <div>
                                        <span className="font-medium">Industry:</span> {generatedWebsite.metadata.industry}
                                    </div>
                                    <div>
                                        <span className="font-medium">Style:</span> {generatedWebsite.metadata.style}
                                    </div>
                                    <div>
                                        <span className="font-medium">Components:</span> {generatedWebsite.components.length}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="font-medium">Description:</span> {generatedWebsite.metadata.description}
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    onClick={() => {
                                        window.open("/preview", "_blank")
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Preview Website
                                </Button>
                                <Button
                                    onClick={() => {
                                        const dataStr = JSON.stringify(generatedWebsite, null, 2)
                                        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
                                        const exportFileDefaultName = `${formData.websiteName.replace(/\s+/g, "-")}-website.json`

                                        const linkElement = document.createElement("a")
                                        linkElement.setAttribute("href", dataUri)
                                        linkElement.setAttribute("download", exportFileDefaultName)
                                        linkElement.click()
                                    }}
                                    variant="outline"
                                >
                                    Export JSON
                                </Button>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Components</h3>
                                <div className="space-y-3">
                                    {generatedWebsite.components.map((component: any, index: number) => (
                                        <div key={index} className="border p-3 rounded">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{component.type}</span>
                                                <Badge variant="outline">{Object.keys(component.props).length} props</Badge>
                                            </div>
                                            {component.props.title && (
                                                <div className="mt-1 text-sm">
                                                    <span className="font-medium">Title:</span> {component.props.title}
                                                </div>
                                            )}
                                            {component.props.subtitle && (
                                                <div className="mt-1 text-sm">
                                                    <span className="font-medium">Subtitle:</span> {component.props.subtitle}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
