// Component library organization and metadata

export type ComponentCategory =
    | "header"
    | "hero"
    | "features"
    | "content"
    | "testimonials"
    | "pricing"
    | "stats"
    | "team"
    | "faq"
    | "contact"
    | "cta"
    | "footer"
    | "gallery"
    | "blog"
    | "newsletter"

export type ComponentStyle =
    | "minimal"
    | "modern"
    | "classic"
    | "bold"
    | "gradient"
    | "outlined"
    | "card"
    | "grid"
    | "list"
    | "split"
    | "centered"
    | "animated"

export type ComponentSize = "small" | "medium" | "large"

export type ComponentColorScheme = "primary" | "secondary" | "neutral" | "accent" | "custom"

export interface ComponentMetadata {
    id: string
    name: string
    category: ComponentCategory
    style: ComponentStyle
    description: string
    screenshot?: string
    tags: string[]
    size?: ComponentSize
    colorScheme?: ComponentColorScheme
    isNew?: boolean
    isPremium?: boolean
}

// Example component metadata registry
export const componentRegistry: ComponentMetadata[] = [
    // Headers
    {
        id: "header-minimal",
        name: "Minimal Header",
        category: "header",
        style: "minimal",
        description: "A clean, minimal header with essential navigation",
        tags: ["simple", "clean", "lightweight"],
        size: "small",
    },
    {
        id: "header-corporate",
        name: "Corporate Header",
        category: "header",
        style: "classic",
        description: "Professional header with contact information and dropdown menus",
        tags: ["business", "professional", "dropdown"],
        size: "medium",
    },
    // Add more component metadata here
]

// Helper function to filter components
export function filterComponents(options: {
    category?: ComponentCategory
    style?: ComponentStyle
    tags?: string[]
    size?: ComponentSize
    isNew?: boolean
    isPremium?: boolean
}): ComponentMetadata[] {
    let filtered = [...componentRegistry]

    if (options.category) {
        filtered = filtered.filter((comp) => comp.category === options.category)
    }

    if (options.style) {
        filtered = filtered.filter((comp) => comp.style === options.style)
    }

    if (options.tags && options.tags.length > 0) {
        filtered = filtered.filter((comp) => options.tags!.some((tag) => comp.tags.includes(tag)))
    }

    if (options.size) {
        filtered = filtered.filter((comp) => comp.size === options.size)
    }

    if (options.isNew !== undefined) {
        filtered = filtered.filter((comp) => comp.isNew === options.isNew)
    }

    if (options.isPremium !== undefined) {
        filtered = filtered.filter((comp) => comp.isPremium === options.isPremium)
    }

    return filtered
}

interface ComponentProps {
    websiteName: string
    description: string
    style: string
    includeImages: boolean
}

export function getDefaultComponents(industry: string, props: ComponentProps) {
    const { websiteName, description, style, includeImages } = props

    // Base components that all websites should have
    const baseComponents = [
        {
            type: "Header",
            props: {
                logo: websiteName,
                menu: getIndustryMenu(industry),
                buttonText: getIndustryCTA(industry),
                buttonLink: "#contact",
                style,
            },
        },
        {
            type: "BusinessHero",
            props: {
                title: `Welcome to ${websiteName}`,
                subtitle: getIndustryTagline(industry),
                description: description,
                buttonText: "Get Started",
                secondaryButtonText: "Learn More",
                image: includeImages ? `/placeholder.svg?height=600&width=800&text=Image+1` : undefined,
                style,
            },
        },
        {
            type: "AboutSection",
            props: {
                title: "About Us",
                subtitle: "Our Story",
                content: `${websiteName} is a premier ${industry} business dedicated to providing exceptional service and quality. With years of experience and a passion for excellence, we strive to exceed your expectations.`,
                image: includeImages ? `/placeholder.svg?height=800&width=600&text=Image+2` : undefined,
                style,
            },
        },
        {
            type: "ValueProposition",
            props: {
                title: "Why Choose Us",
                subtitle: "Our Advantages",
                features: getIndustryFeatures(industry),
                style,
            },
        },
        {
            type: "ServicesSection",
            props: {
                title: "Our Services",
                subtitle: "What We Offer",
                services: getIndustryServices(industry),
                style,
            },
        },
        {
            type: "TestimonialsSection",
            props: {
                title: "What Our Clients Say",
                subtitle: "Testimonials",
                testimonials: [
                    {
                        name: "John Smith",
                        role: "Customer",
                        content: "Excellent service and quality. Highly recommended!",
                        rating: 5,
                        image: includeImages ? `/placeholder.svg?height=100&width=100&text=JS` : undefined,
                    },
                    {
                        name: "Sarah Johnson",
                        role: "Regular Client",
                        content: "Always professional and delivers on time.",
                        rating: 5,
                        image: includeImages ? `/placeholder.svg?height=100&width=100&text=SJ` : undefined,
                    },
                ],
                style,
            },
        },
        {
            type: "ContactSection",
            props: {
                title: "Contact Us",
                subtitle: "Get in Touch",
                description: "Ready to get started? Contact us today!",
                phone: "(555) 123-4567",
                email: `info@${websiteName.toLowerCase().replace(/\s+/g, "")}.com`,
                address: "123 Business Street, City, State 12345",
                style,
            },
        },
        {
            type: "Footer",
            props: {
                logo: websiteName,
                description: description.substring(0, 100),
                copyrightText: `© ${new Date().getFullYear()} ${websiteName}. All rights reserved.`,
                style,
            },
        },
    ]

    // Add industry-specific components
    const industryComponents = getIndustrySpecificComponents(industry, props)

    return [...baseComponents, ...industryComponents]
}

function getIndustryMenu(industry: string) {
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

function getIndustryCTA(industry: string): string {
    const ctaMap: Record<string, string> = {
        restaurant: "Make Reservation",
        technology: "Get Quote",
        healthcare: "Book Appointment",
        education: "Apply Now",
        fitness: "Join Now",
        realestate: "Find Properties",
        legal: "Free Consultation",
        finance: "Get Started",
        ecommerce: "Shop Now",
    }

    return ctaMap[industry] || "Contact Us"
}

function getIndustryTagline(industry: string): string {
    const taglines: Record<string, string> = {
        restaurant: "Fine dining in a comfortable atmosphere",
        technology: "Cutting-edge solutions for modern challenges",
        healthcare: "Quality healthcare for you and your family",
        education: "Quality education for a brighter tomorrow",
        realestate: "Expert real estate services for buyers and sellers",
        ecommerce: "Quality products, exceptional service",
        default: "Excellence in everything we do",
    }

    return taglines[industry] || taglines.default
}

function getIndustryFeatures(industry: string) {
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

function getIndustryServices(industry: string) {
    const services = {
        restaurant: [
            {
                title: "Dine-In Experience",
                description: "Enjoy our carefully crafted dishes in our elegant dining room",
                price: "From $25",
                features: ["Fresh Ingredients", "Expert Chefs", "Elegant Atmosphere"],
                image: `/placeholder.svg?height=600&width=800&text=Image+3`,
            },
            {
                title: "Takeout & Delivery",
                description: "Get your favorite dishes delivered to your door",
                price: "From $15",
                features: ["Quick Service", "Hot & Fresh", "Contactless Delivery"],
                image: `/placeholder.svg?height=600&width=800&text=Image+4`,
            },
        ],
        technology: [
            {
                title: "Web Development",
                description: "Custom websites and web applications",
                price: "From $2,999",
                features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
                image: `/placeholder.svg?height=600&width=800&text=Image+3`,
            },
            {
                title: "Mobile Apps",
                description: "iOS and Android mobile applications",
                price: "From $4,999",
                features: ["Native Performance", "User-Friendly", "App Store Ready"],
                image: `/placeholder.svg?height=600&width=800&text=Image+4`,
            },
        ],
        default: [
            {
                title: "Consultation",
                description: "Expert advice and planning for your needs",
                price: "From $99",
                features: ["Expert Advice", "Custom Solutions", "Ongoing Support"],
                image: `/placeholder.svg?height=600&width=800&text=Image+3`,
            },
            {
                title: "Premium Service",
                description: "Comprehensive solution for your business",
                price: "From $499",
                features: ["Full Service", "Priority Support", "Dedicated Manager"],
                image: `/placeholder.svg?height=600&width=800&text=Image+4`,
            },
        ],
    }

    return services[industry as keyof typeof services] || services.default
}

function getIndustrySpecificComponents(industry: string, props: ComponentProps) {
    const { websiteName, includeImages } = props

    switch (industry) {
        case "restaurant":
            return [
                {
                    type: "MenuSection",
                    props: {
                        title: "Our Menu",
                        subtitle: "Delicious Italian Cuisine",
                        categories: ["Appetizers", "Main Courses", "Desserts"],
                        items: [
                            {
                                name: "Signature Pasta",
                                description: "Our famous homemade pasta with special marinara sauce",
                                price: "$18.99",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Pasta` : undefined,
                                category: "Main Courses",
                            },
                            {
                                name: "Margherita Pizza",
                                description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
                                price: "$16.99",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Pizza` : undefined,
                                category: "Main Courses",
                            },
                            {
                                name: "Bruschetta",
                                description: "Toasted bread with fresh tomatoes, garlic, and herbs",
                                price: "$8.99",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Bruschetta` : undefined,
                                category: "Appetizers",
                            },
                            {
                                name: "Tiramisu",
                                description: "Classic Italian dessert with coffee and mascarpone",
                                price: "$7.99",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Tiramisu` : undefined,
                                category: "Desserts",
                            },
                        ],
                    },
                },
                {
                    type: "GallerySection",
                    props: {
                        title: "Our Gallery",
                        subtitle: "Delicious Moments",
                        images: [
                            {
                                url: includeImages ? `/placeholder.svg?height=600&width=800&text=Image+5` : undefined,
                                alt: "Restaurant interior",
                                title: "Our elegant dining space",
                            },
                            {
                                url: includeImages ? `/placeholder.svg?height=800&width=600&text=Image+6` : undefined,
                                alt: "Signature dish",
                                title: "Chef's special creation",
                            },
                        ],
                    },
                },
            ]
        case "ecommerce":
            return [
                {
                    type: "ProductGrid",
                    props: {
                        title: "Featured Products",
                        subtitle: "Best Sellers",
                        products: [
                            {
                                name: "Premium Product 1",
                                description: "High-quality product with excellent features",
                                price: "$99.99",
                                image: includeImages ? `/placeholder.svg?height=300&width=300&text=Product+1` : undefined,
                                rating: 4.8,
                            },
                            {
                                name: "Premium Product 2",
                                description: "Another great product for your needs",
                                price: "$149.99",
                                image: includeImages ? `/placeholder.svg?height=300&width=300&text=Product+2` : undefined,
                                rating: 4.9,
                            },
                        ],
                    },
                },
            ]
        case "education":
            return [
                {
                    type: "CourseGrid",
                    props: {
                        title: "Our Courses",
                        subtitle: "Learn with the best",
                        courses: [
                            {
                                title: "Introduction to Programming",
                                description: "Learn the basics of programming with hands-on projects",
                                duration: "8 weeks",
                                level: "Beginner",
                                price: "$299",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Programming` : undefined,
                            },
                            {
                                title: "Advanced Web Development",
                                description: "Master modern web development technologies",
                                duration: "12 weeks",
                                level: "Advanced",
                                price: "$499",
                                image: includeImages ? `/placeholder.svg?height=200&width=300&text=Web+Dev` : undefined,
                            },
                        ],
                    },
                },
            ]
        case "realestate":
            return [
                {
                    type: "PropertyListingSection",
                    props: {
                        title: "Featured Properties",
                        subtitle: "Find your dream home",
                        properties: [
                            {
                                title: "Luxury Villa",
                                description: "Spacious 4-bedroom villa with pool and garden",
                                price: "$1,200,000",
                                features: ["4 Bedrooms", "3 Bathrooms", "Pool", "Garden"],
                                image: includeImages ? `/placeholder.svg?height=400&width=600&text=Property+1` : undefined,
                                location: "123 Luxury Lane",
                            },
                            {
                                title: "Modern Apartment",
                                description: "Contemporary 2-bedroom apartment in the city center",
                                price: "$450,000",
                                features: ["2 Bedrooms", "2 Bathrooms", "Balcony", "Parking"],
                                image: includeImages ? `/placeholder.svg?height=400&width=600&text=Property+2` : undefined,
                                location: "456 Urban Street",
                            },
                        ],
                    },
                },
            ]
        default:
            return []
    }
}
