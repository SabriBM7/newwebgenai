"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Download, Share2, Heart } from "lucide-react"

interface GalleryItem {
    id: string
    src: string
    alt: string
    title?: string
    description?: string
    category?: string
    tags?: string[]
    height?: number
}

interface MasonryGalleryProps {
    title?: string
    subtitle?: string
    items?: GalleryItem[]
    columns?: number
    showCategories?: boolean
    categories?: string[]
}

export default function MasonryGallery({
                                           title = "Gallery",
                                           subtitle = "Explore our collection",
                                           items = [],
                                           columns = 3,
                                           showCategories = true,
                                           categories = [],
                                       }: MasonryGalleryProps) {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [likedItems, setLikedItems] = useState<string[]>([])

    const defaultItems: GalleryItem[] = [
        {
            id: "1",
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
            alt: "Beautiful landscape",
            title: "Mountain Vista",
            description: "Breathtaking mountain landscape at sunset",
            category: "Nature",
            tags: ["mountains", "sunset", "landscape"],
            height: 300,
        },
        {
            id: "2",
            src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
            alt: "Modern architecture",
            title: "Urban Design",
            description: "Contemporary architectural masterpiece",
            category: "Architecture",
            tags: ["building", "modern", "design"],
            height: 250,
        },
        {
            id: "3",
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
            alt: "Abstract art",
            title: "Digital Creation",
            description: "Vibrant digital art composition",
            category: "Art",
            tags: ["digital", "abstract", "colorful"],
            height: 350,
        },
        {
            id: "4",
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            alt: "Technology concept",
            title: "Innovation Hub",
            description: "Cutting-edge technology workspace",
            category: "Technology",
            tags: ["tech", "innovation", "workspace"],
            height: 200,
        },
        {
            id: "5",
            src: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=550&fit=crop",
            alt: "City skyline",
            title: "City Lights",
            description: "Stunning city skyline at night",
            category: "Architecture",
            tags: ["city", "night", "skyline"],
            height: 400,
        },
        {
            id: "6",
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=350&fit=crop",
            alt: "Natural beauty",
            title: "Forest Path",
            description: "Peaceful forest trail in autumn",
            category: "Nature",
            tags: ["forest", "autumn", "path"],
            height: 280,
        },
    ]

    const displayItems = items.length > 0 ? items : defaultItems
    const defaultCategories = [...new Set(displayItems.map((item) => item.category).filter(Boolean))]
    const displayCategories = categories.length > 0 ? categories : defaultCategories

    const filteredItems =
        selectedCategory === "all" ? displayItems : displayItems.filter((item) => item.category === selectedCategory)

    const toggleLike = (itemId: string) => {
        setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
    }

    const getColumnClasses = () => {
        switch (columns) {
            case 2:
                return "columns-2"
            case 4:
                return "columns-4"
            case 5:
                return "columns-5"
            default:
                return "columns-3"
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {/* Category Filters */}
                {showCategories && displayCategories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button
                            variant={selectedCategory === "all" ? "default" : "outline"}
                            onClick={() => setSelectedCategory("all")}
                            className={selectedCategory === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            All Categories
                        </Button>
                        {displayCategories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                )}

                {/* Masonry Grid */}
                <div className={`${getColumnClasses()} gap-6 space-y-6`}>
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="break-inside-avoid group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="relative">
                                <img
                                    src={item.src || "/placeholder.svg"}
                                    alt={item.alt}
                                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    style={{ height: item.height ? `${item.height}px` : "auto" }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                                            <ZoomIn className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 hover:bg-white"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleLike(item.id)
                                            }}
                                        >
                                            <Heart className={`h-4 w-4 ${likedItems.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                {item.category && <Badge className="absolute top-3 left-3 bg-blue-600">{item.category}</Badge>}
                            </div>

                            {/* Content */}
                            {(item.title || item.description) && (
                                <div className="p-4">
                                    {item.title && <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>}
                                    {item.description && <p className="text-sm text-gray-600 mb-3">{item.description}</p>}
                                    {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl max-h-full">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                                onClick={() => setSelectedItem(null)}
                            >
                                <X className="h-6 w-6" />
                            </Button>

                            <img
                                src={selectedItem.src || "/placeholder.svg"}
                                alt={selectedItem.alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                            />

                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        {selectedItem.title && <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>}
                                        {selectedItem.description && <p className="text-gray-200 mb-3">{selectedItem.description}</p>}
                                        {selectedItem.tags && (
                                            <div className="flex flex-wrap gap-1">
                                                {selectedItem.tags.map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 ml-4">
                                        <Button size="sm" variant="secondary">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="secondary">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="secondary" onClick={() => toggleLike(selectedItem.id)}>
                                            <Heart
                                                className={`h-4 w-4 ${likedItems.includes(selectedItem.id) ? "fill-red-500 text-red-500" : ""}`}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
