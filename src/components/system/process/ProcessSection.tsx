"use client"

import { cn } from "@/lib/utils"

interface ProcessStep {
    id: string
    title: string
    description: string
    icon?: string
    imageUrl?: string
    duration?: string
    deliverables?: string[]
}

interface ProcessSectionProps {
    title?: string
    subtitle?: string
    description?: string
    steps: ProcessStep[]
    layout?: "horizontal" | "vertical"
    theme?: {
        primaryColor?: string
        secondaryColor?: string
        backgroundColor?: string
        textColor?: string
    }
}

export function ProcessSection({
                                   title = "Our Process",
                                   subtitle = "How We Work",
                                   description = "We follow a structured approach to deliver exceptional results for every project.",
                                   steps = [],
                                   layout = "vertical",
                                   theme = {},
                               }: ProcessSectionProps) {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    {subtitle && (
                        <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: theme.primaryColor }}>
                            {subtitle}
                        </p>
                    )}
                    {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                    {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
                </div>

                {/* Process Steps */}
                {layout === "horizontal" ? (
                    <div className="flex flex-col md:flex-row gap-8 justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex-1 relative">
                                {/* Step Number */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto"
                                    style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                >
                                    {index + 1}
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                                )}

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>

                                    {step.duration && (
                                        <div className="mt-3 inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                            {step.duration}
                                        </div>
                                    )}

                                    {step.deliverables && step.deliverables.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-semibold mb-2">Deliverables:</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                {step.deliverables.map((item, i) => (
                                                    <li key={i} className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "relative flex flex-col md:flex-row",
                                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                                    )}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                                        <div
                                            className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-sm z-10"
                                            style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={cn("ml-12 md:ml-0 md:w-1/2", index % 2 === 0 ? "md:pr-12" : "md:pl-12")}>
                                        <div className="bg-white p-6 rounded-lg shadow-sm">
                                            {step.imageUrl && (
                                                <div className="mb-4 rounded-md overflow-hidden">
                                                    <img
                                                        src={step.imageUrl || "/placeholder.svg"}
                                                        alt={step.title}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </div>
                                            )}

                                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>

                                            {step.duration && (
                                                <div className="mt-3 inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                    {step.duration}
                                                </div>
                                            )}

                                            {step.deliverables && step.deliverables.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-semibold mb-2">Deliverables:</h4>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        {step.deliverables.map((item, i) => (
                                                            <li key={i} className="flex items-center">
                                                                <svg
                                                                    className="w-4 h-4 mr-2"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProcessSection
