"use client"

import type React from "react"
import { Suspense } from "react"
import { Loader2, AlertCircle, Star, Clock, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Add these imports at the top
import { AboutSection } from "@/components/system/about"
import { BlogSection } from "@/components/system/blog"
import { ContactSection } from "@/components/system/contact"
import { CTASection } from "@/components/system/cta"
import { EventsSection } from "@/components/system/events"
import { FAQSection } from "@/components/system/faq"
import {
    MinimalistFeatures,
    IconFeatures,
    ComparisonFeatures,
    AnimatedFeatures,
    InteractiveFeatures,
} from "@/components/system/features"
import { ModernFooter, CreativeFooter, CorporateFooter } from "@/components/system/footers"
import { AdvancedGallery, MasonryGallery, FilterableGallery } from "@/components/system/gallery"
import {
    MinimalistHeader,
    CorporateHeader,
    CreativeHeader,
    AnimatedHeader,
    GlassmorphismHeader,
    MegaMenuHeader,
} from "@/components/system/headers"
import {
    MinimalistHero,
    CreativeHero,
    GradientHero,
    ParallaxHero,
    InteractiveHero,
    VideoBackgroundHero,
    SplitScreenHero,
} from "@/components/system/heroes"
import { NewsletterSection } from "@/components/system/newsletter"
import { PortfolioSection, InteractivePortfolio, FilterablePortfolio } from "@/components/system/portfolio"
import { AdvancedPricing, TieredPricing, DynamicPricing, ComparisonPricing } from "@/components/system/pricing"
import { ProcessSection } from "@/components/system/process"
import { ServicesSection } from "@/components/system/services"
import { StatsSection, AnimatedCounters, RealTimeStats } from "@/components/system/stats"
import { AdvancedTeam, InteractiveTeam, OrganizationalChart } from "@/components/system/team"
import { AdvancedTestimonials, VideoTestimonials, SocialProofTestimonials } from "@/components/system/testimonials"

// Industry-specific imports
import { VehicleInventory, ServiceScheduler, FinancingCalculator } from "@/components/system/industry/automotive"
import { TravelPackages, DestinationGallery, TravelItinerary } from "@/components/system/industry/travel"
import { DonationForm, VolunteerSection, ImpactStats } from "@/components/system/industry/nonprofit"
import { ShowcaseGallery, ArtistProfiles, TicketingSystem } from "@/components/system/industry/entertainement"
import { ProductCatalog, ManufacturingProcess, QualityAssurance } from "@/components/system/industry/manufacturing"
import { ProductShowcase, SustainabilitySection, FarmingProcess } from "@/components/system/industry/agriculture"

// Enhanced Healthcare
import { AppointmentScheduler, SymptomChecker, TelehealthPortal } from "@/components/system/industry/healthcare"

// Enhanced E-commerce
import { AdvancedProductFilter, WishlistManager, ProductComparison } from "@/components/system/industry/ecommerce"

// Enhanced Real Estate
import { VirtualTourViewer, MortgageCalculator, MarketAnalytics } from "@/components/system/industry/realestate"

// Enhanced Education
import {
    LearningPathVisualizer,
    InteractiveQuizBuilder,
    VirtualClassroom,
} from "@/components/system/industry/education"

// Enhanced Finance
import { ServicePackages, CalculatorTools } from "@/components/system/industry/finance"

// Enhanced Interactive
import { SearchableSection, BookingSystem } from "@/components/system/interactive"

// Import Technology & Software components
import {
    TechPortfolio,
    TechProcess,
    TechServices,
    TechTeam,
    TechFeatures,
    TechTestimonials,
    TechStats,
    TechPricing,
} from "@/components/system/industry/technology"

// Enhanced Restaurant Gallery Component
function RestaurantGallery(props: any) {
    const images = props.images || [
        {
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            alt: "Restaurant Interior",
            title: "Elegant Dining Room",
        },
        {
            url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
            alt: "Signature Pasta",
            title: "Handmade Pasta",
        },
        {
            url: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
            alt: "Wood Fired Pizza",
            title: "Authentic Wood-Fired Pizza",
        },
        {
            url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
            alt: "Wine Selection",
            title: "Curated Wine Collection",
        },
        {
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
            alt: "Chef at Work",
            title: "Our Master Chef",
        },
        {
            url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
            alt: "Fresh Ingredients",
            title: "Farm-Fresh Ingredients",
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Gallery"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "A visual journey through our culinary world"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image: any, index: number) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={image.url || image}
                                alt={image.alt || `Gallery image ${index + 1}`}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-semibold text-lg">{image.title || `Image ${index + 1}`}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Enhanced Restaurant Events Component
function RestaurantEvents(props: any) {
    const events = props.events || [
        {
            title: "Wine Tasting Evening",
            description:
                "Join our sommelier for an exclusive wine tasting featuring Italian wines paired with artisanal cheeses",
            date: "Every Friday",
            time: "7:00 PM - 9:00 PM",
            price: "$45 per person",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
            category: "Wine Event",
        },
        {
            title: "Pasta Making Workshop",
            description: "Learn the art of traditional Italian pasta making with our head chef",
            date: "Saturdays",
            time: "2:00 PM - 5:00 PM",
            price: "$85 per person",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
            category: "Cooking Class",
        },
        {
            title: "Live Jazz Nights",
            description: "Enjoy dinner with live jazz performances in our intimate dining room",
            date: "Every Thursday",
            time: "8:00 PM - 11:00 PM",
            price: "No cover charge",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
            category: "Entertainment",
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Special Events"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Join us for memorable experiences"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event: any, index: number) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                                <Badge className="absolute top-4 left-4 bg-red-600 text-white">{event.category || "Event"}</Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{event.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {event.time}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-red-600">{event.price}</span>
                                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                        Reserve Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Enhanced Restaurant Stats Component
function RestaurantStats(props: any) {
    const stats = props.stats || [
        { number: "15+", label: "Years Experience", icon: "🍽️" },
        { number: "10K+", label: "Happy Customers", icon: "😊" },
        { number: "50+", label: "Menu Items", icon: "📋" },
        { number: "4.9", label: "Average Rating", icon: "⭐" },
    ]

    return (
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{props.title || "Our Impact"}</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">{props.subtitle || "Numbers that tell our story"}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat: any, index: number) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl mb-4">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number || stat.value}</div>
                            <div className="text-lg opacity-90">{stat.label || stat.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Enhanced Restaurant Testimonials Component
function RestaurantTestimonials(props: any) {
    const testimonials = props.testimonials || [
        {
            name: "Maria Rodriguez",
            role: "Food Blogger",
            content:
                "The best Italian food outside of Italy! The pasta is perfectly al dente and the pizza crust is incredible. Chef Alessandro's attention to detail is remarkable.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=100&h=100&fit=crop",
        },
        {
            name: "James Wilson",
            role: "Local Resident",
            content:
                "Bella Vista has become our family's favorite restaurant. The atmosphere is warm, the service is exceptional, and every dish is a masterpiece.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            name: "Sofia Chen",
            role: "Travel Writer",
            content:
                "As someone who lived in Italy, I can say this is authentic Italian cuisine. The wine selection is outstanding and the tiramisu is to die for!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "What Our Guests Say"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Real reviews from our valued customers"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial: any, index: number) => (
                        <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic leading-relaxed">
                                    "{testimonial.content || testimonial.quote}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name || testimonial.author}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name || testimonial.author}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role || testimonial.company}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Enhanced Restaurant FAQ Component
function RestaurantFAQ(props: any) {
    const faqs = props.faqs || [
        {
            question: "Do you take reservations?",
            answer:
                "Yes, we accept reservations for parties of all sizes. You can book online through our website or call us directly at (555) 123-4567. We recommend booking in advance, especially for weekend dining.",
        },
        {
            question: "Do you accommodate dietary restrictions?",
            answer:
                "We offer vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary restrictions when making your reservation so our chef can prepare accordingly.",
        },
        {
            question: "What are your hours of operation?",
            answer:
                "We're open Tuesday through Sunday from 5:00 PM to 10:00 PM. We're closed on Mondays for staff training and preparation. Kitchen closes at 9:30 PM.",
        },
        {
            question: "Do you offer catering services?",
            answer:
                "Yes, we provide full catering services for events, parties, and corporate functions. We can customize menus to fit your needs and budget. Contact us for a personalized quote.",
        },
        {
            question: "Is there parking available?",
            answer:
                "We offer complimentary valet parking for all our guests. There's also street parking available, and a public parking garage is located just two blocks away.",
        },
        {
            question: "Do you have a dress code?",
            answer:
                "We maintain a smart casual dress code. While we don't require formal attire, we ask that guests avoid beachwear, athletic wear, or overly casual clothing to maintain our elegant atmosphere.",
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Frequently Asked Questions"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{props.subtitle || "Everything you need to know"}</p>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq: any, index: number) => (
                        <Card key={index} className="border border-gray-200">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Enhanced Restaurant Team Component (Chef Profiles)
function RestaurantTeam(props: any) {
    const team = props.team ||
        props.members || [
            {
                name: "Chef Alessandro Romano",
                role: "Executive Chef & Owner",
                bio: "With over 20 years of culinary experience in Italy and New York, Chef Alessandro brings authentic Italian techniques and innovative flair to every dish.",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop",
                specialties: ["Handmade Pasta", "Wood-Fired Pizza", "Wine Pairing"],
            },
            {
                name: "Maria Gonzalez",
                role: "Restaurant Manager",
                bio: "Maria ensures every guest has an exceptional dining experience with her attention to detail and warm hospitality. She's been with us for 8 years.",
                image: "https://images.unsplash.com/photo-1583394293214-28a4b3a4c3e4?w=300&h=300&fit=crop",
                specialties: ["Guest Relations", "Event Planning", "Staff Training"],
            },
            {
                name: "Giuseppe Bianchi",
                role: "Sous Chef",
                bio: "Giuseppe trained in Rome and brings traditional Italian cooking methods to our kitchen. He specializes in our signature sauces and fresh pasta.",
                image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=300&h=300&fit=crop",
                specialties: ["Traditional Sauces", "Fresh Pasta", "Desserts"],
            },
        ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Meet Our Team"}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "The passionate people behind your dining experience"}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member: any, index: number) => (
                        <Card key={index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                    <p className="text-red-200">{member.role}</p>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                                {member.specialties && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {member.specialties.map((specialty: string, idx: number) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {specialty}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Universal Fallback Components
function FallbackHeader(props: any) {
    const menu = props.menu || []
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{props.logo || "Your Business"}</div>
                    <nav className="hidden md:flex space-x-8">
                        {menu.map((item: any, index: number) => (
                            <a key={index} href={item.link || "#"} className="text-gray-600 hover:text-gray-900 font-medium">
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    {props.buttonText && <Button className="bg-blue-600 hover:bg-blue-700 text-white">{props.buttonText}</Button>}
                </div>
            </div>
        </header>
    )
}

function FallbackHero(props: any) {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {props.title || "Welcome to Our Business"}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                    {props.subtitle || props.description || "Discover amazing solutions for your business needs"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {props.buttonText && (
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                            {props.buttonText}
                        </Button>
                    )}
                    {props.secondaryButtonText && (
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                            {props.secondaryButtonText}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}

function FallbackAbout(props: any) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{props.title || "About Our Business"}</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {props.description || "We are dedicated to providing exceptional service and quality to our customers."}
                        </p>
                        {props.stats && props.stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {props.stats.slice(0, 4).map((stat: any, index: number) => (
                                    <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-blue-600">{stat.number || stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label || stat.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        {props.image ? (
                            <img
                                src={props.image || "/placeholder.svg"}
                                alt="About us"
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <div className="text-6xl mb-4">🏢</div>
                                    <p>About Us Image</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FallbackServices(props: any) {
    const services = props.services || []
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Our Services"}</h2>
                    {props.subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{props.subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                {service.image && (
                                    <img
                                        src={service.image || "/placeholder.svg"}
                                        alt={service.title || `Service ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                )}
                                <div className="text-center mb-4">
                                    <div className="text-4xl mb-2">{service.icon || "🔧"}</div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-center">{service.title || `Service ${index + 1}`}</h3>
                                <p className="text-gray-600 mb-4 text-center">
                                    {service.description || "Professional service description"}
                                </p>
                                {service.price && (
                                    <div className="text-center mb-4">
                                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                                    </div>
                                )}
                                {service.features && service.features.length > 0 && (
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {service.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FallbackMenu(props: any) {
    const categories = props.categories || ["Main Dishes"]
    const items = props.items || []

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Our Menu"}</h2>
                    {props.subtitle && <p className="text-xl text-gray-600">{props.subtitle}</p>}
                </div>

                {categories.map((category: string, categoryIndex: number) => {
                    const categoryItems = items.filter((item: any) => item.category === category || categoryIndex === 0)

                    return (
                        <div key={categoryIndex} className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categoryItems.map((item: any, index: number) => (
                                    <Card key={index} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {item.name || `Dish ${index + 1}`}
                                                    </h4>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        {item.description || "Delicious dish prepared with fresh ingredients"}
                                                    </p>
                                                </div>
                                                <div className="ml-4">
                                                    {item.image && (
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-xl font-bold text-blue-600">{item.price || "$12.99"}</span>
                                                <Badge variant="outline">{category}</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

function FallbackFeatures(props: any) {
    const features = props.features || []
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Why Choose Us"}</h2>
                    {props.subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{props.subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature: any, index: number) => (
                        <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="text-5xl mb-4">{feature.icon || "⭐"}</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title || `Feature ${index + 1}`}</h3>
                            <p className="text-gray-600">
                                {feature.description || "Amazing feature that will benefit your experience"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FallbackContact(props: any) {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{props.title || "Contact Us"}</h2>
                    {props.subtitle && <p className="text-xl text-gray-600">{props.subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                        <div className="space-y-4">
                            {props.phone && (
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                                    <span className="text-lg">{props.phone}</span>
                                </div>
                            )}
                            {props.email && (
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                                    <span className="text-lg">{props.email}</span>
                                </div>
                            )}
                            {props.address && (
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                                    <span className="text-lg">{props.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                    {props.submitButtonText || "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

function FallbackFooter(props: any) {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">{props.logo || "Your Business"}</h3>
                        <p className="text-gray-300">
                            {props.description || "Thank you for choosing our services. We look forward to serving you."}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#home" className="hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2 text-gray-300">
                            <p className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" /> (555) 123-4567
                            </p>
                            <p className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" /> info@business.com
                            </p>
                            <p className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" /> 123 Business St, City, State
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>{props.copyrightText || "© 2024 Your Business. All rights reserved."}</p>
                </div>
            </div>
        </footer>
    )
}

const componentMap: Record<string, React.ComponentType<any>> = {
    // ===== HEADERS - Advanced & Basic =====
    Header: MinimalistHeader,
    MinimalistHeader: MinimalistHeader,
    CorporateHeader: CorporateHeader,
    CreativeHeader: CreativeHeader,
    AnimatedHeader: AnimatedHeader || FallbackHeader,
    GlassmorphismHeader: GlassmorphismHeader || FallbackHeader,
    MegaMenuHeader: MegaMenuHeader || FallbackHeader,
    ModernHeader: CorporateHeader,
    ProfessionalHeader: CorporateHeader,
    BusinessHeader: CorporateHeader,

    // ===== HEROES - Advanced & Basic =====
    Hero: MinimalistHero,
    HeroSection: MinimalistHero,
    BusinessHero: MinimalistHero,
    CorporateHero: MinimalistHero,
    MinimalistHero: MinimalistHero,
    CreativeHero: CreativeHero,
    GradientHero: GradientHero,
    ParallaxHero: ParallaxHero,
    InteractiveHero: InteractiveHero || FallbackHero,
    VideoBackgroundHero: VideoBackgroundHero || FallbackHero,
    SplitScreenHero: SplitScreenHero || FallbackHero,
    ModernHero: GradientHero,
    ProfessionalHero: MinimalistHero,
    LandingHero: GradientHero,

    // ===== CONTENT SECTIONS =====
    About: AboutSection,
    AboutSection: AboutSection,
    AboutUs: AboutSection,
    Company: AboutSection,
    CompanyInfo: AboutSection,

    Services: ServicesSection,
    ServicesSection: ServicesSection,
    ServiceOfferings: ServicesSection,
    Solutions: ServicesSection,
    Products: ServicesSection,
    ProductSection: ServicesSection,

    // ===== FEATURES - Advanced & Basic =====
    Features: MinimalistFeatures,
    FeaturesSection: MinimalistFeatures,
    ValueProposition: MinimalistFeatures,
    MinimalistFeatures: MinimalistFeatures,
    IconFeatures: IconFeatures,
    ComparisonFeatures: ComparisonFeatures,
    AnimatedFeatures: AnimatedFeatures || MinimalistFeatures,
    InteractiveFeatures: InteractiveFeatures || MinimalistFeatures,
    Benefits: MinimalistFeatures,
    Advantages: MinimalistFeatures,
    WhyChooseUs: MinimalistFeatures,

    Contact: ContactSection,
    ContactSection: ContactSection,
    ContactUs: ContactSection,
    GetInTouch: ContactSection,
    ContactForm: ContactSection,
    SmartContactForm: ContactSection,
    MapIntegratedContact: ContactSection,

    // ===== GALLERIES & PORTFOLIOS - Advanced =====
    Gallery: AdvancedGallery,
    GallerySection: AdvancedGallery,
    AdvancedGallery: AdvancedGallery,
    MasonryGallery: MasonryGallery || RestaurantGallery,
    FilterableGallery: FilterableGallery || RestaurantGallery,
    PhotoGallery: AdvancedGallery,
    ImageGallery: AdvancedGallery,
    Portfolio: PortfolioSection,
    PortfolioSection: PortfolioSection,
    InteractivePortfolio: InteractivePortfolio || PortfolioSection,
    FilterablePortfolio: FilterablePortfolio || PortfolioSection,
    Showcase: AdvancedGallery,

    // ===== EVENTS =====
    Events: EventsSection,
    EventsSection: EventsSection,
    UpcomingEvents: EventsSection,
    EventCalendar: EventsSection,
    SpecialEvents: RestaurantEvents,

    // ===== STATS - Advanced =====
    Stats: StatsSection,
    StatsSection: StatsSection,
    AnimatedCounters: AnimatedCounters || RestaurantStats,
    RealTimeStats: RealTimeStats || RestaurantStats,
    Statistics: StatsSection,
    Numbers: StatsSection,
    Metrics: StatsSection,
    Achievements: StatsSection,

    // ===== TESTIMONIALS - Advanced =====
    Testimonials: AdvancedTestimonials,
    TestimonialsSection: AdvancedTestimonials,
    AdvancedTestimonials: AdvancedTestimonials,
    VideoTestimonials: VideoTestimonials,
    SocialProofTestimonials: SocialProofTestimonials || AdvancedTestimonials,
    Reviews: AdvancedTestimonials,
    ClientReviews: AdvancedTestimonials,
    CustomerReviews: RestaurantTestimonials,
    Feedback: AdvancedTestimonials,

    // ===== FAQ =====
    FAQ: FAQSection,
    FAQSection: FAQSection,
    FrequentlyAskedQuestions: FAQSection,
    Questions: FAQSection,
    QuestionsAndAnswers: RestaurantFAQ,

    // ===== TEAM - Advanced =====
    Team: AdvancedTeam,
    TeamSection: AdvancedTeam,
    AdvancedTeam: AdvancedTeam,
    InteractiveTeam: InteractiveTeam || AdvancedTeam,
    OrganizationalChart: OrganizationalChart || AdvancedTeam,
    OurTeam: AdvancedTeam,
    Staff: RestaurantTeam,
    TeamMembers: AdvancedTeam,
    Leadership: AdvancedTeam,

    // ===== PRICING - Advanced =====
    Pricing: AdvancedPricing,
    PricingSection: AdvancedPricing,
    AdvancedPricing: AdvancedPricing,
    TieredPricing: TieredPricing,
    DynamicPricing: DynamicPricing || AdvancedPricing,
    ComparisonPricing: ComparisonPricing || AdvancedPricing,
    PricingPlans: AdvancedPricing,
    Plans: AdvancedPricing,
    Packages: AdvancedPricing,

    // ===== FOOTERS =====
    Footer: ModernFooter,
    ModernFooter: ModernFooter,
    CorporateFooter: CorporateFooter,
    CreativeFooter: CreativeFooter,
    ProfessionalFooter: CorporateFooter,
    BusinessFooter: ModernFooter,

    // ===== TECHNOLOGY & SOFTWARE =====
    TechPortfolio: TechPortfolio,
    ProjectShowcase: TechPortfolio,
    WorkPortfolio: TechPortfolio,
    CaseStudies: TechPortfolio,
    Projects: TechPortfolio,

    TechProcess: TechProcess,
    Process: ProcessSection,
    ProcessSection: ProcessSection,
    DevelopmentProcess: TechProcess,
    Methodology: TechProcess,
    WorkFlow: ProcessSection,
    HowItWorks: ProcessSection,

    TechServices: TechServices,
    SoftwareServices: TechServices,
    DevelopmentServices: TechServices,
    TechnologyServices: TechServices,
    ITServices: TechServices,
    DigitalServices: TechServices,

    TechTeam: TechTeam,
    DevelopmentTeam: TechTeam,
    EngineeringTeam: TechTeam,
    TechExperts: TechTeam,
    Developers: TechTeam,
    TechnicalTeam: TechTeam,

    TechFeatures: TechFeatures,
    SoftwareFeatures: TechFeatures,
    TechnologyFeatures: TechFeatures,
    ProductFeatures: TechFeatures,
    TechnicalFeatures: TechFeatures,
    Capabilities: TechFeatures,

    TechTestimonials: TechTestimonials,
    ClientStories: TechTestimonials,
    SuccessStories: TechTestimonials,
    TechnologyTestimonials: TechTestimonials,
    ClientSuccess: TechTestimonials,

    TechStats: TechStats,
    TechnologyStats: TechStats,
    DevelopmentStats: TechStats,
    TechnicalMetrics: TechStats,
    PerformanceStats: TechStats,

    TechPricing: TechPricing,
    SoftwarePricing: TechPricing,
    DevelopmentPricing: TechPricing,
    TechnologyPricing: TechPricing,
    ServicePricing: TechPricing,

    // ===== AUTOMOTIVE INDUSTRY =====
    VehicleInventory: VehicleInventory || FallbackServices,
    ServiceScheduler: ServiceScheduler || FallbackContact,
    FinancingCalculator: FinancingCalculator || FallbackFeatures,
    AutoServices: FallbackServices,
    CarDealership: VehicleInventory || FallbackServices,

    // ===== TRAVEL INDUSTRY =====
    TravelPackages: TravelPackages || FallbackServices,
    DestinationGallery: DestinationGallery || RestaurantGallery,
    TravelItinerary: TravelItinerary || FallbackServices,
    TourPackages: TravelPackages || FallbackServices,
    Destinations: DestinationGallery || RestaurantGallery,

    // ===== NONPROFIT INDUSTRY =====
    DonationForm: DonationForm || FallbackContact,
    VolunteerSection: VolunteerSection || FallbackServices,
    ImpactStats: ImpactStats || RestaurantStats,
    CharityServices: VolunteerSection || FallbackServices,
    NonprofitImpact: ImpactStats || RestaurantStats,

    // ===== ENTERTAINMENT INDUSTRY =====
    ShowcaseGallery: ShowcaseGallery || RestaurantGallery,
    ArtistProfiles: ArtistProfiles || RestaurantTeam,
    TicketingSystem: TicketingSystem || FallbackContact,
    EventTicketing: TicketingSystem || FallbackContact,
    ArtistShowcase: ArtistProfiles || RestaurantTeam,

    // ===== MANUFACTURING INDUSTRY =====
    ProductCatalog: ProductCatalog || FallbackServices,
    ManufacturingProcess: ManufacturingProcess || ProcessSection,
    QualityAssurance: QualityAssurance || FallbackFeatures,
    IndustrialServices: ProductCatalog || FallbackServices,
    ManufacturingCapabilities: QualityAssurance || FallbackFeatures,

    // ===== AGRICULTURE INDUSTRY =====
    ProductShowcase: ProductShowcase || FallbackServices,
    SustainabilitySection: SustainabilitySection || FallbackFeatures,
    FarmingProcess: FarmingProcess || ProcessSection,
    AgriculturalProducts: ProductShowcase || FallbackServices,
    SustainableFarming: SustainabilitySection || FallbackFeatures,

    // ===== ENHANCED HEALTHCARE =====
    AppointmentScheduler: AppointmentScheduler || FallbackContact,
    SymptomChecker: SymptomChecker || FallbackFeatures,
    TelehealthPortal: TelehealthPortal || FallbackServices,
    MedicalServices: FallbackServices,
    HealthcareServices: FallbackServices,
    DoctorServices: FallbackServices,
    HealthServices: FallbackServices,
    DoctorProfiles: RestaurantTeam,
    MedicalSpecialties: FallbackServices,
    HealthcareTeam: RestaurantTeam,

    // ===== ENHANCED E-COMMERCE =====
    AdvancedProductFilter: AdvancedProductFilter || FallbackFeatures,
    WishlistManager: WishlistManager || FallbackFeatures,
    ProductComparison: ProductComparison || FallbackFeatures,
    ProductGrid: FallbackServices,
    ShoppingCart: FallbackFeatures,
    ProductShowcase: FallbackServices,
    ShopSection: FallbackServices,

    // ===== ENHANCED REAL ESTATE =====
    VirtualTourViewer: VirtualTourViewer || RestaurantGallery,
    MortgageCalculator: MortgageCalculator || FallbackFeatures,
    MarketAnalytics: MarketAnalytics || RestaurantStats,
    RealEstateListings: FallbackServices,
    Properties: FallbackServices,
    PropertyListings: FallbackServices,
    HomesForSale: FallbackServices,
    Listings: FallbackServices,

    // ===== ENHANCED EDUCATION =====
    LearningPathVisualizer: LearningPathVisualizer || ProcessSection,
    InteractiveQuizBuilder: InteractiveQuizBuilder || FallbackFeatures,
    VirtualClassroom: VirtualClassroom || FallbackServices,
    CourseGrid: FallbackServices,
    FacultyProfiles: RestaurantTeam,
    AcademicPrograms: FallbackServices,
    CourseCatalog: FallbackMenu,
    Courses: FallbackMenu,
    ClassCatalog: FallbackMenu,
    EducationCatalog: FallbackMenu,
    Programs: FallbackMenu,

    // ===== ENHANCED FINANCE =====
    ServicePackages: ServicePackages || FallbackServices,
    CalculatorTools: CalculatorTools || FallbackFeatures,
    FinancialServices: FallbackServices,

    // ===== ENHANCED INTERACTIVE =====
    SearchableSection: SearchableSection || FallbackFeatures,
    BookingSystem: BookingSystem || FallbackContact,
    ReservationSystem: FallbackContact,

    // ===== FITNESS & SPA =====
    ClassSchedule: FallbackMenu,
    TrainerProfiles: RestaurantTeam,
    FitnessPrograms: FallbackServices,
    SpaServiceMenu: FallbackServices,
    SpaServices: FallbackServices,
    WellnessServices: FallbackServices,
    BeautyServices: FallbackServices,
    ServicesMenu: FallbackServices,
    TreatmentMenu: FallbackMenu,
    SpaPackages: FallbackServices,

    // ===== LEGAL =====
    LawFirmPracticeAreas: FallbackServices,
    LegalPracticeAreas: FallbackServices,
    PracticeAreas: FallbackServices,
    LegalServices: FallbackServices,
    AttorneyProfiles: RestaurantTeam,
    LegalTeam: RestaurantTeam,
    LawFirmServices: FallbackServices,

    // ===== RESTAURANT (Enhanced existing) =====
    Menu: FallbackMenu,
    MenuSection: FallbackMenu,
    FoodMenu: FallbackMenu,
    RestaurantGallery: RestaurantGallery,
    RestaurantEvents: RestaurantEvents,
    RestaurantStats: RestaurantStats,
    RestaurantTestimonials: RestaurantTestimonials,
    RestaurantFAQ: RestaurantFAQ,
    RestaurantTeam: RestaurantTeam,

    // ===== OTHER SECTIONS =====
    CTA: CTASection,
    CTASection: CTASection,
    CallToAction: CTASection,

    Blog: BlogSection,
    BlogSection: BlogSection,
    FeaturedBlogSection: BlogSection,
    InteractiveBlogGrid: BlogSection,
    News: BlogSection,
    NewsSection: BlogSection,
    Articles: BlogSection,

    Newsletter: NewsletterSection,
    NewsletterSection: NewsletterSection,
    Subscribe: NewsletterSection,
    Subscription: NewsletterSection,
}

interface ComponentFactoryProps {
    component?: {
        type: string
        props: Record<string, any>
    }
    type?: string
    props?: Record<string, any>
    index?: number
    components?: any[]
}

function ComponentFactory({ component, type, props, index = 0, components }: ComponentFactoryProps) {
    // Handle array of components
    if (components && Array.isArray(components)) {
        if (components.length === 0) {
            return (
                <div className="p-8 text-center text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Components Available</h3>
                    <p>No components were generated for this website.</p>
                </div>
            )
        }

        return (
            <div className="w-full">
                {components.map((comp, idx) => {
                    if (!comp || typeof comp !== "object") {
                        console.warn(`⚠️ Invalid component at index ${idx}:`, comp)
                        return null
                    }
                    return <ComponentFactory key={`component-${idx}`} component={comp} index={idx} />
                })}
            </div>
        )
    }

    // Handle both interfaces
    const componentType = type || component?.type
    const componentProps = props || component?.props || {}

    if (!componentType) {
        console.error("ComponentFactory: No component type provided")
        return (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                <AlertCircle className="h-5 w-5 inline mr-2" />
                Error: No component type provided
            </div>
        )
    }

    console.log(`🔧 ComponentFactory rendering: ${componentType}`)

    const Component = componentMap[componentType]

    if (!Component) {
        console.warn(`⚠️ Component type "${componentType}" not found, using fallback`)
        return (
            <div className="p-8 bg-yellow-50 border border-yellow-200 text-yellow-800 text-center rounded-lg">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-yellow-600" />
                <h3 className="font-bold mb-2">Component Not Found: {componentType}</h3>
                <p className="mb-4">Using fallback component</p>
                <FallbackFeatures {...componentProps} />
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading {componentType}...</span>
                </div>
            }
        >
            <Component key={`${componentType}-${index}`} {...componentProps} />
        </Suspense>
    )
}

// At the end of the file, make sure we have both exports:
export { ComponentFactory }
export default ComponentFactory

// Also add this if it's missing:
export type { ComponentFactoryProps }
