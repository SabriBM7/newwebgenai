"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, Gift, CreditCard, Shield } from "lucide-react"

interface DonationOption {
    amount: number
    description: string
    impact: string
    popular?: boolean
}

interface DonationFormProps {
    title?: string
    subtitle?: string
    organizationName?: string
    donationOptions?: DonationOption[]
    causes?: string[]
    showImpact?: boolean
}

export default function DonationForm({
                                         title = "Make a Difference Today",
                                         subtitle = "Your donation helps us continue our mission to create positive change in our community",
                                         organizationName = "Hope Foundation",
                                         donationOptions = [],
                                         causes = [],
                                         showImpact = true,
                                     }: DonationFormProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState("")
    const [selectedCause, setSelectedCause] = useState("general")
    const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
    const [donorInfo, setDonorInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    })

    const defaultDonationOptions: DonationOption[] = [
        {
            amount: 25,
            description: "Supporter",
            impact: "Provides meals for 5 families",
            popular: false,
        },
        {
            amount: 50,
            description: "Advocate",
            impact: "Supplies school materials for 10 children",
            popular: true,
        },
        {
            amount: 100,
            description: "Champion",
            impact: "Funds medical care for 3 individuals",
            popular: false,
        },
        {
            amount: 250,
            description: "Hero",
            impact: "Supports a family for one month",
            popular: false,
        },
    ]

    const defaultCauses = [
        "General Fund",
        "Education Programs",
        "Healthcare Initiatives",
        "Emergency Relief",
        "Community Development",
    ]

    const displayOptions = donationOptions.length > 0 ? donationOptions : defaultDonationOptions
    const displayCauses = causes.length > 0 ? causes : defaultCauses

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount)
        setCustomAmount("")
    }

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value)
        setSelectedAmount(null)
    }

    const getCurrentAmount = () => {
        return selectedAmount || (customAmount ? Number.parseFloat(customAmount) : 0)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Donation Form */}
                        <div className="lg:col-span-2">
                            <Card className="shadow-lg">
                                <CardContent className="p-8">
                                    {/* Donation Type Toggle */}
                                    <div className="mb-8">
                                        <div className="flex bg-gray-100 rounded-lg p-1">
                                            <button
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                                    donationType === "one-time"
                                                        ? "bg-white text-green-600 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-900"
                                                }`}
                                                onClick={() => setDonationType("one-time")}
                                            >
                                                One-time Donation
                                            </button>
                                            <button
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                                    donationType === "monthly"
                                                        ? "bg-white text-green-600 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-900"
                                                }`}
                                                onClick={() => setDonationType("monthly")}
                                            >
                                                Monthly Giving
                                            </button>
                                        </div>
                                    </div>

                                    {/* Donation Amounts */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Choose Your {donationType === "monthly" ? "Monthly " : ""}Donation Amount
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                            {displayOptions.map((option) => (
                                                <button
                                                    key={option.amount}
                                                    className={`relative p-4 border-2 rounded-lg text-center transition-all ${
                                                        selectedAmount === option.amount
                                                            ? "border-green-500 bg-green-50"
                                                            : "border-gray-200 hover:border-green-300"
                                                    }`}
                                                    onClick={() => handleAmountSelect(option.amount)}
                                                >
                                                    {option.popular && (
                                                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs">
                                                            Popular
                                                        </Badge>
                                                    )}
                                                    <div className="text-2xl font-bold text-gray-900">${option.amount}</div>
                                                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Custom Amount */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Or enter a custom amount:</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    value={customAmount}
                                                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cause Selection */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Cause (Optional)</h3>
                                        <select
                                            value={selectedCause}
                                            onChange={(e) => setSelectedCause(e.target.value)}
                                            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="general">General Fund</option>
                                            {displayCauses.slice(1).map((cause, index) => (
                                                <option key={index} value={cause.toLowerCase().replace(/\s+/g, "-")}>
                                                    {cause}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Donor Information */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                                <input
                                                    type="text"
                                                    value={donorInfo.firstName}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                                                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                                <input
                                                    type="text"
                                                    value={donorInfo.lastName}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                                                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                                <input
                                                    type="email"
                                                    value={donorInfo.email}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={donorInfo.phone}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                                                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Donate Button */}
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                                        disabled={getCurrentAmount() === 0}
                                    >
                                        <Heart className="h-5 w-5 mr-2" />
                                        Donate ${getCurrentAmount().toFixed(2)} {donationType === "monthly" ? "Monthly" : "Now"}
                                    </Button>

                                    {/* Security Notice */}
                                    <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                                        <Shield className="h-4 w-4 mr-2" />
                                        Secure donation powered by SSL encryption
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Impact Sidebar */}
                        <div className="lg:col-span-1">
                            {showImpact && (
                                <Card className="shadow-lg mb-6">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <Target className="h-5 w-5 mr-2 text-green-600" />
                                            Your Impact
                                        </h3>
                                        {getCurrentAmount() > 0 && (
                                            <div className="bg-green-50 p-4 rounded-lg mb-4">
                                                <div className="text-2xl font-bold text-green-600 mb-2">${getCurrentAmount().toFixed(2)}</div>
                                                <div className="text-sm text-gray-700">
                                                    {getCurrentAmount() >= 250 && "Supports a family for one month"}
                                                    {getCurrentAmount() >= 100 &&
                                                        getCurrentAmount() < 250 &&
                                                        "Funds medical care for 3 individuals"}
                                                    {getCurrentAmount() >= 50 &&
                                                        getCurrentAmount() < 100 &&
                                                        "Supplies school materials for 10 children"}
                                                    {getCurrentAmount() >= 25 && getCurrentAmount() < 50 && "Provides meals for 5 families"}
                                                    {getCurrentAmount() < 25 && getCurrentAmount() > 0 && "Every dollar makes a difference"}
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <Users className="h-5 w-5 text-green-600 mt-1 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">10,000+</div>
                                                    <div className="text-sm text-gray-600">People helped this year</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <Gift className="h-5 w-5 text-green-600 mt-1 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">95%</div>
                                                    <div className="text-sm text-gray-600">Goes directly to programs</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <Heart className="h-5 w-5 text-green-600 mt-1 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">5,000+</div>
                                                    <div className="text-sm text-gray-600">Monthly donors</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Payment Methods */}
                            <Card className="shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                                        Secure Payment
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="text-sm text-gray-600">We accept all major credit cards and PayPal</div>
                                        <div className="flex space-x-2">
                                            <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                                VISA
                                            </div>
                                            <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                                MC
                                            </div>
                                            <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                                AMEX
                                            </div>
                                            <div className="w-8 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                                PP
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Your donation is tax-deductible. You will receive a receipt via email.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
