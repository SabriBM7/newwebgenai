import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
    return (
        <section id="try-now" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Ready to Create Your Website?
                        </h2>
                        <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Start building your website today with our AI-powered platform. No coding required.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="#">
                                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                            asChild
                        >
                            <Link href="#">Schedule Demo</Link>
                        </Button>
                    </div>
                    <p className="text-sm text-primary-foreground/80 mt-4">
                        No credit card required. Free plan includes 1 website with basic features.
                    </p>
                </div>
            </div>
        </section>
    )
}

