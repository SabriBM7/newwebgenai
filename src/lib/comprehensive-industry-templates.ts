import { ImageService } from "./image-service"

interface IndustryTemplate {
    components: string[]
    sections: Record<string, any>
    recommendations: string[]
}

const industryTemplates: Record<string, IndustryTemplate> = {
    restaurant: {
        components: [
            "Header",
            "HeroSection",
            "AboutSection",
            "MenuSection",
            "GallerySection",
            "EventsSection",
            "TestimonialsSection",
            "ReservationSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            menu: {
                categories: ["Appetizers", "Main Courses", "Desserts", "Beverages"],
                includePhotos: true,
                includePrices: true,
                includeDescriptions: true,
            },
            events: {
                types: ["Special Dinners", "Cooking Classes", "Wine Tastings", "Holiday Events"],
                includeCalendar: true,
            },
            gallery: {
                categories: ["Food", "Interior", "Events", "Staff"],
                layout: "grid",
            },
        },
        recommendations: [
            "Include high-quality food photography",
            "Feature chef background and expertise",
            "Highlight signature dishes",
            "Include reservation system",
            "Show restaurant atmosphere with gallery",
        ],
    },
    technology: {
        components: [
            "Header",
            "HeroSection",
            "ServicesSection",
            "PortfolioSection",
            "ProcessSection",
            "TeamSection",
            "TestimonialsSection",
            "FAQSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            portfolio: {
                categories: ["Web Development", "Mobile Apps", "AI Solutions", "Cloud Services"],
                includeResults: true,
                includeClientInfo: true,
            },
            process: {
                steps: ["Discovery", "Planning", "Design", "Development", "Testing", "Deployment", "Maintenance"],
                includeTimeline: true,
            },
            services: {
                layout: "cards",
                includeIcons: true,
            },
        },
        recommendations: [
            "Showcase technical expertise with case studies",
            "Include client testimonials with company logos",
            "Explain development process with visual timeline",
            "Feature team members with their specializations",
            "Include interactive portfolio with filters",
        ],
    },
    healthcare: {
        components: [
            "Header",
            "HeroSection",
            "ServicesSection",
            "TeamSection",
            "ProcessSection",
            "TestimonialsSection",
            "FAQSection",
            "AppointmentSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            services: {
                categories: ["Preventive Care", "Specialized Services", "Treatments", "Resources"],
                includeDetails: true,
            },
            team: {
                includeCredentials: true,
                includeSpecialties: true,
                includePhotos: true,
            },
            appointment: {
                includeCalendar: true,
                includeInsuranceInfo: true,
            },
        },
        recommendations: [
            "Ensure HIPAA compliance in all forms",
            "Include provider credentials and specialties",
            "Feature patient testimonials (with permission)",
            "Provide clear appointment booking process",
            "Include insurance information and patient resources",
        ],
    },
    education: {
        components: [
            "Header",
            "HeroSection",
            "AboutSection",
            "CoursesSection",
            "FacultySection",
            "EventsSection",
            "GallerySection",
            "TestimonialsSection",
            "ContactSection",
            "Footer",
        ],
        sections: {
            courses: {
                categories: ["Undergraduate", "Graduate", "Professional", "Online"],
                includeDetails: true,
                includeRequirements: true,
            },
            faculty: {
                includeDepartments: true,
                includeCredentials: true,
                includeResearch: true,
            },
            events: {
                types: ["Lectures", "Workshops", "Open Houses", "Conferences"],
                includeCalendar: true,
            },
        },
        recommendations: [
            "Feature student success stories",
            "Include virtual campus tour",
            "Highlight faculty achievements",
            "Showcase campus facilities with gallery",
            "Include clear admission process",
        ],
    },
    // Add more industries as needed
}

export function getIndustryTemplate(industry: string): IndustryTemplate {
    // Return the template for the specified industry, or a default template
    return (
        industryTemplates[industry] || {
            components: [
                "Header",
                "HeroSection",
                "AboutSection",
                "ServicesSection",
                "TestimonialsSection",
                "ContactSection",
                "Footer",
            ],
            sections: {},
            recommendations: [
                "Include clear service descriptions",
                "Feature customer testimonials",
                "Highlight company values and mission",
                "Include clear call-to-action buttons",
                "Ensure mobile-friendly design",
            ],
        }
    )
}

export class IndustryTemplateGenerator {
    static generate(industry: string, businessName: string, description: string): IndustryTemplate {
        const images = ImageService.getIndustryImages(industry)

        switch (industry) {
            case "restaurant":
                return this.generateRestaurantTemplate(businessName, description, images)
            case "healthcare":
                return this.generateHealthcareTemplate(businessName, description, images)
            case "fitness":
                return this.generateFitnessTemplate(businessName, description, images)
            case "beauty":
                return this.generateBeautyTemplate(businessName, description, images)
            case "legal":
                return this.generateLegalTemplate(businessName, description, images)
            case "realestate":
                return this.generateRealEstateTemplate(businessName, description, images)
            case "technology":
                return this.generateTechnologyTemplate(businessName, description, images)
            case "education":
                return this.generateEducationTemplate(businessName, description, images)
            case "photography":
                return this.generatePhotographyTemplate(businessName, description, images)
            case "consulting":
                return this.generateConsultingTemplate(businessName, description, images)
            default:
                return this.generateTechnologyTemplate(businessName, description, images)
        }
    }

    private static generateRestaurantTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Exceptional Dining Experience",
            description,
            hero: {
                title: `Welcome to ${name}`,
                subtitle:
                    "Experience culinary excellence with fresh ingredients and authentic flavors in an elegant atmosphere",
                cta: "Reserve Your Table",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Menu", "About", "Gallery", "Reservations", "Contact"],
            features: [
                {
                    title: "Fresh Ingredients",
                    description: "We source the finest local and seasonal ingredients for every dish",
                    icon: "🌿",
                },
                {
                    title: "Expert Chefs",
                    description: "Our culinary team brings years of experience and passion to every plate",
                    icon: "👨‍🍳",
                },
                {
                    title: "Elegant Atmosphere",
                    description: "Enjoy your meal in our beautifully designed dining space",
                    icon: "✨",
                },
            ],
            about: {
                title: "Our Culinary Story",
                content:
                    "Founded with a passion for exceptional cuisine, we've been serving our community with authentic flavors and warm hospitality. Our commitment to quality ingredients and innovative cooking techniques has made us a beloved dining destination.",
                stats: [
                    { number: "15+", label: "Years of Excellence" },
                    { number: "50K+", label: "Happy Customers" },
                    { number: "200+", label: "Signature Dishes" },
                    { number: "4.9", label: "Average Rating" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Fine Dining",
                    description: "Exquisite multi-course meals crafted with precision and artistry",
                    image: images.gallery1,
                    features: ["Seasonal Menu", "Wine Pairing", "Private Dining", "Chef's Table"],
                },
                {
                    title: "Catering Services",
                    description: "Bring our exceptional cuisine to your special events and celebrations",
                    image: images.gallery2,
                    features: ["Corporate Events", "Weddings", "Private Parties", "Custom Menus"],
                },
                {
                    title: "Cooking Classes",
                    description: "Learn from our expert chefs in hands-on culinary workshops",
                    image: images.gallery3,
                    features: ["Beginner Classes", "Advanced Techniques", "Group Sessions", "Private Lessons"],
                },
            ],
            testimonials: [
                {
                    name: "Sarah Johnson",
                    role: "Food Critic",
                    content:
                        "An absolutely incredible dining experience. The attention to detail and flavor combinations are extraordinary.",
                    rating: 5,
                },
                {
                    name: "Michael Chen",
                    role: "Regular Customer",
                    content:
                        "This is our go-to restaurant for special occasions. The service is impeccable and the food is consistently amazing.",
                    rating: 5,
                },
                {
                    name: "Emily Rodriguez",
                    role: "Event Planner",
                    content:
                        "Their catering service made our corporate event unforgettable. Professional, delicious, and beautifully presented.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Chef Alessandro",
                    role: "Executive Chef",
                    bio: "With over 20 years of culinary experience, Chef Alessandro brings authentic Italian techniques and innovative flair to every dish.",
                    image: images.team,
                },
            ],
            gallery: [
                { title: "Signature Dishes", image: images.gallery1, description: "Our most popular creations" },
                { title: "Fresh Ingredients", image: images.gallery2, description: "Quality you can taste" },
                { title: "Wine Selection", image: images.gallery3, description: "Curated pairings" },
                { title: "Dessert Menu", image: images.gallery4, description: "Sweet endings" },
            ],
            faq: [
                {
                    question: "Do you take reservations?",
                    answer:
                        "Yes, we highly recommend making reservations, especially for dinner service and weekends. You can book online or call us directly.",
                },
                {
                    question: "Do you accommodate dietary restrictions?",
                    answer:
                        "We offer vegetarian, vegan, gluten-free, and other dietary options. Please inform us of any allergies when making your reservation.",
                },
                {
                    question: "Is there parking available?",
                    answer: "Yes, we have complimentary valet parking available for all guests during dinner hours.",
                },
                {
                    question: "Do you offer private dining?",
                    answer:
                        "Yes, we have private dining rooms available for special events, business meetings, and celebrations. Contact us for availability and pricing.",
                },
            ],
            contact: {
                title: "Visit Us Today",
                subtitle: "Experience exceptional dining in the heart of the city",
                phone: "(555) 123-4567",
                email: "reservations@restaurant.com",
                address: "123 Culinary Street, Downtown District",
                hours: "Tue-Sun: 5:00 PM - 10:00 PM",
            },
            cta: {
                title: "Ready for an Unforgettable Meal?",
                subtitle: "Book your table today and experience culinary excellence",
                buttonText: "Make Reservation",
            },
        }
    }

    private static generateHealthcareTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Compassionate Care, Advanced Medicine",
            description,
            hero: {
                title: `${name} Medical Center`,
                subtitle: "Providing comprehensive healthcare services with cutting-edge technology and compassionate care",
                cta: "Schedule Appointment",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Services", "Providers", "Patients", "About", "Contact"],
            features: [
                {
                    title: "Expert Physicians",
                    description: "Board-certified doctors with specialized training and years of experience",
                    icon: "👨‍⚕️",
                },
                {
                    title: "Advanced Technology",
                    description: "State-of-the-art medical equipment for accurate diagnosis and treatment",
                    icon: "🔬",
                },
                {
                    title: "Comprehensive Care",
                    description: "Full range of medical services from prevention to specialized treatment",
                    icon: "🏥",
                },
            ],
            about: {
                title: "Dedicated to Your Health",
                content:
                    "For over two decades, we've been committed to providing exceptional healthcare services to our community. Our team of experienced physicians and healthcare professionals work together to ensure you receive the best possible care.",
                stats: [
                    { number: "25+", label: "Years of Service" },
                    { number: "15K+", label: "Patients Served" },
                    { number: "50+", label: "Medical Specialists" },
                    { number: "98%", label: "Patient Satisfaction" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Primary Care",
                    description: "Comprehensive primary healthcare services for patients of all ages",
                    image: images.services1,
                    features: ["Annual Checkups", "Preventive Care", "Chronic Disease Management", "Health Screenings"],
                },
                {
                    title: "Specialized Medicine",
                    description: "Expert care from board-certified specialists in various medical fields",
                    image: images.services2,
                    features: ["Cardiology", "Orthopedics", "Neurology", "Gastroenterology"],
                },
                {
                    title: "Emergency Services",
                    description: "24/7 emergency care with rapid response and advanced life support",
                    image: images.services3,
                    features: ["Emergency Room", "Urgent Care", "Trauma Center", "Critical Care"],
                },
            ],
            testimonials: [
                {
                    name: "Robert Thompson",
                    role: "Patient",
                    content:
                        "The care I received was exceptional. The doctors took time to explain everything and made me feel comfortable throughout my treatment.",
                    rating: 5,
                },
                {
                    name: "Maria Gonzalez",
                    role: "Patient",
                    content:
                        "Professional, caring, and efficient. The entire staff goes above and beyond to ensure patient comfort and care.",
                    rating: 5,
                },
                {
                    name: "David Kim",
                    role: "Patient",
                    content:
                        "State-of-the-art facilities and knowledgeable physicians. I trust them completely with my family's healthcare needs.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Dr. Sarah Williams",
                    role: "Chief of Medicine",
                    bio: "Dr. Williams brings over 15 years of experience in internal medicine and has been recognized for her excellence in patient care.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "How do I schedule an appointment?",
                    answer:
                        "You can schedule appointments online through our patient portal, call our office, or visit us in person. We offer same-day appointments for urgent needs.",
                },
                {
                    question: "What insurance plans do you accept?",
                    answer:
                        "We accept most major insurance plans. Please contact our billing department to verify your specific coverage and benefits.",
                },
                {
                    question: "Do you offer telemedicine services?",
                    answer:
                        "Yes, we provide virtual consultations for appropriate medical conditions. This allows you to receive care from the comfort of your home.",
                },
                {
                    question: "What should I bring to my appointment?",
                    answer:
                        "Please bring a valid ID, insurance card, list of current medications, and any relevant medical records or test results.",
                },
            ],
            contact: {
                title: "Schedule Your Appointment",
                subtitle: "Take the first step towards better health",
                phone: "(555) 234-5678",
                email: "appointments@healthcare.com",
                address: "456 Medical Plaza, Health District",
                hours: "Mon-Fri: 7:00 AM - 7:00 PM, Sat: 8:00 AM - 4:00 PM",
            },
            cta: {
                title: "Your Health is Our Priority",
                subtitle: "Schedule your appointment today and experience compassionate, expert care",
                buttonText: "Book Appointment",
            },
        }
    }

    private static generateFitnessTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Transform Your Body, Transform Your Life",
            description,
            hero: {
                title: `Welcome to ${name}`,
                subtitle: "Achieve your fitness goals with expert training, modern equipment, and a supportive community",
                cta: "Start Your Journey",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Programs", "Trainers", "Classes", "Membership", "Contact"],
            features: [
                {
                    title: "Expert Trainers",
                    description: "Certified personal trainers dedicated to helping you reach your fitness goals",
                    icon: "💪",
                },
                {
                    title: "Modern Equipment",
                    description: "State-of-the-art fitness equipment for all your workout needs",
                    icon: "🏋️",
                },
                {
                    title: "Group Classes",
                    description: "Energizing group fitness classes for all fitness levels",
                    icon: "👥",
                },
            ],
            about: {
                title: "Your Fitness Journey Starts Here",
                content:
                    "We're more than just a gym - we're a community dedicated to helping you achieve your health and fitness goals. With expert trainers, cutting-edge equipment, and a supportive environment, we make fitness accessible and enjoyable for everyone.",
                stats: [
                    { number: "10+", label: "Years of Excellence" },
                    { number: "5K+", label: "Members Strong" },
                    { number: "30+", label: "Expert Trainers" },
                    { number: "100+", label: "Classes per Week" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Personal Training",
                    description: "One-on-one training sessions customized to your specific goals and fitness level",
                    image: images.programs1,
                    features: ["Custom Workout Plans", "Nutrition Guidance", "Progress Tracking", "Flexible Scheduling"],
                },
                {
                    title: "Group Fitness",
                    description: "High-energy group classes that make working out fun and motivating",
                    image: images.programs2,
                    features: ["Yoga & Pilates", "HIIT Training", "Spin Classes", "Strength Training"],
                },
                {
                    title: "Wellness Programs",
                    description: "Comprehensive wellness programs focusing on overall health and lifestyle",
                    image: images.programs3,
                    features: ["Nutrition Counseling", "Stress Management", "Sleep Optimization", "Lifestyle Coaching"],
                },
            ],
            testimonials: [
                {
                    name: "Jennifer Adams",
                    role: "Member since 2022",
                    content:
                        "This gym has completely transformed my life. The trainers are amazing and the community is so supportive. I've never felt stronger!",
                    rating: 5,
                },
                {
                    name: "Mark Wilson",
                    role: "Member since 2021",
                    content:
                        "The variety of classes and equipment is incredible. I love that there's always something new to try and the staff is always helpful.",
                    rating: 5,
                },
                {
                    name: "Lisa Chen",
                    role: "Member since 2023",
                    content:
                        "Clean facilities, great equipment, and fantastic trainers. The personal training sessions have helped me reach goals I never thought possible.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Mike Rodriguez",
                    role: "Head Trainer",
                    bio: "Certified personal trainer with 8 years of experience specializing in strength training and athletic performance.",
                    image: images.trainers,
                },
            ],
            faq: [
                {
                    question: "What membership options do you offer?",
                    answer:
                        "We offer flexible membership plans including monthly, annual, and day passes. All memberships include access to equipment, locker rooms, and basic group classes.",
                },
                {
                    question: "Do you offer a free trial?",
                    answer:
                        "Yes! We offer a complimentary 3-day trial membership so you can experience our facilities and classes before committing.",
                },
                {
                    question: "What are your operating hours?",
                    answer:
                        "We're open Monday-Friday 5:00 AM - 11:00 PM, Saturday-Sunday 6:00 AM - 10:00 PM. Members have 24/7 access with key card.",
                },
                {
                    question: "Do you provide personal training?",
                    answer:
                        "Our certified personal trainers offer customized training programs. Contact us to schedule a consultation and discuss your fitness goals.",
                },
            ],
            contact: {
                title: "Ready to Start Your Fitness Journey?",
                subtitle: "Join our community and transform your life",
                phone: "(555) 345-6789",
                email: "info@fitnesscenter.com",
                address: "789 Fitness Avenue, Wellness District",
                hours: "Mon-Fri: 5:00 AM - 11:00 PM, Weekends: 6:00 AM - 10:00 PM",
            },
            cta: {
                title: "Transform Your Life Today",
                subtitle: "Join thousands who have achieved their fitness goals with us",
                buttonText: "Get Started Now",
            },
        }
    }

    private static generateBeautyTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Enhance Your Natural Beauty",
            description,
            hero: {
                title: `${name} Spa & Beauty`,
                subtitle: "Indulge in luxurious treatments designed to rejuvenate your body, mind, and spirit",
                cta: "Book Your Treatment",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Services", "Treatments", "Products", "About", "Contact"],
            features: [
                {
                    title: "Expert Therapists",
                    description: "Licensed professionals with years of experience in beauty and wellness",
                    icon: "💆‍♀️",
                },
                {
                    title: "Premium Products",
                    description: "High-quality, organic products for the best treatment results",
                    icon: "🌿",
                },
                {
                    title: "Relaxing Environment",
                    description: "Tranquil spa atmosphere designed for ultimate relaxation",
                    icon: "✨",
                },
            ],
            about: {
                title: "Your Wellness Sanctuary",
                content:
                    "Step into our serene spa environment where beauty meets wellness. Our team of skilled therapists and aestheticians are dedicated to providing you with personalized treatments that enhance your natural beauty and promote overall well-being.",
                stats: [
                    { number: "12+", label: "Years of Excellence" },
                    { number: "8K+", label: "Happy Clients" },
                    { number: "25+", label: "Treatment Options" },
                    { number: "4.9", label: "Client Rating" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Facial Treatments",
                    description: "Customized facial treatments for all skin types and concerns",
                    image: images.services1,
                    features: ["Anti-Aging Facials", "Acne Treatment", "Hydrating Facials", "Chemical Peels"],
                },
                {
                    title: "Body Treatments",
                    description: "Relaxing and rejuvenating body treatments for complete wellness",
                    image: images.services2,
                    features: ["Massage Therapy", "Body Wraps", "Exfoliation", "Aromatherapy"],
                },
                {
                    title: "Beauty Services",
                    description: "Professional beauty services to enhance your natural features",
                    image: images.services3,
                    features: ["Manicure & Pedicure", "Eyebrow Shaping", "Lash Extensions", "Makeup Application"],
                },
            ],
            testimonials: [
                {
                    name: "Amanda Foster",
                    role: "Regular Client",
                    content:
                        "This spa is my sanctuary! The treatments are amazing and the staff always makes me feel pampered and relaxed.",
                    rating: 5,
                },
                {
                    name: "Rachel Green",
                    role: "Bride",
                    content:
                        "They made me look absolutely radiant for my wedding day. The attention to detail and care was exceptional.",
                    rating: 5,
                },
                {
                    name: "Sophie Martinez",
                    role: "Beauty Enthusiast",
                    content:
                        "The best spa experience I've ever had. Professional, relaxing, and the results speak for themselves!",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Elena Vasquez",
                    role: "Lead Aesthetician",
                    bio: "Licensed aesthetician with 10+ years of experience specializing in advanced skincare treatments and anti-aging therapies.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "How far in advance should I book?",
                    answer:
                        "We recommend booking 1-2 weeks in advance, especially for weekend appointments. However, we often have same-day availability for certain treatments.",
                },
                {
                    question: "What should I expect during my first visit?",
                    answer:
                        "Your first visit includes a consultation to discuss your skin concerns and goals. We'll recommend the best treatments for your needs and skin type.",
                },
                {
                    question: "Do you offer package deals?",
                    answer:
                        "Yes! We offer various treatment packages and membership options that provide significant savings for regular clients.",
                },
                {
                    question: "What products do you use?",
                    answer:
                        "We use premium, professional-grade products from leading skincare brands, many of which are organic and cruelty-free.",
                },
            ],
            contact: {
                title: "Book Your Relaxation Experience",
                subtitle: "Treat yourself to the luxury you deserve",
                phone: "(555) 456-7890",
                email: "bookings@beautyspa.com",
                address: "321 Serenity Lane, Wellness Quarter",
                hours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
            },
            cta: {
                title: "Ready to Glow?",
                subtitle: "Book your treatment today and discover your most beautiful self",
                buttonText: "Schedule Treatment",
            },
        }
    }

    private static generateLegalTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Experienced Legal Representation",
            description,
            hero: {
                title: `${name} Law Firm`,
                subtitle: "Providing expert legal counsel and aggressive representation for your most important matters",
                cta: "Free Consultation",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Practice Areas", "Attorneys", "Results", "About", "Contact"],
            features: [
                {
                    title: "Experienced Attorneys",
                    description: "Seasoned lawyers with proven track records in their practice areas",
                    icon: "⚖️",
                },
                {
                    title: "Personalized Service",
                    description: "Individual attention and customized legal strategies for each client",
                    icon: "🤝",
                },
                {
                    title: "Proven Results",
                    description: "Successful outcomes and satisfied clients across all practice areas",
                    icon: "🏆",
                },
            ],
            about: {
                title: "Committed to Justice",
                content:
                    "For over three decades, our law firm has been dedicated to providing exceptional legal representation to individuals and businesses. We combine legal expertise with personal attention to achieve the best possible outcomes for our clients.",
                stats: [
                    { number: "30+", label: "Years of Experience" },
                    { number: "2K+", label: "Cases Won" },
                    { number: "15+", label: "Practice Areas" },
                    { number: "95%", label: "Client Satisfaction" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Personal Injury",
                    description: "Aggressive representation for accident victims and their families",
                    image: images.practice1,
                    features: ["Car Accidents", "Medical Malpractice", "Workplace Injuries", "Wrongful Death"],
                },
                {
                    title: "Business Law",
                    description: "Comprehensive legal services for businesses of all sizes",
                    image: images.practice2,
                    features: ["Contract Law", "Corporate Formation", "Employment Law", "Litigation"],
                },
                {
                    title: "Family Law",
                    description: "Compassionate guidance through difficult family legal matters",
                    image: images.practice3,
                    features: ["Divorce", "Child Custody", "Adoption", "Domestic Relations"],
                },
            ],
            testimonials: [
                {
                    name: "John Patterson",
                    role: "Personal Injury Client",
                    content:
                        "They fought tirelessly for my case and secured a settlement that exceeded my expectations. Professional and caring throughout the process.",
                    rating: 5,
                },
                {
                    name: "Sarah Business Owner",
                    role: "Business Client",
                    content:
                        "Excellent legal counsel for our company. They understand business needs and provide practical, effective solutions.",
                    rating: 5,
                },
                {
                    name: "Maria Rodriguez",
                    role: "Family Law Client",
                    content:
                        "During a difficult divorce, they provided both legal expertise and emotional support. I couldn't have asked for better representation.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Attorney James Mitchell",
                    role: "Senior Partner",
                    bio: "With over 25 years of experience, James specializes in personal injury and has recovered millions for his clients.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "Do you offer free consultations?",
                    answer:
                        "Yes, we provide free initial consultations for most practice areas. This allows us to evaluate your case and discuss your legal options.",
                },
                {
                    question: "How do you charge for legal services?",
                    answer:
                        "Our fee structure varies by practice area. Personal injury cases are handled on contingency, while other matters may be hourly or flat fee.",
                },
                {
                    question: "How long will my case take?",
                    answer:
                        "Case duration varies depending on complexity and type. We'll provide realistic timelines during your consultation and keep you updated throughout.",
                },
                {
                    question: "Will I work directly with an attorney?",
                    answer:
                        "Yes, you'll have direct access to your attorney throughout your case. We believe in personal attention and clear communication.",
                },
            ],
            contact: {
                title: "Get the Legal Help You Need",
                subtitle: "Schedule your free consultation today",
                phone: "(555) 567-8901",
                email: "info@lawfirm.com",
                address: "654 Justice Boulevard, Legal District",
                hours: "Mon-Fri: 8:00 AM - 6:00 PM, Emergency consultations available",
            },
            cta: {
                title: "Protect Your Rights",
                subtitle: "Don't wait - contact us today for experienced legal representation",
                buttonText: "Free Consultation",
            },
        }
    }

    private static generateRealEstateTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Your Dream Home Awaits",
            description,
            hero: {
                title: `${name} Real Estate`,
                subtitle: "Expert guidance for buying, selling, and investing in real estate with personalized service",
                cta: "Find Your Home",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Buy", "Sell", "Properties", "Agents", "Contact"],
            features: [
                {
                    title: "Local Expertise",
                    description: "Deep knowledge of local markets and neighborhoods",
                    icon: "🏠",
                },
                {
                    title: "Full Service",
                    description: "Complete real estate services from search to closing",
                    icon: "🔑",
                },
                {
                    title: "Proven Results",
                    description: "Track record of successful transactions and satisfied clients",
                    icon: "📈",
                },
            ],
            about: {
                title: "Your Trusted Real Estate Partner",
                content:
                    "With decades of combined experience in the local real estate market, our team is dedicated to helping you achieve your property goals. Whether buying your first home or selling an investment property, we provide expert guidance every step of the way.",
                stats: [
                    { number: "20+", label: "Years in Business" },
                    { number: "1.5K+", label: "Homes Sold" },
                    { number: "25+", label: "Expert Agents" },
                    { number: "$500M+", label: "Sales Volume" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Home Buying",
                    description: "Find your perfect home with our comprehensive buying services",
                    image: images.properties1,
                    features: ["Property Search", "Market Analysis", "Negotiation", "Closing Support"],
                },
                {
                    title: "Home Selling",
                    description: "Maximize your home's value with our proven selling strategies",
                    image: images.properties2,
                    features: ["Home Valuation", "Marketing Strategy", "Professional Photography", "Negotiation"],
                },
                {
                    title: "Investment Properties",
                    description: "Build wealth through strategic real estate investments",
                    image: images.properties3,
                    features: ["Investment Analysis", "Rental Properties", "Portfolio Management", "Market Insights"],
                },
            ],
            testimonials: [
                {
                    name: "Tom and Lisa Johnson",
                    role: "Home Buyers",
                    content:
                        "They made buying our first home stress-free and enjoyable. Their knowledge of the market helped us find the perfect house within our budget.",
                    rating: 5,
                },
                {
                    name: "Robert Chen",
                    role: "Home Seller",
                    content:
                        "Sold our home in just 10 days for above asking price! Their marketing strategy and negotiation skills are exceptional.",
                    rating: 5,
                },
                {
                    name: "Jennifer Davis",
                    role: "Investor",
                    content:
                        "Excellent guidance on investment properties. They helped me build a profitable rental portfolio with their market expertise.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Susan Williams",
                    role: "Senior Real Estate Agent",
                    bio: "Top-producing agent with 15+ years of experience and over 500 successful transactions in the local market.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "How do I get started buying a home?",
                    answer:
                        "Start with a free consultation where we'll discuss your needs, budget, and timeline. We'll also connect you with trusted lenders for pre-approval.",
                },
                {
                    question: "What's my home worth?",
                    answer:
                        "We provide complimentary home valuations using current market data and comparable sales. Contact us for a detailed market analysis.",
                },
                {
                    question: "How long does it take to sell a home?",
                    answer:
                        "Average time varies by market conditions and price range. We'll provide realistic expectations based on current market data for your area.",
                },
                {
                    question: "Do you work with first-time buyers?",
                    answer:
                        "We specialize in helping first-time buyers navigate the process and can connect you with first-time buyer programs and incentives.",
                },
            ],
            contact: {
                title: "Ready to Make Your Move?",
                subtitle: "Contact us today for expert real estate guidance",
                phone: "(555) 678-9012",
                email: "info@realestate.com",
                address: "987 Property Lane, Real Estate District",
                hours: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
            },
            cta: {
                title: "Your Real Estate Goals Start Here",
                subtitle: "Whether buying, selling, or investing, we're here to help you succeed",
                buttonText: "Get Started Today",
            },
        }
    }

    private static generateTechnologyTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Innovation Through Technology",
            description,
            hero: {
                title: `${name} Technology Solutions`,
                subtitle: "Empowering businesses with cutting-edge technology solutions and expert consulting services",
                cta: "Get Started",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Services", "Solutions", "About", "Portfolio", "Contact"],
            features: [
                {
                    title: "Expert Team",
                    description: "Skilled developers and consultants with years of industry experience",
                    icon: "👨‍💻",
                },
                {
                    title: "Cutting-Edge Tech",
                    description: "Latest technologies and frameworks for optimal performance",
                    icon: "⚡",
                },
                {
                    title: "Scalable Solutions",
                    description: "Future-proof solutions that grow with your business",
                    icon: "📈",
                },
            ],
            about: {
                title: "Driving Digital Transformation",
                content:
                    "We are a leading technology consulting firm specializing in custom software development, cloud solutions, and digital transformation. Our team of experts helps businesses leverage technology to achieve their goals and stay competitive in the digital age.",
                stats: [
                    { number: "15+", label: "Years of Excellence" },
                    { number: "200+", label: "Projects Delivered" },
                    { number: "50+", label: "Expert Developers" },
                    { number: "99%", label: "Client Satisfaction" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Custom Software Development",
                    description: "Tailored software solutions designed to meet your specific business needs",
                    image: images.services1,
                    features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Development"],
                },
                {
                    title: "Cloud Solutions",
                    description: "Scalable cloud infrastructure and migration services for modern businesses",
                    image: images.services2,
                    features: ["Cloud Migration", "Infrastructure Setup", "DevOps", "Security"],
                },
                {
                    title: "Digital Consulting",
                    description: "Strategic technology consulting to optimize your digital transformation",
                    image: images.services3,
                    features: ["Technology Strategy", "Process Optimization", "Digital Innovation", "Training"],
                },
            ],
            testimonials: [
                {
                    name: "Michael Thompson",
                    role: "CTO, TechCorp",
                    content:
                        "Their expertise in cloud migration saved us months of development time and significantly reduced our infrastructure costs.",
                    rating: 5,
                },
                {
                    name: "Sarah Johnson",
                    role: "CEO, StartupXYZ",
                    content:
                        "The custom software they developed has transformed our business operations. Professional, reliable, and innovative team.",
                    rating: 5,
                },
                {
                    name: "David Rodriguez",
                    role: "IT Director",
                    content:
                        "Excellent consulting services that helped us modernize our entire technology stack. Highly recommend their expertise.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Alex Chen",
                    role: "Lead Developer",
                    bio: "Full-stack developer with 12+ years of experience in enterprise software development and cloud architecture.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "What technologies do you specialize in?",
                    answer:
                        "We work with modern technologies including React, Node.js, Python, AWS, Azure, and many others. We choose the best tech stack for each project.",
                },
                {
                    question: "How long does a typical project take?",
                    answer:
                        "Project timelines vary based on complexity and scope. Simple applications may take 2-3 months, while enterprise solutions can take 6-12 months.",
                },
                {
                    question: "Do you provide ongoing support?",
                    answer:
                        "Yes, we offer comprehensive maintenance and support packages to ensure your applications continue to perform optimally.",
                },
                {
                    question: "Can you work with our existing team?",
                    answer:
                        "We can augment your existing team or work collaboratively on projects. We're flexible in our engagement models.",
                },
            ],
            contact: {
                title: "Let's Build Something Amazing",
                subtitle: "Ready to transform your business with technology?",
                phone: "(555) 789-0123",
                email: "hello@techsolutions.com",
                address: "123 Innovation Drive, Tech District",
                hours: "Mon-Fri: 9:00 AM - 6:00 PM",
            },
            cta: {
                title: "Ready to Innovate?",
                subtitle: "Let's discuss how technology can transform your business",
                buttonText: "Start Your Project",
            },
        }
    }

    private static generateEducationTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Empowering Minds, Shaping Futures",
            description,
            hero: {
                title: `${name} Educational Institute`,
                subtitle:
                    "Providing exceptional education and fostering academic excellence in a supportive learning environment",
                cta: "Apply Now",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Programs", "Admissions", "Faculty", "Campus", "Contact"],
            features: [
                {
                    title: "Expert Faculty",
                    description: "Experienced educators dedicated to student success and academic excellence",
                    icon: "👨‍🏫",
                },
                {
                    title: "Modern Facilities",
                    description: "State-of-the-art classrooms and laboratories for optimal learning",
                    icon: "🏫",
                },
                {
                    title: "Comprehensive Programs",
                    description: "Wide range of academic programs to suit diverse interests and career goals",
                    icon: "📚",
                },
            ],
            about: {
                title: "Excellence in Education",
                content:
                    "For over five decades, we have been committed to providing quality education that prepares students for success in their chosen fields. Our innovative programs, experienced faculty, and supportive community create an environment where students thrive academically and personally.",
                stats: [
                    { number: "50+", label: "Years of Excellence" },
                    { number: "10K+", label: "Graduates" },
                    { number: "200+", label: "Faculty Members" },
                    { number: "95%", label: "Graduate Success Rate" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Undergraduate Programs",
                    description: "Comprehensive bachelor's degree programs across multiple disciplines",
                    image: images.programs1,
                    features: ["Liberal Arts", "Sciences", "Business", "Engineering"],
                },
                {
                    title: "Graduate Studies",
                    description: "Advanced degree programs for professional and academic advancement",
                    image: images.programs2,
                    features: ["Master's Programs", "Doctoral Studies", "Professional Certificates", "Research Opportunities"],
                },
                {
                    title: "Continuing Education",
                    description: "Lifelong learning opportunities for working professionals",
                    image: images.programs3,
                    features: ["Professional Development", "Online Courses", "Executive Education", "Skills Training"],
                },
            ],
            testimonials: [
                {
                    name: "Emily Johnson",
                    role: "Class of 2023",
                    content:
                        "The education I received here prepared me perfectly for my career. The faculty truly cares about student success.",
                    rating: 5,
                },
                {
                    name: "Marcus Williams",
                    role: "Graduate Student",
                    content:
                        "Excellent research opportunities and supportive faculty. The graduate program exceeded my expectations.",
                    rating: 5,
                },
                {
                    name: "Lisa Chen",
                    role: "Alumni",
                    content:
                        "The skills and knowledge I gained here have been invaluable in my professional career. Highly recommend!",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Dr. Patricia Adams",
                    role: "Dean of Academics",
                    bio: "Ph.D. in Education with 20+ years of experience in curriculum development and academic leadership.",
                    image: images.faculty,
                },
            ],
            faq: [
                {
                    question: "What are the admission requirements?",
                    answer:
                        "Admission requirements vary by program. Generally, we require transcripts, test scores, and application essays. Check specific program pages for detailed requirements.",
                },
                {
                    question: "Do you offer financial aid?",
                    answer:
                        "Yes, we offer various financial aid options including scholarships, grants, and student loans. Our financial aid office can help you explore all available options.",
                },
                {
                    question: "Are online programs available?",
                    answer:
                        "We offer several online and hybrid programs for students who need flexibility. These programs maintain the same academic rigor as our on-campus offerings.",
                },
                {
                    question: "What support services are available?",
                    answer:
                        "We provide comprehensive student support including academic advising, career services, tutoring, counseling, and disability services.",
                },
            ],
            contact: {
                title: "Start Your Educational Journey",
                subtitle: "Take the next step toward your academic and career goals",
                phone: "(555) 890-1234",
                email: "admissions@education.edu",
                address: "456 Academic Avenue, University District",
                hours: "Mon-Fri: 8:00 AM - 5:00 PM",
            },
            cta: {
                title: "Your Future Starts Here",
                subtitle: "Apply today and join our community of learners and achievers",
                buttonText: "Apply Now",
            },
        }
    }

    private static generatePhotographyTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Capturing Life's Beautiful Moments",
            description,
            hero: {
                title: `${name} Photography`,
                subtitle:
                    "Professional photography services that capture the essence of your special moments with artistic vision",
                cta: "Book Session",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Portfolio", "Services", "About", "Pricing", "Contact"],
            features: [
                {
                    title: "Artistic Vision",
                    description: "Creative approach to photography that tells your unique story",
                    icon: "📸",
                },
                {
                    title: "Professional Quality",
                    description: "High-end equipment and expert techniques for stunning results",
                    icon: "🎨",
                },
                {
                    title: "Personal Service",
                    description: "Customized photography experiences tailored to your needs",
                    icon: "💫",
                },
            ],
            about: {
                title: "Passionate About Photography",
                content:
                    "With over a decade of experience in professional photography, I specialize in capturing authentic moments and emotions. My goal is to create timeless images that you'll treasure for years to come, whether it's your wedding day, family portraits, or corporate events.",
                stats: [
                    { number: "12+", label: "Years of Experience" },
                    { number: "500+", label: "Happy Clients" },
                    { number: "50+", label: "Weddings Captured" },
                    { number: "5K+", label: "Photos Delivered" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Wedding Photography",
                    description: "Comprehensive wedding photography packages to capture your special day",
                    image: images.portfolio1,
                    features: ["Engagement Sessions", "Full Day Coverage", "Digital Gallery", "Print Packages"],
                },
                {
                    title: "Portrait Sessions",
                    description: "Professional portraits for individuals, families, and corporate needs",
                    image: images.portfolio2,
                    features: ["Family Portraits", "Senior Photos", "Corporate Headshots", "Maternity Sessions"],
                },
                {
                    title: "Event Photography",
                    description: "Professional coverage for corporate events, parties, and special occasions",
                    image: images.portfolio3,
                    features: ["Corporate Events", "Birthday Parties", "Graduations", "Anniversary Celebrations"],
                },
            ],
            testimonials: [
                {
                    name: "Jessica and Mark",
                    role: "Wedding Clients",
                    content:
                        "Our wedding photos are absolutely stunning! The photographer captured every emotion and detail perfectly. We couldn't be happier!",
                    rating: 5,
                },
                {
                    name: "The Johnson Family",
                    role: "Family Portrait Clients",
                    content:
                        "Amazing experience from start to finish. The photos are beautiful and really capture our family's personality.",
                    rating: 5,
                },
                {
                    name: "Corporate Client",
                    role: "Business Event",
                    content:
                        "Professional, reliable, and delivered exceptional results for our corporate event. Highly recommend!",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Sarah Mitchell",
                    role: "Lead Photographer",
                    bio: "Award-winning photographer with 12+ years of experience specializing in weddings and portraits.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "How far in advance should I book?",
                    answer:
                        "For weddings, we recommend booking 6-12 months in advance. For other sessions, 2-4 weeks notice is usually sufficient.",
                },
                {
                    question: "What's included in your packages?",
                    answer:
                        "All packages include professional editing, online gallery, and high-resolution digital images. Print packages and albums are available as add-ons.",
                },
                {
                    question: "Do you travel for sessions?",
                    answer:
                        "Yes! We're happy to travel for destination weddings and special events. Travel fees may apply depending on location.",
                },
                {
                    question: "How long until I receive my photos?",
                    answer:
                        "Wedding galleries are typically delivered within 4-6 weeks. Portrait sessions are usually ready within 2-3 weeks.",
                },
            ],
            contact: {
                title: "Let's Create Something Beautiful",
                subtitle: "Ready to capture your special moments?",
                phone: "(555) 901-2345",
                email: "hello@photography.com",
                address: "789 Creative Studio Lane, Arts District",
                hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sundays by appointment",
            },
            cta: {
                title: "Ready to Book Your Session?",
                subtitle: "Let's discuss your photography needs and create something amazing together",
                buttonText: "Schedule Consultation",
            },
        }
    }

    private static generateConsultingTemplate(
        name: string,
        description: string,
        images: Record<string, string>,
    ): IndustryTemplate {
        return {
            components: [],
            sections: {},
            recommendations: [],
            name,
            tagline: "Strategic Solutions for Business Growth",
            description,
            hero: {
                title: `${name} Consulting`,
                subtitle:
                    "Expert business consulting services to optimize operations, drive growth, and achieve strategic objectives",
                cta: "Get Consultation",
                backgroundImage: images.hero,
            },
            navigation: ["Home", "Services", "Industries", "About", "Case Studies", "Contact"],
            features: [
                {
                    title: "Strategic Expertise",
                    description: "Deep industry knowledge and proven methodologies for business success",
                    icon: "📊",
                },
                {
                    title: "Customized Solutions",
                    description: "Tailored strategies designed specifically for your business challenges",
                    icon: "🎯",
                },
                {
                    title: "Measurable Results",
                    description: "Data-driven approach with clear metrics and tangible outcomes",
                    icon: "📈",
                },
            ],
            about: {
                title: "Your Strategic Business Partner",
                content:
                    "We are a premier business consulting firm with over two decades of experience helping organizations achieve their strategic objectives. Our team of expert consultants brings deep industry knowledge and proven methodologies to drive sustainable growth and operational excellence.",
                stats: [
                    { number: "20+", label: "Years of Experience" },
                    { number: "300+", label: "Successful Projects" },
                    { number: "50+", label: "Expert Consultants" },
                    { number: "98%", label: "Client Retention Rate" },
                ],
                image: images.about,
            },
            services: [
                {
                    title: "Strategy Consulting",
                    description: "Comprehensive strategic planning and business transformation services",
                    image: images.services1,
                    features: ["Strategic Planning", "Market Analysis", "Competitive Intelligence", "Growth Strategy"],
                },
                {
                    title: "Operations Optimization",
                    description: "Streamline processes and improve operational efficiency across your organization",
                    image: images.services2,
                    features: ["Process Improvement", "Supply Chain Optimization", "Cost Reduction", "Quality Management"],
                },
                {
                    title: "Digital Transformation",
                    description: "Guide your organization through digital transformation initiatives",
                    image: images.services3,
                    features: ["Technology Strategy", "Digital Innovation", "Change Management", "Data Analytics"],
                },
            ],
            testimonials: [
                {
                    name: "Robert Chen",
                    role: "CEO, Manufacturing Corp",
                    content:
                        "Their strategic guidance helped us increase efficiency by 40% and reduce costs significantly. Exceptional consulting expertise.",
                    rating: 5,
                },
                {
                    name: "Maria Rodriguez",
                    role: "COO, Tech Startup",
                    content:
                        "The digital transformation roadmap they developed was instrumental in scaling our business. Highly professional team.",
                    rating: 5,
                },
                {
                    name: "David Thompson",
                    role: "VP Operations",
                    content:
                        "Outstanding results in process optimization. Their methodical approach and industry expertise made all the difference.",
                    rating: 5,
                },
            ],
            team: [
                {
                    name: "Michael Anderson",
                    role: "Senior Partner",
                    bio: "MBA with 25+ years of consulting experience across multiple industries, specializing in strategic planning and operational excellence.",
                    image: images.team,
                },
            ],
            faq: [
                {
                    question: "What industries do you serve?",
                    answer:
                        "We serve clients across various industries including manufacturing, technology, healthcare, financial services, and retail. Our consultants have deep sector expertise.",
                },
                {
                    question: "How do you structure your engagements?",
                    answer:
                        "We offer flexible engagement models including project-based consulting, retainer arrangements, and interim executive placements based on your needs.",
                },
                {
                    question: "What's your typical project timeline?",
                    answer:
                        "Project timelines vary based on scope and complexity. Strategic planning projects typically take 3-6 months, while operational improvements can range from 2-12 months.",
                },
                {
                    question: "How do you measure success?",
                    answer:
                        "We establish clear KPIs and success metrics at the project outset. Our success is measured by your achievement of defined business objectives and ROI.",
                },
            ],
            contact: {
                title: "Ready to Transform Your Business?",
                subtitle: "Let's discuss how we can help you achieve your strategic objectives",
                phone: "(555) 012-3456",
                email: "info@consulting.com",
                address: "321 Business Plaza, Corporate District",
                hours: "Mon-Fri: 8:00 AM - 6:00 PM",
            },
            cta: {
                title: "Accelerate Your Business Growth",
                subtitle: "Partner with us to unlock your organization's full potential",
                buttonText: "Schedule Consultation",
            },
        }
    }
}
