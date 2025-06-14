"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface TechPortfolioProps {
    title?: string
    subtitle?: string
    projects?: Array<{
        name: string
        description: string
        image: string
        technologies: string[]
        liveUrl?: string
        githubUrl?: string
        category: string
    }>
}

export default function TechPortfolio({ title, subtitle, projects }: TechPortfolioProps) {
    const defaultProjects = [
        {
            name: "E-Commerce Platform",
            description:
                "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com",
            category: "Web Development",
        },
        {
            name: "Mobile Banking App",
            description:
                "Secure mobile banking application built with React Native. Includes biometric authentication, transaction history, and real-time notifications.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
            technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com",
            category: "Mobile Development",
        },
        {
            name: "AI Analytics Dashboard",
            description:
                "Machine learning powered analytics dashboard for business intelligence. Features predictive analytics and real-time data visualization.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
            technologies: ["Python", "TensorFlow", "React", "D3.js"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com",
            category: "AI/ML",
        },
        {
            name: "Cloud Infrastructure",
            description:
                "Scalable cloud infrastructure setup using AWS services. Includes auto-scaling, load balancing, and monitoring solutions.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
            technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
            category: "DevOps",
        },
    ]

    const portfolioProjects = projects || defaultProjects

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title || "Our Portfolio"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle || "Showcasing our latest projects and technical achievements"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioProjects.map((project, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.name}
                                    className="w-full h-48 object-cover"
                                />
                                <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{project.category}</Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{project.name}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <Badge key={techIndex} variant="outline" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    {project.liveUrl && (
                                        <Button size="sm" className="flex-1">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Live Demo
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <Github className="h-4 w-4 mr-2" />
                                            Code
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
