"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { ArrowRight, Database, Cpu, Layers } from "lucide-react"
import { cn } from "../../../../lib/utils"

export interface ButtonConfig {
    label: string
    link: string
    type?: "primary" | "secondary" | "outline"
    icon?: React.ReactNode
}

export interface TechHeroProps {
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
    animation?: "fade" | "slide" | "zoom"
    showStats?: boolean
    stats?: Array<{ label: string; value: string }>
    gradientText?: boolean
    showIcons?: boolean
    maxWidth?: string
    height?: string
    layout?: "standard" | "imageFirst" | "fullWidth"
}

export default function TechHero({
                                     title,
                                     subtitle,
                                     description,
                                     backgroundImage,
                                     backgroundColor = "#0f172a",
                                     overlayColor = "rgba(0,0,0,0.7)",
                                     textColor = "#ffffff",
                                     fontFamily = "Inter, sans-serif",
                                     buttons = [
                                         { label: "Get Started", link: "#", type: "primary" },
                                         { label: "Learn More", link: "#", type: "secondary" },
                                     ],
                                     imageUrl,
                                     imageAlt = "Hero Image",
                                     buttonStyle = "rounded",
                                     textAlignment = "left",
                                     keywords = ["technology", "innovation", "solutions"],
                                     animation = "fade",
                                     showStats = false,
                                     stats = [
                                         { label: "Active Users", value: "10K+" },
                                         { label: "Countries", value: "20+" },
                                         { label: "Servers", value: "99.9%" },
                                     ],
                                     gradientText = false,
                                     showIcons = true,
                                     maxWidth = "1200px",
                                     height = "auto",
                                     layout = "standard",
                                 }: TechHeroProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const getAnimationClass = () => {
        switch (animation) {
            case "fade":
                return "animate-fade-in"
            case "slide":
                return "animate-slide-up"
            case "zoom":
                return "animate-zoom-in"
            default:
                return ""
        }
    }

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
            case "imageFirst":
                return "flex-col-reverse md:flex-row-reverse"
            case "fullWidth":
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
            className={cn("w-full py-12 md:py-24 lg:py-32 relative overflow-hidden", isVisible && getAnimationClass())}
            style={{
                ...backgroundStyle,
                color: textColor,
                fontFamily,
                minHeight: height,
            }}
        >
            {/* Overlay */}
            {backgroundImage && <div className="absolute inset-0 z-0" style={{ backgroundColor: overlayColor }}></div>}

            <div className="container relative z-10 mx-auto px-4" style={{ maxWidth }}>
                <div className={cn("flex gap-8 items-center", getLayoutClasses())}>
                    <div className={cn("flex flex-col space-y-4 flex-1", getTextAlignmentClass())}>
                        {keywords && keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {keywords.map((keyword, index) => (
                                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {keyword}
                  </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h1
                                className={cn(
                                    "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
                                    gradientText && "bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500",
                                )}
                            >
                                {title}
                            </h1>
                            {subtitle && <p className="text-xl md:text-2xl font-medium">{subtitle}</p>}
                            {description && <p className="max-w-[600px] text-muted-foreground md:text-xl">{description}</p>}
                        </div>

                        {showIcons && (
                            <div className="flex gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <Cpu className="h-5 w-5 text-primary" />
                                    <span className="text-sm">Advanced AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    <span className="text-sm">Secure Storage</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-primary" />
                                    <span className="text-sm">Scalable</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 sm:flex-row mt-2">
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

                        {showStats && (
                            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {imageUrl && layout !== "fullWidth" && (
                        <div className="flex-1 flex justify-center items-center">
                            <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={imageAlt}
                                className={cn(
                                    "max-w-full h-auto rounded-lg shadow-lg",
                                    animation === "zoom" && "transform transition-transform hover:scale-105",
                                )}
                            />
                        </div>
                    )}
                </div>

                {imageUrl && layout === "fullWidth" && (
                    <div className="mt-8 flex justify-center">
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={imageAlt}
                            className="max-w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

