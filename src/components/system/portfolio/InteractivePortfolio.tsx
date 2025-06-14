"use client"

import { useState } from "react"
import { ExternalLink, Github, Eye, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PortfolioItem {
    id: number
    title: string
    description: string
    image: string
    category: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    featured?: boolean
}

interface InteractivePortfolioProps {
    title?: string
    subtitle?: string
    items?: PortfolioItem[]
    categories?: string[]
    theme?: any
}

export function InteractivePortfolio({
                                         title = "Our Portfolio",
                                         subtitle = "Showcasing our best work and creative solutions",
                                         items = [
                                             {
                                                 id: 1,
                                                 title: "E-commerce Platform",
                                                 description: "Modern e-commerce solution with advanced analytics and AI-powered recommendations.",
                                                 image: "/placeholder.svg?height=400&width=600",
                                                 category: "Web Development",
                                                 tags: ["React", "Node.js", "MongoDB", "AI"],
                                                 liveUrl: "#",
                                                 githubUrl: "#",
                                                 featured: true,
                                             },
                                             {
                                                 id: 2,
                                                 title: "Mobile Banking App",
                                                 description: "Secure and intuitive mobile banking application with biometric authentication.",
                                                 image: "/placeholder.svg?height=400&width=600",
                                                 category: "Mobile App",
                                                 tags: ["React Native", "Firebase", "Biometrics"],
                                                 liveUrl: "#",
                                                 featured: true,
                                             },
                                             {
                                                 id: 3,
                                                 title: "Brand Identity Design",
                                                 description: "Complete brand identity package including logo, colors, and marketing materials.",
                                                 image: "/placeholder.svg?height=400&width=600",
                                                 category: "Design",
                                                 tags: ["Branding", "Logo Design", "Print"],
                                                 liveUrl: "#",
                                             },
                                             {
                                                 id: 4,
                                                 title: "SaaS Dashboard",
                                                 description: "Analytics dashboard for SaaS companies with real-time data visualization.",
                                                 image: "/placeholder.svg?height=400&width=600",
                                                 category: "Web Development",
                                                 tags: ["Vue.js", "D3.js", "Python", "Analytics"],
                                                 liveUrl: "#",
                                                 githubUrl: "#",
                                             },
                                         ],
                                         categories = ["All", "Web Development", "Mobile App", "Design"],
                                         theme,
                                     }: InteractivePortfolioProps) {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")
    const [hoveredItem, setHoveredItem] = useState<number | null>(null)

    const filteredItems = items.filter((item) => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-4 lg:space-y-0">
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    activeCategory === category
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

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
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {/* Featured Badge */}
                            {item.featured && (
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Featured
                                </div>
                            )}

                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div
                                    className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    {item.liveUrl && (
                                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                                            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </a>
                                        </Button>
                                    )}
                                    {item.githubUrl && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-white text-white hover:bg-white hover:text-gray-900"
                                            asChild
                                        >
                                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.category}
                  </span>
                                    {item.liveUrl && (
                                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                                {/* Tags */}
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

                {/* No Results */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                        <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms</p>
                    </div>
                )}

                {/* Load More Button */}
                {filteredItems.length > 0 && (
                    <div className="text-center mt-12">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                            Load More Projects
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
