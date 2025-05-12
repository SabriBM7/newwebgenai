"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientHeroProps {
    title: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    imageUrl?: string
    imageAlt?: string
    backgroundColor?: string
    textColor?: string
    alignment?: "left" | "center" | "right"
    keywords?: string[]
    gradientColors?: string[]
}

export default function GradientHero({
                                         title,
                                         subtitle,
                                         description,
                                         buttonText = "Get Started",
                                         buttonLink = "#",
                                         secondaryButtonText,
                                         secondaryButtonLink = "#",
                                         imageUrl,
                                         imageAlt = "Hero Image",
                                         backgroundColor = "#0f172a",
                                         textColor = "#ffffff",
                                         alignment = "left",
                                         keywords = [],
                                         gradientColors = ["#4f46e5", "#7c3aed", "#d946ef"],
                                     }: GradientHeroProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const alignmentClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }

    const containerStyle = {
        backgroundColor,
        color: textColor,
    }

    const gradientStyle = {
        background: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
    }

    if (!mounted) return null

    return (
        <section
            className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
            style={containerStyle}
            data-keywords={keywords.join(",")}
        >
            {/* Gradient background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={gradientStyle}></div>
            </div>

            {/* Animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {mounted && (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${gradientColors[0]}33, transparent 70%)`,
                            }}
                            animate={{
                                x: [0, 30, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${gradientColors[1]}22, transparent 70%)`,
                            }}
                            animate={{
                                x: [0, -40, 0],
                                y: [0, 40, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </>
                )}
            </div>

            <div className="container relative mx-auto px-4 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={cn("max-w-2xl", alignmentClasses[alignment])}>
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h1>

                        {subtitle && (
                            <motion.p
                                className="text-xl md:text-2xl mb-4 opacity-90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        {description && (
                            <motion.p
                                className="text-lg mb-8 opacity-80"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {description}
                            </motion.p>
                        )}

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {buttonText && (
                                <Button
                                    asChild
                                    className="relative overflow-hidden group"
                                    style={{
                                        background: gradientColors[0],
                                    }}
                                >
                                    <Link href={buttonLink}>
                                        <span className="relative z-10">{buttonText}</span>
                                        <span
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background: `linear-gradient(90deg, ${gradientColors[1]}, ${gradientColors[2]})`,
                                            }}
                                        ></span>
                                    </Link>
                                </Button>
                            )}

                            {secondaryButtonText && (
                                <Button variant="outline" asChild className="border-2">
                                    <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                                </Button>
                            )}
                        </motion.div>
                    </div>

                    {imageUrl && (
                        <motion.div
                            className="flex justify-center lg:justify-end"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="relative w-full max-w-lg h-[300px] md:h-[400px]">
                                <Image
                                    src={imageUrl || "/placeholder.svg"}
                                    alt={imageAlt}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="drop-shadow-xl"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
