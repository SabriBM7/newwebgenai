"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, MapPin, CheckCircle } from "lucide-react"

interface Doctor {
    id: string
    name: string
    specialty: string
    image: string
    rating: number
    availableSlots: string[]
}

interface AppointmentSchedulerProps {
    title?: string
    subtitle?: string
    doctors?: Doctor[]
    showDoctorSelection?: boolean
}

export default function AppointmentScheduler({
                                                 title = "Schedule Your Appointment",
                                                 subtitle = "Book an appointment with our healthcare professionals",
                                                 doctors = [],
                                                 showDoctorSelection = true,
                                             }: AppointmentSchedulerProps) {
    const [selectedDoctor, setSelectedDoctor] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [appointmentType, setAppointmentType] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        reason: "",
        insurance: "",
    })

    const defaultDoctors: Doctor[] = [
        {
            id: "1",
            name: "Dr. Sarah Johnson",
            specialty: "Family Medicine",
            image: "/placeholder.svg?height=100&width=100",
            rating: 4.9,
            availableSlots: ["09:00", "10:30", "14:00", "15:30"],
        },
        {
            id: "2",
            name: "Dr. Michael Chen",
            specialty: "Cardiology",
            image: "/placeholder.svg?height=100&width=100",
            rating: 4.8,
            availableSlots: ["08:30", "11:00", "13:30", "16:00"],
        },
        {
            id: "3",
            name: "Dr. Emily Rodriguez",
            specialty: "Dermatology",
            image: "/placeholder.svg?height=100&width=100",
            rating: 4.9,
            availableSlots: ["09:30", "11:30", "14:30", "16:30"],
        },
    ]

    const displayDoctors = doctors.length > 0 ? doctors : defaultDoctors

    const appointmentTypes = [
        "General Consultation",
        "Follow-up Visit",
        "Annual Physical",
        "Specialist Consultation",
        "Urgent Care",
        "Telemedicine",
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (isSubmitted) {
        return (
            <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto text-center">
                        <CardContent className="p-12">
                            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Scheduled Successfully!</h2>
                            <p className="text-gray-600 mb-6">
                                Your appointment has been confirmed. You will receive a confirmation email shortly.
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-blue-600" />
                                        <span>{displayDoctors.find((d) => d.id === selectedDoctor)?.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                                        <span>{selectedDate}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                        <span>{selectedTime}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                        <span>{appointmentType}</span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                Schedule Another Appointment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {showDoctorSelection && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="h-5 w-5 mr-2" />
                                        Select Healthcare Provider
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {displayDoctors.map((doctor) => (
                                            <div
                                                key={doctor.id}
                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                    selectedDoctor === doctor.id
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() => setSelectedDoctor(doctor.id)}
                                            >
                                                <img
                                                    src={doctor.image || "/placeholder.svg"}
                                                    alt={doctor.name}
                                                    className="w-16 h-16 rounded-full mx-auto mb-3"
                                                />
                                                <h3 className="font-semibold text-center">{doctor.name}</h3>
                                                <p className="text-sm text-gray-600 text-center">{doctor.specialty}</p>
                                                <div className="flex items-center justify-center mt-2">
                                                    <span className="text-yellow-400">★</span>
                                                    <span className="text-sm ml-1">{doctor.rating}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Appointment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="appointmentType">Appointment Type</Label>
                                        <Select value={appointmentType} onValueChange={setAppointmentType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select appointment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {appointmentTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="date">Preferred Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>

                                    <div>
                                        <Label>Available Time Slots</Label>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {selectedDoctor &&
                                                displayDoctors
                                                    .find((d) => d.id === selectedDoctor)
                                                    ?.availableSlots.map((slot) => (
                                                    <Button
                                                        key={slot}
                                                        type="button"
                                                        variant={selectedTime === slot ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setSelectedTime(slot)}
                                                    >
                                                        {slot}
                                                    </Button>
                                                ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="h-5 w-5 mr-2" />
                                        Patient Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="insurance">Insurance Provider</Label>
                                        <Input
                                            id="insurance"
                                            value={formData.insurance}
                                            onChange={(e) => handleInputChange("insurance", e.target.value)}
                                            placeholder="e.g., Blue Cross Blue Shield"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reason for Visit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={formData.reason}
                                    onChange={(e) => handleInputChange("reason", e.target.value)}
                                    placeholder="Please describe your symptoms or reason for the appointment..."
                                    rows={4}
                                />
                            </CardContent>
                        </Card>

                        <div className="text-center">
                            <Button
                                type="submit"
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={!selectedDoctor || !selectedDate || !selectedTime || !appointmentType}
                            >
                                Schedule Appointment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
