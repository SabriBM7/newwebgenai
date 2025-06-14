"use client"

import React, { createContext, useContext } from "react"
import { cn } from "@/lib/utils"

type RadioGroupContextValue = {
    value: string
    onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

export interface SimpleRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
    onValueChange: (value: string) => void
    defaultValue?: string
    className?: string
}

export const SimpleRadioGroup = React.forwardRef<HTMLDivElement, SimpleRadioGroupProps>(
    ({ className, value, onValueChange, ...props }, ref) => {
        return (
            <RadioGroupContext.Provider value={{ value, onValueChange }}>
                <div ref={ref} className={cn("space-y-2", className)} {...props} />
            </RadioGroupContext.Provider>
        )
    },
)
SimpleRadioGroup.displayName = "SimpleRadioGroup"

export interface SimpleRadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
    id?: string
    disabled?: boolean
    className?: string
}

export const SimpleRadioGroupItem = React.forwardRef<HTMLInputElement, SimpleRadioGroupItemProps>(
    ({ className, value, id, disabled = false, ...props }, ref) => {
        const context = useContext(RadioGroupContext)
        if (!context) {
            throw new Error("SimpleRadioGroupItem must be used within a SimpleRadioGroup")
        }

        const { value: groupValue, onValueChange } = context

        return (
            <input
                type="radio"
                ref={ref}
                id={id}
                value={value}
                checked={value === groupValue}
                disabled={disabled}
                onChange={() => onValueChange(value)}
                className={cn(
                    "h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50",
                    className,
                )}
                {...props}
            />
        )
    },
)
SimpleRadioGroupItem.displayName = "SimpleRadioGroupItem"
