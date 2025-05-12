"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getTemplateById } from "@/lib/templates"
import TechHeader from "@/components/headers/tech-header"
import CreativeHeader from "@/components/headers/creative-header"
import CorporateHeader from "@/components/headers/corporate-header"
import TechHero from "@/components/heroes/tech-hero"
import CreativeHero from "@/components/heroes/creative-hero"
import CorporateHero from "@/components/heroes/corporate-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from 'lucide-react'
import Link from "next/link"

export default function CustomizePage({ params }: { params: { template: string } }) {
    const router = useRouter()
    const [template, setTemplate] = useState<any>(null)
    const [headerProps, setHeaderProps] = useState<any>({})
    const [heroProps, setHeroProps] = useState<any>({})

    useEffect(() => {
        const loadedTemplate = getTemplateById(params.template)
        if (loadedTemplate) {
            setTemplate(loadedTemplate)
            setHeaderProps(loadedTemplate.headerProps)
            setHeroProps(loadedTemplate.heroProps)
        } else {
            router.push("/templates")
        }
    }, [params.template, router])

    if (!template) {
        return <div className="p-12 text-center">Loading...</div>
    }

    // Update a specific header prop
    const updateHeaderProp = (key: string, value: any) => {
        setHeaderProps((prev: any) => ({
            ...prev,
            [key]: value,
        }))
    }

    // Update a specific hero prop
    const updateHeroProp = (key: string, value: any) => {
        setHeroProps((prev: any) => ({
            ...prev,
            [key]: value,
        }))
    }

    // Render the appropriate header based on template type
    const renderHeader = () => {
        switch (template.type) {
            case "tech":
                return <TechHeader {...headerProps} />
            case "creative":
                return <CreativeHeader {...headerProps} />
            case "corporate":
                return <CorporateHeader {...headerProps} />
            default:
                return null
        }
    }

    // Render the appropriate hero based on template type
    const renderHero = () => {
        switch (template.type) {
            case "tech":
                return <TechHero {...heroProps} />
            case "creative":
                return <CreativeHero {...heroProps} />
            case "corporate":
                return <CorporateHero {...heroProps} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-background border-b p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/templates/${params.template}`}>
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Preview
                        </Link>
                    </Button>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Customizing: {template.name}</span>
                        <Button size="sm">
                            <Save className="h-4 w-4 mr-2" /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
                {/* Preview Panel */}
                <div className="w-full md:w-2/3 overflow-auto">
                    {renderHeader()}
                    {renderHero()}
                </div>

                {/* Customization Panel */}
                <div className="w-full md:w-1/3 border-l bg-muted/30 p-4 overflow-auto">
                    <Tabs defaultValue="header">
                        <TabsList className="w-full">
                            <TabsTrigger value="header">Header</TabsTrigger>
                            <TabsTrigger value="hero">Hero</TabsTrigger>
                            <TabsTrigger value="keywords">Keywords</TabsTrigger>
                        </TabsList>

                        <TabsContent value="header" className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="logo">Logo Text</Label>
                                <Input
                                    id="logo"
                                    value={headerProps.logo || ""}
                                    onChange={(e) => updateHeaderProp("logo", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="backgroundColor">Background Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="backgroundColor"
                                        value={headerProps.backgroundColor || ""}
                                        onChange={(e) => updateHeaderProp("backgroundColor", e.target.value)}
                                    />
                                    <input
                                        type="color"
                                        value={headerProps.backgroundColor || "#ffffff"}
                                        onChange={(e) => updateHeaderProp("backgroundColor", e.target.value)}
                                        className="w-10 h-10 p-1 rounded border"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="textColor">Text Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="textColor"
                                        value={headerProps.textColor || ""}
                                        onChange={(e) => updateHeaderProp("textColor", e.target.value)}
                                    />
                                    <input
                                        type="color"
                                        value={headerProps.textColor || "#000000"}
                                        onChange={(e) => updateHeaderProp("textColor", e.target.value)}
                                        className="w-10 h-10 p-1 rounded border"
                                    />
                                </div>
                            </div>

                            {/* Additional header customization options would go here */}
                        </TabsContent>

                        <TabsContent value="hero" className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={heroProps.title || ""}
                                    onChange={(e) => updateHeroProp("title", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={heroProps.subtitle || ""}
                                    onChange={(e) => updateHeroProp("subtitle", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={heroProps.description || ""}
                                    onChange={(e) => updateHeroProp("description", e.target.value)}
                                    className="w-full min-h-[100px] p-2 rounded-md border"
                                />
                            </div>

                            {/* Additional hero customization options would go here */}
                        </TabsContent>

                        <TabsContent value="keywords" className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                                <Input
                                    id="keywords"
                                    value={(headerProps.keywords || []).join(", ")}
                                    onChange={(e) => {
                                        const keywordsArray = e.target.value
                                            .split(",")
                                            .map((k) => k.trim())
                                            .filter(Boolean)
                                        updateHeaderProp("keywords", keywordsArray)
                                        updateHeroProp("keywords", keywordsArray)
                                    }}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    These keywords will influence the style and content of your website
                                </p>
                            </div>

                            <div className="mt-4">
                                <Label>Current Keywords</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(headerProps.keywords || []).map((keyword: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1"
                                        >
                                            <span>{keyword}</span>
                                            <button
                                                onClick={() => {
                                                    const newKeywords = [...headerProps.keywords]
                                                    newKeywords.splice(idx, 1)
                                                    updateHeaderProp("keywords", newKeywords)
                                                    updateHeroProp("keywords", newKeywords)
                                                }}
                                                className="text-primary hover:text-primary/80"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}