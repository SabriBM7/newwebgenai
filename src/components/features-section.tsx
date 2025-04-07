import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Code, Layout, PaintBucket, Globe, Download } from 'lucide-react'

export default function FeaturesSection() {
    const features = [
        {
            icon: <MessageSquare className="h-10 w-10 text-primary" />,
            title: "AI-Powered Chatbot",
            description:
                "Uses natural language processing to understand your website requirements through simple conversation.",
        },
        {
            icon: <Layout className="h-10 w-10 text-primary" />,
            title: "Automated Website Generation",
            description: "AI selects design templates, text, and components based on your preferences and industry.",
        },
        {
            icon: <PaintBucket className="h-10 w-10 text-primary" />,
            title: "Customization Tools",
            description:
                "User-friendly interface for modifying layouts, adding content, and adjusting styles without coding.",
        },
        {
            icon: <Globe className="h-10 w-10 text-primary" />,
            title: "Hosting & Export Options",
            description: "Preview, download, or directly deploy your generated websites with just a few clicks.",
        },
        {
            icon: <Code className="h-10 w-10 text-primary" />,
            title: "No Coding Required",
            description: "Create professional websites without writing a single line of code or having technical expertise.",
        },
        {
            icon: <Download className="h-10 w-10 text-primary" />,
            title: "Ready-to-Use Templates",
            description: "Access a library of AI-optimized templates for various industries and purposes.",
        },
    ]

    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our AI-powered platform makes website creation accessible to everyone
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-2 border-muted-foreground/20">
                            <CardHeader>
                                <div className="mb-2">{feature.icon}</div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}