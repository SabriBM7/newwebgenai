"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingFeature {
    title: string
    included: boolean
}

interface PricingPlan {
    name: string
    price: string
    description: string
    features: PricingFeature[]
    buttonText: string
    buttonLink: string
    highlighted?: boolean
    popular?: boolean
}

interface AdvancedPricingProps {
    title?: string
    subtitle?: string
    description?: string
    plans: PricingPlan[]
    showToggle?: boolean
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export default function AdvancedPricing({
                                            title = "Pricing Plans",
                                            subtitle = "Choose the plan that works for you",
                                            description,
                                            plans = [],
                                            showToggle = true,
                                            backgroundColor = "white",
                                            textColor = "black",
                                            accentColor = "#3b82f6",
                                        }: AdvancedPricingProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

    // Default plans if none provided
    const defaultPlans: PricingPlan[] = [
        {
            name: "Basic",
            price: billingCycle === "monthly" ? "$29" : "$290",
            description: "Perfect for individuals and small projects",
            features: [
                { title: "Basic features", included: true },
                { title: "Up to 5 projects", included: true },
                { title: "1 GB storage", included: true },
                { title: "Email support", included: true },
                { title: "Advanced analytics", included: false },
                { title: "Priority support", included: false },
            ],
            buttonText: "Get Started",
            buttonLink: "#",
        },
        {
            name: "Pro",
            price: billingCycle === "monthly" ? "$79" : "$790",
            description: "Ideal for growing businesses and teams",
            features: [
                { title: "All Basic features", included: true },
                { title: "Unlimited projects", included: true },
                { title: "10 GB storage", included: true },
                { title: "Priority email support", included: true },
                { title: "Advanced analytics", included: true },
                { title: "API access", included: false },
            ],
            buttonText: "Get Started",
            buttonLink: "#",
            popular: true,
            highlighted: true,
        },
        {
            name: "Enterprise",
            price: billingCycle === "monthly" ? "$199" : "$1,990",
            description: "For large organizations with advanced needs",
            features: [
                { title: "All Pro features", included: true },
                { title: "Unlimited projects", included: true },
                { title: "100 GB storage", included: true },
                { title: "24/7 phone support", included: true },
                { title: "Advanced analytics", included: true },
                { title: "API access", included: true },
            ],
            buttonText: "Contact Sales",
            buttonLink: "#",
        },
    ]

    const displayPlans = plans.length > 0 ? plans : defaultPlans

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
                    <p className="text-xl mb-6">{subtitle}</p>
                    {description && <p className="max-w-3xl mx-auto">{description}</p>}

                    {showToggle && (
                        <div className="flex justify-center items-center mt-8">
                            <span className={cn("mr-3", billingCycle === "yearly" && "opacity-50")}>Monthly</span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                    billingCycle === "yearly" ? "bg-blue-600" : "bg-gray-200",
                                )}
                            >
                <span
                    className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        billingCycle === "yearly" ? "translate-x-6" : "translate-x-1",
                    )}
                />
                            </button>
                            <span className={cn("ml-3", billingCycle === "monthly" && "opacity-50")}>
                Yearly <span className="text-green-500 font-medium">(Save 20%)</span>
              </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={cn(
                                "rounded-lg overflow-hidden",
                                plan.highlighted
                                    ? "border-2 border-blue-500 shadow-lg transform md:-translate-y-4"
                                    : "border border-gray-200 shadow",
                            )}
                        >
                            {plan.popular && (
                                <div
                                    className="py-1 text-center text-sm font-medium text-white"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    Most Popular
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {billingCycle === "monthly" ? (
                                        <span className="text-sm">/month</span>
                                    ) : (
                                        <span className="text-sm">/year</span>
                                    )}
                                </div>
                                <p className="text-gray-500 mb-6">{plan.description}</p>
                                <a
                                    href={plan.buttonLink}
                                    className={cn(
                                        "block w-full py-2 px-4 rounded text-center font-medium transition-colors",
                                        plan.highlighted
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-800",
                                    )}
                                    style={
                                        plan.highlighted
                                            ? { backgroundColor: accentColor, color: "white" }
                                            : { backgroundColor: "#f3f4f6", color: textColor }
                                    }
                                >
                                    {plan.buttonText}
                                </a>
                            </div>
                            <div className="px-6 pb-6">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                      <span
                          className={cn(
                              "flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 mt-0.5",
                              feature.included ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400",
                          )}
                      >
                        {feature.included ? <Check size={12} /> : "×"}
                      </span>
                                            <span className={feature.included ? "" : "text-gray-400"}>{feature.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
