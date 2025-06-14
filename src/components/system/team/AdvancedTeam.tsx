"use client"

import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamMember {
    name: string
    role: string
    bio?: string
    image?: string
    social?: {
        email?: string
        twitter?: string
        linkedin?: string
        facebook?: string
    }
}

interface AdvancedTeamProps {
    title?: string
    subtitle?: string
    description?: string
    members: TeamMember[]
    variant?: "grid" | "list" | "cards" | "minimal"
    columns?: 2 | 3 | 4
    backgroundColor?: string
    textColor?: string
    accentColor?: string
}

export default function AdvancedTeam({
                                         title = "Our Team",
                                         subtitle = "Meet the people behind our success",
                                         description,
                                         members = [],
                                         variant = "grid",
                                         columns = 3,
                                         backgroundColor = "white",
                                         textColor = "black",
                                         accentColor = "#3b82f6",
                                     }: AdvancedTeamProps) {
    // Default team members if none provided
    const defaultMembers: TeamMember[] = [
        {
            name: "John Smith",
            role: "CEO & Founder",
            bio: "John has over 15 years of experience in the industry and leads our company vision.",
            image: "/placeholder.svg?height=300&width=300&text=JS",
            social: {
                email: "john@example.com",
                twitter: "#",
                linkedin: "#",
            },
        },
        {
            name: "Sarah Johnson",
            role: "CTO",
            bio: "Sarah oversees all technical aspects and innovations within our company.",
            image: "/placeholder.svg?height=300&width=300&text=SJ",
            social: {
                email: "sarah@example.com",
                linkedin: "#",
            },
        },
        {
            name: "Michael Chen",
            role: "Design Director",
            bio: "Michael brings creative vision and design excellence to all our projects.",
            image: "/placeholder.svg?height=300&width=300&text=MC",
            social: {
                email: "michael@example.com",
                twitter: "#",
            },
        },
        {
            name: "Emily Rodriguez",
            role: "Marketing Lead",
            bio: "Emily develops our marketing strategies and builds our brand presence.",
            image: "/placeholder.svg?height=300&width=300&text=ER",
            social: {
                email: "emily@example.com",
                linkedin: "#",
                facebook: "#",
            },
        },
    ]

    const displayMembers = members.length > 0 ? members : defaultMembers

    const renderSocialLinks = (social?: TeamMember["social"]) => {
        if (!social) return null

        return (
            <div className="flex space-x-3 mt-3">
                {social.email && (
                    <a
                        href={`mailto:${social.email}`}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label={`Email ${social.email}`}
                    >
                        <Mail size={18} />
                    </a>
                )}
                {social.twitter && (
                    <a
                        href={social.twitter}
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter profile"
                    >
                        <Twitter size={18} />
                    </a>
                )}
                {social.linkedin && (
                    <a
                        href={social.linkedin}
                        className="text-gray-500 hover:text-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                    >
                        <Linkedin size={18} />
                    </a>
                )}
                {social.facebook && (
                    <a
                        href={social.facebook}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook profile"
                    >
                        <Facebook size={18} />
                    </a>
                )}
            </div>
        )
    }

    const renderGrid = () => {
        return (
            <div
                className={cn(
                    "grid gap-8",
                    columns === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : columns === 3
                            ? "grid-cols-1 md:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                )}
            >
                {displayMembers.map((member, index) => (
                    <div key={index} className="text-center">
                        {member.image && (
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
                            />
                        )}
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-gray-600 mb-2">{member.role}</p>
                        {member.bio && <p className="text-gray-500 mb-3">{member.bio}</p>}
                        {renderSocialLinks(member.social)}
                    </div>
                ))}
            </div>
        )
    }

    const renderCards = () => {
        return (
            <div
                className={cn(
                    "grid gap-8",
                    columns === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : columns === 3
                            ? "grid-cols-1 md:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                )}
            >
                {displayMembers.map((member, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {member.image && (
                            <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>
                                {member.role}
                            </p>
                            {member.bio && <p className="text-gray-500 mb-4">{member.bio}</p>}
                            {renderSocialLinks(member.social)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderList = () => {
        return (
            <div className="space-y-8">
                {displayMembers.map((member, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {member.image && (
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        )}
                        <div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm font-medium mb-2" style={{ color: accentColor }}>
                                {member.role}
                            </p>
                            {member.bio && <p className="text-gray-500 mb-3">{member.bio}</p>}
                            {renderSocialLinks(member.social)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderMinimal = () => {
        return (
            <div
                className={cn(
                    "grid gap-6",
                    columns === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : columns === 3
                            ? "grid-cols-1 md:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                )}
            >
                {displayMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        {member.image && (
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-16 h-16 object-cover rounded-full"
                            />
                        )}
                        <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            {renderSocialLinks(member.social)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section
            className="py-16 px-4"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-xl mb-4">{subtitle}</p>
                    {description && <p className="max-w-3xl mx-auto text-gray-500">{description}</p>}
                </div>

                {variant === "grid" && renderGrid()}
                {variant === "cards" && renderCards()}
                {variant === "list" && renderList()}
                {variant === "minimal" && renderMinimal()}
            </div>
        </section>
    )
}
