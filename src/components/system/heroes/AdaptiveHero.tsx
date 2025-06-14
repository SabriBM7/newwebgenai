"use client"

import { Button } from "@/ui/button"

interface HeroItem {
    title: string
    description: string
    image?: string
}

interface AdaptiveHeroProps {
    variant: "image-left" | "image-right" | "centered" | "minimal"
    title: string
    subtitle: string
    description: string
    items?: HeroItem[]
    primaryButton?: { label: string; link: string }
    secondaryButton?: { label: string; link: string }
    backgroundColor?: string
    textColor?: string
}

export default function AdaptiveHero({
                                         variant = "centered",
                                         title,
                                         subtitle,
                                         description,
                                         items = [],
                                         primaryButton,
                                         secondaryButton,
                                         backgroundColor = "bg-gradient-to-r from-blue-600 to-purple-600",
                                         textColor = "text-white"
                                     }: AdaptiveHeroProps) {
    const renderVariant = () => {
        switch(variant) {
            case "image-left":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">{title}</h1>
                            <h2 className="text-xl font-semibold mb-6">{subtitle}</h2>
                            <p className="mb-8">{description}</p>
                            <div className="flex gap-4">
                                {primaryButton && <Button>{primaryButton.label}</Button>}
                                {secondaryButton && <Button variant="outline">{secondaryButton.label}</Button>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {items.slice(0,4).map((item, index) => (
                                <div key={index} className="bg-white/10 p-4 rounded-lg">
                                    {item.image && <img src={item.image} alt="" className="mb-2 rounded" />}
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case "minimal":
                return (
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4">{title}</h1>
                        <p className="text-xl mb-8">{description}</p>
                        {primaryButton && <Button size="lg">{primaryButton.label}</Button>}
                    </div>
                )
            default: // centered
                return (
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                        <h2 className="text-xl md:text-2xl font-semibold mb-6">{subtitle}</h2>
                        <p className="text-lg mb-8">{description}</p>
                        <div className="flex justify-center gap-4">
                            {primaryButton && <Button size="lg">{primaryButton.label}</Button>}
                            {secondaryButton && <Button variant="outline" size="lg">{secondaryButton.label}</Button>}
                        </div>
                    </div>
                )
        }
    }

    return (
        <section className={`${backgroundColor} ${textColor} py-20 px-4`}>
            <div className="container mx-auto">
                {renderVariant()}
            </div>
        </section>
    )
}