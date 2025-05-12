import { notFound } from "next/navigation"
import { getTemplateById } from "@/lib/templates"
import TechHeader from "@/components/headers/tech-header"
import CreativeHeader from "@/components/headers/creative-header"
import CorporateHeader from "@/components/headers/corporate-header"
import TechHero from "@/components/heroes/tech-hero"
import CreativeHero from "@/components/heroes/creative-hero"
import CorporateHero from "@/components/heroes/corporate-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function TemplatePage({ params }: { params: { template: string } }) {
    const template = getTemplateById(params.template)

    if (!template) {
        notFound()
    }

    // Render the appropriate header based on template type
    const renderHeader = () => {
        switch (template.type) {
            case "tech":
                return <TechHeader {...template.headerProps} />
            case "creative":
                return <CreativeHeader {...template.headerProps} />
            case "corporate":
                return <CorporateHeader {...template.headerProps} />
            default:
                return null
        }
    }

    // Render the appropriate hero based on template type
    const renderHero = () => {
        switch (template.type) {
            case "tech":
                return <TechHero {...template.heroProps} />
            case "creative":
                return <CreativeHero {...template.heroProps} />
            case "corporate":
                return <CorporateHero {...template.heroProps} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-background border-b p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/templates">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
                        </Link>
                    </Button>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">{template.name}</span>
                        <Button size="sm" asChild>
                            <Link href={`/templates/${params.template}/customize`}>Customize</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-grow">
                {renderHeader()}
                {renderHero()}

                {/* Placeholder for additional sections */}
                <div className="container mx-auto px-4 py-12 text-center">
                    <p className="text-muted-foreground">Additional sections would appear here</p>
                </div>
            </div>
        </div>
    )
}