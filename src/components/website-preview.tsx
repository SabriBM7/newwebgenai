"use client"

import { ComponentFactory } from "@/components/component-factory"
import { AlertCircle } from "lucide-react"

interface WebsitePreviewProps {
    websiteData: any
}

export default function WebsitePreview({ websiteData }: WebsitePreviewProps) {
    if (!websiteData) {
        return (
            <div className="p-8 text-center text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Website Data</h3>
                <p>Unable to load website preview.</p>
            </div>
        )
    }

    if (!websiteData.components || websiteData.components.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Components</h3>
                <p>This website doesn't have any components to display.</p>
            </div>
        )
    }

    return (
        <div className="w-full">
            <ComponentFactory components={websiteData.components} />
        </div>
    )
}
