"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ThumbsUp, Users, TrendingUp, Award } from "lucide-react"

interface SocialProofData {
    totalCustomers: number
    averageRating: number
    totalReviews: number
    satisfactionRate: number
    awards: string[]
    recentActivity: {
        action: string
        user: string
        time: string
    }[]
}

interface Testimonial {
    id: string
    name: string
    position: string
    company: string
    image: string
    content: string
    rating: number
    platform: string
    verified: boolean
    date: string
    likes: number
}

interface SocialProofTestimonialsProps {
    title?: string
    subtitle?: string
    testimonials?: Testimonial[]
    socialProofData?: SocialProofData
    showStats?: boolean
    showRecentActivity?: boolean
}

export function SocialProofTestimonials({
                                            title = "What Our Customers Say",
                                            subtitle = "Join thousands of satisfied customers who trust our services",
                                            testimonials = [],
                                            socialProofData,
                                            showStats = true,
                                            showRecentActivity = true,
                                        }: SocialProofTestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const defaultSocialProof: SocialProofData = {
        totalCustomers: 15420,
        averageRating: 4.8,
        totalReviews: 3240,
        satisfactionRate: 98,
        awards: ["Best Service 2024", "Customer Choice Award", "Industry Leader"],
        recentActivity: [
            { action: "left a 5-star review", user: "Sarah M.", time: "2 minutes ago" },
            { action: "joined our community", user: "Mike R.", time: "5 minutes ago" },
            { action: "recommended us", user: "Lisa K.", time: "8 minutes ago" },
            { action: "left a 5-star review", user: "John D.", time: "12 minutes ago" },
        ],
    }

    const defaultTestimonials: Testimonial[] = [
        {
            id: "1",
            name: "Sarah Johnson",
            position: "Marketing Director",
            company: "TechCorp Inc.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            content:
                "Absolutely exceptional service! The team went above and beyond to deliver exactly what we needed. I couldn't be happier with the results.",
            rating: 5,
            platform: "Google",
            verified: true,
            date: "2024-01-15",
            likes: 24,
        },
        {
            id: "2",
            name: "Michael Chen",
            position: "CEO",
            company: "StartupXYZ",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            content:
                "Game-changing experience! Their expertise and professionalism are unmatched. Highly recommend to anyone looking for quality service.",
            rating: 5,
            platform: "Trustpilot",
            verified: true,
            date: "2024-01-10",
            likes: 18,
        },
        {
            id: "3",
            name: "Emily Rodriguez",
            position: "Product Manager",
            company: "InnovateLab",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            content:
                "Outstanding results and incredible attention to detail. The team truly understands what customers need and delivers beyond expectations.",
            rating: 5,
            platform: "LinkedIn",
            verified: true,
            date: "2024-01-08",
            likes: 31,
        },
    ]

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials
    const displaySocialProof = socialProofData || defaultSocialProof

    useEffect(() => {
        if (isAutoPlaying && displayTestimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [isAutoPlaying, displayTestimonials.length])

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {showStats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <Card className="text-center p-6">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900">
                                {displaySocialProof.totalCustomers.toLocaleString()}+
                            </div>
                            <div className="text-sm text-gray-600">Happy Customers</div>
                        </Card>
                        <Card className="text-center p-6">
                            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900">{displaySocialProof.averageRating}/5</div>
                            <div className="text-sm text-gray-600">Average Rating</div>
                        </Card>
                        <Card className="text-center p-6">
                            <ThumbsUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900">{displaySocialProof.satisfactionRate}%</div>
                            <div className="text-sm text-gray-600">Satisfaction Rate</div>
                        </Card>
                        <Card className="text-center p-6">
                            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900">{displaySocialProof.awards.length}</div>
                            <div className="text-sm text-gray-600">Awards Won</div>
                        </Card>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Card className="p-8 h-full">
                            <div className="flex items-start space-x-4">
                                <Quote className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                        {displayTestimonials[currentIndex]?.content}
                                    </p>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={displayTestimonials[currentIndex]?.image || "/placeholder.svg"}
                                            alt={displayTestimonials[currentIndex]?.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900">{displayTestimonials[currentIndex]?.name}</div>
                                            <div className="text-sm text-gray-600">
                                                {displayTestimonials[currentIndex]?.position} at {displayTestimonials[currentIndex]?.company}
                                            </div>
                                        </div>
                                        {displayTestimonials[currentIndex]?.verified && (
                                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex">{renderStars(displayTestimonials[currentIndex]?.rating || 5)}</div>
                                            <span className="text-sm text-gray-600">via {displayTestimonials[currentIndex]?.platform}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                            {displayTestimonials[currentIndex]?.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-center mt-6 space-x-2">
                            {displayTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index)
                                        setIsAutoPlaying(false)
                                    }}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {showRecentActivity && (
                        <div>
                            <Card className="p-6">
                                <div className="flex items-center mb-4">
                                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                                </div>
                                <div className="space-y-3">
                                    {displaySocialProof.recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                                            <div className="flex-1">
                                                <span className="font-medium">{activity.user}</span>{" "}
                                                <span className="text-gray-600">{activity.action}</span>
                                                <div className="text-xs text-gray-500">{activity.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-6 mt-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Awards & Recognition</h3>
                                <div className="space-y-2">
                                    {displaySocialProof.awards.map((award, index) => (
                                        <div key={index} className="flex items-center">
                                            <Award className="h-4 w-4 text-yellow-500 mr-2" />
                                            <span className="text-sm text-gray-700">{award}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <Button onClick={() => setIsAutoPlaying(!isAutoPlaying)} variant="outline" className="mr-4">
                        {isAutoPlaying ? "Pause" : "Play"} Slideshow
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Read All Reviews</Button>
                </div>
            </div>
        </section>
    )
}
