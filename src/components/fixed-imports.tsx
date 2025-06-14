"use client"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Create a proper AdvancedTestimonials component
function AdvancedTestimonials(props: any) {
    const testimonials = props.testimonials || [
        {
            name: "John Smith",
            role: "Customer",
            content: "Excellent service and quality. Highly recommended!",
            rating: 5,
            image: "/placeholder.svg?height=100&width=100&text=JS",
        },
        {
            name: "Sarah Johnson",
            role: "Regular Client",
            content: "Always professional and delivers on time.",
            rating: 5,
            image: "/placeholder.svg?height=100&width=100&text=SJ",
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "What Our Clients Say"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Real reviews from our valued customers"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial: any, index: number) => (
                        <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic leading-relaxed">
                                    "{testimonial.content || testimonial.quote}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name || testimonial.author}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name || testimonial.author}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role || testimonial.company}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export { AdvancedTestimonials }
