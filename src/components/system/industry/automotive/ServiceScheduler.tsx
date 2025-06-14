"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Wrench, Phone, Mail } from "lucide-react"

interface ServiceType {
    id: string
    name: string
    duration: string
    price: number
    description: string
}

export function ServiceScheduler(props: any) {
    const [selectedService, setSelectedService] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")

    const services: ServiceType[] = props.services || [
        {
            id: "oil-change",
            name: "Oil Change",
            duration: "30 min",
            price: 49.99,
            description: "Full synthetic oil change with filter replacement",
        },
        {
            id: "brake-service",
            name: "Brake Service",
            duration: "2 hours",
            price: 199.99,
            description: "Complete brake inspection and pad replacement",
        },
        {
            id: "tire-rotation",
            name: "Tire Rotation",
            duration: "45 min",
            price: 29.99,
            description: "Tire rotation and pressure check",
        },
        {
            id: "diagnostic",
            name: "Diagnostic Check",
            duration: "1 hour",
            price: 89.99,
            description: "Computer diagnostic and system check",
        },
    ]

    const timeSlots = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Schedule Your Service"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Book your automotive service appointment online. Quick, easy, and convenient."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Service Selection */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Select Service</h3>
                        <div className="grid gap-4">
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    className={`cursor-pointer transition-all ${
                                        selectedService === service.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                                    }`}
                                    onClick={() => setSelectedService(service.id)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-semibold">{service.name}</h4>
                                            <Badge variant="outline">${service.price}</Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {service.duration}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Appointment Form */}
                    <Card className="bg-white shadow-lg">
                        <CardContent className="p-8">
                            <div className="flex items-center mb-6">
                                <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                                <h3 className="text-2xl font-bold">Book Appointment</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Customer Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">Customer Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="First Name" />
                                        <Input placeholder="Last Name" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input placeholder="Phone Number" className="pl-10" />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input placeholder="Email" className="pl-10" />
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">Vehicle Information</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                                                    <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input placeholder="Make" />
                                        <Input placeholder="Model" />
                                    </div>
                                    <Input placeholder="License Plate (Optional)" />
                                </div>

                                {/* Date and Time Selection */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">Preferred Date & Time</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timeSlots.map((time) => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md resize-none"
                                        rows={3}
                                        placeholder="Describe any specific issues or concerns..."
                                    />
                                </div>

                                {/* Service Summary */}
                                {selectedService && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-900 mb-2">Service Summary</h4>
                                        {(() => {
                                            const service = services.find((s) => s.id === selectedService)
                                            return service ? (
                                                <div className="space-y-1 text-sm text-blue-800">
                                                    <p>
                                                        <strong>Service:</strong> {service.name}
                                                    </p>
                                                    <p>
                                                        <strong>Duration:</strong> {service.duration}
                                                    </p>
                                                    <p>
                                                        <strong>Price:</strong> ${service.price}
                                                    </p>
                                                    {selectedDate && (
                                                        <p>
                                                            <strong>Date:</strong> {selectedDate}
                                                        </p>
                                                    )}
                                                    {selectedTime && (
                                                        <p>
                                                            <strong>Time:</strong> {selectedTime}
                                                        </p>
                                                    )}
                                                </div>
                                            ) : null
                                        })()}
                                    </div>
                                )}

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                                    disabled={!selectedService || !selectedDate || !selectedTime}
                                >
                                    <Wrench className="h-5 w-5 mr-2" />
                                    Schedule Appointment
                                </Button>

                                <p className="text-xs text-gray-500 text-center">
                                    You will receive a confirmation email with appointment details.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
