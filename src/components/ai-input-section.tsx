"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AIInputSection() {
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const router = useRouter()

    const suggestions = [
        { label: "Modern Landing Page", value: "landing page" },
        { label: "E-commerce Site", value: "e-commerce" },
        { label: "Creative Portfolio", value: "portfolio" },
        { label: "Personal Blog", value: "blog" },
    ]

    const handleGenerate = async () => {
        if (!prompt) return

        setIsGenerating(true)
        // In a real implementation, you might want to store the prompt in state/localStorage
        // and then redirect to the builder page
        setTimeout(() => {
            router.push("/create")
            setIsGenerating(false)
        }, 1000)
    }

    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-2 shadow-2xl border border-purple-500/20">
                <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What would you like to create?"
                    className="bg-transparent border-none text-white placeholder:text-gray-400 text-lg p-6 h-auto"
                />
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white"
                    size="icon"
                >
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">Start for free. No credit card required.</div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {suggestions.map((suggestion) => (
                    <Button
                        key={suggestion.value}
                        variant="outline"
                        className="bg-black/30 text-white border-gray-700 hover:bg-black/50 hover:border-purple-500/50"
                        onClick={() => handleSuggestionClick(suggestion.value)}
                    >
                        {suggestion.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}
