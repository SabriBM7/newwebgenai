"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Car, Fuel, MapPin } from "lucide-react"

interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    fuelType: string
    transmission: string
    image: string
    features: string[]
    location: string
}

export function VehicleInventory(props: any) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMake, setSelectedMake] = useState("")
    const [priceRange, setPriceRange] = useState("")

    const vehicles: Vehicle[] = props.vehicles || [
        {
            id: "1",
            make: "Toyota",
            model: "Camry",
            year: 2023,
            price: 28500,
            mileage: 15000,
            fuelType: "Hybrid",
            transmission: "Automatic",
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
            features: ["Backup Camera", "Bluetooth", "Lane Assist", "Apple CarPlay"],
            location: "Downtown Showroom",
        },
        {
            id: "2",
            make: "Honda",
            model: "Civic",
            year: 2022,
            price: 24900,
            mileage: 22000,
            fuelType: "Gasoline",
            transmission: "Manual",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
            features: ["Sunroof", "Heated Seats", "Navigation", "Wireless Charging"],
            location: "North Branch",
        },
        {
            id: "3",
            make: "Tesla",
            model: "Model 3",
            year: 2023,
            price: 42000,
            mileage: 8000,
            fuelType: "Electric",
            transmission: "Automatic",
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
            features: ["Autopilot", "Supercharging", "Premium Audio", "Glass Roof"],
            location: "Electric Vehicle Center",
        },
    ]

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesMake = !selectedMake || vehicle.make === selectedMake
        const matchesPrice =
            !priceRange ||
            (priceRange === "under-25k" && vehicle.price < 25000) ||
            (priceRange === "25k-40k" && vehicle.price >= 25000 && vehicle.price <= 40000) ||
            (priceRange === "over-40k" && vehicle.price > 40000)

        return matchesSearch && matchesMake && matchesPrice
    })

    const makes = [...new Set(vehicles.map((v) => v.make))]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Vehicle Inventory"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Find your perfect vehicle from our extensive inventory"}
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search make or model..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={selectedMake} onValueChange={setSelectedMake}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Make" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Makes</SelectItem>
                                {makes.map((make) => (
                                    <SelectItem key={make} value={make}>
                                        {make}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={priceRange} onValueChange={setPriceRange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Prices</SelectItem>
                                <SelectItem value="under-25k">Under $25,000</SelectItem>
                                <SelectItem value="25k-40k">$25,000 - $40,000</SelectItem>
                                <SelectItem value="over-40k">Over $40,000</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Filter className="h-4 w-4 mr-2" />
                            Apply Filters
                        </Button>
                    </div>
                </div>

                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img
                                    src={vehicle.image || "/placeholder.svg"}
                                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                    className="w-full h-48 object-cover"
                                />
                                <Badge className="absolute top-4 left-4 bg-blue-600">{vehicle.year}</Badge>
                                <Badge className="absolute top-4 right-4 bg-green-600">{vehicle.fuelType}</Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </h3>
                                <div className="text-2xl font-bold text-blue-600 mb-4">${vehicle.price.toLocaleString()}</div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Car className="h-4 w-4 mr-2" />
                                        {vehicle.mileage.toLocaleString()} miles
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Fuel className="h-4 w-4 mr-2" />
                                        {vehicle.transmission}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {vehicle.location}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {feature}
                                            </Badge>
                                        ))}
                                        {vehicle.features.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{vehicle.features.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Details</Button>
                                    <Button variant="outline" className="flex-1">
                                        Schedule Test Drive
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredVehicles.length === 0 && (
                    <div className="text-center py-12">
                        <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No vehicles found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </section>
    )
}
