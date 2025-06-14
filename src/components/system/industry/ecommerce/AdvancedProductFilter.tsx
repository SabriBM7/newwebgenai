"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, ShoppingCart, Heart, Grid, List, SlidersHorizontal } from "lucide-react"

interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    category: string
    brand: string
    image: string
    inStock: boolean
    tags: string[]
    features: string[]
}

interface FilterState {
    search: string
    categories: string[]
    brands: string[]
    priceRange: [number, number]
    rating: number
    inStock: boolean
    tags: string[]
}

interface AdvancedProductFilterProps {
    title?: string
    subtitle?: string
    products?: Product[]
    onFilterChange?: (filteredProducts: Product[]) => void
}

export default function AdvancedProductFilter({
                                                  title = "Product Catalog",
                                                  subtitle = "Find exactly what you're looking for with our advanced filters",
                                                  products = [],
                                                  onFilterChange,
                                              }: AdvancedProductFilterProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("relevance")
    const [showFilters, setShowFilters] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const [filters, setFilters] = useState<FilterState>({
        search: "",
        categories: [],
        brands: [],
        priceRange: [0, 1000],
        rating: 0,
        inStock: false,
        tags: [],
    })

    const defaultProducts: Product[] = [
        {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 299,
            originalPrice: 399,
            rating: 4.8,
            reviews: 1247,
            category: "Electronics",
            brand: "AudioTech",
            image: "/placeholder.svg?height=300&width=300&text=Headphones",
            inStock: true,
            tags: ["wireless", "noise-canceling", "premium"],
            features: ["Bluetooth 5.0", "30hr Battery", "Active Noise Cancellation"],
        },
        {
            id: "2",
            name: "Smart Fitness Watch",
            price: 199,
            rating: 4.6,
            reviews: 892,
            category: "Electronics",
            brand: "FitTech",
            image: "/placeholder.svg?height=300&width=300&text=Watch",
            inStock: true,
            tags: ["fitness", "smart", "waterproof"],
            features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
        },
        {
            id: "3",
            name: "Organic Cotton T-Shirt",
            price: 29,
            rating: 4.4,
            reviews: 156,
            category: "Clothing",
            brand: "EcoWear",
            image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
            inStock: false,
            tags: ["organic", "cotton", "sustainable"],
            features: ["100% Organic Cotton", "Fair Trade", "Machine Washable"],
        },
        {
            id: "4",
            name: "Professional Camera Lens",
            price: 899,
            originalPrice: 1099,
            rating: 4.9,
            reviews: 234,
            category: "Photography",
            brand: "LensMaster",
            image: "/placeholder.svg?height=300&width=300&text=Lens",
            inStock: true,
            tags: ["professional", "telephoto", "weather-sealed"],
            features: ["85mm f/1.4", "Weather Sealed", "Image Stabilization"],
        },
    ]

    const displayProducts = products.length > 0 ? products : defaultProducts

    // Extract unique values for filter options
    const categories = [...new Set(displayProducts.map((p) => p.category))]
    const brands = [...new Set(displayProducts.map((p) => p.brand))]
    const allTags = [...new Set(displayProducts.flatMap((p) => p.tags))]
    const maxPrice = Math.max(...displayProducts.map((p) => p.price))

    useEffect(() => {
        applyFilters()
    }, [filters, sortBy, displayProducts])

    const applyFilters = () => {
        const filtered = displayProducts.filter((product) => {
            // Search filter
            if (
                filters.search &&
                !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
                !product.brand.toLowerCase().includes(filters.search.toLowerCase()) &&
                !product.category.toLowerCase().includes(filters.search.toLowerCase())
            ) {
                return false
            }

            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false
            }

            // Brand filter
            if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
                return false
            }

            // Price range filter
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                return false
            }

            // Rating filter
            if (product.rating < filters.rating) {
                return false
            }

            // Stock filter
            if (filters.inStock && !product.inStock) {
                return false
            }

            // Tags filter
            if (filters.tags.length > 0 && !filters.tags.some((tag) => product.tags.includes(tag))) {
                return false
            }

            return true
        })

        // Apply sorting
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "reviews":
                filtered.sort((a, b) => b.reviews - a.reviews)
                break
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                // Keep original order for relevance
                break
        }

        setFilteredProducts(filtered)
        onFilterChange?.(filtered)
    }

    const updateFilter = (key: keyof FilterState, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const toggleArrayFilter = (key: "categories" | "brands" | "tags", value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
        }))
    }

    const clearFilters = () => {
        setFilters({
            search: "",
            categories: [],
            brands: [],
            priceRange: [0, maxPrice],
            rating: 0,
            inStock: false,
            tags: [],
        })
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    const getActiveFilterCount = () => {
        let count = 0
        if (filters.search) count++
        if (filters.categories.length > 0) count++
        if (filters.brands.length > 0) count++
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++
        if (filters.rating > 0) count++
        if (filters.inStock) count++
        if (filters.tags.length > 0) count++
        return count
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        {showFilters && (
                            <div className="lg:w-80 space-y-6">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center text-lg">
                                                <Filter className="h-5 w-5 mr-2" />
                                                Filters
                                                {getActiveFilterCount() > 0 && (
                                                    <Badge variant="secondary" className="ml-2">
                                                        {getActiveFilterCount()}
                                                    </Badge>
                                                )}
                                            </CardTitle>
                                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                                Clear All
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Search */}
                                        <div>
                                            <Label htmlFor="search">Search Products</Label>
                                            <div className="relative mt-1">
                                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="search"
                                                    placeholder="Search by name, brand, or category..."
                                                    value={filters.search}
                                                    onChange={(e) => updateFilter("search", e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div>
                                            <Label className="text-sm font-medium">Categories</Label>
                                            <div className="mt-2 space-y-2">
                                                {categories.map((category) => (
                                                    <div key={category} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`category-${category}`}
                                                            checked={filters.categories.includes(category)}
                                                            onCheckedChange={() => toggleArrayFilter("categories", category)}
                                                        />
                                                        <Label htmlFor={`category-${category}`} className="text-sm">
                                                            {category}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Brands */}
                                        <div>
                                            <Label className="text-sm font-medium">Brands</Label>
                                            <div className="mt-2 space-y-2">
                                                {brands.map((brand) => (
                                                    <div key={brand} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`brand-${brand}`}
                                                            checked={filters.brands.includes(brand)}
                                                            onCheckedChange={() => toggleArrayFilter("brands", brand)}
                                                        />
                                                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                                                            {brand}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Range */}
                                        <div>
                                            <Label className="text-sm font-medium">
                                                Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                                            </Label>
                                            <Slider
                                                value={filters.priceRange}
                                                onValueChange={(value) => updateFilter("priceRange", value)}
                                                max={maxPrice}
                                                min={0}
                                                step={10}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Rating */}
                                        <div>
                                            <Label className="text-sm font-medium">Minimum Rating</Label>
                                            <div className="mt-2 space-y-2">
                                                {[4, 3, 2, 1].map((rating) => (
                                                    <div key={rating} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`rating-${rating}`}
                                                            checked={filters.rating === rating}
                                                            onCheckedChange={() => updateFilter("rating", filters.rating === rating ? 0 : rating)}
                                                        />
                                                        <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                                                            {Array.from({ length: rating }, (_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                            <span className="ml-1">& up</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stock Status */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="inStock"
                                                checked={filters.inStock}
                                                onCheckedChange={(checked) => updateFilter("inStock", checked)}
                                            />
                                            <Label htmlFor="inStock" className="text-sm">
                                                In Stock Only
                                            </Label>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <Label className="text-sm font-medium">Tags</Label>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {allTags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant={filters.tags.includes(tag) ? "default" : "outline"}
                                                        className="cursor-pointer"
                                                        onClick={() => toggleArrayFilter("tags", tag)}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Products Area */}
                        <div className="flex-1">
                            {/* Controls Bar */}
                            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                <div className="flex items-center space-x-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden"
                                    >
                                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                    <span className="text-sm text-gray-600">
                    {filteredProducts.length} of {displayProducts.length} products
                  </span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="relevance">Sort by Relevance</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="reviews">Most Reviews</SelectItem>
                                            <SelectItem value="name">Name A-Z</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex border rounded-lg">
                                        <Button
                                            variant={viewMode === "grid" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("grid")}
                                            className="rounded-r-none"
                                        >
                                            <Grid className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={viewMode === "list" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("list")}
                                            className="rounded-l-none"
                                        >
                                            <List className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid/List */}
                            {filteredProducts.length === 0 ? (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <div className="text-gray-400 mb-4">
                                            <Search className="h-12 w-12 mx-auto" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                        <p className="text-gray-600 mb-4">
                                            Try adjusting your filters or search terms to find what you're looking for.
                                        </p>
                                        <Button onClick={clearFilters} variant="outline">
                                            Clear All Filters
                                        </Button>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div
                                    className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                                >
                                    {filteredProducts.map((product) => (
                                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            {viewMode === "grid" ? (
                                                <>
                                                    <div className="relative">
                                                        <img
                                                            src={product.image || "/placeholder.svg"}
                                                            alt={product.name}
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        {!product.inStock && (
                                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                <Badge variant="secondary">Out of Stock</Badge>
                                                            </div>
                                                        )}
                                                        <div className="absolute top-2 right-2">
                                                            <Button size="sm" variant="secondary" className="rounded-full p-2">
                                                                <Heart className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-4">
                                                        <div className="mb-2">
                                                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                            <p className="text-sm text-gray-600">{product.brand}</p>
                                                        </div>

                                                        <div className="flex items-center mb-2">
                                                            <div className="flex items-center">
                                                                {Array.from({ length: 5 }, (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${
                                                                            i < Math.floor(product.rating)
                                                                                ? "fill-yellow-400 text-yellow-400"
                                                                                : "text-gray-300"
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                                                        </div>

                                                        <div className="flex items-center justify-between mb-3">
                                                            <div>
                                                                <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                                                                {product.originalPrice && (
                                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-1 mb-3">
                                                            {product.tags.slice(0, 2).map((tag) => (
                                                                <Badge key={tag} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>

                                                        <Button className="w-full" disabled={!product.inStock}>
                                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                                                        </Button>
                                                    </CardContent>
                                                </>
                                            ) : (
                                                <CardContent className="p-4">
                                                    <div className="flex space-x-4">
                                                        <div className="relative flex-shrink-0">
                                                            <img
                                                                src={product.image || "/placeholder.svg"}
                                                                alt={product.name}
                                                                className="w-24 h-24 object-cover rounded"
                                                            />
                                                            {!product.inStock && (
                                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        Out of Stock
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        {product.brand} • {product.category}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</div>
                                                                    {product.originalPrice && (
                                                                        <div className="text-sm text-gray-500 line-through">
                                                                            {formatPrice(product.originalPrice)}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center mb-2">
                                                                <div className="flex items-center">
                                                                    {Array.from({ length: 5 }, (_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-4 w-4 ${
                                                                                i < Math.floor(product.rating)
                                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                                    : "text-gray-300"
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-sm text-gray-600 ml-2">
                                  {product.rating} ({product.reviews} reviews)
                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {product.tags.slice(0, 3).map((tag) => (
                                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>

                                                                <div className="flex space-x-2">
                                                                    <Button size="sm" variant="outline">
                                                                        <Heart className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button size="sm" disabled={!product.inStock}>
                                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
