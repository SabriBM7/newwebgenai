"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Search, Filter } from "lucide-react"

interface Product {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    category: string
    tags: string[]
    inStock: boolean
    featured: boolean
}

interface ProductGridProps {
    title?: string
    subtitle?: string
    products?: Product[]
    showFilters?: boolean
    showSearch?: boolean
    backgroundColor?: string
    textColor?: string
}

export default function ProductGrid({
                                        title = "Our Products",
                                        subtitle = "Discover our amazing collection",
                                        products = [],
                                        showFilters = true,
                                        showSearch = true,
                                        backgroundColor = "bg-white",
                                        textColor = "text-gray-900",
                                    }: ProductGridProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortBy, setSortBy] = useState("featured")

    const defaultProducts: Product[] = [
        {
            id: "1",
            name: "Premium Wireless Headphones",
            description: "High-quality sound with noise cancellation technology",
            price: 299,
            originalPrice: 399,
            rating: 4.8,
            reviews: 1250,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            category: "Electronics",
            tags: ["wireless", "premium", "noise-cancelling"],
            inStock: true,
            featured: true,
        },
        {
            id: "2",
            name: "Organic Cotton T-Shirt",
            description: "Comfortable and sustainable everyday wear",
            price: 29,
            rating: 4.6,
            reviews: 890,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            category: "Clothing",
            tags: ["organic", "cotton", "sustainable"],
            inStock: true,
            featured: false,
        },
        {
            id: "3",
            name: "Smart Fitness Watch",
            description: "Track your health and fitness goals with style",
            price: 199,
            originalPrice: 249,
            rating: 4.7,
            reviews: 2100,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            category: "Electronics",
            tags: ["fitness", "smart", "health"],
            inStock: true,
            featured: true,
        },
        {
            id: "4",
            name: "Artisan Coffee Beans",
            description: "Single-origin beans roasted to perfection",
            price: 24,
            rating: 4.9,
            reviews: 650,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
            category: "Food",
            tags: ["coffee", "artisan", "organic"],
            inStock: true,
            featured: false,
        },
        {
            id: "5",
            name: "Minimalist Desk Lamp",
            description: "Modern design with adjustable brightness",
            price: 89,
            rating: 4.5,
            reviews: 420,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            category: "Home",
            tags: ["minimalist", "modern", "lighting"],
            inStock: false,
            featured: false,
        },
        {
            id: "6",
            name: "Leather Crossbody Bag",
            description: "Handcrafted genuine leather with vintage style",
            price: 149,
            originalPrice: 199,
            rating: 4.8,
            reviews: 780,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            category: "Accessories",
            tags: ["leather", "handcrafted", "vintage"],
            inStock: true,
            featured: true,
        },
    ]

    const displayProducts = products.length > 0 ? products : defaultProducts
    const categories = ["all", ...new Set(displayProducts.map((p) => p.category))]

    const filteredProducts = displayProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    <p className={`text-lg ${textColor} opacity-80 max-w-2xl mx-auto`}>{subtitle}</p>
                </div>

                {(showSearch || showFilters) && (
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {showSearch && (
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        )}

                        {showFilters && (
                            <div className="flex gap-4">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-40">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category === "all" ? "All Categories" : category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {product.featured && (
                                    <Badge className="absolute top-3 left-3" variant="destructive">
                                        Featured
                                    </Badge>
                                )}

                                {product.originalPrice && (
                                    <Badge className="absolute top-3 right-3" variant="secondary">
                                        Sale
                                    </Badge>
                                )}

                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <Badge variant="outline" className="bg-white">
                                            Out of Stock
                                        </Badge>
                                    </div>
                                )}

                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="outline" className="bg-white">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium ml-1">{product.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {product.tags.slice(0, 2).map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                            )}
                                        </div>

                                        <Button size="sm" disabled={!product.inStock} className="flex items-center gap-2">
                                            <ShoppingCart className="h-4 w-4" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
