"use client"

import type React from "react"

import { useState } from "react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Check, AlertCircle } from "lucide-react"

interface NewsletterSectionProps {
    title?: string
    subtitle?: string
    buttonText?: string
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    style?: "card" | "inline" | "split"
    backgroundImage?: string
    keywords?: string[]
}

export default function NewsletterSection({
                                              title = "Subscribe to Our Newsletter",
                                              subtitle = "Stay updated with the latest news, tips, and exclusive offers",
                                              buttonText = "Subscribe",
                                              backgroundColor = "#f9fafb",
                                              textColor = "#000000",
                                              accentColor = "#3b82f6",
                                              textAlignment = "center",
                                              style = "card",
                                              backgroundImage,
                                              keywords = [],
                                          }: NewsletterSectionProps) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setStatus("error")
            setMessage("Please enter your email address")
            return
        }

        setStatus("loading")

        // Simulate API call
        setTimeout(() => {
            setStatus("success")
            setMessage("Thank you for subscribing!")
            setEmail("")
        }, 1500)

        // In a real implementation, you would call your API here
        // try {
        //   const response = await fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        //   })
        //   const data = await response.json()
        //   if (response.ok) {
        //     setStatus('success')
        //     setMessage(data.message || 'Thank you for subscribing!')
        //     setEmail('')
        //   } else {
        //     setStatus('error')
        //     setMessage(data.message || 'An error occurred. Please try again.')
        //   }
        // } catch (error) {
        //   setStatus('error')
        //   setMessage('An error occurred. Please try again.')
        // }
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                {style === "card" && (
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                        <div className={cn("mb-6", textAlignmentClass)}>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
                            {subtitle && <p className="opacity-80">{subtitle}</p>}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1"
                                    disabled={status === "loading" || status === "success"}
                                />
                                <Button type="submit" disabled={status === "loading" || status === "success"}>
                                    {status === "loading" ? "Subscribing..." : buttonText}
                                </Button>
                            </div>

                            {status === "success" && (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check size={16} />
                                    <span>{message}</span>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertCircle size={16} />
                                    <span>{message}</span>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {style === "inline" && (
                    <div className={cn("max-w-3xl mx-auto", textAlignmentClass)}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
                        {subtitle && <p className="opacity-80 mb-6">{subtitle}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1"
                                    disabled={status === "loading" || status === "success"}
                                />
                                <Button type="submit" disabled={status === "loading" || status === "success"}>
                                    {status === "loading" ? "Subscribing..." : buttonText}
                                </Button>
                            </div>

                            {status === "success" && (
                                <div className="flex items-center justify-center gap-2 text-green-600">
                                    <Check size={16} />
                                    <span>{message}</span>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center justify-center gap-2 text-red-600">
                                    <AlertCircle size={16} />
                                    <span>{message}</span>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {style === "split" && (
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-8">
                                <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
                                {subtitle && <p className="opacity-80 mb-6">{subtitle}</p>}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-3">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={status === "loading" || status === "success"}
                                        />
                                        <Button type="submit" className="w-full" disabled={status === "loading" || status === "success"}>
                                            {status === "loading" ? "Subscribing..." : buttonText}
                                        </Button>
                                    </div>

                                    {status === "success" && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <Check size={16} />
                                            <span>{message}</span>
                                        </div>
                                    )}

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-red-600">
                                            <AlertCircle size={16} />
                                            <span>{message}</span>
                                        </div>
                                    )}
                                </form>
                            </div>

                            <div className="bg-gray-100 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">Why Subscribe?</h3>
                                    <ul className="text-left space-y-2">
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Get the latest updates and news</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Exclusive tips and tutorials</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>Special offers and discounts</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
