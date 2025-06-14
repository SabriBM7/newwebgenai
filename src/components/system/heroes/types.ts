export interface HeroProps {
    title?: string
    subtitle?: string
    description?: string
    primaryButton?: {
        text: string
        href: string
    }
    secondaryButton?: {
        text: string
        href: string
    }
    backgroundImage?: string
}
