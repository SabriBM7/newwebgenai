import { getIndustryConfig, type IndustryConfig } from "./comprehensive-industry-system"
import { enhancedOllamaService } from "./enhanced-ollama-service"

interface WebsiteGenerationParams {
    description: string
    websiteName: string
    industry: string
    style: string
    aiProvider: string
    includeImages?: boolean
    targetAudience?: string
    businessGoals?: string[]
    uniqueSellingPoints?: string[]
}

interface ComponentData {
    type: string
    props: Record<string, any>
}

export class EnhancedWebsiteGenerator {
    async generateWebsite(params: WebsiteGenerationParams) {
        try {
            console.log("🚀 Generating enhanced website with comprehensive industry system...")

            const industryConfig = getIndustryConfig(params.industry)
            console.log(`📋 Using industry config for: ${industryConfig.displayName}`)

            let websiteData

            // Try AI generation first
            if (params.aiProvider === "enhanced" || params.aiProvider === "ollama") {
                try {
                    websiteData = await this.generateWithAI(params, industryConfig)
                } catch (aiError) {
                    console.log("⚠️ AI generation failed, using enhanced templates")
                    websiteData = this.generateWithTemplates(params, industryConfig)
                }
            } else {
                websiteData = this.generateWithTemplates(params, industryConfig)
            }

            return {
                success: true,
                data: websiteData,
            }
        } catch (error) {
            console.error("❌ Enhanced website generation failed:", error)
            throw error
        }
    }

    private async generateWithAI(params: WebsiteGenerationParams, industryConfig: IndustryConfig) {
        // Use Ollama for content generation
        const aiContent = await enhancedOllamaService.generateWebsiteContent({
            industry: params.industry,
            style: params.style,
            description: params.description,
            websiteName: params.websiteName,
            targetAudience: params.targetAudience,
            businessGoals: params.businessGoals,
            uniqueSellingPoints: params.uniqueSellingPoints,
        })

        // Enhance with industry-specific components and real images
        const enhancedComponents = this.enhanceWithIndustryFeatures(aiContent.components, industryConfig, params)

        return {
            components: enhancedComponents,
            metadata: {
                ...aiContent.metadata,
                industry: industryConfig.displayName,
                componentsCount: enhancedComponents.length,
                hasRealImages: params.includeImages,
                colors: {
                    primary: industryConfig.primaryColor,
                    secondary: industryConfig.secondaryColor,
                    accent: industryConfig.accentColor,
                },
            },
        }
    }

    private generateWithTemplates(params: WebsiteGenerationParams, industryConfig: IndustryConfig) {
        console.log("🎨 Generating with enhanced templates...")

        const components = this.buildComprehensiveWebsite(params, industryConfig)

        return {
            components,
            metadata: {
                title: `${params.websiteName} - ${industryConfig.displayName}`,
                description: params.description,
                industry: industryConfig.displayName,
                style: params.style,
                aiUsed: "enhanced-templates",
                generatedAt: new Date().toISOString(),
                componentsCount: components.length,
                hasRealImages: params.includeImages,
                colors: {
                    primary: industryConfig.primaryColor,
                    secondary: industryConfig.secondaryColor,
                    accent: industryConfig.accentColor,
                },
            },
        }
    }

    private buildComprehensiveWebsite(params: WebsiteGenerationParams, industryConfig: IndustryConfig): ComponentData[] {
        const components: ComponentData[] = []

        // 1. Header - Always first
        components.push({
            type: "Header",
            props: {
                logo: params.websiteName,
                menu: this.generateIndustryNavigation(industryConfig),
                buttonText: this.getIndustryCTA(params.industry),
                buttonLink: "#contact",
                backgroundColor: industryConfig.primaryColor,
                textColor: "#ffffff",
            },
        })

        // 2. Hero Section - Always second
        components.push({
            type: "BusinessHero",
            props: {
                title: this.generateHeroTitle(params.websiteName, industryConfig),
                subtitle: this.getRandomFromArray(industryConfig.content.taglines),
                description: params.description || `Professional ${industryConfig.displayName.toLowerCase()} services`,
                buttonText: "Get Started",
                buttonLink: "#contact",
                secondaryButtonText: "Learn More",
                secondaryButtonLink: "#about",
                image: params.includeImages ? this.getRandomFromArray(industryConfig.images.hero) : undefined,
                backgroundColor: `linear-gradient(135deg, ${industryConfig.primaryColor}, ${industryConfig.accentColor})`,
                textColor: "#ffffff",
            },
        })

        // 3. Value Proposition - Third
        components.push({
            type: "ValueProposition",
            props: {
                title: "Why Choose Us",
                subtitle: "What sets us apart",
                description: "Discover the advantages that make us the preferred choice",
                features: industryConfig.content.features.map((feature, index) => ({
                    ...feature,
                    image: params.includeImages
                        ? industryConfig.images.services[index % industryConfig.images.services.length]
                        : undefined,
                })),
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
            },
        })

        // 4. About Section
        components.push({
            type: "AboutSection",
            props: {
                title: `About ${params.websiteName}`,
                subtitle: "Our Story",
                description: this.generateAboutContent(params.websiteName, industryConfig, params.description),
                image: params.includeImages ? industryConfig.images.gallery[0] : undefined,
                stats: this.generateIndustryStats(industryConfig),
                backgroundColor: industryConfig.secondaryColor,
                textColor: "#1f2937",
            },
        })

        // 5. Services Section
        components.push({
            type: "ServicesSection",
            props: {
                title: "Our Services",
                subtitle: "What we offer",
                description: "Comprehensive solutions tailored to your needs",
                services: industryConfig.content.services.map((service, index) => ({
                    ...service,
                    image: params.includeImages
                        ? industryConfig.images.services[index % industryConfig.images.services.length]
                        : undefined,
                })),
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
            },
        })

        // 6. Industry-Specific Components
        const industrySpecificComponents = this.generateIndustrySpecificComponents(params, industryConfig)
        components.push(...industrySpecificComponents)

        // 7. Stats Section
        components.push({
            type: "StatsSection",
            props: {
                title: "Our Impact",
                subtitle: "Numbers that matter",
                description: "See the difference we've made",
                stats: this.generateIndustryStats(industryConfig),
                backgroundColor: industryConfig.primaryColor,
                textColor: "#ffffff",
            },
        })

        // 8. Team Section (for service industries)
        if (this.shouldIncludeTeam(params.industry)) {
            components.push({
                type: "TeamSection",
                props: {
                    title: "Meet Our Team",
                    subtitle: "The people behind our success",
                    description: "Our experienced professionals are here to serve you",
                    team: this.generateTeamMembers(industryConfig, params.includeImages),
                    backgroundColor: "#ffffff",
                    textColor: "#1f2937",
                },
            })
        }

        // 9. Gallery Section (for visual industries)
        if (this.shouldIncludeGallery(params.industry)) {
            components.push({
                type: "GallerySection",
                props: {
                    title: "Gallery",
                    subtitle: "See our work",
                    description: "A visual showcase of our excellence",
                    images: params.includeImages
                        ? industryConfig.images.gallery.map((url, index) => ({
                            url,
                            alt: `Gallery image ${index + 1}`,
                            title: `Project ${index + 1}`,
                        }))
                        : [],
                    backgroundColor: industryConfig.secondaryColor,
                    textColor: "#1f2937",
                },
            })
        }

        // 10. Testimonials Section
        components.push({
            type: "TestimonialsSection",
            props: {
                title: "What Our Clients Say",
                subtitle: "Success stories",
                description: "Real feedback from satisfied customers",
                testimonials: industryConfig.content.testimonials.map((testimonial, index) => ({
                    ...testimonial,
                    image: params.includeImages
                        ? industryConfig.images.team[index % industryConfig.images.team.length]
                        : undefined,
                })),
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
            },
        })

        // 11. FAQ Section
        components.push({
            type: "FAQSection",
            props: {
                title: "Frequently Asked Questions",
                subtitle: "Common questions",
                description: "Find answers to the most common questions",
                faqs: this.generateIndustryFAQs(industryConfig),
                backgroundColor: industryConfig.secondaryColor,
                textColor: "#1f2937",
            },
        })

        // 12. Contact Section
        components.push({
            type: "ContactSection",
            props: {
                title: "Get In Touch",
                subtitle: "Contact us today",
                description: "Ready to get started? We're here to help!",
                phone: "(555) 123-4567",
                email: `info@${params.websiteName.toLowerCase().replace(/\s+/g, "")}.com`,
                address: "123 Business Street, City, State 12345",
                hours: this.getIndustryHours(params.industry),
                formFields: [
                    { label: "Name", type: "text", required: true },
                    { label: "Email", type: "email", required: true },
                    { label: "Phone", type: "tel", required: false },
                    {
                        label: "Service Interest",
                        type: "select",
                        options: industryConfig.content.services.map((s) => s.title),
                        required: false,
                    },
                    { label: "Message", type: "textarea", required: true },
                ],
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
            },
        })

        // 13. Footer - Always last
        components.push({
            type: "Footer",
            props: {
                logo: params.websiteName,
                description: params.description.substring(0, 100),
                links: this.generateFooterLinks(industryConfig),
                socialLinks: [
                    { platform: "facebook", url: "#", icon: "facebook" },
                    { platform: "twitter", url: "#", icon: "twitter" },
                    { platform: "instagram", url: "#", icon: "instagram" },
                    { platform: "linkedin", url: "#", icon: "linkedin" },
                ],
                contact: {
                    email: `info@${params.websiteName.toLowerCase().replace(/\s+/g, "")}.com`,
                    phone: "(555) 123-4567",
                    address: "123 Business Street, City, State 12345",
                },
                copyright: `© ${new Date().getFullYear()} ${params.websiteName}. All rights reserved.`,
                backgroundColor: "#1f2937",
                textColor: "#ffffff",
            },
        })

        console.log(`✅ Generated ${components.length} components for ${industryConfig.displayName}`)
        return components
    }

    private enhanceWithIndustryFeatures(
        components: ComponentData[],
        industryConfig: IndustryConfig,
        params: WebsiteGenerationParams,
    ): ComponentData[] {
        // Add real images to existing components
        return components.map((component, index) => {
            const enhancedProps = { ...component.props }

            // Add real images based on component type
            if (params.includeImages) {
                switch (component.type) {
                    case "BusinessHero":
                    case "HeroSection":
                        enhancedProps.image = this.getRandomFromArray(industryConfig.images.hero)
                        break
                    case "AboutSection":
                        enhancedProps.image = industryConfig.images.gallery[0]
                        break
                    case "ServicesSection":
                        if (enhancedProps.services) {
                            enhancedProps.services = enhancedProps.services.map((service: any, idx: number) => ({
                                ...service,
                                image: industryConfig.images.services[idx % industryConfig.images.services.length],
                            }))
                        }
                        break
                    case "GallerySection":
                        enhancedProps.images = industryConfig.images.gallery.map((url: string, idx: number) => ({
                            url,
                            alt: `Gallery image ${idx + 1}`,
                            title: `Project ${idx + 1}`,
                        }))
                        break
                }
            }

            // Add industry colors
            enhancedProps.primaryColor = industryConfig.primaryColor
            enhancedProps.secondaryColor = industryConfig.secondaryColor
            enhancedProps.accentColor = industryConfig.accentColor

            return {
                ...component,
                props: enhancedProps,
            }
        })
    }

    private generateIndustrySpecificComponents(
        params: WebsiteGenerationParams,
        industryConfig: IndustryConfig,
    ): ComponentData[] {
        const components: ComponentData[] = []

        switch (params.industry) {
            case "restaurant":
                components.push({
                    type: "MenuSection",
                    props: {
                        title: "Our Menu",
                        subtitle: "Delicious cuisine crafted with care",
                        categories: ["Appetizers", "Main Courses", "Desserts", "Beverages"],
                        items: this.generateMenuItems(params.includeImages),
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                components.push({
                    type: "EventsSection",
                    props: {
                        title: "Special Events",
                        subtitle: "Join us for memorable experiences",
                        description: "Discover our upcoming events and special occasions",
                        events: this.generateRestaurantEvents(params.includeImages),
                        backgroundColor: industryConfig.secondaryColor,
                        textColor: "#1f2937",
                    },
                })
                break

            case "ecommerce":
                components.push({
                    type: "ProductGrid",
                    props: {
                        title: "Featured Products",
                        subtitle: "Best sellers and new arrivals",
                        description: "Discover our most popular products",
                        products: this.generateProducts(params.includeImages),
                        showFilters: true,
                        showSearch: true,
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                break

            case "education":
                components.push({
                    type: "CourseGrid",
                    props: {
                        title: "Our Courses",
                        subtitle: "Learn with industry experts",
                        description: "Comprehensive courses designed for success",
                        courses: this.generateCourses(params.includeImages),
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                components.push({
                    type: "FacultyProfiles",
                    props: {
                        title: "Meet Our Faculty",
                        subtitle: "Expert instructors",
                        description: "Learn from industry professionals and academic experts",
                        faculty: this.generateFaculty(params.includeImages),
                        backgroundColor: industryConfig.secondaryColor,
                        textColor: "#1f2937",
                    },
                })
                break

            case "healthcare":
                components.push({
                    type: "BookingSystem",
                    props: {
                        title: "Schedule an Appointment",
                        subtitle: "Book your visit",
                        description: "Easy online appointment scheduling",
                        services: industryConfig.content.services.map((s) => s.title),
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                break

            case "realestate":
                components.push({
                    type: "PropertyListingSection",
                    props: {
                        title: "Featured Properties",
                        subtitle: "Find your dream home",
                        description: "Explore our latest property listings",
                        properties: this.generateProperties(params.includeImages),
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                break

            case "finance":
                components.push({
                    type: "ServicePackages",
                    props: {
                        title: "Service Packages",
                        subtitle: "Choose the right plan",
                        description: "Comprehensive financial services tailored to your needs",
                        packages: this.generateFinancePackages(),
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                components.push({
                    type: "CalculatorTools",
                    props: {
                        title: "Financial Calculators",
                        subtitle: "Plan your finances",
                        description: "Use our tools to plan your financial future",
                        calculators: ["retirement", "mortgage", "investment", "loan"],
                        backgroundColor: industryConfig.secondaryColor,
                        textColor: "#1f2937",
                    },
                })
                break

            case "technology":
                components.push({
                    type: "PortfolioSection",
                    props: {
                        title: "Our Work",
                        subtitle: "Recent projects",
                        description: "Explore our latest projects and case studies",
                        projects: this.generateTechProjects(params.includeImages),
                        categories: ["Web Development", "Mobile Apps", "Cloud Solutions", "AI/ML"],
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                components.push({
                    type: "ProcessSection",
                    props: {
                        title: "Our Process",
                        subtitle: "How we work",
                        description: "Our proven methodology for delivering exceptional results",
                        steps: this.generateTechProcess(),
                        backgroundColor: industryConfig.secondaryColor,
                        textColor: "#1f2937",
                    },
                })
                break

            case "fitness":
                components.push({
                    type: "GallerySection",
                    props: {
                        title: "Our Facilities",
                        subtitle: "State-of-the-art equipment",
                        description: "Take a tour of our modern fitness facilities",
                        images: params.includeImages
                            ? industryConfig.images.gallery.map((url, index) => ({
                                url,
                                alt: `Facility image ${index + 1}`,
                                title: `Facility ${index + 1}`,
                            }))
                            : [],
                        backgroundColor: "#ffffff",
                        textColor: "#1f2937",
                    },
                })
                break
        }

        return components
    }

    // Helper methods for generating content
    private generateHeroTitle(websiteName: string, industryConfig: IndustryConfig): string {
        const titles = industryConfig.content.heroTitles
        return titles[Math.floor(Math.random() * titles.length)].replace("{{name}}", websiteName)
    }

    private generateAboutContent(websiteName: string, industryConfig: IndustryConfig, description?: string): string {
        if (description && description.length > 100) {
            return description
        }

        const templates = {
            restaurant: `${websiteName} has been serving exceptional cuisine and creating memorable dining experiences for our community. Our commitment to quality ingredients, authentic flavors, and outstanding service has made us a beloved destination.`,
            technology: `${websiteName} is a leading technology company dedicated to delivering innovative solutions that drive business growth. Our team of experts combines cutting-edge technology with deep industry knowledge.`,
            healthcare: `${websiteName} is committed to providing compassionate, high-quality healthcare services to our community. Our experienced medical professionals use the latest technology and evidence-based practices.`,
            education: `${websiteName} has been dedicated to providing quality education that prepares students for success. Our innovative programs, experienced faculty, and supportive community create an environment where students thrive.`,
            fitness: `${websiteName} is more than just a gym - we're a community dedicated to helping you achieve your health and fitness goals. With expert trainers and cutting-edge equipment, we make fitness accessible and enjoyable.`,
            realestate: `${websiteName} has been helping clients achieve their real estate goals with decades of combined experience in the local market. Whether buying, selling, or investing, we provide expert guidance every step of the way.`,
            legal: `${websiteName} has been providing exceptional legal representation for over three decades. We combine legal expertise with personal attention to achieve the best possible outcomes for our clients.`,
            finance: `${websiteName} is dedicated to helping you achieve your financial goals through comprehensive planning and expert guidance. Our certified professionals provide personalized strategies for your unique situation.`,
            ecommerce: `${websiteName} is committed to providing quality products and exceptional customer service. We carefully curate our selection to offer the best value and shopping experience for our customers.`,
        }

        return (
            templates[industryConfig.name as keyof typeof templates] ||
            `${websiteName} is a trusted provider of professional ${industryConfig.displayName.toLowerCase()} services.`
        )
    }

    private generateIndustryNavigation(industryConfig: IndustryConfig) {
        const navigationMap = {
            restaurant: [
                { label: "Home", link: "#home" },
                { label: "Menu", link: "#menu" },
                { label: "About", link: "#about" },
                { label: "Events", link: "#events" },
                { label: "Gallery", link: "#gallery" },
                { label: "Contact", link: "#contact" },
            ],
            technology: [
                { label: "Home", link: "#home" },
                { label: "Services", link: "#services" },
                { label: "Portfolio", link: "#portfolio" },
                { label: "Process", link: "#process" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            healthcare: [
                { label: "Home", link: "#home" },
                { label: "Services", link: "#services" },
                { label: "Doctors", link: "#team" },
                { label: "Appointments", link: "#booking" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            education: [
                { label: "Home", link: "#home" },
                { label: "Courses", link: "#courses" },
                { label: "Faculty", link: "#faculty" },
                { label: "Events", link: "#events" },
                { label: "Admissions", link: "#contact" },
            ],
            fitness: [
                { label: "Home", link: "#home" },
                { label: "Services", link: "#services" },
                { label: "Trainers", link: "#team" },
                { label: "Facilities", link: "#gallery" },
                { label: "Membership", link: "#contact" },
            ],
            realestate: [
                { label: "Home", link: "#home" },
                { label: "Buy", link: "#properties" },
                { label: "Sell", link: "#services" },
                { label: "Agents", link: "#team" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            legal: [
                { label: "Home", link: "#home" },
                { label: "Practice Areas", link: "#services" },
                { label: "Attorneys", link: "#team" },
                { label: "Results", link: "#testimonials" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            finance: [
                { label: "Home", link: "#home" },
                { label: "Services", link: "#services" },
                { label: "Packages", link: "#packages" },
                { label: "Calculators", link: "#calculators" },
                { label: "About", link: "#about" },
                { label: "Contact", link: "#contact" },
            ],
            ecommerce: [
                { label: "Home", link: "#home" },
                { label: "Products", link: "#products" },
                { label: "About", link: "#about" },
                { label: "Support", link: "#faq" },
                { label: "Contact", link: "#contact" },
            ],
        }

        return (
            navigationMap[industryConfig.name as keyof typeof navigationMap] || [
                { label: "Home", link: "#home" },
                { label: "About", link: "#about" },
                { label: "Services", link: "#services" },
                { label: "Contact", link: "#contact" },
            ]
        )
    }

    private generateIndustryStats(industryConfig: IndustryConfig) {
        const statsMap = {
            restaurant: [
                { number: "15+", label: "Years Experience", icon: "🍽️" },
                { number: "10K+", label: "Happy Customers", icon: "😊" },
                { number: "50+", label: "Menu Items", icon: "📋" },
                { number: "4.9", label: "Average Rating", icon: "⭐" },
            ],
            technology: [
                { number: "500+", label: "Projects Completed", icon: "💻" },
                { number: "200+", label: "Happy Clients", icon: "🤝" },
                { number: "10+", label: "Years Experience", icon: "📅" },
                { number: "25+", label: "Team Members", icon: "👥" },
            ],
            healthcare: [
                { number: "25+", label: "Years of Service", icon: "🏥" },
                { number: "15K+", label: "Patients Served", icon: "👥" },
                { number: "50+", label: "Medical Specialists", icon: "👩‍⚕️" },
                { number: "98%", label: "Patient Satisfaction", icon: "❤️" },
            ],
            education: [
                { number: "50+", label: "Years of Excellence", icon: "🎓" },
                { number: "10K+", label: "Graduates", icon: "👨‍🎓" },
                { number: "200+", label: "Faculty Members", icon: "👨‍🏫" },
                { number: "95%", label: "Graduate Success Rate", icon: "📈" },
            ],
            fitness: [
                { number: "10+", label: "Years of Excellence", icon: "💪" },
                { number: "5K+", label: "Members Strong", icon: "👥" },
                { number: "30+", label: "Expert Trainers", icon: "🏋️" },
                { number: "100+", label: "Classes per Week", icon: "📅" },
            ],
            realestate: [
                { number: "20+", label: "Years in Business", icon: "🏠" },
                { number: "1.5K+", label: "Homes Sold", icon: "🔑" },
                { number: "25+", label: "Expert Agents", icon: "👥" },
                { number: "$500M+", label: "Sales Volume", icon: "💰" },
            ],
            legal: [
                { number: "30+", label: "Years of Experience", icon: "⚖️" },
                { number: "2K+", label: "Cases Won", icon: "🏆" },
                { number: "15+", label: "Practice Areas", icon: "📚" },
                { number: "95%", label: "Client Satisfaction", icon: "😊" },
            ],
            finance: [
                { number: "25+", label: "Years of Experience", icon: "📊" },
                { number: "1K+", label: "Clients Served", icon: "👥" },
                { number: "$100M+", label: "Assets Managed", icon: "💰" },
                { number: "98%", label: "Client Retention", icon: "🤝" },
            ],
            ecommerce: [
                { number: "5+", label: "Years Online", icon: "🛒" },
                { number: "50K+", label: "Happy Customers", icon: "😊" },
                { number: "1K+", label: "Products", icon: "📦" },
                { number: "4.8", label: "Average Rating", icon: "⭐" },
            ],
        }

        return statsMap[industryConfig.name as keyof typeof statsMap] || statsMap.technology
    }

    private generateMenuItems(includeImages: boolean) {
        const items = [
            {
                name: "Signature Pasta Carbonara",
                description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
                price: "$18.99",
                category: "Main Courses",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop"
                    : undefined,
            },
            {
                name: "Margherita Pizza",
                description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
                price: "$16.99",
                category: "Main Courses",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop"
                    : undefined,
            },
            {
                name: "Bruschetta Trio",
                description: "Three varieties of toasted bread with fresh toppings",
                price: "$12.99",
                category: "Appetizers",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=200&fit=crop"
                    : undefined,
            },
            {
                name: "Tiramisu",
                description: "Classic Italian dessert with coffee and mascarpone",
                price: "$8.99",
                category: "Desserts",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop"
                    : undefined,
            },
            {
                name: "House Wine Selection",
                description: "Curated selection of red and white wines",
                price: "$8.99/glass",
                category: "Beverages",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop"
                    : undefined,
            },
        ]

        return items
    }

    private generateRestaurantEvents(includeImages: boolean) {
        return [
            {
                title: "Wine Tasting Evening",
                description: "Explore our curated selection of fine wines with expert sommelier guidance",
                date: "Every Friday",
                time: "7:00 PM - 9:00 PM",
                price: "$45 per person",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop"
                    : undefined,
            },
            {
                title: "Cooking Classes",
                description: "Learn to cook our signature dishes with our head chef",
                date: "Saturdays",
                time: "2:00 PM - 5:00 PM",
                price: "$85 per person",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                    : undefined,
            },
        ]
    }

    private generateProducts(includeImages: boolean) {
        return [
            {
                name: "Premium Wireless Headphones",
                description: "High-quality sound with noise cancellation technology",
                price: "$299.99",
                originalPrice: "$399.99",
                rating: 4.8,
                reviews: 1250,
                image: includeImages
                    ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                    : undefined,
                category: "Electronics",
                inStock: true,
                featured: true,
            },
            {
                name: "Organic Cotton T-Shirt",
                description: "Comfortable and sustainable everyday wear",
                price: "$29.99",
                rating: 4.6,
                reviews: 890,
                image: includeImages
                    ? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
                    : undefined,
                category: "Clothing",
                inStock: true,
                featured: false,
            },
            {
                name: "Smart Fitness Watch",
                description: "Track your health and fitness goals with style",
                price: "$199.99",
                originalPrice: "$249.99",
                rating: 4.7,
                reviews: 2100,
                image: includeImages
                    ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
                    : undefined,
                category: "Electronics",
                inStock: true,
                featured: true,
            },
        ]
    }

    private generateCourses(includeImages: boolean) {
        return [
            {
                title: "Introduction to Programming",
                description: "Learn the basics of programming with hands-on projects and real-world examples",
                duration: "8 weeks",
                level: "Beginner",
                price: "$299",
                students: 1250,
                rating: 4.7,
                instructor: "Dr. Sarah Johnson",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                    : undefined,
            },
            {
                title: "Advanced Web Development",
                description: "Master modern web development technologies and frameworks",
                duration: "12 weeks",
                level: "Advanced",
                price: "$499",
                students: 890,
                rating: 4.9,
                instructor: "Prof. Michael Chen",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
                    : undefined,
            },
            {
                title: "Data Science Fundamentals",
                description: "Learn data analysis, visualization, and machine learning basics",
                duration: "10 weeks",
                level: "Intermediate",
                price: "$399",
                students: 650,
                rating: 4.8,
                instructor: "Dr. Lisa Wang",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                    : undefined,
            },
        ]
    }

    private generateFaculty(includeImages: boolean) {
        return [
            {
                name: "Dr. Sarah Johnson",
                title: "Professor of Computer Science",
                department: "Technology",
                education: "Ph.D. Computer Science, MIT",
                experience: "15+ years",
                specialties: ["Programming", "Software Engineering", "AI"],
                image: includeImages
                    ? "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=300&h=300&fit=crop"
                    : undefined,
            },
            {
                name: "Prof. Michael Chen",
                title: "Senior Lecturer",
                department: "Web Development",
                education: "M.S. Software Engineering, Stanford",
                experience: "12+ years",
                specialties: ["Web Development", "JavaScript", "React"],
                image: includeImages
                    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                    : undefined,
            },
        ]
    }

    private generateProperties(includeImages: boolean) {
        return [
            {
                title: "Modern Downtown Condo",
                description: "Luxury 2-bedroom condo in the heart of downtown",
                price: "$450,000",
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1200,
                type: "Condo",
                status: "For Sale",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"
                    : undefined,
                features: ["Balcony", "Parking", "Gym", "Pool"],
            },
            {
                title: "Suburban Family Home",
                description: "Spacious 4-bedroom home perfect for families",
                price: "$650,000",
                bedrooms: 4,
                bathrooms: 3,
                sqft: 2500,
                type: "House",
                status: "For Sale",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
                    : undefined,
                features: ["Garden", "Garage", "Fireplace", "Deck"],
            },
        ]
    }

    private generateFinancePackages() {
        return [
            {
                name: "Basic Planning",
                description: "Essential financial planning for individuals",
                price: "$99/month",
                features: ["Financial Assessment", "Basic Investment Advice", "Monthly Check-ins", "Email Support"],
                popular: false,
            },
            {
                name: "Comprehensive Wealth",
                description: "Complete wealth management solution",
                price: "$299/month",
                features: [
                    "Full Financial Planning",
                    "Investment Management",
                    "Tax Planning",
                    "Estate Planning",
                    "24/7 Support",
                ],
                popular: true,
            },
            {
                name: "Business Solutions",
                description: "Financial services for business owners",
                price: "$499/month",
                features: [
                    "Business Financial Planning",
                    "Retirement Plans",
                    "Tax Strategies",
                    "Succession Planning",
                    "Dedicated Advisor",
                ],
                popular: false,
            },
        ]
    }

    private generateTechProjects(includeImages: boolean) {
        return [
            {
                title: "E-commerce Platform",
                description: "Modern online shopping platform with advanced features",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
                    : undefined,
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                category: "Web Development",
                link: "#",
                client: "RetailCorp",
                duration: "6 months",
            },
            {
                title: "Mobile Banking App",
                description: "Secure mobile banking application for iOS and Android",
                image: includeImages
                    ? "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
                    : undefined,
                technologies: ["React Native", "Firebase", "Biometric Auth"],
                category: "Mobile Development",
                link: "#",
                client: "FinanceBank",
                duration: "8 months",
            },
        ]
    }

    private generateTechProcess() {
        return [
            {
                step: 1,
                title: "Discovery & Planning",
                description: "Understanding your requirements and planning the solution",
                duration: "1-2 weeks",
                deliverables: ["Requirements Document", "Technical Specification", "Project Timeline"],
            },
            {
                step: 2,
                title: "Design & Architecture",
                description: "Creating wireframes, mockups, and system architecture",
                duration: "2-3 weeks",
                deliverables: ["UI/UX Design", "System Architecture", "Database Design"],
            },
            {
                step: 3,
                title: "Development",
                description: "Building your solution using agile methodology",
                duration: "6-12 weeks",
                deliverables: ["Working Software", "Code Documentation", "Testing Reports"],
            },
            {
                step: 4,
                title: "Launch & Support",
                description: "Deploying your solution and providing ongoing support",
                duration: "Ongoing",
                deliverables: ["Live Deployment", "User Training", "Maintenance Plan"],
            },
        ]
    }

    private generateTeamMembers(industryConfig: IndustryConfig, includeImages?: boolean) {
        const teamTemplates = {
            restaurant: [
                {
                    name: "Chef Alessandro Romano",
                    role: "Executive Chef",
                    bio: "With over 20 years of culinary experience, Chef Alessandro brings authentic Italian techniques and innovative flair to every dish.",
                    image: includeImages ? industryConfig.images.team[0] : undefined,
                    specialties: ["Italian Cuisine", "Pasta Making", "Wine Pairing"],
                },
                {
                    name: "Maria Gonzalez",
                    role: "Restaurant Manager",
                    bio: "Maria ensures every guest has an exceptional dining experience with her attention to detail and warm hospitality.",
                    image: includeImages ? industryConfig.images.team[1] : undefined,
                    specialties: ["Customer Service", "Operations", "Staff Training"],
                },
            ],
            technology: [
                {
                    name: "Alex Chen",
                    role: "Lead Developer",
                    bio: "Full-stack developer with 12+ years of experience in enterprise software development and cloud architecture.",
                    image: includeImages ? industryConfig.images.team[0] : undefined,
                    specialties: ["React", "Node.js", "AWS", "DevOps"],
                },
                {
                    name: "Sarah Williams",
                    role: "UX/UI Designer",
                    bio: "Creative designer focused on creating intuitive and beautiful user experiences that drive engagement.",
                    image: includeImages ? industryConfig.images.team[1] : undefined,
                    specialties: ["User Experience", "Interface Design", "Prototyping"],
                },
            ],
            healthcare: [
                {
                    name: "Dr. Sarah Williams",
                    role: "Chief of Medicine",
                    bio: "Board-certified physician with 15+ years of experience in internal medicine and patient care excellence.",
                    image: includeImages ? industryConfig.images.team[0] : undefined,
                    specialties: ["Internal Medicine", "Preventive Care", "Patient Education"],
                },
                {
                    name: "Dr. Michael Rodriguez",
                    role: "Cardiologist",
                    bio: "Specialized in cardiovascular medicine with expertise in both preventive and interventional cardiology.",
                    image: includeImages ? industryConfig.images.team[1] : undefined,
                    specialties: ["Cardiology", "Heart Surgery", "Preventive Medicine"],
                },
            ],
        }

        return teamTemplates[industryConfig.name as keyof typeof teamTemplates] || teamTemplates.technology
    }

    private generateIndustryFAQs(industryConfig: IndustryConfig) {
        const faqTemplates = {
            restaurant: [
                {
                    question: "Do you take reservations?",
                    answer:
                        "Yes, we accept reservations for parties of all sizes. You can book online through our website or call us directly. We recommend booking in advance, especially for weekend dining.",
                },
                {
                    question: "Do you accommodate dietary restrictions?",
                    answer:
                        "We offer vegetarian, vegan, gluten-free, and other dietary options. Please inform us of any allergies or restrictions when making your reservation so we can prepare accordingly.",
                },
                {
                    question: "What are your hours of operation?",
                    answer:
                        "We're open Tuesday through Sunday from 5:00 PM to 10:00 PM. We're closed on Mondays for staff training and preparation.",
                },
                {
                    question: "Do you offer catering services?",
                    answer:
                        "Yes, we provide full catering services for events, parties, and corporate functions. Contact us to discuss your catering needs and custom menu options.",
                },
            ],
            technology: [
                {
                    question: "What technologies do you work with?",
                    answer:
                        "We work with modern technologies including React, Node.js, Python, AWS, Azure, and many others. We choose the best technology stack for each project based on your specific requirements.",
                },
                {
                    question: "How long does a typical project take?",
                    answer:
                        "Project timelines vary based on complexity and scope. Simple websites may take 4-6 weeks, while complex applications can take 3-6 months. We provide detailed timelines during the planning phase.",
                },
                {
                    question: "Do you provide ongoing support and maintenance?",
                    answer:
                        "Yes, we offer comprehensive support and maintenance packages to ensure your applications continue to perform optimally. This includes updates, security patches, and technical support.",
                },
                {
                    question: "Can you work with our existing team?",
                    answer:
                        "We can augment your existing development team or work collaboratively on projects. We're flexible in our engagement models to meet your needs.",
                },
            ],
            healthcare: [
                {
                    question: "How do I schedule an appointment?",
                    answer:
                        "You can schedule appointments online through our patient portal, call our office directly, or visit us in person. We offer same-day appointments for urgent medical needs.",
                },
                {
                    question: "What insurance plans do you accept?",
                    answer:
                        "We accept most major insurance plans including Medicare and Medicaid. Please contact our billing department to verify your specific coverage and benefits.",
                },
                {
                    question: "Do you offer telemedicine services?",
                    answer:
                        "Yes, we provide virtual consultations for appropriate medical conditions. This allows you to receive quality care from the comfort of your home.",
                },
                {
                    question: "What should I bring to my appointment?",
                    answer:
                        "Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or test results from other providers.",
                },
            ],
        }

        return faqTemplates[industryConfig.name as keyof typeof faqTemplates] || faqTemplates.technology
    }

    private generateFooterLinks(industryConfig: IndustryConfig) {
        return [
            {
                title: "Services",
                items: industryConfig.content.services.slice(0, 4).map((service) => ({
                    text: service.title,
                    url: "#services",
                })),
            },
            {
                title: "Company",
                items: [
                    { text: "About Us", url: "#about" },
                    { text: "Our Team", url: "#team" },
                    { text: "Careers", url: "#careers" },
                    { text: "Contact", url: "#contact" },
                ],
            },
            {
                title: "Resources",
                items: [
                    { text: "Blog", url: "#blog" },
                    { text: "FAQ", url: "#faq" },
                    { text: "Support", url: "#support" },
                    { text: "Privacy Policy", url: "#privacy" },
                ],
            },
        ]
    }

    private getIndustryCTA(industry: string): string {
        const ctaMap = {
            restaurant: "Make Reservation",
            technology: "Get Quote",
            healthcare: "Book Appointment",
            education: "Apply Now",
            fitness: "Join Now",
            realestate: "Find Properties",
            legal: "Free Consultation",
            finance: "Get Started",
            ecommerce: "Shop Now",
        }

        return ctaMap[industry as keyof typeof ctaMap] || "Contact Us"
    }

    private getIndustryHours(industry: string): string {
        const hoursMap = {
            restaurant: "Tue-Sun: 5:00 PM - 10:00 PM, Closed Mondays",
            technology: "Mon-Fri: 9:00 AM - 6:00 PM",
            healthcare: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
            education: "Mon-Fri: 8:00 AM - 5:00 PM",
            fitness: "Mon-Fri: 5:00 AM - 11:00 PM, Weekends: 6:00 AM - 10:00 PM",
            realestate: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
            legal: "Mon-Fri: 8:00 AM - 6:00 PM, Emergency consultations available",
            finance: "Mon-Fri: 9:00 AM - 5:00 PM",
            ecommerce: "24/7 Online Support",
        }

        return hoursMap[industry as keyof typeof hoursMap] || "Mon-Fri: 9:00 AM - 5:00 PM"
    }

    private shouldIncludeTeam(industry: string): boolean {
        return ["healthcare", "legal", "finance", "education", "technology", "realestate"].includes(industry)
    }

    private shouldIncludeGallery(industry: string): boolean {
        return ["restaurant", "fitness", "realestate", "education", "healthcare"].includes(industry)
    }

    private getRandomFromArray<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)]
    }
}

export const enhancedWebsiteGenerator = new EnhancedWebsiteGenerator()
