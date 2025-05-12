import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Sample example websites data
const examples = [
    {
        id: 1,
        title: "Restaurant Website",
        description: "A modern website for a high-end restaurant with online reservations",
        image: "/placeholder.svg?height=600&width=1200&text=Restaurant+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=Restaurant+Website+Full+Preview",
        tags: ["Restaurant", "Food", "Reservations"],
        features: [
            "Online reservation system",
            "Menu showcase with beautiful imagery",
            "Chef profiles and restaurant story",
            "Contact form and location map",
            "Mobile-responsive design",
        ],
        demoUrl: "#",
    },
    {
        id: 2,
        title: "Portfolio Website",
        description: "Professional portfolio for a photographer showcasing their work",
        image: "/placeholder.svg?height=600&width=1200&text=Portfolio+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=Portfolio+Website+Full+Preview",
        tags: ["Portfolio", "Photography", "Creative"],
        features: [
            "Image gallery with lightbox",
            "About me section with biography",
            "Contact form for inquiries",
            "Service packages and pricing",
            "Testimonials from clients",
        ],
        demoUrl: "#",
    },
    {
        id: 3,
        title: "E-commerce Store",
        description: "Online store selling handmade crafts with shopping cart functionality",
        image: "/placeholder.svg?height=600&width=1200&text=E-commerce+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=E-commerce+Website+Full+Preview",
        tags: ["E-commerce", "Shopping", "Retail"],
        features: [
            "Product catalog with categories",
            "Shopping cart and checkout process",
            "Customer reviews and ratings",
            "Secure payment integration",
            "Order tracking and history",
        ],
        demoUrl: "#",
    },
    {
        id: 4,
        title: "Fitness Studio",
        description: "Website for a yoga studio with class schedules and online booking",
        image: "/placeholder.svg?height=600&width=1200&text=Fitness+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=Fitness+Website+Full+Preview",
        tags: ["Fitness", "Yoga", "Health"],
        features: [
            "Class schedule and booking system",
            "Instructor profiles and specialties",
            "Membership options and pricing",
            "Blog with fitness tips and advice",
            "Virtual class integration",
        ],
        demoUrl: "#",
    },
    {
        id: 5,
        title: "Tech Startup",
        description: "Modern landing page for a SaaS product with feature highlights",
        image: "/placeholder.svg?height=600&width=1200&text=Tech+Startup+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=Tech+Startup+Website+Full+Preview",
        tags: ["SaaS", "Technology", "Startup"],
        features: [
            "Product feature showcase",
            "Pricing plans and comparison",
            "Customer testimonials",
            "Integration partners",
            "Demo request form",
        ],
        demoUrl: "#",
    },
    {
        id: 6,
        title: "Law Firm",
        description: "Professional website for a law firm with practice areas and attorney profiles",
        image: "/placeholder.svg?height=600&width=1200&text=Law+Firm+Website+Preview",
        detailImage: "/placeholder.svg?height=800&width=1200&text=Law+Firm+Website+Full+Preview",
        tags: ["Legal", "Professional", "Services"],
        features: [
            "Practice area descriptions",
            "Attorney profiles and credentials",
            "Case studies and results",
            "Client testimonials",
            "Consultation booking system",
        ],
        demoUrl: "#",
    },
]

export default function ExampleDetailPage({ params }: { params: { id: string } }) {
    const exampleId = Number.parseInt(params.id)
    const example = examples.find((ex) => ex.id === exampleId)

    if (!example) {
        notFound()
    }

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-purple-950">
            <Navbar />
            <main className="flex-1 pt-20">
                <div className="container mx-auto py-12">
                    <div className="mb-8">
                        <Link href="/examples" className="text-primary hover:text-primary/80 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back to Examples
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="rounded-lg overflow-hidden border border-gray-800 mb-6">
                                <Image
                                    src={example.detailImage || "/placeholder.svg"}
                                    alt={example.title}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-6">
                                <h1 className="text-3xl font-bold mb-4 text-white">{example.title}</h1>
                                <p className="text-gray-300 mb-6">{example.description}</p>

                                <h2 className="text-xl font-semibold mb-4 text-white">Features</h2>
                                <ul className="space-y-2 mb-6">
                                    {example.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary mt-1"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {example.tags.map((tag) => (
                                        <span key={tag} className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sticky top-24">
                                <h2 className="text-xl font-semibold mb-4 text-white">Get Started</h2>
                                <p className="text-gray-300 mb-6">
                                    Like this example? Create your own website based on this template or start from scratch.
                                </p>

                                <div className="space-y-4">
                                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                                        <Link href="/create">Create Similar Website</Link>
                                    </Button>

                                    <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                                        <Link href={example.demoUrl} target="_blank">
                                            View Live Demo
                                        </Link>
                                    </Button>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-800">
                                    <h3 className="text-lg font-medium mb-4 text-white">Need Help?</h3>
                                    <p className="text-gray-300 mb-4">
                                        Our AI assistant can help you customize this template to fit your needs.
                                    </p>
                                    <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                                        <Link href="/chat">Chat with AI Assistant</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-8 text-white">Other Examples You Might Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {examples
                                .filter((ex) => ex.id !== example.id)
                                .slice(0, 3)
                                .map((relatedExample) => (
                                    <Card
                                        key={relatedExample.id}
                                        className="overflow-hidden border-gray-800 bg-black/40 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
                                    >
                                        <div className="aspect-video relative">
                                            <Image
                                                src={relatedExample.image || "/placeholder.svg"}
                                                alt={relatedExample.title}
                                                width={500}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-white">{relatedExample.title}</h3>
                                            <p className="text-gray-400 mb-4">{relatedExample.description}</p>
                                            <div className="flex justify-between">
                                                <Link
                                                    href={`/examples/${relatedExample.id}`}
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
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
