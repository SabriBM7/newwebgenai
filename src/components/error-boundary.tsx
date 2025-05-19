"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode | ((error: Error) => ReactNode)
    onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Error caught by ErrorBoundary:", error, errorInfo)
        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (typeof this.props.fallback === "function" && this.state.error) {
                return this.props.fallback(this.state.error)
            }

            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
                    <h3 className="font-bold">Something went wrong</h3>
                    {this.state.error && <pre className="mt-2 text-xs whitespace-pre-wrap">{this.state.error.message}</pre>}
                </div>
            )
        }

        return this.props.children
    }
}
