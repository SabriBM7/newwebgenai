import { INDUSTRIES } from "./comprehensive-industry-system"

// Map to your existing component structure
export const EXISTING_COMPONENT_MAP = {
    // Headers (existing)
    MinimalistHeader: "/components/system/headers/MinimalistHeader",
    CorporateHeader: "/components/system/headers/CorporateHeader",
    CreativeHeader: "/components/system/headers/CreativeHeader",

    // Heroes (existing)
    MinimalistHero: "/components/system/heroes/MinimalistHero",
    CreativeHero: "/components/system/heroes/CreativeHero",
    GradientHero: "/components/system/heroes/GradientHero",
    ParallaxHero: "/components/system/heroes/ParallaxHero",

    // Industry Components (existing)
    TechPortfolio: "/components/system/industry/technology/TechPortfolio",
    TechServices: "/components/system/industry/technology/TechServices",
    TechTeam: "/components/system/industry/technology/TechTeam",
    MenuSection: "/components/system/industry/restaurant/MenuSection",
    PropertyListingSection: "/components/system/industry/realestate/PropertyListingSection",
    CourseGrid: "/components/system/industry/education/CourseGrid",
    FacultyProfiles: "/components/system/industry/education/FacultyProfiles",
    ProductGrid: "/components/system/industry/ecommerce/ProductGrid",
    ShoppingCart: "/components/system/industry/ecommerce/ShoppingCart",
    ServicePackages: "/components/system/industry/finance/ServicePackages",
    CalculatorTools: "/components/system/industry/finance/CalculatorTools",
    ClassSchedule: "/components/system/industry/fitness/ClassSchedule",
    ServicesSection: "/components/system/industry/healthcare/ServicesSection",
    PracticeAreas: "/components/system/industry/law/PracticeAreas",
    ServicesMenu: "/components/system/industry/spa/ServicesMenu",

    // Interactive (existing)
    BookingSystem: "/components/system/interactive/BookingSystem",
    SearchableSection: "/components/system/interactive/SearchableSection",
}

export function getAdvancedComponentsForIndustry(industry: string): string[] {
    const industryConfig = INDUSTRIES[industry]
    if (!industryConfig) return []

    // Return components that exist in your system
    const availableComponents = industryConfig.components.filter(
        (comp) => EXISTING_COMPONENT_MAP[comp as keyof typeof EXISTING_COMPONENT_MAP],
    )

    return availableComponents
}

export function selectOptimalAdvancedComponents(
    industry: string,
    businessGoals: string[],
    targetAudience: string,
    websiteType: string,
): string[] {
    const baseComponents = getAdvancedComponentsForIndustry(industry)

    // Add components based on business goals
    const goalComponents: Record<string, string[]> = {
        "Lead Generation": ["ContactSection", "CTASection", "NewsletterSection"],
        "E-commerce Sales": ["ProductGrid", "ShoppingCart", "AdvancedPricing"],
        "Online Booking": ["BookingSystem", "EventsSection", "ContactSection"],
        "Brand Awareness": ["GallerySection", "TestimonialsSection", "AboutSection"],
        "Customer Support": ["FAQSection", "ContactSection", "TeamSection"],
        "Content Marketing": ["BlogSection", "NewsletterSection", "StatsSection"],
    }

    let selectedComponents = [...baseComponents]

    businessGoals.forEach((goal) => {
        if (goalComponents[goal]) {
            selectedComponents.push(...goalComponents[goal])
        }
    })

    // Remove duplicates and limit based on website type
    selectedComponents = [...new Set(selectedComponents)]

    const limits = {
        basic: 5,
        standard: 8,
        premium: 12,
        enterprise: 20,
    }

    return selectedComponents.slice(0, limits[websiteType as keyof typeof limits] || 8)
}
