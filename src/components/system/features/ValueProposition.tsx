"use client"

interface ValueCard {
    icon?: string
    title: string
    description: string
}

interface ValuePropositionProps {
    title: string
    subtitle: string
    cards: ValueCard[]
    columns?: 3 | 4
    backgroundColor?: string
    textColor?: string
}

export default function ValueProposition({
                                             title,
                                             subtitle,
                                             cards,
                                             columns = 3,
                                             backgroundColor = "bg-white",
                                             textColor = "text-gray-900"
                                         }: ValuePropositionProps) {
    const gridClass = columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-4"

    return (
        <section className={`${backgroundColor} ${textColor} py-20`}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-xl text-gray-600">{subtitle}</p>
                </div>

                <div className={`grid grid-cols-1 gap-8 ${gridClass}`}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            {card.icon && (
                                <div className="text-4xl mb-4">{card.icon}</div>
                            )}
                            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}