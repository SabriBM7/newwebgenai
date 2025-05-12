import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ExamplesPage() {
    // Sample example websites
    const examples = [
        {
            id: 1,
            title: "Restaurant Website",
            description: "A modern website for a high-end restaurant with online reservations",
            image: "/placeholder.svg?height=300&width=500&text=Restaurant+Website",
            tags: ["Restaurant", "Food", "Reservations"],
        },
        {
            id: 2,
            title: "Portfolio Website",
            description: "Professional portfolio for a photographer showcasing their work",
            image: "/placeholder.svg?height=300&width=500&text=Portfolio+Website",
            tags: ["Portfolio", "Photography", "Creative"],
        },
        {
            id: 3,
            title: "E-commerce Store",
            description: "Online store selling handmade crafts with shopping cart functionality",
            image: "/placeholder.svg?height=300&width=500&text=E-commerce+Website",
            tags: ["E-commerce", "Shopping", "Retail"],
        },
        {
            id: 4,
            title: "Fitness Studio",
            description: "Website for a yoga studio with class schedules and online booking",
            image: "/placeholder.svg?height=300&width=500&text=Fitness+Website",
            tags: ["Fitness", "Yoga", "Health"],
        },
        {
            id: 5,
            title: "Tech Startup",
            description: "Modern landing page for a SaaS product with feature highlights",
            image: "/placeholder.svg?height=300&width=500&text=Tech+Startup+Website",
            tags: ["SaaS", "Technology", "Startup"],
        },
        {
            id: 6,
            title: "Law Firm",
            description: "Professional website for a law firm with practice areas and attorney profiles",
            image: "/placeholder.svg?height=300&width=500&text=Law+Firm+Website",
            tags: ["Legal", "Professional", "Services"],
        },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold mb-2">Example Websites</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Browse through these examples of websites created with our AI generator. Get inspired and see what's
                            possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {examples.map((example) => (
                            <Card key={example.id} className="overflow-hidden">
                                <div className="aspect-video relative">
                                    <img
                                        src={example.image || "/placeholder.svg"}
                                        alt={example.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                                    <p className="text-muted-foreground mb-4">{example.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {example.tags.map((tag) => (
                                            <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
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

                    <div className="mt-12 text-center">
                        <Button asChild>
                            <Link href="/create">Start Creating Your Own</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
