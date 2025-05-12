import { COMPONENT_TYPES } from "@/lib/dataset"

// This function maps the raw Ollama output to component props
export function mapOllamaOutputToComponentProps(ollamaOutput: any) {
    const { sections = [] } = ollamaOutput

    return sections.map((section: any) => {
        const { type, variant, props } = section

        // Apply specific transformations based on component type
        switch (type) {
            case COMPONENT_TYPES.HEADER:
                return {
                    type,
                    variant,
                    props: mapHeaderProps(props, variant),
                }
            case COMPONENT_TYPES.HERO:
                return {
                    type,
                    variant,
                    props: mapHeroProps(props, variant),
                }
            case COMPONENT_TYPES.FEATURES:
                return {
                    type,
                    variant,
                    props: mapFeaturesProps(props, variant),
                }
            case "testimonials":
                return {
                    type,
                    variant: variant || "cards",
                    props: mapTestimonialsProps(props),
                }
            case "cta":
                return {
                    type,
                    variant: variant || "simple",
                    props: mapCTAProps(props),
                }
            default:
                return { type, variant, props }
        }
    })
}

// Helper functions for mapping specific component types
function mapHeaderProps(props: any, variant: string) {
    // Ensure menu items have the correct structure
    const menu = Array.isArray(props.menu)
        ? props.menu.map((item: any) => ({
            label: item.label || "Menu Item",
            link: item.link || "#",
        }))
        : [
            { label: "Home", link: "#home" },
            { label: "Features", link: "#features" },
            { label: "Contact", link: "#contact" },
        ]

    return {
        ...props,
        logo: props.logo || "Company Name",
        logoUrl: props.logoUrl || "/placeholder.svg?height=40&width=40&text=Logo",
        menu,
        backgroundColor: props.backgroundColor || "#ffffff",
        textColor: props.textColor || "#000000",
    }
}

function mapHeroProps(props: any, variant: string) {
    return {
        ...props,
        title: props.title || "Welcome to Our Website",
        subtitle: props.subtitle || "Your journey starts here",
        description: props.description || "We provide the best services for your needs",
        buttonText: props.buttonText || "Get Started",
        buttonLink: props.buttonLink || "#get-started",
        imageUrl: props.imageUrl || "/placeholder.svg?height=600&width=600&text=Hero+Image",
        backgroundColor: props.backgroundColor || "#f8fafc",
        textColor: props.textColor || "#0f172a",
    }
}

function mapFeaturesProps(props: any, variant: string) {
    // Ensure features have the correct structure
    const features = Array.isArray(props.features)
        ? props.features.map((feature: any) => ({
            title: feature.title || "Feature",
            description: feature.description || "Feature description",
            icon: feature.icon || "Sparkles",
        }))
        : [
            {
                title: "Feature 1",
                description: "Description of feature 1",
                icon: "Sparkles",
            },
            {
                title: "Feature 2",
                description: "Description of feature 2",
                icon: "Layers",
            },
            {
                title: "Feature 3",
                description: "Description of feature 3",
                icon: "Zap",
            },
        ]

    return {
        ...props,
        title: props.title || "Our Features",
        subtitle: props.subtitle || "What we offer",
        features,
        columns: props.columns || 3,
        backgroundColor: props.backgroundColor || "#ffffff",
        textColor: props.textColor || "#0f172a",
    }
}

function mapTestimonialsProps(props: any) {
    // Ensure testimonials have the correct structure
    const testimonials = Array.isArray(props.testimonials)
        ? props.testimonials.map((testimonial: any) => ({
            name: testimonial.name || "Customer Name",
            role: testimonial.role || "Customer Role",
            content: testimonial.content || "This is a testimonial",
            avatar: testimonial.avatar || "/placeholder.svg?height=100&width=100&text=Avatar",
        }))
        : [
            {
                name: "John Doe",
                role: "CEO, Company",
                content: "This product has transformed our business.",
                avatar: "/placeholder.svg?height=100&width=100&text=JD",
            },
            {
                name: "Jane Smith",
                role: "Marketing Director",
                content: "The best solution we've ever used.",
                avatar: "/placeholder.svg?height=100&width=100&text=JS",
            },
        ]

    return {
        ...props,
        title: props.title || "What Our Customers Say",
        subtitle: props.subtitle || "Testimonials from our clients",
        testimonials,
        backgroundColor: props.backgroundColor || "#f8fafc",
        textColor: props.textColor || "#0f172a",
    }
}

function mapCTAProps(props: any) {
    return {
        ...props,
        title: props.title || "Ready to Get Started?",
        description: props.description || "Join thousands of satisfied customers today.",
        buttonText: props.buttonText || "Sign Up Now",
        buttonLink: props.buttonLink || "#sign-up",
        backgroundColor: props.backgroundColor || "#0f172a",
        textColor: props.textColor || "#ffffff",
    }
}
