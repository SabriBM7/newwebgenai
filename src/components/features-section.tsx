import { CheckCircle, Code, Cpu, Globe, Palette, Zap } from "lucide-react"

export default function FeaturesSection() {
    const features = [
        {
            icon: <Cpu className="h-6 w-6 text-purple-400" />,
            title: "AI-Powered Design",
            description:
                "Our advanced AI understands your needs and generates custom website designs tailored to your industry and goals.",
        },
        {
            icon: <Zap className="h-6 w-6 text-purple-400" />,
            title: "Lightning Fast",
            description: "Generate complete, responsive websites in minutes instead of days or weeks.",
        },
        {
            icon: <Palette className="h-6 w-6 text-purple-400" />,
            title: "Customizable Templates",
            description: "Choose from a variety of AI-generated templates or customize every aspect to match your brand.",
        },
        {
            icon: <Code className="h-6 w-6 text-purple-400" />,
            title: "No Coding Required",
            description:
                "Create professional websites without writing a single line of code through our intuitive chat interface.",
        },
        {
            icon: <Globe className="h-6 w-6 text-purple-400" />,
            title: "One-Click Publishing",
            description: "Deploy your website instantly with our integrated hosting solution.",
        },
        {
            icon: <CheckCircle className="h-6 w-6 text-purple-400" />,
            title: "SEO Optimized",
            description: "All websites are built with best practices for search engine optimization.",
        },
    ]

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything you need to create amazing websites
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Our AI-powered platform makes website creation faster and easier than ever before
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
