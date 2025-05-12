import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturesNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Feature Not Found</h2>
            <p className="text-xl text-gray-300 max-w-md mb-8">
                The feature you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/features">Back to Features</Link>
            </Button>
        </div>
    )
}
