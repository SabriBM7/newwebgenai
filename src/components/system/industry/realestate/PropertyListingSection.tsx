"use client"

import { useState } from "react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Bed, Bath, Square, MapPin, Heart, Share2, Search } from "lucide-react"

interface Property {
    id: string
    title: string
    address: string
    price: string
    bedrooms: number
    bathrooms: number
    squareFeet: number
    images: string[]
    featured?: boolean
    status: "For Sale" | "For Rent" | "Sold" | "Pending"
    propertyType: "House" | "Apartment" | "Condo" | "Townhouse" | "Land"
}

interface PropertyListingSectionProps {
    title?: string
    subtitle?: string
    properties?: Property[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    style?: "grid" | "list" | "cards"
    showFilters?: boolean
    keywords?: string[]
}

export default function PropertyListingSection({
                                                   title = "Featured Properties",
                                                   subtitle = "Find your dream home",
                                                   properties,
                                                   backgroundColor = "#ffffff",
                                                   textColor = "#000000",
                                                   accentColor = "#4f46e5",
                                                   textAlignment = "center",
                                                   style = "cards",
                                                   showFilters = true,
                                                   keywords = [],
                                               }: PropertyListingSectionProps) {
    const [activeFilters, setActiveFilters] = useState({
        propertyType: "all",
        minPrice: "",
        maxPrice: "",
        bedrooms: "any",
        status: "all",
    })

    const defaultProperties: Property[] = [
        {
            id: "prop1",
            title: "Modern Family Home",
            address: "123 Main St, Anytown, CA",
            price: "$750,000",
            bedrooms: 4,
            bathrooms: 3,
            squareFeet: 2500,
            images: ["/placeholder.svg?height=600&width=800&text=Modern+Family+Home"],
            featured: true,
            status: "For Sale",
            propertyType: "House",
        },
        {
            id: "prop2",
            title: "Downtown Apartment",
            address: "456 Park Ave, Anytown, CA",
            price: "$2,200/mo",
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1200,
            images: ["/placeholder.svg?height=600&width=800&text=Downtown+Apartment"],
            status: "For Rent",
            propertyType: "Apartment",
        },
        {
            id: "prop3",
            title: "Luxury Waterfront Condo",
            address: "789 Ocean Blvd, Beachtown, CA",
            price: "$1,250,000",
            bedrooms: 3,
            bathrooms: 3.5,
            squareFeet: 2200,
            images: ["/placeholder.svg?height=600&width=800&text=Luxury+Condo"],
            featured: true,
            status: "For Sale",
            propertyType: "Condo",
        },
        {
            id: "prop4",
            title: "Charming Townhouse",
            address: "101 Village Lane, Anytown, CA",
            price: "$425,000",
            bedrooms: 3,
            bathrooms: 2.5,
            squareFeet: 1800,
            images: ["/placeholder.svg?height=600&width=800&text=Charming+Townhouse"],
            status: "Pending",
            propertyType: "Townhouse",
        },
        {
            id: "prop5",
            title: "Country Estate",
            address: "555 Rural Route, Countryside, CA",
            price: "$1,100,000",
            bedrooms: 5,
            bathrooms: 4,
            squareFeet: 4200,
            images: ["/placeholder.svg?height=600&width=800&text=Country+Estate"],
            status: "For Sale",
            propertyType: "House",
        },
        {
            id: "prop6",
            title: "Building Lot with Views",
            address: "222 Hilltop Dr, Anytown, CA",
            price: "$350,000",
            bedrooms: 0,
            bathrooms: 0,
            squareFeet: 10000,
            images: ["/placeholder.svg?height=600&width=800&text=Building+Lot"],
            status: "For Sale",
            propertyType: "Land",
        },
    ]

    const displayProperties = properties || defaultProperties

    // Filter properties based on active filters
    const filteredProperties = displayProperties.filter((property) => {
        if (activeFilters.propertyType !== "all" && property.propertyType !== activeFilters.propertyType) {
            return false
        }

        if (activeFilters.status !== "all" && property.status !== activeFilters.status) {
            return false
        }

        if (activeFilters.bedrooms !== "any") {
            const minBeds = Number.parseInt(activeFilters.bedrooms)
            if (property.bedrooms < minBeds) {
                return false
            }
        }

        if (activeFilters.minPrice && !isNaN(Number.parseFloat(activeFilters.minPrice))) {
            const minPrice = Number.parseFloat(activeFilters.minPrice)
            const propertyPrice = Number.parseFloat(property.price.replace(/[^0-9.]/g, ""))
            if (propertyPrice < minPrice) {
                return false
            }
        }

        if (activeFilters.maxPrice && !isNaN(Number.parseFloat(activeFilters.maxPrice))) {
            const maxPrice = Number.parseFloat(activeFilters.maxPrice)
            const propertyPrice = Number.parseFloat(property.price.replace(/[^0-9.]/g, ""))
            if (propertyPrice > maxPrice) {
                return false
            }
        }

        return true
    })

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters({
            ...activeFilters,
            [key]: value,
        })
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                {showFilters && (
                    <div className="max-w-5xl mx-auto mb-12 p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-bold mb-4">Find Your Perfect Property</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Property Type</label>
                                <Select
                                    value={activeFilters.propertyType}
                                    onValueChange={(value) => handleFilterChange("propertyType", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="House">House</SelectItem>
                                        <SelectItem value="Apartment">Apartment</SelectItem>
                                        <SelectItem value="Condo">Condo</SelectItem>
                                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                                        <SelectItem value="Land">Land</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Status</label>
                                <Select value={activeFilters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="For Sale">For Sale</SelectItem>
                                        <SelectItem value="For Rent">For Rent</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Sold">Sold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                                <Select value={activeFilters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">Any</SelectItem>
                                        <SelectItem value="1">1+</SelectItem>
                                        <SelectItem value="2">2+</SelectItem>
                                        <SelectItem value="3">3+</SelectItem>
                                        <SelectItem value="4">4+</SelectItem>
                                        <SelectItem value="5">5+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Min Price</label>
                                <Input
                                    type="text"
                                    placeholder="Min Price"
                                    value={activeFilters.minPrice}
                                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Max Price</label>
                                <Input
                                    type="text"
                                    placeholder="Max Price"
                                    value={activeFilters.maxPrice}
                                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button className="w-full md:w-auto" style={{ backgroundColor: accentColor, color: "#ffffff" }}>
                                <Search className="h-4 w-4 mr-2" />
                                Search Properties
                            </Button>
                        </div>
                    </div>
                )}

                {filteredProperties.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg opacity-80">No properties match your search criteria.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() =>
                                setActiveFilters({
                                    propertyType: "all",
                                    minPrice: "",
                                    maxPrice: "",
                                    bedrooms: "any",
                                    status: "all",
                                })
                            }
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div
                        className={cn(
                            style === "grid" && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                            style === "list" && "space-y-8",
                            style === "cards" && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                        )}
                    >
                        {filteredProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                style={style}
                                accentColor={accentColor}
                                textColor={textColor}
                            />
                        ))}
                    </div>
                )}

                {filteredProperties.length > 0 && (
                    <div className="mt-12 text-center">
                        <Button variant="outline" style={{ borderColor: accentColor, color: accentColor }}>
                            View All Properties
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

interface PropertyCardProps {
    property: Property
    style: "grid" | "list" | "cards"
    accentColor: string
    textColor: string
}

function PropertyCard({ property, style, accentColor, textColor }: PropertyCardProps) {
    if (style === "list") {
        return (
            <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm">
                <div className="md:w-1/3 relative">
                    <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                    <div className="absolute top-2 left-2">
            <span
                className="px-2 py-1 text-xs font-bold rounded"
                style={{ backgroundColor: accentColor, color: "#ffffff" }}
            >
              {property.status}
            </span>
                        {property.featured && (
                            <span className="ml-2 px-2 py-1 text-xs font-bold rounded bg-yellow-500 text-white">Featured</span>
                        )}
                    </div>
                </div>
                <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                            <p className="flex items-center text-sm opacity-70 mb-3">
                                <MapPin className="h-4 w-4 mr-1" />
                                {property.address}
                            </p>
                        </div>
                        <p className="text-xl font-bold" style={{ color: accentColor }}>
                            {property.price}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>
                {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
              </span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>
                {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
              </span>
                        </div>
                        <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.squareFeet.toLocaleString()} sq ft</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button>View Details</Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Grid or Cards style (they're similar)
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
                <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 left-2">
          <span
              className="px-2 py-1 text-xs font-bold rounded"
              style={{ backgroundColor: accentColor, color: "#ffffff" }}
          >
            {property.status}
          </span>
                    {property.featured && (
                        <span className="ml-2 px-2 py-1 text-xs font-bold rounded bg-yellow-500 text-white">Featured</span>
                    )}
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" style={{ color: textColor }} />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" style={{ color: textColor }} />
                    </Button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{property.title}</h3>
                    <p className="font-bold" style={{ color: accentColor }}>
                        {property.price}
                    </p>
                </div>

                <p className="flex items-center text-sm opacity-70 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                </p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.squareFeet.toLocaleString()} sq ft</span>
                    </div>
                </div>

                <Button className="w-full" style={{ backgroundColor: accentColor, color: "#ffffff" }}>
                    View Details
                </Button>
            </div>
        </div>
    )
}
