"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Shield, Scale, Library } from "lucide-react"

export function LawFirmPracticeAreas(props: any) {
    const practiceAreas = props.areas || [
        {
            title: "Family Law",
            description:
                "Divorce, child custody, adoption, and other family-related legal matters handled with compassion and expertise.",
            icon: "family",
            link: "#family-law",
        },
        {
            title: "Personal Injury",
            description:
                "Representation for those injured due to negligence, including auto accidents, slip and falls, and medical malpractice.",
            icon: "injury",
            link: "#personal-injury",
        },
        {
            title: "Corporate Law",
            description:
                "Legal services for businesses including formation, contracts, mergers and acquisitions, and compliance.",
            icon: "corporate",
            link: "#corporate-law",
        },
        {
            title: "Estate Planning",
            description:
                "Wills, trusts, power of attorney, and comprehensive estate planning to protect your assets and legacy.",
            icon: "estate",
            link: "#estate-planning",
        },
        {
            title: "Criminal Defense",
            description: "Vigorous defense representation for those facing misdemeanor or felony charges.",
            icon: "criminal",
            link: "#criminal-defense",
        },
        {
            title: "Real Estate Law",
            description:
                "Legal assistance with property transactions, landlord-tenant disputes, zoning, and development issues.",
            icon: "realestate",
            link: "#real-estate-law",
        },
    ]

    // Map practice area icon names to Lucide icons
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "family":
                return <Shield className="h-12 w-12 mb-4 text-amber-600" />
            case "injury":
                return <FileText className="h-12 w-12 mb-4 text-amber-600" />
            case "corporate":
                return <Library className="h-12 w-12 mb-4 text-amber-600" />
            case "estate":
                return <BookOpen className="h-12 w-12 mb-4 text-amber-600" />
            case "criminal":
                return <Scale className="h-12 w-12 mb-4 text-amber-600" />
            case "realestate":
                return <FileText className="h-12 w-12 mb-4 text-amber-600" />
            default:
                return <BookOpen className="h-12 w-12 mb-4 text-amber-600" />
        }
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Practice Areas"}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {props.subtitle || "Our experienced attorneys provide comprehensive legal services in the following areas"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practiceAreas.map((area: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 border-t-4 border-amber-600">
                            <CardContent className="p-6 text-center">
                                <div className="flex justify-center">{getIcon(area.icon)}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{area.title}</h3>
                                <p className="text-gray-600 mb-6">{area.description}</p>
                                <Button className="bg-amber-600 hover:bg-amber-700">Learn More</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LawFirmPracticeAreas
