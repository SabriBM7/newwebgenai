"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import FixedComponentFactory from "./fixed-component-factory"
import { ErrorBoundary } from "./error-boundary"

const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "marketing", label: "Marketing" },
    { value: "realestate", label: "Real Estate" },
    { value: "travel", label: "Travel & Hospitality" },
]

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            <h3 className="font-bold">Error rendering component:</h3>
            <pre className="mt-2 text-xs whitespace-pre-wrap">{error.message}</pre>
        </div>
    )
}

export default function FixedLandingGenerator() {
    const [industry, setIndustry] = useState("technology")
    const [description, setDescription] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("preview")
    const [theme, setTheme] = useState("creative-pink")
    const [error, setError] = useState<Error | null>(null)

    const handleGenerate = async () => {
        if (!description.trim()) return

        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch("/api/ollama-generate-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requirements: {
                        industry,
                        description,
                    },
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate website")
            }

            const data = await response.json()
            setGeneratedWebsite(data.website)
        } catch (error) {
            console.error("Error generating website:", error)
            setError(error instanceof Error ? error : new Error(String(error)))
        } finally {
            setIsGenerating(false)
        }
    }

    // Safe rendering function with error boundary
    const renderComponent = (section: any, index: number) => {
        if (!section) return null

        return (
            <ErrorBoundary
                key={index}
                fallback={(error) => <ErrorFallback error={error} />}
                onError={(error) => {
                    console.error(`Error rendering section ${index}:`, error)
                }}
            >
                <div className="component-wrapper">
                    <FixedComponentFactory
                        component={section.type}
                        variant={section.variant || "default"}
                        props={section.props || {}}
                    />
                </div>
            </ErrorBoundary>
        )
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-white">AI Landing Page Generator</h1>

            <div className="bg-gray-900 rounded-lg p-6 mb-12 border border-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-white">Describe your business or product</h2>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                            Industry
                        </label>
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {industries.map((ind) => (
                                <option key={ind.value} value={ind.value}>
                                    {ind.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Describe your business
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., We provide AI-powered marketing automation tools that help small businesses grow their audience and increase conversions."
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !description.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {isGenerating ? "Generating..." : "Generate Landing Page"}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                    <h3 className="font-bold">Error:</h3>
                    <pre className="mt-2 text-xs whitespace-pre-wrap">{error.message}</pre>
                </div>
            )}

            {generatedWebsite && (
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">Generated Landing Page</h2>

                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center p-2 bg-gray-100">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 rounded ${activeTab === "preview" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => setActiveTab("json")}
                                    className={`px-3 py-1 rounded ${activeTab === "json" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                                >
                                    JSON
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="bg-white border border-gray-300 rounded-md text-sm px-3 py-1"
                                >
                                    <option value="creative-pink">Creative Pink</option>
                                    <option value="corporate-blue">Corporate Blue</option>
                                    <option value="modern-green">Modern Green</option>
                                    <option value="dark">Dark</option>
                                </select>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    Export
                                </Button>
                            </div>
                        </div>

                        {activeTab === "preview" && (
                            <div className={`min-h-[500px] bg-white ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}>
                                {generatedWebsite.sections && generatedWebsite.sections.length > 0 ? (
                                    <div className="website-preview">
                                        {generatedWebsite.sections.map((section: any, index: number) => renderComponent(section, index))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No sections generated. Try again with a different description.
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "json" && (
                            <pre className="bg-gray-900 text-gray-300 p-4 overflow-auto h-[500px] text-sm">
                {JSON.stringify(generatedWebsite, null, 2)}
              </pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
