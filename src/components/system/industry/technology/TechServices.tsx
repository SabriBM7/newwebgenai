"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface TechServicesProps {
    title?: string
    subtitle?: string
    services?: Array<{
        title: string
        description: string
        icon: string
        features: string[]
        technologies: string[]
        startingPrice?: string
    }>
}

export default function TechServices({ title, subtitle, services }: TechServicesProps) {
    const defaultServices = [
        {
            title: "Web Development",
            description:
                "Custom web applications built with modern frameworks and best practices for optimal performance and user experience.",
            icon: "💻",
            features: [
                "Responsive Design",
                "SEO Optimization",
                "Performance Optimization",
                "Cross-browser Compatibility",
                "API Integration",
            ],
            technologies: ["React", "Next.js", "Node.js", "TypeScript"],
            startingPrice: "$5,000",
        },
        {
            title: "Mobile App Development",
            description:
                "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
            icon: "📱",
            features: [
                "iOS & Android",
                "Cross-platform Solutions",
                "Push Notifications",
                "Offline Functionality",
                "App Store Optimization",
            ],
            technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
            startingPrice: "$8,000",
        },
        {
            title: "Cloud Solutions",
            description:
                "Scalable cloud infrastructure and DevOps solutions to ensure your applications run reliably at any scale.",
            icon: "☁️",
            features: ["Auto-scaling", "Load Balancing", "Monitoring & Alerts", "Backup & Recovery", "Security Compliance"],
            technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
            startingPrice: "$3,000",
        },
        {
            title: "AI & Machine Learning",
            description:
                "Intelligent solutions powered by artificial intelligence and machine learning to automate and optimize your business processes.",
            icon: "🤖",
            features: [
                "Predictive Analytics",
                "Natural Language Processing",
                "Computer Vision",
                "Recommendation Systems",
                "Data Pipeline Automation",
            ],
            technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
            startingPrice: "$10,000",
        },
        {
            title: "E-commerce Solutions",
            description:
                "Complete e-commerce platforms with payment processing, inventory management, and customer analytics.",
            icon: "🛒",
            features: [
                "Payment Gateway Integration",
                "Inventory Management",
                "Customer Analytics",
                "Multi-vendor Support",
                "Mobile Commerce",
            ],
            technologies: ["Shopify", "WooCommerce", "Magento", "Custom"],
            startingPrice: "$7,000",
        },
        {
            title: "Consulting & Strategy",
            description:
                "Technical consulting and digital transformation strategy to help you make informed technology decisions.",
            icon: "💡",
            features: [
                "Technology Assessment",
                "Architecture Review",
                "Performance Audit",
                "Security Analysis",
                "Digital Strategy",
            ],
            technologies: ["Various", "Best Practices", "Industry Standards"],
            startingPrice: "$150/hour",
        },
    ]

    const techServices = services || defaultServices

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Our Services"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Comprehensive technology solutions to power your business"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techServices.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="text-center mb-6">
                                    <div className="text-5xl mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service.technologies.map((tech, techIndex) => (
                                                <Badge key={techIndex} variant="outline" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    {service.startingPrice && (
                                        <div className="text-center mb-4">
                                            <span className="text-2xl font-bold text-blue-600">Starting at {service.startingPrice}</span>
                                        </div>
                                    )}
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        Learn More
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
