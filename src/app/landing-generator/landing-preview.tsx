"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Header imports
import MinimalHeader from "@/components/headers/minimal-header"
import SaaSHeader from "@/components/headers/saas-header"
import EducationHeader from "@/components/headers/education-header"
import CorporateHeader from "@/components/headers/CorporateHeader"

// Hero imports
import StandardHero from "@/components/heroes/StandardHero"
import SplitHero from "@/components/heroes/SplitHero"
import GradientHero from "@/components/heroes/GradientHero"
import VideoBackgroundHero from "@/components/heroes/VideoBackgroundHero"
import ParallaxHero from "@/components/heroes/ParallaxHero"

// Features imports
import GridFeatures from "@/components/features/GridFeatures"
import CardFeatures from "@/components/features/CardFeatures"
import AnimatedFeatures from "@/components/features/AnimatedFeatures"
import TimelineFeatures from "@/components/features/TimelineFeatures"

// Footer imports
import ModernFooter from "@/components/footers/ModernFooter"
import CreativeFooter from "@/components/footers/CreativeFooter"

// Theme imports
import { ThemeCustomizer } from "@/components/theme/ThemeCustomizer"
import { type Theme, getThemeById } from "@/lib/theme-customization"

// Define the content structure
interface LandingContent {
    header: {
        logo: string
        menu: Array<{ label: string; link: string; submenu?: Array<{ label: string; link: string }> }>
        style?: string
    }
    hero: {
        title: string
        subtitle: string
        description: string
        buttonText: string
        buttonLink: string
        imageUrl: string
        style?: string
    }
    features: {
        title: string
        subtitle: string
        items: Array<{
            title: string
            description: string
            icon: string
        }>
        style?: string
    }
    footer: {
        companyName: string
        copyright: string
        links: Array<{ label: string; link: string }>
        socialLinks: Array<{ platform: string; link: string }>
        style?: string
    }
}

interface LandingPreviewProps {
    content: LandingContent
}

export default function LandingPreview({ content }: LandingPreviewProps) {
    const [activeTab, setActiveTab] = useState("preview")
    const [currentTheme, setCurrentTheme] = useState<Theme>(getThemeById("default-light"))

    // Apply theme to component props
    const applyTheme = (props: any) => {
        return {
            ...props,
            backgroundColor: props.backgroundColor || currentTheme.colors.background,
            textColor: props.textColor || currentTheme.colors.text,
            accentColor: props.accentColor || currentTheme.colors.primary,
        }
    }

    // Render the header based on style
    const renderHeader = () => {
        const headerStyle = content.header.style || "minimal"
        const headerProps = applyTheme({})

        switch (headerStyle) {
            case "saas":
                return (
                    <SaaSHeader logo={content.header.logo} menu={content.header.menu} buttonText="Sign Up" {...headerProps} />
                )
            case "education":
                return (
                    <EducationHeader
                        logo={content.header.logo}
                        menu={content.header.menu}
                        buttonText="Enroll Now"
                        {...headerProps}
                    />
                )
            case "corporate":
                return (
                    <CorporateHeader
                        logo={content.header.logo}
                        menu={content.header.menu}
                        buttonText="Contact Us"
                        showTopBar={true}
                        contactPhone="+1 (555) 123-4567"
                        contactEmail="info@example.com"
                        {...headerProps}
                    />
                )
            default:
                return <MinimalHeader logo={content.header.logo} menu={content.header.menu} {...headerProps} />
        }
    }

    // Render the hero section
    const renderHero = () => {
        const heroStyle = content.hero.style || "standard"
        const heroProps = applyTheme({})

        switch (heroStyle) {
            case "gradient":
                return (
                    <GradientHero
                        title={content.hero.title}
                        subtitle={content.hero.subtitle}
                        description={content.hero.description}
                        buttonText={content.hero.buttonText}
                        buttonLink={content.hero.buttonLink}
                        imageUrl={content.hero.imageUrl}
                        gradientColors={[currentTheme.colors.primary, currentTheme.colors.secondary, currentTheme.colors.accent]}
                        {...heroProps}
                    />
                )
            case "video":
                return (
                    <VideoBackgroundHero
                        title={content.hero.title}
                        subtitle={content.hero.subtitle}
                        description={content.hero.description}
                        buttonText={content.hero.buttonText}
                        buttonLink={content.hero.buttonLink}
                        videoPoster={content.hero.imageUrl}
                        {...heroProps}
                    />
                )
            case "parallax":
                return (
                    <ParallaxHero
                        title={content.hero.title}
                        subtitle={content.hero.subtitle}
                        description={content.hero.description}
                        buttonText={content.hero.buttonText}
                        buttonLink={content.hero.buttonLink}
                        backgroundImage={content.hero.imageUrl}
                        {...heroProps}
                    />
                )
            case "split":
                return (
                    <SplitHero
                        title={content.hero.title}
                        subtitle={content.hero.subtitle}
                        description={content.hero.description}
                        buttonText={content.hero.buttonText}
                        buttonLink={content.hero.buttonLink}
                        imageUrl={content.hero.imageUrl}
                        {...heroProps}
                    />
                )
            default:
                return (
                    <StandardHero
                        title={content.hero.title}
                        subtitle={content.hero.subtitle}
                        description={content.hero.description}
                        buttonText={content.hero.buttonText}
                        buttonLink={content.hero.buttonLink}
                        imageUrl={content.hero.imageUrl}
                        {...heroProps}
                    />
                )
        }
    }

    // Render the features section
    const renderFeatures = () => {
        const featuresStyle = content.features.style || "grid"
        const featuresProps = applyTheme({})

        switch (featuresStyle) {
            case "cards":
                return (
                    <CardFeatures
                        title={content.features.title}
                        subtitle={content.features.subtitle}
                        features={content.features.items.map((item) => ({
                            title: item.title,
                            description: item.description,
                            icon: item.icon,
                        }))}
                        {...featuresProps}
                    />
                )
            case "animated":
                return (
                    <AnimatedFeatures
                        title={content.features.title}
                        subtitle={content.features.subtitle}
                        features={content.features.items.map((item) => ({
                            title: item.title,
                            description: item.description,
                            icon: item.icon,
                        }))}
                        animationType="stagger"
                        {...featuresProps}
                    />
                )
            case "timeline":
                return (
                    <TimelineFeatures
                        title={content.features.title}
                        subtitle={content.features.subtitle}
                        features={content.features.items.map((item) => ({
                            title: item.title,
                            description: item.description,
                            icon: item.icon,
                        }))}
                        {...featuresProps}
                    />
                )
            default:
                return (
                    <GridFeatures
                        title={content.features.title}
                        subtitle={content.features.subtitle}
                        features={content.features.items.map((item) => ({
                            title: item.title,
                            description: item.description,
                            icon: item.icon,
                        }))}
                        {...featuresProps}
                    />
                )
        }
    }

    // Render the footer
    const renderFooter = () => {
        const footerStyle = content.footer.style || "standard"
        const footerProps = applyTheme({})

        switch (footerStyle) {
            case "modern":
                return (
                    <ModernFooter
                        companyName={content.footer.companyName}
                        copyright={content.footer.copyright}
                        links={content.footer.links}
                        socialLinks={content.footer.socialLinks}
                        showNewsletter={true}
                        {...footerProps}
                    />
                )
            case "creative":
                return (
                    <CreativeFooter
                        companyName={content.footer.companyName}
                        copyright={content.footer.copyright}
                        links={content.footer.links}
                        socialLinks={content.footer.socialLinks}
                        showNewsletter={true}
                        {...footerProps}
                    />
                )
            default:
                return (
                    <footer
                        className="bg-gray-100 py-12"
                        style={{ backgroundColor: footerProps.backgroundColor, color: footerProps.textColor }}
                    >
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-lg font-bold">{content.footer.companyName}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{content.footer.copyright}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-semibold mb-4">Links</h4>
                                        <ul className="space-y-2">
                                            {content.footer.links.map((link, index) => (
                                                <li key={index}>
                                                    <a href={link.link} className="text-sm text-gray-600 hover:text-gray-900">
                                                        {link.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold mb-4">Social</h4>
                                        <ul className="space-y-2">
                                            {content.footer.socialLinks.map((link, index) => (
                                                <li key={index}>
                                                    <a href={link.link} className="text-sm text-gray-600 hover:text-gray-900">
                                                        {link.platform}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                )
        }
    }

    // Render the JSON view
    const renderJson = () => {
        return (
            <Card>
                <CardContent className="p-6">
          <pre className="text-xs overflow-auto max-h-[600px] p-4 bg-gray-100 rounded-md">
            {JSON.stringify(content, null, 2)}
          </pre>
                </CardContent>
            </Card>
        )
    }

    // Handle theme change
    const handleThemeChange = (theme: Theme) => {
        setCurrentTheme(theme)
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                <div className="space-x-2">
                    <Button
                        variant={activeTab === "preview" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("preview")}
                    >
                        Preview
                    </Button>
                    <Button variant={activeTab === "json" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("json")}>
                        JSON
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeCustomizer onThemeChange={handleThemeChange} />
                    <Button variant="outline" size="sm" className="mr-2">
                        Edit
                    </Button>
                    <Button size="sm">Export</Button>
                </div>
            </div>

            {activeTab === "preview" && (
                <div
                    className="bg-white"
                    style={{ backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }}
                >
                    {renderHeader()}
                    {renderHero()}
                    {renderFeatures()}
                    {renderFooter()}
                </div>
            )}

            {activeTab === "json" && <div className="m-0 p-4">{renderJson()}</div>}
        </div>
    )
}
