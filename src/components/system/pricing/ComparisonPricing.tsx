"use client"

import { useState } from "react"
import { Check, X, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Feature {
    name: string
    description?: string
    starter: boolean | string
    professional: boolean | string
    enterprise: boolean | string
}

interface ComparisonPricingProps {
    title?: string
    subtitle?: string
    features?: Feature[]
    theme?: any
}

export function ComparisonPricing({
                                      title = "Compare Plans",
                                      subtitle = "Choose the plan that's right for your business",
                                      features = [
                                          {
                                              name: "Projects",
                                              description: "Number of active projects you can manage",
                                              starter: "5",
                                              professional: "Unlimited",
                                              enterprise: "Unlimited",
                                          },
                                          {
                                              name: "Storage",
                                              description: "Total storage space for your files and assets",
                                              starter: "10GB",
                                              professional: "100GB",
                                              enterprise: "Unlimited",
                                          },
                                          {
                                              name: "Team Members",
                                              description: "Number of team members who can access your account",
                                              starter: "1",
                                              professional: "10",
                                              enterprise: "Unlimited",
                                          },
                                          {
                                              name: "Analytics",
                                              starter: true,
                                              professional: true,
                                              enterprise: true,
                                          },
                                          {
                                              name: "Custom Domain",
                                              starter: false,
                                              professional: true,
                                              enterprise: true,
                                          },
                                          {
                                              name: "API Access",
                                              starter: false,
                                              professional: true,
                                              enterprise: true,
                                          },
                                          {
                                              name: "Priority Support",
                                              starter: false,
                                              professional: true,
                                              enterprise: true,
                                          },
                                          {
                                              name: "White Label",
                                              starter: false,
                                              professional: false,
                                              enterprise: true,
                                          },
                                          {
                                              name: "SLA Guarantee",
                                              starter: false,
                                              professional: false,
                                              enterprise: true,
                                          },
                                          {
                                              name: "Dedicated Support",
                                              starter: false,
                                              professional: false,
                                              enterprise: true,
                                          },
                                      ],
                                      theme,
                                  }: ComparisonPricingProps) {
    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

    const plans = [
        {
            name: "Starter",
            price: "$19",
            period: "/month",
            description: "Perfect for individuals",
            popular: false,
            color: "blue",
        },
        {
            name: "Professional",
            price: "$49",
            period: "/month",
            description: "Great for growing teams",
            popular: true,
            color: "purple",
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "/month",
            description: "For large organizations",
            popular: false,
            color: "gray",
        },
    ]

    const renderFeatureValue = (value: boolean | string, planName: string) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="h-5 w-5 text-green-500 mx-auto" />
            ) : (
                <X className="h-5 w-5 text-gray-300 mx-auto" />
            )
        }
        return (
            <span className={`text-sm font-medium ${planName === "Professional" ? "text-purple-600" : "text-gray-900"}`}>
        {value}
      </span>
        )
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Comparison Table */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Plan Headers */}
                        <div className="grid grid-cols-4 bg-gray-50">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                            </div>
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`p-6 text-center relative ${
                                        plan.popular ? "bg-purple-50 border-l-2 border-r-2 border-purple-500" : ""
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                                                <Star className="h-4 w-4 mr-1" />
                                                Popular
                                            </div>
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600 ml-1">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                                    <Button
                                        className={`w-full ${
                                            plan.popular
                                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                                : "bg-gray-900 hover:bg-gray-800 text-white"
                                        }`}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Feature Rows */}
                        <div className="divide-y divide-gray-200">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-4 hover:bg-gray-50 transition-colors duration-200 ${
                                        hoveredFeature === feature.name ? "bg-blue-50" : ""
                                    }`}
                                    onMouseEnter={() => setHoveredFeature(feature.name)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                >
                                    <div className="p-6 flex items-center">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-900">{feature.name}</span>
                                            {feature.description && (
                                                <div className="relative group">
                                                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                                    <div className="absolute left-0 top-6 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                        {feature.description}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 flex items-center justify-center">
                                        {renderFeatureValue(feature.starter, "Starter")}
                                    </div>
                                    <div className={`p-6 flex items-center justify-center ${plans[1].popular ? "bg-purple-50/50" : ""}`}>
                                        {renderFeatureValue(feature.professional, "Professional")}
                                    </div>
                                    <div className="p-6 flex items-center justify-center">
                                        {renderFeatureValue(feature.enterprise, "Enterprise")}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-gray-50 p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
                            <p className="text-gray-600 mb-4">Our team is here to help you choose the right plan for your needs.</p>
                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-2">All plans include 30-day free trial • No setup fees • Cancel anytime</p>
                    <p className="text-sm text-gray-500">Prices shown in USD. Local taxes may apply.</p>
                </div>
            </div>
        </section>
    )
}
