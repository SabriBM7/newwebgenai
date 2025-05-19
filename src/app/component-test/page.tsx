"use client"

import { useState } from "react"
import { sampleDataset } from "@/lib/dataset"
import EnhancedWebsiteRenderer from "@/components/enhanced-website-renderer"

export default function ComponentTestPage() {
    const [selectedComponent, setSelectedComponent] = useState(sampleDataset[0])

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Component Testing</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Available Components</h2>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {sampleDataset.map((component, index) => (
                            <button
                                key={index}
                                className={`block w-full text-left px-3 py-2 rounded text-sm ${
                                    selectedComponent === component ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"
                                }`}
                                onClick={() => setSelectedComponent(component)}
                            >
                                {component.component} ({component.variant})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-medium">
                                {selectedComponent.component} - {selectedComponent.variant}
                            </h3>
                        </div>

                        <div className="p-4">
                            <EnhancedWebsiteRenderer
                                website={{
                                    title: "Component Test",
                                    description: "Testing individual components",
                                    sections: [selectedComponent],
                                }}
                            />
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <h4 className="font-medium mb-2">Component Props:</h4>
                            <pre className="text-xs bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto">
                {JSON.stringify(selectedComponent.props, null, 2)}
              </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
