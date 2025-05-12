import MinimalHeader from "./headers/minimal-header"
import SaaSHeader from "./headers/saas-header"
import EcommerceHeader from "./headers/ecommerce-header"
import CorporateHeader from "./headers/corporate-header"
import CreativeHeader from "./headers/creative-header"
import EducationHeader from "./headers/education-header"

import StandardHero from "./heroes/StandardHero"
import SplitHero from "./heroes/SplitHero"
import VideoHero from "./heroes/VideoHero"
import GradientHero from "./heroes/GradientHero"
import VideoBackgroundHero from "./heroes/VideoBackgroundHero"
import ParallaxHero from "./heroes/ParallaxHero"

import GridFeatures from "./features/GridFeatures"
import CardFeatures from "./features/CardFeatures"
import AnimatedFeatures from "./features/AnimatedFeatures"
import TimelineFeatures from "./features/TimelineFeatures"

import ModernFooter from "./footers/ModernFooter"
import CreativeFooter from "./footers/CreativeFooter"

interface ComponentFactoryProps {
    type: "header" | "hero" | "features" | "footer"
    component: string
    data: any
}

export default function ComponentFactory({ type, component, data }: ComponentFactoryProps) {
    // Header components
    if (type === "header") {
        switch (component) {
            case "minimal":
                return <MinimalHeader {...data} />
            case "saas":
                return <SaaSHeader {...data} />
            case "ecommerce":
                return <EcommerceHeader {...data} />
            case "corporate":
                return <CorporateHeader {...data} />
            case "creative":
                return <CreativeHeader {...data} />
            case "education":
                return <EducationHeader {...data} />
            default:
                return <MinimalHeader {...data} />
        }
    }

    // Hero components
    if (type === "hero") {
        switch (component) {
            case "standard":
                return <StandardHero {...data} />
            case "split":
                return <SplitHero {...data} />
            case "video":
                return <VideoHero {...data} />
            case "gradient":
                return <GradientHero {...data} />
            case "videoBackground":
                return <VideoBackgroundHero {...data} />
            case "parallax":
                return <ParallaxHero {...data} />
            default:
                return <StandardHero {...data} />
        }
    }

    // Features components
    if (type === "features") {
        switch (component) {
            case "grid":
                return <GridFeatures {...data} />
            case "card":
                return <CardFeatures {...data} />
            case "animated":
                return <AnimatedFeatures {...data} />
            case "timeline":
                return <TimelineFeatures {...data} />
            default:
                return <GridFeatures {...data} />
        }
    }

    // Footer components
    if (type === "footer") {
        switch (component) {
            case "modern":
                return <ModernFooter {...data} />
            case "creative":
                return <CreativeFooter {...data} />
            default:
                return <ModernFooter {...data} />
        }
    }

    return null
}
