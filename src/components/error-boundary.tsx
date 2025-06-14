"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
    children?: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                this.props.fallback || (
                    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
                        <details className="text-sm text-red-700">
                            <summary className="cursor-pointer">Error details</summary>
                            <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto text-xs">{this.state.error?.toString()}</pre>
                        </details>
                    </div>
                )
            )
        }

        return this.props.children
    }
}
