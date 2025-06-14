"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import { getIndustryNames } from "@/lib/industry-config"

export default function TestOllamaContentPage() {
    const [formData, setFormData] = useState({
        websiteName: "",
        industry: "",
        description: "",
        targetAudience: "",
        businessGoals: "",
        uniqueSellingPoints: "",
    })

    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedContent, setGeneratedContent] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const industries = getIndustryNames()

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleGenerate = async () => {
        if (!formData.websiteName || !formData.industry) {
            setError("Please fill in website name and industry")
            return
        }

        setIsGenerating(true)
        setError(null)
        setGeneratedContent(null)

        try {
            const response = await fetch("/api/test-ollama-content", {
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
                setGeneratedContent(result.content)
                console.log("Generated content:", result.content)
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
                <h1 className="text-3xl font-bold mb-2">Test Ollama Content Generation</h1>
                <p className="text-gray-600">Generate website content using your local Ollama models</p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Website Information</CardTitle>
                    <CardDescription>Enter details about the website you want to generate content for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Input
                                id="targetAudience"
                                placeholder="e.g., young professionals, families"
                                value={formData.targetAudience}
                                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="businessGoals">Business Goals (comma separated)</Label>
                            <Input
                                id="businessGoals"
                                placeholder="e.g., increase bookings, generate leads"
                                value={formData.businessGoals}
                                onChange={(e) => handleInputChange("businessGoals", e.target.value)}
                            />
                        </div>
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

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Content...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Content
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Results */}
            {generatedContent && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Content</CardTitle>
                        <CardDescription>AI-generated content for your website</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Hero Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">Hero Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.hero.title}</p>
                                    <p className="text-gray-600 mt-1">{generatedContent.hero.subtitle}</p>
                                    <p className="mt-2">{generatedContent.hero.description}</p>
                                    <div className="flex gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {generatedContent.hero.primaryButton}
                    </span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {generatedContent.hero.secondaryButton}
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">About Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.about.title}</p>
                                    <p className="mt-2 whitespace-pre-line">{generatedContent.about.content}</p>
                                    <div className="mt-3 space-y-2">
                                        <p>
                                            <span className="font-medium">Mission:</span> {generatedContent.about.mission}
                                        </p>
                                        <p>
                                            <span className="font-medium">Vision:</span> {generatedContent.about.vision}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">Features Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.features.title}</p>
                                    <p className="text-gray-600">{generatedContent.features.subtitle}</p>
                                    <div className="mt-3 space-y-3">
                                        {generatedContent.features.features.map((feature: any, index: number) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-3">
                                                <p className="font-medium">
                                                    {feature.icon} {feature.title}
                                                </p>
                                                <p className="text-sm">{feature.description}</p>
                                                <p className="text-xs text-blue-600 mt-1">Benefit: {feature.benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Services Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">Services Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.services.title}</p>
                                    <p className="text-gray-600">{generatedContent.services.subtitle}</p>
                                    <div className="mt-3 space-y-4">
                                        {generatedContent.services.services.map((service: any, index: number) => (
                                            <div key={index} className="border p-3 rounded">
                                                <p className="font-medium">
                                                    {service.icon} {service.title}
                                                </p>
                                                <p className="text-sm">{service.description}</p>
                                                <p className="text-xs font-medium text-green-600 mt-1">{service.price}</p>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {service.features.map((feature: string, i: number) => (
                                                        <span key={i} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                              {feature}
                            </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">Testimonials Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.testimonials.title}</p>
                                    <p className="text-gray-600">{generatedContent.testimonials.subtitle}</p>
                                    <div className="mt-3 space-y-3">
                                        {generatedContent.testimonials.testimonials.map((testimonial: any, index: number) => (
                                            <div key={index} className="border p-3 rounded bg-white">
                                                <p className="italic">"{testimonial.content}"</p>
                                                <div className="mt-2">
                                                    <p className="font-medium">{testimonial.name}</p>
                                                    <p className="text-xs text-gray-600">
                                                        {testimonial.role}
                                                        {testimonial.company && `, ${testimonial.company}`}
                                                    </p>
                                                    <div className="text-yellow-500 mt-1">
                                                        {"★".repeat(testimonial.rating)}
                                                        {"☆".repeat(5 - testimonial.rating)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium mb-2">FAQ Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.faq.title}</p>
                                    <p className="text-gray-600">{generatedContent.faq.subtitle}</p>
                                    <div className="mt-3 space-y-3">
                                        {generatedContent.faq.faqs.map((faq: any, index: number) => (
                                            <div key={index} className="border-b border-gray-200 pb-2">
                                                <p className="font-medium">Q: {faq.question}</p>
                                                <p className="text-sm mt-1">A: {faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">CTA Section</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-bold text-xl">{generatedContent.cta.title}</p>
                                    <p className="mt-1">{generatedContent.cta.description}</p>
                                    <div className="flex gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {generatedContent.cta.primaryButton}
                    </span>
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {generatedContent.cta.secondaryButton}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
