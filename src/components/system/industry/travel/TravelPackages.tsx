"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users, Plane, Clock } from "lucide-react"

interface TravelPackage {
    id: string
    title: string
    destination: string
    duration: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    image: string
    highlights: string[]
    includes: string[]
    difficulty: "Easy" | "Moderate" | "Challenging"
    groupSize: string
    nextDeparture: string
    category: "Adventure" | "Cultural" | "Relaxation" | "Family" | "Luxury"
}

interface TravelPackagesProps {
    title?: string
    subtitle?: string
    packages?: TravelPackage[]
    showFilters?: boolean
}

export default function TravelPackages({
                                           title = "Featured Travel Packages",
                                           subtitle = "Discover amazing destinations with our carefully curated travel experiences",
                                           packages = [],
                                           showFilters = true,
                                       }: TravelPackagesProps) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedDifficulty, setSelectedDifficulty] = useState("all")

    const defaultPackages: TravelPackage[] = [
        {
            id: "1",
            title: "Tropical Paradise Getaway",
            destination: "Maldives",
            duration: "7 Days, 6 Nights",
            price: 2499,
            originalPrice: 2999,
            rating: 4.9,
            reviewCount: 127,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            highlights: ["Overwater Bungalows", "Snorkeling", "Spa Treatments", "Sunset Cruises"],
            includes: ["Flights", "Accommodation", "Meals", "Activities"],
            difficulty: "Easy",
            groupSize: "2-8 people",
            nextDeparture: "March 15, 2024",
            category: "Luxury",
        },
        {
            id: "2",
            title: "European Cultural Discovery",
            destination: "Italy & France",
            duration: "12 Days, 11 Nights",
            price: 3299,
            rating: 4.8,
            reviewCount: 89,
            image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
            highlights: ["Historic Cities", "Art Museums", "Wine Tasting", "Local Cuisine"],
            includes: ["Flights", "Hotels", "Guided Tours", "Some Meals"],
            difficulty: "Moderate",
            groupSize: "8-16 people",
            nextDeparture: "April 2, 2024",
            category: "Cultural",
        },
        {
            id: "3",
            title: "Mountain Adventure Trek",
            destination: "Nepal Himalayas",
            duration: "14 Days, 13 Nights",
            price: 1899,
            rating: 4.7,
            reviewCount: 156,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            highlights: ["Base Camp Trek", "Mountain Views", "Local Villages", "Cultural Exchange"],
            includes: ["Permits", "Guide", "Accommodation", "Meals"],
            difficulty: "Challenging",
            groupSize: "6-12 people",
            nextDeparture: "May 10, 2024",
            category: "Adventure",
        },
    ]

    const displayPackages = packages.length > 0 ? packages : defaultPackages

    const filteredPackages = displayPackages.filter((pkg) => {
        if (selectedCategory !== "all" && pkg.category !== selectedCategory) return false
        if (selectedDifficulty !== "all" && pkg.difficulty !== selectedDifficulty) return false
        return true
    })

    const categories = ["Adventure", "Cultural", "Relaxation", "Family", "Luxury"]
    const difficulties = ["Easy", "Moderate", "Challenging"]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {showFilters && (
                    <div className="mb-12 flex flex-wrap gap-4 justify-center">
                        <div className="flex gap-2">
                            <Button
                                variant={selectedCategory === "all" ? "default" : "outline"}
                                onClick={() => setSelectedCategory("all")}
                            >
                                All Categories
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={selectedDifficulty === "all" ? "default" : "outline"}
                                onClick={() => setSelectedDifficulty("all")}
                            >
                                All Levels
                            </Button>
                            {difficulties.map((difficulty) => (
                                <Button
                                    key={difficulty}
                                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                >
                                    {difficulty}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg) => (
                        <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-blue-600 text-white">{pkg.category}</Badge>
                                    <Badge variant="outline" className="bg-white">
                                        {pkg.difficulty}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <div className="flex items-center bg-white rounded-full px-2 py-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                                        <span className="text-xs text-gray-500 ml-1">({pkg.reviewCount})</span>
                                    </div>
                                </div>
                                {pkg.originalPrice && (
                                    <div className="absolute bottom-4 right-4 bg-red-600 text-white px-2 py-1 rounded">
                                        <span className="text-sm font-bold">Save ${pkg.originalPrice - pkg.price}</span>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{pkg.destination}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{pkg.duration}</span>
                                        </div>
                                        <div className="text-right">
                                            {pkg.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                                            )}
                                            <p className="text-2xl font-bold text-blue-600">${pkg.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.highlights.slice(0, 3).map((highlight, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {highlight}
                                            </Badge>
                                        ))}
                                        {pkg.highlights.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{pkg.highlights.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2" />
                                        {pkg.groupSize}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {pkg.nextDeparture}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.includes.map((item, index) => (
                                            <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                                                ✓ {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                        <Plane className="h-4 w-4 mr-2" />
                                        Book Now
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Learn More
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredPackages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No packages match your current filters.</p>
                        <Button
                            onClick={() => {
                                setSelectedCategory("all")
                                setSelectedDifficulty("all")
                            }}
                            className="mt-4"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
