"use client"

import { useState } from "react"
import { Grid, List, Search, Filter, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PortfolioItem {
    id: number
    title: string
    description: string
    image: string
    category: string
    client: string
    year: string
    tags: string[]
    url?: string
}

interface FilterablePortfolioProps {
    title?: string
    subtitle?: string
    items?: PortfolioItem[]
    categories?: string[]
    theme?: any
}

export function FilterablePortfolio({
                                        title = "Our Work",
                                        subtitle = "Explore our diverse portfolio of successful projects",
                                        items = [
                                            {
                                                id: 1,
                                                title: "Corporate Website Redesign",
                                                description:
                                                    "Complete redesign of a Fortune 500 company's corporate website with focus on user experience and conversion optimization.",
                                                image: "/placeholder.svg?height=400&width=600",
                                                category: "Web Design",
                                                client: "TechCorp Inc.",
                                                year: "2024",
                                                tags: ["UI/UX", "Responsive", "SEO"],
                                                url: "#",
                                            },
                                            {
                                                id: 2,
                                                title: "E-learning Platform",
                                                description: "Interactive e-learning platform with video streaming, progress tracking, and certification system.",
                                                image: "/placeholder.svg?height=400&width=600",
                                                category: "Web Development",
                                                client: "EduTech Solutions",
                                                year: "2024",
                                                tags: ["React", "Node.js", "Video Streaming"],
                                                url: "#",
                                            },
                                            {
                                                id: 3,
                                                title: "Mobile Banking App",
                                                description:
                                                    "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
                                                image: "/placeholder.svg?height=400&width=600",
                                                category: "Mobile App",
                                                client: "SecureBank",
                                                year: "2023",
                                                tags: ["React Native", "Security", "Biometrics"],
                                                url: "#",
                                            },
                                            {
                                                id: 4,
                                                title: "Brand Identity Package",
                                                description: "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
                                                image: "/placeholder.svg?height=400&width=600",
                                                category: "Branding",
                                                client: "StartupXYZ",
                                                year: "2023",
                                                tags: ["Logo Design", "Brand Guidelines", "Print"],
                                                url: "#",
                                            },
                                        ],
                                        categories = ["All", "Web Design", "Web Development", "Mobile App", "Branding"],
                                        theme,
                                    }: FilterablePortfolioProps) {
    const [activeCategory, setActiveCategory] = useState("All")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest")

    const filteredAndSortedItems = items
        .filter((item) => {
            const matchesCategory = activeCategory === "All" || item.category === activeCategory
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.client.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return Number.parseInt(b.year) - Number.parseInt(a.year)
                case "oldest":
                    return Number.parseInt(a.year) - Number.parseInt(b.year)
                case "alphabetical":
                    return a.title.localeCompare(b.title)
                default:
                    return 0
            }
        })

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-4 lg:space-y-0">
                    {/* Left Controls */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        activeCategory === category
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="alphabetical">A-Z</option>
                        </select>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                            >
                                <Grid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8">
                    <p className="text-gray-600">
                        Showing {filteredAndSortedItems.length} of {items.length} projects
                    </p>
                </div>

                {/* Portfolio Items */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAndSortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        {item.url && (
                                            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <ArrowUpRight className="h-4 w-4 mr-2" />
                                                    View Project
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.category}
                    </span>
                                        <span className="text-sm text-gray-500">{item.year}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-3">{item.description}</p>
                                    <p className="text-sm text-gray-500 mb-4">Client: {item.client}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredAndSortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 relative overflow-hidden">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="md:w-2/3 p-8">
                                        <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                                            <span className="text-sm text-gray-500">{item.year}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <p className="text-sm text-gray-500 mb-4">Client: {item.client}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {item.tags.map((tag, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                        {item.url && (
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white group" asChild>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    View Project
                                                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {filteredAndSortedItems.length === 0 && (
                    <div className="text-center py-16">
                        <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>
        </section>
    )
}
