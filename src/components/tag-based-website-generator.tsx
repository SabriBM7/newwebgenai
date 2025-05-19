"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { COMPONENT_TYPES, sampleDataset } from "@/lib/dataset"
import TagBasedWebsiteRenderer from "./tag-based-website-renderer"

const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "marketing", label: "Marketing" },
    { value: "realestate", label: "Real Estate" },
    { value: "creative", label: "Creative/Design" },
    { value: "restaurant", label: "Restaurant" },
    { value: "fitness", label: "Fitness" },
    { value: "nonprofit", label: "Non-Profit" },
]

// Extract all unique keywords from the dataset
const allKeywords = Array.from(
    new Set(sampleDataset.flatMap((item) => (item.props.keywords || []).map((kw: string) => kw.toLowerCase()))),
).sort()

// Group keywords by component type
const keywordsByComponentType: Record<string, string[]> = {}
Object.values(COMPONENT_TYPES).forEach((type) => {
    keywordsByComponentType[type.toLowerCase()] = Array.from(
        new Set(
            sampleDataset
                .filter((item) => item.component.toLowerCase() === type.toLowerCase())
                .flatMap((item) => (item.props.keywords || []).map((kw: string) => kw.toLowerCase())),
        ),
    ).sort()
})

function findBestMatchingComponents(description: string, industry: string, businessName: string): any[] {
    // Convert description to lowercase for case-insensitive matching
    const lowerDescription = description.toLowerCase()
    const lowerIndustry = industry.toLowerCase()

    // Extract keywords from description
    const descriptionWords = new Set(lowerDescription.split(/\s+/))

    // Define the structure we want for a complete website
    const requiredSections = [
        COMPONENT_TYPES.HEADER,
        COMPONENT_TYPES.HERO,
        COMPONENT_TYPES.FEATURES,
        COMPONENT_TYPES.TESTIMONIALS,
        COMPONENT_TYPES.CTA,
        COMPONENT_TYPES.FOOTER,
    ]

    // Find the best matching component for each section type
    const selectedComponents = requiredSections
        .map((sectionType) => {
            // Get all components of this type
            const componentsOfType = sampleDataset.filter(
                (item) => item.component.toLowerCase() === sectionType.toLowerCase(),
            )

            if (componentsOfType.length === 0) return null

            // Score each component based on keyword matches
            const scoredComponents = componentsOfType.map((component) => {
                let score = 0
                const keywords = component.props.keywords || []

                // Score based on keyword matches in description
                keywords.forEach((keyword: string) => {
                    if (lowerDescription.includes(keyword.toLowerCase())) {
                        score += 3
                    }
                })

                // Score based on industry relevance
                keywords.forEach((keyword: string) => {
                    if (keyword.toLowerCase().includes(lowerIndustry)) {
                        score += 2
                    }
                })

                // Score based on individual word matches
                keywords.forEach((keyword: string) => {
                    if (descriptionWords.has(keyword.toLowerCase())) {
                        score += 1
                    }
                })

                return { component, score }
            })

            // Sort by score and get the best match
            scoredComponents.sort((a, b) => b.score - a.score)
            return scoredComponents[0]?.component || componentsOfType[0]
        })
        .filter(Boolean)

    // Customize the selected components
    return selectedComponents.map((component) => {
        // Create a deep copy to avoid modifying the original
        const customized = JSON.parse(JSON.stringify(component))

        // Customize based on component type
        switch (customized.component) {
            case COMPONENT_TYPES.HEADER:
                // Set logo to business name
                customized.props.logo = businessName

                // Customize menu based on industry
                if (industry === "ecommerce") {
                    customized.props.menu = [
                        { label: "Home", link: "#home" },
                        { label: "Shop", link: "#shop" },
                        { label: "Categories", link: "#categories" },
                        { label: "About", link: "#about" },
                        { label: "Contact", link: "#contact" },
                    ]
                } else if (industry === "restaurant") {
                    customized.props.menu = [
                        { label: "Home", link: "#home" },
                        { label: "Menu", link: "#menu" },
                        { label: "Reservations", link: "#reservations" },
                        { label: "About", link: "#about" },
                        { label: "Contact", link: "#contact" },
                    ]
                }
                break

            case COMPONENT_TYPES.HERO:
                // Set title to business name
                customized.props.title = businessName

                // Set subtitle based on industry
                if (industry === "technology") {
                    customized.props.subtitle = "Innovative Solutions for a Digital World"
                } else if (industry === "education") {
                    customized.props.subtitle = "Empowering Minds, Shaping Futures"
                } else if (industry === "restaurant") {
                    customized.props.subtitle = "Exquisite Flavors, Memorable Experiences"
                } else if (industry === "ecommerce") {
                    customized.props.subtitle = "Quality Products, Exceptional Service"
                } else {
                    customized.props.subtitle = "Excellence in Everything We Do"
                }

                // Set description from user input
                customized.props.description = description

                // Set appropriate button text
                if (industry === "ecommerce") {
                    customized.props.buttonText = "Shop Now"
                } else if (industry === "restaurant") {
                    customized.props.buttonText = "View Menu"
                    customized.props.secondaryButtonText = "Make Reservation"
                } else {
                    customized.props.buttonText = "Get Started"
                    customized.props.secondaryButtonText = "Learn More"
                }

                // Set appropriate image
                customized.props.imageUrl = getIndustryImage(industry)
                break

            case COMPONENT_TYPES.FEATURES:
                // Customize features title
                customized.props.title = `Why Choose ${businessName}`

                // Customize features based on industry
                if (industry === "restaurant") {
                    customized.props.features = [
                        {
                            title: "Exquisite Cuisine",
                            description: "Our chef creates unforgettable dishes using only the finest ingredients.",
                            icon: "Utensils",
                        },
                        {
                            title: "Elegant Atmosphere",
                            description: "Enjoy your meal in our beautifully designed dining space.",
                            icon: "Star",
                        },
                        {
                            title: "Exceptional Service",
                            description: "Our staff is dedicated to providing an outstanding dining experience.",
                            icon: "Award",
                        },
                        {
                            title: "Private Events",
                            description: "Host your special occasions in our private dining areas.",
                            icon: "Calendar",
                        },
                    ]
                } else if (industry === "ecommerce") {
                    customized.props.features = [
                        {
                            title: "Quality Products",
                            description: "We offer only the highest quality products for our customers.",
                            icon: "CheckCircle",
                        },
                        {
                            title: "Fast Shipping",
                            description: "Get your orders delivered quickly with our expedited shipping.",
                            icon: "Truck",
                        },
                        {
                            title: "Secure Payments",
                            description: "Shop with confidence knowing your transactions are protected.",
                            icon: "Shield",
                        },
                        {
                            title: "Easy Returns",
                            description: "Our hassle-free return policy ensures your satisfaction.",
                            icon: "RefreshCw",
                        },
                    ]
                }
                break

            case COMPONENT_TYPES.TESTIMONIALS:
                // Customize testimonials title
                customized.props.title = `What Our Clients Say About ${businessName}`
                break

            case COMPONENT_TYPES.CTA:
                // Customize CTA based on industry
                if (industry === "ecommerce") {
                    customized.props.title = "Shop Our Latest Collection"
                    customized.props.description = "Discover our newest products and exclusive deals."
                    customized.props.buttonText = "Shop Now"
                } else if (industry === "restaurant") {
                    customized.props.title = "Reserve Your Table Today"
                    customized.props.description = "Experience our exceptional cuisine and service."
                    customized.props.buttonText = "Make Reservation"
                } else {
                    customized.props.title = `Ready to Get Started with ${businessName}?`
                    customized.props.description = "Join our satisfied customers and take your business to the next level."
                    customized.props.buttonText = "Contact Us"
                }
                break

            case COMPONENT_TYPES.FOOTER:
                // Set the company name in the footer
                customized.props.logo = businessName
                customized.props.copyright = `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`
                break
        }

        return customized
    })
}

function getIndustryImage(industry: string): string {
    const images: Record<string, string> = {
        technology: "/placeholder.svg?height=600&width=600&text=Tech+Solutions",
        healthcare: "/placeholder.svg?height=600&width=600&text=Healthcare+Services",
        education: "/placeholder.svg?height=600&width=600&text=Education+Platform",
        finance: "/placeholder.svg?height=600&width=600&text=Financial+Services",
        ecommerce: "/placeholder.svg?height=600&width=600&text=Online+Store",
        marketing: "/placeholder.svg?height=600&width=600&text=Marketing+Agency",
        realestate: "/placeholder.svg?height=600&width=600&text=Real+Estate",
        creative: "/placeholder.svg?height=600&width=600&text=Creative+Studio",
        restaurant: "/placeholder.svg?height=600&width=600&text=Fine+Dining",
        fitness: "/placeholder.svg?height=600&width=600&text=Fitness+Center",
        nonprofit: "/placeholder.svg?height=600&width=600&text=Nonprofit+Organization",
    }

    return images[industry] || "/placeholder.svg?height=600&width=600&text=Your+Business"
}

// Extract business name from description
function extractBusinessName(description: string, industry: string): string {
    // Simple heuristic: look for words that might be a business name
    const words = description.split(" ")

    // Look for capitalized words that might be a name
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        if (
            word.length > 1 &&
            word[0] === word[0].toUpperCase() &&
            !["A", "The", "My", "Our", "Your", "We", "I"].includes(word)
        ) {
            // If next word also starts with capital, include it (e.g., "Blue Sky")
            if (i < words.length - 1 && words[i + 1][0] === words[i + 1][0].toUpperCase()) {
                return word + " " + words[i + 1]
            }
            return word
        }
    }

    // Default names by industry if no name found
    const defaultNames: Record<string, string> = {
        technology: "TechNova",
        healthcare: "VitaCare",
        education: "EduLearn",
        finance: "WealthWise",
        ecommerce: "ShopElite",
        marketing: "BrandBoost",
        realestate: "DreamHome",
        creative: "CreativePulse",
        restaurant: "FlavourFusion",
        fitness: "VitalFit",
        nonprofit: "HopeHarbor",
    }

    return defaultNames[industry] || "YourBrand"
}

// Generate website structure based on description and industry
function generateWebsite(description: string, industry: string): any {
    // Extract business name
    const businessName = extractBusinessName(description, industry)

    // Find best matching components
    const sections = findBestMatchingComponents(description, industry, businessName)

    return {
        title: businessName,
        description: description.substring(0, 150),
        sections,
    }
}

export default function TagBasedWebsiteGenerator() {
    const [industry, setIndustry] = useState("technology")
    const [description, setDescription] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("preview")
    const [error, setError] = useState<string | null>(null)

    const handleTagToggle = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleGenerate = async () => {
        if (!description.trim()) return

        setIsGenerating(true)
        setError(null)

        try {
            // Generate website based on description, industry, and selected tags
            const websiteData = generateWebsite(description, industry)

            // Set the generated website
            setGeneratedWebsite(websiteData)
        } catch (err) {
            console.error("Error generating website:", err)
            setError(err instanceof Error ? err.message : "An error occurred while generating the website")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-white">AI Landing Page Generator</h1>

            <div className="bg-gray-900 rounded-lg p-6 mb-12 border border-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-white">Describe your business or product</h2>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                            Industry
                        </label>
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {industries.map((ind) => (
                                <option key={ind.value} value={ind.value}>
                                    {ind.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Describe your business
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., A progressive school focused on innovative teaching methods. We offer personalized learning experiences for students from grades K-12."
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Tags (Optional)</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {allKeywords.slice(0, 20).map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        selectedTags.includes(tag)
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !description.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {isGenerating ? "Generating..." : "Generate Landing Page"}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                    <h3 className="font-bold">Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {generatedWebsite && (
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">Generated Landing Page</h2>

                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center p-2 bg-gray-100">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 rounded ${activeTab === "preview" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => setActiveTab("json")}
                                    className={`px-3 py-1 rounded ${activeTab === "json" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                                >
                                    JSON
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    Export
                                </Button>
                            </div>
                        </div>

                        {activeTab === "preview" && (
                            <div className="min-h-[500px] bg-white">
                                <TagBasedWebsiteRenderer website={generatedWebsite} />
                            </div>
                        )}

                        {activeTab === "json" && (
                            <pre className="bg-gray-900 text-gray-300 p-4 overflow-auto h-[500px] text-sm">
                {JSON.stringify(generatedWebsite, null, 2)}
              </pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
