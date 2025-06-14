"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoBackgroundHeroProps {
    title?: string
    subtitle?: string
    description?: string
    primaryCTA?: string
    secondaryCTA?: string
    videoUrl?: string
    posterImage?: string
    overlayOpacity?: number
    theme?: any
}

export function VideoBackgroundHero({
                                        title = "Experience the Future",
                                        subtitle = "Innovation in Motion",
                                        description = "Immerse yourself in cutting-edge technology and discover solutions that transform the way you work, live, and connect with the world.",
                                        primaryCTA = "Get Started",
                                        secondaryCTA = "Learn More",
                                        videoUrl = "/placeholder.svg?height=1080&width=1920",
                                        posterImage = "/placeholder.svg?height=1080&width=1920",
                                        overlayOpacity = 0.6,
                                        theme,
                                    }: VideoBackgroundHeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.play().catch(() => {
                // Autoplay failed, which is expected in many browsers
                setIsPlaying(false)
            })
        }
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (video) {
            if (isPlaying) {
                video.pause()
            } else {
                video.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (video) {
            video.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    poster={posterImage}
                    onLoadedData={() => setIsLoaded(true)}
                >
                    <source src={videoUrl} type="video/mp4" />
                    {/* Fallback image if video fails to load */}
                    <img src={posterImage || "/placeholder.svg"} alt="Hero Background" className="w-full h-full object-cover" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30"></div>
            </div>

            {/* Video Controls */}
            <div className="absolute top-6 right-6 z-20 flex space-x-2">
                <button
                    onClick={togglePlay}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                    onClick={toggleMute}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    {/* Subtitle */}
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-8">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium uppercase tracking-wider">{subtitle}</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                        <span className="block animate-fade-in-up">{title.split(" ")[0]}</span>
                        <span
                            className="block animate-fade-in-up bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                            style={{ animationDelay: "0.2s" }}
                        >
              {title.split(" ").slice(1).join(" ")}
            </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
                        style={{ animationDelay: "0.6s" }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group px-8 py-4 text-lg"
                        >
                            {primaryCTA}
                            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg group"
                        >
                            {secondaryCTA}
                            <Play className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Custom CSS */}
            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </section>
    )
}
