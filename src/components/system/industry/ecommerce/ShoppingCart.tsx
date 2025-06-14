"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react"

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    variant?: string
}

interface ShoppingCartProps {
    title?: string
    items?: CartItem[]
    backgroundColor?: string
    textColor?: string
}

export default function ShoppingCart({
                                         title = "Shopping Cart",
                                         items = [],
                                         backgroundColor = "bg-white",
                                         textColor = "text-gray-900",
                                     }: ShoppingCartProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(
        items.length > 0
            ? items
            : [
                {
                    id: "1",
                    name: "Premium Wireless Headphones",
                    price: 299,
                    quantity: 1,
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
                    variant: "Black",
                },
                {
                    id: "2",
                    name: "Smart Fitness Watch",
                    price: 199,
                    quantity: 2,
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
                    variant: "Silver",
                },
                {
                    id: "3",
                    name: "Organic Cotton T-Shirt",
                    price: 29,
                    quantity: 3,
                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
                    variant: "Medium, Blue",
                },
            ],
    )

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            setCartItems(cartItems.filter((item) => item.id !== id))
        } else {
            setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
        }
    }

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 15
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    if (cartItems.length === 0) {
        return (
            <section className={`py-16 ${backgroundColor}`}>
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <Button>Continue Shopping</Button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className={`text-3xl font-bold mb-8 ${textColor}`}>{title}</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            {item.variant && <p className="text-gray-600 text-sm">{item.variant}</p>}
                                            <p className="text-blue-600 font-bold text-lg">${item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                                                className="w-16 text-center"
                                                min="0"
                                            />

                                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>

                                {shipping === 0 && (
                                    <Badge variant="secondary" className="w-full justify-center">
                                        Free shipping on orders over $100!
                                    </Badge>
                                )}

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button className="w-full" size="lg">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Proceed to Checkout
                                    </Button>

                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </div>

                                <div className="text-center text-sm text-gray-600 pt-4">
                                    <p>Secure checkout with SSL encryption</p>
                                    <p>30-day return policy</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
