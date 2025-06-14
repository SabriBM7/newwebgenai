"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, CheckCircle } from "lucide-react"

interface TimeSlot {
    id: string
    time: string
    available: boolean
}

interface Service {
    id: string
    name: string
    duration: string
    price: number
    description: string
}

interface BookingSystemProps {
    title?: string
    subtitle?: string
    services?: Service[]
    backgroundColor?: string
    textColor?: string
}

export default function BookingSystem({
                                          title = "Book an Appointment",
                                          subtitle = "Schedule your visit with our experts",
                                          services = [],
                                          backgroundColor = "bg-white",
                                          textColor = "text-gray-900",
                                      }: BookingSystemProps) {
    const [step, setStep] = useState(1)
    const [selectedService, setSelectedService] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    })

    const defaultServices: Service[] = [
        {
            id: "1",
            name: "Consultation",
            duration: "30 min",
            price: 50,
            description: "Initial consultation and assessment",
        },
        {
            id: "2",
            name: "Full Service",
            duration: "60 min",
            price: 100,
            description: "Comprehensive service session",
        },
        {
            id: "3",
            name: "Follow-up",
            duration: "20 min",
            price: 30,
            description: "Follow-up appointment",
        },
    ]

    const displayServices = services.length > 0 ? services : defaultServices

    const timeSlots: TimeSlot[] = [
        { id: "1", time: "9:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: false },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "1:00 PM", available: true },
        { id: "5", time: "2:00 PM", available: true },
        { id: "6", time: "3:00 PM", available: false },
        { id: "7", time: "4:00 PM", available: true },
    ]

    const handleServiceSelect = (serviceId: string) => {
        setSelectedService(serviceId)
        setStep(2)
    }

    const handleDateTimeSelect = () => {
        if (selectedDate && selectedTime) {
            setStep(3)
        }
    }

    const handleBooking = () => {
        // Here you would typically send the booking data to your backend
        console.log("Booking submitted:", {
            service: selectedService,
            date: selectedDate,
            time: selectedTime,
            customer: customerInfo,
        })
        setStep(4)
    }

    const resetBooking = () => {
        setStep(1)
        setSelectedService("")
        setSelectedDate("")
        setSelectedTime("")
        setCustomerInfo({ name: "", email: "", phone: "", notes: "" })
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    <p className={`text-lg ${textColor} opacity-80 max-w-2xl mx-auto`}>{subtitle}</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div key={stepNumber} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                                    {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                                </div>
                                {stepNumber < 4 && (
                                    <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Service Selection */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Select a Service
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayServices.map((service) => (
                                    <Card
                                        key={service.id}
                                        className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
                                        onClick={() => handleServiceSelect(service.id)}
                                    >
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                            <div className="flex justify-between items-center">
                                                <Badge variant="outline">{service.duration}</Badge>
                                                <span className="font-bold text-blue-600">${service.price}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Date & Time Selection */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Select Date & Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label htmlFor="date">Select Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>

                            {selectedDate && (
                                <div>
                                    <Label>Available Time Slots</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                        {timeSlots.map((slot) => (
                                            <Button
                                                key={slot.id}
                                                variant={selectedTime === slot.time ? "default" : "outline"}
                                                disabled={!slot.available}
                                                onClick={() => setSelectedTime(slot.time)}
                                                className="flex items-center gap-2"
                                            >
                                                <Clock className="h-4 w-4" />
                                                {slot.time}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button onClick={handleDateTimeSelect} disabled={!selectedDate || !selectedTime}>
                                    Continue
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Customer Information */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Your Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={customerInfo.email}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div>
                                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    value={customerInfo.notes}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                                    placeholder="Any special requests or information..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setStep(2)}>
                                    Back
                                </Button>
                                <Button
                                    onClick={handleBooking}
                                    disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                                >
                                    Book Appointment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                    <Card>
                        <CardContent className="text-center py-8">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
                            <p className="text-gray-600 mb-6">
                                Your appointment has been successfully booked. You will receive a confirmation email shortly.
                            </p>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                                <h4 className="font-semibold mb-2">Appointment Details:</h4>
                                <p>
                                    <strong>Service:</strong> {displayServices.find((s) => s.id === selectedService)?.name}
                                </p>
                                <p>
                                    <strong>Date:</strong> {selectedDate}
                                </p>
                                <p>
                                    <strong>Time:</strong> {selectedTime}
                                </p>
                                <p>
                                    <strong>Name:</strong> {customerInfo.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {customerInfo.email}
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <Button onClick={resetBooking}>Book Another Appointment</Button>
                                <Button variant="outline">Add to Calendar</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    )
}
