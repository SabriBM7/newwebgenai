"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RealEstateListings(props: any) {
    const properties = props.properties || [
        {
            title: "Luxury Waterfront Villa",
            description: "Stunning 5-bedroom waterfront villa with private dock and panoramic ocean views.",
            price: "$2,450,000",
            address: "123 Ocean Drive, Miami Beach, FL",
            bedrooms: 5,
            bathrooms: 4.5,
            sqft: 3850,
            type: "House",
            status: "For Sale",
            featured: true,
            images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"],
        },
        {
            title: "Modern Downtown Apartment",
            description: "Stylish 2-bedroom apartment in the heart of downtown with city views and modern amenities.",
            price: "$495,000",
            address: "789 Urban Ave, Downtown, NY",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1200,
            type: "Condo",
            status: "For Sale",
            featured: false,
            images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop"],
        },
        {
            title: "Suburban Family Home",
            description: "Spacious 4-bedroom family home with large backyard, finished basement and 2-car garage.",
            price: "$675,000",
            address: "456 Maple Street, Oakdale, CA",
            bedrooms: 4,
            bathrooms: 3,
            sqft: 2400,
            type: "House",
            status: "For Sale",
            featured: true,
            images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop"],
        },
        {
            title: "Renovated Historic Townhouse",
            description: "Beautifully renovated 3-bedroom townhouse with original features and modern updates.",
            price: "$849,000",
            address: "234 Heritage Lane, Charleston, SC",
            bedrooms: 3,
            bathrooms: 2.5,
            sqft: 1850,
            type: "Townhouse",
            status: "For Sale",
            featured: false,
            images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop"],
        },
        {
            title: "Mountain View Cabin",
            description: "Cozy 2-bedroom cabin with stunning mountain views, wood-burning fireplace and wraparound deck.",
            price: "$395,000",
            address: "567 Pine Ridge Road, Aspen, CO",
            bedrooms: 2,
            bathrooms: 1,
            sqft: 1100,
            type: "Cabin",
            status: "For Sale",
            featured: true,
            images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop"],
        },
        {
            title: "Luxury Penthouse Apartment",
            description: "Spectacular penthouse with private rooftop terrace, 3 bedrooms and panoramic city views.",
            price: "$1,750,000",
            address: "888 Skyline Blvd, San Francisco, CA",
            bedrooms: 3,
            bathrooms: 3.5,
            sqft: 2200,
            type: "Penthouse",
            status: "For Sale",
            featured: true,
            images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Featured Properties"}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {props.subtitle || "Explore our selection of premium properties in the most desirable locations"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property: any, index: number) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-duration-300">
                            <div className="relative">
                                <img
                                    src={property.images?.[0] || "/placeholder.svg"}
                                    alt={property.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-teal-600">{property.status}</Badge>
                                    {property.featured && <Badge className="bg-amber-500">Featured</Badge>}
                                </div>
                                <button className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                                    <Heart className="h-5 w-5 text-red-500" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                                    <div className="text-2xl font-bold">{property.price}</div>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{property.title}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">{property.address}</span>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{property.description}</p>

                                <div className="flex justify-between mb-6 text-gray-700 text-sm">
                                    <div className="flex items-center">
                                        <Bed className="h-4 w-4 mr-1" />
                                        <span>{property.bedrooms} beds</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Bath className="h-4 w-4 mr-1" />
                                        <span>{property.bathrooms} baths</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Square className="h-4 w-4 mr-1" />
                                        <span>{property.sqft.toLocaleString()} sqft</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Button className="flex-1 mr-2 bg-teal-600 hover:bg-teal-700">View Details</Button>
                                    <Button variant="outline" className="flex-1 ml-2 border-teal-600 text-teal-600 hover:bg-teal-50">
                                        Schedule Tour
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {props.showViewAllButton !== false && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50">
                            View All Properties
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default RealEstateListings
