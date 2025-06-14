"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: string
    rating?: number
}

interface AdvancedTestimonialsProps {
    title?: string
    subtitle?: string
    testimonials: Testimonial[]
    variant?: "cards" | "carousel" | "grid" | "quotes"
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export function AdvancedTestimonials({
                                         title = "What Our Customers Say",
                                         subtitle = "Don't just take our word for it",
                                         testimonials = [],
                                         variant = "carousel",
                                         backgroundColor = "white",
                                         textColor = "black",
                                         accentColor = "#3b82f6",
                                     }: AdvancedTestimonialsProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Default testimonials if none provided
    const defaultTestimonials: Testimonial[] = [
        {
            quote:
                "This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed. Highly recommended!",
            author: "Sarah Johnson",
            role: "Marketing Director",
            company: "TechCorp",
            avatar: "/placeholder.svg?height=100&width=100&text=SJ",
            rating: 5,
        },
        {
            quote:
                "I've tried many similar solutions, but this one stands out for its reliability and excellent customer support. It's been a game-changer for our team.",
            author: "Michael Chen",
            role: "Product Manager",
            company: "Innovate Inc",
            avatar: "/placeholder.svg?height=100&width=100&text=MC",
            rating: 5,
        },
        {
            quote:
                "The value for money is exceptional. We've seen a 40% increase in productivity since implementing this solution. The onboarding process was smooth and the support team is always helpful.",
            author: "Emily Rodriguez",
            role: "Operations Lead",
            company: "Global Services",
            avatar: "/placeholder.svg?height=100&width=100&text=ER",
            rating: 4,
        },
    ]

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

    // Auto-advance carousel
    useEffect(() => {
        if (variant === "carousel") {
            const interval = setInterval(() => {
                setActiveIndex((current) => (current + 1) % displayTestimonials.length)
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [variant, displayTestimonials.length])

    const renderRating = (rating = 5) => {
        return (
            <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
            </div>
        )
    }

    const renderCarousel = () => {
        return (
            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {displayTestimonials.map((testimonial, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-4">
                                <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                                    {testimonial.rating && renderRating(testimonial.rating)}
                                    <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        {testimonial.avatar && (
                                            <img
                                                src={testimonial.avatar || "/placeholder.svg"}
                                                alt={testimonial.author}
                                                className="w-12 h-12 rounded-full mr-4 object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="font-bold">{testimonial.author}</p>
                                            {(testimonial.role || testimonial.company) && (
                                                <p className="text-gray-600">
                                                    {testimonial.role}
                                                    {testimonial.role && testimonial.company && ", "}
                                                    {testimonial.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() =>
                        setActiveIndex((current) => (current - 1 + displayTestimonials.length) % displayTestimonials.length)
                    }
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => setActiveIndex((current) => (current + 1) % displayTestimonials.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={20} />
                </button>
                <div className="flex justify-center mt-6 space-x-2">
                    {displayTestimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-colors",
                                index === activeIndex ? "bg-blue-600" : "bg-gray-300",
                            )}
                            style={{ backgroundColor: index === activeIndex ? accentColor : "#d1d5db" }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        )
    }

    const renderCards = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayTestimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        {testimonial.rating && renderRating(testimonial.rating)}
                        <p className="italic mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            {testimonial.avatar && (
                                <img
                                    src={testimonial.avatar || "/placeholder.svg"}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                            )}
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                {(testimonial.role || testimonial.company) && (
                                    <p className="text-gray-600">
                                        {testimonial.role}
                                        {testimonial.role && testimonial.company && ", "}
                                        {testimonial.company}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderGrid = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayTestimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6 flex">
                        {testimonial.avatar && (
                            <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.author}
                                className="w-16 h-16 rounded-full mr-4 object-cover flex-shrink-0"
                            />
                        )}
                        <div>
                            {testimonial.rating && renderRating(testimonial.rating)}
                            <p className="italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-bold">{testimonial.author}</p>
                            {(testimonial.role || testimonial.company) && (
                                <p className="text-gray-600">
                                    {testimonial.role}
                                    {testimonial.role && testimonial.company && ", "}
                                    {testimonial.company}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderQuotes = () => {
        return (
            <div className="space-y-12">
                {displayTestimonials.map((testimonial, index) => (
                    <div key={index} className="max-w-3xl mx-auto text-center">
                        <div className="text-5xl font-serif mb-6" style={{ color: accentColor }}>
                            "
                        </div>
                        <p className="text-xl italic mb-6">{testimonial.quote}</p>
                        <div className="flex justify-center items-center">
                            {testimonial.avatar && (
                                <img
                                    src={testimonial.avatar || "/placeholder.svg"}
                                    alt={testimonial.author}
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                            )}
                            <div>
                                <p className="font-bold text-lg">{testimonial.author}</p>
                                {(testimonial.role || testimonial.company) && (
                                    <p className="text-gray-600">
                                        {testimonial.role}
                                        {testimonial.role && testimonial.company && ", "}
                                        {testimonial.company}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section
            className="py-16 px-4"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-xl">{subtitle}</p>
                </div>

                {variant === "carousel" && renderCarousel()}
                {variant === "cards" && renderCards()}
                {variant === "grid" && renderGrid()}
                {variant === "quotes" && renderQuotes()}
            </div>
        </section>
    )
}
