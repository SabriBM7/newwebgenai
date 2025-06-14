"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"

interface TechTeamProps {
    title?: string
    subtitle?: string
    team?: Array<{
        name: string
        role: string
        bio: string
        image: string
        skills: string[]
        experience: string
        social?: {
            github?: string
            linkedin?: string
            twitter?: string
        }
    }>
}

export default function TechTeam({ title, subtitle, team }: TechTeamProps) {
    const defaultTeam = [
        {
            name: "Alex Rodriguez",
            role: "Lead Full-Stack Developer",
            bio: "10+ years of experience building scalable web applications. Specializes in React, Node.js, and cloud architecture.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
            skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
            experience: "10+ years",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com",
            },
        },
        {
            name: "Sarah Chen",
            role: "Senior Mobile Developer",
            bio: "Expert in React Native and Flutter development. Has published 15+ apps on both iOS and Android app stores.",
            image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
            experience: "8+ years",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Michael Johnson",
            role: "DevOps Engineer",
            bio: "Cloud infrastructure specialist with expertise in AWS, Docker, and Kubernetes. Ensures 99.9% uptime for all projects.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
            skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
            experience: "7+ years",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Emily Davis",
            role: "AI/ML Engineer",
            bio: "PhD in Computer Science with focus on machine learning. Builds intelligent systems that solve complex business problems.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
            skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "NLP"],
            experience: "6+ years",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com",
            },
        },
        {
            name: "David Kim",
            role: "UI/UX Designer",
            bio: "Creative designer with a passion for user-centered design. Creates intuitive interfaces that users love.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
            skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
            experience: "5+ years",
            social: {
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com",
            },
        },
        {
            name: "Lisa Wang",
            role: "Project Manager",
            bio: "Agile project management expert who ensures projects are delivered on time and within budget. PMP certified.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
            skills: ["Agile", "Scrum", "Project Management", "Team Leadership", "Risk Management"],
            experience: "9+ years",
            social: {
                linkedin: "https://linkedin.com",
            },
        },
    ]

    const techTeam = team || defaultTeam

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Meet Our Team"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Talented professionals dedicated to bringing your vision to life"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techTeam.map((member, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                    <p className="text-blue-200">{member.role}</p>
                                    <p className="text-gray-300 text-sm">{member.experience} experience</p>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.bio}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Skills:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {member.social && (
                                    <div className="flex space-x-3">
                                        {member.social.github && (
                                            <a href={member.social.github} className="text-gray-400 hover:text-gray-600">
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}
                                        {member.social.linkedin && (
                                            <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600">
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400">
                                                <Twitter className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
