import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                <h2 className="mt-4 text-xl font-semibold">Loading AI Website Generator...</h2>
                <p className="mt-2 text-gray-600">Preparing your Ollama-powered website generator</p>
            </div>
        </div>
    )
}
