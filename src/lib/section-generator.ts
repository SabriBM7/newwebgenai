import { generateAIContent } from "@/lib/ai-content-service"
import { WebsiteGenerationParams } from "@/types"
import { generateFallbackContent } from "@/lib/fallback-content"

const INDUSTRY_COMPONENTS: Record<string, string[]> = {
    restaurant: ["Header", "Hero", "About", "Menu", "Gallery", "Testimonials", "Contact", "Footer"],
    technology: ["Header", "Hero", "Features", "Services", "CaseStudies", "Team", "Pricing", "Contact", "Footer"],
    realestate: ["Header", "Hero", "Search", "FeaturedListings", "Neighborhoods", "Agents", "Testimonials", "Contact", "Footer"],
    // Add more industry mappings as needed
}

export async function generateWebsiteSections(params: WebsiteGenerationParams) {
    const sectionTypes = INDUSTRY_COMPONENTS[params.industry] || [
        "Header", "Hero", "About", "Features", "Contact", "Footer"
    ]

    const sections = []

    for (const sectionType of sectionTypes) {
        try {
            const content = await generateAIContent(sectionType, params)
            const section = createSection(sectionType, content, params)
            sections.push(section)
        } catch (error) {
            console.error(`Error generating ${sectionType} section:`, error)
            const fallbackContent = generateFallbackContent(sectionType.toLowerCase(), params)
            sections.push(createSection(sectionType, fallbackContent, params))
        }
    }

    return sections
}

function createSection(sectionType: string, content: any, params: WebsiteGenerationParams) {
    const baseProps = {
        backgroundColor: getBackgroundColor(sectionType),
        textColor: getTextColor(sectionType)
    }

    switch (sectionType) {
        case "Header":
            return {
                type: "SimpleHeader",
                props: {
                    logo: content.logo || `${params.websiteName}`,
                    menu: content.menu || ["Home", "About", "Contact"],
                    ...baseProps
                }
            }

        case "Hero":
            return {
                type: "AdaptiveHero",
                props: {
                    ...content,
                    variant:
                        params.style === "minimal" ? "minimal" :
                            params.industry === "restaurant" ? "image-left" :
                                "centered",
                    ...baseProps
                }
            }

        case "About":
            return {
                type: "AboutSection",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    description: content.description,
                    image: content.image || "/images/about-placeholder.jpg",
                    ...baseProps
                }
            }

        case "Menu":
            return {
                type: "InteractiveMenu",
                props: {
                    title: content.title || "Our Menu",
                    categories: content.categories || generateMenuCategories(params.industry),
                    ...baseProps
                }
            }

        case "Gallery":
            return {
                type: "ImageGallery",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    images: content.images || [],
                    ...baseProps
                }
            }

        case "Testimonials":
            return {
                type: "TestimonialsSlider",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    items: content.items || [],
                    ...baseProps
                }
            }

        case "Services":
            return {
                type: "ServiceCards",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    items: content.items,
                    ...baseProps
                }
            }

        case "Features":
            return {
                type: "FeatureGrid",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    items: content.items,
                    ...baseProps
                }
            }

        case "CaseStudies":
            return {
                type: "CaseStudyShowcase",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    cases: content.cases || [],
                    ...baseProps
                }
            }

        case "Team":
            return {
                type: "TeamGrid",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    members: content.members || [],
                    ...baseProps
                }
            }

        case "Pricing":
            return {
                type: "PricingTable",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    plans: content.plans || [],
                    ...baseProps
                }
            }

        case "Search":
            return {
                type: "SearchBar",
                props: {
                    placeholder: content.placeholder || "Search properties...",
                    ...baseProps
                }
            }

        case "FeaturedListings":
            return {
                type: "ListingCards",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    listings: content.listings || [],
                    ...baseProps
                }
            }

        case "Neighborhoods":
            return {
                type: "NeighborhoodOverview",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    areas: content.areas || [],
                    ...baseProps
                }
            }

        case "Agents":
            return {
                type: "AgentProfiles",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    agents: content.agents || [],
                    ...baseProps
                }
            }

        case "Contact":
            return {
                type: "ContactForm",
                props: {
                    title: content.title,
                    subtitle: content.subtitle,
                    address: content.address,
                    phone: content.phone,
                    email: content.email,
                    ...baseProps
                }
            }

        case "Footer":
            return {
                type: "SimpleFooter",
                props: {
                    links: content.links || ["Privacy Policy", "Terms of Use", "Contact"],
                    copyright: `© ${new Date().getFullYear()} ${params.websiteName}. All rights reserved.`,
                    ...baseProps
                }
            }

        default:
            return {
                type: "GenericSection",
                props: {
                    title: content.title || sectionType,
                    description: content.description || "",
                    ...baseProps
                }
            }
    }
}

// Utilities

function getBackgroundColor(sectionType: string): string {
    return sectionType === "Hero" || sectionType === "Footer" ? "#000" : "#fff"
}

function getTextColor(sectionType: string): string {
    return sectionType === "Hero" || sectionType === "Footer" ? "#fff" : "#000"
}

function generateMenuCategories(industry: string): any[] {
    if (industry === "restaurant") {
        return [
            {
                category: "Appetizers",
                items: [{ name: "Bruschetta", price: "$5.99" }, { name: "Garlic Bread", price: "$4.50" }]
            },
            {
                category: "Main Courses",
                items: [{ name: "Margherita Pizza", price: "$10.99" }, { name: "Lasagna", price: "$12.50" }]
            },
            {
                category: "Desserts",
                items: [{ name: "Tiramisu", price: "$6.00" }, { name: "Panna Cotta", price: "$5.50" }]
            }
        ]
    }

    return []
}
