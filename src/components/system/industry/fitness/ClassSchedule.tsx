"use client"

import { Clock, Users, MapPin, Star } from "lucide-react"

interface FitnessClass {
    id: string
    name: string
    instructor: string
    time: string
    duration: string
    capacity: number
    enrolled: number
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    location: string
    rating: number
}

interface ClassScheduleProps {
    title?: string
    subtitle?: string
    classes?: FitnessClass[]
    theme?: any
}

export function ClassSchedule({
                                  title = "Class Schedule",
                                  subtitle = "Join our expert-led fitness classes",
                                  classes = [
                                      {
                                          id: "1",
                                          name: "Morning Yoga",
                                          instructor: "Sarah Martinez",
                                          time: "7:00 AM",
                                          duration: "60 min",
                                          capacity: 20,
                                          enrolled: 15,
                                          difficulty: "Beginner",
                                          location: "Studio A",
                                          rating: 4.8,
                                      },
                                      {
                                          id: "2",
                                          name: "HIIT Training",
                                          instructor: "Mike Johnson",
                                          time: "6:00 PM",
                                          duration: "45 min",
                                          capacity: 15,
                                          enrolled: 12,
                                          difficulty: "Advanced",
                                          location: "Studio B",
                                          rating: 4.9,
                                      },
                                      {
                                          id: "3",
                                          name: "Pilates Core",
                                          instructor: "Emma Wilson",
                                          time: "5:30 PM",
                                          duration: "50 min",
                                          capacity: 18,
                                          enrolled: 10,
                                          difficulty: "Intermediate",
                                          location: "Studio A",
                                          rating: 4.7,
                                      },
                                      {
                                          id: "4",
                                          name: "Zumba Dance",
                                          instructor: "Carlos Rodriguez",
                                          time: "7:00 PM",
                                          duration: "55 min",
                                          capacity: 25,
                                          enrolled: 20,
                                          difficulty: "Beginner",
                                          location: "Main Studio",
                                          rating: 4.6,
                                      },
                                  ],
                                  theme,
                              }: ClassScheduleProps) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-800"
            case "Intermediate":
                return "bg-yellow-100 text-yellow-800"
            case "Advanced":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {classes.map((fitnessClass) => (
                        <div
                            key={fitnessClass.id}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{fitnessClass.name}</h3>
                                    <p className="text-gray-600">with {fitnessClass.instructor}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(fitnessClass.difficulty)}`}
                                >
                  {fitnessClass.difficulty}
                </span>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>
                    {fitnessClass.time} • {fitnessClass.duration}
                  </span>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{fitnessClass.location}</span>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>
                    {fitnessClass.enrolled}/{fitnessClass.capacity} spots filled
                  </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-gray-600">{fitnessClass.rating}</span>
                                </div>
                            </div>

                            {/* Capacity Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Availability</span>
                                    <span>{fitnessClass.capacity - fitnessClass.enrolled} spots left</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${(fitnessClass.enrolled / fitnessClass.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                disabled={fitnessClass.enrolled >= fitnessClass.capacity}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                    fitnessClass.enrolled >= fitnessClass.capacity
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            >
                                {fitnessClass.enrolled >= fitnessClass.capacity ? "Class Full" : "Book Class"}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 mb-6">New to our gym? Get your first class free!</p>
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Claim Free Trial
                    </button>
                </div>
            </div>
        </section>
    )
}
