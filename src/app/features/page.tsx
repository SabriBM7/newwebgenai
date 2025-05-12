import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Layout, Palette, Code, Globe, Search, Shield, Smartphone, Clock, Check } from "lucide-react"

export const metadata: Metadata = {
    title: "Features | WebGenAI",
    description:
        "Explore the powerful features of WebGenAI that make website creation faster and easier than ever before.",
}

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Powerful Features for Modern Websites
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                        WebGenAI combines cutting-edge AI technology with intuitive design tools to help you create stunning
                        websites in minutes, not months.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Get Started Free
                        </Button>
                        <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                            View Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Features Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Everything You Need to Create Amazing Websites
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our AI-powered platform makes website creation faster and easier than ever before
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-all duration-300"
                            >
                                <CardContent className="p-6">
                                    <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Tabs Section */}
            <section className="py-20 px-4 bg-black/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Key Features</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Discover how WebGenAI can transform your website creation process
                        </p>
                    </div>

                    <Tabs defaultValue="ai" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid grid-cols-3 mb-8 bg-black/50 p-1 rounded-lg">
                            <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                                AI Generation
                            </TabsTrigger>
                            <TabsTrigger value="design" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                                Design Tools
                            </TabsTrigger>
                            <TabsTrigger value="publish" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                                Publishing
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="ai" className="mt-0">
                            <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Website Generation</h3>
                                            <p className="text-gray-300 mb-6">
                                                Simply describe your website in plain language, and our advanced AI will generate a complete,
                                                customized website design in seconds.
                                            </p>
                                            <ul className="space-y-3">
                                                {aiFeatures.map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                                                        <span className="text-gray-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="rounded-lg overflow-hidden border border-gray-800">
                                            <Image
                                                src="/placeholder.svg?height=300&width=500&text=AI+Generation+Demo&bg=302030&foreground=ffffff"
                                                alt="AI Generation Demo"
                                                width={500}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="design" className="mt-0">
                            <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Intuitive Design Tools</h3>
                                            <p className="text-gray-300 mb-6">
                                                Customize every aspect of your website with our easy-to-use design tools. No coding required.
                                            </p>
                                            <ul className="space-y-3">
                                                {designFeatures.map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                                                        <span className="text-gray-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="rounded-lg overflow-hidden border border-gray-800">
                                            <Image
                                                src="/placeholder.svg?height=300&width=500&text=Design+Tools+Demo&bg=302030&foreground=ffffff"
                                                alt="Design Tools Demo"
                                                width={500}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="publish" className="mt-0">
                            <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">One-Click Publishing</h3>
                                            <p className="text-gray-300 mb-6">
                                                Deploy your website instantly with our integrated hosting solution. No server setup required.
                                            </p>
                                            <ul className="space-y-3">
                                                {publishFeatures.map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                                                        <span className="text-gray-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="rounded-lg overflow-hidden border border-gray-800">
                                            <Image
                                                src="/placeholder.svg?height=300&width=500&text=Publishing+Demo&bg=302030&foreground=ffffff"
                                                alt="Publishing Demo"
                                                width={500}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How WebGenAI Compares</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            See how our AI-powered platform stacks up against traditional website builders
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto border-collapse">
                            <thead>
                            <tr>
                                <th className="p-4 text-left text-gray-300 border-b border-gray-800"></th>
                                <th className="p-4 text-center text-white border-b border-gray-800 bg-purple-900/30">
                                    <span className="text-xl font-bold">WebGenAI</span>
                                </th>
                                <th className="p-4 text-center text-gray-300 border-b border-gray-800 bg-black/30">
                                    <span className="text-xl font-bold">Traditional Website Builders</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {comparisonItems.map((item, index) => (
                                <tr key={index} className="border-b border-gray-800">
                                    <td className="p-4 text-left text-white">{item.feature}</td>
                                    <td className="p-4 text-center text-white bg-purple-900/10">
                                        {item.webgenai === true ? (
                                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : item.webgenai === false ? (
                                            <span className="text-red-500">✕</span>
                                        ) : (
                                            <span className="text-green-500">{item.webgenai}</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-gray-300 bg-black/10">
                                        {item.traditional === true ? (
                                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : item.traditional === false ? (
                                            <span className="text-red-500">✕</span>
                                        ) : (
                                            <span className="text-gray-300">{item.traditional}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-black/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Get answers to common questions about WebGenAI</p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="bg-black/40 backdrop-blur-sm border-gray-800">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                                    <p className="text-gray-300">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-700">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Your Website?</h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                        Join thousands of users who are already creating stunning websites with WebGenAI
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                            Get Started Free
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            Schedule a Demo
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Feature data
const features = [
    {
        icon: <Zap className="h-6 w-6 text-purple-400" />,
        title: "AI-Powered Generation",
        description: "Describe your website in plain language and watch as our AI creates a custom design in seconds.",
    },
    {
        icon: <Layout className="h-6 w-6 text-purple-400" />,
        title: "Responsive Layouts",
        description: "All websites are fully responsive and look great on any device, from mobile to desktop.",
    },
    {
        icon: <Palette className="h-6 w-6 text-purple-400" />,
        title: "Customizable Design",
        description: "Easily customize colors, fonts, and layouts to match your brand identity.",
    },
    {
        icon: <Code className="h-6 w-6 text-purple-400" />,
        title: "No Coding Required",
        description: "Create professional websites without writing a single line of code.",
    },
    {
        icon: <Globe className="h-6 w-6 text-purple-400" />,
        title: "One-Click Deploy",
        description: "Deploy your website to the web with a single click, no server setup required.",
    },
    {
        icon: <Search className="h-6 w-6 text-purple-400" />,
        title: "SEO Optimized",
        description: "Built with SEO best practices to help your website rank higher in search results.",
    },
    {
        icon: <Shield className="h-6 w-6 text-purple-400" />,
        title: "Secure & Fast",
        description: "Websites are secure, fast, and built with modern web standards.",
    },
    {
        icon: <Smartphone className="h-6 w-6 text-purple-400" />,
        title: "Mobile Optimization",
        description: "Optimized for mobile with touch-friendly interfaces and fast loading times.",
    },
    {
        icon: <Clock className="h-6 w-6 text-purple-400" />,
        title: "Time-Saving",
        description: "Create a complete website in minutes instead of days or weeks.",
    },
]

// AI Features
const aiFeatures = [
    "Natural language website generation",
    "Industry-specific templates and suggestions",
    "Content generation for common sections",
    "SEO-optimized text and metadata",
    "Intelligent layout recommendations",
    "Continuous learning from user feedback",
]

// Design Features
const designFeatures = [
    "Drag-and-drop interface",
    "Pre-designed components and sections",
    "Custom color schemes and typography",
    "Responsive design preview",
    "Image optimization and editing tools",
    "Animation and interaction builder",
]

// Publishing Features
const publishFeatures = [
    "One-click deployment",
    "Custom domain support",
    "SSL certificates included",
    "Global CDN for fast loading",
    "Automatic backups",
    "Simple content updates",
]

// Comparison data
const comparisonItems = [
    { feature: "Website Creation Time", webgenai: "Minutes", traditional: "Days/Weeks" },
    { feature: "AI-Powered Design", webgenai: true, traditional: false },
    { feature: "No Coding Required", webgenai: true, traditional: "Limited" },
    { feature: "Content Generation", webgenai: true, traditional: false },
    { feature: "SEO Optimization", webgenai: "Automatic", traditional: "Manual" },
    { feature: "Responsive Design", webgenai: "Automatic", traditional: "Manual" },
    { feature: "Ongoing Maintenance", webgenai: "Minimal", traditional: "Extensive" },
    { feature: "Cost", webgenai: "Low", traditional: "High" },
]

// FAQ data
const faqs = [
    {
        question: "How does WebGenAI create websites?",
        answer:
            "WebGenAI uses advanced artificial intelligence to generate custom website designs based on your description. Simply tell us about your business and goals, and our AI will create a tailored website for you in minutes.",
    },
    {
        question: "Do I need technical skills to use WebGenAI?",
        answer:
            "Not at all! WebGenAI is designed for users with no technical background. Our intuitive interface and AI assistance make it easy for anyone to create a professional website without coding knowledge.",
    },
    {
        question: "Can I customize the AI-generated designs?",
        answer:
            "While our AI creates an excellent starting point, you have full control to customize every aspect of your website, from colors and fonts to layouts and content.",
    },
    {
        question: "How much does WebGenAI cost?",
        answer:
            "WebGenAI offers flexible pricing plans starting with a free tier for basic websites. Premium plans with additional features and capabilities start at $9.99/month. Visit our pricing page for detailed information.",
    },
    {
        question: "Can I use my own domain name?",
        answer:
            "Yes, you can connect your own domain name to your WebGenAI website. We also offer domain registration services if you don't already have one.",
    },
    {
        question: "Is WebGenAI suitable for e-commerce websites?",
        answer:
            "Yes, WebGenAI can create fully-functional e-commerce websites with product listings, shopping cart, and secure checkout functionality. Our Business and Enterprise plans include advanced e-commerce features.",
    },
]
