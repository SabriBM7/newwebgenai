"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Camera, Heart, Share2, Calendar } from "lucide-react"

interface Destination {
    id: string
    name: string
    country: string
    image: string
    rating: number
    reviews: number
    price: number
    duration: string
    category: string
    highlights: string[]
    bestTime: string
    description: string
}

export function DestinationGallery(props: any) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [favorites, setFavorites] = useState<string[]>([])

    const destinations: Destination[] = props.destinations || [
        {
            id: "1",
            name: "Santorini",
            country: "Greece",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
            rating: 4.9,
            reviews: 2847,
            price: 1299,
            duration: "7 days",
            category: "beach",
            highlights: ["Sunset Views", "White Architecture", "Wine Tasting", "Volcanic Beaches"],
            bestTime: "Apr - Oct",
            description: "Experience the magic of Santorini with its iconic blue domes and stunning sunsets",
        },
        {
            id: "2",
            name: "Kyoto",
            country: "Japan",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
            rating: 4.8,
            reviews: 1923,
            price: 1899,
            duration: "10 days",
            category: "cultural",
            highlights: ["Ancient Temples", "Cherry Blossoms", "Traditional Gardens", "Tea Ceremony"],
            bestTime: "Mar - May",
            description: "Discover the cultural heart of Japan with ancient temples and traditional experiences",
        },
        {
            id: "3",
            name: "Patagonia",
            country: "Chile & Argentina",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
            rating: 4.7,
            reviews: 1456,
            price: 2299,
            duration: "14 days",
            category: "adventure",
            highlights: ["Glacier Trekking", "Wildlife Viewing", "Mountain Climbing", "Photography"],
            bestTime: "Nov - Mar",
            description: "Adventure through pristine wilderness and dramatic landscapes of Patagonia",
        },
        {
            id: "4",
            name: "Maldives",
            country: "Maldives",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            rating: 4.9,
            reviews: 3241,
            price: 3499,
            duration: "7 days",
            category: "luxury",
            highlights: ["Overwater Villas", "Coral Reefs", "Spa Treatments", "Private Beaches"],
            bestTime: "Nov - Apr",
            description: "Ultimate luxury escape with pristine beaches and world-class resorts",
        },
        {
            id: "5",
            name: "Machu Picchu",
            country: "Peru",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
            rating: 4.8,
            reviews: 2156,
            price: 1699,
            duration: "8 days",
            category: "cultural",
            highlights: ["Ancient Ruins", "Inca Trail", "Mountain Views", "Local Culture"],
            bestTime: "May - Sep",
            description: "Journey to the lost city of the Incas and experience ancient Peruvian culture",
        },
        {
            id: "6",
            name: "Safari Kenya",
            country: "Kenya",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
            rating: 4.7,
            reviews: 1834,
            price: 2899,
            duration: "12 days",
            category: "adventure",
            highlights: ["Big Five", "Great Migration", "Masai Culture", "Game Drives"],
            bestTime: "Jul - Oct",
            description: "Witness the incredible wildlife and natural beauty of the African savanna",
        },
    ]

    const categories = [
        { id: "all", label: "All Destinations" },
        { id: "beach", label: "Beach & Islands" },
        { id: "cultural", label: "Cultural" },
        { id: "adventure", label: "Adventure" },
        { id: "luxury", label: "Luxury" },
    ]

    const filteredDestinations =
        selectedCategory === "all" ? destinations : destinations.filter((dest) => dest.category === selectedCategory)

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Explore Amazing Destinations"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Discover breathtaking destinations around the world and plan your next adventure"}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.id)}
                            className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((destination) => (
                        <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <div className="relative">
                                <img
                                    src={destination.image || "/placeholder.svg"}
                                    alt={destination.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-blue-600">{destination.category}</Badge>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                        onClick={() => toggleFavorite(destination.id)}
                                    >
                                        <Heart
                                            className={`h-4 w-4 ${favorites.includes(destination.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                                        />
                                    </Button>
                                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                                        <Share2 className="h-4 w-4 text-gray-600" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="text-white font-bold text-xl drop-shadow-lg">{destination.name}</div>
                                    <div className="flex items-center text-white/90 text-sm">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {destination.country}
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(destination.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-2">
                      {destination.rating} ({destination.reviews})
                    </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {destination.duration}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-sm mb-2">Highlights:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {highlight}
                                            </Badge>
                                        ))}
                                        {destination.highlights.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{destination.highlights.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">${destination.price}</div>
                                        <div className="text-xs text-gray-500">per person</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-700">Best Time</div>
                                        <div className="text-xs text-gray-500">{destination.bestTime}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Details</Button>
                                    <Button variant="outline" size="sm" className="px-3">
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-12">
                        <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
                        <p className="text-gray-500">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </section>
    )
}
