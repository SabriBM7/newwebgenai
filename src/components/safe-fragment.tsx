import type React from "react"

/**
 * A wrapper component that safely handles className props
 * by rendering a div with the className if provided,
 * or just rendering the children if no className is provided
 */
export function SafeFragment({
                                 className,
                                 children,
                                 ...props
                             }: {
    className?: string
    children: React.ReactNode
    [key: string]: any
}) {
    // If className is provided, render a div with that className
    if (className) {
        return (
            <div className={className} {...props}>
                {children}
            </div>
        )
    }

    // Otherwise, just render the children
    return <>{children}</>
}
