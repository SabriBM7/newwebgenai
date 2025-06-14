export interface IndustryConfig {
    name: string
    displayName: string
    description: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    components: string[]
    sections: IndustrySections
    images: IndustryImages
    content: IndustryContent
}

export interface IndustrySections {
    required: string[]
    optional: string[]
    industrySpecific: string[]
}

export interface IndustryImages {
    hero: string[]
    gallery: string[]
    services: string[]
    team: string[]
}

export interface IndustryContent {
    heroTitles: string[]
    taglines: string[]
    services: ServiceTemplate[]
    features: FeatureTemplate[]
    testimonials: TestimonialTemplate[]
}

export interface ServiceTemplate {
    title: string
    description: string
    price: string
    features: string[]
    icon: string
}

export interface FeatureTemplate {
    title: string
    description: string
    icon: string
    benefit: string
}

export interface TestimonialTemplate {
    name: string
    role: string
    company: string
    content: string
    rating: number
}

export const INDUSTRIES: Record<string, IndustryConfig> = {
    restaurant: {
        name: "restaurant",
        displayName: "Restaurant & Food Service",
        description: "Restaurants, cafes, catering, and food service businesses",
        primaryColor: "#dc2626",
        secondaryColor: "#fef2f2",
        accentColor: "#991b1b",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "MenuSection",
            "ServicesSection",
            "GallerySection",
            "EventsSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "MenuSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "GallerySection", "TestimonialsSection", "FAQSection"],
            industrySpecific: ["MenuSection", "EventsSection", "BookingSystem"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1583394293214-28a4b3a4c3e4?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Exceptional Dining Experience",
                "Authentic Flavors, Memorable Moments",
                "Where Culinary Art Meets Hospitality",
                "Fresh Ingredients, Timeless Recipes",
            ],
            taglines: [
                "Savor the difference quality makes",
                "Every meal tells a story",
                "Crafted with passion, served with pride",
                "Your table awaits",
            ],
            services: [
                {
                    title: "Fine Dining",
                    description: "Exquisite multi-course meals in an elegant atmosphere",
                    price: "From $45",
                    features: ["Seasonal Menu", "Wine Pairing", "Private Dining", "Chef's Table"],
                    icon: "🍽️",
                },
                {
                    title: "Catering Services",
                    description: "Professional catering for events and special occasions",
                    price: "From $25/person",
                    features: ["Custom Menus", "Full Service", "Event Planning", "Dietary Options"],
                    icon: "🎉",
                },
                {
                    title: "Private Events",
                    description: "Exclusive venue rental for your special celebrations",
                    price: "From $500",
                    features: ["Exclusive Access", "Custom Decor", "Dedicated Staff", "Audio/Visual"],
                    icon: "🥂",
                },
            ],
            features: [
                {
                    title: "Farm-to-Table",
                    description: "Fresh, locally sourced ingredients delivered daily",
                    icon: "🌱",
                    benefit: "Superior taste and quality",
                },
                {
                    title: "Master Chefs",
                    description: "Award-winning culinary team with decades of experience",
                    icon: "👨‍🍳",
                    benefit: "Exceptional culinary expertise",
                },
                {
                    title: "Wine Selection",
                    description: "Curated wine list featuring local and international selections",
                    icon: "🍷",
                    benefit: "Perfect pairings for every dish",
                },
            ],
            testimonials: [
                {
                    name: "Sarah Mitchell",
                    role: "Food Critic",
                    company: "Culinary Review",
                    content:
                        "An extraordinary dining experience that exceeds all expectations. The attention to detail is remarkable.",
                    rating: 5,
                },
                {
                    name: "Michael Chen",
                    role: "Event Planner",
                    company: "Elite Events",
                    content: "Their catering service made our corporate event unforgettable. Professional and delicious.",
                    rating: 5,
                },
            ],
        },
    },

    technology: {
        name: "technology",
        displayName: "Technology & Software",
        description: "Software development, IT services, and technology consulting",
        primaryColor: "#2563eb",
        secondaryColor: "#eff6ff",
        accentColor: "#1d4ed8",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ServicesSection",
            "PortfolioSection",
            "ProcessSection",
            "TeamSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ServicesSection", "PortfolioSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "ProcessSection", "TeamSection", "TestimonialsSection"],
            industrySpecific: ["PortfolioSection", "ProcessSection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Innovative Technology Solutions",
                "Transforming Ideas Into Digital Reality",
                "Your Technology Partner for Success",
                "Building Tomorrow's Software Today",
            ],
            taglines: [
                "Innovation meets execution",
                "Code that drives business forward",
                "Technology solutions that scale",
                "Your vision, our expertise",
            ],
            services: [
                {
                    title: "Custom Software Development",
                    description: "Tailored software solutions built to your exact specifications",
                    price: "From $5,000",
                    features: ["Full-Stack Development", "API Integration", "Database Design", "Testing & QA"],
                    icon: "💻",
                },
                {
                    title: "Mobile App Development",
                    description: "Native and cross-platform mobile applications",
                    price: "From $8,000",
                    features: ["iOS & Android", "React Native", "App Store Deployment", "Maintenance"],
                    icon: "📱",
                },
                {
                    title: "Cloud Solutions",
                    description: "Scalable cloud infrastructure and migration services",
                    price: "From $3,000",
                    features: ["AWS/Azure Setup", "Auto-scaling", "Security", "Monitoring"],
                    icon: "☁️",
                },
            ],
            features: [
                {
                    title: "Agile Development",
                    description: "Rapid iteration and continuous delivery for faster results",
                    icon: "⚡",
                    benefit: "Faster time to market",
                },
                {
                    title: "Scalable Architecture",
                    description: "Built to handle growth and increased demand",
                    icon: "📈",
                    benefit: "Future-proof solutions",
                },
                {
                    title: "24/7 Support",
                    description: "Round-the-clock technical support and maintenance",
                    icon: "🛠️",
                    benefit: "Peace of mind",
                },
            ],
            testimonials: [
                {
                    name: "David Rodriguez",
                    role: "CTO",
                    company: "StartupXYZ",
                    content:
                        "Their technical expertise and project management skills are exceptional. Delivered on time and budget.",
                    rating: 5,
                },
                {
                    name: "Lisa Wang",
                    role: "Product Manager",
                    company: "TechCorp",
                    content: "The mobile app they developed has been a game-changer for our business. Highly recommended.",
                    rating: 5,
                },
            ],
        },
    },

    healthcare: {
        name: "healthcare",
        displayName: "Healthcare & Medical",
        description: "Medical practices, clinics, hospitals, and healthcare services",
        primaryColor: "#059669",
        secondaryColor: "#ecfdf5",
        accentColor: "#047857",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ServicesSection",
            "TeamSection",
            "BookingSystem",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ServicesSection", "TeamSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "TestimonialsSection", "FAQSection", "StatsSection"],
            industrySpecific: ["BookingSystem", "TeamSection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Compassionate Healthcare Excellence",
                "Your Health, Our Priority",
                "Advanced Medical Care with a Personal Touch",
                "Comprehensive Healthcare Solutions",
            ],
            taglines: [
                "Caring for you and your family",
                "Excellence in medical care",
                "Your health journey starts here",
                "Trusted healthcare partners",
            ],
            services: [
                {
                    title: "Primary Care",
                    description: "Comprehensive primary healthcare for all ages",
                    price: "Insurance Accepted",
                    features: ["Annual Checkups", "Preventive Care", "Chronic Disease Management", "Health Screenings"],
                    icon: "🏥",
                },
                {
                    title: "Specialist Consultations",
                    description: "Expert care from board-certified specialists",
                    price: "Insurance Accepted",
                    features: ["Cardiology", "Dermatology", "Orthopedics", "Neurology"],
                    icon: "👩‍⚕️",
                },
                {
                    title: "Diagnostic Services",
                    description: "Advanced diagnostic imaging and laboratory services",
                    price: "Insurance Accepted",
                    features: ["X-Ray", "MRI", "CT Scan", "Blood Tests"],
                    icon: "🔬",
                },
            ],
            features: [
                {
                    title: "Board-Certified Physicians",
                    description: "Experienced doctors with specialized training and certifications",
                    icon: "👨‍⚕️",
                    benefit: "Expert medical care",
                },
                {
                    title: "State-of-the-Art Equipment",
                    description: "Latest medical technology for accurate diagnosis and treatment",
                    icon: "🏥",
                    benefit: "Precise diagnostics",
                },
                {
                    title: "Patient-Centered Care",
                    description: "Personalized treatment plans focused on your individual needs",
                    icon: "❤️",
                    benefit: "Individualized attention",
                },
            ],
            testimonials: [
                {
                    name: "Jennifer Adams",
                    role: "Patient",
                    company: "",
                    content:
                        "The care I received was exceptional. The doctors and staff made me feel comfortable and well-informed.",
                    rating: 5,
                },
                {
                    name: "Robert Thompson",
                    role: "Patient",
                    company: "",
                    content: "Professional, caring, and efficient. I trust them completely with my family's healthcare needs.",
                    rating: 5,
                },
            ],
        },
    },

    education: {
        name: "education",
        displayName: "Education & Training",
        description: "Schools, universities, training centers, and educational services",
        primaryColor: "#7c3aed",
        secondaryColor: "#f3f4f6",
        accentColor: "#5b21b6",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "CourseGrid",
            "FacultyProfiles",
            "EventsSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "CourseGrid", "FacultyProfiles", "ContactSection", "Footer"],
            optional: ["AboutSection", "EventsSection", "TestimonialsSection", "FAQSection"],
            industrySpecific: ["CourseGrid", "FacultyProfiles", "EventsSection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Empowering Minds, Shaping Futures",
                "Excellence in Education",
                "Learn, Grow, Succeed",
                "Your Educational Journey Starts Here",
            ],
            taglines: [
                "Inspiring lifelong learning",
                "Where knowledge meets opportunity",
                "Educating tomorrow's leaders",
                "Your success is our mission",
            ],
            services: [
                {
                    title: "Undergraduate Programs",
                    description: "Comprehensive bachelor's degree programs across multiple disciplines",
                    price: "Financial Aid Available",
                    features: ["Liberal Arts", "Sciences", "Business", "Engineering"],
                    icon: "🎓",
                },
                {
                    title: "Graduate Studies",
                    description: "Advanced degree programs for professional and academic advancement",
                    price: "Scholarships Available",
                    features: ["Master's Programs", "Doctoral Studies", "Professional Certificates", "Research Opportunities"],
                    icon: "📚",
                },
                {
                    title: "Continuing Education",
                    description: "Lifelong learning opportunities for working professionals",
                    price: "From $299",
                    features: ["Professional Development", "Online Courses", "Executive Education", "Skills Training"],
                    icon: "💼",
                },
            ],
            features: [
                {
                    title: "Expert Faculty",
                    description: "Renowned educators and industry professionals",
                    icon: "👨‍🏫",
                    benefit: "World-class instruction",
                },
                {
                    title: "Modern Facilities",
                    description: "State-of-the-art classrooms and laboratories",
                    icon: "🏫",
                    benefit: "Optimal learning environment",
                },
                {
                    title: "Career Services",
                    description: "Comprehensive career support and job placement assistance",
                    icon: "💼",
                    benefit: "Career success support",
                },
            ],
            testimonials: [
                {
                    name: "Emily Rodriguez",
                    role: "Graduate",
                    company: "Class of 2023",
                    content:
                        "The education I received here prepared me perfectly for my career. The faculty truly cares about student success.",
                    rating: 5,
                },
                {
                    name: "Marcus Johnson",
                    role: "Alumni",
                    company: "Software Engineer",
                    content: "The skills and knowledge I gained here have been invaluable in my professional career.",
                    rating: 5,
                },
            ],
        },
    },

    fitness: {
        name: "fitness",
        displayName: "Fitness & Wellness",
        description: "Gyms, fitness centers, personal training, and wellness services",
        primaryColor: "#ea580c",
        secondaryColor: "#fff7ed",
        accentColor: "#c2410c",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ServicesSection",
            "TeamSection",
            "GallerySection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ServicesSection", "TeamSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "GallerySection", "TestimonialsSection", "FAQSection"],
            industrySpecific: ["TeamSection", "GallerySection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Transform Your Body, Transform Your Life",
                "Achieve Your Fitness Goals",
                "Strength, Health, Confidence",
                "Your Fitness Journey Starts Here",
            ],
            taglines: ["Stronger every day", "Fitness for life", "Unleash your potential", "Train hard, live well"],
            services: [
                {
                    title: "Personal Training",
                    description: "One-on-one training sessions customized to your goals",
                    price: "From $75/session",
                    features: ["Custom Workout Plans", "Nutrition Guidance", "Progress Tracking", "Flexible Scheduling"],
                    icon: "💪",
                },
                {
                    title: "Group Classes",
                    description: "High-energy group fitness classes for all levels",
                    price: "From $20/class",
                    features: ["Yoga & Pilates", "HIIT Training", "Spin Classes", "Strength Training"],
                    icon: "👥",
                },
                {
                    title: "Wellness Programs",
                    description: "Comprehensive wellness programs for overall health",
                    price: "From $99/month",
                    features: ["Nutrition Counseling", "Stress Management", "Sleep Optimization", "Lifestyle Coaching"],
                    icon: "🧘",
                },
            ],
            features: [
                {
                    title: "Certified Trainers",
                    description: "Experienced, certified fitness professionals",
                    icon: "🏆",
                    benefit: "Expert guidance",
                },
                {
                    title: "Modern Equipment",
                    description: "State-of-the-art fitness equipment and facilities",
                    icon: "🏋️",
                    benefit: "Effective workouts",
                },
                {
                    title: "Flexible Memberships",
                    description: "Membership options to fit your schedule and budget",
                    icon: "📅",
                    benefit: "Convenient access",
                },
            ],
            testimonials: [
                {
                    name: "Jessica Martinez",
                    role: "Member",
                    company: "Fitness Enthusiast",
                    content:
                        "This gym has completely transformed my life. The trainers are amazing and the community is so supportive.",
                    rating: 5,
                },
                {
                    name: "Mike Wilson",
                    role: "Member",
                    company: "Athlete",
                    content:
                        "The variety of classes and equipment is incredible. I love that there's always something new to try.",
                    rating: 5,
                },
            ],
        },
    },

    realestate: {
        name: "realestate",
        displayName: "Real Estate",
        description: "Real estate agencies, property management, and real estate services",
        primaryColor: "#0891b2",
        secondaryColor: "#ecfeff",
        accentColor: "#0e7490",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "PropertyListingSection",
            "ServicesSection",
            "TeamSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "PropertyListingSection", "ServicesSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "TeamSection", "TestimonialsSection", "FAQSection"],
            industrySpecific: ["PropertyListingSection", "TeamSection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Your Dream Home Awaits",
                "Expert Real Estate Services",
                "Find Your Perfect Property",
                "Your Trusted Real Estate Partner",
            ],
            taglines: [
                "Making dreams come home",
                "Your property, our expertise",
                "Where home begins",
                "Real estate made simple",
            ],
            services: [
                {
                    title: "Home Buying",
                    description: "Expert guidance through the home buying process",
                    price: "Commission-based",
                    features: ["Property Search", "Market Analysis", "Negotiation", "Closing Support"],
                    icon: "🏠",
                },
                {
                    title: "Home Selling",
                    description: "Maximize your home's value with our proven strategies",
                    price: "Commission-based",
                    features: ["Home Valuation", "Marketing Strategy", "Professional Photography", "Negotiation"],
                    icon: "💰",
                },
                {
                    title: "Property Management",
                    description: "Full-service property management for investors",
                    price: "From 8% of rent",
                    features: ["Tenant Screening", "Rent Collection", "Maintenance", "Financial Reporting"],
                    icon: "🔑",
                },
            ],
            features: [
                {
                    title: "Local Market Expertise",
                    description: "Deep knowledge of local neighborhoods and market trends",
                    icon: "📍",
                    benefit: "Informed decisions",
                },
                {
                    title: "Professional Network",
                    description: "Connections with lenders, inspectors, and contractors",
                    icon: "🤝",
                    benefit: "Smooth transactions",
                },
                {
                    title: "Marketing Excellence",
                    description: "Professional photography and comprehensive marketing",
                    icon: "📸",
                    benefit: "Maximum exposure",
                },
            ],
            testimonials: [
                {
                    name: "Tom and Lisa Johnson",
                    role: "Home Buyers",
                    company: "",
                    content:
                        "They made buying our first home stress-free and enjoyable. Their knowledge of the market was invaluable.",
                    rating: 5,
                },
                {
                    name: "Robert Chen",
                    role: "Home Seller",
                    company: "",
                    content: "Sold our home in just 10 days for above asking price! Their marketing strategy was exceptional.",
                    rating: 5,
                },
            ],
        },
    },

    ecommerce: {
        name: "ecommerce",
        displayName: "E-commerce & Retail",
        description: "Online stores, retail businesses, and e-commerce platforms",
        primaryColor: "#7c2d12",
        secondaryColor: "#fef7ff",
        accentColor: "#92400e",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ProductGrid",
            "ServicesSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ProductGrid", "ServicesSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "TestimonialsSection", "FAQSection", "StatsSection"],
            industrySpecific: ["ProductGrid", "ShoppingCart"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Shop the Latest Trends",
                "Quality Products, Exceptional Service",
                "Your One-Stop Shopping Destination",
                "Discover Amazing Products",
            ],
            taglines: [
                "Quality you can trust",
                "Shop with confidence",
                "Where style meets value",
                "Your satisfaction guaranteed",
            ],
            services: [
                {
                    title: "Online Shopping",
                    description: "Browse and purchase from our extensive product catalog",
                    price: "Free Shipping $50+",
                    features: ["Secure Checkout", "Multiple Payment Options", "Order Tracking", "Easy Returns"],
                    icon: "🛒",
                },
                {
                    title: "Customer Support",
                    description: "Dedicated customer service for all your shopping needs",
                    price: "Free",
                    features: ["Live Chat", "Phone Support", "Email Support", "FAQ Resources"],
                    icon: "💬",
                },
                {
                    title: "Premium Membership",
                    description: "Exclusive benefits and early access to new products",
                    price: "$99/year",
                    features: ["Free Shipping", "Exclusive Discounts", "Early Access", "Priority Support"],
                    icon: "⭐",
                },
            ],
            features: [
                {
                    title: "Quality Products",
                    description: "Carefully curated selection of high-quality items",
                    icon: "✨",
                    benefit: "Value for money",
                },
                {
                    title: "Fast Shipping",
                    description: "Quick and reliable delivery to your doorstep",
                    icon: "🚚",
                    benefit: "Convenient shopping",
                },
                {
                    title: "Easy Returns",
                    description: "Hassle-free return policy for your peace of mind",
                    icon: "↩️",
                    benefit: "Risk-free shopping",
                },
            ],
            testimonials: [
                {
                    name: "Amanda Foster",
                    role: "Customer",
                    company: "",
                    content:
                        "Amazing products and fast shipping! The quality exceeded my expectations. Will definitely shop here again.",
                    rating: 5,
                },
                {
                    name: "Mark Thompson",
                    role: "Customer",
                    company: "",
                    content: "Great customer service and easy returns. They really care about customer satisfaction.",
                    rating: 5,
                },
            ],
        },
    },

    legal: {
        name: "legal",
        displayName: "Legal Services",
        description: "Law firms, legal consultants, and legal service providers",
        primaryColor: "#1f2937",
        secondaryColor: "#f9fafb",
        accentColor: "#374151",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ServicesSection",
            "TeamSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ServicesSection", "TeamSection", "ContactSection", "Footer"],
            optional: ["AboutSection", "TestimonialsSection", "FAQSection", "StatsSection"],
            industrySpecific: ["TeamSection"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Experienced Legal Representation",
                "Protecting Your Rights and Interests",
                "Expert Legal Counsel You Can Trust",
                "Your Legal Advocates",
            ],
            taglines: [
                "Justice through expertise",
                "Your rights, our mission",
                "Legal excellence, personal service",
                "Defending what matters most",
            ],
            services: [
                {
                    title: "Personal Injury",
                    description: "Aggressive representation for accident victims",
                    price: "Contingency Fee",
                    features: ["Car Accidents", "Medical Malpractice", "Workplace Injuries", "Wrongful Death"],
                    icon: "⚖️",
                },
                {
                    title: "Business Law",
                    description: "Comprehensive legal services for businesses",
                    price: "Hourly Rate",
                    features: ["Contract Law", "Corporate Formation", "Employment Law", "Litigation"],
                    icon: "🏢",
                },
                {
                    title: "Family Law",
                    description: "Compassionate guidance through family legal matters",
                    price: "Flat Fee Available",
                    features: ["Divorce", "Child Custody", "Adoption", "Domestic Relations"],
                    icon: "👨‍👩‍👧‍👦",
                },
            ],
            features: [
                {
                    title: "Experienced Attorneys",
                    description: "Seasoned lawyers with proven track records",
                    icon: "🎓",
                    benefit: "Expert representation",
                },
                {
                    title: "Personalized Service",
                    description: "Individual attention and customized legal strategies",
                    icon: "🤝",
                    benefit: "Tailored solutions",
                },
                {
                    title: "Proven Results",
                    description: "Successful outcomes and satisfied clients",
                    icon: "🏆",
                    benefit: "Track record of success",
                },
            ],
            testimonials: [
                {
                    name: "John Patterson",
                    role: "Personal Injury Client",
                    company: "",
                    content: "They fought tirelessly for my case and secured a settlement that exceeded my expectations.",
                    rating: 5,
                },
                {
                    name: "Sarah Business Owner",
                    role: "Business Client",
                    company: "",
                    content:
                        "Excellent legal counsel for our company. They understand business needs and provide practical solutions.",
                    rating: 5,
                },
            ],
        },
    },

    finance: {
        name: "finance",
        displayName: "Financial Services",
        description: "Financial advisors, accounting firms, and financial service providers",
        primaryColor: "#1e40af",
        secondaryColor: "#eff6ff",
        accentColor: "#1d4ed8",
        components: [
            "Header",
            "BusinessHero",
            "ValueProposition",
            "AboutSection",
            "ServicesSection",
            "ServicePackages",
            "CalculatorTools",
            "TeamSection",
            "TestimonialsSection",
            "StatsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            required: ["Header", "BusinessHero", "ServicesSection", "ServicePackages", "ContactSection", "Footer"],
            optional: ["AboutSection", "CalculatorTools", "TeamSection", "TestimonialsSection"],
            industrySpecific: ["ServicePackages", "CalculatorTools"],
        },
        images: {
            hero: [
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
            ],
            gallery: [
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            ],
            services: [
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            ],
            team: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop",
            ],
        },
        content: {
            heroTitles: [
                "Secure Your Financial Future",
                "Expert Financial Guidance",
                "Your Wealth Management Partner",
                "Financial Planning Made Simple",
            ],
            taglines: [
                "Your financial success, our expertise",
                "Building wealth, securing futures",
                "Smart money, smart choices",
                "Financial freedom starts here",
            ],
            services: [
                {
                    title: "Financial Planning",
                    description: "Comprehensive financial planning for your future",
                    price: "From $500",
                    features: ["Retirement Planning", "Investment Strategy", "Tax Planning", "Estate Planning"],
                    icon: "📊",
                },
                {
                    title: "Investment Management",
                    description: "Professional portfolio management and investment advice",
                    price: "1% of AUM",
                    features: ["Portfolio Management", "Risk Assessment", "Asset Allocation", "Performance Monitoring"],
                    icon: "📈",
                },
                {
                    title: "Tax Services",
                    description: "Expert tax preparation and planning services",
                    price: "From $200",
                    features: ["Tax Preparation", "Tax Planning", "IRS Representation", "Business Taxes"],
                    icon: "📋",
                },
            ],
            features: [
                {
                    title: "Certified Professionals",
                    description: "CFP, CPA, and other certified financial professionals",
                    icon: "🎓",
                    benefit: "Expert credentials",
                },
                {
                    title: "Personalized Strategies",
                    description: "Customized financial plans based on your unique goals",
                    icon: "🎯",
                    benefit: "Tailored approach",
                },
                {
                    title: "Ongoing Support",
                    description: "Regular reviews and adjustments to keep you on track",
                    icon: "🤝",
                    benefit: "Continuous guidance",
                },
            ],
            testimonials: [
                {
                    name: "Michael Davis",
                    role: "Retiree",
                    company: "",
                    content:
                        "Their retirement planning expertise helped me retire comfortably. I couldn't have done it without their guidance.",
                    rating: 5,
                },
                {
                    name: "Jennifer Wilson",
                    role: "Business Owner",
                    company: "",
                    content:
                        "Excellent tax planning and investment advice. They've saved me thousands and helped grow my wealth.",
                    rating: 5,
                },
            ],
        },
    },
}

export function getIndustryConfig(industry: string): IndustryConfig {
    return INDUSTRIES[industry] || INDUSTRIES.technology
}

export function getAllIndustries(): IndustryConfig[] {
    return Object.values(INDUSTRIES)
}

export function getIndustryNames(): string[] {
    return Object.keys(INDUSTRIES)
}
