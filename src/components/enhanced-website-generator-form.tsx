"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Zap, Sparkles, Crown, Building2, Loader2, CheckCircle, AlertCircle, Info, Star } from "lucide-react"
import { getAdvancedComponentsForIndustry } from "@/lib/advanced-component-integration"

interface FormData {
    description: string
    websiteName: string
    industry: string
    style: string
    targetAudience: string
    businessGoals: string[]
    uniqueSellingPoints: string[]
    websiteType: string
    includeAdvancedComponents: boolean
    customComponentSelection: string[]
    includeImages: boolean
}

const industries = [
    { value: "restaurant", label: "Restaurant & Food", icon: "🍽️" },
    { value: "technology", label: "Technology & Software", icon: "💻" },
    { value: "healthcare", label: "Healthcare & Medical", icon: "🏥" },
    { value: "education", label: "Education & Training", icon: "🎓" },
    { value: "ecommerce", label: "E-commerce & Retail", icon: "🛒" },
    { value: "realestate", label: "Real Estate", icon: "🏠" },
    { value: "legal", label: "Legal & Law Firm", icon: "⚖️" },
    { value: "finance", label: "Finance & Banking", icon: "💰" },
    { value: "fitness", label: "Fitness & Wellness", icon: "💪" },
    { value: "beauty", label: "Beauty & Spa", icon: "💄" },
    { value: "photography", label: "Photography & Creative", icon: "📸" },
    { value: "construction", label: "Construction & Architecture", icon: "🏗️" },
    { value: "automotive", label: "Automotive & Transportation", icon: "🚗" },
    { value: "marketing", label: "Marketing & Advertising", icon: "📢" },
    { value: "interior-design", label: "Interior Design", icon: "🏡" },
    { value: "nonprofit", label: "Non-profit & Charity", icon: "❤️" },
    { value: "event-planning", label: "Event Planning", icon: "🎉" },
    { value: "travel", label: "Travel & Tourism", icon: "✈️" },
    { value: "fashion", label: "Fashion & Apparel", icon: "👗" },
    { value: "consulting", label: "Business Consulting", icon: "📊" },
]

const styles = [
    { value: "modern", label: "Modern", description: "Clean, contemporary design" },
    { value: "minimal", label: "Minimal", description: "Simple, focused layout" },
    { value: "professional", label: "Professional", description: "Business-oriented design" },
    { value: "creative", label: "Creative", description: "Artistic, unique styling" },
    { value: "luxury", label: "Luxury", description: "Premium, elegant appearance" },
    { value: "playful", label: "Playful", description: "Fun, colorful design" },
]

const websiteTypes = [
    {
        value: "basic",
        label: "Basic",
        description: "Essential components only",
        icon: Zap,
        price: "Free",
        features: ["Basic components", "Standard layouts", "Limited customization"],
    },
    {
        value: "standard",
        label: "Standard",
        description: "Includes interactive components",
        icon: Sparkles,
        price: "$29",
        features: ["All basic features", "Interactive components", "Advanced search", "Forms"],
    },
    {
        value: "premium",
        label: "Premium",
        description: "Full advanced component library",
        icon: Crown,
        price: "$79",
        features: ["All standard features", "Industry-specific components", "E-commerce", "Booking systems"],
        popular: true,
    },
    {
        value: "enterprise",
        label: "Enterprise",
        description: "Custom components and integrations",
        icon: Building2,
        price: "Custom",
        features: ["All premium features", "Custom components", "API integrations", "Priority support"],
    },
]

const businessGoals = [
    "Lead Generation",
    "E-commerce Sales",
    "Brand Awareness",
    "Customer Support",
    "Online Booking",
    "Content Marketing",
    "Community Building",
    "Education/Training",
]

export default function EnhancedWebsiteGeneratorForm() {
    const [formData, setFormData] = useState<FormData>({
        description: "",
        websiteName: "",
        industry: "",
        style: "modern",
        targetAudience: "",
        businessGoals: [],
        uniqueSellingPoints: [],
        websiteType: "standard",
        includeAdvancedComponents: true,
        customComponentSelection: [],
        includeImages: true,
    })

    const [isGenerating, setIsGenerating] = useState(false)
    const [generationResult, setGenerationResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [availableComponents, setAvailableComponents] = useState<string[]>([])

    // Update available components when industry changes
    const handleIndustryChange = (industry: string) => {
        setFormData((prev) => ({ ...prev, industry }))
        const components = getAdvancedComponentsForIndustry(industry)
        setAvailableComponents(components)
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch("/api/generate-enhanced-with-advanced", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Generation failed")
            }

            setGenerationResult(result)

            // Store in localStorage for preview page
            localStorage.setItem("generatedWebsite", JSON.stringify(result.website))

            // Redirect to preview
            window.location.href = "/preview"
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Enhanced Website Generator
                </h1>
                <p className="text-xl text-gray-600">Create professional websites with advanced interactive components</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="industry">Industry & Style</TabsTrigger>
                        <TabsTrigger value="features">Features & Plan</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
                    </TabsList>

                    {/* Basic Information */}
                    <TabsContent value="basic" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="websiteName">Website Name *</Label>
                                    <Input
                                        id="websiteName"
                                        placeholder="e.g., Bella Vista Restaurant"
                                        value={formData.websiteName}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, websiteName: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Business Description *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your business, what you do, and what makes you unique..."
                                        value={formData.description}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="targetAudience">Target Audience</Label>
                                    <Input
                                        id="targetAudience"
                                        placeholder="e.g., Young professionals, families, small businesses"
                                        value={formData.targetAudience}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Industry & Style */}
                    <TabsContent value="industry" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Industry Selection</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {industries.map((industry) => (
                                        <div
                                            key={industry.value}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                                formData.industry === industry.value
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() => handleIndustryChange(industry.value)}
                                        >
                                            <div className="text-center space-y-1">
                                                <div className="text-2xl">{industry.icon}</div>
                                                <div className="text-sm font-medium">{industry.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Design Style</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {styles.map((style) => (
                                        <div
                                            key={style.value}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                formData.style === style.value
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() => setFormData((prev) => ({ ...prev, style: style.value }))}
                                        >
                                            <div className="font-medium">{style.label}</div>
                                            <div className="text-sm text-gray-600">{style.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Features & Plan */}
                    <TabsContent value="features" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose Your Plan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {websiteTypes.map((type) => (
                                        <div
                                            key={type.value}
                                            className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                                                formData.websiteType === type.value
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() => setFormData((prev) => ({ ...prev, websiteType: type.value }))}
                                        >
                                            {type.popular && (
                                                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Popular
                                                </Badge>
                                            )}

                                            <div className="text-center space-y-3">
                                                <type.icon className="h-8 w-8 mx-auto text-blue-600" />
                                                <div>
                                                    <div className="font-semibold">{type.label}</div>
                                                    <div className="text-2xl font-bold text-blue-600">{type.price}</div>
                                                </div>
                                                <div className="text-sm text-gray-600">{type.description}</div>
                                                <div className="space-y-1">
                                                    {type.features.map((feature, index) => (
                                                        <div key={index} className="text-xs text-gray-500 flex items-center">
                                                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Business Goals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {businessGoals.map((goal) => (
                                        <div key={goal} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData.businessGoals.includes(goal)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            businessGoals: [...prev.businessGoals, goal],
                                                        }))
                                                    } else {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            businessGoals: prev.businessGoals.filter((g) => g !== goal),
                                                        }))
                                                    }
                                                }}
                                            />
                                            <span className="text-sm">{goal}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Advanced Options */}
                    <TabsContent value="advanced" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Advanced Components</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={formData.includeAdvancedComponents}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, includeAdvancedComponents: checked as boolean }))
                                        }
                                    />
                                    <span>Include advanced interactive components</span>
                                </div>
                            </CardHeader>
                            {formData.includeAdvancedComponents && availableComponents.length > 0 && (
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-600">Available advanced components for {formData.industry}:</div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {availableComponents.map((component) => (
                                                <div key={component} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={formData.customComponentSelection.includes(component)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    customComponentSelection: [...prev.customComponentSelection, component],
                                                                }))
                                                            } else {
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    customComponentSelection: prev.customComponentSelection.filter(
                                                                        (c) => c !== component,
                                                                    ),
                                                                }))
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-sm">{component}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={formData.includeImages}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, includeImages: checked as boolean }))
                                        }
                                    />
                                    <span>Include professional images</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Separator />

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isGenerating || !formData.websiteName || !formData.description || !formData.industry}
                        className="px-8 py-3"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Generating Website...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                Generate Enhanced Website
                            </>
                        )}
                    </Button>
                </div>

                {/* Error Display */}
                {error && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2 text-red-800">
                                <AlertCircle className="h-5 w-5" />
                                <span className="font-medium">Generation Failed</span>
                            </div>
                            <p className="text-red-700 mt-2">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Info Box */}
                <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-2 text-blue-800">
                            <Info className="h-5 w-5 mt-0.5" />
                            <div>
                                <div className="font-medium">Enhanced Website Generator</div>
                                <p className="text-blue-700 text-sm mt-1">
                                    This advanced generator includes interactive components, industry-specific features, and intelligent
                                    layout optimization. Higher tier plans unlock more advanced components and customization options.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
