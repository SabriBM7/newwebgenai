import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export class IntelligentContentGenerator {
    async generateIndustrySpecificContent(params: {
        industry: string
        businessName: string
        description: string
        targetAudience?: string
    }) {
        const industryPrompts = {
            restaurant: this.getRestaurantPrompt(params),
            healthcare: this.getHealthcarePrompt(params),
            technology: this.getTechnologyPrompt(params),
            ecommerce: this.getEcommercePrompt(params),
            consulting: this.getConsultingPrompt(params),
        }

        const prompt = industryPrompts[params.industry as keyof typeof industryPrompts] || industryPrompts.consulting

        const { text } = await generateText({
            model: openai("gpt-4"),
            prompt,
            temperature: 0.8,
        })

        return JSON.parse(text)
    }

    // in intelligent-content-generator.ts

    private getRestaurantPrompt(params: any) {
        return `Generate a comprehensive WEBSITE STRATEGY for ${params.businessName}, a restaurant.

    Business Description: ${params.description}
    Target Audience: ${params.targetAudience || "Food lovers and families"}

    Return a single, valid JSON object with the following structure:
    {
      "brandIdentity": {
        "name": "${params.businessName}",
        "tagline": "A catchy, appetizing tagline for the restaurant",
        "coreConcept": "A 1-2 sentence description of the restaurant's unique theme (e.g., 'A modern twist on classic Italian comfort food in a rustic setting')",
        "toneOfVoice": "Describe the desired tone (e.g., 'Warm, inviting, and slightly sophisticated')"
      },
      "sitemap": ["Home", "Menu", "About", "Gallery", "Reservations", "Contact"],
      "keyContent": {
        "uniqueSellingPoints": ["Fresh, locally-sourced ingredients", "Handmade pasta daily", "Cozy, romantic ambiance"],
        "heroHeadline": "A powerful, attention-grabbing headline for the hero section",
        "aboutStory": "A brief, 2-sentence story concept for the about section"
      },
      "visuals": {
        "mood": "Describe the visual mood (e.g., 'Warm, rustic, intimate, with lots of wood and soft lighting')",
        "imageKeywords": "A detailed comma-separated list of keywords for image searches (e.g., 'Italian food, handmade pasta, cozy restaurant interior, wine glasses, chef cooking')"
      }
    }`;
    }

    private getHealthcarePrompt(params: any) {
        return `Generate comprehensive content for ${params.businessName}, a healthcare practice.

Description: ${params.description}
Target Audience: ${params.targetAudience || "Patients seeking quality healthcare"}

Create detailed content including:

1. Hero Section:
   - Trustworthy headline emphasizing care and expertise
   - Professional description of services
   - Clear call-to-action for appointments

2. About Section:
   - Practice history and mission
   - Medical team credentials and specializations
   - Commitment to patient care
   - Technology and facilities

3. Services:
   - 6-8 medical services with detailed descriptions
   - Treatment approaches and methodologies
   - Insurance and payment information
   - Emergency services

4. Medical Team:
   - Doctor profiles with specializations
   - Education and certifications
   - Years of experience
   - Patient care philosophy

5. Patient Experience:
   - What to expect during visits
   - Appointment scheduling process
   - Patient portal and digital services
   - Follow-up care procedures

6. Patient Testimonials:
   - 4-5 realistic patient reviews
   - Specific mentions of care quality and staff
   - Recovery stories and outcomes

Return as structured JSON with professional, trustworthy content that builds confidence in the healthcare services.`
    }

    private getTechnologyPrompt(params: any) {
        return `Generate comprehensive content for ${params.businessName}, a technology company.

Description: ${params.description}
Target Audience: ${params.targetAudience || "Businesses seeking technology solutions"}

Create detailed content including:

1. Hero Section:
   - Innovation-focused headline
   - Technical expertise and solutions
   - Clear value proposition

2. About Section:
   - Company founding story and vision
   - Technical expertise and team
   - Industry experience and achievements
   - Innovation philosophy

3. Services/Solutions:
   - 6-8 technology services with detailed descriptions
   - Technical specifications and capabilities
   - Implementation processes
   - Support and maintenance

4. Portfolio:
   - 4-6 project case studies
   - Technical challenges solved
   - Results and metrics achieved
   - Client success stories

5. Technology Stack:
   - Programming languages and frameworks
   - Cloud platforms and infrastructure
   - Development methodologies
   - Quality assurance processes

6. Client Testimonials:
   - 4-5 realistic client reviews
   - Specific technical achievements
   - Business impact and ROI

Return as structured JSON with technical credibility and business value focus.`
    }

    private getEcommercePrompt(params: any) {
        return `Generate comprehensive content for ${params.businessName}, an e-commerce business.

Description: ${params.description}
Target Audience: ${params.targetAudience || "Online shoppers"}

Create detailed content including:

1. Hero Section:
   - Product-focused headline
   - Unique selling proposition
   - Shopping incentives and offers

2. About Section:
   - Brand story and mission
   - Product quality and sourcing
   - Customer commitment
   - Company values

3. Product Categories:
   - 6-8 product categories with descriptions
   - Featured products and bestsellers
   - Pricing and value propositions
   - Product benefits and features

4. Shopping Experience:
   - Easy ordering process
   - Shipping and delivery options
   - Return and exchange policies
   - Customer support

5. Trust Signals:
   - Security and payment options
   - Customer reviews and ratings
   - Guarantees and warranties
   - Certifications and awards

6. Customer Testimonials:
   - 4-5 realistic customer reviews
   - Product satisfaction and quality
   - Shopping experience feedback

Return as structured JSON with compelling product descriptions and trust-building content.`
    }

    private getConsultingPrompt(params: any) {
        return `Generate comprehensive content for ${params.businessName}, a consulting business.

Description: ${params.description}
Target Audience: ${params.targetAudience || "Businesses seeking expert guidance"}

Create detailed content including:

1. Hero Section:
   - Expertise-focused headline
   - Problem-solving capabilities
   - Results-driven approach

2. About Section:
   - Consulting firm history and expertise
   - Team credentials and experience
   - Industry knowledge and insights
   - Methodology and approach

3. Services:
   - 6-8 consulting services with detailed descriptions
   - Industry specializations
   - Engagement models and processes
   - Expected outcomes and deliverables

4. Case Studies:
   - 4-6 client success stories
   - Business challenges addressed
   - Solutions implemented
   - Measurable results achieved

5. Expertise Areas:
   - Industry knowledge and experience
   - Specialized skills and certifications
   - Thought leadership and insights
   - Continuous learning and development

6. Client Testimonials:
   - 4-5 realistic client reviews
   - Specific business improvements
   - ROI and value delivered

Return as structured JSON with authoritative, results-focused content that demonstrates expertise and value.`
    }
}

export const intelligentContentGenerator = new IntelligentContentGenerator()
