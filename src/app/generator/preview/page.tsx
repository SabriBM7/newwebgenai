"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Download, RefreshCw } from "lucide-react"
import ComponentFactory from "@/components/ComponentFactory"

interface GeneratedWebsite {
    title: string
    description: string
    sections: {
        type: string
        variant: string
        props: any
    }[]
    theme?: {
        colors?: any
        typography?: any
    }
}

export default function PreviewPage() {
    const router = useRouter()
    const [website, setWebsite] = useState<GeneratedWebsite | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get the generated website data from localStorage
        const storedData = localStorage.getItem("generatedWebsite")

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData)
                setWebsite(parsedData)
            } catch (error) {
                console.error("Error parsing website data:", error)
            }
        }

        setLoading(false)
    }, [])

    const handleBack = () => {
        router.push("/generator")
    }

    const handleRegenerateSection = async (index: number) => {
        // Implementation for regenerating a specific section
        // This would call the Ollama API again with specific instructions
        alert(`Regenerate section ${index} - To be implemented`)
    }

    const handleExport = () => {
        // Implementation for exporting the website
        // This could generate HTML, a Next.js project, etc.
        alert("Export functionality - To be implemented")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!website) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-2xl font-bold mb-4">No website data found</h1>
                <p className="mb-6">Please generate a website first.</p>
                <Button onClick={handleBack}>Go to Generator</Button>
            </div>
        )
    }

    return (
        <div>
            <div className="sticky top-0 z-10 bg-background border-b p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Generator
                    </Button>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-2">{website.title}</h1>
                <p className="text-gray-500 mb-8">{website.description}</p>

                {website.sections.map((section, index) => (
                    <div key={index} className="mb-12 relative group">
                        <div className="absolute -right-12 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleRegenerateSection(index)}
                                title="Regenerate this section"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>

                        <ComponentFactory component={section.type} variant={section.variant} props={section.props} />
                    </div>
                ))}
            </div>
        </div>
    )
}
