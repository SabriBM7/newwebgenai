// src/lib/variantUtils.ts
import { HeaderVariant, HeroVariant } from "./types"

export const getHeaderClasses = (variant: HeaderVariant) => {
    switch(variant) {
        case "corporate": return "font-sans"
        case "creative": return "font-serif"
        default: return "font-sans"
    }
}

export const getHeroClasses = (variant: HeroVariant) => {
    switch(variant) {
        case "split": return "flex-col md:flex-row"
        default: return "flex-col"
    }
}