"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { ArrowRight, ArrowLeft } from "lucide-react"

export default function DemoSection() {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Watch how easily you can create a website with our AI assistant
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-8 md:mt-12 max-w-5xl">
                    <Tabs defaultValue="demo" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
                            <TabsTrigger value="video">Video Walkthrough</TabsTrigger>
                        </TabsList>
                        <TabsContent value="demo" className="border rounded-lg p-4 mt-4 bg-background">
                            <div className="relative overflow-hidden rounded-lg border shadow-xl aspect-video">
                                {currentStep === 1 && (
                                    <div className="p-4 h-full flex flex-col">
                                        <div className="text-lg font-semibold mb-4">Step 1: Describe Your Website</div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex flex-col space-y-4 flex-1">
                                                <div className="flex justify-start">
                                                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                                                        Hello! I'm your AI website assistant. What kind of website would you like to create today?
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                                                        I need a website for my bakery business. It should showcase our products, location, and
                                                        allow customers to place orders.
                                                    </div>
                                                </div>
                                                <div className="flex justify-start">
                                                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                                                        Great! I'll help you create a bakery website. What's the name of your bakery? And do you
                                                        have any color preferences for your website?
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Type your response..."
                                                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    disabled
                                                />
                                                <Button size="sm" disabled>
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="p-4 h-full flex flex-col">
                                        <div className="text-lg font-semibold mb-4">Step 2: AI Generates Options</div>
                                        <div className="grid grid-cols-2 gap-4 flex-1">
                                            <div className="border rounded-lg p-2 hover:border-primary cursor-pointer transition-colors">
                                                <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center text-sm text-muted-foreground">
                                                    Template Preview 1
                                                </div>
                                                <div className="text-sm font-medium">Modern Bakery</div>
                                                <div className="text-xs text-muted-foreground">Clean design with product focus</div>
                                            </div>
                                            <div className="border rounded-lg p-2 hover:border-primary cursor-pointer transition-colors">
                                                <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center text-sm text-muted-foreground">
                                                    Template Preview 2
                                                </div>
                                                <div className="text-sm font-medium">Artisan Baker</div>
                                                <div className="text-xs text-muted-foreground">Rustic style with warm colors</div>
                                            </div>
                                            <div className="border rounded-lg p-2 hover:border-primary cursor-pointer transition-colors">
                                                <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center text-sm text-muted-foreground">
                                                    Template Preview 3
                                                </div>
                                                <div className="text-sm font-medium">Sweet Shop</div>
                                                <div className="text-xs text-muted-foreground">Colorful design with order focus</div>
                                            </div>
                                            <div className="border rounded-lg p-2 hover:border-primary cursor-pointer transition-colors">
                                                <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center text-sm text-muted-foreground">
                                                    Template Preview 4
                                                </div>
                                                <div className="text-sm font-medium">Bakery Cafe</div>
                                                <div className="text-xs text-muted-foreground">Elegant design with menu focus</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="p-4 h-full flex flex-col">
                                        <div className="text-lg font-semibold mb-4">Step 3: Customize & Publish</div>
                                        <div className="flex-1 grid grid-cols-4 gap-4">
                                            <div className="col-span-1 bg-background border rounded-lg p-2">
                                                <div className="text-sm font-medium mb-2">Elements</div>
                                                <div className="space-y-2">
                                                    <div className="border rounded p-1 text-xs cursor-move">Header</div>
                                                    <div className="border rounded p-1 text-xs cursor-move">Hero Image</div>
                                                    <div className="border rounded p-1 text-xs cursor-move">Product Gallery</div>
                                                    <div className="border rounded p-1 text-xs cursor-move">About Section</div>
                                                    <div className="border rounded p-1 text-xs cursor-move">Contact Form</div>
                                                    <div className="border rounded p-1 text-xs cursor-move">Footer</div>
                                                </div>
                                            </div>
                                            <div className="col-span-3 bg-muted rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-sm text-muted-foreground mb-2">Website Preview</div>
                                                    <div className="text-xs text-muted-foreground">(Drag and drop elements to customize)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button>Publish Website</Button>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-4 right-4 flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 1}>
                                        <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleNext} disabled={currentStep === totalSteps}>
                                        Next <ArrowRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="video" className="border rounded-lg p-4 mt-4 bg-background">
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-lg font-medium mb-2">Video Walkthrough</div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Watch a complete demonstration of the website creation process
                                    </p>
                                    <Button>Play Video</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}

