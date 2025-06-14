import { Button } from "@/ui/button"

interface CorporateHeroProps {
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
    backgroundColor?: string
    textColor?: string
    alignment?: "left" | "center" | "right"
}

export default function CorporateHero({
                                          title,
                                          subtitle,
                                          description,
                                          primaryButton,
                                          secondaryButton,
                                          imageUrl,
                                          backgroundColor = "bg-gradient-to-r from-blue-600 to-purple-600",
                                          textColor = "text-white",
                                          alignment = "center"
                                      }: CorporateHeroProps) {
    const alignmentClasses = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end"
    }

    return (
        <section className={`${backgroundColor} ${textColor} py-20`}>
            <div className="container mx-auto px-4">
                <div className={`flex flex-col ${alignmentClasses[alignment]}`}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
                        {title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 max-w-3xl">
                        {subtitle}
                    </h2>
                    <p className="text-lg mb-8 max-w-3xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {primaryButton && (
                            <Button asChild variant="secondary">
                                <a href={primaryButton.link}>
                                    {primaryButton.label}
                                </a>
                            </Button>
                        )}
                        {secondaryButton && (
                            <Button asChild variant="outline">
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