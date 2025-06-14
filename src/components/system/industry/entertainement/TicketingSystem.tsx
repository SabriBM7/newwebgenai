"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, CalendarIcon, Clock, Star, Info } from "lucide-react"

interface EventDate {
    id: string
    date: Date
    startTime: string
    endTime: string
    available: boolean
}

interface Event {
    id: string
    title: string
    type: string
    venue: string
    location: string
    image: string
    dates: EventDate[]
    minPrice: number
    maxPrice: number
    featured?: boolean
    rating?: number
    tags?: string[]
}

interface TicketingSystemProps {
    title?: string
    description?: string
    events?: Event[]
    categories?: string[]
    onPurchaseComplete?: (eventId: string, seats: number, totalPrice: number) => void
}

export function TicketingSystem({
                                    title = "Event Tickets",
                                    description = "Find and book tickets for upcoming events",
                                    events = defaultEvents,
                                    categories = ["All Events", "Concerts", "Theater", "Sports", "Festivals"],
                                    onPurchaseComplete,
                                }: TicketingSystemProps) {
    const [activeCategory, setActiveCategory] = useState("All Events")
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [selectedDate, setSelectedDate] = useState<EventDate | null>(null)
    const [ticketQuantity, setTicketQuantity] = useState(1)
    const [ticketClass, setTicketClass] = useState("standard")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

    const filteredEvents =
        activeCategory === "All Events"
            ? events
            : events.filter((event) => event.type.toLowerCase() === activeCategory.toLowerCase().replace(" ", ""))

    const handleEventSelect = (event: Event) => {
        setSelectedEvent(event)
        setSelectedDate(null)
        setIsDialogOpen(true)
    }

    const handleDateSelect = (date: EventDate) => {
        setSelectedDate(date)
    }

    const handleProceedToCheckout = () => {
        setIsDialogOpen(false)
        setIsCheckoutOpen(true)
    }

    const handleCompletePurchase = () => {
        if (selectedEvent && selectedDate) {
            const basePrice =
                ticketClass === "premium"
                    ? selectedEvent.maxPrice
                    : ticketClass === "standard"
                        ? (selectedEvent.minPrice + selectedEvent.maxPrice) / 2
                        : selectedEvent.minPrice

            const totalPrice = basePrice * ticketQuantity

            onPurchaseComplete && onPurchaseComplete(selectedEvent.id, ticketQuantity, totalPrice)

            setIsCheckoutOpen(false)
            setSelectedEvent(null)
            setSelectedDate(null)
            setTicketQuantity(1)
            setTicketClass("standard")
        }
    }

    const getTicketPrice = () => {
        if (!selectedEvent) return 0

        if (ticketClass === "premium") return selectedEvent.maxPrice
        if (ticketClass === "standard") return (selectedEvent.minPrice + selectedEvent.maxPrice) / 2
        return selectedEvent.minPrice
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <Tabs defaultValue="All Events" className="mb-8">
                    <TabsList className="flex justify-center mb-8 flex-wrap">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                onClick={() => setActiveCategory(category)}
                                className="px-4 py-2"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card
                            key={event.id}
                            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                                event.featured ? "border-2 border-blue-500" : ""
                            }`}
                        >
                            <div className="relative h-48">
                                <img
                                    src={event.image || "/placeholder.svg?height=400&width=600&query=concert+event"}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                {event.featured && <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>}
                                {event.tags && event.tags.length > 0 && (
                                    <Badge className="absolute top-2 left-2">{event.tags[0]}</Badge>
                                )}
                            </div>
                            <CardContent className="p-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                    {event.rating && (
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                            <span className="text-sm font-medium">{event.rating}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>
                      {event.venue}, {event.location}
                    </span>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>
                      {event.dates.length} date{event.dates.length > 1 ? "s" : ""} available
                    </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Info className="h-4 w-4 mr-2" />
                                        <span>
                      ${event.minPrice} - ${event.maxPrice}
                    </span>
                                    </div>
                                </div>

                                <Button className="w-full" onClick={() => handleEventSelect(event)}>
                                    View Tickets
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Event Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{selectedEvent?.title}</DialogTitle>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-6">
                            <div className="relative h-48 rounded-md overflow-hidden">
                                <img
                                    src={selectedEvent.image || "/placeholder.svg?height=400&width=600&query=concert+event"}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>
                    {selectedEvent.venue}, {selectedEvent.location}
                  </span>
                                </div>

                                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedEvent.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Select Date</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {selectedEvent.dates.map((date) => (
                                        <div
                                            key={date.id}
                                            className={`p-3 border rounded-md cursor-pointer ${
                                                selectedDate?.id === date.id
                                                    ? "border-blue-500 bg-blue-50"
                                                    : date.available
                                                        ? "hover:border-blue-200"
                                                        : "opacity-50 cursor-not-allowed"
                                            }`}
                                            onClick={() => date.available && handleDateSelect(date)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                                    <span>
                            {date.date.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}
                          </span>
                                                </div>
                                                <Badge variant={date.available ? "outline" : "secondary"}>
                                                    {date.available ? "Available" : "Sold Out"}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>
                          {date.startTime} - {date.endTime}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Ticket Quantity</h4>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)}
                                        disabled={ticketQuantity <= 1}
                                    >
                                        -
                                    </Button>
                                    <span className="mx-4 font-medium">{ticketQuantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setTicketQuantity(ticketQuantity + 1)}
                                        disabled={ticketQuantity >= 10}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Ticket Class</h4>
                                <RadioGroup value={ticketClass} onValueChange={setTicketClass}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="economy" id="economy" />
                                        <Label htmlFor="economy">Economy (${selectedEvent.minPrice})</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="standard" id="standard" />
                                        <Label htmlFor="standard">
                                            Standard (${(selectedEvent.minPrice + selectedEvent.maxPrice) / 2})
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="premium" id="premium" />
                                        <Label htmlFor="premium">Premium (${selectedEvent.maxPrice})</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <DialogFooter>
                                <Button onClick={handleProceedToCheckout} disabled={!selectedDate}>
                                    Proceed to Checkout
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Checkout Dialog */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                    </DialogHeader>

                    {selectedEvent && selectedDate && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h4 className="font-medium mb-2">{selectedEvent.title}</h4>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>
                      {selectedDate.date.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                      })}
                    </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>
                      {selectedDate.startTime} - {selectedDate.endTime}
                    </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>
                      {selectedEvent.venue}, {selectedEvent.location}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your full name" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Your email address" />
                                </div>
                                <div>
                                    <Label htmlFor="card">Card Number</Label>
                                    <Input id="card" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Ticket Price ({ticketClass})</span>
                                    <span>${getTicketPrice()}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Quantity</span>
                                    <span>x {ticketQuantity}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm text-gray-500">
                                    <span>Service Fee</span>
                                    <span>${(getTicketPrice() * ticketQuantity * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-4">
                                    <span>Total</span>
                                    <span>${(getTicketPrice() * ticketQuantity * 1.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button onClick={handleCompletePurchase}>Complete Purchase</Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}

const defaultEvents: Event[] = [
    {
        id: "1",
        title: "Summer Music Festival",
        type: "concert",
        venue: "Riverside Park",
        location: "Downtown",
        image: "/placeholder.svg?height=400&width=600",
        dates: [
            { id: "date1", date: new Date(2023, 6, 15), startTime: "4:00 PM", endTime: "11:00 PM", available: true },
            { id: "date2", date: new Date(2023, 6, 16), startTime: "4:00 PM", endTime: "11:00 PM", available: true },
            { id: "date3", date: new Date(2023, 6, 17), startTime: "4:00 PM", endTime: "11:00 PM", available: false },
        ],
        minPrice: 75,
        maxPrice: 250,
        featured: true,
        rating: 4.8,
        tags: ["Music", "Festival", "Outdoor"],
    },
    {
        id: "2",
        title: "Hamilton: The Musical",
        type: "theater",
        venue: "Grand Theater",
        location: "Theater District",
        image: "/placeholder.svg?height=400&width=600",
        dates: [
            { id: "date1", date: new Date(2023, 7, 5), startTime: "7:30 PM", endTime: "10:00 PM", available: true },
            { id: "date2", date: new Date(2023, 7, 6), startTime: "7:30 PM", endTime: "10:00 PM", available: true },
            { id: "date3", date: new Date(2023, 7, 7), startTime: "2:00 PM", endTime: "4:30 PM", available: true },
            { id: "date4", date: new Date(2023, 7, 7), startTime: "8:00 PM", endTime: "10:30 PM", available: false },
        ],
        minPrice: 120,
        maxPrice: 350,
        featured: true,
        rating: 4.9,
        tags: ["Theater", "Musical", "Broadway"],
    },
    {
        id: "3",
        title: "Championship Basketball Game",
        type: "sports",
        venue: "City Arena",
        location: "Sports Complex",
        image: "/placeholder.svg?height=400&width=600",
        dates: [{ id: "date1", date: new Date(2023, 8, 10), startTime: "7:00 PM", endTime: "9:30 PM", available: true }],
        minPrice: 60,
        maxPrice: 200,
        featured: false,
        rating: 4.7,
        tags: ["Sports", "Basketball", "Championship"],
    },
    {
        id: "4",
        title: "Food & Wine Festival",
        type: "festivals",
        venue: "Community Park",
        location: "Westside",
        image: "/placeholder.svg?height=400&width=600",
        dates: [
            { id: "date1", date: new Date(2023, 9, 22), startTime: "12:00 PM", endTime: "8:00 PM", available: true },
            { id: "date2", date: new Date(2023, 9, 23), startTime: "12:00 PM", endTime: "8:00 PM", available: true },
        ],
        minPrice: 45,
        maxPrice: 120,
        featured: false,
        rating: 4.6,
        tags: ["Food", "Wine", "Festival"],
    },
    {
        id: "5",
        title: "Rock Band Reunion Tour",
        type: "concert",
        venue: "Stadium",
        location: "North End",
        image: "/placeholder.svg?height=400&width=600",
        dates: [{ id: "date1", date: new Date(2023, 10, 15), startTime: "8:00 PM", endTime: "11:00 PM", available: true }],
        minPrice: 90,
        maxPrice: 300,
        featured: false,
        rating: 4.8,
        tags: ["Music", "Rock", "Concert"],
    },
    {
        id: "6",
        title: "Shakespeare in the Park",
        type: "theater",
        venue: "Central Park Amphitheater",
        location: "Midtown",
        image: "/placeholder.svg?height=400&width=600",
        dates: [
            { id: "date1", date: new Date(2023, 7, 25), startTime: "7:00 PM", endTime: "9:30 PM", available: true },
            { id: "date2", date: new Date(2023, 7, 26), startTime: "7:00 PM", endTime: "9:30 PM", available: true },
            { id: "date3", date: new Date(2023, 7, 27), startTime: "7:00 PM", endTime: "9:30 PM", available: true },
        ],
        minPrice: 30,
        maxPrice: 75,
        featured: false,
        rating: 4.5,
        tags: ["Theater", "Shakespeare", "Outdoor"],
    },
]
