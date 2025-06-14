"use client"

import { Check, Star } from "lucide-react"

interface PricingPlan {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    popular?: boolean
    buttonText: string
    buttonVariant: "primary" | "secondary" | "outline"
}

interface TieredPricingProps {
    title?: string
    subtitle?: string
    plans?: PricingPlan[]
    theme?: any
}

export function TieredPricing({
                                  title = "Choose Your Plan",
                                  subtitle = "Select the perfect plan for your needs",
                                  plans = [
                                      {
                                          name: "Starter",
                                          price: "$9",
                                          period: "/month",
                                          description: "Perfect for individuals getting started",
                                          features: ["Up to 5 projects", "Basic analytics", "Email support", "1GB storage"],
                                          buttonText: "Start Free Trial",
                                          buttonVariant: "outline",
                                      },
                                      {
                                          name: "Professional",
                                          price: "$29",
                                          period: "/month",
                                          description: "For growing teams and businesses",
                                          features: [
                                              "Unlimited projects",
                                              "Advanced analytics",
                                              "Priority support",
                                              "10GB storage",
                                              "Team collaboration",
                                              "Custom integrations",
                                          ],
                                          popular: true,
                                          buttonText: "Get Started",
                                          buttonVariant: "primary",
                                      },
                                      {
                                          name: "Enterprise",
                                          price: "$99",
                                          period: "/month",
                                          description: "For large organizations with advanced needs",
                                          features: [
                                              "Everything in Professional",
                                              "Advanced security",
                                              "Dedicated support",
                                              "Unlimited storage",
                                              "Custom branding",
                                              "API access",
                                              "SLA guarantee",
                                          ],
                                          buttonText: "Contact Sales",
                                          buttonVariant: "secondary",
                                      },
                                  ],
                                  theme,
                              }: TieredPricingProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                                plan.popular ? "ring-2 ring-blue-500 transform scale-105" : "hover:shadow-xl transition-shadow"
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center space-x-1">
                                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600">{plan.period}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center space-x-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    plan.buttonVariant === "primary"
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : plan.buttonVariant === "secondary"
                                            ? "bg-gray-800 text-white hover:bg-gray-900"
                                            : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
                    <p className="text-sm text-gray-500">
                        Questions about our plans?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Contact our sales team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
