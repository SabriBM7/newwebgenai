import EducationHeader from "@/components/headers/education-header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { BookOpen, GraduationCap, Users, Globe, Award, Clock } from "lucide-react"

export default function EducationPage() {
    // Header props
    const headerProps = {
        logo: "EduPro",
        backgroundColor: "#4CAF50",
        textColor: "#ffffff",
        menu: [
            { label: "Courses", link: "#courses" },
            { label: "Resources", link: "#resources" },
            { label: "Pricing", link: "#pricing" },
            { label: "About", link: "#about" },
            { label: "Contact", link: "#contact" },
        ],
        animation: "slide-down" as const,
        height: "75px",
        fontSize: "18px",
        keywords: ["learning", "courses", "education", "growth", "educational"],
    }

    // Hero props
    const heroProps = {
        title: "Unlock Your Learning Potential",
        subtitle: "Expert-Led Courses for Professional Growth",
        description:
            "Join thousands of students taking their knowledge to the next level with our comprehensive online learning platform.",
        backgroundImage: "/placeholder.svg?height=1080&width=1920&text=Education+Background",
        overlayColor: "rgba(76, 175, 80, 0.8)",
        textColor: "#ffffff",
        fontFamily: "Roboto, sans-serif",
        buttons: [
            { label: "Explore Courses", link: "#courses", type: "primary" as const },
            { label: "Free Trial", link: "#trial", type: "secondary" as const },
        ],
        imageUrl: "/placeholder.svg?height=600&width=600&text=Online+Learning",
        imageAlt: "Online Learning",
        buttonStyle: "rounded" as const,
        textAlignment: "left" as const,
        keywords: ["learning", "courses", "education", "growth", "online", "students"],
    }

    // Features props
    const featuresProps = {
        title: "Why Choose EduPro",
        subtitle: "Features designed to enhance your learning experience",
        features: [
            {
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience.",
                icon: GraduationCap,
                iconColor: "#4CAF50",
            },
            {
                title: "Comprehensive Curriculum",
                description: "Well-structured courses covering all essential topics.",
                icon: BookOpen,
                iconColor: "#4CAF50",
            },
            {
                title: "Community Learning",
                description: "Connect with fellow students and collaborate on projects.",
                icon: Users,
                iconColor: "#4CAF50",
            },
            {
                title: "Global Access",
                description: "Access your courses anytime, anywhere in the world.",
                icon: Globe,
                iconColor: "#4CAF50",
            },
            {
                title: "Certifications",
                description: "Earn industry-recognized certificates upon completion.",
                icon: Award,
                iconColor: "#4CAF50",
            },
            {
                title: "Flexible Learning",
                description: "Learn at your own pace with lifetime access to courses.",
                icon: Clock,
                iconColor: "#4CAF50",
            },
        ],
        backgroundColor: "#ffffff",
        textColor: "#333333",
        accentColor: "#4CAF50",
        columns: 3,
        keywords: ["learning", "courses", "education", "growth", "instructors", "curriculum"],
    }

    // Testimonials props
    const testimonialsProps = {
        title: "Student Success Stories",
        subtitle: "Hear from our students who have transformed their careers",
        testimonials: [
            {
                quote:
                    "The courses at EduPro helped me transition into a new career in web development. The instructors were supportive and the content was comprehensive.",
                author: "David Kim",
                role: "Web Developer",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=DK",
            },
            {
                quote:
                    "As a busy professional, I appreciated the flexibility of EduPro's platform. I could learn at my own pace and apply new skills immediately in my job.",
                author: "Lisa Chen",
                role: "Marketing Manager",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=LC",
            },
            {
                quote:
                    "The certification I earned through EduPro was instrumental in my recent promotion. The practical projects gave me real-world experience.",
                author: "James Wilson",
                role: "Data Analyst",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=JW",
            },
        ],
        backgroundColor: "#f5f5f5",
        textColor: "#333333",
        accentColor: "#4CAF50",
        style: "quotes",
        keywords: ["students", "success", "education", "learning", "testimonials"],
    }

    // CTA props
    const ctaProps = {
        title: "Start Your Learning Journey Today",
        subtitle: "Join over 50,000 students worldwide",
        description: "Get unlimited access to all courses, projects, and resources with our affordable subscription plans.",
        buttons: [
            { label: "Get Started", link: "#signup", type: "primary" as const },
            { label: "View Pricing", link: "#pricing", type: "secondary" as const },
        ],
        backgroundColor: "#4CAF50",
        textColor: "#ffffff",
        buttonStyle: "rounded" as const,
        keywords: ["learning", "courses", "education", "growth", "signup"],
    }

    // Footer props
    const footerProps = {
        logo: "EduPro",
        columns: [
            {
                title: "Courses",
                links: [
                    { label: "Web Development", link: "#web-dev" },
                    { label: "Data Science", link: "#data-science" },
                    { label: "Business", link: "#business" },
                    { label: "Design", link: "#design" },
                ],
            },
            {
                title: "Resources",
                links: [
                    { label: "Blog", link: "#blog" },
                    { label: "Tutorials", link: "#tutorials" },
                    { label: "Webinars", link: "#webinars" },
                    { label: "E-books", link: "#ebooks" },
                ],
            },
            {
                title: "Company",
                links: [
                    { label: "About Us", link: "#about" },
                    { label: "Careers", link: "#careers" },
                    { label: "Partners", link: "#partners" },
                    { label: "Contact", link: "#contact" },
                ],
            },
        ],
        backgroundColor: "#2e7d32",
        textColor: "#ffffff",
        accentColor: "#ffffff",
        keywords: ["learning", "courses", "education", "growth", "educational"],
    }

    return (
        <div className="flex flex-col min-h-screen">
            <EducationHeader {...headerProps} />
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
