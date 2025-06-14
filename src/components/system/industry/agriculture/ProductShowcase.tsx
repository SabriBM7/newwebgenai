"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Info, Leaf, MapPin, ShoppingCart, Sun, Thermometer, GlassWaterIcon as Water } from "lucide-react"

interface Product {
    id: string
    name: string
    description: string
    image: string
    price: number
    unit: string
    category: string
    inSeason: boolean
    organic: boolean
    origin: string
    nutritionalInfo?: {
        calories?: number
        protein?: number
        carbs?: number
        fat?: number
        fiber?: number
    }
    growingConditions?: {
        soil?: string
        water?: string
        sunlight?: string
        temperature?: string
    }
}

interface ProductShowcaseProps {
    title?: string
    products?: Product[]
    categories?: string[]
    className?: string
}

export default function ProductShowcase({
                                            title = "Farm Fresh Products",
                                            products = defaultProducts,
                                            categories = ["All", ...new Set(defaultProducts.map((p) => p.category))],
                                            className,
                                        }: ProductShowcaseProps) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const filteredProducts =
        selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

    return (
        <div className={className}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute top-2 right-2 flex flex-col gap-2">
                                {product.inSeason && <Badge className="bg-green-500">In Season</Badge>}
                                {product.organic && <Badge className="bg-amber-500">Organic</Badge>}
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <div className="text-lg font-bold">
                                    ${product.price.toFixed(2)}/{product.unit}
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>Origin: {product.origin}</span>
                            </div>
                            <div className="flex justify-between">
                                <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)}>
                                    <Info className="h-4 w-4 mr-1" />
                                    Details
                                </Button>
                                <Button size="sm">
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add to Cart
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>Origin: {selectedProduct.origin}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {selectedProduct.inSeason && <Badge className="bg-green-500">In Season</Badge>}
                                    {selectedProduct.organic && <Badge className="bg-amber-500">Organic</Badge>}
                                </div>
                            </div>

                            <div className="aspect-video mb-6">
                                <img
                                    src={selectedProduct.image || "/placeholder.svg"}
                                    alt={selectedProduct.name}
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>

                            <p className="mb-6">{selectedProduct.description}</p>

                            <Tabs defaultValue="nutrition">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                    <TabsTrigger value="growing">Growing Conditions</TabsTrigger>
                                    <TabsTrigger value="availability">Availability</TabsTrigger>
                                </TabsList>

                                <TabsContent value="nutrition" className="pt-4">
                                    {selectedProduct.nutritionalInfo ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(selectedProduct.nutritionalInfo).map(([key, value]) => (
                                                <div key={key} className="flex justify-between p-2 border-b">
                                                    <span className="capitalize">{key}</span>
                                                    <span className="font-medium">
                            {value} {key === "calories" ? "kcal" : "g"}
                          </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">Nutritional information not available.</p>
                                    )}
                                </TabsContent>

                                <TabsContent value="growing" className="pt-4">
                                    {selectedProduct.growingConditions ? (
                                        <div className="space-y-4">
                                            {selectedProduct.growingConditions.soil && (
                                                <div className="flex items-start gap-3">
                                                    <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-medium">Soil</h4>
                                                        <p className="text-sm text-muted-foreground">{selectedProduct.growingConditions.soil}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedProduct.growingConditions.water && (
                                                <div className="flex items-start gap-3">
                                                    <Water className="h-5 w-5 text-blue-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-medium">Water</h4>
                                                        <p className="text-sm text-muted-foreground">{selectedProduct.growingConditions.water}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedProduct.growingConditions.sunlight && (
                                                <div className="flex items-start gap-3">
                                                    <Sun className="h-5 w-5 text-amber-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-medium">Sunlight</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {selectedProduct.growingConditions.sunlight}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedProduct.growingConditions.temperature && (
                                                <div className="flex items-start gap-3">
                                                    <Thermometer className="h-5 w-5 text-red-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-medium">Temperature</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {selectedProduct.growingConditions.temperature}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">Growing information not available.</p>
                                    )}
                                </TabsContent>

                                <TabsContent value="availability" className="pt-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Seasonal Availability</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {selectedProduct.inSeason
                                                    ? "Currently in season and available for purchase."
                                                    : "Currently out of season. Check back later."}
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="mt-6 flex justify-between items-center">
                                <div className="text-xl font-bold">
                                    ${selectedProduct.price.toFixed(2)}/{selectedProduct.unit}
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                                        Close
                                    </Button>
                                    <Button>
                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

const defaultProducts: Product[] = [
    {
        id: "p1",
        name: "Organic Heirloom Tomatoes",
        description: "Vine-ripened, colorful heirloom tomatoes grown without pesticides",
        image: "/placeholder.svg?height=400&width=400",
        price: 4.99,
        unit: "lb",
        category: "Vegetables",
        inSeason: true,
        organic: true,
        origin: "Local Farm",
        nutritionalInfo: {
            calories: 22,
            protein: 1.1,
            carbs: 4.8,
            fat: 0.2,
            fiber: 1.5,
        },
        growingConditions: {
            soil: "Well-drained, fertile soil with pH 6.0-6.8",
            water: "Regular watering, about 1-2 inches per week",
            sunlight: "Full sun, at least 6-8 hours daily",
            temperature: "Optimal growing temperature 65-85°F (18-29°C)",
        },
    },
    {
        id: "p2",
        name: "Fresh Strawberries",
        description: "Sweet, juicy strawberries picked at peak ripeness",
        image: "/placeholder.svg?height=400&width=400",
        price: 5.99,
        unit: "pint",
        category: "Fruits",
        inSeason: true,
        organic: true,
        origin: "Berry Hills Farm",
        nutritionalInfo: {
            calories: 32,
            protein: 0.7,
            carbs: 7.7,
            fat: 0.3,
            fiber: 2.0,
        },
        growingConditions: {
            soil: "Sandy loam with good drainage, pH 5.5-6.5",
            water: "Consistent moisture, about 1-1.5 inches per week",
            sunlight: "Full sun to partial shade",
            temperature: "Optimal growing temperature 60-80°F (15-27°C)",
        },
    },
    {
        id: "p3",
        name: "Artisanal Honey",
        description: "Raw, unfiltered honey from local wildflower meadows",
        image: "/placeholder.svg?height=400&width=400",
        price: 12.99,
        unit: "jar",
        category: "Specialty",
        inSeason: true,
        organic: true,
        origin: "Meadow Apiaries",
        nutritionalInfo: {
            calories: 304,
            carbs: 82.4,
        },
    },
    {
        id: "p4",
        name: "Fresh Kale Bunches",
        description: "Nutrient-dense, crisp kale leaves perfect for salads and cooking",
        image: "/placeholder.svg?height=400&width=400",
        price: 3.49,
        unit: "bunch",
        category: "Vegetables",
        inSeason: true,
        organic: true,
        origin: "Green Valley Farm",
        nutritionalInfo: {
            calories: 33,
            protein: 2.9,
            carbs: 6.7,
            fat: 0.5,
            fiber: 1.3,
        },
        growingConditions: {
            soil: "Rich, well-drained soil with pH 6.0-7.5",
            water: "Moderate watering, keeping soil consistently moist",
            sunlight: "Full sun to partial shade",
            temperature: "Grows best in cool weather, 55-75°F (13-24°C)",
        },
    },
    {
        id: "p5",
        name: "Farm Fresh Eggs",
        description: "Free-range, pasture-raised chicken eggs with vibrant yolks",
        image: "/placeholder.svg?height=400&width=400",
        price: 6.99,
        unit: "dozen",
        category: "Dairy & Eggs",
        inSeason: true,
        organic: false,
        origin: "Sunrise Poultry Farm",
        nutritionalInfo: {
            calories: 70,
            protein: 6,
            fat: 5,
        },
    },
    {
        id: "p6",
        name: "Heirloom Carrots",
        description: "Colorful variety of sweet, crunchy carrots in purple, yellow, and orange",
        image: "/placeholder.svg?height=400&width=400",
        price: 4.49,
        unit: "bunch",
        category: "Vegetables",
        inSeason: true,
        organic: true,
        origin: "Rainbow Roots Farm",
        nutritionalInfo: {
            calories: 41,
            protein: 0.9,
            carbs: 9.6,
            fat: 0.2,
            fiber: 2.8,
        },
        growingConditions: {
            soil: "Loose, sandy soil with pH 6.0-7.0",
            water: "Consistent moisture, about 1 inch per week",
            sunlight: "Full sun to partial shade",
            temperature: "Optimal growing temperature 60-70°F (15-21°C)",
        },
    },
]
