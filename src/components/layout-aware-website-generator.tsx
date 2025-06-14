"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Layout, Target } from "lucide-react"
import { getLayoutVariations, getAllIndustryLayouts } from "@/lib/industry-layout-system"

interface LayoutVariation {
    name: string
    description: string
    targetAudience: string
}

export default function LayoutAwareWebsiteGenerator() {
    const [formData, setFormData] = useState({
        websiteName: "",
        industry: "",
        style: "",
        description: "",
        layoutVariation: "",
        aiProvider: "enhanced",
        includeImages: true,
        targetAudience: "",
        businessGoals: "",
        uniqueSellingPoints: "",
    })

    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [availableVariations, setAvailableVariations] = useState<LayoutVariation[]>([])
    const [selectedVariationInfo, setSelectedVariationInfo] = useState<LayoutVariation | null>(null)

    const industries = getAllIndustryLayouts()
    const styles = ["modern", "classic", "minimalist", "bold", "elegant", "creative"]
    const aiProviders = [
        { value: "enhanced", label: "Enhanced Templates", description: "Fast, reliable template-based generation" },
        { value: "ollama", label: "Ollama AI", description: "Local AI generation (requires Ollama setup)" },
        { value: "openai", label: "OpenAI", description: "Advanced AI generation (requires API key)" },
    ]

    // Update available variations when industry changes
    useEffect(() => {
        if (formData.industry) {
            const variations = getLayoutVariations(formData.industry)
            setAvailableVariations(variations)

            // Reset layout variation when industry changes
            setFormData((prev) => ({ ...prev, layoutVariation: "" }))
            setSelectedVariationInfo(null)
        }
    }, [formData.industry])

    // Update selected variation info
    useEffect(() => {
        if (formData.layoutVariation) {
            const variation = availableVariations.find((v) => v.name === formData.layoutVariation)
            setSelectedVariationInfo(variation || null)
        } else {
            setSelectedVariationInfo(null)
        }
    }, [formData.layoutVariation, availableVariations])

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleGenerate = async () => {
        if (!formData.websiteName || !formData.industry || !formData.style) {
            alert("Please fill in all required fields")
            return
        }

        setIsGenerating(true)
        setGeneratedWebsite(null)

        try {
            const response = await fetch("/api/generate-with-layouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (result.success) {
                setGeneratedWebsite(result)
                console.log("Generated website with layout:", result)
            } else {
                throw new Error(result.error || "Generation failed")
            }
        } catch (error) {
            console.error("Generation error:", error)
            alert(`Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Industry-Specific Website Generator
                </h1>
                <p className="text-xl text-gray-600 mb-2">Generate websites with layouts tailored to your industry</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Layout className="w-4 h-4" />
                    <span>Different layouts for different industries</span>
                    <Target className="w-4 h-4 ml-4" />
                    <span>Optimized for your target audience</span>
                </div>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Website Configuration
                    </CardTitle>
                    <CardDescription>Configure your website with industry-specific layouts and variations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="websiteName">Website Name *</Label>
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
                                        <SelectItem key={industry.name} value={industry.name}>
                                            {industry.displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Layout Variation Selection */}
                    {availableVariations.length > 0 && (
                        <div>
                            <Label htmlFor="layoutVariation">Layout Variation</Label>
                            <Select
                                value={formData.layoutVariation}
                                onValueChange={(value) => handleInputChange("layoutVariation", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a layout variation (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default Layout</SelectItem>
                                    {availableVariations.map((variation) => (
                                        <SelectItem key={variation.name} value={variation.name}>
                                            {variation.description}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {selectedVariationInfo && (
                                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary">{selectedVariationInfo.name}</Badge>
                                        <span className="text-sm font-medium">{selectedVariationInfo.description}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Target Audience: {selectedVariationInfo.targetAudience}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="style">Design Style *</Label>
                            <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select design style" />
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
                            <Label htmlFor="aiProvider">AI Provider</Label>
                            <Select value={formData.aiProvider} onValueChange={(value) => handleInputChange("aiProvider", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {aiProviders.map((provider) => (
                                        <SelectItem key={provider.value} value={provider.value}>
                                            <div>
                                                <div className="font-medium">{provider.label}</div>
                                                <div className="text-xs text-gray-500">{provider.description}</div>
                                            </div>
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

                    {/* Advanced Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Input
                                id="targetAudience"
                                placeholder="e.g., young professionals, families"
                                value={formData.targetAudience}
                                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessGoals">Business Goals</Label>
                            <Input
                                id="businessGoals"
                                placeholder="e.g., increase bookings, generate leads"
                                value={formData.businessGoals}
                                onChange={(e) => handleInputChange("businessGoals", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="uniqueSellingPoints">Unique Selling Points</Label>
                        <Input
                            id="uniqueSellingPoints"
                            placeholder="What makes your business special?"
                            value={formData.uniqueSellingPoints}
                            onChange={(e) => handleInputChange("uniqueSellingPoints", e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="includeImages"
                            checked={formData.includeImages}
                            onChange={(e) => handleInputChange("includeImages", e.target.checked)}
                            className="rounded"
                        />
                        <Label htmlFor="includeImages">Include real images from Unsplash</Label>
                    </div>

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
                        <CardTitle className="text-green-600">✅ Website Generated Successfully!</CardTitle>
                        <CardDescription>
                            Your industry-specific website has been generated with {generatedWebsite.metadata?.componentsCount}{" "}
                            components
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{generatedWebsite.metadata?.componentsCount}</div>
                                <div className="text-sm text-gray-500">Components</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {generatedWebsite.metadata?.layoutVariation || "Default"}
                                </div>
                                <div className="text-sm text-gray-500">Layout</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{generatedWebsite.metadata?.industry}</div>
                                <div className="text-sm text-gray-500">Industry</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {generatedWebsite.metadata?.hasRealImages ? "Yes" : "No"}
                                </div>
                                <div className="text-sm text-gray-500">Real Images</div>
                            </div>
                        </div>

                        {generatedWebsite.metadata?.availableVariations &&
                            generatedWebsite.metadata.availableVariations.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Available Layout Variations:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {generatedWebsite.metadata.availableVariations.map((variation: any) => (
                                            <Badge key={variation.name} variant="outline">
                                                {variation.description}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Generated Components:</h4>
                            <div className="flex flex-wrap gap-2">
                                {generatedWebsite.data?.components?.map((component: any, index: number) => (
                                    <Badge key={index} variant="secondary">
                                        {component.type}
                                        {component.size && <span className="ml-1 text-xs">({component.size})</span>}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button
                                onClick={() => {
                                    // Navigate to preview page with the generated data
                                    const params = new URLSearchParams({
                                        data: JSON.stringify(generatedWebsite.data),
                                    })
                                    window.open(`/preview?${params.toString()}`, "_blank")
                                }}
                                className="flex-1"
                            >
                                Preview Website
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(JSON.stringify(generatedWebsite.data, null, 2))
                                    alert("Website data copied to clipboard!")
                                }}
                            >
                                Copy Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
