"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import WebsiteRenderer from "@/components/website-renderer"

export default function AIGeneratorSection() {
    const [query, setQuery] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState(null)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!query.trim()) {
            setError("Please enter a description of the website you want to create")
            return
        }

        setError("")
        setIsGenerating(true)

        try {
            const response = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate website")
            }

            const data = await response.json()
            setGeneratedWebsite(data)
        } catch (err) {
            console.error("Error generating website:", err)
            setError("Something went wrong. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
            {!generatedWebsite ? (
                <div className="container mx-auto px-4">
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

                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl sm:text-6xl font-bold mb-6">Bring your website idea to life in minutes</h2>
                        <p className="text-xl mb-12 text-purple-100">
                            Create and launch a website without writing a single line of code. Just chat with our AI, then publish
                            your project with one click.
                        </p>

                        <form onSubmit={handleSubmit} className="mb-12">
                            <div className="relative max-w-2xl mx-auto">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="What kind of website do you want to create?"
                                    className="w-full px-6 py-4 rounded-full bg-purple-950/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                                />
                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                    ) : (
                                        <ArrowRight className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {error && <p className="mt-2 text-red-300">{error}</p>}
                        </form>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => setQuery("Landing Page for a SaaS product")}
                                className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700"
                            >
                                Landing Page
                            </button>
                            <button
                                onClick={() => setQuery("E-commerce store for fashion products")}
                                className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700"
                            >
                                E-commerce
                            </button>
                            <button
                                onClick={() => setQuery("Portfolio website for a photographer")}
                                className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700"
                            >
                                Portfolio
                            </button>
                            <button
                                onClick={() => setQuery("Blog website for a tech company")}
                                className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700"
                            >
                                Blog
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="bg-purple-950 p-4 sticky top-0 z-50 flex justify-between items-center">
                        <button
                            onClick={() => setGeneratedWebsite(null)}
                            className="px-4 py-2 rounded bg-purple-800 hover:bg-purple-700"
                        >
                            ← Back
                        </button>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded bg-purple-800 hover:bg-purple-700">Edit</button>
                            <button className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500">Publish</button>
                        </div>
                    </div>
                    <WebsiteRenderer components={generatedWebsite.components} />
                </div>
            )}
        </div>
    )
}
