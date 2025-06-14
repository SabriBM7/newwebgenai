"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShowcaseItem {
    id: string
    title: string
    type: string
    category: string
    image: string
    description: string
    date?: string
    time?: string
    location?: string
    duration?: string
    artist?: string
    featured?: boolean
}

interface ShowcaseGalleryProps {
    title?: string
    description?: string
    items?: ShowcaseItem[]
    categories?: string[]
    onItemClick?: (item: ShowcaseItem) => void
}

export function ShowcaseGallery({
                                    title = "Featured Showcases",
                                    description = "Explore our curated collection of arts and entertainment",
                                    items = defaultItems,
                                    categories = ["All", "Art", "Music", "Theater", "Film"],
                                    onItemClick,
                                }: ShowcaseGalleryProps) {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredItems =
        activeCategory === "All"
            ? items
            : items.filter((item) => item.category === activeCategory || item.type === activeCategory.toLowerCase())

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <Tabs defaultValue="All" className="mb-8">
                    <TabsList className="flex justify-center mb-8 flex-wrap">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                onClick={() => setActiveCategory(category)}
                                className="px-4 py-2"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                                item.featured ? "border-2 border-blue-500" : ""
                            }`}
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            <div className="relative h-60">
                                <img
                                    src={item.image || "/placeholder.svg?height=400&width=600&query=art+gallery"}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                {item.featured && <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>}
                                <Badge className="absolute top-2 left-2">{item.category}</Badge>
                            </div>
                            <CardContent className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                <div className="space-y-2 text-sm text-gray-500 mb-4">
                                    {item.date && (
                                        <div>
                                            <span className="font-medium">Date:</span> {item.date}
                                        </div>
                                    )}
                                    {item.time && (
                                        <div>
                                            <span className="font-medium">Time:</span> {item.time}
                                        </div>
                                    )}
                                    {item.location && (
                                        <div>
                                            <span className="font-medium">Location:</span> {item.location}
                                        </div>
                                    )}
                                    {item.artist && (
                                        <div>
                                            <span className="font-medium">Artist:</span> {item.artist}
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full">View Details</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

const defaultItems: ShowcaseItem[] = [
    {
        id: "1",
        title: "Modern Art Exhibition",
        type: "art",
        category: "Art",
        image: "/placeholder.svg?height=400&width=600",
        description: "A curated collection of contemporary artworks from emerging artists around the world.",
        date: "June 15-30, 2023",
        location: "Downtown Gallery",
        artist: "Various Artists",
        featured: true,
    },
    {
        id: "2",
        title: "Symphony Orchestra",
        type: "music",
        category: "Music",
        image: "/placeholder.svg?height=400&width=600",
        description: "An evening of classical masterpieces performed by the city's renowned symphony orchestra.",
        date: "July 8, 2023",
        time: "7:30 PM",
        location: "Grand Concert Hall",
        duration: "2 hours",
        featured: false,
    },
    {
        id: "3",
        title: "Shakespeare in the Park",
        type: "theater",
        category: "Theater",
        image: "/placeholder.svg?height=400&width=600",
        description: "A magical outdoor performance of Shakespeare's A Midsummer Night's Dream.",
        date: "August 5-20, 2023",
        time: "8:00 PM",
        location: "Central Park Amphitheater",
        duration: "2.5 hours",
        featured: false,
    },
    {
        id: "4",
        title: "Independent Film Festival",
        type: "film",
        category: "Film",
        image: "/placeholder.svg?height=400&width=600",
        description: "Showcasing groundbreaking independent films from directors around the globe.",
        date: "September 10-17, 2023",
        location: "Cinema Arts Center",
        featured: true,
    },
    {
        id: "5",
        title: "Jazz in the Garden",
        type: "music",
        category: "Music",
        image: "/placeholder.svg?height=400&width=600",
        description: "Enjoy smooth jazz melodies in the beautiful botanical garden setting.",
        date: "July 22, 2023",
        time: "6:00 PM",
        location: "Botanical Gardens",
        duration: "3 hours",
        featured: false,
    },
    {
        id: "6",
        title: "Digital Art Showcase",
        type: "art",
        category: "Art",
        image: "/placeholder.svg?height=400&width=600",
        description: "Exploring the intersection of technology and creativity through digital artworks.",
        date: "October 5-15, 2023",
        location: "Tech Arts Center",
        artist: "Various Digital Artists",
        featured: false,
    },
]
