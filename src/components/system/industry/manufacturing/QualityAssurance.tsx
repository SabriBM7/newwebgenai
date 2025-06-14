"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle, Download, FileText, Search } from "lucide-react"

interface QualityMetric {
    id: string
    name: string
    target: number
    current: number
    unit: string
    status: "success" | "warning" | "danger"
}

interface QualityCheck {
    id: string
    name: string
    description: string
    completed: boolean
    required: boolean
}

interface QualityReport {
    id: string
    date: string
    productId: string
    productName: string
    status: "passed" | "failed" | "pending"
    issues?: string[]
}

interface QualityAssuranceProps {
    title?: string
    description?: string
    metrics?: QualityMetric[]
    checks?: QualityCheck[]
    reports?: QualityReport[]
    className?: string
}

export default function QualityAssurance({
                                             title = "Quality Assurance Dashboard",
                                             description = "Monitor and manage product quality metrics and testing procedures",
                                             metrics = defaultMetrics,
                                             checks = defaultChecks,
                                             reports = defaultReports,
                                             className,
                                         }: QualityAssuranceProps) {
    const [qualityChecks, setQualityChecks] = useState(checks)

    const toggleCheck = (id: string) => {
        setQualityChecks(
            qualityChecks.map((check) => (check.id === id ? { ...check, completed: !check.completed } : check)),
        )
    }

    const completedChecks = qualityChecks.filter((check) => check.completed).length
    const totalChecks = qualityChecks.length
    const completionPercentage = Math.round((completedChecks / totalChecks) * 100)

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="metrics">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="metrics">Quality Metrics</TabsTrigger>
                        <TabsTrigger value="checklist">QA Checklist</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="metrics" className="space-y-6 pt-6">
                        {metrics.map((metric) => (
                            <div key={metric.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">{metric.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Target: {metric.target} {metric.unit}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                    <span className="font-medium mr-2">
                      {metric.current} {metric.unit}
                    </span>
                                        {metric.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                                        {metric.status === "warning" && <AlertCircle className="h-5 w-5 text-amber-500" />}
                                        {metric.status === "danger" && <AlertCircle className="h-5 w-5 text-red-500" />}
                                    </div>
                                </div>
                                <Progress
                                    value={(metric.current / metric.target) * 100}
                                    className={`h-2 ${
                                        metric.status === "success"
                                            ? "bg-green-100"
                                            : metric.status === "warning"
                                                ? "bg-amber-100"
                                                : "bg-red-100"
                                    }`}
                                />
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="checklist" className="pt-6">
                        <div className="mb-4">
                            <Progress value={completionPercentage} className="h-2" />
                            <p className="text-sm text-muted-foreground mt-2">
                                {completedChecks} of {totalChecks} checks completed ({completionPercentage}%)
                            </p>
                        </div>
                        <div className="space-y-4">
                            {qualityChecks.map((check) => (
                                <div key={check.id} className="flex items-start space-x-3">
                                    <Checkbox id={check.id} checked={check.completed} onCheckedChange={() => toggleCheck(check.id)} />
                                    <div className="space-y-1">
                                        <label
                                            htmlFor={check.id}
                                            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {check.name}
                                            {check.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        <p className="text-sm text-muted-foreground">{check.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="pt-6">
                        <div className="space-y-4">
                            {reports.map((report) => (
                                <Card key={report.id}>
                                    <CardHeader className="py-4 px-6">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-base">{report.productName}</CardTitle>
                                            <Badge
                                                variant={
                                                    report.status === "passed"
                                                        ? "default"
                                                        : report.status === "failed"
                                                            ? "destructive"
                                                            : "outline"
                                                }
                                            >
                                                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <CardDescription>
                                            ID: {report.productId} • {report.date}
                                        </CardDescription>
                                    </CardHeader>
                                    {report.issues && report.issues.length > 0 && (
                                        <CardContent className="py-2 px-6">
                                            <h4 className="text-sm font-medium mb-2">Issues Found:</h4>
                                            <ul className="text-sm space-y-1">
                                                {report.issues.map((issue, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                                                        <span>{issue}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    )}
                                    <CardFooter className="py-3 px-6 flex justify-end gap-2">
                                        <Button variant="outline" size="sm">
                                            <Search className="h-4 w-4 mr-1" />
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <FileText className="h-4 w-4 mr-1" />
                                            Full Report
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-1" />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Export Data</Button>
                <Button>Generate Report</Button>
            </CardFooter>
        </Card>
    )
}

// Missing Badge component - adding a simple implementation
const Badge = ({ children, variant = "default" }) => {
    const variantClasses = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
    }

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]}`}
        >
      {children}
    </span>
    )
}

const defaultMetrics: QualityMetric[] = [
    {
        id: "defect-rate",
        name: "Defect Rate",
        target: 0.5,
        current: 0.3,
        unit: "%",
        status: "success",
    },
    {
        id: "first-pass-yield",
        name: "First Pass Yield",
        target: 98,
        current: 97.5,
        unit: "%",
        status: "warning",
    },
    {
        id: "customer-returns",
        name: "Customer Returns",
        target: 1,
        current: 0.8,
        unit: "%",
        status: "success",
    },
    {
        id: "on-time-delivery",
        name: "On-Time Delivery",
        target: 99,
        current: 98.2,
        unit: "%",
        status: "warning",
    },
    {
        id: "equipment-efficiency",
        name: "Equipment Efficiency",
        target: 95,
        current: 91,
        unit: "%",
        status: "warning",
    },
]

const defaultChecks: QualityCheck[] = [
    {
        id: "dimensions",
        name: "Dimensional Inspection",
        description: "Verify product dimensions match specifications",
        completed: true,
        required: true,
    },
    {
        id: "material",
        name: "Material Verification",
        description: "Confirm materials meet required specifications",
        completed: true,
        required: true,
    },
    {
        id: "visual",
        name: "Visual Inspection",
        description: "Check for visible defects or cosmetic issues",
        completed: true,
        required: true,
    },
    {
        id: "functional",
        name: "Functional Testing",
        description: "Verify product functions as intended",
        completed: false,
        required: true,
    },
    {
        id: "stress",
        name: "Stress Testing",
        description: "Test product under extreme conditions",
        completed: false,
        required: false,
    },
    {
        id: "packaging",
        name: "Packaging Inspection",
        description: "Verify packaging integrity and labeling",
        completed: false,
        required: true,
    },
]

const defaultReports: QualityReport[] = [
    {
        id: "qr-2023-06-15-001",
        date: "2023-06-15",
        productId: "PRD-7890",
        productName: "Industrial Valve Assembly",
        status: "passed",
    },
    {
        id: "qr-2023-06-14-002",
        date: "2023-06-14",
        productId: "PRD-7891",
        productName: "Hydraulic Pump System",
        status: "failed",
        issues: ["Pressure test failed at 80% of rated capacity", "Seal integrity compromised under high temperature"],
    },
    {
        id: "qr-2023-06-14-001",
        date: "2023-06-14",
        productId: "PRD-7892",
        productName: "Control Panel Assembly",
        status: "passed",
    },
    {
        id: "qr-2023-06-13-001",
        date: "2023-06-13",
        productId: "PRD-7893",
        productName: "Precision Gear Set",
        status: "pending",
    },
]
