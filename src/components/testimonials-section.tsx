import { Star } from "lucide-react"
import Image from 'next/image'
type TestimonialProps = {
    quote: string
    author: string
    role: string
    avatarUrl: string
    rating?: number
}

export default function TestimonialsSection() {
    const testimonials = [
        {
            quote:
                "I was able to create a professional website for my business in less than an hour. The AI understood exactly what I needed!",
            author: "Sarah Johnson",
            role: "Small Business Owner",
            avatarUrl: "/woman-portrait.png", // Updated to use the actual image
            rating: 5,
        },
        {
            quote:
                "As someone with zero technical skills, this platform was a game-changer. My portfolio site looks like it was made by a professional designer.",
            author: "Michael Chen",
            role: "Photographer",
            avatarUrl: "/thoughtful-man-portrait.png", // Updated to use the actual image
            rating: 5,
        },
        {
            quote:
                "The AI suggested features I hadn't even thought of. My e-commerce site now converts better than my old professionally-built one.",
            author: "Emma Rodriguez",
            role: "Online Store Owner",
            avatarUrl: "/woman-portrait-2.png", // Updated to use the actual image
            rating: 4,
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-black to-purple-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Don't just take our word for it - hear from people who have created websites with our AI
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                {/* Replace the img tag with Next.js Image component */}
                                <Image
                                    src={testimonial.avatarUrl || "/placeholder.svg"}
                                    alt={testimonial.author}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <p className="font-medium text-white">{testimonial.author}</p>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-2">
                        <Image
                            src="/google-logo.png"
                            alt="Google"
                            width={60}
                            height={20}
                            className="h-6 w-auto"
                        />
                        <div className="flex ml-2 mr-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <span className="text-white text-sm">4.8/5 · 1,237 reviews</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
