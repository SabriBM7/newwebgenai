"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn, getButtonClasses, getTextAlignmentClasses } from "@/lib/utils"
import type { ButtonType, ButtonStyle, TextAlignment } from "@/types/index"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoHeroProps {
    title?: string
    subtitle?: string
    description?: string
    videoUrl?: string
    videoPoster?: string
    overlayColor?: string
    textColor?: string
    fontFamily?: string
    buttons?: ButtonType[]
    buttonStyle?: ButtonStyle
    textAlignment?: TextAlignment
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    keywords?: string[]
}

export default function VideoHero({
                                      title = "Create Stunning Websites",
                                      subtitle = "Powered by AI and Your Imagination",
                                      description = "Our platform helps you build beautiful websites in minutes without any coding knowledge required.",
                                      videoUrl = "/placeholder.mp4",
                                      videoPoster = "/placeholder.svg?height=1080&width=1920&text=Video+Placeholder",
                                      overlayColor = "rgba(0,0,0,0.6)",
                                      textColor = "#ffffff",
                                      fontFamily = "sans-serif",
                                      buttons,
                                      buttonStyle = "rounded",
                                      textAlignment = "center",
                                      autoplay = true,
                                      muted = true,
                                      loop = true,
                                      keywords = [],
                                  }: VideoHeroProps) {
    const [isPlaying, setIsPlaying] = useState(autoplay)
    const [isMuted, setIsMuted] = useState(muted)
    const videoRef = useRef<HTMLVideoElement>(null)

    const defaultButtons: ButtonType[] = [
        { label: "Get Started", link: "/create", type: "primary" },
        { label: "Learn More", link: "#features", type: "secondary" },
    ]

    const displayButtons = buttons || defaultButtons
    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

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

    const containerStyle = {
        color: textColor,
        fontFamily: fontFamily,
    }

    const overlayStyle = {
        backgroundColor: overlayColor,
    }

    return (
        <section
            className="relative h-screen flex items-center justify-center overflow-hidden"
            style={containerStyle}
            data-keywords={keywords.join(",")}
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={videoPoster}
                    autoPlay={autoplay}
                    muted={muted}
                    loop={loop}
                    playsInline
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 z-10" style={overlayStyle}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
                <div className={cn("max-w-4xl mx-auto space-y-6", textAlignmentClass)}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
                    {subtitle && <h2 className="text-xl md:text-2xl font-medium opacity-90">{subtitle}</h2>}
                    {description && <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">{description}</p>}

                    {displayButtons && displayButtons.length > 0 && (
                        <div className="flex flex-wrap gap-4 justify-center mt-8">
                            {displayButtons.map((button, index) => (
                                <Link key={index} href={button.link} className={getButtonClasses(button.type, buttonStyle)}>
                                    {button.label}
                                </Link>
                            ))}
                        </div>
                    )}
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
