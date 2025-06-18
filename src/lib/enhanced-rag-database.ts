import componentDatasetJson from "./comprehensive-component-dataset.json" // Ensure this path is correct
import type { ComponentSchema } from "./types" // Adjusted path

// Type assertion for the imported JSON
const allComponentData = componentDatasetJson.components as ComponentSchema[]

interface IndustryKnowledge {
    title: string
    content: string
    components: string[] // template_names of recommended components
    sections: string[]
    tags: string[]
    examples: string[]
    score?: number
}

// ENHANCED_INDUSTRY_KNOWLEDGE from your provided file
const ENHANCED_INDUSTRY_KNOWLEDGE: Record<string, IndustryKnowledge> = {
    restaurant: {
        title: "Restaurant Website Essential Components & Best Practices",
        content: `
RESTAURANT WEBSITE REQUIREMENTS:
- Professional header with logo, navigation (Menu, About, Events, Contact, Reservations)
- Hero section showcasing restaurant ambiance and signature dishes
- Interactive menu with categories, dietary filters, and pricing
- Photo gallery of food, interior, and dining experience
- About section with chef story, restaurant history, and values
- Events calendar for special dinners, wine tastings, live music
- Testimonials and reviews from satisfied customers
- Location and contact information with map integration
- Online reservation system or booking widget
- Social media integration for Instagram food photos

ESSENTIAL FEATURES:
- Mobile-responsive design for on-the-go browsing
- Online ordering and delivery integration
- Menu PDF download option
- Private dining and catering information
- Wine list and beverage menu
- Special dietary accommodations (vegan, gluten-free)
- Hours of operation and holiday schedules
- Parking and accessibility information

DESIGN PRINCIPLES:
- Warm, inviting color schemes (earth tones, food-inspired colors)
- High-quality food photography
- Easy-to-read menu layouts
- Clear call-to-action buttons for reservations
- Trust indicators (awards, certifications, reviews)
    `,
        components: [
            // These should be template_names from your dataset
            "MinimalistHeader", // Example, verify actual names
            "CreativeHero",
            "MenuSection", // This is a specific component type
            "GallerySection",
            "AboutSection",
            "EventsSection",
            "TestimonialsSection",
            "ContactSection",
            "ModernFooter",
            "CTASection",
        ],
        sections: ["header", "hero", "menu", "gallery", "about", "events", "testimonials", "contact", "footer"],
        tags: ["restaurant", "food", "dining", "menu", "reservations", "events"],
        examples: [
            "Fine dining restaurant with wine pairings",
            "Casual family restaurant with kids menu",
            "Farm-to-table restaurant with seasonal menu",
            "Ethnic cuisine restaurant with cultural elements",
        ],
    },
    technology: {
        title: "Technology Company Website Components & Strategy",
        content: `
TECHNOLOGY WEBSITE REQUIREMENTS:
- Professional header with clear navigation (Services, Portfolio, About, Team, Contact)
- Hero section highlighting innovation and technical expertise
- Services section detailing development capabilities
- Portfolio showcasing successful projects and case studies
- Technology stack and tools demonstration
- Team profiles of developers and technical experts
- Client testimonials and success stories
- Blog section for technical insights and thought leadership
- Contact form for project inquiries and consultations

ESSENTIAL FEATURES:
- Clean, modern design reflecting technical competence
- Interactive demos or prototypes
- Code samples and GitHub integration
- Certification badges and technology partnerships
- Project timeline and development process
- Pricing information for different service tiers
- Client portal access
- Technical support and documentation

DESIGN PRINCIPLES:
- Professional color schemes (blues, grays, tech-inspired)
- Clean typography and plenty of white space
- Interactive elements and animations
- Mobile-first responsive design
- Fast loading times and optimized performance
- Clear technical communication for non-technical clients
    `,
        components: [
            "CorporateHeader",
            "GradientHero",
            "ServicesSection",
            "PortfolioSection", // Example, verify actual names
            "ProcessSection",
            "TeamSection",
            "TestimonialsSection",
            "BlogSection",
            "ContactSection",
            "ModernFooter",
        ],
        sections: [
            "header",
            "hero",
            "services",
            "portfolio",
            "process",
            "team",
            "testimonials",
            "blog",
            "contact",
            "footer",
        ],
        tags: ["technology", "software", "development", "innovation", "digital"],
        examples: [
            "Software development agency with custom solutions",
            "Mobile app development company",
            "Cloud services and infrastructure provider",
            "AI/ML consulting and implementation",
        ],
    },
    healthcare: {
        title: "Healthcare Website Components & Compliance",
        content: `
HEALTHCARE WEBSITE REQUIREMENTS:
- Professional header with patient portal access
- Hero section building trust and showcasing care quality
- Services section detailing medical specialties and treatments
- Provider directory with doctor profiles and credentials
- Appointment scheduling system with online booking
- Patient resources and educational content
- Insurance information and accepted plans
- Testimonials and patient success stories
- Emergency contact information and urgent care details
- HIPAA compliance and privacy policy

ESSENTIAL FEATURES:
- Secure patient portal integration
- Telemedicine and virtual consultation options
- Medical forms and pre-visit questionnaires
- Prescription refill requests
- Health education library and resources
- Accessibility compliance (ADA)
- Multi-language support for diverse communities
- Location finder for multiple clinic locations

DESIGN PRINCIPLES:
- Calming, trustworthy color schemes (blues, greens, whites)
- Professional photography of facilities and staff
- Clear, easy-to-understand medical information
- Prominent emergency and contact information
- Trust indicators (certifications, awards, affiliations)
- Mobile-responsive for patient convenience
    `,
        components: [
            "ProfessionalHeader", // Example, verify actual names
            "MinimalistHero",
            "ServicesSection", // Example: MedicalServices
            "TeamSection", // Example: DoctorProfiles / ProvidersSection
            "AboutSection",
            "TestimonialsSection",
            "ContactSection", // Example: AppointmentSection
            "BlogSection", // Example: ResourcesSection
            "ContactSection",
            "ModernFooter",
        ],
        sections: [
            "header",
            "hero",
            "services",
            "providers",
            "about",
            "testimonials",
            "appointments",
            "resources",
            "contact",
            "footer",
        ],
        tags: ["healthcare", "medical", "doctors", "patients", "appointments", "wellness"],
        examples: [
            "Multi-specialty medical practice",
            "Dental clinic with cosmetic services",
            "Mental health and therapy center",
            "Urgent care and walk-in clinic",
        ],
    },
    ecommerce: {
        title: "E-commerce Website Components & Conversion Optimization",
        content: `
E-COMMERCE WEBSITE REQUIREMENTS:
- Header with search, cart, and user account access
- Hero section featuring bestsellers and promotions
- Product grid with filtering and sorting options
- Individual product pages with detailed descriptions
- Shopping cart and checkout process
- Customer reviews and ratings system
- Shipping and return policy information
- Customer support and live chat
- Newsletter signup and promotional offers
- Trust badges and security certifications

ESSENTIAL FEATURES:
- Advanced product search and filtering
- Wishlist and favorites functionality
- Product comparison tools
- Inventory management and stock indicators
- Multiple payment options (credit cards, PayPal, digital wallets)
- Order tracking and account management
- Related products and cross-selling
- Mobile commerce optimization
- SEO-optimized product descriptions

DESIGN PRINCIPLES:
- Clean, product-focused design
- High-quality product photography
- Clear pricing and availability information
- Streamlined checkout process
- Trust indicators and security badges
- Fast loading times for better conversion
- Responsive design for mobile shopping
    `,
        components: [
            "ModernHeader", // Example, verify actual names
            "SplitScreenHero",
            "ProductGrid", // Specific component
            "CategoriesSection", // Conceptual, map to a features or grid component
            "AboutSection",
            "TestimonialsSection",
            "ContactSection", // Example: ShippingSection
            "ContactSection",
            "NewsletterSection",
            "ModernFooter",
        ],
        sections: [
            "header",
            "hero",
            "products",
            "categories",
            "about",
            "testimonials",
            "shipping",
            "contact",
            "newsletter",
            "footer",
        ],
        tags: ["ecommerce", "shopping", "products", "cart", "checkout", "payments"],
        examples: [
            "Fashion and apparel online store",
            "Electronics and gadgets marketplace",
            "Home and garden products shop",
            "Handmade and artisan goods platform",
        ],
    },
    education: {
        title: "Educational Institution Website Components",
        content: `
EDUCATION WEBSITE REQUIREMENTS:
- Header with academic navigation (Programs, Admissions, Faculty, Student Life)
- Hero section showcasing campus and academic excellence
- Academic programs and course catalog
- Faculty profiles and research highlights
- Admissions information and application process
- Student life and campus activities
- Events calendar for academic and social events
- Resources for current students and alumni
- Contact information for different departments
- Virtual campus tours and facilities showcase

ESSENTIAL FEATURES:
- Student portal and learning management system access
- Online course registration and scheduling
- Academic calendar and important dates
- Financial aid and scholarship information
- Alumni network and career services
- Research publications and academic achievements
- International student resources
- Accessibility services and support

DESIGN PRINCIPLES:
- Academic and professional appearance
- School colors and branding consistency
- Inspiring imagery of campus and students
- Clear information architecture
- Mobile-friendly for student access
- Multilingual support for international students
    `,
        components: [
            "EducationHeader", // Example, verify actual names
            "InteractiveHero",
            "CourseGrid", // Example: ProgramsSection
            "TeamSection", // Example: FacultySection
            "AboutSection",
            "TestimonialsSection",
            "EventsSection",
            "BlogSection", // Example: ResourcesSection
            "ContactSection",
            "ModernFooter",
        ],
        sections: [
            "header",
            "hero",
            "programs",
            "faculty",
            "about",
            "testimonials",
            "events",
            "resources",
            "contact",
            "footer",
        ],
        tags: ["education", "academic", "students", "faculty", "programs", "campus"],
        examples: [
            "University with multiple colleges",
            "Community college with vocational programs",
            "Private school with specialized curriculum",
            "Online education platform",
        ],
    },
    realestate: {
        title: "Real Estate Website Components & Lead Generation",
        content: `
REAL ESTATE WEBSITE REQUIREMENTS:
- Header with property search and agent contact
- Hero section with featured properties and search
- Property listings with advanced filtering
- Agent profiles and team information
- Market insights and neighborhood guides
- Buyer and seller resources and guides
- Testimonials from satisfied clients
- Contact forms for inquiries and consultations
- Mortgage calculator and financing tools
- Virtual tours and property galleries

ESSENTIAL FEATURES:
- MLS integration for property listings
- Advanced search with map integration
- Property comparison tools
- Saved searches and favorites
- Market reports and analytics
- Lead capture forms and CRM integration
- Social media integration for property sharing
- Mobile app for on-the-go property viewing

DESIGN PRINCIPLES:
- Professional and trustworthy design
- High-quality property photography
- Easy-to-use search and filtering
- Clear contact information and calls-to-action
- Local market expertise demonstration
- Mobile-responsive for property browsing
    `,
        components: [
            "CorporateHeader", // Example, verify actual names
            "ParallaxHero",
            "PropertyListingSection", // Specific component
            "ServicesSection",
            "AboutSection",
            "TestimonialsSection",
            "StatsSection", // Example: MarketSection
            "ContactSection",
            "ModernFooter",
        ],
        sections: ["header", "hero", "listings", "services", "about", "testimonials", "market", "contact", "footer"],
        tags: ["realestate", "properties", "agents", "buying", "selling", "market"],
        examples: [
            "Residential real estate brokerage",
            "Commercial property specialists",
            "Luxury home and estate agents",
            "Property management company",
        ],
    },
    fitness: {
        title: "Fitness & Wellness Website Components",
        content: `
FITNESS WEBSITE REQUIREMENTS:
- Header with class schedules and membership info
- Hero section showcasing facilities and results
- Class and program descriptions
- Trainer profiles and certifications
- Membership options and pricing
- Facility tour and equipment showcase
- Success stories and transformations
- Class schedule and booking system
- Contact information and location details
- Nutrition and wellness resources

ESSENTIAL FEATURES:
- Online class booking and scheduling
- Membership management portal
- Personal training appointment booking
- Fitness tracking and progress monitoring
- Nutrition planning and meal guides
- Community features and challenges
- Mobile app integration
- Wearable device compatibility

DESIGN PRINCIPLES:
- Energetic and motivating design
- Action photography of workouts and activities
- Clear class schedules and pricing
- Success story showcases
- Health and wellness focus
- Mobile-first design for active users
    `,
        components: [
            "ModernHeader", // Example, verify actual names
            "VideoBackgroundHero",
            "ServicesSection", // Example: ClassesSection
            "TeamSection", // Example: TrainersSection
            "AboutSection",
            "TestimonialsSection",
            "EventsSection", // Example: ScheduleSection
            "PricingSection",
            "ContactSection",
            "ModernFooter",
        ],
        sections: [
            "header",
            "hero",
            "classes",
            "trainers",
            "about",
            "testimonials",
            "schedule",
            "pricing",
            "contact",
            "footer",
        ],
        tags: ["fitness", "gym", "wellness", "training", "classes", "health"],
        examples: [
            "Full-service fitness center",
            "Boutique yoga and pilates studio",
            "CrossFit and functional training gym",
            "Personal training and wellness center",
        ],
    },
}

export function searchDocuments(industry: string, description: string, limit = 3): IndustryKnowledge[] {
    console.log(`🔍 Searching knowledge base for industry: ${industry.toLowerCase()}`)
    const results: IndustryKnowledge[] = []
    const targetIndustryLower = industry.toLowerCase()

    if (ENHANCED_INDUSTRY_KNOWLEDGE[targetIndustryLower]) {
        const primaryDoc = { ...ENHANCED_INDUSTRY_KNOWLEDGE[targetIndustryLower] }
        primaryDoc.score = calculateRelevanceScore(primaryDoc, description, targetIndustryLower)
        results.push(primaryDoc)
        console.log(`✅ Found primary industry document: ${primaryDoc.title} (score: ${primaryDoc.score})`)
    }

    const relatedIndustries = getRelatedIndustries(targetIndustryLower)
    for (const relatedIndustry of relatedIndustries) {
        if (ENHANCED_INDUSTRY_KNOWLEDGE[relatedIndustry] && results.length < limit) {
            const relatedDoc = { ...ENHANCED_INDUSTRY_KNOWLEDGE[relatedIndustry] }
            relatedDoc.score = calculateRelevanceScore(relatedDoc, description, targetIndustryLower) * 0.7
            results.push(relatedDoc)
            console.log(`✅ Found related industry document: ${relatedDoc.title} (score: ${relatedDoc.score})`)
        }
    }

    results.sort((a, b) => (b.score || 0) - (a.score || 0))
    console.log(
        `📚 Retrieved ${results.length} documents. Top scores: ${JSON.stringify(results.slice(0, limit).map((r) => ({ title: r.title, score: r.score })))}`,
    )
    return results.slice(0, limit)
}

export function getIndustryKnowledge(industry: string, description: string): IndustryKnowledge[] {
    return searchDocuments(industry, description, 2) // Fetch 2 most relevant documents
}

export function getComponentsByIndustry(industry: string): ComponentSchema[] {
    const targetIndustryLower = industry.toLowerCase()
    console.log(`🔧 Getting components for industry: ${targetIndustryLower}`)

    const components = allComponentData.filter((comp) => {
        const compIndustries = comp.industries?.map((i) => i.toLowerCase()) || ["all"]
        return compIndustries.includes("all") || compIndustries.includes(targetIndustryLower)
    })

    console.log(`✅ Found ${components.length} components for ${targetIndustryLower}`)
    return components
}

export function getComponentByTemplateName(name: string): ComponentSchema | undefined {
    return allComponentData.find((comp) => comp.template_name === name)
}

export function getComponentsByCategory(category: string): ComponentSchema[] {
    const targetCategoryLower = category.toLowerCase()
    return allComponentData.filter((comp) => comp.category?.toLowerCase() === targetCategoryLower)
}

function calculateRelevanceScore(doc: IndustryKnowledge, description: string, targetIndustry: string): number {
    let score = 0
    const descriptionLower = description.toLowerCase()
    const docContentLower = doc.content.toLowerCase()
    const docTitleLower = doc.title.toLowerCase()

    if (docTitleLower.includes(targetIndustry)) {
        score += 10
    } else if (doc.tags.includes(targetIndustry)) {
        score += 5
    }

    const descriptionWords = new Set(descriptionLower.match(/\b\w{4,}\b/g) || []) // Words with 4+ chars

    for (const word of descriptionWords) {
        if (docContentLower.includes(word)) {
            score += 2
        }
    }

    for (const tag of doc.tags) {
        if (descriptionLower.includes(tag.toLowerCase())) {
            score += 3
        }
        if (targetIndustry.includes(tag.toLowerCase())) {
            score += 1 // Small boost if target industry is related to a tag
        }
    }
    return score
}

function getRelatedIndustries(industry: string): string[] {
    const relationships: Record<string, string[]> = {
        restaurant: ["hospitality", "food", "catering", "events"],
        technology: ["software", "digital", "startup", "saas", "ai"],
        healthcare: ["medical", "wellness", "fitness", "pharma"],
        ecommerce: ["retail", "marketplace", "shopping", "fashion"],
        education: ["training", "academic", "learning", "e-learning"],
        realestate: ["property", "construction", "architecture", "investment"],
        fitness: ["wellness", "health", "sports", "gym"],
        // Add more relationships as needed
    }
    return relationships[industry] || []
}

// Export component dataset for direct access if needed elsewhere
export const componentDataset = allComponentData
