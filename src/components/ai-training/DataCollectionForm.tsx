"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface DataCollectionFormProps {
    onSubmit: (data: TrainingDataEntry) => Promise<void>
}

export interface TrainingDataEntry {
    industry: string
    purpose: string
    targetAudience: string
    style: string
    features: string[]
    tone: string
    additionalInfo?: string
    expectedOutput?: {
        sections: string[]
        colorScheme: string
        typography: string
    }
    quality: "good" | "average" | "poor"
    notes?: string
}

export default function DataCollectionForm({ onSubmit }: DataCollectionFormProps) {
    const [formData, setFormData] = useState<TrainingDataEntry>({
        industry: "",
        purpose: "",
        targetAudience: "",
        style: "",
        features: [],
        tone: "",
        quality: "good",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const industries = [
        "E-commerce",
        "Restaurant",
        "Healthcare",
        "Education",
        "Real Estate",
        "Technology",
        "Finance",
        "Travel",
        "Fitness",
        "Legal",
        "Creative",
        "Manufacturing",
        "Nonprofit",
        "Entertainment",
        "Other",
    ]

    const tones = [
        "Professional",
        "Friendly",
        "Casual",
        "Formal",
        "Playful",
        "Serious",
        "Inspirational",
        "Technical",
        "Luxurious",
        "Minimalist",
    ]

    const featureOptions = [
        "Contact Form",
        "About Section",
        "Services/Products",
        "Testimonials",
        "Team Members",
        "Pricing",
        "FAQ",
        "Blog",
        "Gallery",
        "Call to Action",
        "Newsletter Signup",
        "Social Media Links",
        "Map/Location",
    ]

    const handleChange = (field: keyof TrainingDataEntry, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFeatureToggle = (feature: string) => {
        setFormData((prev) => {
            const features = [...prev.features]
            if (features.includes(feature)) {
                return { ...prev, features: features.filter((f) => f !== feature) }
            } else {
                return { ...prev, features: [...features, feature] }
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await onSubmit(formData)
            toast({
                title: "Training data submitted",
                description: "Thank you for contributing to our AI training dataset!",
            })
            // Reset form
            setFormData({
                industry: "",
                purpose: "",
                targetAudience: "",
                style: "",
                features: [],
                tone: "",
                quality: "good",
            })
        } catch (error) {
            toast({
                title: "Error submitting data",
                description: "There was a problem submitting your training data. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>AI Training Data Collection</CardTitle>
                <CardDescription>
                    Help improve our AI website generator by providing examples of website requirements and expected outputs.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)} required>
                                    <SelectTrigger id="industry">
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries.map((industry) => (
                                            <SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tone">Tone</Label>
                                <Select value={formData.tone} onValueChange={(value) => handleChange("tone", value)} required>
                                    <SelectTrigger id="tone">
                                        <SelectValue placeholder="Select tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tones.map((tone) => (
                                            <SelectItem key={tone} value={tone}>
                                                {tone}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="purpose">Website Purpose</Label>
                            <Textarea
                                id="purpose"
                                placeholder="Describe the main purpose of the website"
                                value={formData.purpose}
                                onChange={(e) => handleChange("purpose", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Textarea
                                id="targetAudience"
                                placeholder="Describe the target audience for this website"
                                value={formData.targetAudience}
                                onChange={(e) => handleChange("targetAudience", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="style">Style Preferences</Label>
                            <Textarea
                                id="style"
                                placeholder="Describe the visual style preferences (e.g., modern, minimalist, colorful)"
                                value={formData.style}
                                onChange={(e) => handleChange("style", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Required Features</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {featureOptions.map((feature) => (
                                    <div key={feature} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`feature-${feature}`}
                                            checked={formData.features.includes(feature)}
                                            onCheckedChange={() => handleFeatureToggle(feature)}
                                        />
                                        <label
                                            htmlFor={`feature-${feature}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {feature}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                            <Textarea
                                id="additionalInfo"
                                placeholder="Any other details that would help generate a better website"
                                value={formData.additionalInfo || ""}
                                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quality">Data Quality Rating</Label>
                            <Select
                                value={formData.quality}
                                onValueChange={(value: "good" | "average" | "poor") => handleChange("quality", value)}
                                required
                            >
                                <SelectTrigger id="quality">
                                    <SelectValue placeholder="Rate the quality of this data" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="good">Good (High quality example)</SelectItem>
                                    <SelectItem value="average">Average (Typical example)</SelectItem>
                                    <SelectItem value="poor">Poor (Edge case or unusual example)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes for AI Training (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any notes about why this example is useful for training"
                                value={formData.notes || ""}
                                onChange={(e) => handleChange("notes", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Training Data"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
