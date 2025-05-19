"use client"

import type React from "react"

import { useState } from "react"
import FixedComponentFactory from "@/components/fixed-component-factory"
import { Button } from "@/components/ui/button"

const sampleComponents = [
    {
        type: "header",
        variant: "creative",
        props: {
            logo: "Company",
            menu: [
                { label: "Home", link: "#" },
                { label: "Features", link: "#features" },
                { label: "Pricing", link: "#pricing" },
                { label: "Contact", link: "#contact" },
            ],
        },
    },
    {
        type: "hero",
        variant: "standard",
        props: {
            title: "Build beautiful websites with AI",
            subtitle: "Create stunning, responsive websites in minutes with our AI-powered website generator.",
            description: "",
            cta: "Get Started",
            ctaLink: "#",
            secondaryCta: "Learn More",
            secondaryCtaLink: "#",
        },
    },
    {
        type: "features",
        variant: "default",
        props: {
            title: "Features",
            subtitle: "Everything you need to build amazing websites",
            features: [
                {
                    title: "AI-Powered",
                    description: "Our AI generates beautiful websites based on your requirements.",
                    icon: "sparkles",
                },
                {
                    title: "Responsive",
                    description: "All websites are fully responsive and work on all devices.",
                    icon: "smartphone",
                },
                {
                    title: "Customizable",
                    description: "Easily customize your website with our intuitive editor.",
                    icon: "settings",
                },
            ],
        },
    },
]

export default function DebugComponentsPage() {
    const [selectedComponent, setSelectedComponent] = useState(sampleComponents[0])
    const [componentJson, setComponentJson] = useState(JSON.stringify(sampleComponents[0], null, 2))
    const [error, setError] = useState<string | null>(null)

    const handleComponentChange = (index: number) => {
        setSelectedComponent(sampleComponents[index])
        setComponentJson(JSON.stringify(sampleComponents[index], null, 2))
        setError(null)
    }

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComponentJson(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setSelectedComponent(parsed)
            setError(null)
        } catch (err) {
            setError("Invalid JSON")
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Debug Components</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Component JSON</h2>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {sampleComponents.map((component, index) => (
                                <Button
                                    key={index}
                                    variant={selectedComponent === component ? "default" : "outline"}
                                    onClick={() => handleComponentChange(index)}
                                >
                                    {component.type} ({component.variant})
                                </Button>
                            ))}
                        </div>
                        <textarea
                            value={componentJson}
                            onChange={handleJsonChange}
                            className="w-full h-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-900 dark:text-white font-mono text-sm"
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Component Preview</h2>
                    <div className="bg-white rounded-lg p-4 min-h-[400px] border border-gray-200">
                        {!error && (
                            <FixedComponentFactory
                                component={selectedComponent.type}
                                variant={selectedComponent.variant}
                                props={selectedComponent.props}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
