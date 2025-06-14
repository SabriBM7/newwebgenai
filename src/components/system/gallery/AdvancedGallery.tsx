"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryItem {
    image: string
    alt?: string
    title?: string
    description?: string
}

interface AdvancedGalleryProps {
    title?: string
    subtitle?: string
    items: GalleryItem[]
    variant?: "grid" | "masonry" | "carousel" | "lightbox"
    columns?: 2 | 3 | 4
    gap?: "small" | "medium" | "large"
    backgroundColor?: string
    textColor?: string
}

export default function AdvancedGallery({
                                            title = "Our Gallery",
                                            subtitle = "Explore our work",
                                            items = [],
                                            variant = "grid",
                                            columns = 3,
                                            gap = "medium",
                                            backgroundColor = "white",
                                            textColor = "black",
                                        }: AdvancedGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselIndex, setCarouselIndex] = useState(0)

    // Default gallery items if none provided
    const defaultItems: GalleryItem[] = [
        {
            image: "/placeholder.svg?height=600&width=800&text=Image+1",
            alt: "Gallery image 1",
            title: "Project One",
            description: "Description of project one",
        },
        {
            image: "/placeholder.svg?height=800&width=600&text=Image+2",
            alt: "Gallery image 2",
            title: "Project Two",
            description: "Description of project two",
        },
        {
            image: "/placeholder.svg?height=600&width=800&text=Image+3",
            alt: "Gallery image 3",
            title: "Project Three",
            description: "Description of project three",
        },
        {
            image: "/placeholder.svg?height=800&width=600&text=Image+4",
            alt: "Gallery image 4",
            title: "Project Four",
            description: "Description of project four",
        },
        {
            image: "/placeholder.svg?height=600&width=800&text=Image+5",
            alt: "Gallery image 5",
            title: "Project Five",
            description: "Description of project five",
        },
        {
            image: "/placeholder.svg?height=800&width=600&text=Image+6",
            alt: "Gallery image 6",
            title: "Project Six",
            description: "Description of project six",
        },
    ]

    const displayItems = items.length > 0 ? items : defaultItems

    const gapClass = {
        small: "gap-2",
        medium: "gap-4",
        large: "gap-8",
    }[gap]

    const columnsClass = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns]

    const openLightbox = (index: number) => {
        setActiveIndex(index)
        setLightboxOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        document.body.style.overflow = "auto"
    }

    const navigateLightbox = (direction: "next" | "prev") => {
        if (direction === "next") {
            setActiveIndex((current) => (current + 1) % displayItems.length)
        } else {
            setActiveIndex((current) => (current - 1 + displayItems.length) % displayItems.length)
        }
    }

    const renderGrid = () => {
        return (
            <div className={cn("grid", columnsClass, gapClass)}>
                {displayItems.map((item, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="relative">
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.alt || `Gallery image ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {(item.title || item.description) && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                    {item.title && <h3 className="text-lg font-bold">{item.title}</h3>}
                                    {item.description && <p className="text-sm">{item.description}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderMasonry = () => {
        // Divide items into columns
        const columnItems: GalleryItem[][] = Array.from({ length: columns }, () => [])
        displayItems.forEach((item, index) => {
            columnItems[index % columns].push(item)
        })

        return (
            <div className={cn("grid", columnsClass, gapClass)}>
                {columnItems.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-4">
                        {column.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                                onClick={() => openLightbox(colIndex + itemIndex * columns)}
                            >
                                <div className="relative">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.alt || `Gallery image ${colIndex + itemIndex * columns + 1}`}
                                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        style={{ height: `${Math.floor(Math.random() * 200) + 200}px` }}
                                    />
                                    {(item.title || item.description) && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                            {item.title && <h3 className="text-lg font-bold">{item.title}</h3>}
                                            {item.description && <p className="text-sm">{item.description}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    const renderCarousel = () => {
        const navigateCarousel = (direction: "next" | "prev") => {
            if (direction === "next") {
                setCarouselIndex((current) => (current + 1) % displayItems.length)
            } else {
                setCarouselIndex((current) => (current - 1 + displayItems.length) % displayItems.length)
            }
        }

        return (
            <div className="relative">
                <div className="overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                    >
                        {displayItems.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.alt || `Gallery image ${index + 1}`}
                                        className="w-full h-96 object-cover"
                                    />
                                    {(item.title || item.description) && (
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6 text-white">
                                            {item.title && <h3 className="text-xl font-bold">{item.title}</h3>}
                                            {item.description && <p className="text-base mt-2">{item.description}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => navigateCarousel("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => navigateCarousel("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>
                <div className="flex justify-center mt-4 space-x-2">
                    {displayItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCarouselIndex(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-colors",
                                index === carouselIndex ? "bg-blue-600" : "bg-gray-300",
                            )}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section
            className="py-16 px-4"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-xl">{subtitle}</p>
                </div>

                {variant === "grid" && renderGrid()}
                {variant === "masonry" && renderMasonry()}
                {variant === "carousel" && renderCarousel()}
                {variant === "lightbox" && renderGrid()}

                {/* Lightbox */}
                {lightboxOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white p-2"
                            aria-label="Close lightbox"
                        >
                            <X size={24} />
                        </button>
                        <button
                            onClick={() => navigateLightbox("prev")}
                            className="absolute left-4 text-white p-2"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={36} />
                        </button>
                        <div className="max-w-4xl max-h-[80vh] relative">
                            <img
                                src={displayItems[activeIndex].image || "/placeholder.svg"}
                                alt={displayItems[activeIndex].alt || `Gallery image ${activeIndex + 1}`}
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                            {(displayItems[activeIndex].title || displayItems[activeIndex].description) && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
                                    {displayItems[activeIndex].title && (
                                        <h3 className="text-xl font-bold">{displayItems[activeIndex].title}</h3>
                                    )}
                                    {displayItems[activeIndex].description && (
                                        <p className="text-base mt-2">{displayItems[activeIndex].description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => navigateLightbox("next")}
                            className="absolute right-4 text-white p-2"
                            aria-label="Next image"
                        >
                            <ChevronRight size={36} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
