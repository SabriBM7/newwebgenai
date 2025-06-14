"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"

interface TechPricingProps {
    title?: string
    subtitle?: string
    plans?: Array<{
        name: string
        price: string
        period: string
        description: string
        features: string[]
        popular?: boolean
        buttonText: string
        badge?: string
    }>
}

export default function TechPricing({ title, subtitle, plans }: TechPricingProps) {
    const defaultPlans = [
        {
            name: "Startup Package",
            price: "$5,000",
            period: "one-time",
            description: "Perfect for startups and small businesses looking to establish their digital presence",
            features: [
                "Custom Website Development",
                "Responsive Design",
                "Basic SEO Optimization",
                "Contact Form Integration",
                "3 Months Support",
                "Source Code Included",
            ],
            buttonText: "Get Started",
            badge: "Most Popular",
        },
        {
            name: "Business Solution",
            price: "$15,000",
            period: "project",
            description: "Comprehensive solution for growing businesses with advanced features and integrations",
            features: [
                "Full-Stack Web Application",
                "Database Design & Setup",
                "API Development",
                "User Authentication",
                "Admin Dashboard",
                "Payment Integration",
                "6 Months Support",
                "Performance Optimization",
            ],
            popular: true,
            buttonText: "Choose Business",
            badge: "Best Value",
        },
        {
            name: "Enterprise Package",
            price: "$50,000+",
            period: "project",
            description: "Large-scale solutions with custom architecture, advanced security, and dedicated support",
            features: [
                "Custom Software Development",
                "Microservices Architecture",
                "Cloud Infrastructure Setup",
                "Advanced Security Features",
                "Load Balancing & Scaling",
                "24/7 Monitoring",
                "12 Months Support",
                "Dedicated Project Manager",
                "Training & Documentation",
            ],
            buttonText: "Contact Sales",
            badge: "Enterprise",
        },
    ]

    const pricingPlans = plans || defaultPlans

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Transparent Pricing"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Choose the perfect plan for your project needs"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative hover:shadow-lg transition-shadow duration-300 h-full ${
                                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                            }`}
                        >
                            {plan.badge && (
                                <Badge
                                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                                        plan.popular ? "bg-blue-600" : "bg-gray-600"
                                    } text-white`}
                                >
                                    {plan.popular && <Star className="h-3 w-3 mr-1" />}
                                    {plan.badge}
                                </Badge>
                            )}

                            <CardContent className="p-6 text-center h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                                    <span className="text-gray-500 ml-2">/ {plan.period}</span>
                                </div>

                                <div className="flex-1 mb-6">
                                    <ul className="space-y-3 text-left">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    className={`w-full ${
                                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
                                    } text-white`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Need a custom solution? We offer flexible pricing for unique requirements.
                    </p>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        Request Custom Quote
                    </Button>
                </div>
            </div>
        </section>
    )
}
