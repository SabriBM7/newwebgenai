"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function AIChatInput() {
    const [input, setInput] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!input.trim() || isGenerating) return

        setIsGenerating(true)

        try {
            // Call API to generate website
            const response = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: input,
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
        } catch (error) {
            console.error("Error generating website:", error)
            alert("Sorry, there was an error generating your website. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    const handlePresetClick = (preset: string) => {
        setInput(preset)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What kind of website do you want to create?"
                        className="w-full px-6 py-4 rounded-full bg-purple-950/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                    />
                    <button
                        type="submit"
                        disabled={isGenerating || !input.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <ArrowRight className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => handlePresetClick("Landing Page for a SaaS product")}
                    className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                >
                    Landing Page
                </button>
                <button
                    onClick={() => handlePresetClick("E-commerce store for fashion products")}
                    className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                >
                    E-commerce
                </button>
                <button
                    onClick={() => handlePresetClick("Portfolio website for a photographer")}
                    className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                >
                    Portfolio
                </button>
                <button
                    onClick={() => handlePresetClick("Blog website for a tech company")}
                    className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                >
                    Blog
                </button>
            </div>
        </div>
    )
}
