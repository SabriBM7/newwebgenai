"use client"

import { useState, useRef } from "react"

interface VideoSectionProps {
    title?: string
    subtitle?: string
    description?: string
    videoUrl: string
    posterUrl?: string
    videoTitle?: string
    videoDescription?: string
    layout?: "full" | "split" | "card"
    autoplay?: boolean
    controls?: boolean
    muted?: boolean
    loop?: boolean
    theme?: {
        primaryColor?: string
        secondaryColor?: string
        backgroundColor?: string
        textColor?: string
    }
}

export function VideoSection({
                                 title = "Watch Our Story",
                                 subtitle = "Video Showcase",
                                 description = "Learn more about our company and our mission through this short video.",
                                 videoUrl,
                                 posterUrl,
                                 videoTitle,
                                 videoDescription,
                                 layout = "full",
                                 autoplay = false,
                                 controls = true,
                                 muted = true,
                                 loop = false,
                                 theme = {},
                             }: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(autoplay)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (!document.fullscreenElement) {
                videoRef.current
                    .requestFullscreen()
                    .then(() => {
                        setIsFullscreen(true)
                    })
                    .catch((err) => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`)
                    })
            } else {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }
    }

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {/* Section Header */}
                {(title || subtitle || description) && (
                    <div className="text-center mb-12">
                        {subtitle && (
                            <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: theme.primaryColor }}>
                                {subtitle}
                            </p>
                        )}
                        {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
                    </div>
                )}

                {/* Video Section */}
                {layout === "split" ? (
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative rounded-lg overflow-hidden">
                            <div className="aspect-video bg-gray-100">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    poster={posterUrl}
                                    autoPlay={autoplay}
                                    controls={controls}
                                    muted={muted}
                                    loop={loop}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {!controls && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={togglePlay}
                                            className="w-16 h-16 rounded-full bg-white bg-opacity-75 flex items-center justify-center transition-all hover:bg-opacity-100"
                                        >
                                            {isPlaying ? (
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            {videoTitle && <h3 className="text-2xl font-bold mb-4">{videoTitle}</h3>}
                            {videoDescription && <p className="text-gray-600">{videoDescription}</p>}
                        </div>
                    </div>
                ) : layout === "card" ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="relative">
                                <div className="aspect-video bg-gray-100">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        poster={posterUrl}
                                        autoPlay={autoplay}
                                        controls={controls}
                                        muted={muted}
                                        loop={loop}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {!controls && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={togglePlay}
                                                className="w-16 h-16 rounded-full bg-white bg-opacity-75 flex items-center justify-center transition-all hover:bg-opacity-100"
                                            >
                                                {isPlaying ? (
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(videoTitle || videoDescription) && (
                                <div className="p-6">
                                    {videoTitle && <h3 className="text-xl font-bold mb-2">{videoTitle}</h3>}
                                    {videoDescription && <p className="text-gray-600">{videoDescription}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="relative rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 max-w-5xl mx-auto">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                poster={posterUrl}
                                autoPlay={autoplay}
                                controls={controls}
                                muted={muted}
                                loop={loop}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {!controls && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute bottom-4 right-4 flex space-x-2">
                                        <button
                                            onClick={togglePlay}
                                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                                        >
                                            {isPlaying ? (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <button
                                        onClick={togglePlay}
                                        className="w-20 h-20 rounded-full bg-white bg-opacity-75 flex items-center justify-center transition-all hover:bg-opacity-100"
                                    >
                                        {isPlaying ? (
                                            <svg
                                                className="w-8 h-8"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-8 h-8"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {(videoTitle || videoDescription) && (
                            <div className="mt-6 text-center max-w-3xl mx-auto">
                                {videoTitle && <h3 className="text-xl font-bold mb-2">{videoTitle}</h3>}
                                {videoDescription && <p className="text-gray-600">{videoDescription}</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default VideoSection
