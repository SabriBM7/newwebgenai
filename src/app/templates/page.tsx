import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTemplates } from "@/lib/templates"

export default function TemplatesPage() {
    const templates = getTemplates()

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Website Templates</h1>
            <p className="text-muted-foreground mb-8 max-w-3xl">
                Browse our collection of AI-generated website templates. Click on any template to customize it with your own
                content and preferences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Link key={template.id} href={`/templates/${template.id}`} className="group block">
                        <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-video bg-muted relative">
                                {template.thumbnail && (
                                    <img
                                        src={template.thumbnail || "/placeholder.svg"}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/0 p-6">
                                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                                    {template.keywords && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {template.keywords.map((keyword, idx) => (
                                                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-white">
                          {keyword}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                                <Button className="w-full group-hover:bg-primary">Customize Template</Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}