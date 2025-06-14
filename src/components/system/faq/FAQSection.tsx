"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FAQ {
    id: string
    question: string
    answer: string
    category?: string
}

interface FAQSectionProps {
    title?: string
    subtitle?: string
    faqs?: FAQ[]
    showSearch?: boolean
    showCategories?: boolean
    categories?: string[]
}

export default function FAQSection({
                                       title = "Frequently Asked Questions",
                                       subtitle = "Find answers to common questions about our services",
                                       faqs = [],
                                       showSearch = true,
                                       showCategories = false,
                                       categories = [],
                                   }: FAQSectionProps) {
    const [openItems, setOpenItems] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const defaultFAQs: FAQ[] = [
        {
            id: "1",
            question: "What services do you offer?",
            answer:
                "We offer a comprehensive range of services including consulting, development, design, and ongoing support. Our team works closely with clients to understand their unique needs and deliver customized solutions.",
            category: "Services",
        },
        {
            id: "2",
            question: "How long does a typical project take?",
            answer:
                "Project timelines vary depending on scope and complexity. Simple projects may take 2-4 weeks, while more complex solutions can take 3-6 months. We provide detailed timelines during our initial consultation.",
            category: "Timeline",
        },
        {
            id: "3",
            question: "What is your pricing structure?",
            answer:
                "Our pricing is project-based and depends on the specific requirements, timeline, and complexity. We offer competitive rates and provide detailed quotes after understanding your needs. Contact us for a personalized estimate.",
            category: "Pricing",
        },
        {
            id: "4",
            question: "Do you provide ongoing support?",
            answer:
                "Yes, we offer various support packages including maintenance, updates, and technical assistance. Our support team is available to help you get the most out of your investment.",
            category: "Support",
        },
        {
            id: "5",
            question: "Can you work with our existing systems?",
            answer:
                "We have experience integrating with a wide variety of existing systems and platforms. We'll assess your current setup and recommend the best approach for seamless integration.",
            category: "Integration",
        },
        {
            id: "6",
            question: "What makes you different from competitors?",
            answer:
                "Our focus on personalized service, technical expertise, and long-term partnerships sets us apart. We don't just deliver projects – we build relationships and ensure your continued success.",
            category: "Company",
        },
    ]

    const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs
    const defaultCategories = [...new Set(displayFAQs.map((faq) => faq.category).filter(Boolean))]
    const displayCategories = categories.length > 0 ? categories : defaultCategories

    const filteredFAQs = displayFAQs.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleItem = (id: string) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Search and Filters */}
                    <div className="mb-8 space-y-4">
                        {showSearch && (
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search FAQs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        )}

                        {showCategories && displayCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant={selectedCategory === "all" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory("all")}
                                    className={selectedCategory === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
                                >
                                    All Categories
                                </Button>
                                {displayCategories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category)}
                                        className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {filteredFAQs.map((faq) => (
                            <Card key={faq.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <button
                                        onClick={() => toggleItem(faq.id)}
                                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{faq.question}</h3>
                                            {faq.category && <span className="text-sm text-blue-600 font-medium">{faq.category}</span>}
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            {openItems.includes(faq.id) ? (
                                                <ChevronUp className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-500" />
                                            )}
                                        </div>
                                    </button>

                                    {openItems.includes(faq.id) && (
                                        <div className="px-6 pb-6">
                                            <div className="border-t border-gray-100 pt-4">
                                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <HelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs found</h3>
                            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
                        <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Our team is here to help.</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
