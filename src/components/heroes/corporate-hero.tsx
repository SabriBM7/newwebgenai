"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react"
import { cn } from "../../../../lib/utils"

export interface ButtonConfig {
    label: string
    link: string
    type?: "primary" | "secondary" | "outline"
    icon?: React.ReactNode
}

export interface CorporateHeroProps {
    title: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    backgroundColor?: string
    overlayColor?: string
    textColor?: string
    fontFamily?: string
    buttons?: ButtonConfig[]
    imageUrl?: string
    imageAlt?: string
    buttonStyle?: "rounded" | "square" | "pill"
    textAlignment?: "left" | "center" | "right"
    keywords?: string[]
    showTrustBadges?: boolean
    trustBadges?: Array<{ name: string; logo?: string }>
    showBulletPoints?: boolean
    bulletPoints?: string[]
    showCta?: boolean
    ctaText?: string
    layout?: "standard" | "reversed" | "stacked"
    shadow?: boolean
    border?: boolean
}

export default function CorporateHero({
                                          title,
                                          subtitle,
                                          description,
                                          backgroundImage,
                                          backgroundColor = "#f8f9fa",
                                          overlayColor = "rgba(255,255,255,0.9)",
                                          textColor = "#333333",
                                          fontFamily = "Inter, sans-serif",
                                          buttons = [
                                              { label: "Request Demo", link: "#", type: "primary" },
                                              { label: "Learn More", link: "#", type: "outline" },
                                          ],
                                          imageUrl,
                                          imageAlt = "Corporate Hero Image",
                                          buttonStyle = "rounded",
                                          textAlignment = "left",
                                          keywords = ["business", "enterprise", "professional"],
                                          showTrustBadges = false,
                                          trustBadges = [{ name: "Trusted by Fortune 500" }, { name: "ISO Certified" }, { name: "Award Winning" }],
                                          showBulletPoints = false,
                                          bulletPoints = ["Enterprise-grade security", "Dedicated support team", "Customizable solutions"],
                                          showCta = false,
                                          ctaText = "Schedule a consultation with our experts today",
                                          layout = "standard",
                                          shadow = true,
                                          border = false,
                                      }: CorporateHeroProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const getButtonClass = (type = "primary") => {
        const baseClasses = cn({
            "rounded-none": buttonStyle === "square",
            "rounded-full": buttonStyle === "pill",
            "rounded-md": buttonStyle === "rounded",
        })

        switch (type) {
            case "secondary":
                return cn(baseClasses, "bg-secondary text-secondary-foreground hover:bg-secondary/90")
            case "outline":
                return cn(baseClasses, "border border-primary bg-transparent text-primary hover:bg-primary/10")
            default:
                return cn(baseClasses, "bg-primary text-primary-foreground hover:bg-primary/90")
        }
    }

    const getTextAlignmentClass = () => {
        switch (textAlignment) {
            case "center":
                return "text-center items-center"
            case "right":
                return "text-right items-end"
            default:
                return "text-left items-start"
        }
    }

    const getLayoutClasses = () => {
        switch (layout) {
            case "reversed":
                return "flex-col-reverse md:flex-row-reverse"
            case "stacked":
                return "flex-col"
            default:
                return "flex-col md:flex-row"
        }
    }

    const backgroundStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
        : { backgroundColor }

    return (
        <section
            className={cn(
                "w-full py-12 md:py-24 lg:py-32 relative overflow-hidden",
                shadow && "shadow-md",
                border && "border-b",
            )}
            style={{
                ...backgroundStyle,
                color: textColor,
                fontFamily,
            }}
        >
            {/* Overlay */}
            {backgroundImage && <div className="absolute inset-0 z-0" style={{ backgroundColor: overlayColor }}></div>}

            <div className="container relative z-10 mx-auto px-4">
                <div className={cn("flex gap-8 items-center", getLayoutClasses())}>
                    <div className={cn("flex flex-col space-y-4 flex-1", getTextAlignmentClass())}>
                        {keywords && keywords.length > 0 && (
                            <div className={cn("flex flex-wrap gap-2 mb-2", textAlignment === "center" ? "justify-center" : "")}>
                                {keywords.map((keyword, index) => (
                                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {keyword}
                  </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{title}</h1>
                            {subtitle && <p className="text-xl md:text-2xl font-medium text-muted-foreground">{subtitle}</p>}
                            {description && <p className="max-w-[600px] text-muted-foreground md:text-xl">{description}</p>}
                        </div>

                        {showBulletPoints && bulletPoints && bulletPoints.length > 0 && (
                            <div className="space-y-2 mt-4">
                                {bulletPoints.map((point, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div
                            className={cn("flex flex-col gap-2 sm:flex-row mt-2", textAlignment === "center" ? "justify-center" : "")}
                        >
                            {buttons &&
                                buttons.map((button, index) => (
                                    <Button key={index} asChild size="lg" className={getButtonClass(button.type)}>
                                        <Link href={button.link}>
                                            {button.label}
                                            {button.icon || (index === 0 && <ArrowRight className="ml-2 h-4 w-4" />)}
                                        </Link>
                                    </Button>
                                ))}
                        </div>

                        {showTrustBadges && trustBadges && trustBadges.length > 0 && (
                            <div
                                className={cn(
                                    "flex flex-wrap gap-4 mt-6 items-center",
                                    textAlignment === "center" ? "justify-center" : "",
                                )}
                            >
                                <span className="text-sm text-muted-foreground">Trusted by:</span>
                                {trustBadges.map((badge, index) => (
                                    <div key={index} className="flex items-center">
                                        {badge.logo ? (
                                            <img src={badge.logo || "/placeholder.svg"} alt={badge.name} className="h-8" />
                                        ) : (
                                            <span className="text-sm font-medium">{badge.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {imageUrl && layout !== "stacked" && (
                        <div className="flex-1 flex justify-center items-center">
                            <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={imageAlt}
                                className={cn("max-w-full h-auto rounded-lg", shadow && "shadow-lg")}
                            />
                        </div>
                    )}
                </div>

                {imageUrl && layout === "stacked" && (
                    <div className="mt-8 flex justify-center">
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={imageAlt}
                            className={cn("max-w-full h-auto rounded-lg", shadow && "shadow-lg")}
                        />
                    </div>
                )}

                {showCta && (
                    <div
                        className={cn(
                            "mt-12 p-6 bg-muted rounded-lg flex flex-col md:flex-row items-center justify-between gap-4",
                            shadow && "shadow-md",
                        )}
                    >
                        <p className="text-lg font-medium">{ctaText}</p>
                        <Button asChild>
                            <Link href="#">
                                Contact Us <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

