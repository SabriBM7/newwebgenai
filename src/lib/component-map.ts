import {
    ModernHeader, ProfessionalHeader, CreativeHeader,
    HeroSection, FeaturesGrid, TestimonialsSection,
    AboutSection, GallerySection, ContactSection,
    MenuGrid, ReservationForm, FAQSection
} from "@/components"

export const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
    header: ModernHeader,
    modernHeader: ModernHeader,
    professionalHeader: ProfessionalHeader,
    creativeHeader: CreativeHeader,

    hero: HeroSection,
    heroSection: HeroSection,
    banner: HeroSection,

    features: FeaturesGrid,
    featuresGrid: FeaturesGrid,
    services: FeaturesGrid,

    testimonials: TestimonialsSection,
    reviews: TestimonialsSection,

    about: AboutSection,
    story: AboutSection,
    team: AboutSection,

    gallery: GallerySection,
    portfolio: GallerySection,

    contact: ContactSection,
    contactForm: ContactSection,

    menu: MenuGrid,
    menuSection: MenuGrid,

    reservation: ReservationForm,
    booking: ReservationForm,

    faq: FAQSection,
    questions: FAQSection
}

export const COMPONENT_ALIASES: Record<string, string> = {
    FeaturesSection: 'featuresGrid',
    AboutSection: 'about',
    GallerySection: 'gallery',
    TestimonialsSection: 'testimonials',
    ContactSection: 'contact',
    FAQSection: 'faq',
    MenuSection: 'menu',
    ReservationSection: 'reservation'
}

export function getComponent(type: string): React.ComponentType<any> | null {
    const resolvedType = COMPONENT_ALIASES[type] || type
    return COMPONENT_MAP[resolvedType] || null
}