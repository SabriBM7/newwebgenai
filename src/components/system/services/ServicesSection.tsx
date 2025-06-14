"use client"

interface Service {
    title: string
    description: string
    features: string[]
    price?: string
    image?: string
    icon?: string
}

interface ServicesSectionProps {
    title: string
    subtitle?: string
    services: Service[]
    layout?: "cards" | "list" | "grid"
    backgroundColor?: string
    textColor?: string
}

export default function ServicesSection({
                                            title,
                                            subtitle,
                                            services = [],
                                            layout = "cards",
                                            backgroundColor = "bg-gray-50",
                                            textColor = "text-gray-900",
                                        }: ServicesSectionProps) {
    return (
        <section className={`py-16 ${backgroundColor}`} id="services">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    {subtitle && <p className={`text-xl max-w-3xl mx-auto ${textColor} opacity-80`}>{subtitle}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            {service.image && (
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}

                            <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>{service.title}</h3>
                            <p className={`${textColor} opacity-80 mb-4`}>{service.description}</p>

                            {service.features && service.features.length > 0 && (
                                <ul className="space-y-2 mb-4">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className={`flex items-center ${textColor} opacity-80`}>
                                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {service.price && <div className="text-2xl font-bold text-blue-600 mb-4">{service.price}</div>}

                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
