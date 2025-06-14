"use client"

import { useState } from "react"
import { Linkedin, Twitter, Github, Mail, X } from "lucide-react"

interface TeamMember {
    id: number
    name: string
    role: string
    department: string
    bio: string
    image: string
    skills: string[]
    social: {
        linkedin?: string
        twitter?: string
        github?: string
        email?: string
    }
    location: string
    joinDate: string
    achievements?: string[]
}

interface InteractiveTeamProps {
    title?: string
    subtitle?: string
    members?: TeamMember[]
    departments?: string[]
    theme?: any
}

export function InteractiveTeam({
                                    title = "Meet Our Team",
                                    subtitle = "The talented people behind our success",
                                    members = [
                                        {
                                            id: 1,
                                            name: "Sarah Johnson",
                                            role: "CEO & Founder",
                                            department: "Leadership",
                                            bio: "Visionary leader with 15+ years of experience in tech innovation and business strategy.",
                                            image: "/placeholder.svg?height=400&width=400",
                                            skills: ["Strategic Planning", "Leadership", "Innovation", "Business Development"],
                                            social: {
                                                linkedin: "#",
                                                twitter: "#",
                                                email: "sarah@company.com",
                                            },
                                            location: "San Francisco, CA",
                                            joinDate: "2018",
                                            achievements: ["Forbes 30 Under 30", "Tech Innovator Award", "Best CEO 2023"],
                                        },
                                        {
                                            id: 2,
                                            name: "Michael Chen",
                                            role: "CTO",
                                            department: "Engineering",
                                            bio: "Full-stack architect passionate about scalable systems and emerging technologies.",
                                            image: "/placeholder.svg?height=400&width=400",
                                            skills: ["System Architecture", "Cloud Computing", "AI/ML", "Team Leadership"],
                                            social: {
                                                linkedin: "#",
                                                github: "#",
                                                twitter: "#",
                                                email: "michael@company.com",
                                            },
                                            location: "Seattle, WA",
                                            joinDate: "2019",
                                            achievements: ["AWS Certified Solutions Architect", "Open Source Contributor"],
                                        },
                                        {
                                            id: 3,
                                            name: "Emily Rodriguez",
                                            role: "Head of Design",
                                            department: "Design",
                                            bio: "Creative director focused on user-centered design and brand experiences.",
                                            image: "/placeholder.svg?height=400&width=400",
                                            skills: ["UI/UX Design", "Brand Strategy", "Design Systems", "User Research"],
                                            social: {
                                                linkedin: "#",
                                                twitter: "#",
                                                email: "emily@company.com",
                                            },
                                            location: "New York, NY",
                                            joinDate: "2020",
                                            achievements: ["Design Excellence Award", "UX Leader of the Year"],
                                        },
                                        {
                                            id: 4,
                                            name: "David Kim",
                                            role: "VP of Marketing",
                                            department: "Marketing",
                                            bio: "Growth-focused marketer with expertise in digital strategy and brand building.",
                                            image: "/placeholder.svg?height=400&width=400",
                                            skills: ["Digital Marketing", "Growth Hacking", "Analytics", "Content Strategy"],
                                            social: {
                                                linkedin: "#",
                                                twitter: "#",
                                                email: "david@company.com",
                                            },
                                            location: "Austin, TX",
                                            joinDate: "2021",
                                            achievements: ["Marketing Excellence Award", "Growth Hacker of the Year"],
                                        },
                                    ],
                                    departments = ["All", "Leadership", "Engineering", "Design", "Marketing"],
                                    theme,
                                }: InteractiveTeamProps) {
    const [selectedDepartment, setSelectedDepartment] = useState("All")
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

    const filteredMembers =
        selectedDepartment === "All" ? members : members.filter((member) => member.department === selectedDepartment)

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Department Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {departments.map((dept) => (
                        <button
                            key={dept}
                            onClick={() => setSelectedDepartment(dept)}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${
                                selectedDepartment === dept
                                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                    : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md"
                            }`}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredMembers.map((member) => (
                        <div
                            key={member.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Social Links Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {member.social.linkedin && (
                                        <a
                                            href={member.social.linkedin}
                                            className="p-2 bg-white/90 rounded-full text-blue-600 hover:bg-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    )}
                                    {member.social.twitter && (
                                        <a
                                            href={member.social.twitter}
                                            className="p-2 bg-white/90 rounded-full text-blue-400 hover:bg-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Twitter className="h-4 w-4" />
                                        </a>
                                    )}
                                    {member.social.github && (
                                        <a
                                            href={member.social.github}
                                            className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="h-4 w-4" />
                                        </a>
                                    )}
                                    {member.social.email && (
                                        <a
                                            href={`mailto:${member.social.email}`}
                                            className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-medium">{member.role}</p>
                                    <p className="text-sm text-gray-500">{member.department}</p>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.slice(0, 2).map((skill, index) => (
                                        <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {skill}
                    </span>
                                    ))}
                                    {member.skills.length > 2 && (
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{member.skills.length - 2} more
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Member Detail Modal */}
                {selectedMember && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedMember(null)
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-gray-700 hover:bg-gray-100 z-10"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-3">
                                    {/* Image Column */}
                                    <div className="md:col-span-1 relative">
                                        <img
                                            src={selectedMember.image || "/placeholder.svg"}
                                            alt={selectedMember.name}
                                            className="w-full h-64 md:h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden"></div>

                                        {/* Mobile Info Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                                            <h2 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h2>
                                            <p className="text-blue-300 font-medium">{selectedMember.role}</p>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="md:col-span-2 p-6 md:p-8">
                                        {/* Desktop Info */}
                                        <div className="hidden md:block mb-6">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                                            <p className="text-xl text-blue-600 font-medium">{selectedMember.role}</p>
                                            <p className="text-gray-500">{selectedMember.department}</p>
                                        </div>

                                        {/* Bio */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                                            <p className="text-gray-600">{selectedMember.bio}</p>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Location */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 mb-1">Location</h4>
                                                <p className="text-gray-900">{selectedMember.location}</p>
                                            </div>

                                            {/* Join Date */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 mb-1">Joined</h4>
                                                <p className="text-gray-900">{selectedMember.joinDate}</p>
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMember.skills.map((skill, index) => (
                                                    <span key={index} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                            {skill}
                          </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                    {selectedMember.achievements.map((achievement, index) => (
                                                        <li key={index}>{achievement}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Social Links */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
                                            <div className="flex space-x-4">
                                                {selectedMember.social.linkedin && (
                                                    <a
                                                        href={selectedMember.social.linkedin}
                                                        className="p-3 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Linkedin className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {selectedMember.social.twitter && (
                                                    <a
                                                        href={selectedMember.social.twitter}
                                                        className="p-3 bg-blue-50 rounded-full text-blue-400 hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Twitter className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {selectedMember.social.github && (
                                                    <a
                                                        href={selectedMember.social.github}
                                                        className="p-3 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {selectedMember.social.email && (
                                                    <a
                                                        href={`mailto:${selectedMember.social.email}`}
                                                        className="p-3 bg-red-50 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                                                    >
                                                        <Mail className="h-5 w-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
