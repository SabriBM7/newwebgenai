export interface Feature {
    title: string
    description: string
    icon: string
}

export interface FeaturesProps {
    title?: string
    subtitle?: string
    description?: string
    features?: Feature[]
}
