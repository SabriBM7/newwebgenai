"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, Sparkles, ArrowRight } from "lucide-react"
import WebsiteRenderer from "@/components/website-renderer"

type Message = {
    role: "user" | "assistant"
    content: string
}

type WebsiteRequirements = {
    industry?: string
    purpose?: string
    targetAudience?: string
    style?: string
    features?: string[]
    additionalInfo?: string
}

export default function IntegratedChat() {
    const { toast } = useToast()
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm your website generation assistant. Tell me about the website you want to create. What industry is it for? What's the purpose of the website? Who is the target audience?",
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [requirements, setRequirements] = useState<WebsiteRequirements>({})
    const [canGenerateWebsite, setCanGenerateWebsite] = useState(false)
    const [isGeneratingWebsite, setIsGeneratingWebsite] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [showChat, setShowChat] = useState(false)
    const [initialPrompt, setInitialPrompt] = useState("")

    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Extract requirements from messages
    useEffect(() => {
        const extractRequirements = () => {
            const newRequirements: WebsiteRequirements = { ...requirements }

            // Simple extraction logic - can be enhanced
            messages.forEach((msg) => {
                if (msg.role === "user") {
                    const content = msg.content.toLowerCase()

                    // Industry detection
                    if (content.includes("industry") || content.includes("business")) {
                        const industries = [
                            "technology",
                            "healthcare",
                            "education",
                            "finance",
                            "retail",
                            "restaurant",
                            "food",
                            "real estate",
                            "travel",
                            "fitness",
                            "beauty",
                            "fashion",
                            "legal",
                            "consulting",
                        ]

                        for (const industry of industries) {
                            if (content.includes(industry)) {
                                newRequirements.industry = industry
                                break
                            }
                        }
                    }

                    // Purpose detection
                    if (content.includes("purpose") || content.includes("goal")) {
                        if (content.includes("sell") || content.includes("shop") || content.includes("store")) {
                            newRequirements.purpose = "e-commerce"
                        } else if (content.includes("blog") || content.includes("content")) {
                            newRequirements.purpose = "content/blog"
                        } else if (content.includes("portfolio") || content.includes("showcase")) {
                            newRequirements.purpose = "portfolio"
                        } else if (content.includes("lead") || content.includes("contact")) {
                            newRequirements.purpose = "lead generation"
                        }
                    }

                    // Target audience detection
                    if (content.includes("audience") || content.includes("customer") || content.includes("client")) {
                        if (content.includes("business") || content.includes("b2b")) {
                            newRequirements.targetAudience = "business"
                        } else if (content.includes("consumer") || content.includes("b2c")) {
                            newRequirements.targetAudience = "consumer"
                        }

                        // Age groups
                        if (content.includes("young") || content.includes("youth") || content.includes("teen")) {
                            newRequirements.targetAudience = (newRequirements.targetAudience || "") + " young"
                        } else if (content.includes("adult") || content.includes("professional")) {
                            newRequirements.targetAudience = (newRequirements.targetAudience || "") + " adult"
                        } else if (content.includes("senior") || content.includes("elder")) {
                            newRequirements.targetAudience = (newRequirements.targetAudience || "") + " senior"
                        }
                    }

                    // Style detection
                    if (content.includes("style") || content.includes("design") || content.includes("look")) {
                        if (content.includes("modern") || content.includes("sleek")) {
                            newRequirements.style = "modern"
                        } else if (content.includes("minimal") || content.includes("clean")) {
                            newRequirements.style = "minimalist"
                        } else if (content.includes("bold") || content.includes("vibrant")) {
                            newRequirements.style = "bold"
                        } else if (content.includes("professional") || content.includes("corporate")) {
                            newRequirements.style = "professional"
                        } else if (content.includes("playful") || content.includes("fun")) {
                            newRequirements.style = "playful"
                        }
                    }

                    // Features detection
                    const featureKeywords = [
                        "contact form",
                        "gallery",
                        "blog",
                        "shop",
                        "booking",
                        "testimonials",
                        "about",
                        "faq",
                        "pricing",
                        "portfolio",
                    ]

                    const detectedFeatures = featureKeywords.filter((feature) => content.includes(feature))

                    if (detectedFeatures.length > 0) {
                        newRequirements.features = [...(newRequirements.features || []), ...detectedFeatures]
                        // Remove duplicates
                        newRequirements.features = [...new Set(newRequirements.features)]
                    }
                }
            })

            setRequirements(newRequirements)

            // Check if we have enough information to generate a website
            const hasEnoughInfo = newRequirements.industry && newRequirements.purpose && newRequirements.targetAudience

            setCanGenerateWebsite(!!hasEnoughInfo)
        }

        extractRequirements()
    }, [messages])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/ollama-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model: "llama3:8b", // You can change this to any model you have in Ollama
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to get response from Ollama")
            }

            const data = await response.json()

            // Handle the response properly
            if (data.message && typeof data.message === "object" && "content" in data.message) {
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
        } catch (error) {
            console.error("Error sending message:", error)
            toast({
                title: "Error",
                description: "Failed to communicate with the AI assistant. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGenerateWebsite = async () => {
        setIsGeneratingWebsite(true)

        try {
            const response = await fetch("/api/ollama-generate-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requirements,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate website")
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            setGeneratedWebsite(data.website || data.rawResponse)

            // Add a message about the generated website
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I've generated a website structure based on your requirements. You can now view and customize it!",
                },
            ])

            toast({
                title: "Success",
                description: "Website structure generated successfully!",
            })
        } catch (error) {
            console.error("Error generating website:", error)
            toast({
                title: "Error",
                description: "Failed to generate website structure. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsGeneratingWebsite(false)
        }
    }

    const handleInitialPrompt = () => {
        if (!initialPrompt.trim()) return

        setInput(initialPrompt)
        setShowChat(true)

        // Small delay to ensure the chat is visible before sending
        setTimeout(() => {
            handleSendMessage()
        }, 100)
    }

    const startChat = (preset?: string) => {
        if (preset) {
            setInitialPrompt(preset)
            setInput(preset)
        }
        setShowChat(true)

        // If preset is provided, send it automatically
        if (preset) {
            setTimeout(() => {
                handleSendMessage()
            }, 100)
        }
    }

    if (generatedWebsite) {
        return (
            <div>
                <div className="bg-purple-950 p-4 sticky top-0 z-50 flex justify-between items-center">
                    <button
                        onClick={() => setGeneratedWebsite(null)}
                        className="px-4 py-2 rounded bg-purple-800 hover:bg-purple-700 text-white"
                    >
                        ← Back to Chat
                    </button>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded bg-purple-800 hover:bg-purple-700 text-white">Edit</button>
                        <button className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white">Publish</button>
                    </div>
                </div>
                <WebsiteRenderer components={generatedWebsite.components} />
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {!showChat ? (
                <div className="text-center">
                    <div className="relative max-w-2xl mx-auto mb-6">
                        <input
                            type="text"
                            value={initialPrompt}
                            onChange={(e) => setInitialPrompt(e.target.value)}
                            placeholder="What kind of website do you want to create?"
                            className="w-full px-6 py-4 rounded-full bg-purple-950/50 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleInitialPrompt()
                                }
                            }}
                        />
                        <button
                            onClick={handleInitialPrompt}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors"
                        >
                            <ArrowRight className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => startChat("Landing Page for a SaaS product")}
                            className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                        >
                            Landing Page
                        </button>
                        <button
                            onClick={() => startChat("E-commerce store for fashion products")}
                            className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                        >
                            E-commerce
                        </button>
                        <button
                            onClick={() => startChat("Portfolio website for a photographer")}
                            className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                        >
                            Portfolio
                        </button>
                        <button
                            onClick={() => startChat("Blog website for a tech company")}
                            className="px-6 py-3 rounded-full bg-purple-800/50 hover:bg-purple-700/50 border border-purple-700 text-white"
                        >
                            Blog
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="flex flex-col h-[500px]">
                        <CardHeader>
                            <CardTitle>Website Generator Chat</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-[80%] rounded-lg p-4 ${
                                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <div className="flex w-full gap-2">
                                <Input
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSendMessage()
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </div>

                            {canGenerateWebsite && (
                                <Button
                                    onClick={handleGenerateWebsite}
                                    disabled={isGeneratingWebsite}
                                    className="w-full"
                                    variant="outline"
                                >
                                    {isGeneratingWebsite ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating Website...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate Website Preview
                                        </>
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col h-[500px]">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
                            <p className="text-center text-gray-500">
                                Your website preview will appear here as you chat with the AI assistant.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
