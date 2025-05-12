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
