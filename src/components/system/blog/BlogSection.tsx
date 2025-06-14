"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

interface BlogPost {
    id: string
    title: string
    excerpt: string
    author: string
    date: string
    readTime: string
    category: string
    image: string
    featured?: boolean
}

interface BlogSectionProps {
    title?: string
    subtitle?: string
    posts?: BlogPost[]
    showFeatured?: boolean
    maxPosts?: number
}

export default function BlogSection({
                                        title = "Latest Blog Posts",
                                        subtitle = "Stay updated with our latest insights and news",
                                        posts = [],
                                        showFeatured = true,
                                        maxPosts = 6,
                                    }: BlogSectionProps) {
    const defaultPosts: BlogPost[] = [
        {
            id: "1",
            title: "The Future of Digital Innovation",
            excerpt:
                "Exploring how emerging technologies are reshaping industries and creating new opportunities for growth.",
            author: "Sarah Johnson",
            date: "March 15, 2024",
            readTime: "5 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
            featured: true,
        },
        {
            id: "2",
            title: "Building Sustainable Business Practices",
            excerpt: "How companies can integrate sustainability into their core operations while maintaining profitability.",
            author: "Michael Chen",
            date: "March 12, 2024",
            readTime: "7 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
        },
        {
            id: "3",
            title: "Customer Experience in the Digital Age",
            excerpt: "Strategies for creating exceptional customer experiences across digital touchpoints.",
            author: "Emily Rodriguez",
            date: "March 10, 2024",
            readTime: "6 min read",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        },
        {
            id: "4",
            title: "Data-Driven Decision Making",
            excerpt: "Leveraging analytics and insights to make informed business decisions that drive growth.",
            author: "David Kim",
            date: "March 8, 2024",
            readTime: "8 min read",
            category: "Analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        },
    ]

    const displayPosts = (posts.length > 0 ? posts : defaultPosts).slice(0, maxPosts)
    const featuredPost = showFeatured ? displayPosts.find((post) => post.featured) : null
    const regularPosts = displayPosts.filter((post) => !post.featured || !showFeatured)

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {featuredPost && (
                    <Card className="mb-12 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative">
                                <img
                                    src={featuredPost.image || "/placeholder.svg"}
                                    alt={featuredPost.title}
                                    className="w-full h-64 lg:h-full object-cover"
                                />
                                <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>
                            </div>
                            <CardContent className="p-8 flex flex-col justify-center">
                                <Badge variant="outline" className="w-fit mb-4">
                                    {featuredPost.category}
                                </Badge>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <User className="h-4 w-4 mr-2" />
                                    <span className="mr-4">{featuredPost.author}</span>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span className="mr-4">{featuredPost.date}</span>
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                                <Button className="w-fit bg-blue-600 hover:bg-blue-700">
                                    Read More
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </CardContent>
                        </div>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                            <div className="relative">
                                <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <Badge className="absolute top-4 left-4 bg-white text-gray-900">{post.category}</Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                                <div className="flex items-center text-xs text-gray-500 mb-4">
                                    <User className="h-3 w-3 mr-1" />
                                    <span className="mr-3">{post.author}</span>
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span className="mr-3">{post.date}</span>
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{post.readTime}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
                                >
                                    Read More
                                    <ArrowRight className="h-3 w-3 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                        View All Posts
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
