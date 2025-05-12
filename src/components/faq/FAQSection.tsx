"use client"

import { useState } from "react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    title?: string
    subtitle?: string
    faqs?: FAQItem[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    columns?: 1 | 2
    style?: "accordion" | "cards" | "simple"
    keywords?: string[]
}

export default function FAQSection({
                                       title = "Frequently Asked Questions",
                                       subtitle = "Find answers to common questions about our platform",
                                       faqs,
                                       backgroundColor = "#f9fafb",
                                       textColor = "#000000",
                                       accentColor = "#3b82f6",
                                       textAlignment = "center",
                                       columns = 1,
                                       style = "accordion",
                                       keywords = [],
                                   }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const defaultFAQs: FAQItem[] = [
        {
            question: "How does the AI website generator work?",
            answer:
                "Our AI website generator uses natural language processing to understand your requirements. Simply describe what you want, and our AI will create a custom website based on your specifications, industry, and preferences.",
        },
        {
            question: "Do I need coding knowledge to use this platform?",
            answer:
                "No, you don't need any coding knowledge. Our platform is designed to be user-friendly and accessible to everyone, regardless of technical expertise. The AI handles all the technical aspects for you.",
        },
        {
            question: "Can I customize the generated website?",
            answer:
                "Yes, you can fully customize the generated website. Our platform provides an intuitive editor that allows you to modify layouts, colors, fonts, and content without writing any code.",
        },
        {
            question: "How long does it take to create a website?",
            answer:
                "Most users can create a complete website in under 30 minutes. The AI generates the initial design in seconds, and you can then customize it to your liking.",
        },
        {
            question: "Can I export my website or host it elsewhere?",
            answer:
                "Yes, you can export your website as HTML/CSS files to host it anywhere you prefer. We also offer one-click deployment options to popular hosting platforms.",
        },
        {
            question: "What kind of websites can I create?",
            answer:
                "You can create various types of websites, including business websites, portfolios, e-commerce stores, blogs, landing pages, and more. Our AI adapts to different industries and purposes.",
        },
    ]

    const displayFAQs = faqs || defaultFAQs
    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div
                    className={cn(
                        "max-w-4xl mx-auto",
                        columns === 2 && style !== "accordion" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "",
                    )}
                >
                    {displayFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "mb-4",
                                style === "cards" && "bg-white rounded-lg shadow-sm p-6",
                                style === "simple" && "border-b pb-4",
                            )}
                        >
                            {style === "accordion" ? (
                                <div>
                                    <button
                                        className="flex justify-between items-center w-full text-left py-4 px-6 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={openIndex === index}
                                    >
                                        <h3 className="text-lg font-medium">{faq.question}</h3>
                                        {openIndex === index ? (
                                            <ChevronUp className="h-5 w-5 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 flex-shrink-0" />
                                        )}
                                    </button>
                                    {openIndex === index && (
                                        <div className="mt-2 px-6 pb-4">
                                            <p className="opacity-80">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                                    <p className="opacity-80">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
