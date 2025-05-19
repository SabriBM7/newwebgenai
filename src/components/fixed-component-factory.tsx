"use client"

import { componentMap } from "./component-map"
import { adaptProps } from "@/lib/prop-adapter"

export default function FixedComponentFactory({
                                                  component,
                                                  variant,
                                                  props,
                                              }: {
    component: string
    variant: string
    props: any
}) {
    // Add error handling
    try {
        // Get the component map for this component type
        const componentVariants = componentMap[component as keyof typeof componentMap]

        if (!componentVariants) {
            console.warn(`Unknown component type: ${component}`)
            return (
                <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                    Unknown component type: {component} {variant ? `(${variant})` : ""}
                </div>
            )
        }

        // Get the specific variant or default
        const Component = componentVariants[variant as keyof typeof componentVariants] || componentVariants.default

        if (!Component) {
            console.warn(`Unknown variant: ${variant} for component type: ${component}`)
            return (
                <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                    Unknown variant: {variant} for component type: {component}
                </div>
            )
        }

        // Adapt props to handle different naming conventions
        const adaptedProps = adaptProps(props, component)

        // Render the component with adapted props
        return <Component {...adaptedProps} />
    } catch (error) {
        console.error(`Error rendering component ${component} with variant ${variant}:`, error)
        return (
            <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                Error rendering component: {component} {variant ? `(${variant})` : ""}
                <pre className="mt-2 text-xs">{error instanceof Error ? error.message : String(error)}</pre>
            </div>
        )
    }
}
