"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { Switch } from "@/components/ui/switch"

interface PricingFeature {
    name: string
    included: boolean
}

interface PricingTier {
    name: string
    price: {
        monthly: number
        annually: number
    }
    description: string
    features: PricingFeature[]
    buttonText: string
    buttonLink: string
    highlighted?: boolean
    badge?: string
}

interface PricingSectionProps {
    title?: string
    subtitle?: string
    tiers?: PricingTier[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    showToggle?: boolean
    keywords?: string[]
}

export default function PricingSection({
                                           title = "Simple, Transparent Pricing",
                                           subtitle = "Choose the plan that's right for you",
                                           tiers,
                                           backgroundColor = "#ffffff",
                                           textColor = "#000000",
                                           accentColor = "#3b82f6",
                                           textAlignment = "center",
                                           showToggle = true,
                                           keywords = [],
                                       }: PricingSectionProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")

    const defaultTiers: PricingTier[] = [
        {
            name: "Free",
            price: {
                monthly: 0,
                annually: 0,
            },
            description: "Perfect for trying out our platform",
            features: [
                { name: "1 website", included: true },
                { name: "Basic templates", included: true },
                { name: "Community support", included: true },
                { name: "Export HTML/CSS", included: false },
                { name: "Custom domain", included: false },
                { name: "Analytics", included: false },
            ],
            buttonText: "Get Started",
            buttonLink: "/signup",
        },
        {
            name: "Pro",
            price: {
                monthly: 29,
                annually: 19,
            },
            description: "Everything you need for a professional website",
            features: [
                { name: "5 websites", included: true },
                { name: "All templates", included: true },
                { name: "Priority support", included: true },
                { name: "Export HTML/CSS", included: true },
                { name: "Custom domain", included: true },
                { name: "Analytics", included: false },
            ],
            buttonText: "Upgrade to Pro",
            buttonLink: "/signup?plan=pro",
            highlighted: true,
            badge: "Popular",
        },
        {
            name: "Business",
            price: {
                monthly: 79,
                annually: 59,
            },
            description: "For teams and businesses with advanced needs",
            features: [
                { name: "Unlimited websites", included: true },
                { name: "All templates", included: true },
                { name: "24/7 support", included: true },
                { name: "Export HTML/CSS", included: true },
                { name: "Custom domain", included: true },
                { name: "Advanced Analytics", included: true },
            ],
            buttonText: "Contact Sales",
            buttonLink: "/contact",
        },
    ]

    const displayTiers = tiers || defaultTiers
    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    const toggleBillingCycle = () => {
        setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}

                    {showToggle && (
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <span className={billingCycle === "monthly" ? "font-medium" : "opacity-70"}>Monthly</span>
                            <Switch
                                checked={billingCycle === "annually"}
                                onCheckedChange={toggleBillingCycle}
                                aria-label="Toggle billing cycle"
                            />
                            <span className={billingCycle === "annually" ? "font-medium" : "opacity-70"}>
                Annually <span className="text-sm text-green-500 font-medium">Save 20%</span>
              </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={cn(
                                "rounded-lg p-8 border transition-all",
                                tier.highlighted ? "border-primary shadow-lg scale-105 z-10" : "border-gray-200",
                            )}
                        >
                            {tier.badge && (
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-white mb-4">
                  {tier.badge}
                </span>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                            <div className="mb-4">
                <span className="text-4xl font-bold" style={tier.highlighted ? accentStyle : {}}>
                  ${billingCycle === "monthly" ? tier.price.monthly : tier.price.annually}
                </span>
                                <span className="text-sm opacity-70">
                  {tier.price.monthly > 0 ? `/${billingCycle === "monthly" ? "mo" : "mo, billed annually"}` : ""}
                </span>
                            </div>
                            <p className="text-sm opacity-80 mb-6">{tier.description}</p>

                            <Link
                                href={tier.buttonLink}
                                className={cn(
                                    "block w-full py-2 px-4 rounded text-center font-medium mb-8",
                                    tier.highlighted
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                                )}
                            >
                                {tier.buttonText}
                            </Link>

                            <ul className="space-y-3">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-2">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span className={feature.included ? "" : "opacity-50"}>{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
