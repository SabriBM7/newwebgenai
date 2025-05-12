"use client"

import { useState } from "react"
import { COMPONENT_TYPES, sampleDataset } from "@/lib/dataset"
import ComponentFactory from "@/components/ComponentFactory"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function BuilderPage() {
    const [selectedComponents, setSelectedComponents] = useState<any[]>([
        // Start with a default header
        sampleDataset.find((item) => item.component === COMPONENT_TYPES.HEADER && item.variant === "corporate"),
    ])

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

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-background border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl">
                        Component Builder
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/showcase">View Showcase</Link>
                        </Button>
                        <Button>Save Layout</Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Component Library */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Component Library</CardTitle>
                                <CardDescription>Drag and drop components to build your page</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="headers">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="headers" className="flex-1">
                                            Headers
                                        </TabsTrigger>
                                        <TabsTrigger value="heroes" className="flex-1">
                                            Heroes
                                        </TabsTrigger>
                                        <TabsTrigger value="features" className="flex-1">
                                            Features
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="headers" className="space-y-4 mt-4">
                                        {sampleDataset
                                            .filter((item) => item.component === COMPONENT_TYPES.HEADER)
                                            .map((component, index) => (
                                                <div key={index} className="border rounded-md p-4 bg-background">
                                                    <h3 className="font-medium mb-2 capitalize">{component.variant} Header</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        A {component.variant} style header with navigation and branding.
                                                    </p>
                                                    <Button size="sm" onClick={() => addComponent(component)}>
                                                        Add to Page
                                                    </Button>
                                                </div>
                                            ))}
                                    </TabsContent>
                                    <TabsContent value="heroes" className="space-y-4 mt-4">
                                        {sampleDataset
                                            .filter((item) => item.component === COMPONENT_TYPES.HERO)
                                            .map((component, index) => (
                                                <div key={index} className="border rounded-md p-4 bg-background">
                                                    <h3 className="font-medium mb-2 capitalize">{component.variant} Hero</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        A {component.variant} style hero section with title, description, and call-to-action.
                                                    </p>
                                                    <Button size="sm" onClick={() => addComponent(component)}>
                                                        Add to Page
                                                    </Button>
                                                </div>
                                            ))}
                                    </TabsContent>
                                    <TabsContent value="features" className="space-y-4 mt-4">
                                        {sampleDataset
                                            .filter((item) => item.component === COMPONENT_TYPES.FEATURES)
                                            .map((component, index) => (
                                                <div key={index} className="border rounded-md p-4 bg-background">
                                                    <h3 className="font-medium mb-2 capitalize">{component.variant} Features</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        A {component.variant} style features section to showcase your product features.
                                                    </p>
                                                    <Button size="sm" onClick={() => addComponent(component)}>
                                                        Add to Page
                                                    </Button>
                                                </div>
                                            ))}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-2">
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
                                                <div className="absolute top-2 right-2 z-10 flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-background"
                                                        onClick={() => moveComponent(index, "up")}
                                                        disabled={index === 0}
                                                    >
                                                        ↑
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-background"
                                                        onClick={() => moveComponent(index, "down")}
                                                        disabled={index === selectedComponents.length - 1}
                                                    >
                                                        ↓
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-background"
                                                        onClick={() => removeComponent(index)}
                                                    >
                                                        ×
                                                    </Button>
                                                </div>
                                                <div className="p-4 border-b bg-muted/30">
                          <span className="text-sm font-medium capitalize">
                            {component.variant} {component.component}
                          </span>
                                                </div>
                                                <div className="scale-[0.8] origin-top transform border-4 border-transparent">
                                                    <ComponentFactory
                                                        component={component.component}
                                                        variant={component.variant}
                                                        props={component.props}
                                                    />
                                                </div>
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
