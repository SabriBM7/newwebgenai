import type { Website } from "@/types"

export const restaurantTemplate: Website = {
    metadata: {
        title: "Fine Dining Restaurant",
        description: "Experience exceptional cuisine in an elegant atmosphere",
        businessName: "Gourmet Haven",
        industry: "Restaurant",
        style: "Elegant",
        primaryColor: "#8B4513",
        secondaryColor: "#F5F5DC",
        fontPrimary: "Playfair Display",
        fontSecondary: "Montserrat",
    },
    header: {
        type: "header",
        variant: "minimal",
        props: {
            logo: "Gourmet Haven",
            logoType: "text",
            menu: [
                { label: "Home", link: "#" },
                { label: "Menu", link: "#menu" },
                { label: "About", link: "#about" },
                { label: "Reservations", link: "#reservations" },
                { label: "Contact", link: "#contact" },
            ],
            cta: { label: "Book a Table", link: "#reservations" },
            sticky: true,
            transparent: true,
        },
    },
    hero: {
        type: "hero",
        variant: "split",
        props: {
            title: "Fine Dining Experience",
            subtitle: "Culinary Excellence Since 1995",
            description:
                "Indulge in a symphony of flavors crafted by our award-winning chefs. Using only the freshest ingredients, we create memorable dining experiences in an elegant atmosphere.",
            image: "/placeholder.svg?height=600&width=800&text=Restaurant+Interior",
            imageAlt: "Elegant restaurant interior with ambient lighting",
            primaryButton: { label: "View Menu", link: "#menu" },
            secondaryButton: { label: "Make Reservation", link: "#reservations" },
            backgroundType: "image",
            backgroundImage: "/placeholder.svg?height=1080&width=1920&text=Restaurant+Ambiance",
            alignment: "left",
        },
    },
    sections: [
        {
            type: "features",
            variant: "grid",
            props: {
                title: "Our Specialties",
                subtitle: "Signature Dishes",
                features: [
                    {
                        title: "Seasonal Menu",
                        description: "Our menu changes with the seasons to bring you the freshest ingredients at their peak.",
                        icon: "utensils",
                    },
                    {
                        title: "Award-Winning Wine Selection",
                        description: "Complement your meal with a selection from our extensive wine cellar.",
                        icon: "wine-glass",
                    },
                    {
                        title: "Private Dining",
                        description: "Elegant private rooms available for special occasions and events.",
                        icon: "users",
                    },
                ],
                backgroundColor: "#F5F5DC",
                textColor: "#333333",
            },
        },
        {
            type: "gallery",
            variant: "grid",
            props: {
                title: "Our Dishes",
                subtitle: "A visual taste of our menu",
                items: [
                    {
                        image: "/placeholder.svg?height=600&width=800&text=Signature+Dish+1",
                        alt: "Signature dish 1",
                        title: "Herb-Crusted Salmon",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=800&text=Signature+Dish+2",
                        alt: "Signature dish 2",
                        title: "Truffle Risotto",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=800&text=Signature+Dish+3",
                        alt: "Signature dish 3",
                        title: "Chocolate Soufflé",
                    },
                    {
                        image: "/placeholder.svg?height=600&width=800&text=Restaurant+Interior",
                        alt: "Restaurant interior",
                        title: "Elegant Dining Room",
                    },
                ],
            },
        },
        {
            type: "testimonials",
            variant: "quotes",
            props: {
                title: "What Our Guests Say",
                subtitle: "Memorable dining experiences",
                testimonials: [
                    {
                        quote:
                            "An unforgettable dining experience. The attention to detail in every dish and the impeccable service made our anniversary dinner truly special.",
                        author: "Emily & James",
                        rating: 5,
                    },
                    {
                        quote:
                            "The tasting menu was a culinary journey that surprised and delighted with every course. Easily the best restaurant in the city.",
                        author: "Michael T.",
                        rating: 5,
                    },
                ],
                backgroundColor: "#8B4513",
                textColor: "#FFFFFF",
            },
        },
        {
            type: "cta",
            variant: "centered",
            props: {
                title: "Reserve Your Table",
                description: "Experience our culinary creations for yourself. Reservations recommended.",
                primaryButton: { label: "Book Now", link: "#reservations" },
                secondaryButton: { label: "View Menu", link: "#menu" },
                backgroundColor: "#F5F5DC",
                textColor: "#8B4513",
            },
        },
    ],
    footer: {
        type: "footer",
        variant: "simple",
        props: {
            logo: "Gourmet Haven",
            tagline: "Fine dining at its best",
            copyright: "© 2023 Gourmet Haven. All rights reserved.",
            columns: [
                {
                    title: "Hours",
                    links: [
                        { label: "Monday-Thursday: 5pm-10pm", link: "#" },
                        { label: "Friday-Saturday: 5pm-11pm", link: "#" },
                        { label: "Sunday: 4pm-9pm", link: "#" },
                    ],
                },
                {
                    title: "Contact",
                    links: [
                        { label: "123 Gourmet Street", link: "#" },
                        { label: "City, State 12345", link: "#" },
                        { label: "(555) 123-4567", link: "tel:5551234567" },
                    ],
                },
            ],
            socialLinks: [
                { platform: "Instagram", link: "#", icon: "instagram" },
                { platform: "Facebook", link: "#", icon: "facebook" },
                { platform: "Twitter", link: "#", icon: "twitter" },
            ],
            backgroundColor: "#2D2D2D",
            textColor: "#FFFFFF",
        },
    },
}
