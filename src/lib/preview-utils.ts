export function generateWebsitePreview(params: {
    websiteName: string
    industry: string
    style: string
    description: string
}) {
    const { websiteName, industry, style, description } = params

    // Generate a quick preview structure
    return {
        websiteName,
        industry,
        style,
        description,
        components: [
            {
                type: "MinimalistHeader",
                props: {
                    logo: websiteName,
                    navigation: [
                        { label: "Home", href: "#home" },
                        { label: "About", href: "#about" },
                        { label: "Services", href: "#services" },
                        { label: "Contact", href: "#contact" },
                    ],
                },
            },
            {
                type: "BusinessHero",
                props: {
                    title: websiteName,
                    subtitle: `Professional ${industry} services`,
                    description: description.substring(0, 150) + "...",
                    buttonText: "Get Started",
                },
            },
            {
                type: "MinimalistFeatures",
                props: {
                    title: "Our Services",
                    features: [
                        { title: "Quality Service", description: "Professional excellence" },
                        { title: "Expert Team", description: "Experienced professionals" },
                        { title: "Customer Focus", description: "Your satisfaction first" },
                    ],
                },
            },
        ],
        generatedAt: new Date().toISOString(),
        isPreview: true,
    }
}
