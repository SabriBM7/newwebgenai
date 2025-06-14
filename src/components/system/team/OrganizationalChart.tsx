"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ChevronDown, ChevronRight } from "lucide-react"

interface TeamMember {
    id: string
    name: string
    position: string
    department: string
    email: string
    phone: string
    image: string
    reports: TeamMember[]
    level: number
}

interface OrganizationalChartProps {
    title?: string
    subtitle?: string
    teamData?: TeamMember[]
    showContactInfo?: boolean
}

export function OrganizationalChart({
                                        title = "Organizational Chart",
                                        subtitle = "Meet our leadership team and organizational structure",
                                        teamData = [],
                                        showContactInfo = true,
                                    }: OrganizationalChartProps) {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

    const defaultTeamData: TeamMember[] = [
        {
            id: "1",
            name: "Sarah Johnson",
            position: "Chief Executive Officer",
            department: "Executive",
            email: "sarah.johnson@company.com",
            phone: "+1 (555) 123-4567",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            level: 0,
            reports: [
                {
                    id: "2",
                    name: "Michael Chen",
                    position: "Chief Technology Officer",
                    department: "Technology",
                    email: "michael.chen@company.com",
                    phone: "+1 (555) 234-5678",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    level: 1,
                    reports: [
                        {
                            id: "3",
                            name: "Emily Rodriguez",
                            position: "Senior Developer",
                            department: "Engineering",
                            email: "emily.rodriguez@company.com",
                            phone: "+1 (555) 345-6789",
                            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                            level: 2,
                            reports: [],
                        },
                        {
                            id: "4",
                            name: "David Kim",
                            position: "DevOps Engineer",
                            department: "Engineering",
                            email: "david.kim@company.com",
                            phone: "+1 (555) 456-7890",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                            level: 2,
                            reports: [],
                        },
                    ],
                },
                {
                    id: "5",
                    name: "Lisa Thompson",
                    position: "Chief Marketing Officer",
                    department: "Marketing",
                    email: "lisa.thompson@company.com",
                    phone: "+1 (555) 567-8901",
                    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
                    level: 1,
                    reports: [
                        {
                            id: "6",
                            name: "James Wilson",
                            position: "Marketing Manager",
                            department: "Marketing",
                            email: "james.wilson@company.com",
                            phone: "+1 (555) 678-9012",
                            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                            level: 2,
                            reports: [],
                        },
                    ],
                },
            ],
        },
    ]

    const displayData = teamData.length > 0 ? teamData : defaultTeamData

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedNodes)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedNodes(newExpanded)
    }

    const renderTeamMember = (member: TeamMember) => {
        const hasReports = member.reports && member.reports.length > 0
        const isExpanded = expandedNodes.has(member.id)

        return (
            <div key={member.id} className="relative">
                <Card className="w-80 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                                <p className="text-blue-600 font-medium">{member.position}</p>
                                <Badge variant="outline" className="mt-1">
                                    {member.department}
                                </Badge>
                            </div>
                            {hasReports && (
                                <Button variant="ghost" size="sm" onClick={() => toggleExpanded(member.id)} className="p-2">
                                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>

                        {showContactInfo && (
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {member.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-4 w-4 mr-2" />
                                    {member.phone}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {hasReports && isExpanded && (
                    <div className="mt-6 ml-8 space-y-4">
                        <div className="border-l-2 border-gray-200 pl-8">
                            {member.reports.map((report) => renderTeamMember(report))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="flex justify-center">
                    <div className="space-y-8">{displayData.map((member) => renderTeamMember(member))}</div>
                </div>

                <div className="text-center mt-12">
                    <Button
                        onClick={() => setExpandedNodes(new Set(displayData.map((m) => m.id)))}
                        variant="outline"
                        className="mr-4"
                    >
                        Expand All
                    </Button>
                    <Button onClick={() => setExpandedNodes(new Set())} variant="outline">
                        Collapse All
                    </Button>
                </div>
            </div>
        </section>
    )
}
