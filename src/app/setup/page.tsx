"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Copy, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SetupPage() {
    const [ollamaStatus, setOllamaStatus] = useState<"checking" | "available" | "unavailable">("checking")
    const [unsplashStatus, setUnsplashStatus] = useState<"checking" | "configured" | "unconfigured">("checking")

    useEffect(() => {
        // Check Ollama status
        fetch("/api/test-ollama-connection")
            .then((res) => res.json())
            .then((data) => {
                setOllamaStatus(data.success ? "available" : "unavailable")
            })
            .catch(() => {
                setOllamaStatus("unavailable")
            })

        // Check Unsplash status
        fetch("/api/test-unsplash")
            .then((res) => res.json())
            .then((data) => {
                setUnsplashStatus(data.success ? "configured" : "unconfigured")
            })
            .catch(() => {
                setUnsplashStatus("unconfigured")
            })
    }, [])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">🚀 Website Generator Setup</h1>
                    <p className="text-gray-600 mb-6">
                        Complete these steps to enable AI-powered website generation with real images
                    </p>

                    <div className="flex justify-center gap-4 mb-6">
                        <Badge variant={ollamaStatus === "available" ? "default" : "destructive"} className="text-sm py-1">
                            {ollamaStatus === "checking"
                                ? "Checking Ollama..."
                                : ollamaStatus === "available"
                                    ? "✅ Ollama Connected"
                                    : "❌ Ollama Not Connected"}
                        </Badge>

                        <Badge variant={unsplashStatus === "configured" ? "default" : "destructive"} className="text-sm py-1">
                            {unsplashStatus === "checking"
                                ? "Checking Unsplash..."
                                : unsplashStatus === "configured"
                                    ? "✅ Unsplash Configured"
                                    : "❌ Unsplash Not Configured"}
                        </Badge>
                    </div>
                </div>

                <Tabs defaultValue="ollama">
                    <TabsList className="grid grid-cols-2 mb-8">
                        <TabsTrigger value="ollama">Ollama Setup</TabsTrigger>
                        <TabsTrigger value="unsplash">Unsplash Setup</TabsTrigger>
                    </TabsList>

                    <TabsContent value="ollama">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">🤖</span> Ollama Setup
                                </CardTitle>
                                <CardDescription>Ollama provides local AI models for generating website content</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium mb-2">1. Install Ollama</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">macOS</span>
                                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("brew install ollama")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">brew install ollama</pre>

                                            <div className="flex justify-between items-center mt-4 mb-2">
                                                <span className="font-mono text-sm">Linux</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard("curl -fsSL https://ollama.ai/install.sh | sh")}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                        curl -fsSL https://ollama.ai/install.sh | sh
                      </pre>

                                            <div className="flex justify-between items-center mt-4 mb-2">
                                                <span className="font-mono text-sm">Windows</span>
                                                <a href="https://ollama.ai/download/windows" target="_blank" rel="noopener noreferrer">
                                                    <Button variant="outline" size="sm">
                                                        Download <ExternalLink className="h-3 w-3 ml-1" />
                                                    </Button>
                                                </a>
                                            </div>
                                            <p className="text-sm text-gray-600">Download and install from the official website</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">2. Start Ollama Service</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">Command</span>
                                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("ollama serve")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">ollama serve</pre>
                                            <p className="text-sm text-gray-600 mt-2">
                                                This starts the Ollama service on http://localhost:11434
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">3. Install AI Models</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">Install Llama2 (recommended)</span>
                                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("ollama pull llama2")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">ollama pull llama2</pre>

                                            <div className="flex justify-between items-center mt-4 mb-2">
                                                <span className="font-mono text-sm">Check installed models</span>
                                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("ollama list")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">ollama list</pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">4. Test Ollama</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">Test command</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard('ollama run llama2 "Hello, world!"')}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                        ollama run llama2 "Hello, world!"
                      </pre>
                                            <p className="text-sm text-gray-600 mt-2">You should see a response from the AI model</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">5. Configure Environment Variables</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p className="text-sm mb-2">Add to your .env.local file:</p>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">.env.local</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        copyToClipboard("USE_OLLAMA=true\nOLLAMA_HOST=http://localhost:11434\nOLLAMA_MODEL=llama2")
                                                    }
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                        USE_OLLAMA=true OLLAMA_HOST=http://localhost:11434 OLLAMA_MODEL=llama2
                      </pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">6. Verify Setup</h3>
                                        <div className="flex items-center gap-2">
                                            {ollamaStatus === "available" ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : ollamaStatus === "unavailable" ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                                            )}
                                            <span>
                        {ollamaStatus === "available"
                            ? "Ollama is running and available!"
                            : ollamaStatus === "unavailable"
                                ? "Ollama is not running or not responding"
                                : "Checking Ollama status..."}
                      </span>
                                        </div>
                                        {ollamaStatus === "unavailable" && (
                                            <div className="mt-2 text-sm text-red-600">
                                                <p>Troubleshooting:</p>
                                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                                    <li>Make sure Ollama is installed</li>
                                                    <li>Run "ollama serve" in a terminal</li>
                                                    <li>Check if port 11434 is blocked by a firewall</li>
                                                    <li>Try restarting Ollama</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="unsplash">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">🖼️</span> Unsplash Setup
                                </CardTitle>
                                <CardDescription>Unsplash provides high-quality, royalty-free images for your websites</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium mb-2">1. Create Unsplash Developer Account</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <ol className="list-decimal pl-5 space-y-2 text-sm">
                                                <li>
                                                    Go to{" "}
                                                    <a
                                                        href="https://unsplash.com/developers"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Unsplash Developers
                                                    </a>
                                                </li>
                                                <li>Sign up or log in</li>
                                                <li>Click "New Application"</li>
                                                <li>
                                                    Fill out the application form:
                                                    <ul className="list-disc pl-5 mt-1">
                                                        <li>
                                                            <strong>Application name:</strong> "Website Generator"
                                                        </li>
                                                        <li>
                                                            <strong>Description:</strong> "AI-powered website generator with real images"
                                                        </li>
                                                        <li>
                                                            <strong>Website:</strong> Your domain or localhost
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>Accept the terms and create application</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">2. Get API Keys</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <ol className="list-decimal pl-5 space-y-2 text-sm">
                                                <li>
                                                    After creating the application, you'll see:
                                                    <ul className="list-disc pl-5 mt-1">
                                                        <li>
                                                            <strong>Access Key</strong> (public key)
                                                        </li>
                                                        <li>
                                                            <strong>Secret Key</strong> (private key - keep secure)
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>Copy the Access Key</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">3. Configure Environment Variables</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p className="text-sm mb-2">Add to your .env.local file:</p>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-sm">.env.local</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard("NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here")}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
                      </pre>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Replace "your_access_key_here" with your actual Unsplash Access Key
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">4. Restart Development Server</h3>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p className="text-sm">
                                                After adding environment variables, restart your Next.js development server:
                                            </p>
                                            <div className="flex justify-between items-center mt-2 mb-2">
                                                <span className="font-mono text-sm">Command</span>
                                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard("npm run dev")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">npm run dev</pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-2">5. Verify Setup</h3>
                                        <div className="flex items-center gap-2">
                                            {unsplashStatus === "configured" ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : unsplashStatus === "unconfigured" ? (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                                            )}
                                            <span>
                        {unsplashStatus === "configured"
                            ? "Unsplash API is configured and working!"
                            : unsplashStatus === "unconfigured"
                                ? "Unsplash API is not configured"
                                : "Checking Unsplash status..."}
                      </span>
                                        </div>
                                        {unsplashStatus === "unconfigured" && (
                                            <div className="mt-2 text-sm text-red-600">
                                                <p>Troubleshooting:</p>
                                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                                    <li>Make sure you've added the correct API key</li>
                                                    <li>Ensure the key is prefixed with NEXT_PUBLIC_</li>
                                                    <li>Check if you've reached the API rate limit (50 requests/hour)</li>
                                                    <li>Restart your development server</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Next Steps</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Generate a Website</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Now that you've set up Ollama and Unsplash, try generating a website!
                                </p>
                                <Button asChild>
                                    <a href="/ultimate-generator">Go to Website Generator</a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Run Tests</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Run comprehensive tests to verify your setup is working correctly.
                                </p>
                                <Button variant="outline" asChild>
                                    <a href="/test-setup">Run Setup Tests</a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="text-center text-sm text-gray-500">
                    <p>
                        Need more help? Check the{" "}
                        <a
                            href="https://ollama.ai/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Ollama Documentation
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://unsplash.com/documentation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Unsplash API Documentation
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
