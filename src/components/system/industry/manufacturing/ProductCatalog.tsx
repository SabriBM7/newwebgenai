"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Package, Award, Download, Eye } from "lucide-react"

interface Product {
    id: string
    name: string
    category: string
    subcategory: string
    image: string
    description: string
    specifications: {
        [key: string]: string
    }
    features: string[]
    applications: string[]
    certifications: string[]
    dataSheet: string
    price: {
        currency: string
        amount: number
        unit: string
    }
    availability: "in-stock" | "limited" | "out-of-stock"
    leadTime: string
    minOrderQuantity: number
}

interface ProductCatalogProps {
    title?: string
    subtitle?: string
    products?: Product[]
    showFilters?: boolean
    showSearch?: boolean
}

export function ProductCatalog({
                                   title = "Product Catalog",
                                   subtitle = "Explore our comprehensive range of industrial products and solutions",
                                   products = [],
                                   showFilters = true,
                                   showSearch = true,
                               }: ProductCatalogProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedAvailability, setSelectedAvailability] = useState("all")

    const defaultProducts: Product[] = [
        {
            id: "1",
            name: "Industrial Pump Series X200",
            category: "Pumps",
            subcategory: "Centrifugal Pumps",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
            description:
                "High-efficiency centrifugal pump designed for industrial applications with superior performance and reliability.",
            specifications: {
                "Flow Rate": "500-2000 GPM",
                Head: "50-200 ft",
                Power: "10-100 HP",
                Material: "Cast Iron/Stainless Steel",
                "Temperature Range": "-20°C to 120°C",
            },
            features: ["Self-priming", "Corrosion resistant", "Low maintenance", "Energy efficient"],
            applications: ["Water treatment", "Chemical processing", "HVAC systems", "Industrial cooling"],
            certifications: ["ISO 9001", "CE Marking", "API 610"],
            dataSheet: "/datasheets/x200-pump.pdf",
            price: {
                currency: "USD",
                amount: 2500,
                unit: "each",
            },
            availability: "in-stock",
            leadTime: "2-3 weeks",
            minOrderQuantity: 1,
        },
        {
            id: "2",
            name: "Precision Bearing Assembly",
            category: "Bearings",
            subcategory: "Ball Bearings",
            image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop",
            description:
                "High-precision ball bearing assembly for demanding industrial applications requiring exceptional accuracy.",
            specifications: {
                "Bore Diameter": "20-100 mm",
                "Load Rating": "5000-50000 N",
                "Speed Rating": "10000 RPM",
                "Precision Class": "ABEC-7",
                Lubrication: "Grease/Oil",
            },
            features: ["High precision", "Long service life", "Low friction", "Sealed design"],
            applications: ["Machine tools", "Robotics", "Aerospace", "Medical equipment"],
            certifications: ["ISO 9001", "AS9100", "FDA Approved"],
            dataSheet: "/datasheets/precision-bearing.pdf",
            price: {
                currency: "USD",
                amount: 150,
                unit: "each",
            },
            availability: "limited",
            leadTime: "4-6 weeks",
            minOrderQuantity: 10,
        },
        {
            id: "3",
            name: "Control Valve Series CV-500",
            category: "Valves",
            subcategory: "Control Valves",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            description: "Advanced control valve with digital positioner for precise flow control in critical applications.",
            specifications: {
                "Size Range": '1/2" - 12"',
                "Pressure Rating": "150-2500 PSI",
                "Temperature Range": "-40°C to 400°C",
                "Cv Range": "0.1 - 1000",
                "Actuator Type": "Pneumatic/Electric",
            },
            features: ["Digital positioner", "Fail-safe operation", "Remote monitoring", "Modular design"],
            applications: ["Oil & gas", "Petrochemical", "Power generation", "Water treatment"],
            certifications: ["API 6D", "ASME B16.34", "SIL 3"],
            dataSheet: "/datasheets/cv-500-valve.pdf",
            price: {
                currency: "USD",
                amount: 3200,
                unit: "each",
            },
            availability: "in-stock",
            leadTime: "3-4 weeks",
            minOrderQuantity: 1,
        },
    ]

    const displayProducts = products.length > 0 ? products : defaultProducts

    const filteredProducts = displayProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability

        return matchesSearch && matchesCategory && matchesAvailability
    })

    const categories = [...new Set(displayProducts.map((p) => p.category))]

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case "in-stock":
                return "bg-green-100 text-green-800"
            case "limited":
                return "bg-yellow-100 text-yellow-800"
            case "out-of-stock":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {(showSearch || showFilters) && (
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {showSearch && (
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            )}

                            {showFilters && (
                                <>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
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

                                    <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Availability</SelectItem>
                                            <SelectItem value="in-stock">In Stock</SelectItem>
                                            <SelectItem value="limited">Limited Stock</SelectItem>
                                            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Apply Filters
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <Badge className={`absolute top-4 right-4 ${getAvailabilityColor(product.availability)}`}>
                                    {product.availability.replace("-", " ").toUpperCase()}
                                </Badge>
                            </div>

                            <CardContent className="p-6">
                                <div className="mb-4">
                                    <Badge variant="outline" className="mb-2">
                                        {product.category}
                                    </Badge>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-sm mb-2">Key Specifications:</h4>
                                    <div className="space-y-1">
                                        {Object.entries(product.specifications)
                                            .slice(0, 3)
                                            .map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-xs text-gray-600">
                                                    <span>{key}:</span>
                                                    <span className="font-medium">{value}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {product.features.slice(0, 3).map((feature, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {feature}
                                            </Badge>
                                        ))}
                                        {product.features.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{product.features.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {product.price.currency} ${product.price.amount.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-gray-500">per {product.price.unit}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-600">Lead Time:</div>
                                            <div className="text-sm font-medium">{product.leadTime}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                        <Package className="h-4 w-4 mr-2" />
                                        Request Quote
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                    <span>MOQ: {product.minOrderQuantity}</span>
                                    <div className="flex items-center">
                                        <Award className="h-3 w-3 mr-1" />
                                        {product.certifications.length} certifications
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </section>
    )
}
