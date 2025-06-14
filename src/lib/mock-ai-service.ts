// Mock AI Service for testing and fallback
import type { AIServiceInterface } from "./ai-service"
import type { Website } from "@/types"

class MockAIService implements AIServiceInterface {
    async isAvailable(): Promise<boolean> {
        return true
    }

    async generateWebsite(prompt: string, industry: string, style: string): Promise<Website> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate a mock website based on the inputs
        return {
            metadata: {
                title: `${industry} Website`,
                description: prompt.substring(0, 160),
                businessName: `${industry} Business`,
                industry: industry,
                style: style,
                primaryColor: "#3b82f6",
                secondaryColor: "#10b981",
                isMock: true,
            },
            header: {
                type: "header",
                variant: "minimal",
                props: {
                    logo: `${industry} Business`,
                    menu: [
                        { label: "Home", link: "#" },
                        { label: "Features", link: "#features" },
                        { label: "About", link: "#about" },
                        { label: "Contact", link: "#contact" },
                    ],
                },
            },
            hero: {
                type: "hero",
                variant: "standard",
                props: {
                    title: `Welcome to ${industry} Business`,
                    subtitle: "We provide exceptional services",
                    description: prompt.substring(0, 200),
                    primaryButton: { label: "Get Started", link: "#contact" },
                    secondaryButton: { label: "Learn More", link: "#features" },
                    image: "/business-meeting-collaboration.png",
                },
            },
            sections: [
                {
                    type: "features",
                    variant: "grid",
                    props: {
                        title: "Our Features",
                        subtitle: "What makes us different",
                        features: [
                            { title: "Feature 1", description: "Description of feature 1", icon: "zap" },
                            { title: "Feature 2", description: "Description of feature 2", icon: "shield" },
                            { title: "Feature 3", description: "Description of feature 3", icon: "star" },
                            { title: "Feature 4", description: "Description of feature 4", icon: "award" },
                            { title: "Feature 5", description: "Description of feature 5", icon: "heart" },
                            { title: "Feature 6", description: "Description of feature 6", icon: "smile" },
                        ],
                    },
                },
                {
                    type: "testimonials",
                    variant: "standard",
                    props: {
                        title: "What Our Clients Say",
                        testimonials: [
                            {
                                quote: "This company has transformed our business operations completely!",
                                author: "Jane Smith",
                                role: "CEO, TechCorp",
                                avatar: "/professional-woman-diverse.png",
                            },
                            {
                                quote: "The best service we've ever experienced. Highly recommended!",
                                author: "John Doe",
                                role: "Director, InnovateCo",
                                avatar: "/professional-man.png",
                            },
                        ],
                    },
                },
                {
                    type: "cta",
                    variant: "centered",
                    props: {
                        title: "Ready to Get Started?",
                        description: "Join thousands of satisfied customers today.",
                        primaryButton: { label: "Contact Us", link: "#contact" },
                        secondaryButton: { label: "Learn More", link: "#about" },
                    },
                },
            ],
            footer: {
                type: "footer",
                variant: "simple",
                props: {
                    logo: `${industry} Business`,
                    copyright: `© ${new Date().getFullYear()} ${industry} Business. All rights reserved.`,
                    links: [
                        { label: "Privacy Policy", link: "#" },
                        { label: "Terms of Service", link: "#" },
                        { label: "Contact", link: "#" },
                    ],
                    socialLinks: [
                        { platform: "twitter", link: "#" },
                        { platform: "facebook", link: "#" },
                        { platform: "instagram", link: "#" },
                    ],
                },
            },
        }
    }
}

export const mockAIService = new MockAIService()
