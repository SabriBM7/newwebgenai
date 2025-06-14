"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CourseCatalog(props: any) {
    const categories = props.categories || ["Business", "Computer Science", "Design", "Mathematics"]

    const courses = props.courses || [
        {
            title: "Introduction to Marketing",
            description: "Learn the fundamentals of marketing strategy, consumer behavior, and digital marketing techniques.",
            instructor: "Dr. Sarah Johnson",
            duration: "8 weeks",
            schedule: "Tuesdays & Thursdays, 6-8PM",
            level: "Beginner",
            rating: 4.8,
            reviews: 124,
            category: "Business",
            enrollment: "Open",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
        },
        {
            title: "Financial Accounting",
            description: "Master the principles of accounting, financial statements, and business reporting.",
            instructor: "Prof. Michael Chen",
            duration: "10 weeks",
            schedule: "Mondays & Wednesdays, 5-7PM",
            level: "Intermediate",
            rating: 4.7,
            reviews: 98,
            category: "Business",
            enrollment: "Open",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=350&fit=crop",
        },
        {
            title: "Web Development Bootcamp",
            description: "Comprehensive course covering HTML, CSS, JavaScript, React, and Node.js.",
            instructor: "Emma Rodriguez",
            duration: "12 weeks",
            schedule: "Mondays, Wednesdays & Fridays, 6-9PM",
            level: "Beginner to Intermediate",
            rating: 4.9,
            reviews: 215,
            category: "Computer Science",
            enrollment: "Limited Spots",
            image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&h=350&fit=crop",
        },
        {
            title: "Data Structures & Algorithms",
            description: "Essential algorithms, data structures, and problem-solving techniques for technical interviews.",
            instructor: "Prof. Alan Turing",
            duration: "10 weeks",
            schedule: "Tuesdays & Thursdays, 7-9PM",
            level: "Advanced",
            rating: 4.7,
            reviews: 156,
            category: "Computer Science",
            enrollment: "Open",
            image: "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?w=500&h=350&fit=crop",
        },
        {
            title: "UI/UX Design Principles",
            description: "Learn user-centered design approaches, wireframing, prototyping, and usability testing.",
            instructor: "Jessica Wong",
            duration: "8 weeks",
            schedule: "Wednesdays, 6-9PM",
            level: "Beginner",
            rating: 4.8,
            reviews: 92,
            category: "Design",
            enrollment: "Open",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop",
        },
        {
            title: "Advanced Calculus",
            description: "Rigorous exploration of limits, continuity, differentiation and integration.",
            instructor: "Dr. Robert Lewis",
            duration: "15 weeks",
            schedule: "Mondays & Fridays, 4-6PM",
            level: "Advanced",
            rating: 4.6,
            reviews: 67,
            category: "Mathematics",
            enrollment: "Limited Spots",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=350&fit=crop",
        },
    ]

    const getLevelBadgeColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800"
            case "intermediate":
                return "bg-blue-100 text-blue-800"
            case "advanced":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getEnrollmentBadgeColor = (enrollment: string) => {
        if (enrollment.toLowerCase().includes("open")) {
            return "bg-green-100 text-green-800"
        } else if (enrollment.toLowerCase().includes("limited")) {
            return "bg-amber-100 text-amber-800"
        } else {
            return "bg-red-100 text-red-800"
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Course Catalog"}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {props.subtitle || "Browse our selection of professional courses taught by industry experts"}
                    </p>
                </div>

                <div className="mb-8 flex justify-center flex-wrap gap-2">
                    {categories.map((category: string) => (
                        <Button key={category} variant="outline" className="mb-2">
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={course.image || "/placeholder.svg"}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge className={getLevelBadgeColor(course.level)}>{course.level}</Badge>
                                    <Badge className={getEnrollmentBadgeColor(course.enrollment)}>{course.enrollment}</Badge>
                                </div>

                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

                                <div className="text-sm text-gray-500 mb-1">Instructor: {course.instructor}</div>

                                <div className="flex flex-wrap gap-3 mb-4 mt-3 text-sm">
                                    <div className="flex items-center text-gray-500">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{course.schedule}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500 ml-2">({course.reviews})</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CourseCatalog
