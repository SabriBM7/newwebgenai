"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PortfolioItem {
    id: string
    title: string
    description: string
    category: string
    imageUrl: string
    tags?: string[]
    client?: string
    date?: string
    link?: string
}

interface PortfolioSectionProps {
    title?: string
    subtitle?: string
    description?: string
    items: PortfolioItem[]
    categories?: string[]
    layout?: "grid" | "masonry" | "carousel"
    columns?: 2 | 3 | 4
    theme?: {
        primaryColor?: string
        secondaryColor?: string
        backgroundColor?: string
        textColor?: string
    }
}

export function PortfolioSection({
                                     title = "Our Portfolio",
                                     subtitle = "Recent Work",
                                     description = "Explore our latest projects and see the quality of our work.",
                                     items = [],
                                     categories = [],
                                     layout = "grid",
                                     columns = 3,
                                     theme = {},
                                 }: PortfolioSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

    // Extract unique categories if not provided
    const uniqueCategories =
        categories.length > 0 ? categories : ["all", ...Array.from(new Set(items.map((item) => item.category)))]

    // Filter items by selected category
    const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    {subtitle && (
                        <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: theme.primaryColor }}>
                            {subtitle}
                        </p>
                    )}
                    {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                    {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
                </div>

                {/* Category Filter */}
                {uniqueCategories.length > 1 && (
                    <Tabs defaultValue="all" className="mb-8 flex justify-center">
                        <TabsList className="bg-gray-100">
                            {uniqueCategories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="capitalize"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Portfolio Grid */}
                <div
                    className={cn(
                        "grid gap-6",
                        columns === 2
                            ? "grid-cols-1 md:grid-cols-2"
                            : columns === 3
                                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                    )}
                >
                    {filteredItems.map((item) => (
                        <Dialog key={item.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 relative"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={item.imageUrl || "/placeholder.svg"}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                                        <div className="p-4 text-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            <p className="text-white text-sm mt-1">{item.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-3xl">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="rounded-md overflow-hidden">
                                        <img
                                            src={item.imageUrl || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>

                                        <div className="space-y-3">
                                            {item.client && (
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Client:</span>
                                                    <span className="text-gray-600">{item.client}</span>
                                                </div>
                                            )}
                                            {item.date && (
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Date:</span>
                                                    <span className="text-gray-600">{item.date}</span>
                                                </div>
                                            )}
                                            {item.category && (
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Category:</span>
                                                    <span className="text-gray-600 capitalize">{item.category}</span>
                                                </div>
                                            )}
                                        </div>

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="mt-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag, i) => (
                                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                              {tag}
                            </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {item.link && (
                                            <div className="mt-6">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 rounded-md text-white"
                                                    style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                                >
                                                    View Project
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 ml-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PortfolioSection
