"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"

export function SpaServiceMenu(props: any) {
    const categories = props.categories || ["Massage Therapy", "Facials", "Body Treatments"]

    const services = props.services || [
        {
            name: "Swedish Massage",
            description:
                "A gentle, relaxing massage that uses long strokes, kneading, and circular movements to ease tension.",
            duration: "60 min",
            price: "$95",
            category: "Massage Therapy",
            popular: true,
        },
        {
            name: "Deep Tissue Massage",
            description:
                "Targets the inner layers of muscles using slow strokes and firm pressure to release chronic muscle tension.",
            duration: "60 min",
            price: "$110",
            category: "Massage Therapy",
        },
        {
            name: "Hot Stone Massage",
            description: "Heated stones placed on specific points of the body to warm and relax tight muscles.",
            duration: "75 min",
            price: "$125",
            category: "Massage Therapy",
            popular: true,
        },
        {
            name: "Classic European Facial",
            description: "Deep cleansing, exfoliation, and hydration tailored to your skin type.",
            duration: "50 min",
            price: "$85",
            category: "Facials",
        },
        {
            name: "Anti-Aging Facial",
            description: "Reduces fine lines and wrinkles with specialized serums and techniques.",
            duration: "60 min",
            price: "$115",
            category: "Facials",
            popular: true,
        },
        {
            name: "Hydrating Facial",
            description: "Intensive moisture treatment for dry or dehydrated skin.",
            duration: "50 min",
            price: "$90",
            category: "Facials",
        },
        {
            name: "Salt Scrub",
            description: "Exfoliating treatment that removes dead skin cells leaving skin smooth and refreshed.",
            duration: "45 min",
            price: "$80",
            category: "Body Treatments",
        },
        {
            name: "Detox Mud Wrap",
            description: "Draws out impurities while nourishing your skin with minerals.",
            duration: "60 min",
            price: "$110",
            category: "Body Treatments",
            popular: true,
        },
        {
            name: "Aromatherapy Body Treatment",
            description: "Essential oil-infused treatment to balance mind and body.",
            duration: "75 min",
            price: "$130",
            category: "Body Treatments",
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Spa Services"}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {props.subtitle || "Rejuvenate your body and mind with our premium spa treatments"}
                    </p>
                </div>

                {categories.map((category: string) => {
                    const categoryServices = services.filter((service: any) => service.category === category)

                    return (
                        <div key={category} className="mb-16">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryServices.map((service: any, index: number) => (
                                    <Card
                                        key={index}
                                        className={`hover:shadow-lg transition-all duration-300 ${
                                            service.popular ? "border-2 border-purple-300" : ""
                                        }`}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-xl font-semibold text-gray-900">{service.name}</h4>
                                                {service.popular && (
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                            Popular
                          </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center text-gray-500">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    <span>{service.duration}</span>
                                                </div>
                                                <span className="text-xl font-semibold text-purple-600">{service.price}</span>
                                            </div>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                                <Calendar className="h-4 w-4 mr-2" /> Book Now
                                            </Button>
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

export default SpaServiceMenu
