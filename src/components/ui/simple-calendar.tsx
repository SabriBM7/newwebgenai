"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
    mode?: "single" | "multiple" | "range"
    selected?: Date | Date[] | { from: Date; to: Date } | undefined
    onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void
    className?: string
    modifiers?: {
        [key: string]: (date: Date) => boolean
    }
    modifiersStyles?: {
        [key: string]: React.CSSProperties
    }
    disabled?: (date: Date) => boolean
}

export function Calendar({
                             mode = "single",
                             selected,
                             onSelect,
                             className,
                             modifiers = {},
                             modifiersStyles = {},
                             disabled,
                         }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date())

    const today = new Date()
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Get first day of month and number of days
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    // Generate calendar days
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day))
    }

    const isSelected = (date: Date) => {
        if (!selected) return false

        if (mode === "single") {
            return selected instanceof Date && date.toDateString() === selected.toDateString()
        }

        if (mode === "multiple") {
            return Array.isArray(selected) && selected.some((d) => d.toDateString() === date.toDateString())
        }

        if (mode === "range") {
            const range = selected as { from: Date; to: Date }
            if (!range.from) return false
            if (!range.to) return date.toDateString() === range.from.toDateString()
            return date >= range.from && date <= range.to
        }

        return false
    }

    const isToday = (date: Date) => {
        return date.toDateString() === today.toDateString()
    }

    const isDisabled = (date: Date) => {
        return disabled ? disabled(date) : false
    }

    const handleDateClick = (date: Date) => {
        if (isDisabled(date) || !onSelect) return

        if (mode === "single") {
            onSelect(date)
        } else if (mode === "multiple") {
            const currentSelected = (selected as Date[]) || []
            const isAlreadySelected = currentSelected.some((d) => d.toDateString() === date.toDateString())

            if (isAlreadySelected) {
                onSelect(currentSelected.filter((d) => d.toDateString() !== date.toDateString()))
            } else {
                onSelect([...currentSelected, date])
            }
        } else if (mode === "range") {
            const range = (selected as { from: Date; to: Date }) || { from: null, to: null }

            if (!range.from || (range.from && range.to)) {
                onSelect({ from: date, to: null })
            } else if (range.from && !range.to) {
                if (date < range.from) {
                    onSelect({ from: date, to: range.from })
                } else {
                    onSelect({ from: range.from, to: date })
                }
            }
        }
    }

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev)
            if (direction === "prev") {
                newMonth.setMonth(prev.getMonth() - 1)
            } else {
                newMonth.setMonth(prev.getMonth() + 1)
            }
            return newMonth
        })
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className={cn("p-3", className)}>
            {/* Header */}
            <div className="flex justify-center pt-1 relative items-center mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                    onClick={() => navigateMonth("prev")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="text-sm font-medium">
                    {monthNames[month]} {year}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                    onClick={() => navigateMonth("next")}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
                {dayNames.map((day) => (
                    <div key={day} className="h-9 w-9 text-center text-sm font-normal text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={index} className="h-9 w-9" />
                    }

                    const selected = isSelected(date)
                    const today = isToday(date)
                    const disabled = isDisabled(date)

                    // Apply custom modifiers
                    let customStyle = {}
                    for (const [modifierName, modifierFn] of Object.entries(modifiers)) {
                        if (modifierFn(date) && modifiersStyles[modifierName]) {
                            customStyle = { ...customStyle, ...modifiersStyles[modifierName] }
                        }
                    }

                    return (
                        <Button
                            key={index}
                            variant="ghost"
                            className={cn(
                                "h-9 w-9 p-0 font-normal",
                                selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                                today && !selected && "bg-accent text-accent-foreground",
                                disabled && "text-muted-foreground opacity-50 cursor-not-allowed",
                            )}
                            style={customStyle}
                            onClick={() => handleDateClick(date)}
                            disabled={disabled}
                        >
                            {date.getDate()}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
