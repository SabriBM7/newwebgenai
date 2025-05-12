"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUp, Download, Copy, Code, Eye } from "lucide-react"
import WebsiteRenderer from "@/components/website-renderer"

type Message = {
    role: "user" | "assistant"
    content: string
}

type GeneratedWebsite = {
    components: any[]
    json: string
}

export default function AIChatGenerator() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi! I'm your AI landing page assistant. Describe the website you want to create, and I'll generate it for you. What kind of business or product is it for?",
        },
    ])
    const [input, setInput] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<GeneratedWebsite | null>(null)
    const [activeTab, setActiveTab] = useState<"preview" | "json">("preview")

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!input.trim() || isGenerating) return

        const userMessage = input.trim()
        setInput("")

        // Add user message to chat
        setMessages((prev) => [...prev, { role: "user", content: userMessage }])

        // Show typing indicator
        setIsGenerating(true)

        try {
            // Add a small delay to show the typing indicator
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Add AI thinking message
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I'm analyzing your request and generating a landing page...",
                },
            ])

            // Call API to generate website
            const response = await fetch("/api/generate-ai-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: userMessage,
                    conversation: messages,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate website")
            }

            const data = await response.json()

            // Update messages with AI response
            setMessages((prev) => {
                // Remove the "thinking" message
                const newMessages = [...prev]
                newMessages.pop()

                return [
                    ...newMessages,
                    {
                        role: "assistant",
                        content:
                            "I've created a landing page based on your description. You can view the preview below or see the JSON structure. Would you like to make any changes?",
                    },
                ]
            })

            // Set generated website
            setGeneratedWebsite({
                components: data.components,
                json: JSON.stringify(data, null, 2),
            })
        } catch (error) {
            console.error("Error generating website:", error)

            // Update messages with error
            setMessages((prev) => {
                // Remove the "thinking" message
                const newMessages = [...prev]
                newMessages.pop()

                return [
                    ...newMessages,
                    {
                        role: "assistant",
                        content: "Sorry, I encountered an error while generating your website. Please try again.",
                    },
                ]
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const copyToClipboard = () => {
        if (generatedWebsite) {
            navigator.clipboard.writeText(generatedWebsite.json)
            alert("JSON copied to clipboard!")
        }
    }

    const downloadJSON = () => {
        if (generatedWebsite) {
            const blob = new Blob([generatedWebsite.json], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "landing-page.json"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">AI Landing Page Generator</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chat Section */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="h-[500px] overflow-y-auto p-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                                    <div
                                        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                                            message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-white"
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                            <div className="relative">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your business or product..."
                    className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                />
                                <button
                                    type="submit"
                                    disabled={isGenerating || !input.trim()}
                                    className="absolute right-2 bottom-2 p-2 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <ArrowUp className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="flex border-b border-gray-800">
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`flex-1 py-3 px-4 ${
                                    activeTab === "preview" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300"
                                }`}
                            >
                                <Eye className="inline-block w-4 h-4 mr-2" />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab("json")}
                                className={`flex-1 py-3 px-4 ${
                                    activeTab === "json" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300"
                                }`}
                            >
                                <Code className="inline-block w-4 h-4 mr-2" />
                                JSON
                            </button>
                        </div>

                        <div className="h-[500px] overflow-auto">
                            {generatedWebsite ? (
                                activeTab === "preview" ? (
                                    <div className="bg-white">
                                        <WebsiteRenderer components={generatedWebsite.components} />
                                    </div>
                                ) : (
                                    <div className="relative">
                    <pre className="p-4 text-green-400 bg-gray-950 overflow-auto h-[500px] text-sm">
                      {generatedWebsite.json}
                    </pre>
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-2 bg-gray-800 rounded hover:bg-gray-700"
                                                title="Copy to clipboard"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={downloadJSON}
                                                className="p-2 bg-gray-800 rounded hover:bg-gray-700"
                                                title="Download JSON"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <p>Your generated landing page will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
