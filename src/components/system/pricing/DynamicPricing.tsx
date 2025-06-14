"use client"

import { useState } from "react"
import { Check, Zap, Crown, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingPlan {
    id: string
    name: string
    description: string
    monthlyPrice: number
    yearlyPrice: number
    features: string[]
    popular?: boolean
    icon: any
    color: string
    savings?: string
}

interface DynamicPricingProps {
    title?: string
    subtitle?: string
    plans?: PricingPlan[]
    theme?: any
}

export function DynamicPricing({
                                   title = "Flexible Pricing Plans",
                                   subtitle = "Choose the perfect plan that scales with your business needs",
                                   plans = [
                                       {
                                           id: "starter",
                                           name: "Starter",
                                           description: "Perfect for individuals and small projects",
                                           monthlyPrice: 19,
                                           yearlyPrice: 190,
                                           features: ["Up to 5 projects", "10GB storage", "Basic analytics", "Email support", "SSL certificate"],
                                           icon: Zap,
                                           color: "blue",
                                       },
                                       {
                                           id: "professional",
                                           name: "Professional",
                                           description: "Ideal for growing teams and businesses",
                                           monthlyPrice: 49,
                                           yearlyPrice: 490,
                                           features: [
                                               "Unlimited projects",
                                               "100GB storage",
                                               "Advanced analytics",
                                               "Priority support",
                                               "Custom domain",
                                               "Team collaboration",
                                               "API access",
                                           ],
                                           popular: true,
                                           icon: Crown,
                                           color: "purple",
                                           savings: "Save $98/year",
                                       },
                                       {
                                           id: "enterprise",
                                           name: "Enterprise",
                                           description: "For large organizations with advanced needs",
                                           monthlyPrice: 99,
                                           yearlyPrice: 990,
                                           features: [
                                               "Everything in Professional",
                                               "Unlimited storage",
                                               "White-label solution",
                                               "Dedicated support",
                                               "SLA guarantee",
                                               "Advanced security",
                                               "Custom integrations",
                                               "Training sessions",
                                           ],
                                           icon: Star,
                                           color: "gold",
                                           savings: "Save $198/year",
                                       },
                                   ],
                                   theme,
                               }: DynamicPricingProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

    const getColorClasses = (color: string, variant: "bg" | "text" | "border") => {
        const colorMap = {
            blue: {
                bg: "bg-blue-600 hover:bg-blue-700",
                text: "text-blue-600",
                border: "border-blue-600",
            },
            purple: {
                bg: "bg-purple-600 hover:bg-purple-700",
                text: "text-purple-600",
                border: "border-purple-600",
            },
            gold: {
                bg: "bg-yellow-600 hover:bg-yellow-700",
                text: "text-yellow-600",
                border: "border-yellow-600",
            },
        }
        return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant]
    }

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 mb-8">{subtitle}</p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                billingCycle === "monthly" ? "bg-white text-gray-900 shadow-md" : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-full transition-all duration-300 relative ${
                                billingCycle === "yearly" ? "bg-white text-gray-900 shadow-md" : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Yearly
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => {
                        const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
                        const IconComponent = plan.icon

                        return (
                            <div
                                key={plan.id}
                                className={`relative bg-white rounded-3xl shadow-lg p-8 transition-all duration-500 ${
                                    plan.popular
                                        ? "ring-2 ring-purple-500 transform scale-105 z-10"
                                        : hoveredPlan === plan.id
                                            ? "shadow-2xl transform scale-105"
                                            : "hover:shadow-xl hover:transform hover:scale-102"
                                }`}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="text-center mb-8">
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                                            plan.color === "blue"
                                                ? "bg-blue-100"
                                                : plan.color === "purple"
                                                    ? "bg-purple-100"
                                                    : "bg-yellow-100"
                                        }`}
                                    >
                                        <IconComponent className={`h-8 w-8 ${getColorClasses(plan.color, "text")}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-5xl font-bold text-gray-900">${price}</span>
                                            <span className="text-gray-600 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                                        </div>
                                        {billingCycle === "yearly" && plan.savings && (
                                            <p className="text-green-600 text-sm font-medium mt-2">{plan.savings}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                                        plan.popular
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            : `${getColorClasses(plan.color, "bg")} text-white`
                                    }`}
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>

                                {/* Money Back Guarantee */}
                                <p className="text-center text-sm text-gray-500 mt-4">30-day money-back guarantee</p>
                            </div>
                        )
                    })}
                </div>

                {/* Additional Info */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-4">All plans include free SSL, daily backups, and 99.9% uptime guarantee</p>
                    <p className="text-sm text-gray-500">
                        Need a custom solution?{" "}
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Contact our sales team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
