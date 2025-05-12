import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ExampleNotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-purple-950">
            <Navbar />
            <main className="flex-1 pt-20">
                <div className="container mx-auto py-12">
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <h1 className="text-4xl font-bold mb-4 text-white">Example Not Found</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mb-8">
                            Sorry, we couldn't find the example website you're looking for. It may have been removed or the URL might
                            be incorrect.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                                <Link href="/examples">Browse All Examples</Link>
                            </Button>
                            <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
