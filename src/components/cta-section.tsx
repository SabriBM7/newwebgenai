import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
    return (
        <section className="py-20 bg-black relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
                    Ready to create your website with AI?
                </h2>

                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                    Join thousands of users who are building amazing websites without coding skills
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/create">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg">
                            Start Creating Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/examples">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 h-auto text-lg"
                        >
                            View Examples
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
