"use client"

import { Heart, Stethoscope, Activity, Calendar, Clock, Users } from "lucide-react"

interface HealthcareService {
    icon: string
    name: string
    description: string
    duration: string
    availability: string
}

interface HealthcareServicesSectionProps {
    title?: string
    subtitle?: string
    services?: HealthcareService[]
    theme?: any
}

const iconMap = {
    heart: Heart,
    stethoscope: Stethoscope,
    activity: Activity,
    calendar: Calendar,
    clock: Clock,
    users: Users,
}

export function HealthcareServicesSection({
                                              title = "Our Medical Services",
                                              subtitle = "Comprehensive healthcare for you and your family",
                                              services = [
                                                  {
                                                      icon: "heart",
                                                      name: "Cardiology",
                                                      description: "Complete heart health assessment and treatment by experienced cardiologists.",
                                                      duration: "45-60 minutes",
                                                      availability: "Mon-Fri 8AM-6PM",
                                                  },
                                                  {
                                                      icon: "stethoscope",
                                                      name: "General Practice",
                                                      description: "Primary healthcare services for routine check-ups and general medical concerns.",
                                                      duration: "30 minutes",
                                                      availability: "Mon-Sat 7AM-8PM",
                                                  },
                                                  {
                                                      icon: "activity",
                                                      name: "Emergency Care",
                                                      description: "24/7 emergency medical services with state-of-the-art equipment.",
                                                      duration: "Immediate",
                                                      availability: "24/7",
                                                  },
                                                  {
                                                      icon: "users",
                                                      name: "Family Medicine",
                                                      description: "Comprehensive healthcare for patients of all ages, from infants to seniors.",
                                                      duration: "30-45 minutes",
                                                      availability: "Mon-Fri 8AM-5PM",
                                                  },
                                              ],
                                              theme,
                                          }: HealthcareServicesSectionProps) {
    return (
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Heart

                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0">
                                        <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors">
                                            <IconComponent className="h-8 w-8 text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-2xl font-semibold text-gray-900">{service.name}</h3>

                                        <p className="text-gray-600 leading-relaxed">{service.description}</p>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span>Duration: {service.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>Available: {service.availability}</span>
                                            </div>
                                        </div>

                                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Emergency Contact */}
                <div className="mt-16 text-center">
                    <div className="bg-red-100 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency? Call Now</h3>
                        <p className="text-red-700 mb-4">For immediate medical attention, contact our emergency line</p>
                        <a
                            href="tel:911"
                            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
                        >
                            Call Emergency: 911
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
