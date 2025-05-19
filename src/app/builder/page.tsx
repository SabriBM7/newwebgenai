"use client"

import { useState, useEffect } from "react"
import { COMPONENT_TYPES } from "@/lib/dataset"
import { componentRegistry } from "@/lib/component-library"
import ComponentFactory from "@/components/ComponentFactory"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowUp, ArrowDown, X, Settings, Eye, Code } from "lucide-react"
import Link from "next/link"

export default function BuilderPage() {
    const [selectedComponents, setSelectedComponents] = useState<any[]>([
        // Start with a default header
        {
            component: COMPONENT_TYPES.HEADER,
            variant: "corporate",
            props: {
                logo: "YourBrand",
                menu: [
                    { label: "Home", link: "#home" },
                    { label: "Features", link: "#features" },
                    { label: "Pricing", link: "#pricing" },
                    { label: "Contact", link: "#contact" },
                ],
                backgroundColor: "#ffffff",
                textColor: "#000000",
                sticky: true,
            },
        },
    ])

    // Get generated website data from URL if available
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const params = new URLSearchParams(window.location.search)
        const previewData = params.get("preview")

        if (previewData) {
            try {
                const websiteData = JSON.parse(decodeURIComponent(previewData))

                // Convert the generated content to component format
                const components = websiteData.sections.map((section: any) => ({
                    component: section.type,
                    variant: section.content.variant || "standard",
                    props: section.content,
                }))

                setSelectedComponents(components)
            } catch (error) {
                console.error("Error parsing preview data:", error)
            }
        }
    }, [])

    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const [showComponentDetails, setShowComponentDetails] = useState<number | null>(null)
    const [previewMode, setPreviewMode] = useState<"edit" | "preview" | "code">("edit")

    const addComponent = (component: any) => {
        setSelectedComponents([...selectedComponents, component])
    }

    const removeComponent = (index: number) => {
        const newComponents = [...selectedComponents]
        newComponents.splice(index, 1)
        setSelectedComponents(newComponents)
    }

    const moveComponent = (index: number, direction: "up" | "down") => {
        if ((direction === "up" && index === 0) || (direction === "down" && index === selectedComponents.length - 1)) {
            return
        }

        const newComponents = [...selectedComponents]
        const newIndex = direction === "up" ? index - 1 : index + 1
        const temp = newComponents[index]
        newComponents[index] = newComponents[newIndex]
        newComponents[newIndex] = temp
        setSelectedComponents(newComponents)
    }

    const toggleComponentDetails = (index: number) => {
        setShowComponentDetails(showComponentDetails === index ? null : index)
    }

    // Filter components based on search and category
    const filteredComponents = componentRegistry.filter((component) => {
        const matchesSearch =
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = activeCategory === "all" || component.category === activeCategory

        return matchesSearch && matchesCategory
    })

    // Group components by category for the sidebar
    const categories = ["all", ...new Set(componentRegistry.map((c) => c.category))]

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-background border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl">
                        Website Builder
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex border rounded-md overflow-hidden">
                            <Button
                                variant={previewMode === "edit" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setPreviewMode("edit")}
                                className="rounded-none"
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant={previewMode === "preview" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setPreviewMode("preview")}
                                className="rounded-none"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                            </Button>
                            <Button
                                variant={previewMode === "code" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setPreviewMode("code")}
                                className="rounded-none"
                            >
                                <Code className="h-4 w-4 mr-2" />
                                Code
                            </Button>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/showcase">View Examples</Link>
                        </Button>
                        <Button>Save & Publish</Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Component Library Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Component Library</CardTitle>
                                <CardDescription>Add components to build your page</CardDescription>
                                <div className="relative mt-2">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search components..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                                    <TabsList className="w-full flex flex-wrap h-auto">
                                        {categories.map((category) => (
                                            <TabsTrigger key={category} value={category} className="flex-1 capitalize">
                                                {category === "all" ? "All" : category}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    <div className="mt-4 space-y-4">
                                        {filteredComponents.length === 0 ? (
                                            <p className="text-center text-muted-foreground py-4">No components found</p>
                                        ) : (
                                            filteredComponents.map((component, index) => (
                                                <div key={index} className="border rounded-md p-4 bg-background">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium mb-1">{component.name}</h3>
                                                            <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                                                        </div>
                                                        {component.isNew && (
                                                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">New</span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {component.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <span key={tagIndex} className="bg-muted text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                                                        ))}
                                                    </div>

                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            addComponent({
                                                                component: component.category,
                                                                variant: component.style,
                                                                props: {}, // Default props would be filled in by the component
                                                            })
                                                        }
                                                        className="w-full"
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add to Page
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Preview</CardTitle>
                                <CardDescription>Your custom page layout</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {selectedComponents.length === 0 ? (
                                        <div className="text-center py-12 border rounded-md bg-muted/30">
                                            <p className="text-muted-foreground">Add components from the library to build your page</p>
                                        </div>
                                    ) : (
                                        selectedComponents.map((component, index) => (
                                            <div key={index} className="relative border rounded-md overflow-hidden">
                                                {previewMode === "edit" && (
                                                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-background"
                                                            onClick={() => moveComponent(index, "up")}
                                                            disabled={index === 0}
                                                        >
                                                            <ArrowUp className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-background"
                                                            onClick={() => moveComponent(index, "down")}
                                                            disabled={index === selectedComponents.length - 1}
                                                        >
                                                            <ArrowDown className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-background"
                                                            onClick={() => toggleComponentDetails(index)}
                                                        >
                                                            <Settings className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-background"
                                                            onClick={() => removeComponent(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}

                                                {previewMode === "edit" && (
                                                    <div className="p-4 border-b bg-muted/30">
                            <span className="text-sm font-medium capitalize">
                              {component.variant} {component.component}
                            </span>
                                                    </div>
                                                )}

                                                {previewMode === "code" ? (
                                                    <pre className="p-4 overflow-auto bg-muted text-sm">{JSON.stringify(component, null, 2)}</pre>
                                                ) : (
                                                    <div
                                                        className={
                                                            previewMode === "edit"
                                                                ? "scale-[0.8] origin-top transform border-4 border-transparent"
                                                                : ""
                                                        }
                                                    >
                                                        <ComponentFactory
                                                            component={component.component}
                                                            variant={component.variant}
                                                            props={component.props}
                                                        />
                                                    </div>
                                                )}

                                                {showComponentDetails === index && previewMode === "edit" && (
                                                    <div className="p-4 border-t bg-background">
                                                        <h4 className="font-medium mb-2">Component Settings</h4>
                                                        {/* This would be a dynamic form based on the component type */}
                                                        <p className="text-sm text-muted-foreground">
                                                            Component settings would go here. This would be a dynamic form based on the component
                                                            type.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
