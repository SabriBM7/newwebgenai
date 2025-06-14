"use client"

interface TechStatsProps {
    title?: string
    subtitle?: string
    stats?: Array<{
        number: string
        label: string
        icon: string
        description?: string
    }>
}

export default function TechStats({ title, subtitle, stats }: TechStatsProps) {
    const defaultStats = [
        {
            number: "500+",
            label: "Projects Delivered",
            icon: "🚀",
            description: "Successfully completed projects across various industries",
        },
        {
            number: "99.9%",
            label: "Uptime Guarantee",
            icon: "⚡",
            description: "Reliable infrastructure with minimal downtime",
        },
        {
            number: "50+",
            label: "Expert Developers",
            icon: "👥",
            description: "Skilled professionals with diverse technical expertise",
        },
        {
            number: "24/7",
            label: "Support Available",
            icon: "🛠️",
            description: "Round-the-clock monitoring and technical support",
        },
        {
            number: "15+",
            label: "Years Experience",
            icon: "📅",
            description: "Proven track record in software development",
        },
        {
            number: "95%",
            label: "Client Satisfaction",
            icon: "⭐",
            description: "High client satisfaction and retention rate",
        },
    ]

    const techStats = stats || defaultStats

    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || "Our Track Record"}</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        {subtitle || "Numbers that demonstrate our commitment to excellence"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techStats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl mb-4">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                            <div className="text-xl font-semibold mb-2 opacity-90">{stat.label}</div>
                            {stat.description && <div className="text-sm opacity-75 max-w-xs mx-auto">{stat.description}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
