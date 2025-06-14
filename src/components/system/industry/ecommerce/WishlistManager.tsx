"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    Trash2,
    ShoppingCart,
    Share2,
    FolderPlus,
    Star,
    AlertCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react"

interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    image: string
    inStock: boolean
    category: string
    brand: string
    dateAdded: string
}

interface WishlistItem {
    id: string
    name: string
    products: Product[]
}

interface WishlistManagerProps {
    title?: string
    subtitle?: string
    wishlists?: WishlistItem[]
}

export default function WishlistManager({
                                            title = "My Wishlists",
                                            subtitle = "Manage your saved items and create custom collections",
                                            wishlists = [],
                                        }: WishlistManagerProps) {
    const [activeWishlist, setActiveWishlist] = useState<string | null>(null)
    const [expandedWishlists, setExpandedWishlists] = useState<string[]>([])
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const defaultWishlists: WishlistItem[] = [
        {
            id: "1",
            name: "Favorites",
            products: [
                {
                    id: "1",
                    name: "Premium Wireless Headphones",
                    price: 299,
                    originalPrice: 399,
                    rating: 4.8,
                    image: "/placeholder.svg?height=300&width=300&text=Headphones",
                    inStock: true,
                    category: "Electronics",
                    brand: "AudioTech",
                    dateAdded: "2023-12-15",
                },
                {
                    id: "2",
                    name: "Smart Fitness Watch",
                    price: 199,
                    rating: 4.6,
                    image: "/placeholder.svg?height=300&width=300&text=Watch",
                    inStock: true,
                    category: "Electronics",
                    brand: "FitTech",
                    dateAdded: "2023-12-10",
                },
            ],
        },
        {
            id: "2",
            name: "Gift Ideas",
            products: [
                {
                    id: "3",
                    name: "Organic Cotton T-Shirt",
                    price: 29,
                    rating: 4.4,
                    image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
                    inStock: false,
                    category: "Clothing",
                    brand: "EcoWear",
                    dateAdded: "2023-11-28",
                },
            ],
        },
        {
            id: "3",
            name: "Tech Upgrades",
            products: [
                {
                    id: "4",
                    name: "Professional Camera Lens",
                    price: 899,
                    originalPrice: 1099,
                    rating: 4.9,
                    image: "/placeholder.svg?height=300&width=300&text=Lens",
                    inStock: true,
                    category: "Photography",
                    brand: "LensMaster",
                    dateAdded: "2023-12-05",
                },
            ],
        },
    ]

    const displayWishlists = wishlists.length > 0 ? wishlists : defaultWishlists

    const toggleWishlistExpand = (id: string) => {
        setExpandedWishlists((prev) => (prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]))
    }

    const toggleProductSelection = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        )
    }

    const selectAllProducts = (wishlistId: string) => {
        const wishlist = displayWishlists.find((w) => w.id === wishlistId)
        if (!wishlist) return

        const allProductIds = wishlist.products.map((p) => p.id)

        // If all products are already selected, deselect all
        if (allProductIds.every((id) => selectedProducts.includes(id))) {
            setSelectedProducts((prev) => prev.filter((id) => !allProductIds.includes(id)))
        } else {
            // Otherwise select all
            setSelectedProducts((prev) => [...new Set([...prev, ...allProductIds])])
        }
    }

    const removeSelectedProducts = () => {
        // In a real app, this would call an API to remove the products
        console.log("Removing products:", selectedProducts)
        setSelectedProducts([])
    }

    const moveSelectedProducts = (targetWishlistId: string) => {
        // In a real app, this would call an API to move the products
        console.log("Moving products to wishlist:", targetWishlistId, selectedProducts)
        setSelectedProducts([])
    }

    const addSelectedToCart = () => {
        // In a real app, this would call an API to add products to cart
        console.log("Adding to cart:", selectedProducts)
        setSelectedProducts([])
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Wishlist Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Heart className="h-5 w-5 mr-2" />
                                        My Lists
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-1">
                                        {displayWishlists.map((wishlist) => (
                                            <Button
                                                key={wishlist.id}
                                                variant={activeWishlist === wishlist.id ? "default" : "ghost"}
                                                className="w-full justify-start rounded-none"
                                                onClick={() => setActiveWishlist(wishlist.id)}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span>{wishlist.name}</span>
                                                    <Badge variant="secondary">{wishlist.products.length}</Badge>
                                                </div>
                                            </Button>
                                        ))}
                                    </div>
                                    <Separator className="my-2" />
                                    <Button variant="ghost" className="w-full justify-start rounded-none">
                                        <FolderPlus className="h-4 w-4 mr-2" />
                                        Create New List
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-3">
                            {activeWishlist ? (
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>{displayWishlists.find((w) => w.id === activeWishlist)?.name}</CardTitle>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Share2 className="h-4 w-4 mr-2" />
                                                    Share
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <FolderPlus className="h-4 w-4 mr-2" />
                                                    Edit List
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {/* Actions Bar */}
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => selectAllProducts(activeWishlist)}>
                                                        Select All
                                                    </Button>
                                                    <span className="text-sm text-gray-600">{selectedProducts.length} selected</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={selectedProducts.length === 0}
                                                        onClick={removeSelectedProducts}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                    <Button variant="outline" size="sm" disabled={selectedProducts.length === 0}>
                                                        <FolderPlus className="h-4 w-4 mr-2" />
                                                        Move To
                                                    </Button>
                                                    <Button size="sm" disabled={selectedProducts.length === 0} onClick={addSelectedToCart}>
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Products */}
                                            <div className="space-y-4">
                                                {displayWishlists
                                                    .find((w) => w.id === activeWishlist)
                                                    ?.products.map((product) => (
                                                        <Card key={product.id} className="overflow-hidden">
                                                            <CardContent className="p-0">
                                                                <div className="flex flex-col sm:flex-row">
                                                                    <div className="relative sm:w-48 h-48">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedProducts.includes(product.id)}
                                                                            onChange={() => toggleProductSelection(product.id)}
                                                                            className="absolute top-4 left-4 h-5 w-5 z-10"
                                                                        />
                                                                        <img
                                                                            src={product.image || "/placeholder.svg"}
                                                                            alt={product.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                        {!product.inStock && (
                                                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                                <Badge variant="secondary">Out of Stock</Badge>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="p-4 flex-1">
                                                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                                            <div>
                                                                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                                                <p className="text-sm text-gray-600 mb-2">
                                                                                    {product.brand} • {product.category}
                                                                                </p>
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
                                                                                    <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                                                                                </div>
                                                                                <p className="text-sm text-gray-500">
                                                                                    Added on {new Date(product.dateAdded).toLocaleDateString()}
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <div className="text-xl font-bold text-blue-600">
                                                                                    {formatPrice(product.price)}
                                                                                </div>
                                                                                {product.originalPrice && (
                                                                                    <div className="text-sm text-gray-500 line-through">
                                                                                        {formatPrice(product.originalPrice)}
                                                                                    </div>
                                                                                )}
                                                                                {!product.inStock && (
                                                                                    <div className="flex items-center text-red-600 text-sm mt-2">
                                                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                                                        Out of stock
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                                            <Button size="sm" disabled={!product.inStock}>
                                                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                                                Add to Cart
                                                                            </Button>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => toggleProductSelection(product.id)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                                Remove
                                                                            </Button>
                                                                            <Button variant="outline" size="sm">
                                                                                <FolderPlus className="h-4 w-4 mr-2" />
                                                                                Move
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-6">
                                    {/* Collapsed Wishlists */}
                                    {displayWishlists.map((wishlist) => (
                                        <Card key={wishlist.id}>
                                            <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleWishlistExpand(wishlist.id)}>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="flex items-center">
                                                        <Heart className="h-5 w-5 mr-2" />
                                                        {wishlist.name}
                                                        <Badge variant="secondary" className="ml-2">
                                                            {wishlist.products.length}
                                                        </Badge>
                                                    </CardTitle>
                                                    <Button variant="ghost" size="sm">
                                                        {expandedWishlists.includes(wishlist.id) ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronDown className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            {expandedWishlists.includes(wishlist.id) && (
                                                <CardContent>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {wishlist.products.map((product) => (
                                                            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                                                <div className="relative">
                                                                    <img
                                                                        src={product.image || "/placeholder.svg"}
                                                                        alt={product.name}
                                                                        className="w-full h-40 object-cover"
                                                                    />
                                                                    {!product.inStock && (
                                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                            <Badge variant="secondary">Out of Stock</Badge>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <CardContent className="p-4">
                                                                    <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <div className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</div>
                                                                        <div className="flex items-center">
                                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                                            <span className="text-sm ml-1">{product.rating}</span>
                                                                        </div>
                                                                    </div>
                                                                    <Button size="sm" className="w-full" disabled={!product.inStock}>
                                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                                        Add to Cart
                                                                    </Button>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-end mt-4">
                                                        <Button variant="outline" size="sm" onClick={() => setActiveWishlist(wishlist.id)}>
                                                            View All
                                                        </Button>
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
