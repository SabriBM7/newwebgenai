"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Cpu, Zap } from "lucide-react"

interface OllamaModel {
    name: string
    size: string
    modified_at: string
}

interface ConnectionStatus {
    available: boolean
    models: OllamaModel[]
    error?: string
}

export default function TestOllamaPage() {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null)
    const [isTestingConnection, setIsTestingConnection] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        websiteName: "Bella Vista",
        industry: "restaurant",
        description: "An authentic Italian restaurant specializing in traditional pasta dishes and wood-fired pizzas",
        style: "modern",
        selectedModel: "",
        targetAudience: "Families and food enthusiasts",
        businessGoals: "Increase reservations and build brand awareness",
        uniqueSellingPoints: "Fresh homemade pasta, authentic Italian recipes, cozy atmosphere",
    })

    const testOllamaConnection = async () => {
        setIsTestingConnection(true)
        setError(null)

        try {
            const response = await fetch("/api/test-ollama-models")
            const data = await response.json()

            if (data.success) {
                setConnectionStatus({
                    available: true,
                    models: data.models,
                })
                // Set default model if none selected
                if (!formData.selectedModel && data.models.length > 0) {
                    setFormData((prev) => ({ ...prev, selectedModel: data.models[0].name }))
                }
            } else {
                setConnectionStatus({
                    available: false,
                    models: [],
                    error: data.error,
                })
            }
        } catch (err) {
            setConnectionStatus({
                available: false,
                models: [],
                error: "Failed to connect to Ollama",
            })
        } finally {
            setIsTestingConnection(false)
        }
    }

    const generateWithOllama = async () => {
        if (!connectionStatus?.available) {
            setError("Please test connection first")
            return
        }

        setIsGenerating(true)
        setError(null)
        setGeneratedWebsite(null)

        try {
            const response = await fetch("/api/generate-ultimate-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    aiProvider: "ollama",
                    includeImages: true,
                    targetAudience: formData.targetAudience || undefined,
                    businessGoals: formData.businessGoals ? [formData.businessGoals] : [],
                    uniqueSellingPoints: formData.uniqueSellingPoints ? [formData.uniqueSellingPoints] : [],
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.success !== false) {
                setGeneratedWebsite(data)
                console.log("Generated website:", data)
            } else {
                setError(data.error || "Generation failed")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Generation failed")
            console.error("Generation error:", err)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">🤖 Test Ollama Integration</h1>
                    <p className="text-lg text-gray-600">Test your local Ollama models and generate AI-powered websites</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Connection & Form */}
                    <div className="space-y-6">
                        {/* Connection Test */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cpu className="h-5 w-5" />
                                    Ollama Connection
                                </CardTitle>
                                <CardDescription>Test connection to your local Ollama instance</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={testOllamaConnection} disabled={isTestingConnection} className="w-full">
                                    {isTestingConnection ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Testing Connection...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="mr-2 h-4 w-4" />
                                            Test Connection
                                        </>
                                    )}
                                </Button>

                                {connectionStatus && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            {connectionStatus.available ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            )}
                                            <span className={connectionStatus.available ? "text-green-700" : "text-red-700"}>
                        {connectionStatus.available ? "Connected" : "Not Connected"}
                      </span>
                                        </div>

                                        {connectionStatus.available && connectionStatus.models.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-2">Available Models:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {connectionStatus.models.map((model) => (
                                                        <Badge key={model.name} variant="secondary">
                                                            {model.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {connectionStatus.error && <p className="text-sm text-red-600">{connectionStatus.error}</p>}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Generation Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Website Generation</CardTitle>
                                <CardDescription>Configure your website parameters for AI generation</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="websiteName">Website Name</Label>
                                        <Input
                                            id="websiteName"
                                            value={formData.websiteName}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, websiteName: e.target.value }))}
                                            placeholder="Your Business Name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="industry">Industry</Label>
                                        <Select
                                            value={formData.industry}
                                            onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                                <SelectItem value="education">Education</SelectItem>
                                                <SelectItem value="fitness">Fitness</SelectItem>
                                                <SelectItem value="realestate">Real Estate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">Business Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                        placeholder="Describe your business..."
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="style">Design Style</Label>
                                        <Select
                                            value={formData.style}
                                            onValueChange={(value) => setFormData((prev) => ({ ...prev, style: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="modern">Modern</SelectItem>
                                                <SelectItem value="minimalist">Minimalist</SelectItem>
                                                <SelectItem value="corporate">Corporate</SelectItem>
                                                <SelectItem value="creative">Creative</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="selectedModel">Ollama Model</Label>
                                        <Select
                                            value={formData.selectedModel}
                                            onValueChange={(value) => setFormData((prev) => ({ ...prev, selectedModel: value }))}
                                            disabled={!connectionStatus?.available}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {connectionStatus?.models.map((model) => (
                                                    <SelectItem key={model.name} value={model.name}>
                                                        {model.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="targetAudience">Target Audience</Label>
                                    <Input
                                        id="targetAudience"
                                        value={formData.targetAudience}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                                        placeholder="Who is your target audience?"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="businessGoals">Business Goals</Label>
                                    <Input
                                        id="businessGoals"
                                        value={formData.businessGoals}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, businessGoals: e.target.value }))}
                                        placeholder="What are your main business goals?"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="uniqueSellingPoints">Unique Selling Points</Label>
                                    <Input
                                        id="uniqueSellingPoints"
                                        value={formData.uniqueSellingPoints}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, uniqueSellingPoints: e.target.value }))}
                                        placeholder="What makes you unique?"
                                    />
                                </div>

                                <Button
                                    onClick={generateWithOllama}
                                    disabled={!connectionStatus?.available || isGenerating}
                                    className="w-full"
                                    size="lg"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating with Ollama...
                                        </>
                                    ) : (
                                        "🚀 Generate with Ollama"
                                    )}
                                </Button>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-6">
                        {/* Generated Website */}
                        {generatedWebsite && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Generated Website</CardTitle>
                                    <CardDescription>
                                        Website generated with {generatedWebsite.components?.length || 0} components
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium">Industry:</span> {generatedWebsite.industry}
                                            </div>
                                            <div>
                                                <span className="font-medium">Style:</span> {generatedWebsite.style}
                                            </div>
                                            <div>
                                                <span className="font-medium">Components:</span> {generatedWebsite.components?.length || 0}
                                            </div>
                                            <div>
                                                <span className="font-medium">Generated:</span>{" "}
                                                {new Date(generatedWebsite.generatedAt).toLocaleTimeString()}
                                            </div>
                                        </div>

                                        {generatedWebsite.components && (
                                            <div>
                                                <p className="font-medium text-sm mb-2">Components:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {generatedWebsite.components.map((comp: any, index: number) => (
                                                        <Badge key={index} variant="outline">
                                                            {comp.type}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Button
                                                onClick={() =>
                                                    window.open(`/preview?data=${encodeURIComponent(JSON.stringify(generatedWebsite))}`, "_blank")
                                                }
                                                className="w-full"
                                            >
                                                🔍 View Full Preview
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => console.log("Generated website data:", generatedWebsite)}
                                                className="w-full"
                                            >
                                                📋 View Debug Data
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Debug Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Debug Information</CardTitle>
                                <CardDescription>System status and debugging info</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm font-mono">
                                    <div>Ollama Status: {connectionStatus?.available ? "✅ Connected" : "❌ Not Connected"}</div>
                                    <div>Models Available: {connectionStatus?.models.length || 0}</div>
                                    <div>Selected Model: {formData.selectedModel || "None"}</div>
                                    <div>Generation Status: {isGenerating ? "🔄 Generating" : "⏸️ Idle"}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
