"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UniversalWebsiteRenderer from "./universal-website-renderer"

const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "marketing", label: "Marketing" },
    { value: "realestate", label: "Real Estate" },
    { value: "travel", label: "Travel & Hospitality" },
    { value: "restaurant", label: "Restaurant" },
    { value: "fitness", label: "Fitness" },
    { value: "nonprofit", label: "Non-Profit" },
    { value: "creative", label: "Creative/Portfolio" },
]

// Sample templates for different industries
const industryTemplates = {
    technology: {
        header: {
            type: "header",
            variant: "minimal",
            props: {
                logo: "TechCo",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "Products", link: "#products" },
                    { label: "Solutions", link: "#solutions" },
                    { label: "Pricing", link: "#pricing" },
                    { label: "Contact", link: "#contact" },
                ],
            },
        },
        hero: {
            type: "hero",
            variant: "standard",
            props: {
                title: "Innovative Technology Solutions",
                subtitle: "Transforming businesses with cutting-edge technology",
                buttonText: "Get Started",
                imageUrl: "/placeholder.svg?height=400&width=400&text=Tech+Illustration",
            },
        },
        features: {
            type: "features",
            variant: "grid",
            props: {
                title: "Our Solutions",
                features: [
                    {
                        title: "Cloud Services",
                        description: "Scalable cloud infrastructure for your business needs",
                        icon: "Cloud",
                    },
                    { title: "AI Integration", description: "Intelligent automation and data analysis", icon: "Zap" },
                    { title: "Cybersecurity", description: "Protect your business with advanced security", icon: "Shield" },
                ],
            },
        },
    },
    education: {
        header: {
            type: "header",
            variant: "education",
            props: {
                logo: "EduLearn",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "Courses", link: "#courses" },
                    { label: "About", link: "#about" },
                    { label: "Faculty", link: "#faculty" },
                    { label: "Contact", link: "#contact" },
                ],
            },
        },
        hero: {
            type: "hero",
            variant: "split",
            props: {
                title: "Empowering Through Education",
                subtitle: "Discover a world of knowledge and opportunity",
                buttonText: "Explore Courses",
                imageUrl: "/placeholder.svg?height=400&width=400&text=Education+Illustration",
            },
        },
        features: {
            type: "features",
            variant: "grid",
            props: {
                title: "Our Programs",
                features: [
                    { title: "Online Courses", description: "Learn at your own pace from anywhere", icon: "Laptop" },
                    { title: "Expert Faculty", description: "Learn from industry professionals", icon: "Users" },
                    { title: "Career Support", description: "Get guidance for your professional journey", icon: "Briefcase" },
                ],
            },
        },
    },
    ecommerce: {
        header: {
            type: "header",
            variant: "ecommerce",
            props: {
                logo: "ShopNow",
                menu: [
                    { label: "Home", link: "#" },
                    { label: "Products", link: "#products" },
                    { label: "Categories", link: "#categories" },
                    { label: "Sale", link: "#sale" },
                    { label: "Cart", link: "#cart" },
                ],
            },
        },
        hero: {
            type: "hero",
            variant: "standard",
            props: {
                title: "Shop the Latest Trends",
                subtitle: "Quality products at affordable prices",
                buttonText: "Shop Now",
                imageUrl: "/placeholder.svg?height=400&width=400&text=Product+Showcase",
            },
        },
        features: {
            type: "features",
            variant: "grid",
            props: {
                title: "Why Choose Us",
                features: [
                    { title: "Free Shipping", description: "On all orders over $50", icon: "Truck" },
                    { title: "Easy Returns", description: "30-day hassle-free returns", icon: "RefreshCw" },
                    { title: "Secure Checkout", description: "Safe and encrypted payments", icon: "Lock" },
                ],
            },
        },
    },
    // Add more industry templates as needed
}

// Function to customize template based on description
function customizeTemplate(template: any, description: string, industry: string) {
    // Create a deep copy to avoid modifying the original
    const customized = JSON.parse(JSON.stringify(template))

    // Extract key information from description
    const words = description.toLowerCase().split(" ")
    const companyName = extractCompanyName(description) || industryDefaultNames[industry] || "Company Name"

    // Customize header
    if (customized.header) {
        customized.header.props.logo = companyName
    }

    // Customize hero based on description keywords
    if (customized.hero) {
        // If description contains specific keywords, customize the hero
        if (description.toLowerCase().includes("innovative") || description.toLowerCase().includes("modern")) {
            customized.hero.props.title = `Innovative Solutions for Your ${capitalizeFirstLetter(industry)} Needs`
        } else if (description.toLowerCase().includes("professional") || description.toLowerCase().includes("expert")) {
            customized.hero.props.title = `Professional ${capitalizeFirstLetter(industry)} Services`
        } else if (description.toLowerCase().includes("affordable") || description.toLowerCase().includes("budget")) {
            customized.hero.props.title = `Affordable ${capitalizeFirstLetter(industry)} Solutions`
        } else {
            customized.hero.props.title = `${companyName} - ${capitalizeFirstLetter(industry)} Solutions`
        }

        // Add the description as subtitle if it's not too long
        if (description.length < 100) {
            customized.hero.props.subtitle = description
        } else {
            customized.hero.props.subtitle = description.substring(0, 97) + "..."
        }
    }

    return customized
}

// Helper function to extract company name from description
function extractCompanyName(description: string) {
    // Simple heuristic: look for words that might be a company name
    // This could be improved with NLP or more sophisticated rules
    const words = description.split(" ")

    // Look for words that start with capital letters and aren't common words
    const commonWords = ["a", "an", "the", "for", "and", "or", "but", "nor", "so", "yet", "i", "we", "you", "they"]
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        if (word.length > 2 && word[0] === word[0].toUpperCase() && !commonWords.includes(word.toLowerCase())) {
            // If next word also starts with capital, include it (e.g., "Blue Sky")
            if (i < words.length - 1 && words[i + 1][0] === words[i + 1][0].toUpperCase()) {
                return word + " " + words[i + 1]
            }
            return word
        }
    }
    return null
}

// Default company names for each industry
const industryDefaultNames: Record<string, string> = {
    technology: "TechCo",
    healthcare: "HealthPlus",
    education: "EduLearn",
    finance: "FinancePro",
    ecommerce: "ShopNow",
    marketing: "MarketBoost",
    realestate: "HomeFind",
    travel: "TravelJoy",
    restaurant: "FineEats",
    fitness: "FitLife",
    nonprofit: "CauseCare",
    creative: "CreativeStudio",
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function UniversalWebsiteGenerator() {
    const [industry, setIndustry] = useState("technology")
    const [description, setDescription] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("preview")
    const [theme, setTheme] = useState("light")
    const [error, setError] = useState<string | null>(null)

    const handleGenerate = async () => {
        if (!description.trim()) return

        setIsGenerating(true)
        setError(null)

        try {
            // Get the template for the selected industry
            const template = industryTemplates[industry as keyof typeof industryTemplates] || industryTemplates.technology

            // Customize the template based on the description
            const customizedTemplate = customizeTemplate(template, description, industry)

            // Create the website structure
            const websiteData = {
                title: extractCompanyName(description) || industryDefaultNames[industry] || "Generated Website",
                description: description.substring(0, 150),
                sections: Object.values(customizedTemplate),
            }

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
            <h1 className="text-4xl font-bold mb-8 text-white">Universal Website Generator</h1>

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
                            placeholder="e.g., We are a modern tech company providing innovative solutions for small businesses. Our cloud-based platform helps streamline operations and increase productivity."
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !description.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {isGenerating ? "Generating..." : "Generate Website"}
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
                    <h2 className="text-3xl font-bold mb-6 text-white">Generated Website</h2>

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
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="bg-white border border-gray-300 rounded-md text-sm px-3 py-1"
                                >
                                    <option value="light">Light Theme</option>
                                    <option value="dark">Dark Theme</option>
                                    <option value="colorful">Colorful Theme</option>
                                </select>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    Export
                                </Button>
                            </div>
                        </div>

                        {activeTab === "preview" && (
                            <div className={`min-h-[500px] ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}>
                                <UniversalWebsiteRenderer website={generatedWebsite} theme={theme} />
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
