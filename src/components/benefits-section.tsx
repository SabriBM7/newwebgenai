import { CheckCircle } from "lucide-react"

export default function BenefitsSection() {
    const benefits = [
        "Save thousands on web development costs",
        "Launch your website in minutes, not weeks",
        "No technical skills or coding knowledge required",
        "Professional designs optimized for your industry",
        "Mobile-responsive websites that look great on all devices",
        "Easy to update and maintain without ongoing developer fees",
        "SEO-friendly structure to help customers find you",
        "Secure and reliable hosting options available",
        "Unlimited customization possibilities",
        "24/7 AI assistance for website improvements",
    ]

    return (
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Why Choose Us</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Benefits of AI-Powered Website Creation
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                            Our platform revolutionizes the way websites are created, making it accessible to everyone regardless of
                            technical background.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

