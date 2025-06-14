"use client"

import { useState } from "react"
import { Play, Star } from "lucide-react"

interface VideoTestimonial {
    id: string
    name: string
    role: string
    company: string
    avatar: string
    thumbnail: string
    videoUrl: string
    quote: string
    rating: number
}

interface VideoTestimonialsProps {
    title?: string
    subtitle?: string
    testimonials?: VideoTestimonial[]
    theme?: any
}

export function VideoTestimonials({
                                      title = "Customer Stories",
                                      subtitle = "Hear directly from our satisfied customers",
                                      testimonials = [
                                          {
                                              id: "1",
                                              name: "Sarah Johnson",
                                              role: "CEO",
                                              company: "TechCorp",
                                              avatar: "/placeholder.svg?height=80&width=80",
                                              thumbnail: "/placeholder.svg?height=300&width=400",
                                              videoUrl: "#",
                                              quote: "This solution completely transformed our business operations.",
                                              rating: 5,
                                          },
                                          {
                                              id: "2",
                                              name: "Michael Chen",
                                              role: "CTO",
                                              company: "InnovateLab",
                                              avatar: "/placeholder.svg?height=80&width=80",
                                              thumbnail: "/placeholder.svg?height=300&width=400",
                                              videoUrl: "#",
                                              quote: "The results exceeded our expectations by far.",
                                              rating: 5,
                                          },
                                          {
                                              id: "3",
                                              name: "Emily Rodriguez",
                                              role: "Operations Manager",
                                              company: "GrowthCo",
                                              avatar: "/placeholder.svg?height=80&width=80",
                                              thumbnail: "/placeholder.svg?height=300&width=400",
                                              videoUrl: "#",
                                              quote: "Implementation was smooth and support was excellent.",
                                              rating: 5,
                                          },
                                      ],
                                      theme,
                                  }: VideoTestimonialsProps) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video bg-gray-900 cursor-pointer group">
                                <img
                                    src={testimonial.thumbnail || "/placeholder.svg"}
                                    alt={`${testimonial.name} testimonial`}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                                        <Play className="h-6 w-6 text-gray-900 ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* Rating */}
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>

                                {/* Author */}
                                <div className="flex items-center space-x-3 pt-2">
                                    <img
                                        src={testimonial.avatar || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 mb-6">Join thousands of satisfied customers</p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Start Your Success Story
                    </button>
                </div>
            </div>
        </section>
    )
}
