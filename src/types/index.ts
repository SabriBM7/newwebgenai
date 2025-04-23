export type MenuItem = {
    label: string
    link: string
}

export type ButtonType = {
    label: string
    link: string
    type: "primary" | "secondary" | "tertiary"
}

export type HeaderStyle = "creative" | "corporate" | "minimal" | "ecommerce" | "education" | "saas"
export type ButtonStyle = "rounded" | "flat" | "outlined"
export type TextAlignment = "left" | "center" | "right"
export type Animation = "fade-in" | "slide-down" | "zoom-in" | "none"

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
