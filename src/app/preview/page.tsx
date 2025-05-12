"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import WebsiteRenderer from "@/components/website-renderer"

export default function PreviewPage() {
    const [websiteData, setWebsiteData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get the generated website data from localStorage
        const data = localStorage.getItem("generatedWebsite")
        if (data) {
            setWebsiteData(JSON.parse(data))
        }
        setLoading(false)
    }, [])

    const handleDownload = () => {
        if (!websiteData) return

        const dataStr = JSON.stringify(websiteData, null, 2)
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
        const exportFileDefaultName = "website-data.json"

        const linkElement = document.createElement("a")
        linkElement.setAttribute("href", dataUri)
        linkElement.setAttribute("download", exportFileDefaultName)
        linkElement.click()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    if (!websiteData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">No website data found</h1>
                <p className="text-lg mb-8">Please go back and generate a website first.</p>
                <Link href="/">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Generator
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/">
                        <Button variant="outline" className="border-purple-700 text-white hover:bg-purple-900/50">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Generator
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Website Preview</h1>
                    <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
                        Download JSON
                    </Button>
                </div>

                <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="bg-purple-900/30 border border-purple-700/50 mb-6">
                        <TabsTrigger value="preview" className="data-[state=active]:bg-purple-700">
                            Preview
                        </TabsTrigger>
                        <TabsTrigger value="json" className="data-[state=active]:bg-purple-700">
                            JSON Data
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="border border-purple-700/30 rounded-lg p-4 bg-purple-950/20">
                        <div className="bg-white text-black rounded-lg overflow-hidden">
                            <WebsiteRenderer websiteData={websiteData} />
                        </div>
                    </TabsContent>
                    <TabsContent value="json" className="border border-purple-700/30 rounded-lg p-4 bg-purple-950/20">
            <pre className="overflow-auto p-4 rounded bg-black/50 text-purple-100 max-h-[70vh]">
              {JSON.stringify(websiteData, null, 2)}
            </pre>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
