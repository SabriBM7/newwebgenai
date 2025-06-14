"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Download,
    Eye,
    Code,
    Palette,
    Globe,
    ArrowLeft,
    Copy,
    Check,
    Zap,
    Briefcase,
    Clock,
    Target,
    AlertCircle,
    RefreshCw,
} from "lucide-react"
import ComponentFactory from "@/components/component-factory"

interface WebsiteData {
    components: any[]
    metadata?: any
    websiteName: string
    industry: string
    style: string
    description: string
    generatedAt: string
    success?: boolean
}

export default function PreviewPage() {
    const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"preview" | "code" | "debug">("preview")
    const [copied, setCopied] = useState(false)
    const router = useRouter()

    useEffect(() => {
        try {
            const stored = localStorage.getItem("generatedWebsite")
            if (!stored) {
                setError("No website data found. Please generate a website first.")
                setLoading(false)
                return
            }

            const data = JSON.parse(stored)
            console.log("📄 Loaded website data:", data)

            // Validate the data structure
            if (!data || typeof data !== "object") {
                throw new Error("Invalid website data format")
            }

            // Ensure components array exists
            if (!Array.isArray(data.components)) {
                console.warn("⚠️ Components not found, using empty array")
                data.components = []
            }

            setWebsiteData(data)
        } catch (err) {
            console.error("❌ Error loading website data:", err)
            setError(err instanceof Error ? err.message : "Failed to load website data")
        } finally {
            setLoading(false)
        }
    }, [])

    const handleCopyCode = async () => {
        if (!websiteData) return

        try {
            const codeString = JSON.stringify(websiteData, null, 2)
            await navigator.clipboard.writeText(codeString)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const handleDownload = () => {
        if (!websiteData) return

        const dataStr = JSON.stringify(websiteData, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${websiteData.websiteName || "website"}-data.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handleRegenerate = () => {
        router.push("/")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Loading Preview...</h2>
                    <p className="text-gray-400">Preparing your generated website</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
                <Card className="max-w-md w-full bg-gray-800/50 border-red-500/30">
                    <CardHeader>
                        <CardTitle className="text-red-400 flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Preview Error
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        <div className="flex space-x-3">
                            <Button onClick={() => router.push("/")} className="flex-1">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Go Back
                            </Button>
                            <Button onClick={handleRegenerate} variant="outline" className="flex-1">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!websiteData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
                <Card className="max-w-md w-full bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">No Website Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-400 mb-4">No website data found. Please generate a website first.</p>
                        <Button onClick={() => router.push("/")} className="w-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Generate Website
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const stats = [
        {
            label: "Components",
            value: websiteData.components?.length || 0,
            icon: Briefcase,
            color: "text-blue-400",
        },
        {
            label: "Industry",
            value: websiteData.industry || "General",
            icon: Target,
            color: "text-green-400",
        },
        {
            label: "Style",
            value: websiteData.style || "Modern",
            icon: Palette,
            color: "text-purple-400",
        },
        {
            label: "Generated",
            value: websiteData.generatedAt ? new Date(websiteData.generatedAt).toLocaleDateString() : "Today",
            icon: Clock,
            color: "text-orange-400",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Header */}
            <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-400 hover:text-white">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Generator
                            </Button>
                            <div className="h-6 w-px bg-gray-700"></div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{websiteData.websiteName}</h1>
                                <p className="text-sm text-gray-400">
                                    {websiteData.industry} • {websiteData.style} style
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Badge className="bg-green-900/50 text-green-300 border-green-700">
                                <Check className="h-3 w-3 mr-1" />
                                Generated
                            </Badge>
                            <Button onClick={handleDownload} variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                            <Button onClick={handleRegenerate} size="sm">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Regenerate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-gray-800/50 border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    <div>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                        <p className="font-semibold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-800/50 p-1 rounded-lg w-fit">
                    {[
                        { id: "preview", label: "Preview", icon: Eye },
                        { id: "code", label: "Code", icon: Code },
                        { id: "debug", label: "Debug", icon: Zap },
                    ].map((tab) => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveTab(tab.id as any)}
                            className={
                                activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
                            }
                        >
                            <tab.icon className="h-4 w-4 mr-2" />
                            {tab.label}
                        </Button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === "preview" && (
                        <Card className="bg-gray-800/30 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                    <Globe className="h-5 w-5 mr-2 text-purple-400" />
                                    Website Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                                    <div className="h-8 bg-gray-100 flex items-center px-4 space-x-2">
                                        <div className="flex space-x-1">
                                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        </div>
                                        <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600">
                                            {websiteData.websiteName?.toLowerCase().replace(/\s+/g, "")}.com
                                        </div>
                                    </div>
                                    <div className="max-h-[600px] overflow-y-auto">
                                        {websiteData.components && websiteData.components.length > 0 ? (
                                            <ComponentFactory components={websiteData.components} />
                                        ) : (
                                            <div className="p-8 text-center text-gray-500">
                                                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                                <h3 className="text-lg font-semibold mb-2">No Components Found</h3>
                                                <p>The website data doesn't contain any components to display.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "code" && (
                        <Card className="bg-gray-800/30 border-gray-700">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white flex items-center">
                                        <Code className="h-5 w-5 mr-2 text-purple-400" />
                                        Generated Code
                                    </CardTitle>
                                    <Button onClick={handleCopyCode} variant="outline" size="sm">
                                        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                        {copied ? "Copied!" : "Copy"}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{JSON.stringify(websiteData, null, 2)}</code>
                  </pre>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "debug" && (
                        <Card className="bg-gray-800/30 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                    <Zap className="h-5 w-5 mr-2 text-purple-400" />
                                    Debug Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">Website Metadata</h4>
                                        <div className="text-sm text-gray-300 space-y-1">
                                            <p>
                                                <strong>Name:</strong> {websiteData.websiteName}
                                            </p>
                                            <p>
                                                <strong>Industry:</strong> {websiteData.industry}
                                            </p>
                                            <p>
                                                <strong>Style:</strong> {websiteData.style}
                                            </p>
                                            <p>
                                                <strong>Components:</strong> {websiteData.components?.length || 0}
                                            </p>
                                            <p>
                                                <strong>Generated:</strong> {websiteData.generatedAt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">Component Types</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {websiteData.components?.map((comp, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {comp.type || "Unknown"}
                                                </Badge>
                                            )) || <span className="text-gray-400">No components</span>}
                                        </div>
                                    </div>

                                    <details className="bg-gray-900 rounded-lg p-4">
                                        <summary className="text-white font-semibold cursor-pointer">Raw Data</summary>
                                        <pre className="text-xs text-gray-300 mt-2 overflow-auto max-h-96">
                      {JSON.stringify(websiteData, null, 2)}
                    </pre>
                                    </details>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
