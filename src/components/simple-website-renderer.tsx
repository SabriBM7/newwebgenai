"use client"

import { useState } from "react"
import FixedComponentFactory from "./fixed-component-factory"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            <h3 className="font-bold">Error rendering component:</h3>
            <pre className="mt-2 text-xs whitespace-pre-wrap">{error.message}</pre>
        </div>
    )
}

export default function SimpleWebsiteRenderer({ website }: { website: any }) {
    const [activeTab, setActiveTab] = useState("preview")

    // Safe rendering function with error boundary
    const renderComponent = (section: any, index: number) => {
        if (!section) return null

        return (
            <ErrorBoundary
                key={index}
                FallbackComponent={ErrorFallback}
                onError={(error) => {
                    console.error(`Error rendering section ${index}:`, error)
                }}
            >
                <div className="component-wrapper">
                    <FixedComponentFactory
                        component={section.type}
                        variant={section.variant || "default"}
                        props={section.props || {}}
                    />
                </div>
            </ErrorBoundary>
        )
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-2 bg-gray-100">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-3 py-1 rounded ${activeTab === "preview" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab("json")}
                        className={`px-3 py-1 rounded ${activeTab === "json" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                    >
                        JSON
                    </button>
                </div>
            </div>

            {activeTab === "preview" && (
                <div className="min-h-[500px] bg-white">
                    {website.sections && website.sections.length > 0 ? (
                        <div className="website-preview">
                            {website.sections.map((section: any, index: number) => renderComponent(section, index))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">No sections available. Try generating a website first.</div>
                    )}
                </div>
            )}

            {activeTab === "json" && (
                <pre className="bg-gray-900 text-gray-300 p-4 overflow-auto h-[500px] text-sm">
          {JSON.stringify(website, null, 2)}
        </pre>
            )}
        </div>
    )
}
