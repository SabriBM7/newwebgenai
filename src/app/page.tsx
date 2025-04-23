import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import ExamplesSection from "@/components/examples-section"
import DemoSection from "@/components/demo-section"
import BenefitsSection from "@/components/benefits-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
    // Sample testimonials data
    const testimonials = [
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

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <ExamplesSection />
                <DemoSection />
                <BenefitsSection />
                <TestimonialsSection
                    title="What Our Users Say"
                    subtitle="Don't just take our word for it - hear from people who have created websites with our AI"
                    testimonials={testimonials}
                    backgroundColor="#f5f5f5"
                    textColor="#333333"
                    style="cards"
                />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
