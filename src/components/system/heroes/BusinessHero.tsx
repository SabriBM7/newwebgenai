"use client"

import { Button } from "@/ui/button"

interface BusinessHeroProps {
    title: string
    subtitle: string
    description: string
    primaryButton?: {
        label: string
        link: string
    }
    secondaryButton?: {
        label: string
        link: string
    }
    imageUrl?: string
    videoUrl?: string
    backgroundColor?: string
    textColor?: string
    overlay?: number
}

export default function BusinessHero({
                                         title,
                                         subtitle,
                                         description,
                                         primaryButton,
                                         secondaryButton,
                                         imageUrl,
                                         videoUrl,
                                         backgroundColor = "bg-gradient-to-r from-blue-600 to-purple-600",
                                         textColor = "text-white",
                                         overlay = 40
                                     }: BusinessHeroProps) {
    return (
        <section className={`relative ${backgroundColor} ${textColor} min-h-[80vh] flex items-center`}>
            {/* Background media */}
            <div className="absolute inset-0 z-0">
                {videoUrl ? (
                    <video
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                ) : null}
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `rgba(0,0,0,${overlay/100})` }}
                ></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 py-20">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6">
                        {subtitle}
                    </h2>
                    <p className="text-lg mb-8">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {primaryButton && (
                            <Button asChild size="lg">
                                <a href={primaryButton.link}>
                                    {primaryButton.label}
                                </a>
                            </Button>
                        )}
                        {secondaryButton && (
                            <Button asChild variant="secondary" size="lg">
                                <a href={secondaryButton.link}>
                                    {secondaryButton.label}
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}