interface OllamaGenerationParams {
    industry: string
    style: string
    description: string
    websiteName: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

interface ComponentData {
    type: string
    props: Record<string, any>
}

export class EnhancedOllamaService {
    private baseUrl = "http://localhost:11434"
    private model = "llama2"

    async generateWebsiteContent(params: OllamaGenerationParams): Promise<{
        components: ComponentData[]
        metadata: any
    }> {
        try {
            console.log("🤖 Generating website content with Ollama...")

            // Generate different sections with AI
            const [heroContent, aboutContent, servicesContent, featuresContent] = await Promise.all([
                this.generateHeroContent(params),
                this.generateAboutContent(params),
                this.generateServicesContent(params),
                this.generateFeaturesContent(params),
            ])

            const components = this.buildComponentStructure(params, {
                hero: heroContent,
                about: aboutContent,
                services: servicesContent,
                features: featuresContent,
            })

            return {
                components,
                metadata: {
                    title: `${params.websiteName} - Professional ${params.industry} Website`,
                    description: params.description,
                    industry: params.industry,
                    style: params.style,
                    aiUsed: "ollama-enhanced",
                    generatedAt: new Date().toISOString(),
                },
            }
        } catch (error) {
            console.error("❌ Ollama generation failed:", error)
            throw error
        }
    }

    private async generateHeroContent(params: OllamaGenerationParams) {
        const prompt = `Generate a compelling hero section for a ${params.industry} website named "${params.websiteName}". 
    Style: ${params.style}
    Description: ${params.description}
    
    Return JSON with: title, subtitle, description, buttonText, features (array of 3 key benefits)
    Make it engaging and industry-specific.`

        const response = await this.callOllama(prompt)
        return this.parseJsonResponse(response, {
            title: `Welcome to ${params.websiteName}`,
            subtitle: `Professional ${params.industry} services`,
            description: params.description,
            buttonText: "Get Started",
            features: ["Quality Service", "Expert Team", "Customer Focus"],
        })
    }

    private async generateAboutContent(params: OllamaGenerationParams) {
        const prompt = `Generate an about section for a ${params.industry} business named "${params.websiteName}".
    Style: ${params.style}
    Description: ${params.description}
    
    Return JSON with: title, subtitle, description, mission, vision, stats (array of 4 stats with number and label)
    Make it professional and trustworthy.`

        const response = await this.callOllama(prompt)
        return this.parseJsonResponse(response, {
            title: "About Us",
            subtitle: "Our Story",
            description: params.description,
            mission: "To provide exceptional service to our clients",
            vision: "To be the leading provider in our industry",
            stats: [
                { number: "10+", label: "Years Experience" },
                { number: "500+", label: "Happy Clients" },
                { number: "50+", label: "Projects Completed" },
                { number: "24/7", label: "Support" },
            ],
        })
    }

    private async generateServicesContent(params: OllamaGenerationParams) {
        const prompt = `Generate services for a ${params.industry} business named "${params.websiteName}".
    Style: ${params.style}
    Description: ${params.description}
    
    Return JSON with: title, subtitle, services (array of 6 services with title, description, price, features)
    Make services relevant to ${params.industry} industry.`

        const response = await this.callOllama(prompt)
        return this.parseJsonResponse(response, {
            title: "Our Services",
            subtitle: "What we offer",
            services: this.getDefaultServices(params.industry),
        })
    }

    private async generateFeaturesContent(params: OllamaGenerationParams) {
        const prompt = `Generate key features for a ${params.industry} website named "${params.websiteName}".
    Style: ${params.style}
    Description: ${params.description}
    
    Return JSON with: title, subtitle, features (array of 6 features with title, description, icon)
    Make features specific to ${params.industry} industry.`

        const response = await this.callOllama(prompt)
        return this.parseJsonResponse(response, {
            title: "Why Choose Us",
            subtitle: "Our key advantages",
            features: this.getDefaultFeatures(params.industry),
        })
    }

    private async callOllama(prompt: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: this.model,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                },
            }),
        })

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`)
        }

        const data = await response.json()
        return data.response
    }

    private parseJsonResponse(response: string, fallback: any): any {
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0])
            }
            return fallback
        } catch (error) {
            console.warn("Failed to parse AI response, using fallback")
            return fallback
        }
    }

    private buildComponentStructure(params: OllamaGenerationParams, content: any): ComponentData[] {
        const components: ComponentData[] = [
            {
                type: "Header",
                props: {
                    logo: params.websiteName,
                    menu: this.getIndustryMenu(params.industry),
                    buttonText: "Contact Us",
                    buttonLink: "#contact",
                },
            },
            {
                type: "BusinessHero",
                props: {
                    ...content.hero,
                    image: `/placeholder.svg?height=600&width=800&text=${params.industry}+Hero`,
                },
            },
            {
                type: "ValueProposition",
                props: {
                    title: content.features.title,
                    subtitle: content.features.subtitle,
                    features: content.features.features,
                },
            },
            {
                type: "AboutSection",
                props: {
                    ...content.about,
                    image: `/placeholder.svg?height=400&width=600&text=About+${params.websiteName}`,
                },
            },
            {
                type: "ServicesSection",
                props: content.services,
            },
        ]

        // Add industry-specific components
        if (params.industry === "restaurant") {
            components.push({
                type: "MenuSection",
                props: this.getRestaurantMenu(params.websiteName),
            })
        } else if (params.industry === "ecommerce") {
            components.push({
                type: "ProductGrid",
                props: this.getEcommerceProducts(),
            })
        } else if (params.industry === "education") {
            components.push({
                type: "CourseGrid",
                props: this.getEducationCourses(),
            })
        }

        // Add common sections
        components.push(
            {
                type: "StatsSection",
                props: {
                    title: "Our Impact",
                    stats: content.about.stats,
                },
            },
            {
                type: "TestimonialsSection",
                props: this.getTestimonials(params.industry),
            },
            {
                type: "FAQSection",
                props: this.getFAQs(params.industry),
            },
            {
                type: "ContactSection",
                props: {
                    title: "Contact Us",
                    subtitle: "Get in Touch",
                    description: "Ready to get started? Contact us today!",
                    phone: "(555) 123-4567",
                    email: `info@${params.websiteName.toLowerCase().replace(/\s+/g, "")}.com`,
                    address: "123 Business Street, City, State 12345",
                },
            },
            {
                type: "Footer",
                props: {
                    logo: params.websiteName,
                    description: params.description.substring(0, 100),
                    copyrightText: `© 2024 ${params.websiteName}. All rights reserved.`,
                },
            },
        )

        return components
    }

    private getIndustryMenu(industry: string) {
        const menus = {
            restaurant: [
                { label: "Home", link: "#home" },
                { label: "Menu", link: "#menu" },
                { label: "About", link: "#about" },
                { label: "Reservations", link: "#contact" },
            ],
            ecommerce: [
                { label: "Home", link: "#home" },
                { label: "Products", link: "#products" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            education: [
                { label: "Home", link: "#home" },
                { label: "Courses", link: "#courses" },
                { label: "Faculty", link: "#faculty" },
                { label: "Admissions", link: "#contact" },
            ],
            default: [
                { label: "Home", link: "#home" },
                { label: "About", link: "#about" },
                { label: "Services", link: "#services" },
                { label: "Contact", link: "#contact" },
            ],
        }

        return menus[industry as keyof typeof menus] || menus.default
    }

    private getDefaultServices(industry: string) {
        const services = {
            restaurant: [
                {
                    title: "Dine-In Experience",
                    description: "Enjoy our carefully crafted dishes in our elegant dining room",
                    price: "From $25",
                    features: ["Fresh Ingredients", "Expert Chefs", "Elegant Atmosphere"],
                },
                {
                    title: "Takeout & Delivery",
                    description: "Get your favorite dishes delivered to your door",
                    price: "From $15",
                    features: ["Quick Service", "Hot & Fresh", "Contactless Delivery"],
                },
            ],
            technology: [
                {
                    title: "Web Development",
                    description: "Custom websites and web applications",
                    price: "From $2,999",
                    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
                },
                {
                    title: "Mobile Apps",
                    description: "iOS and Android mobile applications",
                    price: "From $4,999",
                    features: ["Native Performance", "User-Friendly", "App Store Ready"],
                },
            ],
            default: [
                {
                    title: "Consultation",
                    description: "Expert advice and planning for your needs",
                    price: "From $99",
                    features: ["Expert Advice", "Custom Solutions", "Ongoing Support"],
                },
            ],
        }

        return services[industry as keyof typeof services] || services.default
    }

    private getDefaultFeatures(industry: string) {
        const features = {
            restaurant: [
                { title: "Fresh Ingredients", description: "Locally sourced, organic ingredients", icon: "🌱" },
                { title: "Expert Chefs", description: "Trained culinary professionals", icon: "👨‍🍳" },
                { title: "Cozy Atmosphere", description: "Perfect for any occasion", icon: "🕯️" },
            ],
            technology: [
                { title: "Cutting-Edge Tech", description: "Latest technologies and frameworks", icon: "⚡" },
                { title: "Scalable Solutions", description: "Built to grow with your business", icon: "📈" },
                { title: "24/7 Support", description: "Round-the-clock technical support", icon: "🛠️" },
            ],
            default: [
                { title: "Quality Service", description: "Top-notch service delivery", icon: "⭐" },
                { title: "Expert Team", description: "Experienced professionals", icon: "👥" },
                { title: "Customer Focus", description: "Your success is our priority", icon: "🎯" },
            ],
        }

        return features[industry as keyof typeof features] || features.default
    }

    private getRestaurantMenu(websiteName: string) {
        return {
            title: "Our Menu",
            subtitle: "Delicious Italian Cuisine",
            categories: ["Appetizers", "Main Courses", "Desserts"],
            items: [
                {
                    name: "Signature Pasta",
                    description: "Our famous homemade pasta with special marinara sauce",
                    price: "$18.99",
                    image: "/placeholder.svg?height=200&width=300&text=Pasta",
                    category: "Main Courses",
                },
                {
                    name: "Margherita Pizza",
                    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
                    price: "$16.99",
                    image: "/placeholder.svg?height=200&width=300&text=Pizza",
                    category: "Main Courses",
                },
                {
                    name: "Bruschetta",
                    description: "Toasted bread with fresh tomatoes, garlic, and herbs",
                    price: "$8.99",
                    image: "/placeholder.svg?height=200&width=300&text=Bruschetta",
                    category: "Appetizers",
                },
                {
                    name: "Tiramisu",
                    description: "Classic Italian dessert with coffee and mascarpone",
                    price: "$7.99",
                    image: "/placeholder.svg?height=200&width=300&text=Tiramisu",
                    category: "Desserts",
                },
            ],
        }
    }

    private getEcommerceProducts() {
        return {
            title: "Featured Products",
            subtitle: "Best Sellers",
            products: [
                {
                    name: "Premium Product 1",
                    description: "High-quality product with excellent features",
                    price: "$99.99",
                    image: "/placeholder.svg?height=300&width=300&text=Product+1",
                    rating: 4.8,
                },
                {
                    name: "Premium Product 2",
                    description: "Another great product for your needs",
                    price: "$149.99",
                    image: "/placeholder.svg?height=300&width=300&text=Product+2",
                    rating: 4.9,
                },
            ],
        }
    }

    private getEducationCourses() {
        return {
            title: "Our Courses",
            subtitle: "Learn with the best",
            courses: [
                {
                    title: "Introduction to Programming",
                    description: "Learn the basics of programming with hands-on projects",
                    duration: "8 weeks",
                    level: "Beginner",
                    price: "$299",
                    image: "/placeholder.svg?height=200&width=300&text=Programming",
                },
                {
                    title: "Advanced Web Development",
                    description: "Master modern web development technologies",
                    duration: "12 weeks",
                    level: "Advanced",
                    price: "$499",
                    image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
                },
            ],
        }
    }

    private getTestimonials(industry: string) {
        return {
            title: "What Our Clients Say",
            subtitle: "Customer Reviews",
            testimonials: [
                {
                    name: "John Smith",
                    role: "Customer",
                    content: "Excellent service and quality. Highly recommended!",
                    rating: 5,
                    image: "/placeholder.svg?height=100&width=100&text=JS",
                },
                {
                    name: "Sarah Johnson",
                    role: "Regular Client",
                    content: "Always professional and delivers on time.",
                    rating: 5,
                    image: "/placeholder.svg?height=100&width=100&text=SJ",
                },
            ],
        }
    }

    private getFAQs(industry: string) {
        const faqs = {
            restaurant: [
                {
                    question: "Do you take reservations?",
                    answer: "Yes, we accept reservations. Please call us or book online.",
                },
                {
                    question: "Do you offer vegetarian options?",
                    answer: "We have a variety of vegetarian and vegan dishes.",
                },
            ],
            default: [
                {
                    question: "How can I get started?",
                    answer: "Simply contact us through our contact form or give us a call.",
                },
                {
                    question: "What are your business hours?",
                    answer: "We're open Monday through Friday, 9 AM to 6 PM.",
                },
            ],
        }

        return {
            title: "Frequently Asked Questions",
            subtitle: "Common questions and answers",
            faqs: faqs[industry as keyof typeof faqs] || faqs.default,
        }
    }
}

export const enhancedOllamaService = new EnhancedOllamaService()
