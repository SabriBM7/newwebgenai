"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Globe } from "lucide-react"

interface Faculty {
    id: string
    name: string
    title: string
    department: string
    image: string
    bio: string
    specializations: string[]
    email: string
    phone?: string
    website?: string
    achievements: string[]
}

interface FacultyProfilesProps {
    title?: string
    subtitle?: string
    faculty?: Faculty[]
    theme?: any
}

export default function FacultyProfiles({
                                            title = "Our Faculty",
                                            subtitle = "Meet our distinguished educators and researchers",
                                            faculty = [],
                                            theme,
                                        }: FacultyProfilesProps) {
    const defaultFaculty: Faculty[] = [
        {
            id: "1",
            name: "Dr. Sarah Johnson",
            title: "Professor of Computer Science",
            department: "Technology Department",
            image: "/placeholder.svg?height=300&width=300&text=Dr.+Sarah+Johnson",
            bio: "Dr. Johnson has over 15 years of experience in computer science education and research, specializing in artificial intelligence and machine learning.",
            specializations: ["Artificial Intelligence", "Machine Learning", "Data Science"],
            email: "s.johnson@university.edu",
            phone: "+1 (555) 123-4567",
            website: "https://sarahjohnson.edu",
            achievements: ["Published 50+ research papers", "NSF Research Grant Recipient", "Best Teacher Award 2023"],
        },
        {
            id: "2",
            name: "Prof. Michael Chen",
            title: "Head of Mathematics Department",
            department: "Mathematics Department",
            image: "/placeholder.svg?height=300&width=300&text=Prof.+Michael+Chen",
            bio: "Professor Chen is a renowned mathematician with expertise in advanced calculus and mathematical modeling.",
            specializations: ["Advanced Calculus", "Mathematical Modeling", "Statistics"],
            email: "m.chen@university.edu",
            achievements: ["Mathematics Excellence Award", "20+ years teaching experience", "Department Head since 2020"],
        },
        {
            id: "3",
            name: "Emma Rodriguez",
            title: "Associate Professor of Creative Writing",
            department: "Arts Department",
            image: "/placeholder.svg?height=300&width=300&text=Emma+Rodriguez",
            bio: "Emma is an accomplished author and educator, helping students develop their creative writing skills.",
            specializations: ["Creative Writing", "Literature", "Poetry"],
            email: "e.rodriguez@university.edu",
            website: "https://emmarodriguez.com",
            achievements: ["Published novelist", "Creative Writing Award Winner", "Student Mentor of the Year"],
        },
    ]

    const displayFaculty = faculty.length > 0 ? faculty : defaultFaculty

    return (
        <section className="py-16 px-4" style={{ backgroundColor: theme?.backgroundColor }}>
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme?.primaryColor }}>
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayFaculty.map((member) => (
                        <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                            </div>

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-sm font-medium" style={{ color: theme?.primaryColor }}>
                                            {member.title}
                                        </p>
                                        <p className="text-sm text-gray-600">{member.department}</p>
                                    </div>

                                    <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>

                                    <div>
                                        <h4 className="font-semibold mb-2">Specializations:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {member.specializations.map((spec, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {spec}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Achievements:</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {member.achievements.map((achievement, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail className="w-4 h-4 mr-2" />
                                            <a href={`mailto:${member.email}`} className="hover:underline">
                                                {member.email}
                                            </a>
                                        </div>
                                        {member.phone && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <a href={`tel:${member.phone}`} className="hover:underline">
                                                    {member.phone}
                                                </a>
                                            </div>
                                        )}
                                        {member.website && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Globe className="w-4 h-4 mr-2" />
                                                <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    Personal Website
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
