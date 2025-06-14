"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/simple-calendar"
import { cn } from "@/lib/utils"

interface EventItem {
    id: string
    title: string
    description: string
    date: string // ISO date string
    time?: string
    location?: string
    category?: string
    imageUrl?: string
    registrationUrl?: string
    isFeatured?: boolean
}

interface EventsSectionProps {
    title?: string
    subtitle?: string
    description?: string
    events: EventItem[]
    categories?: string[]
    layout?: "grid" | "list" | "calendar"
    showFilters?: boolean
    theme?: {
        primaryColor?: string
        secondaryColor?: string
        backgroundColor?: string
        textColor?: string
    }
}

export function EventsSection({
                                  title = "Upcoming Events",
                                  subtitle = "Join Us",
                                  description = "Check out our upcoming events and register to attend.",
                                  events = [],
                                  categories = [],
                                  layout = "grid",
                                  showFilters = true,
                                  theme = {},
                              }: EventsSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

    // Extract unique categories if not provided
    const uniqueCategories =
        categories.length > 0
            ? ["all", ...categories]
            : [
                "all",
                ...Array.from(new Set(events.filter((event) => event.category).map((event) => event.category as string))),
            ]

    // Filter events by selected category and date
    const filteredEvents = events.filter((event) => {
        const categoryMatch = selectedCategory === "all" || event.category === selectedCategory
        const dateMatch = !selectedDate || new Date(event.date).toDateString() === selectedDate.toDateString()
        return categoryMatch && dateMatch
    })

    // Sort events by date
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    // Get all dates with events for calendar highlighting
    const eventDates = events.map((event) => new Date(event.date))

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    {subtitle && (
                        <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: theme.primaryColor }}>
                            {subtitle}
                        </p>
                    )}
                    {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                    {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            {/* Category Filter */}
                            {uniqueCategories.length > 1 && (
                                <Tabs defaultValue="all" className="w-full md:w-auto">
                                    <TabsList className="bg-gray-100">
                                        {uniqueCategories.map((category) => (
                                            <TabsTrigger
                                                key={category}
                                                value={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className="capitalize"
                                            >
                                                {category}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                            )}

                            {/* Calendar Filter */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {selectedDate ? formatDate(selectedDate.toISOString()) : "Filter by Date"}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Select Date</h3>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            className="rounded-md border"
                                            modifiers={{
                                                hasEvent: (date) =>
                                                    eventDates.some((eventDate) => eventDate.toDateString() === date.toDateString()),
                                            }}
                                            modifiersStyles={{
                                                hasEvent: {
                                                    fontWeight: "bold",
                                                    backgroundColor: "#f0f9ff",
                                                    borderColor: "#bae6fd",
                                                },
                                            }}
                                        />
                                        <div className="flex justify-between">
                                            <Button variant="outline" onClick={() => setSelectedDate(undefined)}>
                                                Clear
                                            </Button>
                                            <Button onClick={() => {}}>Apply</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )}

                {/* Events Display */}
                {layout === "list" ? (
                    <div className="space-y-6">
                        {sortedEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {event.imageUrl && (
                                        <div className="md:w-1/4">
                                            <img
                                                src={event.imageUrl || "/placeholder.svg"}
                                                alt={event.title}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className={cn("p-6 flex flex-col justify-between", event.imageUrl ? "md:w-3/4" : "w-full")}>
                                        <div>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold">{event.title}</h3>
                                                    {event.category && (
                                                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 mt-2">
                              {event.category}
                            </span>
                                                    )}
                                                </div>

                                                <div className="mt-2 md:mt-0 text-right">
                                                    <div className="text-gray-600">{formatDate(event.date)}</div>
                                                    {event.time && <div className="text-gray-500 text-sm">{event.time}</div>}
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4">{event.description}</p>

                                            {event.location && (
                                                <div className="flex items-start mb-4">
                                                    <svg
                                                        className="w-5 h-5 text-gray-500 mr-2 mt-0.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-600">{event.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {event.registrationUrl && (
                                            <div className="mt-4">
                                                <a
                                                    href={event.registrationUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 rounded-md text-white"
                                                    style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                                >
                                                    Register Now
                                                    <svg
                                                        className="w-4 h-4 ml-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : layout === "calendar" ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                                modifiers={{
                                    hasEvent: (date) => eventDates.some((eventDate) => eventDate.toDateString() === date.toDateString()),
                                }}
                                modifiersStyles={{
                                    hasEvent: {
                                        fontWeight: "bold",
                                        backgroundColor: "#f0f9ff",
                                        borderColor: "#bae6fd",
                                    },
                                }}
                            />
                        </div>

                        <div className="border-t border-gray-100 p-6">
                            <h3 className="text-lg font-medium mb-4">
                                {selectedDate ? `Events on ${formatDate(selectedDate.toISOString())}` : "Upcoming Events"}
                            </h3>

                            <div className="space-y-4">
                                {sortedEvents.length > 0 ? (
                                    sortedEvents.map((event) => (
                                        <div key={event.id} className="flex items-start p-3 rounded-md hover:bg-gray-50">
                                            <div className="mr-4 text-center">
                                                <div className="text-sm font-medium text-gray-500">
                                                    {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                                                </div>
                                                <div className="text-xl font-bold">{new Date(event.date).getDate()}</div>
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-medium">{event.title}</h4>
                                                {event.time && <div className="text-sm text-gray-500">{event.time}</div>}
                                                {event.location && <div className="text-sm text-gray-600 mt-1">{event.location}</div>}
                                            </div>

                                            {event.registrationUrl && (
                                                <a
                                                    href={event.registrationUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1 text-sm rounded text-white"
                                                    style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                                >
                                                    Register
                                                </a>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No events found for the selected filters.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sortedEvents.map((event) => (
                            <Dialog key={event.id}>
                                <DialogTrigger asChild>
                                    <div
                                        className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        {event.imageUrl && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={event.imageUrl || "/placeholder.svg"}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-lg font-bold">{event.title}</h3>

                                                {event.isFeatured && (
                                                    <span
                                                        className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white"
                                                        style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                                    >
                            Featured
                          </span>
                                                )}
                                            </div>

                                            <div className="flex items-center text-gray-600 mb-3">
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span>{formatDate(event.date)}</span>
                                            </div>

                                            {event.time && (
                                                <div className="flex items-center text-gray-600 mb-3">
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <span>{event.time}</span>
                                                </div>
                                            )}

                                            {event.location && (
                                                <div className="flex items-center text-gray-600 mb-4">
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span>{event.location}</span>
                                                </div>
                                            )}

                                            <p className="text-gray-600 line-clamp-2">{event.description}</p>
                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-2xl">
                                    {event.imageUrl && (
                                        <div className="rounded-lg overflow-hidden mb-6">
                                            <img
                                                src={event.imageUrl || "/placeholder.svg"}
                                                alt={event.title}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center">
                                            <svg
                                                className="w-5 h-5 mr-2 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>{formatDate(event.date)}</span>
                                        </div>

                                        {event.time && (
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span>{event.time}</span>
                                            </div>
                                        )}

                                        {event.location && (
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <span>{event.location}</span>
                                            </div>
                                        )}

                                        {event.category && (
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                    />
                                                </svg>
                                                <span className="capitalize">{event.category}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-6">{event.description}</p>

                                    {event.registrationUrl && (
                                        <div className="flex justify-end">
                                            <a
                                                href={event.registrationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 rounded-md text-white"
                                                style={{ backgroundColor: theme.primaryColor || "#3b82f6" }}
                                            >
                                                Register for this Event
                                                <svg
                                                    className="w-4 h-4 ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                )}

                {sortedEvents.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your filters or check back later for upcoming events.</p>
                        {selectedCategory !== "all" || selectedDate ? (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSelectedCategory("all")
                                    setSelectedDate(undefined)
                                }}
                            >
                                Clear Filters
                            </Button>
                        ) : null}
                    </div>
                )}
            </div>
        </section>
    )
}

export default EventsSection
