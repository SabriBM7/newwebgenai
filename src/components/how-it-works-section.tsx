import { CheckCircle } from "lucide-react"

export default function HowItWorksSection() {
    const steps = [
        {
            number: "1",
            title: "Describe Your Website",
            description: "Chat with our AI assistant and describe what kind of website you need.",
            icon: CheckCircle,
        },
        {
            number: "2",
            title: "Review AI Suggestions",
            description: "Our AI will suggest designs, layouts, and content based on your requirements.",
            icon: CheckCircle,
        },
        {
            number: "3",
            title: "Customize Your Website",
            description: "Fine-tune the generated website with our easy-to-use editor.",
            icon: CheckCircle,
        },
        {
            number: "4",
            title: "Publish and Share",
            description: "Publish your website instantly or export the code for your own hosting.",
            icon: CheckCircle,
        },
    ]

    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Creating your website with AI is simple and straightforward
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                                <span className="text-xl font-bold">{step.number}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block h-0.5 w-full bg-muted absolute left-1/2 top-1/2 transform -translate-y-1/2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
