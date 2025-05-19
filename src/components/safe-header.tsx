interface SafeHeaderProps {
    title?: string
    logo?: string
    menu?: Array<{ label: string; href: string }>
}

export default function SafeHeader({ title = "Default Title", logo = "", menu = [] }: SafeHeaderProps) {
    return (
        <div className="safe-header bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    {logo && <div className="mr-2 font-bold">{logo}</div>}
                    <div className="text-xl font-bold">{title}</div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        {menu &&
                            Array.isArray(menu) &&
                            menu.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href || "#"} className="text-blue-600 hover:text-blue-800">
                                        {item.label || "Link"}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
