"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface MenuItem {
    name: string
    description: string
    price: string
    image?: string
    category: string
}

interface MenuSectionProps {
    title?: string
    subtitle?: string
    categories?: string[]
    items?: MenuItem[]
    className?: string
}

export function MenuSection({
                                title = "Our Menu",
                                subtitle = "Delicious Options",
                                categories = ["All"],
                                items = [],
                                className,
                            }: MenuSectionProps) {
    const [activeCategory, setActiveCategory] = useState(categories[0] || "All")

    // Filter items by category
    const filteredItems = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory)

    return (
        <section className={cn("py-20 bg-white", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
                </div>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {["All", ...categories].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "px-6 py-2 rounded-full font-medium transition-colors",
                                    activeCategory === category
                                        ? "bg-amber-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {/* Menu Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {item.image && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                    <span className="text-lg font-bold text-amber-600">{item.price}</span>
                                </div>
                                <p className="text-gray-600 mb-3">{item.description}</p>
                                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
                  {item.category}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No items found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MenuSection
