"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart3, Droplets, FlowerIcon, Leaf, Recycle, Sprout, Sun, ThumbsUp, Tractor } from "lucide-react"

interface SustainabilityMetric {
    id: string
    name: string
    value: number
    target: number
    unit: string
    icon: React.ReactNode
    description: string
}

interface SustainabilityPractice {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    benefits: string[]
}

interface Certification {
    id: string
    name: string
    logo: string
    description: string
    year: number
}

interface SustainabilitySectionProps {
    title?: string
    description?: string
    metrics?: SustainabilityMetric[]
    practices?: SustainabilityPractice[]
    certifications?: Certification[]
    className?: string
}

export default function SustainabilitySection({
                                                  title = "Our Sustainability Commitment",
                                                  description = "Discover how we're working to protect the environment and promote sustainable agriculture",
                                                  metrics = defaultMetrics,
                                                  practices = defaultPractices,
                                                  certifications = defaultCertifications,
                                                  className,
                                              }: SustainabilitySectionProps) {
    return (
        <div className={className}>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <Tabs defaultValue="metrics" className="max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
                    <TabsTrigger value="practices">Sustainable Practices</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {metrics.map((metric) => (
                            <Card key={metric.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-primary/10">{metric.icon}</div>
                                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                      <span>
                        Current: {metric.value} {metric.unit}
                      </span>
                                            <span>
                        Target: {metric.target} {metric.unit}
                      </span>
                                        </div>
                                        <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Detailed Sustainability Report
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="practices" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {practices.map((practice) => (
                            <Card key={practice.id}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-primary/10">{practice.icon}</div>
                                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{practice.description}</p>
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                                        <ul className="space-y-1">
                                            {practice.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="certifications" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {certifications.map((cert) => (
                            <Card key={cert.id} className="text-center">
                                <CardHeader>
                                    <div className="w-20 h-20 mx-auto mb-4">
                                        <img
                                            src={cert.logo || "/placeholder.svg"}
                                            alt={cert.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <CardTitle>{cert.name}</CardTitle>
                                    <CardDescription>Certified since {cert.year}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const defaultMetrics: SustainabilityMetric[] = [
    {
        id: "water",
        name: "Water Conservation",
        value: 35,
        target: 50,
        unit: "%",
        icon: <Droplets className="h-5 w-5 text-blue-500" />,
        description: "Reduction in water usage through efficient irrigation systems and rainwater harvesting",
    },
    {
        id: "carbon",
        name: "Carbon Footprint",
        value: 40,
        target: 60,
        unit: "%",
        icon: <Leaf className="h-5 w-5 text-green-500" />,
        description: "Reduction in carbon emissions through renewable energy and sustainable farming practices",
    },
    {
        id: "biodiversity",
        name: "Biodiversity",
        value: 120,
        target: 150,
        unit: "species",
        icon: <FlowerIcon className="h-5 w-5 text-pink-500" />,
        description: "Native plant and animal species supported on our farmland",
    },
    {
        id: "waste",
        name: "Waste Reduction",
        value: 85,
        target: 95,
        unit: "%",
        icon: <Recycle className="h-5 w-5 text-amber-500" />,
        description: "Percentage of farm waste composted or recycled",
    },
]

const defaultPractices: SustainabilityPractice[] = [
    {
        id: "crop-rotation",
        title: "Crop Rotation",
        description:
            "We systematically rotate crops to improve soil health, reduce pest pressure, and optimize nutrient use.",
        icon: <Sprout className="h-5 w-5 text-green-500" />,
        benefits: [
            "Enhances soil structure and fertility",
            "Reduces dependency on synthetic fertilizers",
            "Naturally controls pests and diseases",
            "Prevents soil erosion and nutrient depletion",
        ],
    },
    {
        id: "water-management",
        title: "Precision Water Management",
        description: "Our drip irrigation and water monitoring systems ensure efficient water use throughout our farms.",
        icon: <Droplets className="h-5 w-5 text-blue-500" />,
        benefits: [
            "Reduces water consumption by up to 60%",
            "Minimizes runoff and water pollution",
            "Delivers water directly to plant roots",
            "Adapts to changing weather conditions",
        ],
    },
    {
        id: "renewable-energy",
        title: "Renewable Energy",
        description: "Solar panels and wind turbines power our farm operations, reducing our dependency on fossil fuels.",
        icon: <Sun className="h-5 w-5 text-amber-500" />,
        benefits: [
            "Reduces carbon emissions",
            "Lowers operational costs long-term",
            "Provides energy independence",
            "Supports clean energy transition",
        ],
    },
    {
        id: "no-till",
        title: "No-Till Farming",
        description: "We minimize soil disturbance to preserve soil structure and reduce erosion.",
        icon: <Tractor className="h-5 w-5 text-brown-500" />,
        benefits: [
            "Increases soil carbon sequestration",
            "Improves soil biodiversity",
            "Reduces fuel consumption",
            "Prevents topsoil loss",
        ],
    },
]

const defaultCertifications: Certification[] = [
    {
        id: "organic",
        name: "USDA Organic",
        logo: "/placeholder.svg?height=100&width=100",
        description: "Certified organic practices that prohibit the use of synthetic pesticides and fertilizers.",
        year: 2015,
    },
    {
        id: "rainforest",
        name: "Rainforest Alliance",
        logo: "/placeholder.svg?height=100&width=100",
        description: "Meeting rigorous environmental, social, and economic standards for sustainability.",
        year: 2018,
    },
    {
        id: "carbon",
        name: "Carbon Trust",
        logo: "/placeholder.svg?height=100&width=100",
        description: "Verified reduction in carbon footprint and commitment to ongoing improvements.",
        year: 2020,
    },
]
