import { Button } from "@/ui/button"
import Link from "next/link"

interface CTASectionProps {
    title: string
    description?: string
    primaryButtonText?: string
    primaryButtonHref?: string
    secondaryButtonText?: string
    secondaryButtonHref?: string
    backgroundColor?: string
    textColor?: string
}

export default function CTASection({
                                       title,
                                       description,
                                       primaryButtonText,
                                       primaryButtonHref = "#",
                                       secondaryButtonText,
                                       secondaryButtonHref = "#",
                                       backgroundColor = "bg-indigo-600",
                                       textColor = "text-white",
                                   }: CTASectionProps) {
    return (
        <section className={`${backgroundColor} ${textColor} py-16`}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    {description && <p className="text-lg mb-8 opacity-90">{description}</p>}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {primaryButtonText && (
                            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
                            </Button>
                        )}
                        {secondaryButtonText && (
                            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
