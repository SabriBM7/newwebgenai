"use client"

import { useState } from "react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MenuItem {
    name: string
    description: string
    price: string
    image?: string
    tags?: string[]
    popular?: boolean
}

interface MenuCategory {
    name: string
    items: MenuItem[]
}

interface MenuSectionProps {
    title?: string
    subtitle?: string
    categories?: MenuCategory[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    style?: "cards" | "simple" | "elegant"
    showImages?: boolean
    keywords?: string[]
}

export default function MenuSection({
                                        title = "Our Menu",
                                        subtitle = "Made with fresh ingredients daily",
                                        categories,
                                        backgroundColor = "#ffffff",
                                        textColor = "#000000",
                                        accentColor = "#d4b062",
                                        textAlignment = "center",
                                        style = "elegant",
                                        showImages = true,
                                        keywords = [],
                                    }: MenuSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>("")

    const defaultCategories: MenuCategory[] = [
        {
            name: "Appetizers",
            items: [
                {
                    name: "Bruschetta",
                    description: "Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and basil",
                    price: "$8.99",
                    image: "/placeholder.svg?height=200&width=200&text=Bruschetta",
                    tags: ["Vegetarian"],
                    popular: true,
                },
                {
                    name: "Calamari",
                    description: "Crispy fried squid served with marinara sauce and lemon wedges",
                    price: "$12.99",
                    image: "/placeholder.svg?height=200&width=200&text=Calamari",
                },
                {
                    name: "Caprese Salad",
                    description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
                    price: "$10.99",
                    image: "/placeholder.svg?height=200&width=200&text=Caprese",
                    tags: ["Vegetarian", "Gluten-Free"],
                },
            ],
        },
        {
            name: "Main Courses",
            items: [
                {
                    name: "Spaghetti Carbonara",
                    description: "Classic pasta dish with pancetta, egg, hard cheese, and black pepper",
                    price: "$16.99",
                    image: "/placeholder.svg?height=200&width=200&text=Carbonara",
                    popular: true,
                },
                {
                    name: "Grilled Salmon",
                    description: "Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables",
                    price: "$22.99",
                    image: "/placeholder.svg?height=200&width=200&text=Salmon",
                    tags: ["Gluten-Free"],
                },
                {
                    name: "Margherita Pizza",
                    description: "Traditional pizza with tomato sauce, fresh mozzarella, and basil",
                    price: "$14.99",
                    image: "/placeholder.svg?height=200&width=200&text=Pizza",
                    tags: ["Vegetarian"],
                },
            ],
        },
        {
            name: "Desserts",
            items: [
                {
                    name: "Tiramisu",
                    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
                    price: "$8.99",
                    image: "/placeholder.svg?height=200&width=200&text=Tiramisu",
                    popular: true,
                },
                {
                    name: "Chocolate Lava Cake",
                    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
                    price: "$9.99",
                    image: "/placeholder.svg?height=200&width=200&text=Lava+Cake",
                },
                {
                    name: "Panna Cotta",
                    description: "Silky vanilla custard topped with berry compote",
                    price: "$7.99",
                    image: "/placeholder.svg?height=200&width=200&text=Panna+Cotta",
                    tags: ["Gluten-Free"],
                },
            ],
        },
    ]

    const displayCategories = categories || defaultCategories

    // Set the first category as active if none is selected
    if (activeCategory === "" && displayCategories.length > 0) {
        setActiveCategory(displayCategories[0].name)
    }

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="max-w-5xl mx-auto">
                    <TabsList className="w-full flex flex-wrap h-auto mb-8 justify-center">
                        {displayCategories.map((category) => (
                            <TabsTrigger key={category.name} value={category.name} className="px-6">
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {displayCategories.map((category) => (
                        <TabsContent key={category.name} value={category.name}>
                            <div className="space-y-8">
                                {style === "cards" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.items.map((item, index) => (
                                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                                {showImages && item.image && (
                                                    <div className="aspect-video relative">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {item.popular && (
                                                            <span
                                                                className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full"
                                                                style={{ backgroundColor: accentColor, color: backgroundColor }}
                                                            >
                                Popular
                              </span>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                                        <span className="font-bold" style={accentStyle}>
                              {item.price}
                            </span>
                                                    </div>
                                                    <p className="text-sm opacity-80 mb-3">{item.description}</p>
                                                    {item.tags && item.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className="text-xs px-2 py-1 rounded-full"
                                                                    style={{ backgroundColor: `${accentColor}20`, color: textColor }}
                                                                >
                                  {tag}
                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {style === "simple" && (
                                    <div className="space-y-6">
                                        {category.items.map((item, index) => (
                                            <div key={index} className="flex justify-between border-b pb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-bold">{item.name}</h3>
                                                        {item.popular && (
                                                            <span
                                                                className="text-xs px-2 py-0.5 rounded-full"
                                                                style={{ backgroundColor: accentColor, color: backgroundColor }}
                                                            >
                                Popular
                              </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm opacity-80 mt-1">{item.description}</p>
                                                    {item.tags && item.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {item.tags.map((tag, tagIndex) => (
                                                                <span key={tagIndex} className="text-xs" style={{ color: accentColor }}>
                                  {tag}
                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4 font-bold" style={accentStyle}>
                                                    {item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {style === "elegant" && (
                                    <div className="space-y-12">
                                        {category.items.map((item, index) => (
                                            <div key={index} className="flex gap-6">
                                                {showImages && item.image && (
                                                    <div className="hidden md:block w-32 h-32 flex-shrink-0">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-md"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div
                                                        className="flex items-baseline justify-between border-b border-dashed pb-2 mb-2"
                                                        style={{ borderColor: accentColor }}
                                                    >
                                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                                            {item.name}
                                                            {item.popular && (
                                                                <span
                                                                    className="text-xs px-2 py-0.5 rounded-full"
                                                                    style={{ backgroundColor: accentColor, color: backgroundColor }}
                                                                >
                                  Popular
                                </span>
                                                            )}
                                                        </h3>
                                                        <span className="font-bold text-lg" style={accentStyle}>
                              {item.price}
                            </span>
                                                    </div>
                                                    <p className="opacity-80">{item.description}</p>
                                                    {item.tags && item.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {item.tags.map((tag, tagIndex) => (
                                                                <span key={tagIndex} className="text-xs italic" style={{ color: accentColor }}>
                                  {tag}
                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
