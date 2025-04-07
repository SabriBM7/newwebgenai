"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react"
import { cn } from "../../../../lib/utils"

export interface ButtonConfig {
    label: string
    link: string
    type?: "primary" | "secondary" | "outline"
    icon?: React.ReactNode
}

export interface CreativeHeroProps {
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
    animation?: "float" | "bounce" | "wave"
    colorAccent?: string
    showParticles?: boolean
    imageStyle?: "standard" | "circular" | "angled"
    titleEffect?: "none" | "underline" | "highlight"
    decorativeElements?: boolean
    layout?: "standard" | "reversed" | "overlapping"
}

export default function CreativeHero({
                                         title,
                                         subtitle,
                                         description,
                                         backgroundImage,
                                         backgroundColor = "#ffffff",
                                         overlayColor = "rgba(255,255,255,0.8)",
                                         textColor = "#333333",
                                         fontFamily = "Poppins, sans-serif",
                                         buttons = [
                                             { label: "Get Started", link: "#", type: "primary" },
                                             { label: "View Portfolio", link: "#", type: "outline" },
                                         ],
                                         imageUrl,
                                         imageAlt = "Creative Hero Image",
                                         buttonStyle = "pill",
                                         textAlignment = "center",
                                         keywords = ["creative", "design", "innovative"],
                                         animation = "float",
                                         colorAccent = "#ff6b6b",
                                         showParticles = false,
                                         imageStyle = "standard",
                                         titleEffect = "none",
                                         decorativeElements = true,
                                         layout = "standard",
                                     }: CreativeHeroProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const getAnimationClass = () => {
        switch (animation) {
            case "float":
                return "animate-float"
            case "bounce":
                return "animate-bounce"
            case "wave":
                return "animate-pulse"
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
                return cn(baseClasses, "bg-white text-gray-800 hover:bg-gray-100")
            case "outline":
                return cn(baseClasses, "border-2 bg-transparent hover:bg-white/10")
            default:
                return cn(baseClasses)
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

    const getImageStyleClass = () => {
        switch (imageStyle) {
            case "circular":
                return "rounded-full"
            case "angled":
                return "transform -rotate-3"
            default:
                return "rounded-lg"
        }
    }

    const getTitleEffectClass = () => {
        switch (titleEffect) {
            case "underline":
                return 'relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary'
            case "highlight":
                return "px-2 py-1 bg-primary/20 rounded-md inline-block"
            default:
                return ""
        }
    }

    const getLayoutClasses = () => {
        switch (layout) {
            case "reversed":
                return "flex-col-reverse md:flex-row-reverse"
            case "overlapping":
                return "flex-col relative"
            default:
                return "flex-col md:flex-row"
        }
    }

    const backgroundStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
        : { backgroundColor }

    return (
        <section
            className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
            style={{
                ...backgroundStyle,
                color: textColor,
                fontFamily,
            }}
        >
            {/* Overlay */}
            {backgroundImage && <div className="absolute inset-0 z-0" style={{ backgroundColor: overlayColor }}></div>}

            {/* Decorative Elements */}
            {decorativeElements && (
                <>
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20 z-0"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/10 z-0"></div>
                    <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-secondary/20 z-0"></div>
                </>
            )}

            {/* Particles */}
            {showParticles && (
                <div className="absolute inset-0 z-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-float"
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                backgroundColor: colorAccent,
                                opacity: Math.random() * 0.5 + 0.2,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 5 + 3}s`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        ></div>
                    ))}
                </div>
            )}

            <div className="container relative z-10 mx-auto px-4">
                <div className={cn("flex gap-8 items-center", getLayoutClasses())}>
                    <div className={cn("flex flex-col space-y-4 flex-1", getTextAlignmentClass())}>
                        {keywords && keywords.length > 0 && (
                            <div className={cn("flex flex-wrap gap-2 mb-2", textAlignment === "center" ? "justify-center" : "")}>
                                {keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-3 py-1 rounded-full"
                                        style={{ backgroundColor: `${colorAccent}20`, color: colorAccent }}
                                    >
                    {keyword}
                  </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h1
                                className={cn(
                                    "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
                                    getTitleEffectClass(),
                                    isVisible && getAnimationClass(),
                                )}
                                style={{ color: textColor }}
                            >
                                {title}
                                {decorativeElements && (
                                    <Sparkles className="inline-block ml-2 text-primary" size={24} style={{ color: colorAccent }} />
                                )}
                            </h1>
                            {subtitle && <p className="text-xl md:text-2xl font-medium">{subtitle}</p>}
                            {description && <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">{description}</p>}
                        </div>

                        {decorativeElements && (
                            <div className={cn("flex gap-4 mt-4", textAlignment === "center" ? "justify-center" : "")}>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5" style={{ color: colorAccent }} />
                                    <span className="text-sm">Creative</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Heart className="h-5 w-5" style={{ color: colorAccent }} />
                                    <span className="text-sm">Passionate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" style={{ color: colorAccent }} />
                                    <span className="text-sm">Innovative</span>
                                </div>
                            </div>
                        )}

                        <div
                            className={cn("flex flex-col gap-2 sm:flex-row mt-2", textAlignment === "center" ? "justify-center" : "")}
                        >
                            {buttons &&
                                buttons.map((button, index) => (
                                    <Button
                                        key={index}
                                        asChild
                                        size="lg"
                                        className={getButtonClass(button.type)}
                                        style={{
                                            backgroundColor: button.type === "primary" ? colorAccent : "transparent",
                                            borderColor: colorAccent,
                                            color: button.type === "primary" ? "#fff" : colorAccent,
                                        }}
                                    >
                                        <Link href={button.link}>
                                            {button.label}
                                            {button.icon || (index === 0 && <ArrowRight className="ml-2 h-4 w-4" />)}
                                        </Link>
                                    </Button>
                                ))}
                        </div>
                    </div>

                    {imageUrl && layout !== "overlapping" && (
                        <div className="flex-1 flex justify-center items-center">
                            <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={imageAlt}
                                className={cn("max-w-full h-auto shadow-lg", getImageStyleClass(), isVisible && getAnimationClass())}
                            />
                        </div>
                    )}
                </div>

                {imageUrl && layout === "overlapping" && (
                    <div className="mt-8 flex justify-center">
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={imageAlt}
                            className={cn("max-w-full h-auto shadow-lg -mt-16 z-20 relative", getImageStyleClass())}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

