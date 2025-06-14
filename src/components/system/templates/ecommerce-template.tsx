import type { Website } from "@/types"

export const ecommerceTemplate: Website = {
    metadata: {
        title: "StyleShop - Premium Fashion & Accessories",
        description: "Shop the latest trends in fashion and accessories",
        businessName: "StyleShop",
        industry: "E-commerce",
        style: "Modern",
        primaryColor: "#F59E0B",
        secondaryColor: "#3B82F6",
        fontPrimary: "Poppins",
        fontSecondary: "Roboto",
    },
    header: {
        type: "header",
        variant: "ecommerce",
        props: {
            logo: "StyleShop",
            logoType: "text",
            menu: [
                { label: "Home", link: "#" },
                { label: "Shop", link: "#shop" },
                { label: "Collections", link: "#collections" },
                { label: "Sale", link: "#sale" },
                { label: "About", link: "#about" },
            ],
            cta: { label: "My Account", link: "#account" },
            sticky: true,
            transparent: false,
            searchEnabled: true,
            cartCount: 0,
            categories: [
                { label: "Women", link: "#women" },
                { label: "Men", link: "#men" },
                { label: "Accessories", link: "#accessories" },
                { label: "Footwear", link: "#footwear" },
            ],
        },
    },
    hero: {
        type: "hero",
        variant: "split",
        props: {
            title: "Summer Collection 2023",
            subtitle: "New Arrivals",
            description: "Discover our latest collection of stylish summer essentials. Free shipping on all orders over $50.",
            image: "/placeholder.svg?height=800&width=600&text=Fashion+Model",
            imageAlt: "Model wearing summer collection",
            primaryButton: { label: "Shop Now", link: "#shop" },
            secondaryButton: { label: "View Lookbook", link: "#lookbook" },
            backgroundType: "color",
            backgroundColor: "#FEF3C7",
            alignment: "left",
        },
    },
    sections: [
        {
            type: "features",
            variant: "grid",
            props: {
                title: "Why Shop With Us",
                subtitle: "The StyleShop difference",
                features: [
                    {
                        title: "Free Shipping",
                        description: "Free shipping on all orders over $50",
                        icon: "truck",
                    },
                    {
                        title: "Easy Returns",
                        description: "30-day hassle-free returns",
                        icon: "refresh-ccw",
                    },
                    {
                        title: "Secure Checkout",
                        description: "Your data is always protected",
                        icon: "shield",
                    },
                    {
                        title: "24/7 Support",
                        description: "Our customer service team is always here to help",
                        icon: "headphones",
                    },
                ],
                backgroundColor: "#FFFFFF",
                textColor: "#333333",
            },
        },
        {
            type: "gallery",
            variant: "grid",
            props: {
                title: "Featured Products",
                subtitle: "Shop our most popular items",
                items: [
                    {
                        image: "/placeholder.svg?height=600&width=500&text=Product+1",
                        alt: "Product 1",
                        title: "Summer Dress",
                        description: "$59.99",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=500&text=Product+2",
                        alt: "Product 2",
                        title: "Casual Shirt",
                        description: "$39.99",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=500&text=Product+3",
                        alt: "Product 3",
                        title: "Designer Sunglasses",
                        description: "$89.99",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=500&text=Product+4",
                        alt: "Product 4",
                        title: "Leather Handbag",
                        description: "$129.99",
                    },
                ],
                columns: 4,
                gap: "medium",
            },
        },
        {
            type: "testimonials",
            variant: "cards",
            props: {
                title: "Customer Reviews",
                subtitle: "What our customers are saying",
                testimonials: [
                    {
                        quote:
                            "The quality of the clothes is amazing, and they arrived even faster than expected. Will definitely be shopping here again!",
                        author: "Emma S.",
                        avatar: "/placeholder.svg?height=100&width=100&text=ES",
                        rating: 5,
                    },
                    {
                        quote:
                            "StyleShop has become my go-to for fashion. Great selection, reasonable prices, and excellent customer service.",
                        author: "James T.",
                        avatar: "/placeholder.svg?height=100&width=100&text=JT",
                        rating: 5,
                    },
                    {
                        quote: "I love how easy it is to find exactly what I'm looking for. The website is so user-friendly!",
                        author: "Sophia L.",
                        avatar: "/placeholder.svg?height=100&width=100&text=SL",
                        rating: 4,
                    },
                ],
                backgroundColor: "#F9FAFB",
                textColor: "#333333",
            },
        },
        {
            type: "cta",
            variant: "banner",
            props: {
                title: "Get 15% Off Your First Order",
                description: "Sign up for our newsletter and receive a welcome discount",
                primaryButton: { label: "Subscribe", link: "#subscribe" },
                backgroundColor: "#F59E0B",
                textColor: "#FFFFFF",
            },
        },
    ],
    footer: {
        type: "footer",
        variant: "multicolumn",
        props: {
            logo: "StyleShop",
            tagline: "Premium fashion & accessories",
            copyright: "© 2023 StyleShop. All rights reserved.",
            columns: [
                {
                    title: "Shop",
                    links: [
                        { label: "Women", link: "#" },
                        { label: "Men", link: "#" },
                        { label: "Accessories", link: "#" },
                        { label: "Sale", link: "#" },
                    ],
                },
                {
                    title: "Customer Service",
                    links: [
                        { label: "Contact Us", link: "#" },
                        { label: "Shipping & Returns", link: "#" },
                        { label: "FAQ", link: "#" },
                        { label: "Size Guide", link: "#" },
                    ],
                },
                {
                    title: "Company",
                    links: [
                        { label: "About Us", link: "#" },
                        { label: "Careers", link: "#" },
                        { label: "Terms & Conditions", link: "#" },
                        { label: "Privacy Policy", link: "#" },
                    ],
                },
            ],
            socialLinks: [
                { platform: "Instagram", link: "#", icon: "instagram" },
                { platform: "Facebook", link: "#", icon: "facebook" },
                { platform: "Pinterest", link: "#", icon: "pinterest" },
                { platform: "Twitter", link: "#", icon: "twitter" },
            ],
            backgroundColor: "#1F2937",
            textColor: "#FFFFFF",
        },
    },
}
