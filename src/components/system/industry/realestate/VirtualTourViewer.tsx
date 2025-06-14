"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Play,
    Pause,
    RotateCcw,
    ZoomIn,
    ZoomOut,
    Maximize,
    Info,
    MapPin,
    Bed,
    Bath,
    Square,
    Car,
    Heart,
    Share,
    Calendar,
} from "lucide-react"

interface Room {
    id: string
    name: string
    image: string
    description: string
    features: string[]
}

interface Property {
    id: string
    title: string
    address: string
    price: number
    bedrooms: number
    bathrooms: number
    sqft: number
    parking: number
    rooms: Room[]
    features: string[]
    images: string[]
}

interface VirtualTourViewerProps {
    title?: string
    subtitle?: string
    property?: Property
    autoPlay?: boolean
}

export default function VirtualTourViewer({
                                              title = "Virtual Property Tour",
                                              subtitle = "Explore properties from the comfort of your home",
                                              property,
                                              autoPlay = false,
                                          }: VirtualTourViewerProps) {
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showInfo, setShowInfo] = useState(true)
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)

    const defaultProperty: Property = {
        id: "1",
        title: "Modern Luxury Home",
        address: "123 Oak Street, Beverly Hills, CA 90210",
        price: 2500000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        parking: 2,
        features: ["Pool", "Garden", "Fireplace", "Walk-in Closet", "Gourmet Kitchen"],
        images: [
            "/placeholder.svg?height=600&width=800&text=Living+Room",
            "/placeholder.svg?height=600&width=800&text=Kitchen",
            "/placeholder.svg?height=600&width=800&text=Master+Bedroom",
            "/placeholder.svg?height=600&width=800&text=Bathroom",
        ],
        rooms: [
            {
                id: "1",
                name: "Living Room",
                image: "/placeholder.svg?height=600&width=800&text=Living+Room",
                description: "Spacious living room with high ceilings and natural light",
                features: ["Fireplace", "Hardwood Floors", "Large Windows", "Built-in Shelving"],
            },
            {
                id: "2",
                name: "Kitchen",
                image: "/placeholder.svg?height=600&width=800&text=Kitchen",
                description: "Gourmet kitchen with premium appliances and granite countertops",
                features: ["Granite Counters", "Stainless Steel Appliances", "Island", "Pantry"],
            },
            {
                id: "3",
                name: "Master Bedroom",
                image: "/placeholder.svg?height=600&width=800&text=Master+Bedroom",
                description: "Luxurious master bedroom with walk-in closet",
                features: ["Walk-in Closet", "En-suite Bathroom", "Balcony Access", "Ceiling Fan"],
            },
            {
                id: "4",
                name: "Bathroom",
                image: "/placeholder.svg?height=600&width=800&text=Bathroom",
                description: "Spa-like bathroom with modern fixtures",
                features: ["Double Vanity", "Soaking Tub", "Separate Shower", "Heated Floors"],
            },
        ],
    }

    const displayProperty = property || defaultProperty
    const currentRoom = displayProperty.rooms[currentRoomIndex]

    const nextRoom = () => {
        setCurrentRoomIndex((prev) => (prev + 1) % displayProperty.rooms.length)
    }

    const prevRoom = () => {
        setCurrentRoomIndex((prev) => (prev - 1 + displayProperty.rooms.length) % displayProperty.rooms.length)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const resetView = () => {
        setZoom(1)
        setRotation(0)
    }

    const zoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.2, 3))
    }

    const zoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.2, 0.5))
    }

    const rotate = () => {
        setRotation((prev) => (prev + 90) % 360)
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Viewer */}
                        <div className="lg:col-span-3">
                            <Card className="overflow-hidden">
                                <div className="relative bg-black" style={{ paddingBottom: "56.25%" }}>
                                    <div className="absolute inset-0">
                                        <img
                                            src={currentRoom.image || "/placeholder.svg"}
                                            alt={currentRoom.name}
                                            className="w-full h-full object-cover transition-transform duration-300"
                                            style={{
                                                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                            }}
                                        />

                                        {/* Overlay Controls */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={togglePlay}
                                                    className="bg-black/50 text-white hover:bg-black/70"
                                                >
                                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={resetView}
                                                    className="bg-black/50 text-white hover:bg-black/70"
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={zoomOut}
                                                    className="bg-black/50 text-white hover:bg-black/70"
                                                >
                                                    <ZoomOut className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={zoomIn}
                                                    className="bg-black/50 text-white hover:bg-black/70"
                                                >
                                                    <ZoomIn className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                                    className="bg-black/50 text-white hover:bg-black/70"
                                                >
                                                    <Maximize className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Room Info Overlay */}
                                        {showInfo && (
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <Card className="bg-black/80 text-white border-0">
                                                    <CardContent className="p-4">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-2">{currentRoom.name}</h3>
                                                                <p className="text-sm opacity-90 mb-3">{currentRoom.description}</p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {currentRoom.features.slice(0, 3).map((feature, index) => (
                                                                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                                                                            {feature}
                                                                        </Badge>
                                                                    ))}
                                                                    {currentRoom.features.length > 3 && (
                                                                        <Badge variant="secondary" className="bg-white/20 text-white">
                                                                            +{currentRoom.features.length - 3} more
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => setShowInfo(false)}
                                                                className="text-white hover:bg-white/20"
                                                            >
                                                                <Info className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={prevRoom}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={nextRoom}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>

                                {/* Room Navigation */}
                                <CardContent className="p-4">
                                    <div className="flex space-x-2 overflow-x-auto">
                                        {displayProperty.rooms.map((room, index) => (
                                            <button
                                                key={room.id}
                                                onClick={() => setCurrentRoomIndex(index)}
                                                className={`flex-shrink-0 p-2 rounded-lg border transition-colors ${
                                                    index === currentRoomIndex
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <img
                                                    src={room.image || "/placeholder.svg"}
                                                    alt={room.name}
                                                    className="w-16 h-12 object-cover rounded mb-1"
                                                />
                                                <p className="text-xs font-medium text-center">{room.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Property Details Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">{displayProperty.title}</CardTitle>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span className="text-sm">{displayProperty.address}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-2xl font-bold text-blue-600">${displayProperty.price.toLocaleString()}</div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center">
                                            <Bed className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>{displayProperty.bedrooms} Beds</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Bath className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>{displayProperty.bathrooms} Baths</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Square className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>{displayProperty.sqft.toLocaleString()} sqft</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Car className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>{displayProperty.parking} Parking</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold">Features</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {displayProperty.features.map((feature, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {feature}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Schedule Viewing
                                        </Button>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button variant="outline" size="sm">
                                                <Heart className="h-4 w-4 mr-1" />
                                                Save
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Share className="h-4 w-4 mr-1" />
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Current Room Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Room Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="font-semibold mb-2">{currentRoom.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{currentRoom.description}</p>
                                    <div className="space-y-1">
                                        <h4 className="font-medium text-sm">Features:</h4>
                                        {currentRoom.features.map((feature, index) => (
                                            <div key={index} className="text-sm text-gray-600">
                                                • {feature}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
