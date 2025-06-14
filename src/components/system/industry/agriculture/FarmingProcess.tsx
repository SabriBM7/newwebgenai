"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Droplets, FlowerIcon, SproutIcon as Seedling, Shovel } from "lucide-react"

interface ProcessStep {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    season: string
    duration: string
    techniques: string[]
    image: string
}

interface FarmingProcessProps {
    title?: string
    description?: string
    steps?: ProcessStep[]
    className?: string
}

export default function FarmingProcess({
                                           title = "Our Farming Process",
                                           description = "From seed to harvest: Explore our sustainable farming practices throughout the growing season",
                                           steps = defaultSteps,
                                           className,
                                       }: FarmingProcessProps) {
    const [activeTab, setActiveTab] = React.useState(steps[0]?.id || "")

    return (
        <div className={className}>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                    <div className="sticky top-8 space-y-2">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative">
                                <button
                                    onClick={() => setActiveTab(step.id)}
                                    className={`w-full flex items-start gap-4 p-4 rounded-lg text-left transition-colors ${
                                        activeTab === step.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            activeTab === step.id
                                                ? "bg-primary-foreground/20 text-primary-foreground"
                                                : "bg-primary/10 text-primary"
                                        }`}
                                    >
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{step.title}</h3>
                                        <p
                                            className={`text-sm ${
                                                activeTab === step.id ? "text-primary-foreground/80" : "text-muted-foreground"
                                            }`}
                                        >
                                            {step.season}
                                        </p>
                                    </div>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className="absolute left-7 top-[4.5rem] bottom-0 w-0.5 bg-muted-foreground/20 h-4"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-2/3">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`transition-opacity duration-300 ${
                                activeTab === step.id ? "block opacity-100" : "hidden opacity-0"
                            }`}
                        >
                            <Card>
                                <div className="aspect-video w-full overflow-hidden">
                                    <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-full object-cover" />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl">{step.title}</CardTitle>
                                            <CardDescription className="flex items-center mt-1">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {step.season} • {step.duration}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p>{step.description}</p>

                                    <div>
                                        <h4 className="font-medium mb-3">Key Techniques:</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {step.techniques.map((technique, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                                                        <ArrowRight className="h-3 w-3 text-primary" />
                                                    </div>
                                                    <span>{technique}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Tabs defaultValue="details">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="details">Details</TabsTrigger>
                                            <TabsTrigger value="equipment">Equipment</TabsTrigger>
                                            <TabsTrigger value="challenges">Challenges</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="details" className="pt-4">
                                            <p className="text-muted-foreground">
                                                {step.id === "soil-prep" &&
                                                    "Our soil preparation involves careful testing and amendment to ensure optimal growing conditions. We analyze pH levels, organic matter content, and nutrient profiles to create the perfect foundation for our crops."}
                                                {step.id === "planting" &&
                                                    "We use precision planting techniques to ensure optimal spacing and depth for each seed variety. This maximizes germination rates and allows for efficient use of field space."}
                                                {step.id === "cultivation" &&
                                                    "Regular monitoring and maintenance ensure our crops receive exactly what they need when they need it. We use integrated pest management to minimize chemical interventions."}
                                                {step.id === "harvest" &&
                                                    "Harvesting at peak ripeness ensures maximum flavor and nutritional value. We use a combination of hand-harvesting for delicate crops and mechanical harvesting where appropriate."}
                                            </p>
                                        </TabsContent>
                                        <TabsContent value="equipment" className="pt-4">
                                            <p className="text-muted-foreground">
                                                {step.id === "soil-prep" &&
                                                    "We use specialized equipment including broadfork tillers, compost spreaders, and precision soil testing kits to prepare our fields."}
                                                {step.id === "planting" &&
                                                    "Our planting equipment includes precision seeders, transplanting tools, and GPS-guided machinery for accurate row spacing."}
                                                {step.id === "cultivation" &&
                                                    "Cultivation tools include precision weeders, drip irrigation systems, and specialized monitoring equipment to track plant health."}
                                                {step.id === "harvest" &&
                                                    "We use specialized harvesting equipment designed for each crop type, along with sorting and cleaning machinery to prepare produce for market."}
                                            </p>
                                        </TabsContent>
                                        <TabsContent value="challenges" className="pt-4">
                                            <p className="text-muted-foreground">
                                                {step.id === "soil-prep" &&
                                                    "Challenges include balancing soil amendments, managing drainage in different field sections, and timing preparation with weather patterns."}
                                                {step.id === "planting" &&
                                                    "Weather variability, seed quality control, and timing planting with optimal soil temperatures are our main challenges during this phase."}
                                                {step.id === "cultivation" &&
                                                    "Pest pressure, weed management without chemicals, and adapting to changing weather conditions are ongoing challenges during cultivation."}
                                                {step.id === "harvest" &&
                                                    "Coordinating harvest timing with market demands, managing labor needs, and handling post-harvest storage are key challenges we address."}
                                            </p>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const defaultSteps: ProcessStep[] = [
    {
        id: "soil-prep",
        title: "Soil Preparation",
        description:
            "We begin by preparing our soil with natural amendments and cover crops to build organic matter and create a healthy foundation for planting. Our no-till approach preserves soil structure and beneficial organisms.",
        icon: <Shovel className="h-5 w-5" />,
        season: "Early Spring",
        duration: "2-3 weeks",
        techniques: [
            "Cover crop incorporation",
            "Compost application",
            "Minimal tillage practices",
            "Soil testing and analysis",
            "Natural amendment addition",
            "Bed formation and shaping",
        ],
        image: "/placeholder.svg?height=400&width=800",
    },
    {
        id: "planting",
        title: "Seeding & Planting",
        description:
            "Using a combination of direct seeding and transplanting, we carefully place each plant or seed at optimal spacing. We select varieties adapted to our climate and resistant to local pests and diseases.",
        icon: <Seedling className="h-5 w-5" />,
        season: "Mid Spring",
        duration: "3-4 weeks",
        techniques: [
            "Succession planting",
            "Companion planting strategies",
            "Precision seed spacing",
            "Transplant hardening",
            "Row cover protection",
            "Biodegradable mulch application",
        ],
        image: "/placeholder.svg?height=400&width=800",
    },
    {
        id: "cultivation",
        title: "Cultivation & Care",
        description:
            "Throughout the growing season, we provide attentive care to our crops through efficient irrigation, natural pest management, and careful monitoring of plant health and soil conditions.",
        icon: <Droplets className="h-5 w-5" />,
        season: "Summer",
        duration: "2-4 months",
        techniques: [
            "Drip irrigation",
            "Integrated pest management",
            "Hand weeding and hoeing",
            "Foliar feeding with compost tea",
            "Trellising and plant support",
            "Regular crop monitoring",
        ],
        image: "/placeholder.svg?height=400&width=800",
    },
    {
        id: "harvest",
        title: "Harvesting & Processing",
        description:
            "We harvest each crop at its peak ripeness to ensure maximum flavor and nutritional value. Careful handling and prompt cooling preserve freshness from field to market.",
        icon: <FlowerIcon className="h-5 w-5" />,
        season: "Summer to Fall",
        duration: "2-3 months",
        techniques: [
            "Selective hand harvesting",
            "Proper post-harvest handling",
            "Hydrocooling for leafy greens",
            "Curing for storage crops",
            "Minimal packaging",
            "Cold chain management",
        ],
        image: "/placeholder.svg?height=400&width=800",
    },
]
