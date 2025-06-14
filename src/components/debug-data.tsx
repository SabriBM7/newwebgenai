"use client"

import { Badge } from "@/components/ui/badge"

interface DebugDataProps {
    data: any
}

export function DebugData({ data }: DebugDataProps) {
    if (!data) {
        return <div className="text-gray-400">No data available</div>
    }

    return (
        <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Website Metadata</h4>
                <div className="text-sm text-gray-300 space-y-1">
                    <p>
                        <strong>Name:</strong> {data.websiteName || "N/A"}
                    </p>
                    <p>
                        <strong>Industry:</strong> {data.industry || "N/A"}
                    </p>
                    <p>
                        <strong>Style:</strong> {data.style || "N/A"}
                    </p>
                    <p>
                        <strong>Components:</strong> {data.components?.length || 0}
                    </p>
                    <p>
                        <strong>Generated:</strong> {data.generatedAt || "N/A"}
                    </p>
                </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Component Types</h4>
                <div className="flex flex-wrap gap-2">
                    {data.components?.map((comp: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                            {comp.type || "Unknown"}
                        </Badge>
                    )) || <span className="text-gray-400">No components</span>}
                </div>
            </div>

            <details className="bg-gray-900 rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer">Raw Data</summary>
                <pre className="text-xs text-gray-300 mt-2 overflow-auto max-h-96">{JSON.stringify(data, null, 2)}</pre>
            </details>
        </div>
    )
}
