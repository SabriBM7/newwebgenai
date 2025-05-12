"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function GeneratorPage() {
    const router = useRouter()
    const [isGenerating, setIsGenerating] = useState(false)
    const [formData, setFormData] = useState({
        industry: "",
        purpose: "",
        targetAudience: "",
        style: "",
        tone: "",
        features: "",
        additionalInfo: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)

        try {
            const response = await fetch("/api/ollama-generate-website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requirements: {
                        industry: formData.industry,
                        purpose: formData.purpose,
                        targetAudience: formData.targetAudience,
                        style: formData.style,
                        tone: formData.tone,
                        features: formData.features.split(",").map((f) => f.trim()),
                        additionalInfo: formData.additionalInfo,
                    },
                }),
            })

            const data = await response.json()

            if (data.error) {
                console.error("Error generating website:", data.error)
                alert("Error generating website. Please try again.")
                setIsGenerating(false)
                return
            }

            // Store the generated website data in localStorage
            localStorage.setItem("generatedWebsite", JSON.stringify(data.website))

            // Redirect to the preview page
            router.push("/generator/preview")
        } catch (error) {
            console.error("Error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Generate Your Landing Page</h1>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Website Requirements</CardTitle>
                    <CardDescription>
                        Provide details about your website and our AI will generate a custom landing page for you.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Input
                                id="industry"
                                name="industry"
                                placeholder="e.g., Technology, Healthcare, Education"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="purpose">Website Purpose</Label>
                            <Textarea
                                id="purpose"
                                name="purpose"
                                placeholder="What is the main goal of your website?"
                                value={formData.purpose}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Select
                                value={formData.targetAudience}
                                onValueChange={(value) => handleSelectChange("targetAudience", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your target audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="enterprise_executives">Enterprise Executives</SelectItem>
                                    <SelectItem value="students_professionals">Students & Professionals</SelectItem>
                                    <SelectItem value="creative_professionals">Creative Professionals</SelectItem>
                                    <SelectItem value="online_shoppers">Online Shoppers</SelectItem>
                                    <SelectItem value="general_public">General Public</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="style">Design Style</Label>
                            <Input
                                id="style"
                                name="style"
                                placeholder="e.g., Modern, Minimalist, Bold, Corporate"
                                value={formData.style}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tone">Content Tone</Label>
                            <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select content tone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="friendly">Friendly</SelectItem>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="inspirational">Inspirational</SelectItem>
                                    <SelectItem value="educational">Educational</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="features">Key Features</Label>
                            <Input
                                id="features"
                                name="features"
                                placeholder="e.g., About, Services, Testimonials, Contact (comma separated)"
                                value={formData.features}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                            <Textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                placeholder="Any other details you'd like to include"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isGenerating}>
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Landing Page"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
