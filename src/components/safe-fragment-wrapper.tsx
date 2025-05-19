import type React from "react"

interface SafeFragmentWrapperProps {
    className?: string
    children: React.ReactNode
    [key: string]: any
}

export default function SafeFragmentWrapper({ className, children, ...props }: SafeFragmentWrapperProps) {
    // If className is provided, render a div to handle it, otherwise render children directly
    if (className) {
        return (
            <div className={className} {...props}>
                {children}
            </div>
        )
    }

    // Render children without the className prop
    return <>{children}</>
}
