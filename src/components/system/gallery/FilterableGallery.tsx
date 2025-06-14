"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, Filter } from "lucide-react"

interface GalleryItem {
    id: string
    src: string
    alt: string
    title: string
    description?: string
    category: string
    tags: string[]
    date: string
    featured?: boolean
}

interface FilterableGalleryProps {
    title?: string
    subtitle?: string
    items?: GalleryItem[]
    showSearch?: boolean
    showSort?: boolean
    defaultView?: "grid" | "list"
}

export default function FilterableGallery({
                                              title = "Filterable Gallery",
                                              subtitle = "Browse and filter our collection",
                                              items = [],
                                              showSearch = true,
                                              showSort = true,
                                              defaultView = "grid",
                                          }: FilterableGalleryProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<"date" | "title" | "category">("date")
    const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView)

    const defaultItems: GalleryItem[] = [
        {
            id: "1",
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            alt: "Project Alpha",
            title: "Project Alpha",
            description: "Revolutionary design concept for modern living spaces",
            category: "Design",
            tags: ["modern", "architecture", "residential"],
            date: "2024-03-15",
            featured: true,
        },
        {
            id: "2",
            src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            alt: "Tech Innovation",
            title: "Tech Innovation Hub",
            description: "State-of-the-art technology workspace design",
            category: "Technology",
            tags: ["workspace", "innovation", "tech"],
            date: "2024-03-10",
        },
        {
            id: "3",
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
            alt: "Brand Identity",
            title: "Brand Identity Project",
            description: "Complete brand redesign for startup company",
            category: "Branding",
            tags: ["branding", "logo", "identity"],
            date: "2024-03-08",
        },
        {
            id: "4",
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            alt: "Web Application",
            title: "Web Application UI",
            description: "User interface design for SaaS platform",
            category: "Web Design",
            tags: ["ui", "web", "saas"],
            date: "2024-03-05",
        },
    ]

    const displayItems = items.length > 0 ? items : defaultItems
    const categories = [...new Set(displayItems.map((item) => item.category))]
    const allTags = [...new Set(displayItems.flatMap((item) => item.tags))]

    const filteredAndSortedItems = useMemo(() => {
        const filtered = displayItems.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

            const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))

            return matchesSearch && matchesCategory && matchesTags
        })

        // Sort items
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title)
                case "category":
                    return a.category.localeCompare(b.category)
                case "date":
                default:
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
            }
        })

        return filtered
    }, [displayItems, searchTerm, selectedCategory, selectedTags, sortBy])

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {/* Filters and Controls */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        {showSearch && (
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search gallery..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        )}

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        {showSort && (
                            <div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "date" | "title" | "category")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="date">Sort by Date</option>
                                    <option value="title">Sort by Title</option>
                                    <option value="category">Sort by Category</option>
                                </select>
                            </div>
                        )}

                        {/* View Toggle */}
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="flex-1"
                            >
                                <Grid className="h-4 w-4 mr-2" />
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="flex-1"
                            >
                                <List className="h-4 w-4 mr-2" />
                                List
                            </Button>
                        </div>
                    </div>

                    {/* Tag Filters */}
                    <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter by Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleTag(tag)}
                                    className={`text-xs ${selectedTags.includes(tag) ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory !== "all" || selectedTags.length > 0 || searchTerm) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    {searchTerm && <Badge variant="secondary">Search: "{searchTerm}"</Badge>}
                                    {selectedCategory !== "all" && <Badge variant="secondary">Category: {selectedCategory}</Badge>}
                                    {selectedTags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            Tag: {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setSelectedCategory("all")
                                        setSelectedTags([])
                                    }}
                                >
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredAndSortedItems.length} of {displayItems.length} items
                    </p>
                </div>

                {/* Gallery Grid/List */}
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                    {filteredAndSortedItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                            {viewMode === "grid" ? (
                                <>
                                    <div className="relative">
                                        <img
                                            src={item.src || "/placeholder.svg"}
                                            alt={item.alt}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className="bg-blue-600">{item.category}</Badge>
                                            {item.featured && <Badge className="bg-orange-500">Featured</Badge>}
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        {item.description && <p className="text-gray-600 mb-4 text-sm">{item.description}</p>}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {item.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                                    </CardContent>
                                </>
                            ) : (
                                <CardContent className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={item.src || "/placeholder.svg"}
                                            alt={item.alt}
                                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                                <div className="flex gap-2">
                                                    <Badge className="bg-blue-600">{item.category}</Badge>
                                                    {item.featured && <Badge className="bg-orange-500">Featured</Badge>}
                                                </div>
                                            </div>
                                            {item.description && <p className="text-gray-600 mb-3">{item.description}</p>}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.tags.map((tag, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>

                {filteredAndSortedItems.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                    </div>
                )}
            </div>
        </section>
    )
}
