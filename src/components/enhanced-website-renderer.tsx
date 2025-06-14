"use client"

import { useState, useEffect } from "react"
import DynamicComponentFactory from "./component-factory"
import { Loader2 } from "lucide-react"

interface WebsiteData {
    components: Array<{
        type: string
        props: any
    }>
    metadata?: {
        title?: string
        description?: string
        industry?: string
        style?: string
    }
}

interface EnhancedWebsiteRendererProps {
    websiteData: WebsiteData
    className?: string
}

export default function EnhancedWebsiteRenderer({ websiteData, className }: EnhancedWebsiteRendererProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (websiteData) {
            setIsLoading(false)
        }
    }, [websiteData])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading website...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Website</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    if (!websiteData || !websiteData.components || websiteData.components.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Website Data</h2>
                    <p className="text-gray-600">Please generate a website first.</p>
                </div>
            </div>
        )
    }

    console.log(
        "🎨 Rendering website with components:",
        websiteData.components.map((c) => c.type),
    )

    return (
        <div className={className}>
            {websiteData.components.map((component, index) => {
                try {
                    return (
                        <DynamicComponentFactory
                            key={`${component.type}-${index}`}
                            type={component.type}
                            props={component.props || {}}
                            index={index}
                        />
                    )
                } catch (componentError) {
                    console.error(`Error rendering component ${component.type}:`, componentError)
                    return (
                        <div key={`error-${index}`} className="p-4 bg-red-50 border border-red-200 text-red-800">
                            <h3 className="font-bold">Error rendering {component.type}</h3>
                            <p className="text-sm">{componentError instanceof Error ? componentError.message : "Unknown error"}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}
