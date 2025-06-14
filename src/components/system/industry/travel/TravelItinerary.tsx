"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Camera, Utensils, Bed, Plane } from "lucide-react"

interface ItineraryDay {
    day: number
    date: string
    title: string
    location: string
    activities: Activity[]
    accommodation?: string
    meals: string[]
    transportation?: string
}

interface Activity {
    time: string
    title: string
    description: string
    duration: string
    type: "sightseeing" | "dining" | "activity" | "transport" | "accommodation"
    icon: string
}

export function TravelItinerary(props: any) {
    const [selectedDay, setSelectedDay] = useState(1)

    const itinerary: ItineraryDay[] = props.itinerary || [
        {
            day: 1,
            date: "March 15, 2024",
            title: "Arrival in Tokyo",
            location: "Tokyo, Japan",
            activities: [
                {
                    time: "10:00 AM",
                    title: "Arrival at Narita Airport",
                    description: "Land at Narita International Airport and complete immigration",
                    duration: "1 hour",
                    type: "transport",
                    icon: "✈️",
                },
                {
                    time: "12:00 PM",
                    title: "Transfer to Hotel",
                    description: "Private transfer to hotel in Shibuya district",
                    duration: "1.5 hours",
                    type: "transport",
                    icon: "🚗",
                },
                {
                    time: "2:00 PM",
                    title: "Hotel Check-in",
                    description: "Check into luxury hotel and freshen up",
                    duration: "1 hour",
                    type: "accommodation",
                    icon: "🏨",
                },
                {
                    time: "4:00 PM",
                    title: "Shibuya Crossing",
                    description: "Experience the world's busiest pedestrian crossing",
                    duration: "2 hours",
                    type: "sightseeing",
                    icon: "📸",
                },
                {
                    time: "7:00 PM",
                    title: "Welcome Dinner",
                    description: "Traditional kaiseki dinner at renowned restaurant",
                    duration: "2 hours",
                    type: "dining",
                    icon: "🍽️",
                },
            ],
            accommodation: "Park Hyatt Tokyo",
            meals: ["Welcome Dinner"],
            transportation: "Private Transfer",
        },
        {
            day: 2,
            date: "March 16, 2024",
            title: "Tokyo Exploration",
            location: "Tokyo, Japan",
            activities: [
                {
                    time: "8:00 AM",
                    title: "Breakfast at Hotel",
                    description: "Japanese breakfast at hotel restaurant",
                    duration: "1 hour",
                    type: "dining",
                    icon: "🥢",
                },
                {
                    time: "9:30 AM",
                    title: "Senso-ji Temple",
                    description: "Visit Tokyo's oldest temple in Asakusa district",
                    duration: "2 hours",
                    type: "sightseeing",
                    icon: "⛩️",
                },
                {
                    time: "12:00 PM",
                    title: "Sushi Making Class",
                    description: "Learn to make authentic sushi with master chef",
                    duration: "3 hours",
                    type: "activity",
                    icon: "🍣",
                },
                {
                    time: "4:00 PM",
                    title: "Imperial Palace Gardens",
                    description: "Stroll through beautiful palace gardens",
                    duration: "2 hours",
                    type: "sightseeing",
                    icon: "🌸",
                },
                {
                    time: "7:30 PM",
                    title: "Ginza District",
                    description: "Explore upscale shopping and dining district",
                    duration: "2.5 hours",
                    type: "sightseeing",
                    icon: "🛍️",
                },
            ],
            accommodation: "Park Hyatt Tokyo",
            meals: ["Breakfast", "Sushi Lunch", "Dinner in Ginza"],
            transportation: "Private Guide & Driver",
        },
        {
            day: 3,
            date: "March 17, 2024",
            title: "Mount Fuji Day Trip",
            location: "Mount Fuji, Japan",
            activities: [
                {
                    time: "7:00 AM",
                    title: "Early Departure",
                    description: "Depart Tokyo for Mount Fuji region",
                    duration: "2.5 hours",
                    type: "transport",
                    icon: "🚌",
                },
                {
                    time: "10:00 AM",
                    title: "Lake Kawaguchi",
                    description: "Scenic views of Mount Fuji from the lake",
                    duration: "2 hours",
                    type: "sightseeing",
                    icon: "🏔️",
                },
                {
                    time: "1:00 PM",
                    title: "Traditional Lunch",
                    description: "Local cuisine with Mount Fuji views",
                    duration: "1.5 hours",
                    type: "dining",
                    icon: "🍱",
                },
                {
                    time: "3:00 PM",
                    title: "Chureito Pagoda",
                    description: "Iconic pagoda with Mount Fuji backdrop",
                    duration: "1.5 hours",
                    type: "sightseeing",
                    icon: "📸",
                },
                {
                    time: "6:00 PM",
                    title: "Return to Tokyo",
                    description: "Return journey to Tokyo",
                    duration: "2.5 hours",
                    type: "transport",
                    icon: "🚌",
                },
            ],
            accommodation: "Park Hyatt Tokyo",
            meals: ["Breakfast", "Mount Fuji Lunch"],
            transportation: "Private Coach",
        },
    ]

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "sightseeing":
                return <Camera className="h-4 w-4" />
            case "dining":
                return <Utensils className="h-4 w-4" />
            case "accommodation":
                return <Bed className="h-4 w-4" />
            case "transport":
                return <Plane className="h-4 w-4" />
            case "activity":
                return <Calendar className="h-4 w-4" />
            default:
                return <MapPin className="h-4 w-4" />
        }
    }

    const getActivityColor = (type: string) => {
        switch (type) {
            case "sightseeing":
                return "bg-blue-100 text-blue-800"
            case "dining":
                return "bg-orange-100 text-orange-800"
            case "accommodation":
                return "bg-purple-100 text-purple-800"
            case "transport":
                return "bg-green-100 text-green-800"
            case "activity":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Your Travel Itinerary"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Detailed day-by-day itinerary for your upcoming adventure"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Day Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="bg-white shadow-lg sticky top-8">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Trip Days</h3>
                                <div className="space-y-2">
                                    {itinerary.map((day) => (
                                        <button
                                            key={day.day}
                                            onClick={() => setSelectedDay(day.day)}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                selectedDay === day.day
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            <div className="font-semibold">Day {day.day}</div>
                                            <div className="text-sm opacity-90">{day.title}</div>
                                            <div className="text-xs opacity-75">{day.date}</div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Day Details */}
                    <div className="lg:col-span-3">
                        {(() => {
                            const currentDay = itinerary.find((day) => day.day === selectedDay)
                            if (!currentDay) return null

                            return (
                                <div className="space-y-6">
                                    {/* Day Header */}
                                    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                        <CardContent className="p-8">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-3xl font-bold mb-2">Day {currentDay.day}</h2>
                                                    <h3 className="text-xl mb-2">{currentDay.title}</h3>
                                                    <div className="flex items-center text-blue-100">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        {currentDay.location}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-blue-100 text-sm">Date</div>
                                                    <div className="text-lg font-semibold">{currentDay.date}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Activities Timeline */}
                                    <Card className="bg-white shadow-lg">
                                        <CardContent className="p-8">
                                            <h3 className="text-xl font-semibold mb-6">Daily Activities</h3>
                                            <div className="space-y-6">
                                                {currentDay.activities.map((activity, index) => (
                                                    <div key={index} className="flex gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                                {getActivityIcon(activity.type)}
                                                            </div>
                                                            {index < currentDay.activities.length - 1 && (
                                                                <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    <Clock className="h-3 w-3 mr-1" />
                                                                    {activity.time}
                                                                </Badge>
                                                                <Badge className={`text-xs ${getActivityColor(activity.type)}`}>{activity.type}</Badge>
                                                                <span className="text-sm text-gray-500">{activity.duration}</span>
                                                            </div>
                                                            <h4 className="text-lg font-semibold mb-1">
                                                                {activity.icon} {activity.title}
                                                            </h4>
                                                            <p className="text-gray-600">{activity.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Day Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Accommodation */}
                                        {currentDay.accommodation && (
                                            <Card className="bg-white shadow-lg">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center mb-3">
                                                        <Bed className="h-5 w-5 text-purple-600 mr-2" />
                                                        <h4 className="font-semibold">Accommodation</h4>
                                                    </div>
                                                    <p className="text-gray-600">{currentDay.accommodation}</p>
                                                </CardContent>
                                            </Card>
                                        )}

                                        {/* Meals */}
                                        <Card className="bg-white shadow-lg">
                                            <CardContent className="p-6">
                                                <div className="flex items-center mb-3">
                                                    <Utensils className="h-5 w-5 text-orange-600 mr-2" />
                                                    <h4 className="font-semibold">Meals Included</h4>
                                                </div>
                                                <div className="space-y-1">
                                                    {currentDay.meals.map((meal, idx) => (
                                                        <div key={idx} className="text-sm text-gray-600">
                                                            • {meal}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Transportation */}
                                        {currentDay.transportation && (
                                            <Card className="bg-white shadow-lg">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center mb-3">
                                                        <Plane className="h-5 w-5 text-green-600 mr-2" />
                                                        <h4 className="font-semibold">Transportation</h4>
                                                    </div>
                                                    <p className="text-gray-600">{currentDay.transportation}</p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">Download Itinerary</Button>
                        <Button variant="outline">Share Itinerary</Button>
                        <Button variant="outline">Customize Trip</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
