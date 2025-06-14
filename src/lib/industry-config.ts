export interface IndustryConfig {
    id: string
    displayName: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    sections: {
        required: string[]
        recommended: string[]
        optional: string[]
        industrySpecific: string[]
    }
    content: {
        heroTitles: string[]
        taglines: string[]
        features: Array<{
            title: string
            description: string
            icon: string
            benefit: string
        }>
        services: Array<{
            title: string
            description: string
            price: string
            features: string[]
            icon: string
        }>
        testimonials: Array<{
            name: string
            role: string
            company: string
            content: string
            rating: number
        }>
    }
    images: {
        hero: string[]
        gallery: string[]
        team: string[]
        services: string[]
    }
}

const industryConfigs: Record<string, IndustryConfig> = {
    restaurant: {
        id: "restaurant",
        displayName: "Restaurant",
        primaryColor: "#4B5563",
        secondaryColor: "#F3F4F6",
        accentColor: "#EF4444",
        sections: {
            required: ["Header", "Hero", "About", "Footer"],
            recommended: ["MenuSection", "Testimonials", "Contact", "Gallery"],
            optional: ["Team", "FAQ", "CTA"],
            industrySpecific: ["MenuSection"],
        },
        content: {
            heroTitles: ["Experience Culinary Excellence at {{name}}", "Savor the Flavor at {{name}}"],
            taglines: ["Fine dining in a comfortable atmosphere", "Where every meal is a celebration"],
            features: [
                {
                    title: "Fresh Ingredients",
                    description: "We source only the freshest, highest-quality ingredients for our dishes.",
                    icon: "🌿",
                    benefit: "Healthier, tastier meals",
                },
                {
                    title: "Expert Chefs",
                    description: "Our team of experienced chefs creates culinary masterpieces.",
                    icon: "👨‍🍳",
                    benefit: "Exceptional dining experience",
                },
                {
                    title: "Cozy Atmosphere",
                    description: "Enjoy your meal in our warm, inviting dining space.",
                    icon: "🏠",
                    benefit: "Comfortable dining environment",
                },
            ],
            services: [
                {
                    title: "Dinner Service",
                    description: "Enjoy our full menu in our elegant dining room.",
                    price: "$30-50 per person",
                    features: ["Full menu", "Table service", "Wine pairings", "Reservations recommended"],
                    icon: "🍽️",
                },
                {
                    title: "Private Events",
                    description: "Host your special occasion in our private dining room.",
                    price: "Starting at $500",
                    features: ["Custom menus", "Dedicated staff", "Elegant setting", "Accommodates up to 30 guests"],
                    icon: "🎉",
                },
                {
                    title: "Catering",
                    description: "Bring our delicious food to your location.",
                    price: "Starting at $25 per person",
                    features: ["Delivery available", "Setup included", "Custom menus", "Professional service"],
                    icon: "📦",
                },
            ],
            testimonials: [
                {
                    name: "John Smith",
                    role: "Customer",
                    company: "",
                    content: "The food was absolutely delicious and the service was impeccable. Will definitely be coming back!",
                    rating: 5,
                },
                {
                    name: "Jane Doe",
                    role: "Event Planner",
                    company: "Stellar Events",
                    content:
                        "We used their catering service for our corporate event and everyone was impressed. Highly recommended!",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/food-gallery-1.png", "/restaurant-interior.png"],
            gallery: [
                "/food-gallery-1.png",
                "/food-gallery-2.png",
                "/food-gallery-3.png",
                "/food-gallery-4.png",
                "/food-gallery-5.png",
                "/food-gallery-6.png",
            ],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/food-gallery-1.png", "/food-gallery-2.png", "/food-gallery-3.png"],
        },
    },
    technology: {
        id: "technology",
        displayName: "Technology",
        primaryColor: "#2563EB",
        secondaryColor: "#F3F4F6",
        accentColor: "#7C3AED",
        sections: {
            required: ["Header", "Hero", "Features", "Footer"],
            recommended: ["Services", "Testimonials", "CTA", "Team"],
            optional: ["FAQ", "Contact", "Pricing"],
            industrySpecific: [],
        },
        content: {
            heroTitles: ["Innovate with {{name}}", "Transform Your Business with {{name}}"],
            taglines: ["Cutting-edge solutions for modern challenges", "Technology that drives your success"],
            features: [
                {
                    title: "Cloud Solutions",
                    description: "Secure, scalable cloud infrastructure for your business needs.",
                    icon: "☁️",
                    benefit: "Flexible, cost-effective IT",
                },
                {
                    title: "AI Integration",
                    description: "Harness the power of artificial intelligence for your business.",
                    icon: "🤖",
                    benefit: "Smarter business decisions",
                },
                {
                    title: "Cybersecurity",
                    description: "Protect your business with enterprise-grade security solutions.",
                    icon: "🔒",
                    benefit: "Peace of mind and protection",
                },
            ],
            services: [
                {
                    title: "IT Consulting",
                    description: "Expert guidance on technology strategy and implementation.",
                    price: "Starting at $150/hour",
                    features: ["Technology assessment", "Strategic planning", "Implementation roadmap", "Ongoing support"],
                    icon: "💼",
                },
                {
                    title: "Custom Software",
                    description: "Tailored software solutions designed for your specific needs.",
                    price: "Starting at $10,000",
                    features: ["Requirements analysis", "Custom development", "Testing & QA", "Maintenance & support"],
                    icon: "💻",
                },
                {
                    title: "Managed IT Services",
                    description: "Comprehensive IT management and support for your business.",
                    price: "Starting at $2,500/month",
                    features: ["24/7 monitoring", "Help desk support", "Network management", "Security services"],
                    icon: "🔧",
                },
            ],
            testimonials: [
                {
                    name: "Sarah Johnson",
                    role: "CTO",
                    company: "Acme Corp",
                    content:
                        "Their team delivered an exceptional software solution that has transformed our business processes. Highly recommended!",
                    rating: 5,
                },
                {
                    name: "Michael Chen",
                    role: "IT Director",
                    company: "Global Enterprises",
                    content:
                        "The managed IT services have significantly reduced our downtime and improved our security posture. Great value!",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/tech-innovation.png"],
            gallery: [
                "/business-meeting-collaboration.png",
                "/professional-woman-diverse.png",
                "/professional-man.png",
                "/business-meeting-diversity.png",
            ],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/tech-innovation.png", "/business-meeting-collaboration.png"],
        },
    },
    healthcare: {
        id: "healthcare",
        displayName: "Healthcare",
        primaryColor: "#0891B2",
        secondaryColor: "#F0FDFA",
        accentColor: "#06B6D4",
        sections: {
            required: ["Header", "Hero", "Services", "Footer"],
            recommended: ["About", "Team", "Testimonials", "Contact"],
            optional: ["FAQ", "CTA", "Gallery"],
            industrySpecific: [],
        },
        content: {
            heroTitles: ["Your Health, Our Priority at {{name}}", "Compassionate Care at {{name}}"],
            taglines: ["Quality healthcare for you and your family", "Expert care when you need it most"],
            features: [
                {
                    title: "Expert Physicians",
                    description: "Our team of board-certified doctors provides exceptional care.",
                    icon: "👨‍⚕️",
                    benefit: "Quality medical expertise",
                },
                {
                    title: "Modern Facilities",
                    description: "State-of-the-art equipment and comfortable treatment spaces.",
                    icon: "🏥",
                    benefit: "Advanced, comfortable care",
                },
                {
                    title: "Patient-Centered",
                    description: "We focus on your individual needs and treatment goals.",
                    icon: "❤️",
                    benefit: "Personalized healthcare",
                },
            ],
            services: [
                {
                    title: "Primary Care",
                    description: "Comprehensive healthcare for patients of all ages.",
                    price: "Insurance accepted",
                    features: ["Annual physicals", "Preventive care", "Chronic disease management", "Same-day appointments"],
                    icon: "🩺",
                },
                {
                    title: "Specialized Services",
                    description: "Expert care for specific health conditions.",
                    price: "Insurance accepted",
                    features: ["Cardiology", "Orthopedics", "Dermatology", "Neurology"],
                    icon: "🔬",
                },
                {
                    title: "Telehealth",
                    description: "Virtual appointments from the comfort of your home.",
                    price: "Starting at $75",
                    features: ["Convenient scheduling", "No travel required", "Secure platform", "Insurance accepted"],
                    icon: "📱",
                },
            ],
            testimonials: [
                {
                    name: "Robert Williams",
                    role: "Patient",
                    company: "",
                    content:
                        "The care I received was exceptional. The doctors took the time to listen and develop a treatment plan that worked for me.",
                    rating: 5,
                },
                {
                    name: "Emily Rodriguez",
                    role: "Patient",
                    company: "",
                    content:
                        "I've been bringing my family here for years. The staff is always friendly and professional, and the care is top-notch.",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/healthcare-professionals.png"],
            gallery: ["/healthcare-professionals.png"],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/healthcare-professionals.png"],
        },
    },
    education: {
        id: "education",
        displayName: "Education",
        primaryColor: "#4F46E5",
        secondaryColor: "#EEF2FF",
        accentColor: "#818CF8",
        sections: {
            required: ["Header", "Hero", "About", "Footer"],
            recommended: ["Services", "Team", "Testimonials", "CTA"],
            optional: ["FAQ", "Contact", "Gallery"],
            industrySpecific: [],
        },
        content: {
            heroTitles: ["Empowering Minds at {{name}}", "Building Futures at {{name}}"],
            taglines: ["Quality education for a brighter tomorrow", "Where learning comes to life"],
            features: [
                {
                    title: "Expert Faculty",
                    description: "Learn from experienced educators passionate about student success.",
                    icon: "👩‍🏫",
                    benefit: "Quality instruction",
                },
                {
                    title: "Modern Curriculum",
                    description: "Up-to-date, relevant coursework designed for today's world.",
                    icon: "📚",
                    benefit: "Practical, applicable knowledge",
                },
                {
                    title: "Supportive Environment",
                    description: "A nurturing community that encourages growth and achievement.",
                    icon: "🌱",
                    benefit: "Confidence and success",
                },
            ],
            services: [
                {
                    title: "Core Programs",
                    description: "Comprehensive educational programs for all levels.",
                    price: "Starting at $X per semester",
                    features: ["Small class sizes", "Personalized attention", "Hands-on learning", "Regular assessments"],
                    icon: "📝",
                },
                {
                    title: "Specialized Courses",
                    description: "Focused learning in specific subject areas.",
                    price: "Starting at $X per course",
                    features: ["Expert instruction", "In-depth content", "Project-based learning", "Industry connections"],
                    icon: "🔍",
                },
                {
                    title: "Tutoring Services",
                    description: "One-on-one support to enhance learning and achievement.",
                    price: "Starting at $X per hour",
                    features: ["Personalized approach", "Flexible scheduling", "Progress tracking", "Subject specialists"],
                    icon: "👨‍🏫",
                },
            ],
            testimonials: [
                {
                    name: "David Thompson",
                    role: "Parent",
                    company: "",
                    content:
                        "My child has thrived in this supportive environment. The teachers are dedicated and the curriculum is engaging.",
                    rating: 5,
                },
                {
                    name: "Sophia Lee",
                    role: "Student",
                    company: "",
                    content:
                        "The quality of education I've received has been exceptional. I feel well-prepared for my future endeavors.",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/classroom-learning.png"],
            gallery: ["/classroom-learning.png", "/student-collaboration.png", "/graduation-ceremony.png"],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/classroom-learning.png", "/student-collaboration.png"],
        },
    },
    realestate: {
        id: "realestate",
        displayName: "Real Estate",
        primaryColor: "#0F766E",
        secondaryColor: "#F0FDFA",
        accentColor: "#14B8A6",
        sections: {
            required: ["Header", "Hero", "PropertyListingSection", "Footer"],
            recommended: ["About", "Services", "Testimonials", "Contact"],
            optional: ["Team", "FAQ", "CTA"],
            industrySpecific: ["PropertyListingSection"],
        },
        content: {
            heroTitles: ["Find Your Dream Home with {{name}}", "Your Property Journey Starts with {{name}}"],
            taglines: ["Expert real estate services for buyers and sellers", "Making property dreams come true"],
            features: [
                {
                    title: "Expert Agents",
                    description: "Our experienced agents know the market inside and out.",
                    icon: "👨‍💼",
                    benefit: "Professional guidance",
                },
                {
                    title: "Extensive Listings",
                    description: "Access to a wide range of properties to suit every need.",
                    icon: "🏠",
                    benefit: "More options for you",
                },
                {
                    title: "Seamless Process",
                    description: "We handle the details to make your transaction smooth.",
                    icon: "📋",
                    benefit: "Stress-free experience",
                },
            ],
            services: [
                {
                    title: "Buying Services",
                    description: "Find the perfect property with our expert guidance.",
                    price: "Commission-based",
                    features: ["Property search", "Viewings", "Negotiation", "Closing support"],
                    icon: "🔑",
                },
                {
                    title: "Selling Services",
                    description: "Maximize your property's value and minimize hassle.",
                    price: "Commission-based",
                    features: ["Market analysis", "Professional staging", "Marketing", "Negotiation"],
                    icon: "💰",
                },
                {
                    title: "Property Management",
                    description: "Comprehensive management services for property owners.",
                    price: "Starting at $X per month",
                    features: ["Tenant screening", "Maintenance", "Rent collection", "Financial reporting"],
                    icon: "🏢",
                },
            ],
            testimonials: [
                {
                    name: "Jennifer Adams",
                    role: "Homebuyer",
                    company: "",
                    content:
                        "Our agent went above and beyond to help us find our dream home. The process was smooth from start to finish.",
                    rating: 5,
                },
                {
                    name: "Thomas Wilson",
                    role: "Property Seller",
                    company: "",
                    content:
                        "They sold our house for above asking price in just two weeks. Their marketing strategy and negotiation skills are excellent.",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/luxury-home.png"],
            gallery: ["/luxury-home.png", "/property1.png", "/property2.png", "/property3.png"],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/luxury-home.png", "/property1.png", "/property2.png"],
        },
    },
    ecommerce: {
        id: "ecommerce",
        displayName: "E-commerce",
        primaryColor: "#7C3AED",
        secondaryColor: "#F5F3FF",
        accentColor: "#8B5CF6",
        sections: {
            required: ["Header", "Hero", "Features", "Footer"],
            recommended: ["Products", "Testimonials", "CTA", "FAQ"],
            optional: ["About", "Contact", "Newsletter"],
            industrySpecific: ["Products"],
        },
        content: {
            heroTitles: ["Shop the Best at {{name}}", "Discover Quality Products at {{name}}"],
            taglines: ["Quality products, exceptional service", "Your one-stop online shop"],
            features: [
                {
                    title: "Quality Products",
                    description: "Carefully selected items that meet our high standards.",
                    icon: "✨",
                    benefit: "Satisfaction guaranteed",
                },
                {
                    title: "Fast Shipping",
                    description: "Quick delivery to get your products to you promptly.",
                    icon: "🚚",
                    benefit: "No long waits",
                },
                {
                    title: "Secure Shopping",
                    description: "Safe, encrypted transactions for your peace of mind.",
                    icon: "🔒",
                    benefit: "Shop with confidence",
                },
            ],
            services: [
                {
                    title: "Standard Shipping",
                    description: "Reliable delivery for all your purchases.",
                    price: "Starting at $4.99",
                    features: ["3-5 business days", "Order tracking", "Delivery confirmation", "Insurance included"],
                    icon: "📦",
                },
                {
                    title: "Express Shipping",
                    description: "Get your items faster with expedited delivery.",
                    price: "Starting at $9.99",
                    features: ["1-2 business days", "Priority handling", "Order tracking", "Insurance included"],
                    icon: "⚡",
                },
                {
                    title: "Premium Membership",
                    description: "Join our loyalty program for exclusive benefits.",
                    price: "$49.99/year",
                    features: ["Free shipping", "Early access", "Member discounts", "Extended returns"],
                    icon: "👑",
                },
            ],
            testimonials: [
                {
                    name: "Alex Johnson",
                    role: "Customer",
                    company: "",
                    content:
                        "The quality of the products exceeded my expectations, and the shipping was incredibly fast. Will definitely shop here again!",
                    rating: 5,
                },
                {
                    name: "Maria Garcia",
                    role: "Customer",
                    company: "",
                    content:
                        "Customer service was exceptional when I needed to exchange an item. The process was smooth and hassle-free.",
                    rating: 5,
                },
            ],
        },
        images: {
            hero: ["/ecommerce-products.png"],
            gallery: ["/ecommerce-products.png"],
            team: ["/woman-portrait.png", "/thoughtful-man-portrait.png", "/woman-portrait-2.png"],
            services: ["/ecommerce-products.png"],
        },
    },
}

// Add more industries as needed

export function getIndustryConfig(industry: string): IndustryConfig {
    const config = industryConfigs[industry.toLowerCase()]
    if (!config) {
        // Return a default config if the industry is not found
        return industryConfigs.technology
    }
    return config
}

export function getIndustryNames(): string[] {
    return Object.keys(industryConfigs)
}
