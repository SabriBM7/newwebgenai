"use client"

import { Check, X } from "lucide-react"

interface ComparisonItem {
    feature: string
    before: boolean | string
    after: boolean | string
}

interface ComparisonFeaturesProps {
    title?: string
    subtitle?: string
    beforeLabel?: string
    afterLabel?: string
    comparisons?: ComparisonItem[]
    theme?: any
}

export function ComparisonFeatures({
                                       title = "See the Difference",
                                       subtitle = "Before vs After Our Solution",
                                       beforeLabel = "Without Our Solution",
                                       afterLabel = "With Our Solution",
                                       comparisons = [
                                           {
                                               feature: "Processing Speed",
                                               before: "Slow manual processes",
                                               after: "Lightning-fast automation",
                                           },
                                           {
                                               feature: "Data Security",
                                               before: false,
                                               after: true,
                                           },
                                           {
                                               feature: "Team Collaboration",
                                               before: "Limited communication",
                                               after: "Seamless teamwork",
                                           },
                                           {
                                               feature: "Cost Efficiency",
                                               before: "High operational costs",
                                               after: "Reduced expenses by 60%",
                                           },
                                           {
                                               feature: "Scalability",
                                               before: false,
                                               after: true,
                                           },
                                           {
                                               feature: "Customer Support",
                                               before: "Basic email support",
                                               after: "24/7 priority support",
                                           },
                                       ],
                                       theme,
                                   }: ComparisonFeaturesProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Comparison Table */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header Row */}
                        <div className="grid grid-cols-3 bg-gray-50">
                            <div className="p-6 font-semibold text-gray-900">Feature</div>
                            <div className="p-6 font-semibold text-red-600 text-center border-l border-gray-200">{beforeLabel}</div>
                            <div className="p-6 font-semibold text-green-600 text-center border-l border-gray-200">{afterLabel}</div>
                        </div>

                        {/* Comparison Rows */}
                        {comparisons.map((item, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-gray-25" : "bg-white"} border-t border-gray-100`}
                            >
                                <div className="p-6 font-medium text-gray-900">{item.feature}</div>

                                <div className="p-6 text-center border-l border-gray-200">
                                    {typeof item.before === "boolean" ? (
                                        item.before ? (
                                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        )
                                    ) : (
                                        <span className="text-gray-600">{item.before}</span>
                                    )}
                                </div>

                                <div className="p-6 text-center border-l border-gray-200">
                                    {typeof item.after === "boolean" ? (
                                        item.after ? (
                                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 mx-auto" />
                                        )
                                    ) : (
                                        <span className="text-gray-600">{item.after}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-lg text-gray-600 mb-6">Ready to transform your business?</p>
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Get Started Today
                    </button>
                </div>
            </div>
        </section>
    )
}
