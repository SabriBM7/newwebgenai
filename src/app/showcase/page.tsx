import { COMPONENT_TYPES } from "@/lib/dataset"
import ComponentFactory from "@/components/ComponentFactory"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShowcasePage() {
    // Header component props
    const corporateHeaderProps = {
        logo: "TechSolutions",
        menu: [
            { label: "Home", link: "/" },
            { label: "Enterprise", link: "/enterprise" },
            { label: "Education", link: "/education" },
            { label: "E-commerce", link: "/ecommerce" },
            { label: "Showcase", link: "/showcase" },
        ],
        backgroundColor: "#ffffff",
        textColor: "#333333",
        sticky: true,
        contactInfo: {
            phone: "+1 (555) 123-4567",
            email: "info@techsolutions.com",
        },
        keywords: ["enterprise", "business", "solutions"],
        buttonText: "Contact Us",
        topBar: true,
    }

    // Hero component props
    const standardHeroProps = {
        title: "Component Showcase",
        subtitle: "Explore our library of customizable components",
        description:
            "This page demonstrates various components from our library that you can use to build your own landing pages.",
        buttonText: "Get Started",
        buttonLink: "#components",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "#learn-more",
        imageUrl: "/placeholder.svg?height=600&width=600&text=Components+Showcase",
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        keywords: ["components", "showcase", "library"],
    }

    // Features component props
    const featuresProps = {
        title: "Available Components",
        subtitle: "Mix and match these components to create your perfect landing page",
        features: [
            {
                title: "Header Components",
                description: "Multiple header styles including corporate, creative, and minimal designs.",
                icon: "Layout",
            },
            {
                title: "Hero Sections",
                description: "Eye-catching hero sections with various layouts and customization options.",
                icon: "Image",
            },
            {
                title: "Feature Grids",
                description: "Showcase your product features in an organized and visually appealing grid.",
                icon: "Grid",
            },
            {
                title: "Testimonials",
                description: "Display customer testimonials in different styles to build trust.",
                icon: "MessageSquare",
            },
            {
                title: "Call-to-Action",
                description: "Compelling CTA sections to drive user engagement and conversions.",
                icon: "MousePointer",
            },
            {
                title: "Footers",
                description: "Professional footer designs with customizable columns and links.",
                icon: "AlignJustify",
            },
        ],
        columns: 3,
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        iconColor: "#3b82f6",
        keywords: ["features", "components", "customizable"],
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <ComponentFactory component={COMPONENT_TYPES.HEADER} variant="corporate" props={corporateHeaderProps} />

            <main className="flex-grow">
                {/* Hero Section */}
                <ComponentFactory component={COMPONENT_TYPES.HERO} variant="standard" props={standardHeroProps} />

                {/* Features Section */}
                <div id="components">
                    <ComponentFactory component={COMPONENT_TYPES.FEATURES} variant="grid" props={featuresProps} />
                </div>

                {/* Example Pages Section */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Example Pages</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Check out these example pages built with our component library. Each page demonstrates a different
                                industry and style.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-background rounded-lg shadow-sm p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                                <p className="text-muted-foreground mb-4">
                                    Professional design for business solutions with a corporate style.
                                </p>
                                <Button asChild>
                                    <Link href="/enterprise">View Enterprise Page</Link>
                                </Button>
                            </div>

                            <div className="bg-background rounded-lg shadow-sm p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Education</h3>
                                <p className="text-muted-foreground mb-4">
                                    Learning platform with course-focused layout and educational style.
                                </p>
                                <Button asChild>
                                    <Link href="/education">View Education Page</Link>
                                </Button>
                            </div>

                            <div className="bg-background rounded-lg shadow-sm p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                                <p className="text-muted-foreground mb-4">Shopping website with product focus and friendly style.</p>
                                <Button asChild>
                                    <Link href="/ecommerce">View E-commerce Page</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Component Builder Teaser */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Build Your Own Page</h2>
                        <p className="text-lg max-w-2xl mx-auto mb-8">
                            Use our component library to build your own custom landing page. Mix and match components to create the
                            perfect page for your needs.
                        </p>
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="/builder">Open Component Builder</Link>
                        </Button>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold mb-4">Component Library</h3>
                            <p className="text-gray-300 max-w-md">
                                A comprehensive library of customizable components for building beautiful landing pages.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Pages</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/enterprise" className="text-gray-300 hover:text-white transition-colors">
                                        Enterprise
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/education" className="text-gray-300 hover:text-white transition-colors">
                                        Education
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ecommerce" className="text-gray-300 hover:text-white transition-colors">
                                        E-commerce
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Components</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/showcase#headers" className="text-gray-300 hover:text-white transition-colors">
                                        Headers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/showcase#heroes" className="text-gray-300 hover:text-white transition-colors">
                                        Heroes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/showcase#features" className="text-gray-300 hover:text-white transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/showcase#testimonials" className="text-gray-300 hover:text-white transition-colors">
                                        Testimonials
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Component Library. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
