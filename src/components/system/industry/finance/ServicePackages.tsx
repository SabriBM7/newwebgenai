"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, TrendingUp, Shield, Calculator } from "lucide-react"

interface ServicePackage {
    id: string
    name: string
    description: string
    price: string
    period: string
    features: string[]
    popular: boolean
    icon: string
    buttonText: string
    buttonVariant: "default" | "outline"
}

interface ServicePackagesProps {
    title?: string
    subtitle?: string
    packages?: ServicePackage[]
    backgroundColor?: string
    textColor?: string
}

export default function ServicePackages({
                                            title = "Our Financial Services",
                                            subtitle = "Choose the perfect plan for your financial goals",
                                            packages = [],
                                            backgroundColor = "bg-white",
                                            textColor = "text-gray-900",
                                        }: ServicePackagesProps) {
    const defaultPackages: ServicePackage[] = [
        {
            id: "1",
            name: "Personal Banking",
            description: "Essential banking services for individuals",
            price: "Free",
            period: "monthly",
            features: [
                "Free checking account",
                "Online & mobile banking",
                "ATM access nationwide",
                "Direct deposit",
                "24/7 customer support",
                "Fraud protection",
            ],
            popular: false,
            icon: "shield",
            buttonText: "Open Account",
            buttonVariant: "outline",
        },
        {
            id: "2",
            name: "Investment Advisory",
            description: "Professional investment management and advice",
            price: "$99",
            period: "monthly",
            features: [
                "Personal financial advisor",
                "Portfolio management",
                "Investment research",
                "Tax optimization",
                "Quarterly reviews",
                "Risk assessment",
                "Retirement planning",
            ],
            popular: true,
            icon: "trending-up",
            buttonText: "Get Started",
            buttonVariant: "default",
        },
        {
            id: "3",
            name: "Business Solutions",
            description: "Comprehensive financial services for businesses",
            price: "$299",
            period: "monthly",
            features: [
                "Business checking & savings",
                "Merchant services",
                "Business loans",
                "Cash management",
                "Payroll services",
                "Business credit cards",
                "Dedicated relationship manager",
                "Financial reporting",
            ],
            popular: false,
            icon: "calculator",
            buttonText: "Contact Sales",
            buttonVariant: "outline",
        },
    ]

    const displayPackages = packages.length > 0 ? packages : defaultPackages

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "shield":
                return <Shield className="h-8 w-8" />
            case "trending-up":
                return <TrendingUp className="h-8 w-8" />
            case "calculator":
                return <Calculator className="h-8 w-8" />
            default:
                return <Star className="h-8 w-8" />
        }
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    <p className={`text-lg ${textColor} opacity-80 max-w-2xl mx-auto`}>{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {displayPackages.map((pkg) => (
                        <Card
                            key={pkg.id}
                            className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                                pkg.popular ? "ring-2 ring-blue-500 scale-105" : ""
                            }`}
                        >
                            {pkg.popular && (
                                <Badge className="absolute top-4 right-4" variant="default">
                                    Most Popular
                                </Badge>
                            )}

                            <CardHeader className="text-center pb-4">
                                <div className="flex justify-center mb-4">
                                    <div
                                        className={`p-3 rounded-full ${pkg.popular ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {getIcon(pkg.icon)}
                                    </div>
                                </div>

                                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                                <div className="text-center">
                                    <span className="text-3xl font-bold text-blue-600">{pkg.price}</span>
                                    {pkg.price !== "Free" && <span className="text-gray-600">/{pkg.period}</span>}
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <ul className="space-y-3 mb-6">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full" variant={pkg.buttonVariant} size="lg">
                                    {pkg.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Need a custom solution? Our team is here to help.</p>
                    <Button variant="outline">Contact Our Specialists</Button>
                </div>
            </div>
        </section>
    )
}
