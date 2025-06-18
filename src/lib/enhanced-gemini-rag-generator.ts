import { generateWithGemini } from "./gemini-service"
import { getIndustryKnowledge, getComponentsByIndustry, getComponentByName } from "./enhanced-rag-database"
import type { WebsiteGenerationParams, GeneratedWebsite, ComponentSchema, GeneratedWebsiteComponent } from "./types" // Adjusted path

const ENHANCED_INDUSTRY_KNOWLEDGE: Record<string, { components: string[] }> = {
    restaurant: {
        components: [
            "MenuSection",
            "AboutSection",
            "EventsSection",
            "ServicesSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "GallerySection",
        ],
    },
    technology: {
        components: [
            "ServicesSection",
            "PortfolioSection",
            "ProcessSection",
            "TeamSection",
            "AboutSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "BlogSection",
        ],
    },
    healthcare: {
        components: [
            "ServicesSection",
            "TeamSection",
            "AboutSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "BlogSection",
        ],
    },
    ecommerce: {
        components: [
            "HeroSection",
            "FeaturedProductsSection",
            "CategoryListSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "BlogSection",
        ],
    },
    education: {
        components: [
            "CoursesSection",
            "InstructorsSection",
            "AboutSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "BlogSection",
        ],
    },
    realestate: {
        components: [
            "PropertyListSection",
            "AgentListSection",
            "AboutSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "BlogSection",
        ],
    },
    fitness: {
        components: [
            "ClassesSection",
            "TrainersSection",
            "AboutSection",
            "TestimonialsSection",
            "ContactSection",
            "CTASection",
            "FAQSection",
            "BlogSection",
        ],
    },
}

export async function generateComprehensiveWebsiteWithRAG(params: WebsiteGenerationParams): Promise<GeneratedWebsite> {
    try {
        console.log("🚀 Starting Enhanced Gemini RAG generation with comprehensive dataset...")

        const industryKnowledge = getIndustryKnowledge(params.industry, params.description)
        const availableComponents = getComponentsByIndustry(params.industry)

        console.log(`📚 Retrieved ${industryKnowledge.length} industry documents`)
        console.log(`🔧 Found ${availableComponents.length} available components for ${params.industry}`)

        const prompt = createComprehensivePrompt(params, industryKnowledge, availableComponents)
        console.log("📝 Created comprehensive prompt with component dataset")

        console.log("🤖 Calling Gemini API with enhanced context...")
        const response = await generateWithGemini({
            prompt,
            temperature: params.toneOfVoice === "playful" ? 0.8 : 0.65, // Adjust temperature based on tone
            maxTokens: 8000, // Increased maxTokens for potentially larger JSON
        })
        console.log("✅ Received Gemini response")

        const websiteData = parseAndEnhanceResponse(response.response, params, industryKnowledge, availableComponents)
        console.log("🎯 Parsed and enhanced website data")

        return { ...websiteData, promptUsed: prompt } // Include prompt for debugging
    } catch (error: any) {
        console.error("❌ Error in Enhanced Gemini RAG generation:", error)
        // Create a fallback error response
        return {
            success: false,
            components: [],
            metadata: {
                title: `Error Generating ${params.websiteName}`,
                description: `Failed to generate website: ${error.message}`,
                keywords: [params.industry, "error"],
                industry: params.industry,
                style: params.style,
                componentsUsed: 0,
            },
            colors: getIndustryColors(params.industry, params.style), // Provide default colors
            generatedAt: new Date().toISOString(),
            aiUsed: "Gemini-RAG-Enhanced-Dataset-Error",
            promptUsed: createComprehensivePrompt(
                params,
                getIndustryKnowledge(params.industry, params.description),
                getComponentsByIndustry(params.industry),
            ), // Log the prompt that caused error
        }
    }
}

function createComprehensivePrompt(
    params: WebsiteGenerationParams,
    industryKnowledge: any[], // Type this more strictly if possible
    availableComponents: ComponentSchema[],
): string {
    const industryContext = industryKnowledge
        .map(
            (doc) => `
INDUSTRY GUIDE: ${doc.title}
CONTENT: ${doc.content}
RECOMMENDED COMPONENTS: ${(doc.components || []).join(", ")}
SECTIONS: ${(doc.sections || []).join(", ")}
TAGS: ${(doc.tags || []).join(", ")}
---`,
        )
        .join("\n")

    const componentContext = availableComponents
        .slice(0, 30) // Provide more components to AI if available
        .map(
            (comp) => `
COMPONENT TEMPLATE NAME: ${comp.template_name} 
DESCRIPTION: ${comp.description || "N/A"}
EXPECTED PROPS STRUCTURE: ${JSON.stringify(comp.props || {})}
DEFAULT PROPS (use if unsure or for base): ${JSON.stringify(comp.defaultProps || {})}
CATEGORY: ${comp.category || "general"}
SUITABLE FOR INDUSTRIES: ${(comp.industries || ["all"]).join(", ")}
---`,
        )
        .join("\n")

    const desiredComponentCount = params.componentCount || 12

    return `You are an expert web designer and content strategist tasked with creating a comprehensive, professional ${params.industry} website.
Your design must adhere to industry best practices and utilize a specific component library.

BUSINESS INFORMATION:
- Business Name: ${params.websiteName}
- Industry: ${params.industry}
- Description: ${params.description}
- Desired Style: ${params.style}
- Target Audience: ${params.targetAudience || "General audience"}
- Business Goals: ${(params.businessGoals || ["Growth and customer engagement"]).join(", ")}
- Unique Selling Points: ${(params.uniqueSellingPoints || ["Quality and service excellence"]).join(", ")}
- Desired Tone of Voice: ${params.toneOfVoice || "professional"}
- Color Preferences: ${params.colorPreferences || "match industry and style"}

INDUSTRY KNOWLEDGE BASE (Use this to inform content and component choices):
${industryContext}

AVAILABLE COMPONENT LIBRARY (Strictly use these components and their template names):
${componentContext}

TASK:
Generate a complete website structure as a JSON object.
The website must be tailored for the "${params.industry}" industry and reflect the business "${params.websiteName}".
It must contain EXACTLY ${desiredComponentCount} to ${desiredComponentCount + 3} components. Prioritize quality and relevance over exact count if it compromises the design.

CRITICAL REQUIREMENTS:
1.  COMPONENT SELECTION: Use ONLY components whose "COMPONENT TEMPLATE NAME" is listed in the "AVAILABLE COMPONENT LIBRARY" above.
2.  COMPONENT COUNT: Generate between ${desiredComponentCount} and ${desiredComponentCount + 3} components.
3.  PROP GENERATION:
    *   For each component, generate realistic, detailed, and well-structured props.
    *   The content for props MUST be specific to "${params.websiteName}" and the "${params.industry}" industry. Avoid generic placeholders.
    *   Refer to "EXPECTED PROPS STRUCTURE" and "DEFAULT PROPS" for guidance on each component.
    *   If a prop is an array of objects (e.g., navigation items, menu items, testimonials), ensure each object in the array has a consistent structure and all required fields are present.
    *   Example for navigation items: \`"navigation": [{"label": "Home", "href": "/"}, {"label": "About Us", "href": "/about"}]\`
    *   Example for menu items: \`"items": [{"name": "Espresso", "description": "Rich and bold", "price": "$3.50"}]\`
4.  CONTENT QUALITY: Content must be professional, engaging, and conversion-focused, reflecting the desired "${params.toneOfVoice || "professional"}" tone.
5.  HIERARCHY: Ensure a logical component hierarchy (e.g., Header, Hero, content sections, Footer).
6.  METADATA: Create a compelling SEO title, meta description, and relevant keywords.
7.  COLORS: Define a color palette (primary, secondary, accent, background, text) suitable for the industry, style, and any color preferences.

OUTPUT FORMAT (Strictly JSON, no markdown, comments, or other text outside the JSON structure):
\`\`\`json
{
  "components": [
    {
      "type": "COMPONENT_TEMPLATE_NAME_FROM_LIBRARY",
      "props": {
        "propName1": "value1",
        "propName2": ["item1", "item2"],
        "propName3": { "nestedKey": "nestedValue" }
      }
    }
    // ... more components ...
  ],
  "metadata": {
    "title": "SEO Title for ${params.websiteName}",
    "description": "Meta description for ${params.websiteName}, under 160 characters.",
    "keywords": ["${params.industry}", "${params.websiteName}", "keyword3", "keyword4"],
    "industry": "${params.industry}",
    "style": "${params.style}",
    "componentsUsed": 0 // This will be updated programmatically
  },
  "colors": {
    "primary": "#RRGGBB",
    "secondary": "#RRGGBB",
    "accent": "#RRGGBB",
    "background": "#RRGGBB",
    "text": "#RRGGBB"
  }
}
\`\`\`

FINAL CHECKLIST BEFORE GENERATING:
- Is the output ONLY a valid JSON object?
- Are ALL component "type" values EXACTLY matching a "COMPONENT TEMPLATE NAME" from the library?
- Is the component count between ${desiredComponentCount} and ${desiredComponentCount + 3}?
- Are all props correctly structured and filled with realistic, specific content?
- Does the content reflect the industry, business name, and desired tone?
`
}

function parseAndEnhanceResponse(
    response: string,
    params: WebsiteGenerationParams,
    industryKnowledge: any[], // Consider defining a stricter type
    availableComponents: ComponentSchema[],
): GeneratedWebsite {
    try {
        console.log("🔍 Parsing Gemini response...")

        const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/)
        let rawJsonString = response
        if (jsonMatch && jsonMatch[1]) {
            rawJsonString = jsonMatch[1]
        } else {
            // Fallback for responses that might not have markdown backticks but are valid JSON
            const firstBrace = response.indexOf("{")
            const lastBrace = response.lastIndexOf("}")
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                rawJsonString = response.substring(firstBrace, lastBrace + 1)
            } else {
                console.error("❌ No valid JSON block found in response. Raw response:", response)
                throw new Error("No valid JSON block found in response.")
            }
        }

        const parsedData = JSON.parse(rawJsonString)
        console.log("✅ Successfully parsed JSON response")

        if (!parsedData.components || !Array.isArray(parsedData.components)) {
            console.error("❌ Invalid components structure in parsed data")
            throw new Error("Invalid components structure: 'components' array is missing or not an array.")
        }

        console.log(`📊 Initial component count from AI: ${parsedData.components.length}`)

        const cleanedComponents = cleanComponentPropsEnhanced(parsedData.components, availableComponents)
        const validatedComponents = validateAndFixComponents(cleanedComponents, availableComponents, params.industry)

        parsedData.components = ensureComponentOrder(validatedComponents)

        const minComponents = params.componentCount || 10
        if (parsedData.components.length < minComponents) {
            console.log(
                `📝 Adding additional components to reach minimum requirement (current: ${parsedData.components.length}, target: ${minComponents})`,
            )
            const additionalComponents = generateAdditionalComponents(
                params,
                availableComponents,
                parsedData.components,
                minComponents,
            )
            parsedData.components.push(...additionalComponents)
            parsedData.components = ensureComponentOrder(parsedData.components) // Re-order after adding
        }

        console.log(`📊 Final validated component count: ${parsedData.components.length}`)

        const metadata = parsedData.metadata || {}
        const colors = parsedData.colors || {}

        return {
            success: true,
            components: parsedData.components,
            metadata: {
                title: metadata.title || `${params.websiteName} - Professional ${params.industry} Website`,
                description: metadata.description || params.description.substring(0, 160),
                keywords: metadata.keywords || [params.industry, params.websiteName, ...(params.businessGoals || [])],
                industry: params.industry,
                style: params.style,
                componentsUsed: parsedData.components.length,
            },
            colors: {
                primary: colors.primary || getIndustryColors(params.industry, params.style).primary,
                secondary: colors.secondary || getIndustryColors(params.industry, params.style).secondary,
                accent: colors.accent || getIndustryColors(params.industry, params.style).accent,
                background: colors.background || getIndustryColors(params.industry, params.style).background,
                text: colors.text || getIndustryColors(params.industry, params.style).text,
            },
            content: parsedData.content || {},
            generatedAt: new Date().toISOString(),
            aiUsed: "Gemini-RAG-Enhanced-Dataset-v2",
            documentsUsed: industryKnowledge.length,
            componentsAvailable: availableComponents.length,
        }
    } catch (error: any) {
        console.error("❌ Error parsing or enhancing response:", error)
        throw new Error(`Failed to parse or enhance AI response: ${error.message}`)
    }
}

function cleanComponentPropsEnhanced(
    components: any[],
    availableComponents: ComponentSchema[],
): GeneratedWebsiteComponent[] {
    return components
        .map((comp): GeneratedWebsiteComponent => {
            const componentSchema = getComponentByName(comp.type)
            const cleanedProps: Record<string, any> = {}

            const propsToClean = { ...(componentSchema?.defaultProps || {}), ...(comp.props || {}) }

            Object.entries(propsToClean).forEach(([key, value]) => {
                if (value === null || value === undefined) return

                const expectedPropType = componentSchema?.props?.[key]

                if (Array.isArray(value)) {
                    cleanedProps[key] = cleanArrayProp(value, key, componentSchema)
                } else if (typeof value === "object" && value !== null) {
                    cleanedProps[key] = cleanObjectProp(value, componentSchema, key)
                } else {
                    cleanedProps[key] = cleanPrimitiveProp(value, key, expectedPropType as string)
                }
            })

            // Ensure all default props are present if not overridden
            if (componentSchema?.defaultProps) {
                for (const defaultKey in componentSchema.defaultProps) {
                    if (!(defaultKey in cleanedProps)) {
                        cleanedProps[defaultKey] = componentSchema.defaultProps[defaultKey]
                    }
                }
            }

            return {
                type: comp.type, // This should be template_name
                props: cleanedProps,
            }
        })
        .filter((comp) => comp !== null) as GeneratedWebsiteComponent[]
}

function cleanArrayProp(array: any[], propName: string, schema?: ComponentSchema): any[] {
    // More robust cleaning, potentially using schema hints if available
    // For now, keeping your existing detailed logic for specific prop names
    if (
        propName === "items" ||
        propName === "menuItems" ||
        propName === "services" ||
        propName === "products" ||
        propName === "features" ||
        propName === "steps" ||
        propName === "plans" ||
        propName === "teamMembers" ||
        propName === "events" ||
        propName === "posts" ||
        propName === "faqItems" ||
        propName === "galleryImages" ||
        propName === "portfolioItems"
    ) {
        return array.map((item) => {
            if (typeof item === "object" && item !== null) {
                const cleanedItem: Record<string, any> = {}
                // Attempt to make sure common fields are strings
                for (const key in item) {
                    if (
                        typeof item[key] === "number" &&
                        (key === "id" || key === "rating" || key === "price" || key === "count" || key === "order")
                    ) {
                        cleanedItem[key] = item[key]
                    } else if (
                        typeof item[key] === "boolean" &&
                        (key === "isFeatured" || key === "active" || key === "required")
                    ) {
                        cleanedItem[key] = item[key]
                    } else if (Array.isArray(item[key])) {
                        cleanedItem[key] = item[key].map(String) // Simple array of strings
                    } else if (typeof item[key] === "object" && item[key] !== null) {
                        cleanedItem[key] = cleanObjectProp(item[key], schema, key) // Recursive for nested objects
                    } else {
                        cleanedItem[key] = String(item[key] || "")
                    }
                }
                // Ensure common image/icon props
                if (("image" in item || "imageUrl" in item) && !cleanedItem.image && !cleanedItem.imageUrl)
                    cleanedItem.image = "/placeholder.svg?height=200&width=300"
                if ("icon" in item && !cleanedItem.icon) cleanedItem.icon = "Package" // Default Lucide icon

                return cleanedItem
            }
            return { name: String(item), description: "" } // Fallback for simple array items
        })
    } else if (propName === "navigation" || propName === "menu" || propName === "links" || propName === "breadcrumbs") {
        return array.map((item) => {
            if (typeof item === "object" && item !== null) {
                return {
                    label: String(item.label || item.text || item.name || "Link"),
                    href: String(item.href || item.url || item.link || "#"),
                    ...(item.children &&
                        Array.isArray(item.children) && { children: cleanArrayProp(item.children, "navigation", schema) }),
                }
            }
            return { label: String(item), href: "#" }
        })
    } else if (propName === "testimonials") {
        return array.map((item) => {
            if (typeof item === "object" && item !== null) {
                return {
                    name: String(item.name || item.author || "Anonymous"),
                    role: String(item.role || item.title || "Customer"),
                    content: String(item.content || item.quote || item.text || "A great experience!"),
                    rating: typeof item.rating === "number" ? Math.min(5, Math.max(0, item.rating)) : 5,
                    image: String(item.image || item.avatar || "/placeholder.svg?height=100&width=100"),
                    company: String(item.company || ""),
                }
            }
            return {
                name: "Anonymous",
                role: "Customer",
                content: String(item),
                rating: 5,
                image: "/placeholder.svg?height=100&width=100",
            }
        })
    } else if (propName === "buttons" || propName === "actions" || propName === "ctas") {
        return array.map((item) => {
            if (typeof item === "object" && item !== null) {
                return {
                    label: String(item.label || item.text || "Action"),
                    link: String(item.link || item.href || item.url || "#"),
                    type: String(item.type || item.variant || "primary"), // primary, secondary, outline, ghost, link
                    icon: String(item.icon || ""),
                }
            }
            return { label: String(item), link: "#", type: "primary" }
        })
    }
    // Generic array cleaning: convert all items to strings if not objects
    return array.map((item) =>
        typeof item === "object" && item !== null ? cleanObjectProp(item, schema, propName) : String(item),
    )
}

function cleanObjectProp(obj: any, schema?: ComponentSchema, parentKey?: string): Record<string, any> {
    const cleaned: Record<string, any> = {}
    for (const key in obj) {
        const value = obj[key]
        if (value === null || value === undefined) continue

        if (Array.isArray(value)) {
            cleaned[key] = cleanArrayProp(value, key, schema)
        } else if (typeof value === "object") {
            cleaned[key] = cleanObjectProp(value, schema, key) // Recursive call
        } else {
            // Use schema if available to guide primitive cleaning, otherwise default to String
            const expectedPropType = schema?.props?.[parentKey || key]
            cleaned[key] = cleanPrimitiveProp(value, key, expectedPropType as string)
        }
    }
    return cleaned
}

function cleanPrimitiveProp(value: any, propName: string, expectedType?: string): any {
    if (expectedType) {
        if (expectedType.toLowerCase().includes("number")) {
            const num = Number(value)
            return isNaN(num) ? 0 : num
        }
        if (expectedType.toLowerCase().includes("boolean")) {
            return String(value).toLowerCase() === "true" || value === true || value === 1
        }
    }
    // Default to string, but try to preserve numbers for common numeric prop names
    if (
        typeof value === "number" &&
        (propName === "rating" ||
            propName.toLowerCase().includes("price") ||
            propName.toLowerCase().includes("count") ||
            propName.toLowerCase().includes("id") ||
            propName.toLowerCase().includes("order") ||
            propName.toLowerCase().includes("width") ||
            propName.toLowerCase().includes("height"))
    ) {
        return value
    }
    if (typeof value === "boolean") {
        return value
    }
    return String(value)
}

function validateAndFixComponents(
    components: GeneratedWebsiteComponent[],
    availableComponents: ComponentSchema[],
    industry: string,
): GeneratedWebsiteComponent[] {
    const availableComponentMap = new Map(availableComponents.map((c) => [c.template_name, c]))

    return components
        .map((comp) => {
            let currentType = comp.type
            let componentSchema = availableComponentMap.get(currentType)

            if (!componentSchema) {
                console.warn(`⚠️ Component type "${currentType}" not found. Attempting to find alternative...`)
                // Try to find by category or partial match if direct match fails
                const searchName = currentType
                    .toLowerCase()
                    .replace(/section|hero|header|footer/g, "")
                    .trim()
                let bestMatch: ComponentSchema | undefined = undefined
                let highestScore = -1

                for (const availableComp of availableComponents) {
                    let score = 0
                    if (availableComp.template_name.toLowerCase().includes(searchName)) score += 5
                    if (availableComp.category?.toLowerCase() === searchName) score += 10
                    if (availableComp.industries?.includes(industry)) score += 3
                    if (availableComp.industries?.includes("all")) score += 1

                    if (score > highestScore) {
                        highestScore = score
                        bestMatch = availableComp
                    }
                }

                if (bestMatch) {
                    console.log(`✅ Replaced "${currentType}" with best match "${bestMatch.template_name}"`)
                    currentType = bestMatch.template_name
                    componentSchema = bestMatch
                } else {
                    console.error(`❌ Could not find a suitable alternative for "${comp.type}". Discarding component.`)
                    return null // Discard component if no alternative found
                }
            }

            // Ensure props are an object, use defaultProps from schema if AI's props are missing/invalid
            let finalProps = comp.props && typeof comp.props === "object" ? comp.props : {}
            if (componentSchema && componentSchema.defaultProps) {
                finalProps = { ...componentSchema.defaultProps, ...finalProps }
            }

            return {
                type: componentSchema!.component_name, // Use component_name for the factory
                props: finalProps,
            }
        })
        .filter((comp) => comp !== null) as GeneratedWebsiteComponent[]
}

function ensureComponentOrder(components: GeneratedWebsiteComponent[]): GeneratedWebsiteComponent[] {
    const orderPreference = [
        "Header", // Matches any component name containing "Header"
        "Hero", // Matches any component name containing "Hero"
        // Content sections will be in their AI-generated order
        "Footer", // Matches any component name containing "Footer"
    ]

    const orderedComponents: GeneratedWebsiteComponent[] = []
    const contentComponents: GeneratedWebsiteComponent[] = []
    const footerComponents: GeneratedWebsiteComponent[] = []

    // Separate components
    components.forEach((comp) => {
        if (comp.type.includes(orderPreference[0])) {
            // Header
            orderedComponents.unshift(comp) // Add to beginning
        } else if (comp.type.includes(orderPreference[orderPreference.length - 1])) {
            // Footer
            footerComponents.push(comp)
        } else if (comp.type.includes(orderPreference[1])) {
            // Hero
            // Insert hero after headers
            const headerCount = orderedComponents.filter((c) => c.type.includes(orderPreference[0])).length
            orderedComponents.splice(headerCount, 0, comp)
        } else {
            contentComponents.push(comp)
        }
    })

    // Combine in order: Headers, Heroes, Content, Footers
    return [...orderedComponents, ...contentComponents, ...footerComponents]
}

function generateAdditionalComponents(
    params: WebsiteGenerationParams,
    availableComponents: ComponentSchema[],
    existingComponents: GeneratedWebsiteComponent[],
    minCount: number,
): GeneratedWebsiteComponent[] {
    const additional: GeneratedWebsiteComponent[] = []
    const existingTypes = new Set(existingComponents.map((c) => c.type)) // type here is component_name

    // Find schema by component_name for existing types
    const existingTemplateTypes = new Set(
        existingComponents.map((ec) => {
            const schema = availableComponents.find((ac) => ac.component_name === ec.type)
            return schema ? schema.template_name : ec.type // Fallback to ec.type if not found (should not happen)
        }),
    )

    const industrySpecificOrder: string[] = ENHANCED_INDUSTRY_KNOWLEDGE[params.industry.toLowerCase()]?.components || []

    // Prioritize components from industry knowledge that are not yet used
    for (const templateName of industrySpecificOrder) {
        if (additional.length + existingComponents.length >= minCount) break
        if (!existingTemplateTypes.has(templateName)) {
            const componentSchema = availableComponents.find((c) => c.template_name === templateName)
            if (componentSchema) {
                additional.push({
                    type: componentSchema.component_name, // Use component_name for factory
                    props: {
                        ...(componentSchema.defaultProps || {}),
                        // Add minimal industry-specific title/subtitle if possible
                        title: generateIndustrySpecificTitle(componentSchema.template_name, params),
                        subtitle: generateIndustrySpecificSubtitle(componentSchema.template_name, params),
                    },
                })
                existingTemplateTypes.add(templateName) // Add template_name to used set
            }
        }
    }

    // If still not enough, add other available components by category relevance
    const categoryPriority = ["hero", "features", "services", "about", "testimonials", "contact", "cta", "faq"]
    for (const category of categoryPriority) {
        if (additional.length + existingComponents.length >= minCount) break
        const componentsInCategory = availableComponents.filter(
            (c) => c.category === category && !existingTemplateTypes.has(c.template_name),
        )
        for (const componentSchema of componentsInCategory) {
            if (additional.length + existingComponents.length >= minCount) break
            additional.push({
                type: componentSchema.component_name,
                props: {
                    ...(componentSchema.defaultProps || {}),
                    title: generateIndustrySpecificTitle(componentSchema.template_name, params),
                    subtitle: generateIndustrySpecificSubtitle(componentSchema.template_name, params),
                },
            })
            existingTemplateTypes.add(componentSchema.template_name)
            if (additional.length + existingComponents.length >= minCount) break
        }
    }

    console.log(`📝 Generated ${additional.length} additional components.`)
    return additional
}

function generateIndustrySpecificTitle(componentTemplateName: string, params: WebsiteGenerationParams): string {
    const titles: Record<string, Record<string, string>> = {
        restaurant: {
            MenuSection: "Our Delicious Menu",
            AboutSection: "Our Story",
            EventsSection: "Special Events",
            ServicesSection: "Our Services",
            TestimonialsSection: "What Our Guests Say",
            ContactSection: "Visit Us Today",
            CTASection: "Make a Reservation",
            FAQSection: "Common Questions",
            GallerySection: "Food & Ambiance",
        },
        technology: {
            ServicesSection: "Innovative Tech Solutions",
            PortfolioSection: "Our Success Stories",
            ProcessSection: "How We Work",
            TeamSection: "Meet The Experts",
            AboutSection: "About Our Tech Company",
            TestimonialsSection: "Client Accolades",
            ContactSection: "Let's Build Together",
            CTASection: "Start Your Tech Journey",
            BlogSection: "Latest Insights",
        },
        healthcare: {
            ServicesSection: "Comprehensive Medical Services",
            TeamSection: "Our Expert Providers",
            AboutSection: "Dedicated to Your Health",
            TestimonialsSection: "Patient Success Stories",
            ContactSection: "Schedule Your Appointment",
            CTASection: "Book a Consultation Now",
            FAQSection: "Health FAQs",
            BlogSection: "Wellness & Health Tips",
        },
        // Add more industries and component types
    }
    const defaultTitles: Record<string, string> = {
        MinimalistHeader: params.websiteName,
        CreativeHeader: params.websiteName,
        CorporateHeader: params.websiteName,
        CreativeHero: `Welcome to ${params.websiteName}`,
        GradientHero: `Innovate with ${params.websiteName}`,
        MinimalistHero: `Discover ${params.websiteName}`,
        ParallaxHero: `Experience ${params.websiteName}`,
        ModernFooter: `© ${new Date().getFullYear()} ${params.websiteName}`,
    }

    const industryTitles = titles[params.industry.toLowerCase()] || titles.technology // Default to technology
    return (
        industryTitles[componentTemplateName] ||
        defaultTitles[componentTemplateName] ||
        componentTemplateName
            .replace(/([A-Z])/g, " $1")
            .replace(/Section|Hero|Header|Footer/g, "")
            .trim() ||
        `Explore Our ${componentTemplateName}`
    )
}

function generateIndustrySpecificSubtitle(componentTemplateName: string, params: WebsiteGenerationParams): string {
    const subtitles: Record<string, Record<string, string>> = {
        restaurant: {
            MenuSection: "Fresh ingredients, authentic flavors, crafted with passion.",
            AboutSection: "Learn about our journey and commitment to culinary excellence.",
            EventsSection: "Join us for memorable occasions and special culinary events.",
            ServicesSection: "Explore our dining, catering, and private event offerings.",
            TestimonialsSection: "Hear directly from our valued guests and their experiences.",
            ContactSection: "We're here to answer your questions and take reservations.",
            CTASection: "Reserve your table today for an unforgettable dining experience.",
            FAQSection: "Find answers to your questions about our restaurant.",
            GallerySection: "A glimpse into our world of flavors and inviting atmosphere.",
        },
        technology: {
            ServicesSection: "Driving business growth with cutting-edge technology and expertise.",
            PortfolioSection: "See how we've helped businesses like yours achieve their goals.",
            ProcessSection: "Our agile and collaborative approach to project success.",
            TeamSection: "A passionate team of developers, designers, and strategists.",
            AboutSection: "Pioneering innovation and delivering impactful digital solutions.",
            TestimonialsSection: "Discover why clients trust us with their most critical projects.",
            ContactSection: "Discuss your project requirements with our expert team.",
            CTASection: "Ready to transform your business? Let's connect.",
            BlogSection: "Stay updated with the latest trends and insights in technology.",
        },
        healthcare: {
            ServicesSection: "Providing compassionate and advanced medical care for all ages.",
            TeamSection: "Meet our dedicated team of experienced healthcare professionals.",
            AboutSection: "Our commitment to patient-centered care and community wellness.",
            TestimonialsSection: "Read inspiring stories from patients we've had the privilege to serve.",
            ContactSection: "Reach out to schedule an appointment or learn more about our services.",
            CTASection: "Take the first step towards better health and well-being today.",
            FAQSection: "Answers to common health questions and information about our practice.",
            BlogSection: "Informative articles on health, wellness, and preventive care.",
        },
    }
    const defaultSubtitles: Record<string, string> = {
        CreativeHero: `Your partner in ${params.industry} excellence. ${params.description.substring(0, 100)}...`,
        GradientHero: `Leading ${params.industry} solutions tailored for you. ${params.description.substring(0, 100)}...`,
        MinimalistHero: `Simplicity and elegance in ${params.industry}. ${params.description.substring(0, 100)}...`,
    }

    const industrySubtitles = subtitles[params.industry.toLowerCase()] || subtitles.technology
    return (
        industrySubtitles[componentTemplateName] ||
        defaultSubtitles[componentTemplateName] ||
        `Explore the best of ${params.websiteName} for your ${params.industry} needs.`
    )
}

function getIndustryColors(industry: string, style: string): GeneratedWebsite["colors"] {
    const colorSchemes: Record<string, Record<string, GeneratedWebsite["colors"]>> = {
        restaurant: {
            modern: { primary: "#d97706", secondary: "#fbbf24", accent: "#92400e", background: "#fef3c7", text: "#1f2937" },
            elegant: { primary: "#7c2d12", secondary: "#fed7aa", accent: "#431407", background: "#fef7ed", text: "#1c1917" },
            luxury: { primary: "#92400e", secondary: "#fbbf24", accent: "#451a03", background: "#fffbeb", text: "#1c1917" },
        },
        technology: {
            modern: { primary: "#2563eb", secondary: "#93c5fd", accent: "#1d4ed8", background: "#eff6ff", text: "#1e293b" },
            professional: {
                primary: "#1f2937",
                secondary: "#6b7280",
                accent: "#111827",
                background: "#f9fafb",
                text: "#111827",
            },
            creative: { primary: "#7c3aed", secondary: "#c4b5fd", accent: "#5b21b6", background: "#f5f3ff", text: "#1e1b4b" },
        },
        healthcare: {
            modern: { primary: "#059669", secondary: "#a7f3d0", accent: "#047857", background: "#ecfdf5", text: "#064e3b" },
            professional: {
                primary: "#1e40af",
                secondary: "#bfdbfe",
                accent: "#1d4ed8",
                background: "#eff6ff",
                text: "#1e3a8a",
            },
            calming: { primary: "#0891b2", secondary: "#a5f3fc", accent: "#0e7490", background: "#ecfeff", text: "#164e63" },
        },
        ecommerce: {
            modern: { primary: "#db2777", secondary: "#f9a8d4", accent: "#831843", background: "#fdf2f8", text: "#500724" },
            playful: { primary: "#fb923c", secondary: "#fdba74", accent: "#c2410c", background: "#fff7ed", text: "#7c2d12" },
            luxury: { primary: "#ca8a04", secondary: "#fde047", accent: "#713f12", background: "#fefce8", text: "#422006" },
        },
        education: {
            professional: {
                primary: "#075985",
                secondary: "#7dd3fc",
                accent: "#0c4a6e",
                background: "#f0f9ff",
                text: "#082f49",
            },
            modern: { primary: "#65a30d", secondary: "#bef264", accent: "#3f6212", background: "#f7fee7", text: "#1a2e05" },
            creative: { primary: "#c026d3", secondary: "#f0abfc", accent: "#701a75", background: "#fdf4ff", text: "#4a044e" },
        },
        realestate: {
            professional: {
                primary: "#374151",
                secondary: "#9ca3af",
                accent: "#111827",
                background: "#f9fafb",
                text: "#1f2937",
            },
            luxury: { primary: "#7f1d1d", secondary: "#fca5a5", accent: "#450a0a", background: "#fef2f2", text: "#450a0a" },
            modern: { primary: "#065f46", secondary: "#6ee7b7", accent: "#047857", background: "#f0fdfa", text: "#022c22" },
        },
        fitness: {
            energetic: {
                primary: "#ea580c",
                secondary: "#fb923c",
                accent: "#9a3412",
                background: "#fff7ed",
                text: "#7c2d12",
            },
            modern: { primary: "#16a34a", secondary: "#86efac", accent: "#15803d", background: "#f0fdf4", text: "#14532d" },
            professional: {
                primary: "#4f46e5",
                secondary: "#a5b4fc",
                accent: "#3730a3",
                background: "#eef2ff",
                text: "#312e81",
            },
        },
    }

    const industryScheme = colorSchemes[industry.toLowerCase()] || colorSchemes.technology
    return industryScheme[style.toLowerCase()] || industryScheme.modern
}

// Fallback functions (can be simplified or removed if advanced generation is robust)
// ... (generateFallbackWebsite, generateFallbackStructure, getIndustryNavigation, getIndustrySpecificComponents, getDefaultColors)
// These were present in your original file, keeping them for now but they might be less critical with the enhanced generation.
// If keeping, ensure getDefaultColors also returns the full color object.
function getDefaultColors(industry: string, style: string): GeneratedWebsite["colors"] {
    // Simplified version for fallback
    const baseColors = getIndustryColors(industry, style)
    return {
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        accent: baseColors.accent,
        background: baseColors.background || "#ffffff", // Ensure fallback has all keys
        text: baseColors.text || "#333333",
    }
}
