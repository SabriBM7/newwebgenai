"use client"

import type React from "react"
import { useState } from "react"

const WebsiteGeneratorForm = () => {
    const [description, setDescription] = useState("")
    const [websiteName, setWebsiteName] = useState("")
    const [industry, setIndustry] = useState("")
    const [style, setStyle] = useState("")
    const [aiProvider, setAiProvider] = useState("openai")
    const [includeImages, setIncludeImages] = useState(true)
    const [targetAudience, setTargetAudience] = useState("")
    const [businessGoals, setBusinessGoals] = useState<string[]>([])
    const [uniqueSellingPoints, setUniqueSellingPoints] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const addBusinessGoal = () => {
        setBusinessGoals([...businessGoals, ""])
    }

    const updateBusinessGoal = (index: number, value: string) => {
        const newGoals = [...businessGoals]
        newGoals[index] = value
        setBusinessGoals(newGoals)
    }

    const removeBusinessGoal = (index: number) => {
        const newGoals = [...businessGoals]
        newGoals.splice(index, 1)
        setBusinessGoals(newGoals)
    }

    const addUniqueSellingPoint = () => {
        setUniqueSellingPoints([...uniqueSellingPoints, ""])
    }

    const updateUniqueSellingPoint = (index: number, value: string) => {
        const newPoints = [...uniqueSellingPoints]
        newPoints[index] = value
        setUniqueSellingPoints(newPoints)
    }

    const removeUniqueSellingPoint = (index: number) => {
        const newPoints = [...uniqueSellingPoints]
        newPoints.splice(index, 1)
        setUniqueSellingPoints(newPoints)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch("/api/generate-ultimate-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description,
                    websiteName,
                    industry,
                    style,
                    aiProvider,
                    includeImages,
                    targetAudience,
                    businessGoals: businessGoals.filter((goal) => goal.trim()),
                    uniqueSellingPoints: uniqueSellingPoints.filter((usp) => usp.trim()),
                }),
            })

            if (!response.ok) {
                throw new Error("Generation failed")
            }

            const data = await response.json()
            console.log("✅ Website generated successfully:", data)

            // Store the data in sessionStorage for the preview page
            sessionStorage.setItem("generatedWebsite", JSON.stringify(data))

            // Redirect to preview page
            window.location.href = "/preview"
        } catch (err) {
            console.error("❌ Generation error:", err)
            setError(err instanceof Error ? err.message : "Generation failed")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: "red" }}>Error: {error}</div>}
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="websiteName">Website Name:</label>
                <input
                    type="text"
                    id="websiteName"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="industry">Industry:</label>
                <input type="text" id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="style">Style:</label>
                <input type="text" id="style" value={style} onChange={(e) => setStyle(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="aiProvider">AI Provider:</label>
                <select id="aiProvider" value={aiProvider} onChange={(e) => setAiProvider(e.target.value)}>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                </select>
            </div>
            <div>
                <label htmlFor="includeImages">Include Images:</label>
                <input
                    type="checkbox"
                    id="includeImages"
                    checked={includeImages}
                    onChange={(e) => setIncludeImages(e.target.checked)}
                />
            </div>
            <div>
                <label htmlFor="targetAudience">Target Audience:</label>
                <input
                    type="text"
                    id="targetAudience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Business Goals:</label>
                {businessGoals.map((goal, index) => (
                    <div key={index}>
                        <input type="text" value={goal} onChange={(e) => updateBusinessGoal(index, e.target.value)} />
                        <button type="button" onClick={() => removeBusinessGoal(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addBusinessGoal}>
                    Add Business Goal
                </button>
            </div>
            <div>
                <label>Unique Selling Points:</label>
                {uniqueSellingPoints.map((usp, index) => (
                    <div key={index}>
                        <input type="text" value={usp} onChange={(e) => updateUniqueSellingPoint(index, e.target.value)} />
                        <button type="button" onClick={() => removeUniqueSellingPoint(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addUniqueSellingPoint}>
                    Add Unique Selling Point
                </button>
            </div>
            <button type="submit" disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Website"}
            </button>
        </form>
    )
}

export default WebsiteGeneratorForm
