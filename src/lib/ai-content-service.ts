import { WebsiteGenerationParams } from "@/types"

// Knowledge base with industry-specific templates
const INDUSTRY_KNOWLEDGE: Record<string, string> = {
    restaurant: `Restaurant websites should include: menu sections with categories, reservation system, food gallery, chef profiles, location/hours, and testimonials. Use warm colors and food imagery.`,
    technology: `Tech websites need: features grid, pricing tables, case studies, team profiles, technical specifications, and contact forms. Use modern, clean designs with blue/tech colors.`,
    realestate: `Real estate sites require: property listings with filters, virtual tours, agent profiles, mortgage calculator, neighborhood guides, and contact forms.`,
    healthcare: `Healthcare websites need: service listings, doctor/team profiles, appointment booking, FAQs, insurance info, and emergency contacts. Use clean, accessible design.`,
    fitness: `Fitness websites should include: class schedules, trainer bios, membership plans, testimonials, and photo/video gallery. Use energetic, bold visuals.`,
    beauty: `Beauty & spa sites should offer: service menus, booking system, photo gallery, pricing, and testimonials. Use soft colors and elegant design.`,
    legal: `Law firm sites need: team bios, service areas, case results/testimonials, contact forms, and FAQs. Use professional, trustworthy visuals.`,
    education: `Education & training websites should include: course catalogs, enrollment info, event calendars, faculty profiles, and student testimonials.`,
    photography: `Photography portfolios should include: galleries, project showcases, client testimonials, booking/contact form, and service pricing.`,
    business: `Consulting websites need: service descriptions, case studies, team intros, client logos/testimonials, and a strong contact CTA.`,
    ecommerce: `E-commerce sites should include: product listings with filters, shopping cart, checkout system, product pages, and reviews.`,
    travel: `Travel websites need: destination galleries, itineraries, booking system, customer reviews, and travel tips. Use vibrant, inviting visuals.`,
    construction: `Construction/architecture websites should feature: project portfolios, services, testimonials, certifications, and team bios.`,
    automotive: `Auto websites should show: services offered, photo gallery, appointment system, vehicle inventory (if sales), and contact info.`,
    fashion: `Fashion sites need: product catalogs, collections, lookbooks, size guides, reviews, and smooth shopping cart integration.`,
    finance: `Finance websites should include: services, contact forms, security disclosures, FAQs, calculators, and team bios. Use serious, secure visuals.`,
    nonprofit: `Non-profit websites should offer: mission overview, events, donation system, volunteer signup, and team introductions.`,
    eventplanning: `Event planning sites should show: past events gallery, services, testimonials, pricing/packages, and contact form.`,
    interior: `Interior design sites need: design portfolios, service packages, testimonials, about the designer/team, and contact/booking info.`,
    marketing: `Marketing & advertising sites should include: portfolio/case studies, services, testimonials, blog, and contact forms.`,
};
export async function generateAIContent(
    componentType: string,
    params: WebsiteGenerationParams
): Promise<any> {
    const context = INDUSTRY_KNOWLEDGE[params.industry] || ""

    const prompt = `Generate professional content for a ${componentType} section on a ${params.industry} website.
Business Name: ${params.websiteName}
Description: ${params.description}
Target Audience: ${params.targetAudience || "general public"}
Unique Selling Points: ${params.uniqueSellingPoints || "quality service"}

Structure your response as JSON with only these keys: title, subtitle, description, items (if applicable).`

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "wizardlm",
                prompt: `${context}\n\n${prompt}`,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                    num_ctx: 4096
                }
            })
        })

        if (!response.ok) throw new Error("AI service error")

        const data = await response.json()
        const jsonString = data.response.match(/\{[\s\S]*\}/)?.[0] || "{}"
        return JSON.parse(jsonString)
    } catch (error) {
        console.error("AI content error:", error)
        return generateFallbackContent(componentType, params)
    }
}

function generateFallbackContent(componentType: string, params: WebsiteGenerationParams) {
    // Simple fallbacks for each component type
    const fallbacks: Record<string, any> = {
        hero: {
            title: `Welcome to ${params.websiteName}`,
            subtitle: "Professional services you can trust",
            description: params.description || ""
        },
        features: {
            title: "Why Choose Us",
            subtitle: "Our Key Advantages",
            items: [
                { title: "Quality Service", description: "Exceptional service quality" },
                { title: "Expert Team", description: "Experienced professionals" },
                { title: "Customer Focus", description: "Dedicated to your satisfaction" }
            ]
        },
        about: {
            title: "About Us",
            subtitle: `Get to know ${params.websiteName}`,
            description: params.description || "We are passionate about what we do and always strive for excellence.",
            image: "/images/about-placeholder.jpg"
        },
        services: {
            title: "Our Services",
            subtitle: "What We Offer",
            items: [
                { title: "Consulting", description: "Expert advice to help you succeed." },
                { title: "Development", description: "Custom solutions built for your needs." },
                { title: "Support", description: "We're here to help you every step of the way." }
            ]
        },
        testimonials: {
            title: "What Our Clients Say",
            subtitle: "Trusted by hundreds",
            items: [
                {
                    name: "Jane Doe",
                    role: "CEO, Example Inc.",
                    quote: "Outstanding service and support!",
                    image: "/images/avatar1.jpg"
                },
                {
                    name: "John Smith",
                    role: "Founder, Startup Co.",
                    quote: "Highly recommended for anyone looking to grow their business.",
                    image: "/images/avatar2.jpg"
                }
            ]
        },
        contact: {
            title: "Get in Touch",
            subtitle: "We’d love to hear from you",
            address: "123 Main Street, City, Country",
            phone: "+123 456 7890",
            email: "info@example.com"
        },
        team: {
            title: "Meet Our Team",
            subtitle: "Experienced. Passionate. Dedicated.",
            members: [
                {
                    name: "Alice Johnson",
                    role: "Founder & CEO",
                    image: "/images/team1.jpg"
                },
                {
                    name: "Mark Davis",
                    role: "CTO",
                    image: "/images/team2.jpg"
                }
            ]
        },
        gallery: {
            title: "Our Work",
            subtitle: "Snapshots from our portfolio",
            images: [
                "/images/gallery1.jpg",
                "/images/gallery2.jpg",
                "/images/gallery3.jpg"
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Your questions answered",
            items: [
                {
                    question: "What services do you offer?",
                    answer: "We provide a range of professional services tailored to your needs."
                },
                {
                    question: "How can I get a quote?",
                    answer: "Contact us via the form or email and we’ll get back to you shortly."
                }
            ]
        },
        pricing: {
            title: "Our Pricing Plans",
            subtitle: "Transparent and affordable",
            plans: [
                {
                    name: "Basic",
                    price: "$29/mo",
                    features: ["1 Project", "Email Support", "Basic Analytics"]
                },
                {
                    name: "Pro",
                    price: "$59/mo",
                    features: ["5 Projects", "Priority Support", "Advanced Analytics"]
                }
            ]
        },
        blog: {
            title: "Latest Articles",
            subtitle: "Insights & tips from our team",
            posts: [
                {
                    title: "How to Get Started with Our Services",
                    summary: "A step-by-step guide to help you onboard with us.",
                    image: "/images/blog1.jpg",
                    date: "2025-06-01"
                },
                {
                    title: "5 Mistakes to Avoid in Your Project",
                    summary: "Learn from experience and make smarter decisions.",
                    image: "/images/blog2.jpg",
                    date: "2025-05-15"
                }
            ]
        }
    };

    return fallbacks[componentType] || {};
}