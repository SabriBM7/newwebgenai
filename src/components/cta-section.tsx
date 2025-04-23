import Link from "next/link"
import { cn, getButtonClasses, getTextAlignmentClasses } from "@/lib/utils"
import type { ButtonType, ButtonStyle, TextAlignment } from "@/types/index"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
    title?: string
    subtitle?: string
    description?: string
    buttons?: ButtonType[]
    backgroundColor?: string
    textColor?: string
    buttonStyle?: ButtonStyle
    textAlignment?: TextAlignment
    fullWidth?: boolean
    keywords?: string[]
}

export default function CTASection({
                                       title = "Ready to Create Your Website?",
                                       subtitle = "Start building your website today with our AI-powered platform",
                                       description = "No coding required. Just describe what you want, and our AI will build it for you.",
                                       buttons,
                                       backgroundColor = "#3b82f6",
                                       textColor = "#ffffff",
                                       buttonStyle = "rounded",
                                       textAlignment = "center",
                                       fullWidth = false,
                                       keywords = [],
                                   }: CTASectionProps) {
    // Default buttons if none are provided
    const defaultButtons: ButtonType[] = [
        { label: "Get Started Free", link: "/create", type: "primary" },
        { label: "Schedule Demo", link: "#demo", type: "secondary" },
    ]

    // Use provided buttons or fall back to default buttons
    const displayButtons = buttons || defaultButtons

    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className={cn("px-4", fullWidth ? "w-full" : "container mx-auto")}>
                <div className={cn("max-w-3xl mx-auto", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-xl mb-4">{subtitle}</p>}
                    {description && <p className="text-lg opacity-80 mb-8">{description}</p>}

                    {displayButtons && displayButtons.length > 0 && (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {displayButtons.map((button, index) => (
                                <Link key={index} href={button.link} className={getButtonClasses(button.type, buttonStyle)}>
                                    {button.label}
                                    {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
