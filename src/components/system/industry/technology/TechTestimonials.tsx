"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TechTestimonialsProps {
    title?: string
    subtitle?: string
    testimonials?: Array<{
        name: string
        role: string
        company: string
        content: string
        rating: number
        image: string
        projectType: string
    }>
}

export default function TechTestimonials({ title, subtitle, testimonials }: TechTestimonialsProps) {
    const defaultTestimonials = [
        {
            name: "Jennifer Martinez",
            role: "CTO",
            company: "FinTech Solutions Inc.",
            content:
                "The team delivered an exceptional mobile banking app that exceeded our expectations. Their expertise in security and user experience is unmatched. The app has received a 4.8-star rating on both app stores.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=100&h=100&fit=crop",
            projectType: "Mobile App Development",
        },
        {
            name: "Robert Chen",
            role: "Founder & CEO",
            company: "E-Commerce Ventures",
            content:
                "Our e-commerce platform built by this team has processed over $2M in sales in the first year. The scalable architecture and performance optimizations have been crucial to our success.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            projectType: "E-Commerce Platform",
        },
        {
            name: "Dr. Sarah Williams",
            role: "Head of Innovation",
            company: "HealthTech Analytics",
            content:
                "The AI-powered analytics dashboard has revolutionized how we analyze patient data. The machine learning models are incredibly accurate and the insights have improved our decision-making process significantly.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
            projectType: "AI/ML Solution",
        },
        {
            name: "Mark Thompson",
            role: "VP of Technology",
            company: "Global Manufacturing Corp",
            content:
                "The cloud migration and DevOps implementation reduced our infrastructure costs by 40% while improving system reliability. The team's expertise in AWS and containerization is outstanding.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            projectType: "Cloud Migration",
        },
        {
            name: "Lisa Park",
            role: "Product Manager",
            company: "SaaS Innovations",
            content:
                "Working with this development team was a game-changer for our startup. They delivered a robust SaaS platform on time and within budget. The code quality and documentation are exceptional.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
            projectType: "SaaS Platform",
        },
        {
            name: "David Rodriguez",
            role: "IT Director",
            company: "Retail Chain Solutions",
            content:
                "The custom inventory management system has streamlined our operations across 50+ locations. Real-time synchronization and reporting features have improved our efficiency by 60%.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            projectType: "Enterprise Software",
        },
    ]

    const techTestimonials = testimonials || defaultTestimonials

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Client Success Stories"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Hear from our clients about their experience working with us"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techTestimonials.map((testimonial, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                <p className="text-gray-600 mb-6 italic leading-relaxed flex-1">"{testimonial.content}"</p>

                                <div className="mt-auto">
                                    <div className="flex items-center mb-3">
                                        <img
                                            src={testimonial.image || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                                            <div className="text-sm text-blue-600">{testimonial.company}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full inline-block">
                                        {testimonial.projectType}
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
