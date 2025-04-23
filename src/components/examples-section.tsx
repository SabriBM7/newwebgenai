import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ExamplesSection() {
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
    ]

    return (
        <section id="examples" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Example Websites</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                        Browse through these examples of websites created with our AI generator. Get inspired and see what's
                        possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {examples.map((example) => (
                        <div
                            key={example.id}
                            className="border rounded-lg overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-video relative">
                                <img
                                    src={example.image || "/placeholder.svg"}
                                    alt={example.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
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
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button asChild>
                        <Link href="/examples">View All Examples</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
