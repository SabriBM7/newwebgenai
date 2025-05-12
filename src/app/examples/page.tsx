import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ExamplesPage() {
    // Sample example websites
    const examples = [
        {
            id: 1,
            title: "Restaurant Website",
            description: "A modern website for a high-end restaurant with online reservations",
            image: "/examples/restaurant-website.png", // Updated to use real image
            tags: ["Restaurant", "Food", "Reservations"],
        },
        {
            id: 2,
            title: "Portfolio Website",
            description: "Professional portfolio for a photographer showcasing their work",
            image: "/examples/portfolio-website.png", // Updated to use real image
            tags: ["Portfolio", "Photography", "Creative"],
        },
        {
            id: 3,
            title: "E-commerce Store",
            description: "Online store selling handmade crafts with shopping cart functionality",
            image: "/examples/ecommerce-website.png", // Updated to use real image
            tags: ["E-commerce", "Shopping", "Retail"],
        },
        {
            id: 4,
            title: "Fitness Studio",
            description: "Website for a yoga studio with class schedules and online booking",
            image: "/examples/fitness-studio.png", // Updated to use real image
            tags: ["Fitness", "Yoga", "Health"],
        },
        {
            id: 5,
            title: "Tech Startup",
            description: "Modern landing page for a SaaS product with feature highlights",
            image: "/examples/startup.png", // Updated to use real image
            tags: ["SaaS", "Technology", "Startup"],
        },
        {
            id: 6,
            title: "Law Firm",
            description: "Professional website for a law firm with practice areas and attorney profiles",
            image: "/examples/law-firm.png", // Updated to use real image
            tags: ["Legal", "Professional", "Services"],
        },
    ]

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-purple-950">
            <Navbar />
            <main className="flex-1 pt-20">
                <div className="container mx-auto py-12">
                    <div className="text-center mb-12 animate-fadeIn">
                        <h1 className="text-4xl font-bold mb-4 text-white">Example Websites</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Browse through these examples of websites created with our AI generator. Get inspired and see what's
                            possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {examples.map((example, index) => (
                            <Card
                                key={example.id}
                                className="overflow-hidden border-gray-800 bg-black/40 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 animate-zoomIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="aspect-video relative">
                                    <Image
                                        src={example.image || "/placeholder.svg"}
                                        alt={example.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-white">{example.title}</h3>
                                    <p className="text-gray-400 mb-4">{example.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {example.tags.map((tag) => (
                                            <span key={tag} className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between">
                                        <Link
                                            href={`/examples/${example.id}`}
                                            className="text-primary hover:text-primary/80 text-sm font-medium"
                                        >
                                            View Details
                                        </Link>
                                        <Link href="/create" className="text-primary hover:text-primary/80 text-sm font-medium">
                                            Create Similar
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                            <Link href="/create">Start Creating Your Own</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
