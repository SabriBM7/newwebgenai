"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoBackgroundHeroProps {
    title: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    videoUrl?: string
    videoPoster?: string
    overlayColor?: string
    overlayOpacity?: number
    textColor?: string
    textAlignment?: "left" | "center" | "right"
    keywords?: string[]
}

export default function VideoBackgroundHero({
                                                title,
                                                subtitle,
                                                description,
                                                buttonText = "Get Started",
                                                buttonLink = "#",
                                                secondaryButtonText,
                                                secondaryButtonLink = "#",
                                                videoUrl = "/placeholder.mp4",
                                                videoPoster = "/placeholder.svg?height=1080&width=1920&text=Video+Background",
                                                overlayColor = "#000000",
                                                overlayOpacity = 0.5,
                                                textColor = "#ffffff",
                                                textAlignment = "center",
                                                keywords = [],
                                            }: VideoBackgroundHeroProps) {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch((error) => {
                    console.error("Video play failed:", error)
                    setIsPlaying(false)
                })
            } else {
                videoRef.current.pause()
            }

            videoRef.current.muted = isMuted
        }
    }, [isPlaying, isMuted])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const alignmentClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
    }

    const overlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
    }

    return (
        <section
            className="relative h-screen flex items-center justify-center overflow-hidden"
            style={{ color: textColor }}
            data-keywords={keywords.join(",")}
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={videoPoster}
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 z-10" style={overlayStyle}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
                <div className={cn("max-w-4xl space-y-6", alignmentClasses[textAlignment])}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
                    {subtitle && <h2 className="text-xl md:text-2xl font-medium opacity-90">{subtitle}</h2>}
                    {description && <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">{description}</p>}

                    <div className={cn("flex flex-wrap gap-4", textAlignment === "center" ? "justify-center" : "")}>
                        {buttonText && (
                            <Button asChild size="lg" className="font-medium">
                                <Link href={buttonLink}>{buttonText}</Link>
                            </Button>
                        )}

                        {secondaryButtonText && (
                            <Button asChild variant="outline" size="lg" className="font-medium">
                                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>
        </section>
    )
}
