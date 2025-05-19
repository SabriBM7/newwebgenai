"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EnhancedWebsiteRenderer from "./enhanced-website-renderer"
import { COMPONENT_TYPES, sampleDataset } from "@/lib/dataset"

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

// Industry to keywords mapping for better matching
const industryKeywords: Record<string, string[]> = {
    technology: ["tech", "software", "app", "digital", "innovation", "platform", "solution"],
    healthcare: ["health", "medical", "wellness", "care", "clinic", "hospital", "doctor"],
    education: ["school", "learning", "courses", "training", "academy", "university", "teaching", "students"],
    finance: ["financial", "banking", "investment", "insurance", "money", "wealth", "accounting"],
    ecommerce: ["shop", "store", "retail", "products", "marketplace", "shopping", "commerce"],
    marketing: ["marketing", "advertising", "promotion", "branding", "agency", "media"],
    realestate: ["real estate", "property", "homes", "housing", "listings", "realty"],
    creative: ["design", "creative", "portfolio", "studio", "agency", "art", "photography"],
    restaurant: ["food", "dining", "restaurant", "cafe", "menu", "cuisine", "catering"],
    fitness: ["fitness", "gym", "workout", "health", "training", "exercise", "wellness"],
    nonprofit: ["nonprofit", "charity", "foundation", "cause", "community", "organization"],
}

function findBestMatchingComponent(
    componentType: string,
    variant: string | null,
    description: string,
    industry: string,
): any {
    // Filter components by type
    const matchingComponents = sampleDataset.filter(
        (item) => item.component.toLowerCase() === componentType.toLowerCase(),
    )

    if (matchingComponents.length === 0) return null

    // If variant is specified, filter by variant
    if (variant) {
        const variantMatches = matchingComponents.filter((item) => item.variant.toLowerCase() === variant.toLowerCase())
        if (variantMatches.length > 0) return variantMatches[0]
    }

    // Get industry keywords
    const keywords = industryKeywords[industry] || []

    // Find best match based on keywords
    let bestMatch = null
    let bestMatchScore = -1

    for (const component of matchingComponents) {
        let score = 0

        // Check component keywords
        const componentKeywords = component.props.keywords || []
        for (const keyword of componentKeywords) {
            if (description.toLowerCase().includes(keyword.toLowerCase())) {
                score += 2
            }

            if (keywords.includes(keyword.toLowerCase())) {
                score += 1
            }
        }

        // Prefer components that match the industry
        for (const keyword of keywords) {
            if (componentKeywords.some((ck) => ck.toLowerCase().includes(keyword))) {
                score += 1
            }
        }

        if (score > bestMatchScore) {
            bestMatchScore = score
            bestMatch = component
        }
    }

    // If no good match found, return the first one
    return bestMatch || matchingComponents[0]
}

function customizeComponentProps(component: any, description: string, industry: string, companyName: string): any {
    // Create a deep copy to avoid modifying the original
    const customized = JSON.parse(JSON.stringify(component))

    // Customize based on component type
    switch (customized.component) {
        case COMPONENT_TYPES.HEADER:
            // Set logo to company name
            customized.props.logo = companyName
            break

        case COMPONENT_TYPES.HERO:
            // Customize hero text based on industry
            if (industry === "technology") {
                customized.props.title = `Innovative ${companyName} Solutions`
                customized.props.subtitle = "Powering the future of technology"
            } else if (industry === "education") {
                customized.props.title = `${companyName}: Empowering Through Knowledge`
                customized.props.subtitle = "Your journey to success begins here"
            } else if (industry === "ecommerce") {
                customized.props.title = `Welcome to ${companyName}`
                customized.props.subtitle = "Quality products at great prices"
            } else {
                customized.props.title = companyName
                customized.props.subtitle = getIndustryTagline(industry)
            }

            // Add part of the description if it's not too long
            if (description.length < 150) {
                customized.props.description = description
            } else {
                customized.props.description = description.substring(0, 147) + "..."
            }
            break

        case COMPONENT_TYPES.FEATURES:
            // Keep the features but customize the title/subtitle
            customized.props.title = `Why Choose ${companyName}`
            customized.props.subtitle = "Features designed for your success"
            break

        case COMPONENT_TYPES.TESTIMONIALS:
            // Keep the original testimonials but customize the title
            customized.props.title = `What Our Clients Say About ${companyName}`
            break

        case COMPONENT_TYPES.CTA:
            // Customize CTA based on industry
            customized.props.title = getIndustryCTA(industry, companyName)
            break

        case COMPONENT_TYPES.FOOTER:
            // Set the company name in the footer
            customized.props.logo = companyName
            customized.props.copyright = `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`
            break
    }

    return customized
}

function getIndustryTagline(industry: string): string {
    const taglines: Record<string, string> = {
        technology: "Innovative solutions for a digital world",
        healthcare: "Your health is our priority",
        education: "Empowering minds, shaping futures",
        finance: "Secure financial solutions for your future",
        ecommerce: "Quality products, exceptional service",
        marketing: "Elevating your brand to new heights",
        realestate: "Finding your perfect property",
        creative: "Where creativity meets excellence",
        restaurant: "Exquisite flavors, memorable experiences",
        fitness: "Transform your body, transform your life",
        nonprofit: "Making a difference together",
    }

    return taglines[industry] || "Excellence in everything we do"
}

function getIndustryCTA(industry: string, companyName: string): string {
    const ctas: Record<string, string> = {
        technology: `Ready to transform your business with ${companyName}?`,
        healthcare: "Take the first step towards better health",
        education: "Start your learning journey today",
        finance: "Secure your financial future now",
        ecommerce: "Shop our latest collection",
        marketing: "Elevate your brand with us",
        realestate: "Find your dream property",
        creative: "Let's bring your vision to life",
        restaurant: "Reserve your table now",
        fitness: "Begin your fitness journey today",
        nonprofit: "Join us in making a difference",
    }

    return ctas[industry] || `Ready to get started with ${companyName}?`
}

// Extract company name from description
function extractCompanyName(description: string, industry: string): string {
    // Simple heuristic: look for words that might be a company name
    // This could be improved with NLP or more sophisticated rules
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
    // Extract company name
    const companyName = extractCompanyName(description, industry)

    // Define the structure of sections we want
    const sectionTypes = [
        { type: COMPONENT_TYPES.HEADER, variant: null },
        { type: COMPONENT_TYPES.HERO, variant: null },
        { type: COMPONENT_TYPES.FEATURES, variant: null },
        { type: COMPONENT_TYPES.TESTIMONIALS, variant: null },
        { type: COMPONENT_TYPES.CTA, variant: null },
        { type: COMPONENT_TYPES.FOOTER, variant: null },
    ]

    // Find and customize components
    const sections = sectionTypes
        .map((section) => {
            const component = findBestMatchingComponent(section.type, section.variant, description, industry)
            if (!component) return null

            return customizeComponentProps(component, description, industry, companyName)
        })
        .filter(Boolean)

    return {
        title: companyName,
        description: description.substring(0, 150),
        sections,
    }
}

export default function EnhancedWebsiteGenerator() {
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
                            placeholder="e.g., A progressive school focused on innovative teaching methods. We offer personalized learning experiences for students from grades K-12."
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
                                <EnhancedWebsiteRenderer website={generatedWebsite} />
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
