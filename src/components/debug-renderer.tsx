import type React from "react"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, componentName }: { error: Error; componentName: string }) {
    return (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
            <h3 className="font-bold">Error rendering {componentName}:</h3>
            <pre className="mt-2 text-xs whitespace-pre-wrap">{error.message}</pre>
        </div>
    )
}

export default function DebugRenderer({
                                          component,
                                          componentName,
                                      }: {
    component: React.ReactNode
    componentName: string
}) {
    return (
        <ErrorBoundary
            FallbackComponent={({ error }) => <ErrorFallback error={error} componentName={componentName} />}
            onError={(error) => {
                console.error(`Error rendering ${componentName}:`, error)
            }}
        >
            {component}
        </ErrorBoundary>
    )
}
