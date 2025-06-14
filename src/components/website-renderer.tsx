"use client"

import { useState } from "react"
import DynamicComponentFactory from "./component-factory"

interface WebsiteData {
    websiteName: string
    industry: string
    style: string
    components: Array<{
        type: string
        props: Record<string, any>
    }>
}

interface WebsiteRendererProps {
    websiteData: WebsiteData
}

export function WebsiteRenderer({ websiteData }: WebsiteRendererProps) {
    const [showDebug, setShowDebug] = useState(false)

    console.log("🎨 WebsiteRenderer received:", websiteData)

    if (!websiteData || !websiteData.components) {
        return (
            <div className="text-center py-20 text-red-600">
                <h3 className="text-xl font-bold mb-2">Error: Invalid Website Data</h3>
                <p>The website data is missing or invalid.</p>
                <pre className="text-xs mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(websiteData, null, 2)}</pre>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Debug Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                >
                    {showDebug ? "Hide Debug" : "Show Debug"}
                </button>
            </div>

            {/* Debug Panel */}
            {showDebug && (
                <div className="fixed top-16 right-4 w-96 max-h-96 overflow-auto bg-gray-900 text-green-400 p-4 rounded text-xs z-40">
                    <h4 className="text-white font-bold mb-2">Debug Info:</h4>
                    <p className="text-yellow-400">Components: {websiteData.components.length}</p>
                    <div className="mt-2">
                        {websiteData.components.map((comp, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-blue-400">{i + 1}.</span> {comp.type}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Render Components */}
            <div className="bg-red-50">
                {websiteData.components.map((component, index) => {
                    console.log(`🔧 Rendering component ${index + 1}:`, component.type, component.props)

                    // Add alternating background colors for better section separation
                    const isEven = index % 2 === 0
                    const sectionClass = isEven ? "bg-gray-50" : "bg-white"

                    return (
                        <div key={`${component.type}-${index}`} className={`component-wrapper ${sectionClass}`}>
                            <DynamicComponentFactory type={component.type} props={component.props} index={index} />
                        </div>
                    )
                })}
            </div>

            {/* Component Count Footer */}
            <div className="bg-gray-100 text-center py-4 text-sm text-gray-600">
                Website generated with {websiteData.components.length} components • Industry: {websiteData.industry} • Style:{" "}
                {websiteData.style}
            </div>
        </div>
    )
}

export default WebsiteRenderer
