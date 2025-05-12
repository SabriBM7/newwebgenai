import CorporateHeader from "@/components/headers/corporate-header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { BarChart3, Shield, Zap, Globe, Clock, Users } from "lucide-react"

export default function EnterprisePage() {
    // Header props
    const headerProps = {
        logo: "TechSolutions",
        backgroundColor: "#0f172a",
        textColor: "#ffffff",
        menu: [
            { label: "Solutions", link: "#solutions" },
            { label: "Industries", link: "#industries" },
            { label: "Case Studies", link: "#case-studies" },
            { label: "About", link: "#about" },
            { label: "Contact", link: "#contact" },
        ],
        animation: "fade-in" as const,
        sticky: true,
        keywords: ["enterprise", "business", "transformation", "solutions", "professional"],
    }

    // Hero props
    const heroProps = {
        title: "Enterprise Solutions for Business Transformation",
        subtitle: "Driving Innovation and Growth",
        description:
            "We provide cutting-edge digital solutions tailored to enterprise needs, helping you navigate digital transformation with confidence and precision.",
        backgroundImage: "/placeholder.svg?height=1080&width=1920&text=Enterprise+Background",
        overlayColor: "rgba(15, 23, 42, 0.7)",
        textColor: "#ffffff",
        fontFamily: "Inter, sans-serif",
        buttons: [
            { label: "Explore Solutions", link: "#solutions", type: "primary" as const },
            { label: "Schedule Consultation", link: "#contact", type: "secondary" as const },
        ],
        imageUrl: "/placeholder.svg?height=600&width=600&text=Enterprise+Solutions",
        imageAlt: "Enterprise Solutions",
        buttonStyle: "flat" as const,
        textAlignment: "left" as const,
        keywords: ["enterprise", "business", "transformation", "solutions", "innovation", "growth"],
    }

    // Features props
    const featuresProps = {
        title: "Enterprise-Grade Solutions",
        subtitle: "Comprehensive tools designed for business transformation",
        features: [
            {
                title: "Data Analytics",
                description: "Transform your data into actionable insights with our advanced analytics platform.",
                icon: BarChart3,
                iconColor: "#3b82f6",
            },
            {
                title: "Enterprise Security",
                description: "Protect your business with our comprehensive security solutions.",
                icon: Shield,
                iconColor: "#3b82f6",
            },
            {
                title: "Digital Transformation",
                description: "Modernize your business processes and embrace digital innovation.",
                icon: Zap,
                iconColor: "#3b82f6",
            },
            {
                title: "Global Reach",
                description: "Expand your business globally with our international solutions.",
                icon: Globe,
                iconColor: "#3b82f6",
            },
            {
                title: "24/7 Support",
                description: "Round-the-clock support to ensure your business operations run smoothly.",
                icon: Clock,
                iconColor: "#3b82f6",
            },
            {
                title: "Team Collaboration",
                description: "Enhance team productivity with our collaboration tools.",
                icon: Users,
                iconColor: "#3b82f6",
            },
        ],
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        accentColor: "#3b82f6",
        columns: 3,
        keywords: ["data", "insights", "decisions", "strategy", "enterprise", "business", "transformation"],
    }

    // Testimonials props
    const testimonialsProps = {
        title: "What Our Enterprise Clients Say",
        subtitle: "Trusted by leading organizations worldwide",
        testimonials: [
            {
                quote:
                    "TechSolutions transformed our business operations, resulting in a 30% increase in efficiency and significant cost savings.",
                author: "Sarah Johnson",
                role: "CIO, Global Enterprises Inc.",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=SJ",
            },
            {
                quote:
                    "The enterprise security solutions provided by TechSolutions have been instrumental in protecting our sensitive data.",
                author: "Michael Chen",
                role: "CISO, Financial Services Group",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=MC",
            },
            {
                quote:
                    "Their digital transformation expertise helped us modernize our legacy systems and stay ahead of the competition.",
                author: "Emma Rodriguez",
                role: "COO, Manufacturing Solutions",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=ER",
            },
        ],
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        accentColor: "#3b82f6",
        style: "cards",
        keywords: ["enterprise", "business", "transformation", "testimonials", "professional"],
    }

    // CTA props
    const ctaProps = {
        title: "Ready to Transform Your Business?",
        subtitle: "Start your digital transformation journey today",
        description:
            "Schedule a consultation with our enterprise solutions experts to discuss your specific needs and challenges.",
        buttons: [
            { label: "Schedule Consultation", link: "#contact", type: "primary" as const },
            { label: "Learn More", link: "#solutions", type: "secondary" as const },
        ],
        backgroundColor: "#1e40af",
        textColor: "#ffffff",
        buttonStyle: "flat" as const,
        keywords: ["enterprise", "business", "transformation", "solutions", "consultation"],
    }

    // Footer props
    const footerProps = {
        logo: "TechSolutions",
        columns: [
            {
                title: "Solutions",
                links: [
                    { label: "Data Analytics", link: "#data-analytics" },
                    { label: "Enterprise Security", link: "#security" },
                    { label: "Digital Transformation", link: "#transformation" },
                    { label: "Cloud Services", link: "#cloud" },
                ],
            },
            {
                title: "Company",
                links: [
                    { label: "About Us", link: "#about" },
                    { label: "Leadership", link: "#leadership" },
                    { label: "Careers", link: "#careers" },
                    { label: "News", link: "#news" },
                ],
            },
            {
                title: "Resources",
                links: [
                    { label: "Case Studies", link: "#case-studies" },
                    { label: "Blog", link: "#blog" },
                    { label: "Whitepapers", link: "#whitepapers" },
                    { label: "Webinars", link: "#webinars" },
                ],
            },
        ],
        backgroundColor: "#0f172a",
        textColor: "#ffffff",
        accentColor: "#3b82f6",
        keywords: ["enterprise", "business", "transformation", "solutions", "professional"],
    }

    return (
        <div className="flex flex-col min-h-screen">
            <CorporateHeader {...headerProps} />
            <main className="flex-grow">
                <HeroSection {...heroProps} />
                <FeaturesSection {...featuresProps} />
                <TestimonialsSection {...testimonialsProps} />
                <CTASection {...ctaProps} />
            </main>
            <Footer {...footerProps} />
        </div>
    )
}
