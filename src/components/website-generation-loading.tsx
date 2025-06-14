"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export function WebsiteGenerationLoading() {
    const [step, setStep] = useState(0)
    const [dots, setDots] = useState("")

    const steps = [
        "Connecting to Ollama",
        "Analyzing industry requirements",
        "Generating content with AI",
        "Creating website structure",
        "Applying design styles",
        "Finalizing components",
        "Preparing preview",
    ]

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
        }, 2000)

        const dotInterval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""))
        }, 500)

        return () => {
            clearInterval(stepInterval)
            clearInterval(dotInterval)
        }
    }, [steps.length])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <h2 className="mt-6 text-2xl font-bold">Generating Your Website</h2>
                    <p className="mt-2 text-muted-foreground">This may take a moment as we create your custom website</p>
                </div>

                <div className="space-y-4 mt-8">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-center">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                    i < step
                                        ? "bg-green-500 text-white"
                                        : i === step
                                            ? "bg-primary text-white"
                                            : "bg-muted text-muted-foreground"
                                }`}
                            >
                                {i < step ? "✓" : i === step ? "•" : ""}
                            </div>
                            <span
                                className={`${
                                    i < step ? "text-green-500" : i === step ? "text-primary font-medium" : "text-muted-foreground"
                                }`}
                            >
                {s}
                                {i === step && dots}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
