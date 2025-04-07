import { MessageSquare, Wand2, Pencil, Upload } from "lucide-react"

export default function HowItWorksSection() {
    const steps = [
        {
            icon: <MessageSquare className="h-12 w-12 text-primary" />,
            title: "Chat with AI",
            description: "Describe your website needs to our AI chatbot in plain language.",
        },
        {
            icon: <Wand2 className="h-12 w-12 text-primary" />,
            title: "AI Generates Website",
            description: "Our AI analyzes your requirements and creates a customized website.",
        },
        {
            icon: <Pencil className="h-12 w-12 text-primary" />,
            title: "Customize & Refine",
            description: "Use our drag-and-drop editor to personalize your website further.",
        },
        {
            icon: <Upload className="h-12 w-12 text-primary" />,
            title: "Publish & Share",
            description: "Deploy your website instantly or export the code for your own hosting.",
        },
    ]

    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Creating your website is as simple as having a conversation
                        </p>
                    </div>
                </div>
                <div className="mx-auto mt-8 md:mt-12 relative">
                    {/* Timeline connector */}
                    <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-border hidden md:block"></div>

                    <div className="space-y-8 md:space-y-0 relative">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`md:grid md:grid-cols-2 md:gap-8 md:items-center ${index % 2 === 0 ? "" : "md:rtl"}`}
                            >
                                <div
                                    className={`relative flex flex-col items-center md:items-${index % 2 === 0 ? "end" : "start"} md:text-${index % 2 === 0 ? "right" : "left"} mb-8 md:mb-0`}
                                >
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted z-10">
                                        {step.icon}
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                        <p className="text-muted-foreground mt-1 max-w-md">{step.description}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

