"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X, Star, ShoppingCart, RefreshCw } from "lucide-react"

interface ProductFeature {
    name: string
    value: string | boolean | number
    type: "text" | "boolean" | "rating" | "number"
    category: string
}

interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    image: string
    inStock: boolean
    brand: string
    category: string
    features: ProductFeature[]
}

interface ProductComparisonProps {
    title?: string
    subtitle?: string
    products?: Product[]
    availableProducts?: Product[]
}

export default function ProductComparison({
                                              title = "Product Comparison",
                                              subtitle = "Compare features and specifications to find the perfect product",
                                              products = [],
                                              availableProducts = [],
                                          }: ProductComparisonProps) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [showDifferences, setShowDifferences] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const defaultProducts: Product[] = [
        {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 299,
            originalPrice: 399,
            rating: 4.8,
            image: "/placeholder.svg?height=300&width=300&text=Headphones",
            inStock: true,
            brand: "AudioTech",
            category: "Electronics",
            features: [
                { name: "Battery Life", value: "30 hours", type: "text", category: "Performance" },
                { name: "Noise Cancellation", value: true, type: "boolean", category: "Features" },
                { name: "Bluetooth Version", value: "5.0", type: "text", category: "Connectivity" },
                { name: "Water Resistant", value: true, type: "boolean", category: "Features" },
                { name: "Weight", value: 250, type: "number", category: "Physical" },
                { name: "Sound Quality", value: 4.9, type: "rating", category: "Performance" },
            ],
        },
        {
            id: "2",
            name: "Standard Wireless Headphones",
            price: 199,
            rating: 4.2,
            image: "/placeholder.svg?height=300&width=300&text=Headphones2",
            inStock: true,
            brand: "SoundWave",
            category: "Electronics",
            features: [
                { name: "Battery Life", value: "20 hours", type: "text", category: "Performance" },
                { name: "Noise Cancellation", value: false, type: "boolean", category: "Features" },
                { name: "Bluetooth Version", value: "4.2", type: "text", category: "Connectivity" },
                { name: "Water Resistant", value: false, type: "boolean", category: "Features" },
                { name: "Weight", value: 280, type: "number", category: "Physical" },
                { name: "Sound Quality", value: 4.0, type: "rating", category: "Performance" },
            ],
        },
        {
            id: "3",
            name: "Pro Wireless Headphones",
            price: 349,
            rating: 4.9,
            image: "/placeholder.svg?height=300&width=300&text=Headphones3",
            inStock: false,
            brand: "AudioTech",
            category: "Electronics",
            features: [
                { name: "Battery Life", value: "40 hours", type: "text", category: "Performance" },
                { name: "Noise Cancellation", value: true, type: "boolean", category: "Features" },
                { name: "Bluetooth Version", value: "5.2", type: "text", category: "Connectivity" },
                { name: "Water Resistant", value: true, type: "boolean", category: "Features" },
                { name: "Weight", value: 220, type: "number", category: "Physical" },
                { name: "Sound Quality", value: 5.0, type: "rating", category: "Performance" },
            ],
        },
    ]

    const displayProducts = products.length > 0 ? products : defaultProducts
    const displayAvailableProducts = availableProducts.length > 0 ? availableProducts : displayProducts

    // Initialize with first two products if none selected
    if (selectedProducts.length === 0 && displayProducts.length >= 2) {
        setSelectedProducts([displayProducts[0], displayProducts[1]])
    }

    const addProduct = (productId: string) => {
        const product = displayAvailableProducts.find((p) => p.id === productId)
        if (product && !selectedProducts.some((p) => p.id === productId)) {
            setSelectedProducts((prev) => [...prev, product])
        }
    }

    const removeProduct = (productId: string) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
    }

    const clearComparison = () => {
        setSelectedProducts([])
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    // Get all unique feature categories
    const allFeatureCategories = Array.from(
        new Set(selectedProducts.flatMap((product) => product.features.map((feature) => feature.category))),
    )

    // Get all unique features
    const allFeatures = Array.from(
        new Set(selectedProducts.flatMap((product) => product.features.map((feature) => feature.name))),
    )

    // Filter features by category and differences
    const filteredFeatures = allFeatures.filter((featureName) => {
        // Filter by category
        if (selectedCategory !== "all") {
            const featureCategory = selectedProducts[0]?.features.find((f) => f.name === featureName)?.category
            if (featureCategory !== selectedCategory) return false
        }

        // Filter by differences
        if (showDifferences) {
            const values = selectedProducts.map((product) => {
                const feature = product.features.find((f) => f.name === featureName)
                return feature ? feature.value : null
            })

            // Check if all values are the same
            const allSame = values.every((v) => v === values[0])
            if (allSame) return false
        }

        return true
    })

    const renderFeatureValue = (feature: ProductFeature | undefined) => {
        if (!feature) return <span className="text-gray-400">—</span>

        switch (feature.type) {
            case "boolean":
                return feature.value ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-600" />
            case "rating":
                return (
                    <div className="flex items-center">
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < Math.floor(feature.value as number) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="ml-1 text-sm">{feature.value}</span>
                    </div>
                )
            case "number":
                return <span>{feature.value}</span>
            default:
                return <span>{feature.value}</span>
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap items-center gap-4">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {allFeatureCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showDifferences"
                                    checked={showDifferences}
                                    onChange={() => setShowDifferences(!showDifferences)}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="showDifferences" className="text-sm">
                                    Show differences only
                                </label>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={clearComparison}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Clear
                            </Button>

                            <Select value="" onValueChange={(value) => addProduct(value)} disabled={selectedProducts.length >= 4}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Add product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {displayAvailableProducts
                                        .filter((p) => !selectedProducts.some((sp) => sp.id === p.id))
                                        .map((product) => (
                                            <SelectItem key={product.id} value={product.id}>
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <Card>
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 bg-gray-50 sticky left-0 z-10 min-w-[200px]">Product</th>
                                    {selectedProducts.map((product, index) => (
                                        <th key={product.id} className="p-4 min-w-[250px]">
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-0 right-0"
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <img
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    className="w-32 h-32 object-contain mx-auto mb-4"
                                                />
                                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                                                <div className="flex items-center justify-center mb-2">
                                                    <div className="flex">
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-1 text-sm">{product.rating}</span>
                                                </div>
                                                <div className="flex items-center justify-center mb-3">
                                                    <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(product.originalPrice)}
                              </span>
                                                    )}
                                                </div>
                                                <Button className="w-full" disabled={!product.inStock}>
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                                                </Button>
                                            </div>
                                        </th>
                                    ))}
                                    {selectedProducts.length < 4 && (
                                        <th className="p-4 min-w-[250px]">
                                            <div className="flex flex-col items-center justify-center h-64">
                                                <Select value="" onValueChange={(value) => addProduct(value)}>
                                                    <SelectTrigger className="w-48">
                                                        <SelectValue placeholder="Add product" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {displayAvailableProducts
                                                            .filter((p) => !selectedProducts.some((sp) => sp.id === p.id))
                                                            .map((product) => (
                                                                <SelectItem key={product.id} value={product.id}>
                                                                    {product.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </th>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {/* Group features by category */}
                                {allFeatureCategories
                                    .filter((category) => selectedCategory === "all" || category === selectedCategory)
                                    .map((category) => {
                                        const categoryFeatures = filteredFeatures.filter((featureName) => {
                                            const feature = selectedProducts[0]?.features.find((f) => f.name === featureName)
                                            return feature?.category === category
                                        })

                                        if (categoryFeatures.length === 0) return null

                                        return (
                                            <React.Fragment key={category}>
                                                <tr className="bg-gray-100">
                                                    <td colSpan={selectedProducts.length + 2} className="p-2 font-medium">
                                                        {category}
                                                    </td>
                                                </tr>
                                                {categoryFeatures.map((featureName) => (
                                                    <tr key={featureName} className="border-b hover:bg-gray-50">
                                                        <td className="p-4 font-medium bg-gray-50 sticky left-0 z-10">{featureName}</td>
                                                        {selectedProducts.map((product) => {
                                                            const feature = product.features.find((f) => f.name === featureName)
                                                            return (
                                                                <td key={`${product.id}-${featureName}`} className="p-4 text-center">
                                                                    {renderFeatureValue(feature)}
                                                                </td>
                                                            )
                                                        })}
                                                        {selectedProducts.length < 4 && <td className="p-4"></td>}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
