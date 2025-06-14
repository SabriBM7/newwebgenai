export interface HeaderProps {
    logo?: string
    companyName?: string
    logoType?: "text" | "image"
    navigation?: NavigationItem[]
    ctaButton?: {
        text: string
        href: string
    }

    style?: "minimalist" | "corporate" | "creative"
    backgroundColor?: string
    textColor?: string
    transparent?: boolean
    sticky?: boolean
}

export interface NavigationItem {
    label: string
    href: string
    children?: NavigationItem[]
}
