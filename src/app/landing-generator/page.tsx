"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import LandingPreview from "./landing-preview"
import { ThemeCustomizer } from "@/components/theme/ThemeCustomizer"
import { type Theme, getThemeById } from "@/lib/theme-customization"

export default function LandingGenerator() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [prompt, setPrompt] = useState("")
    const [industry, setIndustry] = useState("technology")
    const [generatedContent, setGeneratedContent] = useState(null)
    const [currentTheme, setCurrentTheme] = useState<Theme>(getThemeById("default-light"))
    const [componentStyles, setComponentStyles] = useState({
        header: "minimal",
        hero: "standard",
        features: "grid",
        footer: "standard",
    })

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please provide a description of your business or product")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/ollama-landing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt,
                    industry,
                    styles: componentStyles,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate landing page")
            }

            const data = await response.json()
            setGeneratedContent(data)
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleStyleChange = (component: string, style: string) => {
        setComponentStyles((prev) => ({
            ...prev,
            [component]: style,
        }))
    }

    const handleThemeChange = (theme: Theme) => {
        setCurrentTheme(theme)
    }

    // Fallback content for preview/testing
    const fallbackContent = {
        header: {
            logo: "Your Logo",
            menu: [
                { label: "Home", link: "#" },
                { label: "Features", link: "#features" },
                { label: "Pricing", link: "#pricing" },
                { label: "Contact", link: "#contact" },
            ],
            style: componentStyles.header,
        },
        hero: {
            title: "Transform Your Business with AI",
            subtitle: "Powerful Solutions",
            description: "Our AI-powered platform helps businesses automate tasks, gain insights, and grow faster.",
            buttonText: "Get Started",
            buttonLink: "#",
            imageUrl: "/placeholder.svg?key=82337",
            style: componentStyles.hero,
        },
        features: {
            title: "Key Features",
            subtitle: "What makes us different",
            items: [
                {
                    title: "Automation",
                    description: "Save time with smart automation tools",
                    icon: "settings",
                },
                {
                    title: "Analytics",
                    description: "Gain insights from your data",
                    icon: "bar-chart",
                },
                {
                    title: "Integration",
                    description: "Works with your existing tools",
                    icon: "plug",
                },
            ],
            style: componentStyles.features,
        },
        footer: {
            companyName: "YourCompany",
            copyright: "© 2023 YourCompany. All rights reserved.",
            links: [
                { label: "Privacy", link: "#" },
                { label: "Terms", link: "#" },
                { label: "Contact", link: "#" },
            ],
            socialLinks: [
                { platform: "Twitter", link: "#" },
                { platform: "LinkedIn", link: "#" },
                { platform: "Facebook", link: "#" },
            ],
            style: componentStyles.footer,
        },
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">AI Landing Page Generator</h1>

            <div className="grid grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Describe your business or product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Industry</label>
                                <Select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full">
                                    <option value="technology">Technology</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="finance">Finance</option>
                                    <option value="education">Education</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="creative">Creative</option>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Header Style</label>
                                    <Select
                                        value={componentStyles.header}
                                        onChange={(e) => handleStyleChange("header", e.target.value)}
                                        className="w-full"
                                    >
                                        <option value="minimal">Minimal</option>
                                        <option value="saas">SaaS</option>
                                        <option value="education">Education</option>
                                        <option value="corporate">Corporate</option>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Hero Style</label>
                                    <Select
                                        value={componentStyles.hero}
                                        onChange={(e) => handleStyleChange("hero", e.target.value)}
                                        className="w-full"
                                    >
                                        <option value="standard">Standard</option>
                                        <option value="split">Split</option>
                                        <option value="gradient">Gradient</option>
                                        <option value="video">Video Background</option>
                                        <option value="parallax">Parallax</option>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Features Style</label>
                                    <Select
                                        value={componentStyles.features}
                                        onChange={(e) => handleStyleChange("features", e.target.value)}
                                        className="w-full"
                                    >
                                        <option value="grid">Grid</option>
                                        <option value="cards">Cards</option>
                                        <option value="animated">Animated</option>
                                        <option value="timeline">Timeline</option>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Footer Style</label>
                                    <Select
                                        value={componentStyles.footer}
                                        onChange={(e) => handleStyleChange("footer", e.target.value)}
                                        className="w-full"
                                    >
                                        <option value="standard">Standard</option>
                                        <option value="modern">Modern</option>
                                        <option value="creative">Creative</option>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Theme</label>
                                <ThemeCustomizer onThemeChange={handleThemeChange} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Describe your business</label>
                                <Textarea
                                    placeholder="e.g., We provide AI-powered marketing automation tools that help small businesses grow their audience and increase conversions."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={5}
                                    className="w-full"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleGenerate} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Landing Page"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {(generatedContent || fallbackContent) && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Generated Landing Page</h2>
                        <LandingPreview content={generatedContent || fallbackContent} />
                    </div>
                )}
            </div>
        </div>
    )
}
