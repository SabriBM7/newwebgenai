"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Search, User, Phone, MapPin } from "lucide-react"

interface Symptom {
    id: string
    name: string
    category: string
    severity: "low" | "medium" | "high"
}

interface Condition {
    id: string
    name: string
    description: string
    commonSymptoms: string[]
    severity: "low" | "medium" | "high"
    recommendation: string
}

interface SymptomCheckerProps {
    title?: string
    subtitle?: string
    symptoms?: Symptom[]
    conditions?: Condition[]
}

export default function SymptomChecker({
                                           title = "Symptom Checker",
                                           subtitle = "Get preliminary health insights based on your symptoms",
                                           symptoms = [],
                                           conditions = [],
                                       }: SymptomCheckerProps) {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<Condition[]>([])
    const [showResults, setShowResults] = useState(false)
    const [patientInfo, setPatientInfo] = useState({
        age: "",
        gender: "",
        duration: "",
    })

    const defaultSymptoms: Symptom[] = [
        { id: "1", name: "Headache", category: "Neurological", severity: "medium" },
        { id: "2", name: "Fever", category: "General", severity: "high" },
        { id: "3", name: "Cough", category: "Respiratory", severity: "medium" },
        { id: "4", name: "Sore Throat", category: "Respiratory", severity: "low" },
        { id: "5", name: "Fatigue", category: "General", severity: "low" },
        { id: "6", name: "Nausea", category: "Digestive", severity: "medium" },
        { id: "7", name: "Chest Pain", category: "Cardiovascular", severity: "high" },
        { id: "8", name: "Shortness of Breath", category: "Respiratory", severity: "high" },
        { id: "9", name: "Dizziness", category: "Neurological", severity: "medium" },
        { id: "10", name: "Abdominal Pain", category: "Digestive", severity: "medium" },
    ]

    const defaultConditions: Condition[] = [
        {
            id: "1",
            name: "Common Cold",
            description: "A viral infection of the upper respiratory tract",
            commonSymptoms: ["Cough", "Sore Throat", "Fatigue"],
            severity: "low",
            recommendation: "Rest, fluids, and over-the-counter medications. See a doctor if symptoms worsen.",
        },
        {
            id: "2",
            name: "Influenza (Flu)",
            description: "A viral infection that attacks the respiratory system",
            commonSymptoms: ["Fever", "Headache", "Fatigue", "Cough"],
            severity: "medium",
            recommendation: "Rest, fluids, antiviral medications if prescribed. Seek medical attention if severe.",
        },
        {
            id: "3",
            name: "Migraine",
            description: "A type of headache characterized by severe pain",
            commonSymptoms: ["Headache", "Nausea", "Dizziness"],
            severity: "medium",
            recommendation: "Rest in a dark room, pain medication. Consult a doctor for frequent migraines.",
        },
        {
            id: "4",
            name: "Heart Attack",
            description: "A serious medical emergency requiring immediate attention",
            commonSymptoms: ["Chest Pain", "Shortness of Breath", "Nausea"],
            severity: "high",
            recommendation: "EMERGENCY: Call 911 immediately. Do not delay seeking medical attention.",
        },
    ]

    const displaySymptoms = symptoms.length > 0 ? symptoms : defaultSymptoms
    const displayConditions = conditions.length > 0 ? conditions : defaultConditions

    const filteredSymptoms = displaySymptoms.filter(
        (symptom) =>
            symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            symptom.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleSymptomToggle = (symptomId: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
        )
    }

    const analyzeSymptoms = () => {
        const selectedSymptomNames = selectedSymptoms
            .map((id) => displaySymptoms.find((s) => s.id === id)?.name)
            .filter(Boolean)

        const matchedConditions = displayConditions
            .map((condition) => {
                const matchCount = condition.commonSymptoms.filter((symptom) => selectedSymptomNames.includes(symptom)).length
                return { ...condition, matchCount }
            })
            .filter((condition) => condition.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount)

        setResults(matchedConditions)
        setShowResults(true)
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200"
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "low":
                return "bg-green-100 text-green-800 border-green-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    if (showResults) {
        return (
            <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Results</h2>
                            <p className="text-gray-600">Based on your selected symptoms</p>
                        </div>

                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="font-semibold text-yellow-800">Important Disclaimer</h3>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        This tool provides general information only and is not a substitute for professional medical advice.
                                        Always consult with a healthcare provider for proper diagnosis and treatment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {results.map((condition, index) => (
                                <Card key={condition.id} className="overflow-hidden">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{condition.name}</CardTitle>
                                            <Badge className={getSeverityColor(condition.severity)}>
                                                {condition.severity.toUpperCase()} PRIORITY
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600">{condition.description}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Matching Symptoms:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {condition.commonSymptoms.map((symptom, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant={
                                                            selectedSymptoms.some((id) => displaySymptoms.find((s) => s.id === id)?.name === symptom)
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                    >
                                                        {symptom}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 rounded-lg ${
                                                condition.severity === "high"
                                                    ? "bg-red-50 border border-red-200"
                                                    : condition.severity === "medium"
                                                        ? "bg-yellow-50 border border-yellow-200"
                                                        : "bg-blue-50 border border-blue-200"
                                            }`}
                                        >
                                            <h4 className="font-semibold mb-2">Recommendation:</h4>
                                            <p className="text-sm">{condition.recommendation}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {results.some((r) => r.severity === "high") && (
                            <Card className="mt-6 border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-red-800">Urgent Medical Attention Required</h3>
                                    </div>
                                    <p className="text-red-700 mb-4">
                                        Your symptoms may indicate a serious condition. Please seek immediate medical attention.
                                    </p>
                                    <div className="flex gap-4">
                                        <Button className="bg-red-600 hover:bg-red-700">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call Emergency Services
                                        </Button>
                                        <Button variant="outline" className="border-red-300 text-red-700">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            Find Nearest Hospital
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="text-center mt-8">
                            <Button onClick={() => setShowResults(false)} variant="outline">
                                Start New Assessment
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Search className="h-5 w-5 mr-2" />
                                        Select Your Symptoms
                                    </CardTitle>
                                    <div className="relative">
                                        <Input
                                            placeholder="Search symptoms..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                        <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                        {filteredSymptoms.map((symptom) => (
                                            <div
                                                key={symptom.id}
                                                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                                            >
                                                <Checkbox
                                                    id={symptom.id}
                                                    checked={selectedSymptoms.includes(symptom.id)}
                                                    onCheckedChange={() => handleSymptomToggle(symptom.id)}
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor={symptom.id} className="font-medium cursor-pointer">
                                                        {symptom.name}
                                                    </Label>
                                                    <p className="text-sm text-gray-500">{symptom.category}</p>
                                                </div>
                                                <Badge variant="outline" className={getSeverityColor(symptom.severity)}>
                                                    {symptom.severity}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="h-5 w-5 mr-2" />
                                        Patient Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={patientInfo.age}
                                            onChange={(e) => setPatientInfo((prev) => ({ ...prev, age: e.target.value }))}
                                            placeholder="Enter age"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gender">Gender</Label>
                                        <select
                                            id="gender"
                                            value={patientInfo.gender}
                                            onChange={(e) => setPatientInfo((prev) => ({ ...prev, gender: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="duration">Symptom Duration</Label>
                                        <select
                                            id="duration"
                                            value={patientInfo.duration}
                                            onChange={(e) => setPatientInfo((prev) => ({ ...prev, duration: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select duration</option>
                                            <option value="hours">Few hours</option>
                                            <option value="1-2days">1-2 days</option>
                                            <option value="3-7days">3-7 days</option>
                                            <option value="1-2weeks">1-2 weeks</option>
                                            <option value="longer">Longer than 2 weeks</option>
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Selected Symptoms</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedSymptoms.length === 0 ? (
                                        <p className="text-gray-500 text-sm">No symptoms selected</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {selectedSymptoms.map((id) => {
                                                const symptom = displaySymptoms.find((s) => s.id === id)
                                                return symptom ? (
                                                    <div key={id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                                        <span className="text-sm">{symptom.name}</span>
                                                        <Button size="sm" variant="ghost" onClick={() => handleSymptomToggle(id)}>
                                                            ×
                                                        </Button>
                                                    </div>
                                                ) : null
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Button
                                onClick={analyzeSymptoms}
                                disabled={selectedSymptoms.length === 0}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                size="lg"
                            >
                                Analyze Symptoms
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
