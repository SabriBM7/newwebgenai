"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function DebugPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [result, setResult] = useState<any>(null)

    const testOpenAI = async () => {
        setStatus("loading")
        try {
            const response = await fetch("/api/debug-openai")
            const data = await response.json()
            setResult(data)
            setStatus(data.success ? "success" : "error")
        } catch (error) {
            console.error("Error testing OpenAI:", error)
            setResult({ error: error instanceof Error ? error.message : "Unknown error" })
            setStatus("error")
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>OpenAI API Test</CardTitle>
                    <CardDescription>Test if the OpenAI API is working correctly</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">
                            This will test if your OpenAI API key is configured correctly and if the API is accessible.
                        </p>
                        <Button onClick={testOpenAI} disabled={status === "loading"}>
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                "Test OpenAI API"
                            )}
                        </Button>
                    </div>

                    {status !== "idle" && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">
                                Status:{" "}
                                <span
                                    className={
                                        status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-600"
                                    }
                                >
                  {status === "success" ? "Success" : status === "error" ? "Error" : "Loading..."}
                </span>
                            </h3>
                            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                    If the test fails, check your OpenAI API key in your environment variables.
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>Check if required environment variables are set</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <div
                                className={`w-4 h-4 rounded-full mr-2 ${
                                    process.env.NEXT_PUBLIC_OPENAI_API_KEY ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></div>
                            <span>NEXT_PUBLIC_OPENAI_API_KEY: </span>
                            <span className="ml-2 font-mono">{process.env.NEXT_PUBLIC_OPENAI_API_KEY ? "Set" : "Not set"}</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                    Make sure all required environment variables are set in your .env.local file or deployment platform.
                </CardFooter>
            </Card>
        </div>
    )
}
