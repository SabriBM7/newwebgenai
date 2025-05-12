"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, Bot, User, FileText } from "lucide-react"

type Message = {
    role: "system" | "user" | "assistant"
    content: string
}

type SearchResult = {
    id: number
    content: string
    metadata: any
    similarity: number
}

export default function RagChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "system",
            content: "Hello! I'm your AI assistant. Ask me anything about the documents you've uploaded.",
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { toast } = useToast()

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!input.trim()) return

        const userMessage = { role: "user" as const, content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    threshold: 0.7,
                    limit: 5,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to get response")
            }

            const data = await response.json()

            // Make sure we're adding a properly formatted message
            if (data.message && typeof data.message === "object") {
                // If message is an object with role and content properties
                setMessages((prev) => [
                    ...prev,
                    {
                        role: data.message.role || "assistant",
                        content: data.message.content || "Sorry, I couldn't generate a response.",
                    },
                ])
            } else if (typeof data.message === "string") {
                // If message is just a string
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.message,
                    },
                ])
            } else {
                // Fallback
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: "Sorry, I couldn't generate a response.",
                    },
                ])
            }

            // Set search results
            setSearchResults(data.context || [])
        } catch (error) {
            console.error("Chat error:", error)
            toast({
                title: "Error",
                description: "Failed to get a response. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle>AI Assistant</CardTitle>
                    <CardDescription>Ask questions about your uploaded documents</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                    <div className="flex h-full">
                        <div className="flex-1 overflow-y-auto pr-4">
                            <div className="space-y-4">
                                {messages.slice(1).map((message, index) => (
                                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`flex items-start space-x-2 ${
                                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                            } p-3 rounded-lg max-w-[80%]`}
                                        >
                                            <div className="mt-0.5">
                                                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="whitespace-pre-wrap">{message.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {searchResults.length > 0 && (
                            <div className="w-1/3 border-l pl-4 overflow-y-auto">
                                <h3 className="font-medium mb-2">Reference Documents</h3>
                                <div className="space-y-3">
                                    {searchResults.map((result) => (
                                        <div key={result.id} className="p-2 border rounded-md text-sm">
                                            <div className="flex items-center text-xs text-muted-foreground mb-1">
                                                <FileText className="h-3 w-3 mr-1" />
                                                {result.metadata?.title || "Document"} ·
                                                <span className="ml-1">{Math.round(result.similarity * 100)}% match</span>
                                            </div>
                                            <p className="line-clamp-3">{result.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading || !input.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
