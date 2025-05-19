"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { sampleDataset, COMPONENT_TYPES } from "@/lib/dataset"
import AdvancedWebsiteRenderer from "./advanced-website-renderer"

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

// Function to find the best matching component based on keywords and description
function findBestMatchingComponent(
    componentType: string,
    description: string,
    industry: string,
    preferredVariant: string | null = null,
): any {
    // Filter components by type
    const matchingComponents = sampleDataset.filter(
        (item) => item.component.toLowerCase() === componentType.toLowerCase(),
    )

    if (matchingComponents.length === 0) return null

    // If preferred variant is specified and exists, use it
    if (preferredVariant) {
        const variantMatches = matchingComponents.filter(
            (item) => item.variant.toLowerCase() === preferredVariant.toLowerCase(),
        )
        if (variantMatches.length > 0) return variantMatches[0]
    }

    // Extract keywords from description
    const descriptionWords = description.toLowerCase().split(/\s+/)
    const descriptionKeywords = new Set(descriptionWords)

    // Score each component based on keyword matches
    const scoredComponents = matchingComponents.map((component) => {
        let score = 0
        const componentKeywords = component.props.keywords || []

        // Score based on keyword matches in description
        for (const keyword of componentKeywords) {
            // Exact keyword match
            if (descriptionKeywords.has(keyword.toLowerCase())) {
                score += 10
            }

            // Partial keyword match (keyword is contained in description)
            if (description.toLowerCase().includes(keyword.toLowerCase())) {
                score += 5
            }

            // Industry match
            if (
                keyword.toLowerCase().includes(industry.toLowerCase()) ||
                industry.toLowerCase().includes(keyword.toLowerCase())
            ) {
                score += 3
            }
        }

        // Bonus for more specific variants (assuming more specific variants have longer names)
        score += component.variant.length * 0.1

        return { component, score }
    })

    // Sort by score (highest first)
    scoredComponents.sort((a, b) => b.score - a.score)

    // Return the highest scoring component, or first one if all scores are 0
    return scoredComponents[0]?.component || matchingComponents[0]
}

// Extract company/organization name from description
function extractName(description: string, industry: string): string {
    // Look for capitalized words that might be a name
    const words = description.split(/\s+/)

    // First pass: look for 2-3 consecutive capitalized words
    for (let i = 0; i < words.length - 1; i++) {
        if (
            words[i].length > 1 &&
            words[i][0] === words[i][0].toUpperCase() &&
            words[i + 1].length > 1 &&
            words[i + 1][0] === words[i + 1][0].toUpperCase() &&
            !["A", "The", "My", "Our", "Your", "We", "I"].includes(words[i])
        ) {
            // Check if there's a third capitalized word
            if (i < words.length - 2 && words[i + 2].length > 1 && words[i + 2][0] === words[i + 2][0].toUpperCase()) {
                return `${words[i]} ${words[i + 1]} ${words[i + 2]}`
            }
            return `${words[i]} ${words[i + 1]}`
        }
    }

    // Second pass: look for single capitalized words
    for (let i = 0; i < words.length; i++) {
        if (
            words[i].length > 1 &&
            words[i][0] === words[i][0].toUpperCase() &&
            !["A", "The", "My", "Our", "Your", "We", "I"].includes(words[i])
        ) {
            return words[i]
        }
    }

    // Default names by industry
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

// Customize component props based on description and industry
function customizeComponentProps(component: any, description: string, industry: string, name: string): any {
    // Create a deep copy to avoid modifying the original
    const customized = JSON.parse(JSON.stringify(component))

    // Extract key phrases from description (simple approach)
    const keyPhrases = description
        .split(/[.!?;]/)
        .map((phrase) => phrase.trim())
        .filter((phrase) => phrase.length > 10 && phrase.length < 100)

    // Customize based on component type
    switch (customized.component) {
        case COMPONENT_TYPES.HEADER:
            // Set logo to company name
            customized.props.logo = name

            // Customize menu items based on industry
            if (industry === "ecommerce") {
                customized.props.menu = [
                    { label: "Home", link: "#home" },
                    { label: "Shop", link: "#shop" },
                    { label: "Products", link: "#products" },
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
            // Set title to company name
            customized.props.title = name

            // Use a key phrase from description for subtitle if available
            if (keyPhrases.length > 0) {
                // Find the shortest phrase that's not too short
                const shortestPhrase = keyPhrases.filter((phrase) => phrase.length > 20).sort((a, b) => a.length - b.length)[0]

                if (shortestPhrase) {
                    customized.props.subtitle = shortestPhrase
                }
            }

            // Use description for the description field if it's not too long
            if (description.length < 150) {
                customized.props.description = description
            } else {
                // Use the first sentence or phrase
                customized.props.description = keyPhrases[0] || description.substring(0, 147) + "..."
            }

            // Customize button text based on industry
            if (industry === "ecommerce") {
                customized.props.buttonText = "Shop Now"
            } else if (industry === "restaurant") {
                customized.props.buttonText = "View Menu"
            } else if (industry === "education") {
                customized.props.buttonText = "Explore Courses"
            } else {
                customized.props.buttonText = "Learn More"
            }
            break

        case COMPONENT_TYPES.FEATURES:
            // Customize title based on industry
            if (industry === "ecommerce") {
                customized.props.title = "Our Products"
            } else if (industry === "restaurant") {
                customized.props.title = "Our Specialties"
            } else if (industry === "education") {
                customized.props.title = "Our Programs"
            } else {
                customized.props.title = `Why Choose ${name}`
            }

            // Customize features based on description keywords
            // This is a simplified approach - in a real implementation, you'd use NLP
            // to extract features from the description
            if (description.toLowerCase().includes("custom") || description.toLowerCase().includes("personalized")) {
                customized.props.features = customized.props.features.map((feature: any) => {
                    if (feature.title.includes("AI")) {
                        feature.title = "Personalized Experience"
                        feature.description = "Tailored specifically to your unique needs and preferences."
                    }
                    return feature
                })
            }
            break

        case COMPONENT_TYPES.TESTIMONIALS:
            // Customize title
            customized.props.title = `What Our Clients Say About ${name}`
            break

        case COMPONENT_TYPES.CTA:
            // Customize CTA based on industry
            if (industry === "ecommerce") {
                customized.props.title = "Shop Our Latest Collection"
                customized.props.buttonText = "Shop Now"
            } else if (industry === "restaurant") {
                customized.props.title = "Reserve Your Table Today"
                customized.props.buttonText = "Make Reservation"
            } else if (industry === "education") {
                customized.props.title = "Enroll in Our Programs"
                customized.props.buttonText = "Apply Now"
            } else {
                customized.props.title = `Ready to Get Started with ${name}?`
                customized.props.buttonText = "Contact Us"
            }
            break

        case COMPONENT_TYPES.FOOTER:
            // Set company name in footer
            customized.props.logo = name
            customized.props.copyright = `© ${new Date().getFullYear()} ${name}. All rights reserved.`
            break
    }

    return customized
}

// Generate website structure based on description and industry
function generateWebsite(description: string, industry: string): any {
    // Extract company/organization name
    const name = extractName(description, industry)

    // Determine the best component variants based on description and industry
    const headerVariant = determineHeaderVariant(description, industry)
    const heroVariant = determineHeroVariant(description, industry)
    const featuresVariant = determineFeaturesVariant(description, industry)
    const testimonialsVariant = determineTestimonialsVariant(description)
    const ctaVariant = determineCTAVariant(description)
    const footerVariant = determineFooterVariant(description)

    // Define the structure of sections we want
    const sectionTypes = [
        { type: COMPONENT_TYPES.HEADER, variant: headerVariant },
        { type: COMPONENT_TYPES.HERO, variant: heroVariant },
        { type: COMPONENT_TYPES.FEATURES, variant: featuresVariant },
        { type: COMPONENT_TYPES.TESTIMONIALS, variant: testimonialsVariant },
        { type: COMPONENT_TYPES.CTA, variant: ctaVariant },
        { type: COMPONENT_TYPES.FOOTER, variant: footerVariant },
    ]

    // Find and customize components
    const sections = sectionTypes
        .map((section) => {
            const component = findBestMatchingComponent(section.type, description, industry, section.variant)
            if (!component) return null

            return customizeComponentProps(component, description, industry, name)
        })
        .filter(Boolean)

    return {
        title: name,
        description: description.substring(0, 150),
        sections,
    }
}

// Helper functions to determine the best component variants based on description and industry
function determineHeaderVariant(description: string, industry: string): string {
    const desc = description.toLowerCase()

    if (industry === "education") return "education"
    if (industry === "ecommerce") return "ecommerce"
    if (industry === "technology" || desc.includes("software") || desc.includes("app")) return "saas"
    if (industry === "creative" || desc.includes("design") || desc.includes("portfolio")) return "creative"
    if (industry === "finance" || industry === "realestate" || desc.includes("professional")) return "corporate"

    // Default to minimal for simplicity
    return "minimal"
}

function determineHeroVariant(description: string, industry: string): string {
    const desc = description.toLowerCase()

    if (desc.includes("video") || desc.includes("animation")) return "video"
    if (desc.includes("split") || industry === "realestate") return "split"
    if (desc.includes("background") || desc.includes("image")) return "background-image"
    if (desc.includes("center") || desc.includes("centered")) return "centered"
    if (desc.includes("animate") || desc.includes("animation")) return "animated"

    // Default to standard
    return "standard"
}

function determineFeaturesVariant(description: string, industry: string): string {
    const desc = description.toLowerCase()

    if (desc.includes("step") || desc.includes("process") || desc.includes("how it works")) return "steps"
    if (desc.includes("icon") || industry === "technology") return "icons"
    if (desc.includes("card") || industry === "ecommerce") return "cards"

    // Default to grid
    return "grid"
}

function determineTestimonialsVariant(description: string): string {
    const desc = description.toLowerCase()

    if (desc.includes("carousel") || desc.includes("slider")) return "carousel"
    if (desc.includes("quote") || desc.includes("testimonial")) return "quotes"
    if (desc.includes("simple")) return "simple"

    // Default to cards
    return "cards"
}

function determineCTAVariant(description: string): string {
    const desc = description.toLowerCase()

    if (desc.includes("split")) return "split"
    if (desc.includes("background")) return "background"
    if (desc.includes("box")) return "box"

    // Default to simple
    return "simple"
}

function determineFooterVariant(description: string): string {
    const desc = description.toLowerCase()

    if (desc.includes("multi") || desc.includes("column")) return "multi-column"
    if (desc.includes("center") || desc.includes("centered")) return "centered"
    if (desc.includes("dark")) return "dark"

    // Default to simple
    return "simple"
}

export default function AdvancedWebsiteGenerator() {
    const [industry, setIndustry] = useState("technology")
    const [description, setDescription] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("preview")
    const [error, setError] = useState<string | null>(null)

    const handleGenerate = async () => {
        if (!description.trim()) return

        setIsGenerating(true)
        setError(null)

        try {
            // Generate website based on description and industry
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
                            placeholder="e.g., A restaurant website with video background animation featuring our signature dishes and elegant atmosphere."
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
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
                                <AdvancedWebsiteRenderer website={generatedWebsite} />
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
