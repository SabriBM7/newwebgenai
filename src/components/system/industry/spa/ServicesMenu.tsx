"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"

interface SpaService {
    name: string
    description: string
    duration: string
    price: string
    category: string
    rating?: number
    image?: string
}

interface SpaServicesMenuProps {
    title?: string
    subtitle?: string
    services?: SpaService[]
}

export default function SpaServicesMenu({
                                            title = "Spa Services",
                                            subtitle = "Rejuvenate your mind, body, and soul",
                                            services = [
                                                {
                                                    name: "Swedish Massage",
                                                    description: "Relaxing full-body massage using gentle, flowing strokes to ease tension and promote relaxation",
                                                    duration: "60 min",
                                                    price: "$120",
                                                    category: "Massage",
                                                    rating: 4.9,
                                                    image: "/placeholder.svg?height=200&width=300",
                                                },
                                                {
                                                    name: "Deep Tissue Massage",
                                                    description: "Therapeutic massage targeting deeper muscle layers to relieve chronic tension and pain",
                                                    duration: "90 min",
                                                    price: "$160",
                                                    category: "Massage",
                                                    rating: 4.8,
                                                    image: "/placeholder.svg?height=200&width=300",
                                                },
                                                {
                                                    name: "European Facial",
                                                    description: "Customized facial treatment with cleansing, exfoliation, and hydrating mask for glowing skin",
                                                    duration: "75 min",
                                                    price: "$95",
                                                    category: "Facial",
                                                    rating: 4.9,
                                                    image: "/placeholder.svg?height=200&width=300",
                                                },
                                            ],
                                        }: SpaServicesMenuProps) {
    const categories = [...new Set(services.map((service) => service.category))]

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {categories.map((category, categoryIndex) => {
                    const categoryServices = services.filter((service) => service.category === category)

                    return (
                        <div key={categoryIndex} className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-purple-800">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categoryServices.map((service, index) => (
                                    <Card
                                        key={index}
                                        className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                    >
                                        <div className="relative">
                                            <img
                                                src={service.image || "/placeholder.svg"}
                                                alt={service.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <Badge className="absolute top-4 left-4 bg-purple-600 text-white">{service.category}</Badge>
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="text-xl font-semibold text-gray-900">{service.name}</h4>
                                                {service.rating && (
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {service.duration}
                                                </div>
                                                <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                                            </div>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Book Now</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
