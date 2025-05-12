import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code, Layout, FileText, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "AI Tools | WebGenAI",
    description: "Explore our suite of AI-powered tools for website creation and content generation.",
}

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        AI-Powered <span className="text-purple-500">Tools</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Leverage the power of AI to create websites, generate content, and streamline your workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Landing Page Generator Card */}
                    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <Layout className="w-6 h-6 text-purple-500" />
                            </div>
                            <CardTitle className="text-white text-xl">Landing Page Generator</CardTitle>
                            <CardDescription className="text-gray-400">
                                Create stunning landing pages in seconds with AI
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                            Describe your business or product, and our AI will generate a complete landing page with headers, hero
                            sections, features, and more.
                        </CardContent>
                        <CardFooter>
                            <Link href="/landing-generator" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:translate-y-0 translate-y-0 group-hover:shadow-lg">
                                    Create Landing Page
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Content Generator Card */}
                    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-purple-500" />
                            </div>
                            <CardTitle className="text-white text-xl">Content Generator</CardTitle>
                            <CardDescription className="text-gray-400">Generate engaging content for your website</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                            Create compelling copy for your website, including headlines, product descriptions, blog posts, and more.
                        </CardContent>
                        <CardFooter>
                            <Link href="/chat" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:translate-y-0 translate-y-0 group-hover:shadow-lg">
                                    Generate Content
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Code Generator Card */}
                    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-purple-500" />
                            </div>
                            <CardTitle className="text-white text-xl">Code Generator</CardTitle>
                            <CardDescription className="text-gray-400">Generate custom code for your website</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                            Create custom HTML, CSS, and JavaScript code for your website. Perfect for adding custom functionality or
                            styling.
                        </CardContent>
                        <CardFooter>
                            <Link href="/chat" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:translate-y-0 translate-y-0 group-hover:shadow-lg">
                                    Generate Code
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Coming Soon Card */}
                    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <Wand2 className="w-6 h-6 text-purple-500" />
                            </div>
                            <CardTitle className="text-white text-xl">Image Generator</CardTitle>
                            <CardDescription className="text-gray-400">Coming Soon</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                            Generate custom images for your website using AI. Create hero images, backgrounds, icons, and more.
                        </CardContent>
                        <CardFooter>
                            <Button disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                                Coming Soon
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
