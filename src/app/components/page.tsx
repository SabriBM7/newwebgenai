"use client"

import { useState } from "react"
import { componentRegistry, type ComponentCategory, type ComponentStyle } from "@/lib/component-library"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ComponentBrowserPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<ComponentCategory | "all">("all")
    const [selectedStyles, setSelectedStyles] = useState<ComponentStyle[]>([])
    const [showNewOnly, setShowNewOnly] = useState(false)
    const [expandedComponent, setExpandedComponent] = useState<string | null>(null)

    // All available categories
    const categories: ("all" | ComponentCategory)[] = [
        "all",
        "header",
        "hero",
        "features",
        "content",
        "testimonials",
        "pricing",
        "stats",
        "team",
        "faq",
        "contact",
        "cta",
        "footer",
        "gallery",
        "blog",
        "newsletter",
    ]

    // All available styles
    const styles: ComponentStyle[] = [
        "minimal",
        "modern",
        "classic",
        "bold",
        "gradient",
        "outlined",
        "card",
        "grid",
        "list",
        "split",
        "centered",
        "animated",
    ]

    // Filter components based on search, category, and filters
    const filteredComponents = componentRegistry.filter((component) => {
        const matchesSearch =
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = activeCategory === "all" || component.category === activeCategory

        const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(component.style)

        const matchesNewFilter = !showNewOnly || component.isNew === true

        return matchesSearch && matchesCategory && matchesStyle && matchesNewFilter
    })

    const toggleStyle = (style: ComponentStyle) => {
        if (selectedStyles.includes(style)) {
            setSelectedStyles(selectedStyles.filter((s) => s !== style))
        } else {
            setSelectedStyles([...selectedStyles, style])
        }
    }

    const toggleExpandComponent = (id: string) => {
        setExpandedComponent(expandedComponent === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-background border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl">
                        Component Browser
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/builder">
                                Open Builder
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Component Library</h1>
                    <p className="text-muted-foreground">
                        Browse our collection of pre-built components to create your perfect website
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search components..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                    {(selectedStyles.length > 0 || showNewOnly) && (
                                        <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {selectedStyles.length + (showNewOnly ? 1 : 0)}
                    </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Styles</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {styles.map((style) => (
                                        <DropdownMenuItem key={style} onSelect={(e) => e.preventDefault()}>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`style-${style}`}
                                                    checked={selectedStyles.includes(style)}
                                                    onCheckedChange={() => toggleStyle(style)}
                                                />
                                                <label
                                                    htmlFor={`style-${style}`}
                                                    className="text-sm capitalize cursor-pointer flex-1"
                                                    onClick={() => toggleStyle(style)}
                                                >
                                                    {style}
                                                </label>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="new-only"
                                            checked={showNewOnly}
                                            onCheckedChange={() => setShowNewOnly(!showNewOnly)}
                                        />
                                        <label
                                            htmlFor="new-only"
                                            className="text-sm cursor-pointer flex-1"
                                            onClick={() => setShowNewOnly(!showNewOnly)}
                                        >
                                            New components only
                                        </label>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedStyles([])
                                setShowNewOnly(false)
                                setSearchTerm("")
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
                    <TabsList className="w-full flex flex-wrap h-auto mb-8">
                        {categories.map((category) => (
                            <TabsTrigger key={category} value={category} className="flex-1 capitalize">
                                {category === "all" ? "All Components" : category}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredComponents.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No components found matching your criteria</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSelectedStyles([])
                                        setShowNewOnly(false)
                                        setSearchTerm("")
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            filteredComponents.map((component) => (
                                <Card key={component.id} className="overflow-hidden">
                                    <div className="aspect-video bg-muted relative">
                                        {component.screenshot ? (
                                            <img
                                                src={component.screenshot || "/placeholder.svg"}
                                                alt={component.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                Preview not available
                                            </div>
                                        )}

                                        {component.isNew && (
                                            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                                        )}
                                    </div>

                                    <CardHeader>
                                        <CardTitle>{component.name}</CardTitle>
                                        <CardDescription>{component.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full capitalize">
                        {component.category}
                      </span>
                                            <span className="bg-muted text-xs px-2 py-1 rounded-full capitalize">{component.style}</span>
                                            {component.tags.slice(0, 2).map((tag, tagIndex) => (
                                                <span key={tagIndex} className="bg-muted text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between">
                                            <Button variant="outline" size="sm" onClick={() => toggleExpandComponent(component.id)}>
                                                {expandedComponent === component.id ? "Hide Preview" : "View Preview"}
                                            </Button>

                                            <Button size="sm" asChild>
                                                <Link href={`/builder?add=${component.id}`}>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Use Component
                                                </Link>
                                            </Button>
                                        </div>

                                        {expandedComponent === component.id && (
                                            <div className="mt-4 border rounded-md overflow-hidden">
                                                <div className="p-4">
                                                    {/* This would render a preview of the component */}
                                                    <div className="text-center py-8 bg-muted/30">Component preview would be rendered here</div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </Tabs>
            </main>
        </div>
    )
}
