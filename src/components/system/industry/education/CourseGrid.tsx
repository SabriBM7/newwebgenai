"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

interface Course {
    id: string
    title: string
    description: string
    instructor: string
    duration: string
    students: number
    rating: number
    price: string
    image: string
    level: string
    category: string
}

interface CourseGridProps {
    title?: string
    subtitle?: string
    courses?: Course[]
    theme?: any
}

export default function CourseGrid({
                                       title = "Our Courses",
                                       subtitle = "Discover our comprehensive range of educational programs",
                                       courses = [],
                                       theme,
                                   }: CourseGridProps) {
    const defaultCourses: Course[] = [
        {
            id: "1",
            title: "Introduction to Computer Science",
            description: "Learn the fundamentals of programming and computer science concepts.",
            instructor: "Dr. Sarah Johnson",
            duration: "12 weeks",
            students: 1250,
            rating: 4.8,
            price: "$299",
            image: "/placeholder.svg?height=200&width=300&text=Computer+Science",
            level: "Beginner",
            category: "Technology",
        },
        {
            id: "2",
            title: "Advanced Mathematics",
            description: "Master calculus, linear algebra, and advanced mathematical concepts.",
            instructor: "Prof. Michael Chen",
            duration: "16 weeks",
            students: 890,
            rating: 4.9,
            price: "$399",
            image: "/placeholder.svg?height=200&width=300&text=Mathematics",
            level: "Advanced",
            category: "Mathematics",
        },
        {
            id: "3",
            title: "Creative Writing Workshop",
            description: "Develop your writing skills through practical exercises and feedback.",
            instructor: "Emma Rodriguez",
            duration: "8 weeks",
            students: 650,
            rating: 4.7,
            price: "$199",
            image: "/placeholder.svg?height=200&width=300&text=Creative+Writing",
            level: "Intermediate",
            category: "Arts",
        },
    ]

    const displayCourses = courses.length > 0 ? courses : defaultCourses

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
                    {displayCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                                <Badge className="absolute top-4 left-4" variant="secondary">
                                    {course.level}
                                </Badge>
                            </div>

                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline">{course.category}</Badge>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                                <p className="text-gray-600 text-sm">{course.description}</p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {course.students} students
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">by {course.instructor}</span>
                                        <span className="text-lg font-bold" style={{ color: theme?.primaryColor }}>
                      {course.price}
                    </span>
                                    </div>

                                    <Button className="w-full" style={{ backgroundColor: theme?.primaryColor }}>
                                        Enroll Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
