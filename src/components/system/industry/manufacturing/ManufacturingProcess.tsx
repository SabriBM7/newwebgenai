"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, Settings, PenToolIcon as Tool } from "lucide-react"

interface ProcessStep {
    id: string
    title: string
    description: string
    duration: string
    status: "completed" | "in-progress" | "pending"
    icon: React.ReactNode
}

interface ManufacturingProcessProps {
    title?: string
    description?: string
    steps?: ProcessStep[]
    className?: string
}

export default function ManufacturingProcess({
                                                 title = "Manufacturing Process",
                                                 description = "Track and visualize our state-of-the-art manufacturing workflow",
                                                 steps = defaultSteps,
                                                 className,
                                             }: ManufacturingProcessProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="visual">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="visual">Visual Flow</TabsTrigger>
                        <TabsTrigger value="detailed">Detailed Steps</TabsTrigger>
                    </TabsList>
                    <TabsContent value="visual" className="pt-6">
                        <div className="flex flex-col md:flex-row items-start gap-4 overflow-x-auto pb-4">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center min-w-[180px]">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                                                step.status === "completed"
                                                    ? "bg-green-100"
                                                    : step.status === "in-progress"
                                                        ? "bg-blue-100"
                                                        : "bg-gray-100"
                                            }`}
                                        >
                                            {step.icon}
                                        </div>
                                        <h3 className="font-medium text-center">{step.title}</h3>
                                        <Badge
                                            variant={
                                                step.status === "completed"
                                                    ? "default"
                                                    : step.status === "in-progress"
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                            className="mt-2"
                                        >
                                            {step.status === "completed"
                                                ? "Completed"
                                                : step.status === "in-progress"
                                                    ? "In Progress"
                                                    : "Pending"}
                                        </Badge>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex items-center self-center mx-2 mt-8 hidden md:block">
                                            <ArrowRight className="text-muted-foreground" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="detailed" className="pt-6">
                        <div className="space-y-6">
                            {steps.map((step) => (
                                <div key={step.id} className="flex gap-4 items-start">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            step.status === "completed"
                                                ? "bg-green-100"
                                                : step.status === "in-progress"
                                                    ? "bg-blue-100"
                                                    : "bg-gray-100"
                                        }`}
                                    >
                                        {step.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium">{step.title}</h3>
                                            <Badge
                                                variant={
                                                    step.status === "completed"
                                                        ? "default"
                                                        : step.status === "in-progress"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                                className="ml-2"
                                            >
                                                {step.status}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground mt-1">{step.description}</p>
                                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>{step.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

const defaultSteps: ProcessStep[] = [
    {
        id: "design",
        title: "Design & Engineering",
        description: "Product design and engineering specifications are finalized",
        duration: "2-3 weeks",
        status: "completed",
        icon: <Settings className="h-6 w-6 text-green-600" />,
    },
    {
        id: "procurement",
        title: "Material Procurement",
        description: "Raw materials and components are sourced and inspected",
        duration: "1-2 weeks",
        status: "completed",
        icon: <CheckCircle className="h-6 w-6 text-green-600" />,
    },
    {
        id: "production",
        title: "Production",
        description: "Components are manufactured according to specifications",
        duration: "3-4 weeks",
        status: "in-progress",
        icon: <Tool className="h-6 w-6 text-blue-600" />,
    },
    {
        id: "assembly",
        title: "Assembly",
        description: "Components are assembled into the final product",
        duration: "1-2 weeks",
        status: "pending",
        icon: <Settings className="h-6 w-6 text-gray-600" />,
    },
    {
        id: "quality",
        title: "Quality Control",
        description: "Final product undergoes rigorous quality testing",
        duration: "1 week",
        status: "pending",
        icon: <CheckCircle className="h-6 w-6 text-gray-600" />,
    },
]
