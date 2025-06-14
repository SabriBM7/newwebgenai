
export interface Website {
    metadata?: WebsiteMetadata
    header?: WebsiteSection
    hero?: WebsiteSection
    sections?: WebsiteSection[]
    footer?: WebsiteSection
}

export interface WebsiteMetadata {
    title?: string
    description?: string
    businessName?: string
    industry?: string
    style?: string
    primaryColor?: string
    secondaryColor?: string
    fontPrimary?: string
    fontSecondary?: string
    aiUsed?: string
    generatedAt?: string
    includeImages?: boolean
}

export interface WebsiteSection {
    type: string
    variant?: string
    props?: Record<string, any>
}

// Component-specific types
export interface HeaderProps {
    logo?: string
    logoType?: "text" | "image"
    logoImage?: string
    menu?: MenuItem[]
    cta?: ButtonLink
    sticky?: boolean
    transparent?: boolean
    searchEnabled?: boolean
    cartCount?: number
    categories?: MenuItem[]
}

export interface MenuItem {
    label: string
    link: string
    children?: MenuItem[]
}

export interface ButtonLink {
    label: string
    link: string
    variant?: string
}

export interface HeroProps {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    imageAlt?: string
    primaryButton?: ButtonLink
    secondaryButton?: ButtonLink
    backgroundType?: "color" | "gradient" | "image" | "pattern"
    backgroundColor?: string
    backgroundGradient?: string
    backgroundImage?: string
    alignment?: "left" | "center" | "right"
}

export interface FeatureProps {
    title: string
    description: string
    icon?: string
    image?: string
}

export interface FeaturesProps {
    title?: string
    subtitle?: string
    description?: string
    features: FeatureProps[]
    backgroundColor?: string
    textColor?: string
}

export interface TestimonialProps {
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: string
    rating?: number
}

export interface TestimonialsProps {
    title?: string
    subtitle?: string
    testimonials: TestimonialProps[]
    variant?: "cards" | "carousel" | "grid" | "quotes"
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export interface PricingPlan {
    name: string
    price: string
    billing?: "monthly" | "yearly"
    description?: string
    features: string[] | { title: string; included: boolean }[]
    cta?: ButtonLink
    popular?: boolean
    highlighted?: boolean
}

export interface PricingProps {
    title?: string
    subtitle?: string
    description?: string
    plans: PricingPlan[]
    showToggle?: boolean
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export interface CTAProps {
    title?: string
    description?: string
    primaryButton?: ButtonLink
    secondaryButton?: ButtonLink
    image?: string
    backgroundColor?: string
    textColor?: string
    backgroundImage?: string
}

export interface FooterProps {
    logo?: string
    logoImage?: string
    tagline?: string
    columns?: FooterColumn[]
    socialLinks?: SocialLink[]
    copyright?: string
    backgroundColor?: string
    textColor?: string
}

export interface FooterColumn {
    title: string
    links: { label: string; link: string }[]
}

export interface SocialLink {
    platform: string
    link: string
    icon?: string
}

export interface WebsiteData {
    metadata: {
        title: string
        description: string
        industry: string
        style: string
        primaryColor: string
        secondaryColor: string
        themeId?: string
        fonts?: {
            heading: string
            body: string
        }
        logoUrl?: string
        aiUsed?: string
        generatedAt?: string
        includeImages?: boolean
    }
    components: Array<{
        type: string
        props: Record<string, any>
    }>
    isFallback?: boolean
    fallbackReason?: string
}

export interface FeatureItem {
    title: string
    description: string
    icon: string
}

export interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar: string
}

export interface NavLink {
    text: string
    url: string
    submenu?: NavLink[]
}

// AI Generation types
export interface GenerateWebsiteParams {
    description: string
    websiteName: string
    industry: string
    style: string
    aiProvider: string
    includeImages: boolean
}

export interface WebsiteComponent {
    type: string
    props: Record<string, any>
}

// Image generation types
export interface ImageGenerationOptions {
    query: string
    type: "landscape" | "portrait" | "square"
    width?: number
    height?: number
}
