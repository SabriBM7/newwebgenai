"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scale, Shield, Home, Briefcase, Heart, Car } from "lucide-react"

interface PracticeArea {
    title: string
    description: string
    icon: string
    cases?: string
    successRate?: string
    features?: string[]
}

interface PracticeAreasProps {
    title?: string
    subtitle?: string
    areas?: PracticeArea[]
}

const iconMap = {
    scale: Scale,
    shield: Shield,
    home: Home,
    briefcase: Briefcase,
    heart: Heart,
    car: Car,
}

export default function PracticeAreas({
                                          title = "Practice Areas",
                                          subtitle = "Experienced legal representation across multiple practice areas",
                                          areas = [
                                              {
                                                  title: "Personal Injury",
                                                  description: "Comprehensive representation for accident victims and their families",
                                                  icon: "shield",
                                                  cases: "500+",
                                                  successRate: "95%",
                                                  features: ["Car Accidents", "Slip & Fall", "Medical Malpractice", "Wrongful Death"],
                                              },
                                              {
                                                  title: "Family Law",
                                                  description: "Compassionate guidance through life's most challenging transitions",
                                                  icon: "heart",
                                                  cases: "300+",
                                                  successRate: "90%",
                                                  features: ["Divorce", "Child Custody", "Adoption", "Domestic Relations"],
                                              },
                                              {
                                                  title: "Real Estate Law",
                                                  description: "Protecting your property interests in all real estate transactions",
                                                  icon: "home",
                                                  cases: "200+",
                                                  successRate: "98%",
                                                  features: ["Property Transactions", "Title Issues", "Zoning", "Commercial Leases"],
                                              },
                                              {
                                                  title: "Business Law",
                                                  description: "Strategic legal counsel for businesses of all sizes",
                                                  icon: "briefcase",
                                                  cases: "150+",
                                                  successRate: "92%",
                                                  features: ["Contract Law", "Corporate Formation", "Employment Law", "Litigation"],
                                              },
                                          ],
                                      }: PracticeAreasProps) {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {areas.map((area, index) => {
                        const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Scale

                        return (
                            <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-white">
                                <CardContent className="p-8">
                                    <div className="flex items-start mb-6">
                                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                            <IconComponent className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{area.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{area.description}</p>
                                        </div>
                                    </div>

                                    {(area.cases || area.successRate) && (
                                        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                                            {area.cases && (
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-blue-600">{area.cases}</div>
                                                    <div className="text-sm text-gray-600">Cases Handled</div>
                                                </div>
                                            )}
                                            {area.successRate && (
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-green-600">{area.successRate}</div>
                                                    <div className="text-sm text-gray-600">Success Rate</div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {area.features && (
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                                            <ul className="grid grid-cols-2 gap-2">
                                                {area.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-600">
                                                        <span className="text-blue-500 mr-2">•</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Free Consultation</Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
