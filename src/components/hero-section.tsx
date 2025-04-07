"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare } from 'lucide-react'

export default function HeroSection() {
    const [typedText, setTypedText] = useState("")
    const fullText = "I need a professional website for my small business"
    const [cursorVisible, setCursorVisible] = useState(true)

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.substring(0, typedText.length + 1))
            }, 100)
            return () => clearTimeout(timeout)
        }
    }, [typedText])

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Create Websites with AI
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Transform your ideas into fully functional websites through a simple conversation. No coding required.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg">
                                <Link href="#try-now">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                <Link href="#demo">See Demo</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-4 shadow-lg">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <div className="text-sm font-medium">AI Website Assistant</div>
                            </div>
                            <div className="h-[300px] overflow-auto py-4">
                                <div className="mb-4 flex justify-end">
                                    <div className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                                        Hi! I want to create a website.
                                    </div>
                                </div>
                                <div className="mb-4 flex">
                                    <div className="rounded-lg bg-muted px-3 py-2 text-sm">
                                        Hello! I'd be happy to help you create a website. What kind of website are you looking for?
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-end">
                                    <div className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                                        {typedText}
                                        {cursorVisible ? "|" : ""}
                                    </div>
                                </div>
                                {typedText.length === fullText.length && (
                                    <div className="flex">
                                        <div className="rounded-lg bg-muted px-3 py-2 text-sm">
                                            Great! I'll help you create a professional small business website. Let me suggest some templates
                                            based on your needs...
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 border-t pt-2">
                                <div className="relative flex-1">
                                    <input
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        placeholder="Type your message..."
                                        disabled
                                    />
                                </div>
                                <Button size="sm" disabled>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}