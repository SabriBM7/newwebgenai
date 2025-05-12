import Link from "next/link"
import { ArrowRight, Layout, FileText, Code, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ToolsSection() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Powerful <span className="text-purple-500">AI Tools</span> at Your Fingertips
                    </h2>
                    <p className="text-xl text-gray-300">
                        Explore our suite of AI-powered tools designed to help you create amazing websites and content.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                            <Layout className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Landing Page Generator</h3>
                        <p className="text-gray-400 mb-4">Create stunning landing pages in seconds with AI</p>
                        <Link href="/landing-generator">
                            <Button variant="link" className="text-purple-500 p-0 h-auto font-semibold">
                                Try it now <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Content Generator</h3>
                        <p className="text-gray-400 mb-4">Generate engaging content for your website</p>
                        <Link href="/chat">
                            <Button variant="link" className="text-purple-500 p-0 h-auto font-semibold">
                                Try it now <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                            <Code className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Code Generator</h3>
                        <p className="text-gray-400 mb-4">Generate custom code for your website</p>
                        <Link href="/chat">
                            <Button variant="link" className="text-purple-500 p-0 h-auto font-semibold">
                                Try it now <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                            <Wand2 className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Image Generator</h3>
                        <p className="text-gray-400 mb-4">Coming soon: Generate custom images for your website</p>
                        <Button variant="link" className="text-gray-500 p-0 h-auto font-semibold cursor-not-allowed">
                            Coming soon
                        </Button>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link href="/tools">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Explore All Tools
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
