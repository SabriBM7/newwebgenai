"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ThemeSelector from "@/components/theme-selector"
import ThemePreview from "@/components/theme-preview"
import { getThemeById } from "@/lib/theme-system-enhanced"

export default function ThemeGenerator() {
    const router = useRouter()
    const [description, setDescription] = useState("")
    const [websiteName, setWebsiteName] = useState("")
    const [selectedThemeId, setSelectedThemeId] = useState("light-default")
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
            <h1 className="text-3xl font-bold mb-8 text-center">Theme-Aware Website Generator</h1>

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
                        <h3 className="text-lg font-semibold mb-3">Theme Details</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm mb-2">
                                <span className="font-medium">Name:</span> {getThemeById(selectedThemeId).name}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-medium">Description:</span> {getThemeById(selectedThemeId).description}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Best for:</span>{" "}
                                {selectedThemeId === "light-default" && "General purpose websites"}
                                {selectedThemeId === "dark-default" && "Modern, tech-focused websites"}
                                {selectedThemeId === "corporate" && "Business and professional services"}
                                {selectedThemeId === "creative" && "Design, art, and creative industries"}
                                {selectedThemeId === "restaurant" && "Food and hospitality businesses"}
                                {selectedThemeId === "healthcare" && "Medical and healthcare services"}
                                {selectedThemeId === "education" && "Schools, universities, and educational platforms"}
                                {selectedThemeId === "tech-startup" && "Technology companies and startups"}
                                {selectedThemeId === "real-estate" && "Property and real estate businesses"}
                                {selectedThemeId === "ecommerce" && "Online stores and retail businesses"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
