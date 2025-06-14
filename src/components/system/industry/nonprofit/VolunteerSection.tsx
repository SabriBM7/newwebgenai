"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, Clock, MapPin, Calendar, Mail, Phone } from "lucide-react"

interface VolunteerOpportunity {
    id: string
    title: string
    category: string
    location: string
    timeCommitment: string
    skills: string[]
    description: string
    impact: string
    urgency: "low" | "medium" | "high"
    spotsAvailable: number
    image: string
}

export function VolunteerSection(props: any) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [showApplicationForm, setShowApplicationForm] = useState<string | null>(null)

    const opportunities: VolunteerOpportunity[] = props.opportunities || [
        {
            id: "1",
            title: "Community Garden Coordinator",
            category: "environment",
            location: "Downtown Community Center",
            timeCommitment: "4 hours/week",
            skills: ["Gardening", "Leadership", "Organization"],
            description:
                "Help coordinate our community garden project, teaching sustainable farming practices to local families.",
            impact: "Provides fresh produce for 50+ families",
            urgency: "high",
            spotsAvailable: 2,
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        },
        {
            id: "2",
            title: "Youth Mentor",
            category: "education",
            location: "Lincoln Elementary School",
            timeCommitment: "2 hours/week",
            skills: ["Communication", "Patience", "Teaching"],
            description: "Mentor elementary school students in reading and basic math skills after school.",
            impact: "Supports 15 students' academic growth",
            urgency: "medium",
            spotsAvailable: 5,
            image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
        },
        {
            id: "3",
            title: "Food Bank Assistant",
            category: "hunger",
            location: "Central Food Bank",
            timeCommitment: "3 hours/week",
            skills: ["Physical Work", "Organization", "Teamwork"],
            description: "Sort, pack, and distribute food donations to families in need throughout the community.",
            impact: "Helps feed 200+ families monthly",
            urgency: "high",
            spotsAvailable: 8,
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
        },
        {
            id: "4",
            title: "Senior Companion",
            category: "elderly",
            location: "Sunset Senior Center",
            timeCommitment: "2 hours/week",
            skills: ["Empathy", "Communication", "Patience"],
            description:
                "Provide companionship and assistance to elderly residents, including games, reading, and conversation.",
            impact: "Brightens the lives of 20+ seniors",
            urgency: "low",
            spotsAvailable: 3,
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
        },
    ]

    const categories = [
        { id: "all", label: "All Opportunities" },
        { id: "education", label: "Education" },
        { id: "environment", label: "Environment" },
        { id: "hunger", label: "Hunger Relief" },
        { id: "elderly", label: "Senior Care" },
        { id: "youth", label: "Youth Programs" },
    ]

    const filteredOpportunities =
        selectedCategory === "all" ? opportunities : opportunities.filter((opp) => opp.category === selectedCategory)

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
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

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Volunteer Opportunities"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle ||
                            "Make a difference in your community. Find volunteer opportunities that match your skills and passion."}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.id)}
                            className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                            <div className="relative">
                                <img
                                    src={opportunity.image || "/placeholder.svg"}
                                    alt={opportunity.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className={`${getUrgencyColor(opportunity.urgency)} border`}>
                                        {opportunity.urgency} priority
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-blue-600">{opportunity.spotsAvailable} spots left</Badge>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {opportunity.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {opportunity.timeCommitment}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{opportunity.description}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-sm mb-2">Skills Needed:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {opportunity.skills.map((skill, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                    <div className="flex items-center text-sm text-green-800">
                                        <Heart className="h-4 w-4 mr-2" />
                                        <strong>Impact:</strong>
                                    </div>
                                    <p className="text-sm text-green-700 mt-1">{opportunity.impact}</p>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setShowApplicationForm(opportunity.id)}
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    Apply to Volunteer
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Application Form Modal */}
                {showApplicationForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">Volunteer Application</h3>
                                    <Button variant="outline" size="sm" onClick={() => setShowApplicationForm(null)}>
                                        ✕
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Personal Information</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input placeholder="First Name" />
                                            <Input placeholder="Last Name" />
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input placeholder="Email Address" className="pl-10" />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input placeholder="Phone Number" className="pl-10" />
                                            </div>
                                        </div>
                                        <Input placeholder="Address" className="mt-4" />
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Availability</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Preferred Days" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weekdays">Weekdays</SelectItem>
                                                    <SelectItem value="weekends">Weekends</SelectItem>
                                                    <SelectItem value="flexible">Flexible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Time of Day" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="morning">Morning</SelectItem>
                                                    <SelectItem value="afternoon">Afternoon</SelectItem>
                                                    <SelectItem value="evening">Evening</SelectItem>
                                                    <SelectItem value="flexible">Flexible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Experience & Skills */}
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Experience & Skills</h4>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md resize-none"
                                            rows={4}
                                            placeholder="Tell us about your relevant experience and skills..."
                                        />
                                    </div>

                                    {/* Motivation */}
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Why do you want to volunteer?</h4>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md resize-none"
                                            rows={3}
                                            placeholder="Share your motivation for volunteering with us..."
                                        />
                                    </div>

                                    {/* Emergency Contact */}
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Emergency Contact</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input placeholder="Contact Name" />
                                            <Input placeholder="Relationship" />
                                            <Input placeholder="Phone Number" className="col-span-2" />
                                        </div>
                                    </div>

                                    {/* Agreement */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="flex items-start space-x-3">
                                            <input type="checkbox" className="mt-1" />
                                            <span className="text-sm text-gray-700">
                        I agree to undergo a background check if required and commit to the volunteer responsibilities
                        outlined in this opportunity.
                      </span>
                                        </label>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                                            onClick={() => setShowApplicationForm(null)}
                                        >
                                            Submit Application
                                        </Button>
                                        <Button variant="outline" className="flex-1" onClick={() => setShowApplicationForm(null)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center">
                    <Card className="bg-white/80 backdrop-blur max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Find the Right Opportunity?</h3>
                            <p className="text-gray-600 mb-6">
                                We're always looking for passionate volunteers. Let us know your interests and we'll match you with the
                                perfect opportunity.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact Volunteer Coordinator
                                </Button>
                                <Button variant="outline">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule a Meeting
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
