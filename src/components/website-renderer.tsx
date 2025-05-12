import type React from "react"

interface WebsiteRendererProps {
    websiteData: any
}

const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({ websiteData }) => {
    if (!websiteData) {
        return <div>No website data available</div>
    }

    // Simple renderer for demonstration purposes
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-gray-900 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">{websiteData.title || "Website Title"}</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            {(websiteData.navigation || ["Home", "About", "Services", "Contact"]).map(
                                (item: string, index: number) => (
                                    <li key={index}>
                                        <a href="#" className="hover:text-purple-300">
                                            {item}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-20">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-4">{websiteData.hero?.title || "Welcome to our Website"}</h2>
                    <p className="text-xl mb-8">
                        {websiteData.hero?.subtitle || "This is a generated website based on your input."}
                    </p>
                    <button className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        {websiteData.hero?.cta || "Get Started"}
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">{websiteData.features?.title || "Our Features"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(
                            websiteData.features?.items || [
                                { title: "Feature 1", description: "Description of feature 1" },
                                { title: "Feature 2", description: "Description of feature 2" },
                                { title: "Feature 3", description: "Description of feature 3" },
                            ]
                        ).map((feature: any, index: number) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} {websiteData.title || "Your Website"}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default WebsiteRenderer
