"use client"

import Image from "next/image"
import Link from "next/link"
import { cn, getTextAlignmentClasses } from "@/lib/utils"
import type { TextAlignment } from "@/types"
import { Twitter, Linkedin, Mail, Github } from "lucide-react"

interface SocialLink {
    platform: "twitter" | "linkedin" | "email" | "github"
    url: string
}

interface TeamMember {
    name: string
    role: string
    bio?: string
    imageUrl: string
    socialLinks?: SocialLink[]
}

interface TeamSectionProps {
    title?: string
    subtitle?: string
    members?: TeamMember[]
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    textAlignment?: TextAlignment
    columns?: 2 | 3 | 4
    style?: "cards" | "simple" | "circle"
    keywords?: string[]
}

export default function TeamSection({
                                        title = "Meet Our Team",
                                        subtitle = "The talented people behind our success",
                                        members,
                                        backgroundColor = "#ffffff",
                                        textColor = "#000000",
                                        accentColor = "#3b82f6",
                                        textAlignment = "center",
                                        columns = 3,
                                        style = "cards",
                                        keywords = [],
                                    }: TeamSectionProps) {
    const defaultMembers: TeamMember[] = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "Sarah has over 15 years of experience in tech and is passionate about making website creation accessible to everyone.",
            imageUrl: "/placeholder.svg?height=300&width=300&text=SJ",
            socialLinks: [
                { platform: "twitter", url: "https://twitter.com" },
                { platform: "linkedin", url: "https://linkedin.com" },
                { platform: "email", url: "mailto:sarah@example.com" },
            ],
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "Michael leads our engineering team and has a background in AI and machine learning.",
            imageUrl: "/placeholder.svg?height=300&width=300&text=MC",
            socialLinks: [
                { platform: "github", url: "https://github.com" },
                { platform: "linkedin", url: "https://linkedin.com" },
                { platform: "twitter", url: "https://twitter.com" },
            ],
        },
        {
            name: "Emma Rodriguez",
            role: "Head of Design",
            bio: "Emma ensures that all websites created on our platform are beautiful, functional, and user-friendly.",
            imageUrl: "/placeholder.svg?height=300&width=300&text=ER",
            socialLinks: [
                { platform: "linkedin", url: "https://linkedin.com" },
                { platform: "twitter", url: "https://twitter.com" },
                { platform: "email", url: "mailto:emma@example.com" },
            ],
        },
    ]

    const displayMembers = members || defaultMembers
    const textAlignmentClass = getTextAlignmentClasses(textAlignment)

    const sectionStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    }

    const accentStyle = {
        color: accentColor,
    }

    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-2 lg:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-4",
    }

    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case "twitter":
                return <Twitter size={18} />
            case "linkedin":
                return <Linkedin size={18} />
            case "email":
                return <Mail size={18} />
            case "github":
                return <Github size={18} />
            default:
                return null
        }
    }

    return (
        <section className="py-16 md:py-24" style={sectionStyle} data-keywords={keywords.join(",")}>
            <div className="container mx-auto px-4">
                <div className={cn("max-w-3xl mx-auto mb-12", textAlignmentClass)}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
                </div>

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
                    {displayMembers.map((member, index) => (
                        <div
                            key={index}
                            className={cn(
                                textAlignmentClass,
                                style === "cards" && "bg-white rounded-lg shadow-sm overflow-hidden",
                                style === "simple" && "p-4",
                            )}
                        >
                            <div
                                className={cn(
                                    "relative mb-4 overflow-hidden",
                                    style === "circle" && "rounded-full mx-auto",
                                    style === "circle" ? "w-48 h-48" : "w-full aspect-square",
                                )}
                            >
                                <Image src={member.imageUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                            </div>

                            <div className={style === "cards" ? "p-6" : ""}>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-sm font-medium mb-3" style={accentStyle}>
                                    {member.role}
                                </p>

                                {member.bio && <p className="text-sm opacity-80 mb-4">{member.bio}</p>}

                                {member.socialLinks && member.socialLinks.length > 0 && (
                                    <div className="flex gap-3 justify-center mt-4">
                                        {member.socialLinks.map((link, linkIndex) => (
                                            <Link
                                                key={linkIndex}
                                                href={link.url}
                                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${member.name}'s ${link.platform}`}
                                            >
                                                {getSocialIcon(link.platform)}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
