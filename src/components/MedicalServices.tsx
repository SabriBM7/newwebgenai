"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, Activity, Stethoscope, Users, Brain, AmbulanceIcon as FirstAid } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MedicalServices(props: any) {
    const services = props.services || [
        {
            title: "Primary Care",
            description: "Comprehensive health care including preventative care, treatment of acute and chronic illnesses.",
            icon: "primary",
            features: ["Annual check-ups", "Vaccinations", "Health screenings", "Chronic disease management"],
            acceptingNew: true,
        },
        {
            title: "Cardiology",
            description: "Specialized care for heart and cardiovascular conditions from our board-certified cardiologists.",
            icon: "cardio",
            features: ["Heart disease treatment", "ECG testing", "Cardiac imaging", "Preventative cardiology"],
            acceptingNew: true,
        },
        {
            title: "Pediatrics",
            description: "Comprehensive healthcare for infants, children, and adolescents focused on healthy development.",
            icon: "pediatrics",
            features: ["Well-child visits", "Developmental screenings", "Vaccinations", "Acute care"],
            acceptingNew: true,
        },
        {
            title: "Neurology",
            description:
                "Diagnosis and treatment of disorders of the nervous system including brain, spinal cord, and nerves.",
            icon: "neuro",
            features: ["Stroke treatment", "Headache management", "Multiple sclerosis care", "Epilepsy treatment"],
            acceptingNew: false,
        },
        {
            title: "Women's Health",
            description: "Comprehensive obstetric and gynecological care for women of all ages.",
            icon: "womens",
            features: ["Annual exams", "Pregnancy care", "Menopause management", "Preventative screenings"],
            acceptingNew: true,
        },
        {
            title: "Urgent Care",
            description: "Immediate care for non-emergency but urgent medical issues with extended hours.",
            icon: "urgent",
            features: ["Walk-in services", "Minor injuries", "Illness treatment", "X-ray services"],
            acceptingNew: true,
        },
    ]

    // Map service icon names to Lucide icons
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "primary":
                return <Stethoscope className="h-12 w-12 mb-4 text-teal-600" />
            case "cardio":
                return <Heart className="h-12 w-12 mb-4 text-teal-600" />
            case "pediatrics":
                return <Users className="h-12 w-12 mb-4 text-teal-600" />
            case "neuro":
                return <Brain className="h-12 w-12 mb-4 text-teal-600" />
            case "womens":
                return <Activity className="h-12 w-12 mb-4 text-teal-600" />
            case "urgent":
                return <FirstAid className="h-12 w-12 mb-4 text-teal-600" />
            default:
                return <Stethoscope className="h-12 w-12 mb-4 text-teal-600" />
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Our Medical Services"}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {props.subtitle || "Comprehensive healthcare services provided by board-certified specialists"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex justify-center">{getIcon(service.icon)}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">{service.title}</h3>
                                <p className="text-gray-600 mb-4 text-center">{service.description}</p>

                                {service.features && (
                                    <div className="border-t border-b py-4 my-4 border-gray-100">
                                        <div className="grid grid-cols-2 gap-2">
                                            {service.features.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <Badge className={service.acceptingNew ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                        {service.acceptingNew ? "Accepting New Patients" : "Waitlist Only"}
                                    </Badge>
                                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                                        <Calendar className="h-4 w-4 mr-2" /> Schedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MedicalServices
