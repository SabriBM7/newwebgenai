"use client"

import SimpleWebsiteRenderer from "@/components/simple-website-renderer"

const safeComponents = [
    {
        component: "header",
        variant: "safe",
        props: {
            className: "mb-4",
            title: "Safe Website",
            logo: "LOGO",
            menu: [
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
            ],
        },
    },
]

export default function SafeTestPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Safe Component Test</h1>
            <SimpleWebsiteRenderer components={safeComponents} />
        </div>
    )
}
