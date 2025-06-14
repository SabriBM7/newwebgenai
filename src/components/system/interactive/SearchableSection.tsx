"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchableItem {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    image?: string
    [key: string]: any
}

interface SearchableSectionProps {
    title?: string
    subtitle?: string
    items: SearchableItem[]
    categories: string[]
    renderItem: (item: SearchableItem) => React.ReactNode
    backgroundColor?: string
    textColor?: string
    placeholder?: string
}

export default function SearchableSection({
                                              title = "Search & Filter",
                                              subtitle = "Find exactly what you're looking for",
                                              items,
                                              categories,
                                              renderItem,
                                              backgroundColor = "bg-white",
                                              textColor = "text-gray-900",
                                              placeholder = "Search...",
                                          }: SearchableSectionProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // Get all unique tags from items
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        items.forEach((item) => {
            item.tags.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags)
    }, [items])

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

            const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

            return matchesSearch && matchesCategory && matchesTags
        })
    }, [items, searchTerm, selectedCategory, selectedTags])

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedCategory("all")
        setSelectedTags([])
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    <p className={`text-lg ${textColor} opacity-80 max-w-2xl mx-auto`}>{subtitle}</p>
                </div>

                {/* Search and Filter Controls */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full md:w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {(searchTerm || selectedCategory !== "all" || selectedTags.length > 0) && (
                            <Button variant="outline" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {/* Tag Filters */}
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                className="cursor-pointer hover:bg-blue-100"
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {filteredItems.length} of {items.length} results
                    </p>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id}>{renderItem(item)}</div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
                        <Button variant="outline" onClick={clearFilters} className="mt-4">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
