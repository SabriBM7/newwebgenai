"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

type Message = {
    role: "user" | "assistant"
    content: string
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm your AI website assistant. Tell me about the website you want to create. What's the purpose of your website? Who is your target audience?",
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        // Add user message
        const userMessage: Message = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                role: "assistant",
                content:
                    "Thanks for sharing that information! Based on what you've told me, I think we could create a modern, responsive website with the following sections: Home, About, Services, and Contact. Would you like me to generate a preview based on this structure?",
            }
            setMessages((prev) => [...prev, aiResponse])
            setIsLoading(false)
        }, 1500)

        // In a real implementation, you would call your AI service here
        // const response = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ messages: [...messages, userMessage] })
        // })
        // const data = await response.json()
        // setMessages(prev => [...prev, data.message])
        // setIsLoading(false)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`flex items-start space-x-2 max-w-[80%] ${
                                message.role === "user"
                                    ? "bg-purple-600 text-white rounded-l-lg rounded-tr-lg"
                                    : "bg-gray-200 text-gray-800 rounded-r-lg rounded-tl-lg"
                            } p-3`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>
                            <div>{message.content}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-800 rounded-r-lg rounded-tl-lg p-3 flex items-center space-x-2">
                            <Bot className="h-5 w-5" />
                            <div className="flex space-x-1">
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <div className="p-4 border-t">
                <div className="flex space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your website needs..."
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
