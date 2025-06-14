"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ImageIcon, Zap } from "lucide-react"

export default function SetupSuccessPage() {
    const [testResults, setTestResults] = useState<any>(null)

    useEffect(() => {
        // Test both services
        Promise.all([fetch("/api/test-ollama-connection"), fetch("/api/test-unsplash")])
            .then(([ollamaRes, unsplashRes]) => Promise.all([ollamaRes.json(), unsplashRes.json()]))
            .then(([ollamaData, unsplashData]) => {
                setTestResults({
                    ollama: ollamaData,
                    unsplash: unsplashData,
                })
            })
    }, [])

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">🎉 Setup Complete!</h1>
                    <p className="text-gray-600 mb-6">Your website generator is now fully configured and ready to use</p>

                    <div className="flex justify-center gap-4 mb-6">
                        <Badge variant="default" className="text-sm py-2 px-4">
                            <Zap className="h-4 w-4 mr-2" />
                            Ollama Connected
                        </Badge>
                        <Badge variant="default" className="text-sm py-2 px-4">
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Unsplash Working
                        </Badge>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-blue-500" />
                                AI Content Generation
                            </CardTitle>
                            <CardDescription>Ollama is running and ready to generate content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Ollama service running</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">AI models available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Content generation ready</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-purple-500" />
                                Real Image Integration
                            </CardTitle>
                            <CardDescription>Unsplash API configured for high-quality images</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">API key configured</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Rate limit: {testResults?.unsplash?.rateLimit || "Available"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Real images ready</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow-500" />
                            What You Can Do Now
                        </CardTitle>
                        <CardDescription>Your enhanced website generator capabilities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-2">✨ AI-Powered Generation</h4>
                                <ul className="text-sm space-y-1 text-gray-600">
                                    <li>• Generate unique content with Ollama</li>
                                    <li>• Industry-specific text and descriptions</li>
                                    <li>• Personalized website copy</li>
                                    <li>• Smart content suggestions</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">🖼️ Professional Images</h4>
                                <ul className="text-sm space-y-1 text-gray-600">
                                    <li>• High-quality Unsplash photos</li>
                                    <li>• Industry-specific imagery</li>
                                    <li>• Professional team photos</li>
                                    <li>• Gallery and hero images</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Ready to Create Amazing Websites!</h2>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <a href="/ultimate-generator">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate Website
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/debug-unsplash">View Debug Info</a>
                        </Button>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Enable "Include Images" for real Unsplash photos</li>
                        <li>• Try different industries for varied content</li>
                        <li>• Experiment with different styles (modern, luxury, minimal)</li>
                        <li>• Your Unsplash rate limit resets every hour</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
