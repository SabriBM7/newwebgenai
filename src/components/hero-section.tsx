"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
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
        <section className="purple-gradient-bg min-h-[80vh] flex items-center justify-center text-white px-4 py-20">
            <div className="container mx-auto text-center">
                <div className="flex justify-center items-center mb-8">
                    <div className="bg-white/10 p-3 rounded-full mr-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-300"
                        >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            <path d="M12 12 8 8"></path>
                            <path d="M12 8v4"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold">AI Website Generator</h1>
                </div>

                <h2 className="text-5xl sm:text-6xl font-bold mb-6">Bring your website idea to life in minutes</h2>
                <p className="text-xl mb-12 text-purple-100 max-w-3xl mx-auto">
                    Create and launch a website without writing a single line of code. Just chat with our AI, then publish your
                    project with one click.
                </p>

                <div className="max-w-3xl mx-auto">
                    <div className="input-container mb-6">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="What kind of website do you want to create?"
                                className="w-full px-6 py-4 rounded-full bg-purple-950/50 border border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300"
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
                        </form>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => handlePresetClick("Landing Page for a SaaS product")}
                            className="px-6 py-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700/30 text-white"
                        >
                            Landing Page
                        </button>
                        <button
                            onClick={() => handlePresetClick("E-commerce store for fashion products")}
                            className="px-6 py-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700/30 text-white"
                        >
                            E-commerce
                        </button>
                        <button
                            onClick={() => handlePresetClick("Portfolio website for a photographer")}
                            className="px-6 py-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700/30 text-white"
                        >
                            Portfolio
                        </button>
                        <button
                            onClick={() => handlePresetClick("Blog website for a tech company")}
                            className="px-6 py-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700/30 text-white"
                        >
                            Blog
                        </button>
                    </div>

                    <p className="text-sm text-purple-300">Start for free. No credit card required.</p>
                </div>
            </div>
        </section>
    )
}
