import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatInterface from "@/components/chat-interface"

export default function CreatePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create Your Website with AI</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Chat with our AI assistant to describe your website needs. The more details you provide, the better your
                            website will be.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Describe Your Website</h2>
                            <ChatInterface />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Preview</h2>
                            <div className="border rounded-lg p-6 h-[600px] flex items-center justify-center bg-muted/30">
                                <p className="text-muted-foreground text-center">
                                    Your website preview will appear here as you chat with the AI assistant.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
