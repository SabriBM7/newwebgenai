"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    SimpleRadioGroup as RadioGroup,
    SimpleRadioGroupItem as RadioGroupItem,
} from "@/components/ui/simple-radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Server, Sparkles, Info, Check } from "lucide-react"

export default function ProfessionalGenerator() {
    const router = useRouter()
    const [description, setDescription] = useState("")
    const [websiteName, setWebsiteName] = useState("")
    const [selectedThemeId, setSelectedThemeId] = useState("light-default")
    const [preferredAI, setPreferredAI] = useState("auto")
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [wizardLMAvailable, setWizardLMAvailable] = useState(false)
    const [ollamaAvailable, setOllamaAvailable] = useState(false)
    const [industry, setIndustry] = useState("technology")
    const [activeTab, setActiveTab] = useState("basic")
    const [colorScheme, setColorScheme] = useState("auto")
    const [typography, setTypography] = useState("modern")
    const [layoutStyle, setLayoutStyle] = useState("standard")

    // Sample prompts for different industries
    const industryPrompts: Record<string, string> = {
        technology:
            "Create a professional website for a tech startup that offers AI-powered analytics solutions for e-commerce businesses. The company helps online retailers optimize their inventory, pricing, and marketing strategies using machine learning algorithms.",
        healthcare:
            "Design a website for a modern medical clinic that specializes in preventative healthcare and holistic wellness. The clinic offers comprehensive health assessments, personalized wellness plans, and integrates traditional medicine with evidence-based alternative therapies.",
        education:
            "Build a website for an innovative online learning platform that offers interactive courses in programming, design, and digital marketing. The platform features live workshops, mentorship from industry professionals, and project-based learning.",
        ecommerce:
            "Create a website for a premium sustainable fashion brand that sells eco-friendly clothing made from organic and recycled materials. The brand focuses on ethical manufacturing, timeless designs, and transparent supply chain.",
        restaurant:
            "Design a website for an upscale farm-to-table restaurant that sources ingredients from local farms and changes its menu seasonally. The restaurant offers a fine dining experience with a casual atmosphere and has a chef's tasting menu option.",
        realestate:
            "Build a website for a luxury real estate agency that specializes in high-end properties in metropolitan areas and vacation destinations. The agency offers personalized service, virtual tours, and exclusive listings not available elsewhere.",
    }

    useEffect(() => {
        // Check if WizardLM-2 is available
        const checkWizardLM = async () => {
            try {
                const response = await fetch("http://localhost:11434/api/tags", {
                    method: "GET",
                })

                if (response.ok) {
                    const data = await response.json()
                    const hasWizardLM = data.models.some(
                        (model: any) =>
                            model.name.toLowerCase().includes("wizardlm") || model.name.toLowerCase().includes("wizard"),
                    )
                    setWizardLMAvailable(hasWizardLM)

                    // If WizardLM is available, set it as preferred
                    if (hasWizardLM) {
                        setPreferredAI("wizardlm")
                    }
                } else {
                    setWizardLMAvailable(false)
                }
            } catch (error) {
                setWizardLMAvailable(false)
            }
        }

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

        checkWizardLM()
        checkOllama()
    }, [])

    const handleIndustryChange = (value: string) => {
        setIndustry(value)
        // Set a sample prompt based on the selected industry
        setDescription(industryPrompts[value] || "")
    }

    const handleGenerate = async () => {
        if (!description) {
            setError("Please provide a website description")
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            console.log("🚀 Starting website generation...")
            console.log("Preferred AI:", preferredAI)
            console.log("WizardLM Available:", wizardLMAvailable)
            console.log("Ollama Available:", ollamaAvailable)

            let websiteData

            // Try WizardLM first if available and preferred
            if ((preferredAI === "wizardlm" || preferredAI === "auto") && wizardLMAvailable) {
                console.log("🧙‍♂️ Attempting WizardLM generation...")
                try {
                    const response = await fetch("/api/generate-enhanced-website", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            description,
                            websiteName,
                            industry,
                            style: selectedThemeId,
                            aiProvider: "wizardlm",
                            includeImages: true,
                        }),
                    })

                    if (response.ok) {
                        websiteData = await response.json()
                        console.log("✅ WizardLM generation successful!")
                    } else {
                        console.log("❌ WizardLM API failed, trying fallback...")
                        throw new Error("WizardLM generation failed")
                    }
                } catch (wizardError) {
                    console.log("❌ WizardLM error:", wizardError)
                    // Continue to try other options
                }
            }

            // Try Ollama if WizardLM failed and Ollama is available
            if (!websiteData && (preferredAI === "ollama" || preferredAI === "auto") && ollamaAvailable) {
                console.log("🤖 Attempting Ollama generation...")
                try {
                    const response = await fetch("/api/generate-enhanced-website", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            description,
                            websiteName,
                            industry,
                            style: selectedThemeId,
                            aiProvider: "ollama",
                            includeImages: true,
                        }),
                    })

                    if (response.ok) {
                        websiteData = await response.json()
                        console.log("✅ Ollama generation successful!")
                    } else {
                        console.log("❌ Ollama API failed, using mock data...")
                        throw new Error("Ollama generation failed")
                    }
                } catch (ollamaError) {
                    console.log("❌ Ollama error:", ollamaError)
                    // Continue to mock data
                }
            }

            // Use enhanced mock data as final fallback
            if (!websiteData) {
                console.log("📝 Using enhanced mock data generation...")
                const { generateMockWebsite } = await import("@/lib/mock-website-generator")
                websiteData = generateMockWebsite(description, websiteName, industry, selectedThemeId)
                websiteData.metadata.aiUsed = "Enhanced Mock Data"
                console.log("✅ Enhanced mock generation complete!")
            }

            // Store the generated website data in localStorage
            localStorage.setItem("generatedWebsite", JSON.stringify(websiteData))
            console.log("💾 Website data saved to localStorage")

            // Redirect to preview page
            router.push("/preview")
        } catch (err) {
            console.error("❌ Error generating website:", err)
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Professional Website Generator</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Create stunning, conversion-optimized websites in minutes with our AI-powered generator. Perfect for
                    businesses, portfolios, and professional services.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
                <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="basic" className="text-base py-3">
                        Basic Settings
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-base py-3">
                        Advanced Options
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="shadow-lg border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                                    Website Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label htmlFor="websiteName" className="block text-sm font-medium mb-1">
                                        Website Name
                                    </label>
                                    <Input
                                        id="websiteName"
                                        value={websiteName}
                                        onChange={(e) => setWebsiteName(e.target.value)}
                                        placeholder="My Professional Website"
                                        className="border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="industry" className="block text-sm font-medium mb-1">
                                        Industry
                                    </label>
                                    <Select value={industry} onValueChange={handleIndustryChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                                            <SelectItem value="restaurant">Restaurant</SelectItem>
                                            <SelectItem value="realestate">Real Estate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-gray-500 mt-1">Selecting an industry will provide a sample prompt</p>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                                        Website Description
                                    </label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your website in detail. Include information about the business, target audience, key features, and any specific sections you want to include."
                                        rows={8}
                                        className="border-gray-300"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        The more detailed your description, the better the result
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">AI Provider</label>
                                    <RadioGroup value={preferredAI} onValueChange={setPreferredAI} className="flex flex-col space-y-2">
                                        <div className="flex items-center p-2 rounded hover:bg-gray-50">
                                            <RadioGroupItem value="wizardlm" id="ai-wizardlm" disabled={!wizardLMAvailable} />
                                            <Label htmlFor="ai-wizardlm" className="ml-2 flex items-center cursor-pointer">
                                                <Zap className="h-4 w-4 mr-2 text-purple-600" />
                                                <span>WizardLM-2 (Recommended)</span>
                                                {!wizardLMAvailable ? (
                                                    <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            Not available
                          </span>
                                                ) : (
                                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Available
                          </span>
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-50">
                                            <RadioGroupItem value="ollama" id="ai-ollama" disabled={!ollamaAvailable} />
                                            <Label htmlFor="ai-ollama" className="ml-2 flex items-center cursor-pointer">
                                                <Server className="h-4 w-4 mr-2 text-blue-600" />
                                                <span>Ollama (Standard)</span>
                                                {!ollamaAvailable ? (
                                                    <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            Not available
                          </span>
                                                ) : (
                                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Available
                          </span>
                                                )}
                                            </Label>
                                        </div>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-50">
                                            <RadioGroupItem value="auto" id="ai-auto" />
                                            <Label htmlFor="ai-auto" className="ml-2 flex items-center cursor-pointer">
                                                <span>Auto (Use best available)</span>
                                                {!wizardLMAvailable && !ollamaAvailable && (
                                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                            Will use mock data
                          </span>
                                                )}
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-start">
                                        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base"
                                >
                                    {isGenerating ? "Generating..." : "Generate Professional Website"}
                                </Button>
                            </CardFooter>
                        </Card>

                        <div>
                            <Card className="shadow-lg border-0 mb-8">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                                        Theme Selection
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            "light-default",
                                            "dark-modern",
                                            "colorful-creative",
                                            "minimal-elegant",
                                            "corporate-professional",
                                            "tech-startup",
                                        ].map((theme) => (
                                            <div
                                                key={theme}
                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                    selectedThemeId === theme
                                                        ? "border-blue-500 ring-2 ring-blue-200"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() => setSelectedThemeId(theme)}
                                            >
                                                <div
                                                    className={`h-20 rounded mb-2 ${
                                                        theme === "light-default"
                                                            ? "bg-gradient-to-r from-blue-100 to-blue-200"
                                                            : theme === "dark-modern"
                                                                ? "bg-gradient-to-r from-gray-700 to-gray-900"
                                                                : theme === "colorful-creative"
                                                                    ? "bg-gradient-to-r from-pink-400 to-purple-500"
                                                                    : theme === "minimal-elegant"
                                                                        ? "bg-gray-100"
                                                                        : theme === "corporate-professional"
                                                                            ? "bg-gradient-to-r from-blue-600 to-blue-800"
                                                                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                                    }`}
                                                ></div>
                                                <div className="text-sm font-medium">
                                                    {theme === "light-default"
                                                        ? "Light Default"
                                                        : theme === "dark-modern"
                                                            ? "Dark Modern"
                                                            : theme === "colorful-creative"
                                                                ? "Colorful Creative"
                                                                : theme === "minimal-elegant"
                                                                    ? "Minimal Elegant"
                                                                    : theme === "corporate-professional"
                                                                        ? "Corporate Professional"
                                                                        : "Tech Startup"}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Zap className="h-5 w-5 mr-2 text-purple-600" />
                                        Why Choose WizardLM-2?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span>Free to use, no API costs or rate limits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span>Runs locally on your machine for complete privacy</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span>Optimized for instruction following and creative tasks</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span>Generates professional, conversion-focused websites</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span>Comparable quality to commercial AI models</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="advanced">
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle>Advanced Configuration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Component Selection</label>
                                    <div className="space-y-2">
                                        {[
                                            { id: "header", label: "Professional Header", default: true },
                                            { id: "hero", label: "Hero Section", default: true },
                                            { id: "features", label: "Features Grid", default: true },
                                            { id: "testimonials", label: "Testimonials", default: true },
                                            { id: "stats", label: "Statistics Section", default: false },
                                            { id: "pricing", label: "Pricing Section", default: false },
                                            { id: "faq", label: "FAQ Section", default: false },
                                            { id: "cta", label: "Call to Action", default: true },
                                            { id: "contact", label: "Contact Form", default: false },
                                            { id: "footer", label: "Professional Footer", default: true },
                                        ].map((component) => (
                                            <div key={component.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`component-${component.id}`}
                                                    defaultChecked={component.default}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <label htmlFor={`component-${component.id}`} className="ml-2 text-sm text-gray-700">
                                                    {component.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Style Preferences</label>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="colorScheme" className="block text-sm font-medium mb-1">
                                                Color Scheme
                                            </label>
                                            <Select value={colorScheme} onValueChange={setColorScheme}>
                                                <SelectTrigger id="colorScheme">
                                                    <SelectValue placeholder="Select color scheme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="auto">Auto (Based on Industry)</SelectItem>
                                                    <SelectItem value="blue">Blue Professional</SelectItem>
                                                    <SelectItem value="green">Green Eco-Friendly</SelectItem>
                                                    <SelectItem value="purple">Purple Creative</SelectItem>
                                                    <SelectItem value="red">Red Bold</SelectItem>
                                                    <SelectItem value="gray">Gray Minimal</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label htmlFor="typography" className="block text-sm font-medium mb-1">
                                                Typography
                                            </label>
                                            <Select value={typography} onValueChange={setTypography}>
                                                <SelectTrigger id="typography">
                                                    <SelectValue placeholder="Select typography style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="modern">Modern (Inter)</SelectItem>
                                                    <SelectItem value="classic">Classic (Merriweather)</SelectItem>
                                                    <SelectItem value="minimal">Minimal (Roboto)</SelectItem>
                                                    <SelectItem value="creative">Creative (Poppins)</SelectItem>
                                                    <SelectItem value="corporate">Corporate (Montserrat)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label htmlFor="layout" className="block text-sm font-medium mb-1">
                                                Layout Style
                                            </label>
                                            <Select value={layoutStyle} onValueChange={setLayoutStyle}>
                                                <SelectTrigger id="layout">
                                                    <SelectValue placeholder="Select layout style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="standard">Standard</SelectItem>
                                                    <SelectItem value="compact">Compact</SelectItem>
                                                    <SelectItem value="spacious">Spacious</SelectItem>
                                                    <SelectItem value="creative">Creative</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
