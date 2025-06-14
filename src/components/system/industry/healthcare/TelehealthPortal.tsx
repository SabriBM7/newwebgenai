"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Video, Phone, MessageSquare, Calendar, Clock, Mic, MicOff, VideoOff, Settings, Share } from "lucide-react"

interface Doctor {
    id: string
    name: string
    specialty: string
    image: string
    status: "online" | "busy" | "offline"
    nextAvailable: string
}

interface Appointment {
    id: string
    doctorId: string
    date: string
    time: string
    type: "video" | "phone" | "chat"
    status: "scheduled" | "active" | "completed"
}

interface TelehealthPortalProps {
    title?: string
    subtitle?: string
    doctors?: Doctor[]
    appointments?: Appointment[]
}

export default function TelehealthPortal({
                                             title = "Telehealth Portal",
                                             subtitle = "Connect with healthcare providers from anywhere",
                                             doctors = [],
                                             appointments = [],
                                         }: TelehealthPortalProps) {
    const [activeTab, setActiveTab] = useState<"dashboard" | "consultation" | "appointments">("dashboard")
    const [selectedDoctor, setSelectedDoctor] = useState<string>("")
    const [consultationType, setConsultationType] = useState<"video" | "phone" | "chat">("video")
    const [isInCall, setIsInCall] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [chatMessages, setChatMessages] = useState<
        Array<{ id: string; sender: string; message: string; time: string }>
    >([])
    const [newMessage, setNewMessage] = useState("")

    const defaultDoctors: Doctor[] = [
        {
            id: "1",
            name: "Dr. Sarah Johnson",
            specialty: "Family Medicine",
            image: "/placeholder.svg?height=100&width=100",
            status: "online",
            nextAvailable: "Available now",
        },
        {
            id: "2",
            name: "Dr. Michael Chen",
            specialty: "Cardiology",
            image: "/placeholder.svg?height=100&width=100",
            status: "busy",
            nextAvailable: "Available in 30 min",
        },
        {
            id: "3",
            name: "Dr. Emily Rodriguez",
            specialty: "Dermatology",
            image: "/placeholder.svg?height=100&width=100",
            status: "online",
            nextAvailable: "Available now",
        },
    ]

    const defaultAppointments: Appointment[] = [
        {
            id: "1",
            doctorId: "1",
            date: "2024-01-15",
            time: "10:00 AM",
            type: "video",
            status: "scheduled",
        },
        {
            id: "2",
            doctorId: "2",
            date: "2024-01-16",
            time: "2:30 PM",
            type: "phone",
            status: "scheduled",
        },
    ]

    const displayDoctors = doctors.length > 0 ? doctors : defaultDoctors
    const displayAppointments = appointments.length > 0 ? appointments : defaultAppointments

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-100 text-green-800"
            case "busy":
                return "bg-yellow-100 text-yellow-800"
            case "offline":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const startConsultation = () => {
        setIsInCall(true)
        setActiveTab("consultation")
    }

    const endConsultation = () => {
        setIsInCall(false)
        setActiveTab("dashboard")
    }

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now().toString(),
                sender: "You",
                message: newMessage,
                time: new Date().toLocaleTimeString(),
            }
            setChatMessages((prev) => [...prev, message])
            setNewMessage("")
        }
    }

    if (activeTab === "consultation" && isInCall) {
        return (
            <section className="py-20 bg-gray-900 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[80vh]">
                            {/* Main Video Area */}
                            <div className="lg:col-span-3">
                                <Card className="h-full bg-black">
                                    <CardContent className="p-0 h-full relative">
                                        <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                                            {consultationType === "video" ? (
                                                <div className="text-center text-white">
                                                    <Video className="h-24 w-24 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg">Video consultation in progress...</p>
                                                    <p className="text-sm opacity-75">Dr. Sarah Johnson</p>
                                                </div>
                                            ) : consultationType === "phone" ? (
                                                <div className="text-center text-white">
                                                    <Phone className="h-24 w-24 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg">Voice call in progress...</p>
                                                    <p className="text-sm opacity-75">Dr. Sarah Johnson</p>
                                                </div>
                                            ) : (
                                                <div className="text-center text-white">
                                                    <MessageSquare className="h-24 w-24 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg">Chat consultation</p>
                                                    <p className="text-sm opacity-75">Dr. Sarah Johnson</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Control Bar */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                            <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-6 py-3">
                                                <Button
                                                    size="sm"
                                                    variant={isMuted ? "destructive" : "secondary"}
                                                    onClick={() => setIsMuted(!isMuted)}
                                                    className="rounded-full"
                                                >
                                                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                                </Button>

                                                {consultationType === "video" && (
                                                    <Button
                                                        size="sm"
                                                        variant={isVideoOff ? "destructive" : "secondary"}
                                                        onClick={() => setIsVideoOff(!isVideoOff)}
                                                        className="rounded-full"
                                                    >
                                                        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                                                    </Button>
                                                )}

                                                <Button size="sm" variant="secondary" className="rounded-full">
                                                    <Settings className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm" variant="secondary" className="rounded-full">
                                                    <Share className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm" variant="destructive" onClick={endConsultation} className="rounded-full">
                                                    End Call
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Chat Sidebar */}
                            <div className="lg:col-span-1">
                                <Card className="h-full">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Chat</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 h-full flex flex-col">
                                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                            {chatMessages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`p-2 rounded-lg text-sm ${
                                                        msg.sender === "You" ? "bg-blue-100 ml-4" : "bg-gray-100 mr-4"
                                                    }`}
                                                >
                                                    <div className="font-medium text-xs text-gray-600 mb-1">
                                                        {msg.sender} • {msg.time}
                                                    </div>
                                                    <div>{msg.message}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t">
                                            <div className="flex space-x-2">
                                                <Input
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    placeholder="Type a message..."
                                                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                                                />
                                                <Button size="sm" onClick={sendMessage}>
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
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

                <div className="max-w-6xl mx-auto">
                    {/* Navigation Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            <Button
                                variant={activeTab === "dashboard" ? "default" : "ghost"}
                                onClick={() => setActiveTab("dashboard")}
                                className="rounded-md"
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant={activeTab === "appointments" ? "default" : "ghost"}
                                onClick={() => setActiveTab("appointments")}
                                className="rounded-md"
                            >
                                Appointments
                            </Button>
                        </div>
                    </div>

                    {activeTab === "dashboard" && (
                        <div className="space-y-8">
                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card
                                    className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => setConsultationType("video")}
                                >
                                    <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">Video Consultation</h3>
                                    <p className="text-sm text-gray-600">Face-to-face consultation with your doctor</p>
                                </Card>

                                <Card
                                    className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => setConsultationType("phone")}
                                >
                                    <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">Phone Consultation</h3>
                                    <p className="text-sm text-gray-600">Voice-only consultation for privacy</p>
                                </Card>

                                <Card
                                    className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => setConsultationType("chat")}
                                >
                                    <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">Chat Consultation</h3>
                                    <p className="text-sm text-gray-600">Text-based consultation at your pace</p>
                                </Card>
                            </div>

                            {/* Available Doctors */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Available Healthcare Providers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={doctor.image || "/placeholder.svg"}
                                                        alt={doctor.name}
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{doctor.name}</h3>
                                                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                                        <div className="flex items-center mt-1">
                                                            <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                                                            <span className="text-xs text-gray-500 ml-2">{doctor.nextAvailable}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Start Consultation */}
                            {selectedDoctor && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold">Ready to start consultation?</h3>
                                                <p className="text-sm text-gray-600">
                                                    {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} consultation with{" "}
                                                    {displayDoctors.find((d) => d.id === selectedDoctor)?.name}
                                                </p>
                                            </div>
                                            <Button onClick={startConsultation} className="bg-blue-600 hover:bg-blue-700">
                                                Start Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {activeTab === "appointments" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Appointments</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {displayAppointments.map((appointment) => {
                                            const doctor = displayDoctors.find((d) => d.id === appointment.doctorId)
                                            return (
                                                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={doctor?.image || "/placeholder.svg"}
                                                            alt={doctor?.name}
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold">{doctor?.name}</h3>
                                                            <p className="text-sm text-gray-600">{doctor?.specialty}</p>
                                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                {appointment.date}
                                                                <Clock className="h-4 w-4 ml-3 mr-1" />
                                                                {appointment.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Badge variant="outline">{appointment.type}</Badge>
                                                        <Button size="sm">Join</Button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
