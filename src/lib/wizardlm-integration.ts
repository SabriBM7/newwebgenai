interface WizardLMRequest {
    description: string
    websiteName: string
    industry: string
    style: string
}

export async function generateWithWizardLM(params: WizardLMRequest) {
    try {
        console.log("🧙‍♂️ Generating with WizardLM...")

        const prompt = createWizardLMPrompt(params)
        console.log("📝 Prompt:", prompt)

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "wizardlm2",
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                    max_tokens: 2000,
                },
            }),
        })

        if (!response.ok) {
            throw new Error(`WizardLM API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("🎯 WizardLM Raw Response:", data.response)

        // Parse the response
        const websiteData = parseWizardLMResponse(data.response, params)
        console.log("✅ Parsed Website Data:", websiteData)

        return websiteData
    } catch (error) {
        console.error("❌ WizardLM Generation Failed:", error)
        throw error
    }
}

function createWizardLMPrompt(params: WizardLMRequest): string {
    return `You are a professional web designer and copywriter. Create a comprehensive website for a ${params.industry} business.

BUSINESS DETAILS:
- Name: ${params.websiteName}
- Industry: ${params.industry}
- Description: ${params.description}
- Style: ${params.style}

TASK: Generate professional website content for ALL sections. Make it authentic, compelling, and industry-specific.

REQUIRED OUTPUT FORMAT (JSON):
{
  "hero": {
    "title": "Compelling headline that addresses customer pain points",
    "subtitle": "Supporting subtitle that explains unique value proposition", 
    "description": "Detailed description that builds trust and explains benefits",
    "primaryButton": "Action-oriented CTA",
    "secondaryButton": "Secondary action"
  },
  "features": {
    "title": "Why Choose ${params.websiteName}",
    "subtitle": "What sets us apart",
    "description": "Brief explanation of our advantages",
    "features": [
      {
        "title": "Benefit-focused feature 1",
        "description": "How this specifically helps customers",
        "icon": "⭐"
      },
      {
        "title": "Benefit-focused feature 2", 
        "description": "Concrete value this provides",
        "icon": "🛡️"
      },
      {
        "title": "Benefit-focused feature 3",
        "description": "Why customers love this",
        "icon": "❤️"
      },
      {
        "title": "Benefit-focused feature 4",
        "description": "The competitive advantage this gives",
        "icon": "⚡"
      }
    ]
  },
  "about": {
    "title": "About ${params.websiteName}",
    "subtitle": "Our Story",
    "content": "Compelling story that builds trust and connection (2-3 sentences)",
    "features": [
      "Key strength 1",
      "Key strength 2", 
      "Key strength 3",
      "Key strength 4"
    ]
  },
  "gallery": {
    "title": "Gallery title relevant to ${params.industry}",
    "subtitle": "Gallery",
    "images": [
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+1",
        "alt": "Descriptive alt text",
        "title": "Image title"
      },
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+2", 
        "alt": "Descriptive alt text",
        "title": "Image title"
      },
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+3",
        "alt": "Descriptive alt text", 
        "title": "Image title"
      },
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+4",
        "alt": "Descriptive alt text",
        "title": "Image title"
      },
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+5",
        "alt": "Descriptive alt text",
        "title": "Image title"
      },
      {
        "url": "/placeholder.svg?height=400&width=400&text=Image+6",
        "alt": "Descriptive alt text",
        "title": "Image title"
      }
    ]
  },
  "testimonials": {
    "title": "What Our Customers Say",
    "subtitle": "Testimonials",
    "testimonials": [
      {
        "quote": "Specific testimonial with concrete results",
        "author": "Realistic customer name",
        "role": "Customer title/role",
        "rating": 5,
        "avatar": "/placeholder.svg?height=100&width=100&text=Customer+1"
      },
      {
        "quote": "Another specific testimonial with measurable outcomes",
        "author": "Another realistic name", 
        "role": "Customer title/role",
        "rating": 5,
        "avatar": "/placeholder.svg?height=100&width=100&text=Customer+2"
      },
      {
        "quote": "Third testimonial focusing on experience",
        "author": "Third realistic name",
        "role": "Customer title/role", 
        "rating": 5,
        "avatar": "/placeholder.svg?height=100&width=100&text=Customer+3"
      }
    ]
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "FAQ", 
    "faqs": [
      {
        "question": "Industry-specific question 1?",
        "answer": "Helpful, detailed answer"
      },
      {
        "question": "Industry-specific question 2?",
        "answer": "Helpful, detailed answer"
      },
      {
        "question": "Industry-specific question 3?",
        "answer": "Helpful, detailed answer"
      },
      {
        "question": "Industry-specific question 4?",
        "answer": "Helpful, detailed answer"
      },
      {
        "question": "Industry-specific question 5?",
        "answer": "Helpful, detailed answer"
      }
    ]
  },
  "team": {
    "title": "Meet Our Team",
    "subtitle": "Our Team",
    "team": [
      {
        "name": "Realistic name 1",
        "role": "Job title relevant to ${params.industry}",
        "bio": "Brief professional bio",
        "image": "/placeholder.svg?height=300&width=300&text=Team+Member+1"
      },
      {
        "name": "Realistic name 2", 
        "role": "Job title relevant to ${params.industry}",
        "bio": "Brief professional bio",
        "image": "/placeholder.svg?height=300&width=300&text=Team+Member+2"
      },
      {
        "name": "Realistic name 3",
        "role": "Job title relevant to ${params.industry}",
        "bio": "Brief professional bio", 
        "image": "/placeholder.svg?height=300&width=300&text=Team+Member+3"
      }
    ]
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Get In Touch",
    "phone": "(555) 123-4567",
    "email": "info@${params.websiteName.toLowerCase().replace(/\s+/g, "")}.com",
    "address": "Realistic address for ${params.industry} business",
    "hours": "Business hours appropriate for ${params.industry}"
  },
  "cta": {
    "title": "Ready to experience ${params.websiteName}?",
    "description": "Compelling call to action description",
    "primaryButton": "Strong action CTA",
    "secondaryButton": "Secondary action"
  }
}

IMPORTANT RULES:
1. Make ALL content specific to ${params.industry} industry
2. Use professional, benefit-focused language
3. Avoid generic phrases like "quality service" or "professional team"
4. Focus on what makes this business unique
5. Use realistic customer names and roles
6. Return ONLY the JSON, no additional text
7. Make testimonials specific with concrete results
8. Ensure all CTAs are action-oriented and compelling
9. Generate content for ALL sections requested
10. Make FAQs industry-specific and helpful

Generate the complete professional website content now:`
}

function parseWizardLMResponse(response: string, params: WizardLMRequest) {
    try {
        // Extract JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error("No valid JSON found in WizardLM response")
        }

        const content = JSON.parse(jsonMatch[0])
        console.log("📋 Parsed Content:", content)

        // Build comprehensive website structure with ALL components
        return {
            metadata: {
                title: `${params.websiteName} - ${content.hero.subtitle}`,
                description: content.hero.description,
                industry: params.industry,
                style: params.style,
                primaryColor: getIndustryColors(params.industry).primary,
                secondaryColor: getIndustryColors(params.industry).secondary,
                aiUsed: "WizardLM-2",
                generatedAt: new Date().toISOString(),
                includeImages: true,
            },
            components: [
                // Header
                {
                    type: "ModernHeader",
                    props: {
                        logo: params.websiteName,
                        links: getIndustryNavigation(params.industry),
                        ctaButton: {
                            text: content.cta.primaryButton,
                            url: "#contact",
                        },
                        sticky: true,
                        transparent: false,
                    },
                },

                // Hero Section
                {
                    type: "HeroSection",
                    props: {
                        title: content.hero.title,
                        subtitle: content.hero.subtitle,
                        description: content.hero.description,
                        primaryButtonText: content.hero.primaryButton,
                        primaryButtonHref: "#contact",
                        secondaryButtonText: content.hero.secondaryButton,
                        secondaryButtonHref: "#about",
                        imageUrl: getIndustryHeroImage(params.industry),
                        backgroundColor: "bg-gradient-to-r from-orange-600 to-red-600",
                        textColor: "text-white",
                    },
                },

                // Features Section
                {
                    type: "FeaturesSection",
                    props: {
                        title: content.features.title,
                        subtitle: content.features.subtitle,
                        description: content.features.description,
                        features: content.features.features,
                        layout: "grid",
                        columns: 2,
                        backgroundColor: "bg-white",
                        textColor: "text-gray-900",
                    },
                },

                // About Section
                {
                    type: "AboutSection",
                    props: {
                        title: content.about.title,
                        subtitle: content.about.subtitle,
                        content: content.about.content,
                        features: content.about.features,
                        imageUrl: getIndustryAboutImage(params.industry),
                        backgroundColor: "bg-gray-50",
                        textColor: "text-gray-900",
                    },
                },

                // Gallery Section
                {
                    type: "GallerySection",
                    props: {
                        title: content.gallery.title,
                        subtitle: content.gallery.subtitle,
                        images: content.gallery.images,
                        layout: "grid",
                        columns: 3,
                        backgroundColor: "bg-white",
                    },
                },

                // Testimonials Section
                {
                    type: "TestimonialsSection",
                    props: {
                        title: content.testimonials.title,
                        subtitle: content.testimonials.subtitle,
                        testimonials: content.testimonials.testimonials,
                        variant: "cards",
                        backgroundColor: "bg-gray-50",
                        textColor: "text-gray-900",
                    },
                },

                // FAQ Section
                {
                    type: "FAQSection",
                    props: {
                        title: content.faq.title,
                        subtitle: content.faq.subtitle,
                        faqs: content.faq.faqs,
                        backgroundColor: "bg-white",
                        textColor: "text-gray-900",
                    },
                },

                // Team Section (if team data exists)
                ...(content.team && content.team.team && content.team.team.length > 0
                    ? [
                        {
                            type: "TeamSection",
                            props: {
                                title: content.team.title,
                                subtitle: content.team.subtitle,
                                team: content.team.team,
                                backgroundColor: "bg-gray-50",
                                textColor: "text-gray-900",
                            },
                        },
                    ]
                    : []),

                // Contact Section
                {
                    type: "ContactSection",
                    props: {
                        title: content.contact.title,
                        subtitle: content.contact.subtitle,
                        phone: content.contact.phone,
                        email: content.contact.email,
                        address: content.contact.address,
                        hours: content.contact.hours,
                        backgroundColor: "bg-white",
                        textColor: "text-gray-900",
                    },
                },

                // CTA Section
                {
                    type: "CTASection",
                    props: {
                        title: content.cta.title,
                        description: content.cta.description,
                        buttonText: content.cta.primaryButton,
                        buttonUrl: "#contact",
                        backgroundColor: "bg-gradient-to-r from-orange-600 to-red-600",
                        textColor: "text-white",
                    },
                },

                // Footer
                {
                    type: "ModernFooter",
                    props: {
                        logo: params.websiteName,
                        tagline: content.hero.subtitle,
                        links: getIndustryFooterLinks(params.industry),
                        social: [
                            { platform: "facebook", url: "#" },
                            { platform: "twitter", url: "#" },
                            { platform: "instagram", url: "#" },
                            { platform: "linkedin", url: "#" },
                        ],
                        copyright: `© 2024 ${params.websiteName}. All rights reserved.`,
                        backgroundColor: "bg-gray-900",
                        textColor: "text-white",
                    },
                },
            ],
            isFallback: false,
        }
    } catch (error) {
        console.error("❌ Error parsing WizardLM response:", error)
        throw new Error("Failed to parse WizardLM response")
    }
}

// Helper functions
function getIndustryColors(industry: string) {
    const colors: Record<string, { primary: string; secondary: string }> = {
        restaurant: { primary: "#f97316", secondary: "#fb923c" },
        technology: { primary: "#3b82f6", secondary: "#60a5fa" },
        healthcare: { primary: "#10b981", secondary: "#34d399" },
        ecommerce: { primary: "#8b5cf6", secondary: "#a78bfa" },
    }
    return colors[industry] || colors.technology
}

function getIndustryNavigation(industry: string) {
    const navMap: Record<string, any[]> = {
        restaurant: [
            { text: "Home", url: "#home" },
            { text: "Menu", url: "#menu" },
            { text: "About", url: "#about" },
            { text: "Gallery", url: "#gallery" },
            { text: "Contact", url: "#contact" },
        ],
        technology: [
            { text: "Home", url: "#home" },
            { text: "Services", url: "#services" },
            { text: "About", url: "#about" },
            { text: "Portfolio", url: "#portfolio" },
            { text: "Contact", url: "#contact" },
        ],
    }
    return navMap[industry] || navMap.technology
}

function getIndustryHeroImage(industry: string): string {
    const images: Record<string, string> = {
        restaurant: "/placeholder.svg?height=600&width=1200&text=Mexican+Restaurant+Interior",
        technology: "/placeholder.svg?height=600&width=1200&text=Technology+Solutions",
        healthcare: "/placeholder.svg?height=600&width=1200&text=Healthcare+Services",
    }
    return images[industry] || images.technology
}

function getIndustryAboutImage(industry: string): string {
    const images: Record<string, string> = {
        restaurant: "/placeholder.svg?height=500&width=600&text=Chef+Cooking",
        technology: "/placeholder.svg?height=500&width=600&text=Team+Working",
        healthcare: "/placeholder.svg?height=500&width=600&text=Medical+Team",
    }
    return images[industry] || images.technology
}

function getRestaurantGalleryImages() {
    return [
        {
            url: "/placeholder.svg?height=400&width=400&text=Tacos+Al+Pastor",
            alt: "Tacos Al Pastor",
            title: "Signature Tacos Al Pastor",
        },
        {
            url: "/placeholder.svg?height=400&width=400&text=Fresh+Guacamole",
            alt: "Fresh Guacamole",
            title: "Made-to-Order Guacamole",
        },
        {
            url: "/placeholder.svg?height=400&width=400&text=Beef+Burritos",
            alt: "Beef Burritos",
            title: "Authentic Beef Burritos",
        },
        {
            url: "/placeholder.svg?height=400&width=400&text=Cheese+Quesadillas",
            alt: "Cheese Quesadillas",
            title: "Melted Cheese Quesadillas",
        },
        {
            url: "/placeholder.svg?height=400&width=400&text=Loaded+Nachos",
            alt: "Loaded Nachos",
            title: "Fully Loaded Nachos",
        },
        {
            url: "/placeholder.svg?height=400&width=400&text=Margaritas",
            alt: "Signature Margaritas",
            title: "House Special Margaritas",
        },
    ]
}

function getIndustryFAQs(industry: string) {
    const faqMap: Record<string, any[]> = {
        restaurant: [
            {
                question: "Do you take reservations?",
                answer: "Yes, we accept reservations for parties of all sizes. You can book online or call us directly.",
            },
            {
                question: "What are your hours?",
                answer: "We're open Monday-Thursday 11am-10pm, Friday-Saturday 11am-11pm, and Sunday 11am-9pm.",
            },
            {
                question: "Do you offer catering?",
                answer: "Yes, we provide catering services for events of all sizes. Contact us for more information.",
            },
            {
                question: "Is parking available?",
                answer: "Yes, we have free parking available for all our guests in our dedicated lot.",
            },
        ],
    }
    return faqMap[industry] || faqMap.restaurant
}

function getIndustryFooterLinks(industry: string) {
    const linkMap: Record<string, any[]> = {
        restaurant: [
            {
                title: "Menu",
                items: [
                    { text: "Appetizers", url: "#appetizers" },
                    { text: "Tacos", url: "#tacos" },
                    { text: "Burritos", url: "#burritos" },
                    { text: "Beverages", url: "#drinks" },
                ],
            },
            {
                title: "Services",
                items: [
                    { text: "Dine In", url: "#dine-in" },
                    { text: "Takeout", url: "#takeout" },
                    { text: "Catering", url: "#catering" },
                    { text: "Events", url: "#events" },
                ],
            },
            {
                title: "Contact",
                items: [
                    { text: "Location", url: "#location" },
                    { text: "Hours", url: "#hours" },
                    { text: "Reservations", url: "#reservations" },
                    { text: "Phone", url: "#phone" },
                ],
            },
        ],
    }
    return linkMap[industry] || linkMap.restaurant
}
