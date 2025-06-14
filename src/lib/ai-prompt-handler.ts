export interface AIGeneratedSection {
    type: string;
    variant: string;
    props: Record<string, any>;
}

export interface AIGeneratedWebsite {
    title: string;
    description: string;
    sections: AIGeneratedSection[];
    metadata: {
        aiUsed: string;
        industry: string;
        style: string;
        imagesUsed?: string[];
    };
}

// Keywords to component type mapping
const KEYWORD_MAPPING: Record<string, string[]> = {
    header: ["header", "navigation", "navbar", "menu", "nav", "top bar", "logo"],
    hero: ["hero", "banner", "jumbotron", "headline", "main section", "splash", "intro"],
    features: ["features", "benefits", "services", "offerings", "what we do", "capabilities", "solutions"],
    testimonials: ["testimonials", "reviews", "feedback", "clients say", "customer stories", "quotes"],
    pricing: ["pricing", "plans", "packages", "subscription", "tiers", "cost", "price"],
    cta: ["cta", "call to action", "sign up", "get started", "contact us", "book now", "try now"],
    faq: ["faq", "questions", "answers", "common questions", "help", "support"],
    stats: ["stats", "statistics", "numbers", "metrics", "achievements", "results"],
    team: ["team", "staff", "employees", "our people", "experts", "specialists", "professionals"],
    newsletter: ["newsletter", "subscribe", "updates", "email signup", "stay informed"],
    footer: ["footer", "bottom", "contact info", "social media", "copyright", "links"],
};

// Industry-specific content templates
const INDUSTRY_TEMPLATES: Record<string, Record<string, any>> = {
    restaurant: {
        hero: {
            title: (name: string) => `Authentic ${name} Cuisine`,
            subtitle: "Experience Tradition in Every Bite",
            description: "Family recipes passed down through generations, made with locally sourced ingredients"
        },
        features: {
            title: "Our Specialties",
            items: [
                { title: "Handmade Pasta", description: "Freshly prepared daily using traditional techniques" },
                { title: "Wood-Fired Pizza", description: "Authentic Neapolitan style with imported ingredients" }
            ]
        },
        menu: {
            categories: ["Antipasti", "Primi", "Secondi", "Dolci"]
        }
    },
    technology: {
        hero: {
            title: (name: string) => `Innovative ${name} Solutions`,
            subtitle: "Cutting-Edge Technology for Modern Businesses"
        }
    },
    education: {
        hero: {
            title: (name: string) => `${name} Learning Academy`,
            subtitle: "Empowering Minds Through Quality Education"
        }
    },
    healthcare: {
        hero: {
            title: (name: string) => `${name} Medical Center`,
            subtitle: "Compassionate Care for Your Health Journey"
        }
    },
    realestate: {
        hero: {
            title: (name: string) => `${name} Real Estate`,
            subtitle: "Finding Your Perfect Property Match"
        }
    }
};

// Industry to component variant mapping
const INDUSTRY_VARIANT_MAPPING: Record<string, Record<string, string>> = {
    restaurant: {
        header: "minimal",
        hero: "split",
        features: "grid",
    },
    technology: {
        header: "saas",
        hero: "standard",
        features: "grid",
    },
    education: {
        header: "education",
        hero: "standard",
        features: "grid",
    },
    ecommerce: {
        header: "ecommerce",
        hero: "split",
        features: "grid",
    },
    creative: {
        header: "creative",
        hero: "video",
        features: "grid",
    },
    corporate: {
        header: "corporate",
        hero: "standard",
        features: "grid",
    },
    healthcare: {
        header: "minimal",
        hero: "standard",
        features: "grid",
    },
    "real-estate": {
        header: "corporate",
        hero: "split",
        features: "grid",
    }
};

// Function to analyze description and extract relevant sections
export function analyzeDescription(description: string, industry: string): string[] {
    const lowercaseDesc = description.toLowerCase();
    const mentionedSections: string[] = [];

    // Check for each component type in the description
    Object.entries(KEYWORD_MAPPING).forEach(([componentType, keywords]) => {
        const hasKeyword = keywords.some(keyword =>
            lowercaseDesc.includes(keyword.toLowerCase())
        );

        if (hasKeyword && !mentionedSections.includes(componentType)) {
            mentionedSections.push(componentType);
        }
    });

    // Ensure essential sections are included
    const ensureSection = (section: string, position?: number) => {
        if (!mentionedSections.includes(section)) {
            if (position !== undefined) {
                mentionedSections.splice(position, 0, section);
            } else {
                mentionedSections.push(section);
            }
        }
    };

    ensureSection("header", 0);
    ensureSection("hero", 1);
    ensureSection("features", 2);
    ensureSection("footer");

    return mentionedSections;
}

// Function to determine the best variant for a component based on industry
export function determineVariant(componentType: string, industry: string): string {
    const industryMapping = INDUSTRY_VARIANT_MAPPING[industry.toLowerCase()];

    if (industryMapping && industryMapping[componentType]) {
        return industryMapping[componentType];
    }

    // Default variants
    switch (componentType) {
        case "header": return "minimal";
        case "hero": return "standard";
        case "features": return "grid";
        default: return "default";
    }
}

// Function to extract key information from description
export function extractInformation(description: string): Record<string, string> {
    const info: Record<string, string> = {
        businessName: "",
        mainService: "",
        uniqueSellingPoint: "",
        targetAudience: "",
    };

    // Extract business name
    const businessNameRegex = /(?:for|called|named)\s+([A-Z][A-Za-z0-9\s]+)(?:\.|,|\s|$)/;
    const businessNameMatch = description.match(businessNameRegex);
    if (businessNameMatch?.[1]) {
        info.businessName = businessNameMatch[1].trim();
    } else {
        const capitalizedWordsRegex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/g;
        const matches = [...description.matchAll(capitalizedWordsRegex)];
        if (matches.length > 0) {
            info.businessName = matches[0][0];
        }
    }

    // Extract main service
    const serviceRegex = /(?:offers?|provides?|specializes? in|focused on)\s+([^,.]+)/i;
    const serviceMatch = description.match(serviceRegex);
    if (serviceMatch?.[1]) {
        info.mainService = serviceMatch[1].trim();
    }

    // Extract unique selling point
    const uspRegex = /(?:known for|famous for|unique|best|special|exceptional)\s+([^,.]+)/i;
    const uspMatch = description.match(uspRegex);
    if (uspMatch?.[1]) {
        info.uniqueSellingPoint = uspMatch[1].trim();
    }

    // Extract target audience
    const audienceRegex = /(?:for|targeting|aimed at|designed for)\s+([^,.]+)/i;
    const audienceMatch = description.match(audienceRegex);
    if (audienceMatch?.[1]) {
        info.targetAudience = audienceMatch[1].trim();
    }

    return info;
}

// Function to generate default props for a component
export function generateDefaultProps(
    componentType: string,
    variant: string,
    info: Record<string, string>,
    industry: string,
): Record<string, any> {
    const { businessName, mainService } = info;
    const template = INDUSTRY_TEMPLATES[industry] || {};
    const companyName = businessName || `${industry.charAt(0).toUpperCase() + industry.slice(1)} Business`;

    switch (componentType) {
        case "header":
            return {
                logo: companyName,
                menu: [
                    { label: "Home", link: "#" },
                    ...(industry === "restaurant" ? [{ label: "Menu", link: "#menu" }] : []),
                    ...(industry === "technology" || industry === "consulting" ?
                        [{ label: "Services", link: "#services" }] : []),
                    { label: "About", link: "#about" },
                    { label: "Contact", link: "#contact" },
                ]
            };

        case "hero":
            const heroTemplate = template.hero || {};
            return {
                title: heroTemplate.title?.(companyName) ||
                    `${companyName}${mainService ? ` - ${mainService}` : ''}`,
                subtitle: heroTemplate.subtitle || "Premium Quality & Exceptional Service",
                description: heroTemplate.description ||
                    `We provide exceptional ${industry} services`,
                buttonText: industry === "restaurant" ? "Reserve a Table" : "Get Started",
                imageUrl: `/placeholder.svg?text=${encodeURIComponent(companyName)}`
            };

        case "features":
            const featureTemplate = template.features || {};
            return {
                title: featureTemplate.title || "Our Features",
                items: featureTemplate.items || [
                    { title: "Quality Service", description: `Premium ${industry} solutions` },
                    { title: "Expert Team", description: "Certified professionals" },
                    { title: "Customer Support", description: "24/7 assistance" }
                ]
            };

        case "menu":
            return {
                title: "Our Menu",
                categories: (template.menu?.categories || ["Starters", "Mains", "Desserts"]).map(
                    (name: string) => ({
                        name,
                        items: Array(4).fill(null).map((_, i) => ({
                            name: `${name} Item ${i+1}`,
                            price: `$${(12 + i * 3).toFixed(2)}`,
                            description: `Delicious ${name.toLowerCase()} option`,
                            dietary: i % 2 === 0 ? ["Vegetarian"] : []
                        }))
                    })
                )
            };

        case "testimonials":
            return {
                title: "Customer Experiences",
                testimonials: Array(3).fill(null).map((_, i) => ({
                    name: `Customer ${i+1}`,
                    role: "Satisfied Client",
                    content: `The ${industry} services were exceptional!`,
                    avatar: `/placeholder.svg?height=100&width=100&text=C${i+1}`
                }))
            };

        case "cta":
            return {
                title: "Ready to Get Started?",
                description: `Join our satisfied customers and experience the best ${industry} services.`,
                buttonText: "Contact Us Now",
                buttonLink: "#contact",
            };

        case "footer":
            return {
                companyName: companyName,
                copyright: `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
                links: [
                    { label: "Privacy Policy", link: "#" },
                    { label: "Terms of Service", link: "#" },
                    { label: "Contact", link: "#contact" },
                ],
                socialLinks: [
                    { platform: "Twitter", link: "#" },
                    { platform: "Facebook", link: "#" },
                    { platform: "Instagram", link: "#" },
                ],
            };

        default:
            return {};
    }
}

// Function to map AI response to components
export function mapAIResponseToComponents(aiData: any): AIGeneratedWebsite {
    const industry = aiData.metadata?.industry || "general";
    const info = extractInformation(aiData.description || "");

    return {
        title: aiData.title || info.businessName,
        description: aiData.description || "",
        metadata: {
            aiUsed: aiData.metadata?.aiUsed || "Unknown",
            industry: industry,
            style: aiData.metadata?.style || "modern"
        },
        sections: (aiData.sections || []).map((section: any) => {
            const componentType = section.type || "features";
            const variant = section.variant || "default";

            return {
                type: componentType,
                variant,
                props: {
                    ...generateDefaultProps(componentType, variant, info, industry),
                    ...(section.props || {})
                }
            };
        })
    };
}