import EcommerceHeader from "@/components/headers/ecommerce-header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { ShoppingBag, Truck, CreditCard, RefreshCw, HeadphonesIcon, ShieldCheck } from "lucide-react"

export default function EcommercePage() {
    // Header props
    const headerProps = {
        logo: "ShopEase",
        backgroundColor: "#ffcc00",
        textColor: "#000000",
        menu: [
            { label: "Home", link: "#home" },
            { label: "Shop", link: "#shop" },
            { label: "Categories", link: "#categories" },
            { label: "Deals", link: "#deals" },
            { label: "Cart", link: "#cart" },
        ],
        animation: "slide-down" as const,
        height: "90px",
        fontSize: "18px",
        sticky: true,
        keywords: ["shopping", "deals", "products", "online", "ecommerce"],
    }

    // Hero props
    const heroProps = {
        title: "Shop the Latest Trends",
        subtitle: "Discover Amazing Deals on Top Products",
        description:
            "Browse our extensive catalog of products with exclusive discounts and free shipping on orders over $50.",
        backgroundImage: "/placeholder.svg?height=1080&width=1920&text=Ecommerce+Background",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        textColor: "#ffffff",
        fontFamily: "Poppins, sans-serif",
        buttons: [
            { label: "Shop Now", link: "#shop", type: "primary" as const },
            { label: "View Deals", link: "#deals", type: "secondary" as const },
        ],
        imageUrl: "/placeholder.svg?height=600&width=600&text=Shopping+Bags",
        imageAlt: "Shopping Bags",
        buttonStyle: "rounded" as const,
        textAlignment: "left" as const,
        keywords: ["shopping", "deals", "products", "online", "ecommerce", "trends"],
    }

    // Features props
    const featuresProps = {
        title: "Why Shop With Us",
        subtitle: "Benefits that make your shopping experience better",
        features: [
            {
                title: "Wide Selection",
                description: "Thousands of products across multiple categories.",
                icon: ShoppingBag,
                iconColor: "#ffcc00",
            },
            {
                title: "Fast Delivery",
                description: "Get your orders delivered within 2-3 business days.",
                icon: Truck,
                iconColor: "#ffcc00",
            },
            {
                title: "Secure Payments",
                description: "Multiple secure payment options for your convenience.",
                icon: CreditCard,
                iconColor: "#ffcc00",
            },
            {
                title: "Easy Returns",
                description: "Hassle-free 30-day return policy on all purchases.",
                icon: RefreshCw,
                iconColor: "#ffcc00",
            },
            {
                title: "24/7 Support",
                description: "Our customer service team is always ready to help.",
                icon: HeadphonesIcon,
                iconColor: "#ffcc00",
            },
            {
                title: "Buyer Protection",
                description: "Shop with confidence with our buyer protection program.",
                icon: ShieldCheck,
                iconColor: "#ffcc00",
            },
        ],
        backgroundColor: "#ffffff",
        textColor: "#333333",
        accentColor: "#ffcc00",
        columns: 3,
        keywords: ["shopping", "deals", "products", "online", "ecommerce", "delivery"],
    }

    // Testimonials props
    const testimonialsProps = {
        title: "Happy Customers",
        subtitle: "What our shoppers say about their experience",
        testimonials: [
            {
                quote:
                    "ShopEase has become my go-to online store. The prices are competitive and the delivery is always on time.",
                author: "Jennifer Lopez",
                role: "Regular Shopper",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=JL",
            },
            {
                quote: "I love the variety of products available. The website is easy to navigate and checkout is a breeze.",
                author: "Robert Chen",
                role: "Verified Buyer",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=RC",
            },
            {
                quote:
                    "Their customer service is exceptional. When I had an issue with my order, they resolved it immediately.",
                author: "Sophia Williams",
                role: "Loyal Customer",
                avatarUrl: "/placeholder.svg?height=100&width=100&text=SW",
            },
        ],
        backgroundColor: "#f9f9f9",
        textColor: "#333333",
        accentColor: "#ffcc00",
        style: "cards",
        keywords: ["shopping", "customers", "testimonials", "online", "ecommerce"],
    }

    // CTA props
    const ctaProps = {
        title: "Special Offer: 20% Off Your First Order",
        subtitle: "Limited time offer for new customers",
        description: "Use code WELCOME20 at checkout to receive 20% off your first purchase. Minimum order value $30.",
        buttons: [
            { label: "Shop Now", link: "#shop", type: "primary" as const },
            { label: "Learn More", link: "#offers", type: "secondary" as const },
        ],
        backgroundColor: "#ffcc00",
        textColor: "#000000",
        buttonStyle: "rounded" as const,
        keywords: ["shopping", "deals", "discount", "offer", "ecommerce"],
    }

    // Footer props
    const footerProps = {
        logo: "ShopEase",
        columns: [
            {
                title: "Shop",
                links: [
                    { label: "New Arrivals", link: "#new" },
                    { label: "Best Sellers", link: "#best-sellers" },
                    { label: "Deals & Offers", link: "#deals" },
                    { label: "Gift Cards", link: "#gift-cards" },
                ],
            },
            {
                title: "Customer Service",
                links: [
                    { label: "Contact Us", link: "#contact" },
                    { label: "Shipping Policy", link: "#shipping" },
                    { label: "Returns & Exchanges", link: "#returns" },
                    { label: "FAQs", link: "#faqs" },
                ],
            },
            {
                title: "About",
                links: [
                    { label: "Our Story", link: "#about" },
                    { label: "Blog", link: "#blog" },
                    { label: "Careers", link: "#careers" },
                    { label: "Press", link: "#press" },
                ],
            },
        ],
        backgroundColor: "#333333",
        textColor: "#ffffff",
        accentColor: "#ffcc00",
        keywords: ["shopping", "deals", "products", "online", "ecommerce"],
    }

    return (
        <div className="flex flex-col min-h-screen">
            <EcommerceHeader {...headerProps} />
            <main className="flex-grow">
                <HeroSection {...heroProps} />
                <FeaturesSection {...featuresProps} />
                <TestimonialsSection {...testimonialsProps} />
                <CTASection {...ctaProps} />
            </main>
            <Footer {...footerProps} />
        </div>
    )
}
