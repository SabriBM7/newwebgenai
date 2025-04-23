import Image from "next/image"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types/index"

interface Testimonial {
    quote: string
    author: string
    role: string
    avatarUrl?: string
}

interface TestimonialsSectionProps {
    title?: string
    subtitle?: string
    testimonials?: Testimonial[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    style?: "cards" | "simple" | "quotes"
    keywords?: string[]
}

export default function TestimonialsSection({
                                                title = "What Our Users Say",
                                                subtitle = "Don't just take our word for it - hear from people who have created websites with our AI",
                                                testimonials,
                                                backgroundColor = "#f9fafb",
                                                textColor = "#000000",
                                                accentColor = "#3b82f6",
                                                textAlignment = "center",
                                                style = "cards",
                                                keywords = [],
                                            }: TestimonialsSectionProps) {
    // Default testimonials if none are provided
    const defaultTestimonials: Testimonial[] = [
        {
            quote:
                "I was able to create a professional website for my business in less than an hour. The AI understood exactly what I needed!",
            author: "Sarah Johnson",
            role: "Small Business Owner",
            avatarUrl: "/placeholder.svg?height=60&width=60",
        },
        {
            quote:
                "As someone with zero technical skills, this platform was a game-changer. My portfolio site looks like it was made by a professional designer.",
            author: "Michael Chen",
            role: "Photographer",
            avatarUrl: "/placeholder.svg?height=60&width=60",
        },
        {
            quote:
                "The AI suggested features I hadn't even thought of. My e-commerce site now converts better than my old professionally-built one.",
            author: "Emma Rodriguez",
            role: "Online Store Owner",
            avatarUrl: "/placeholder.svg?height=60&width=60",
        },
    ]

    // Use provided testimonials or fall back to default testimonials
    const displayTestimonials = testimonials || defaultTestimonials

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-16", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-6",
                                style === "cards" && "bg-white rounded-lg shadow-md",
                                style === "simple" && "border-t-2",
                                style === "quotes" && "relative pl-8",
                            )}
                        >
                            {style === "quotes" && (
                                <div className="absolute top-0 left-0 text-4xl font-serif" style={accentStyle}>
                                    "
                                </div>
                            )}
                            <p className="mb-4 italic">{testimonial.quote}</p>
                            <div className="flex items-center">
                                {testimonial.avatarUrl && (
                                    <div className="mr-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src={testimonial.avatarUrl || "/placeholder.svg"}
                                                alt={testimonial.author}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm opacity-70">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
