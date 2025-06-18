// This file is based on the version from the previous response,
// assuming it's located at src/lib/types.ts

export interface ComponentPropDefinition {
    type: string // e.g., "string", "number", "boolean", "array", "object"
    required?: boolean
    default?: any
    description?: string
    itemType?: string // For arrays, e.g., "{ label: string; href: string }"
    options?: string[] // For enums or select-like props
}

export interface ComponentSchema {
    id?: string // Made optional
    template_name: string
    component_name: string
    description: string
    category: string
    industries: string[]
    tags?: string[] // Made optional
    props: Record<string, string | object | any>
    defaultProps: Record<string, any>
    expectedPropsStructure?: Record<string, ComponentPropDefinition>
    subsections?: string[]
    dependencies?: string[]
    filepath: string
    exampleUsage?: string
}

export interface WebsiteGenerationParams {
    websiteName: string
    description: string
    industry: string
    style: string
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
    includeImages?: boolean
    componentCount?: number
    aiProvider?: string
}

export interface GeneratedWebsiteComponent {
    type: string
    props: Record<string, any>
    id?: string
}

export interface GeneratedWebsite {
    components: GeneratedWebsiteComponent[]
    metadata: {
        title: string
        description: string
        keywords?: string[]
        industry: string
        style: string
        aiUsed: string
        componentsUsed: number
        generatedAt: string
        [key: string]: any
    }
    colors: {
        primary: string
        secondary: string
        accent: string
        background: string
        text: string
        [key: string]: any
    }
    content?: Record<string, any>
    images?: Record<string, string>
    success?: boolean
    message?: string
    documentsUsed?: number
    componentsAvailable?: number
    aiProvider?: string
}

// Your existing types from the attachment
export type MenuItem = {
    label: string
    link: string
}

export type ContactInfo = {
    phone?: string
    email?: string
}

export type HeaderStyle = "creative" | "corporate" | "minimal" | "ecommerce" | "education" | "saas"
export type ButtonStyle = "rounded" | "flat" | "outlined"
export type TextAlignment = "left" | "center" | "right"
export type Animation = "fade-in" | "slide-down" | "zoom-in" | "none"
export type LogoAlignment = "left" | "center" | "right"
export type MenuAlignment = "left" | "center" | "right"

export interface BaseHeaderProps {
    logo: string
    logoUrl?: string
    backgroundColor?: string
    textColor?: string
    menu: MenuItem[]
    keywords?: string[]
    fontSize?: string
    height?: string
    sticky?: boolean
    animation?: Animation
}

export interface CorporateHeaderProps extends BaseHeaderProps {
    contactInfo?: ContactInfo
    buttonText?: string
    topBar?: boolean
    topBarColor?: string
    logoAlignment?: LogoAlignment
    menuAlignment?: MenuAlignment
}

export interface CreativeHeaderProps extends BaseHeaderProps {
    accentColor?: string
    transparent?: boolean
    buttonText?: string
}

export interface MinimalHeaderProps extends BaseHeaderProps {
    centerLogo?: boolean
    borderBottom?: boolean
    buttonText?: string
}

export interface EcommerceHeaderProps extends BaseHeaderProps {
    cartCount?: number
    searchEnabled?: boolean
    buttonText?: string
    categories?: MenuItem[]
}

export interface EducationHeaderProps extends BaseHeaderProps {
    buttonText?: string
    loginEnabled?: boolean
    searchEnabled?: boolean
}

export interface SaaSHeaderProps extends BaseHeaderProps {
    buttonText?: string
    secondaryButtonText?: string
    gradient?: boolean
}

export type Category =
    | "enterprise"
    | "education"
    | "portfolio"
    | "e-commerce"
    | "analytics"
    | "healthcare"
    | "finance"
    | "travel"
    | "construction"
    | "sustainability"
    | "gaming"
    | "food"
    | "fashion"
    | "automotive"
    | "fitness"

export type Tone =
    | "professional"
    | "educational"
    | "inspirational"
    | "friendly"
    | "technical"
    | "compassionate"
    | "serious"
    | "exciting"
    | "practical"
    | "energetic"
    | "chic"
    | "motivational"

export type TargetAudience =
    | "enterprise_executives"
    | "students_professionals"
    | "creative_professionals"
    | "online_shoppers"
    | "data_analysts"
    | "patients_caregivers"
    | "investors"
    | "travel_enthusiasts"
    | "contractors_developers"
    | "environmentalists"
    | "gamers"
    | "food_lovers"
    | "fashion_enthusiasts"
    | "car_enthusiasts"
    | "fitness_fans"

export type ButtonType = {
    label: string
    link: string
    type: "primary" | "secondary" | "tertiary"
}
