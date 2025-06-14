"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Globe, Star } from "lucide-react"

interface SocialLink {
    platform: string
    url: string
}

interface ArtistWork {
    id: string
    title: string
    type: string
    year: string
    image?: string
    description?: string
}

interface Artist {
    id: string
    name: string
    role: string
    category: string
    bio: string
    image: string
    featured?: boolean
    socialLinks?: SocialLink[]
    works?: ArtistWork[]
    rating?: number
}

interface ArtistProfilesProps {
    title?: string
    description?: string
    artists?: Artist[]
    categories?: string[]
    onArtistClick?: (artist: Artist) => void
}

export function ArtistProfiles({
                                   title = "Featured Artists",
                                   description = "Discover talented artists and performers",
                                   artists = defaultArtists,
                                   categories = ["All", "Music", "Visual Arts", "Theater", "Dance"],
                                   onArtistClick,
                               }: ArtistProfilesProps) {
    const [activeCategory, setActiveCategory] = useState("All")
    const [expandedArtist, setExpandedArtist] = useState<string | null>(null)

    const filteredArtists =
        activeCategory === "All" ? artists : artists.filter((artist) => artist.category === activeCategory)

    const toggleExpand = (artistId: string) => {
        setExpandedArtist(expandedArtist === artistId ? null : artistId)
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <Tabs defaultValue="All" className="mb-8">
                    <TabsList className="flex justify-center mb-8 flex-wrap">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                onClick={() => setActiveCategory(category)}
                                className="px-4 py-2"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArtists.map((artist) => (
                        <Card
                            key={artist.id}
                            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                                artist.featured ? "border-2 border-purple-500" : ""
                            }`}
                        >
                            <div className="relative h-64">
                                <img
                                    src={artist.image || "/placeholder.svg?height=400&width=400&query=artist+portrait"}
                                    alt={artist.name}
                                    className="w-full h-full object-cover"
                                />
                                {artist.featured && <Badge className="absolute top-2 right-2 bg-purple-500">Featured</Badge>}
                                <Badge className="absolute top-2 left-2">{artist.category}</Badge>
                            </div>
                            <CardContent className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                                    {artist.rating && (
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                            <span className="text-sm font-medium">{artist.rating}</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm mb-3">{artist.role}</p>

                                <p className={`text-gray-600 text-sm mb-4 ${expandedArtist === artist.id ? "" : "line-clamp-3"}`}>
                                    {artist.bio}
                                </p>

                                {artist.bio.length > 150 && (
                                    <Button variant="link" className="p-0 h-auto text-sm mb-4" onClick={() => toggleExpand(artist.id)}>
                                        {expandedArtist === artist.id ? "Show less" : "Read more"}
                                    </Button>
                                )}

                                {artist.socialLinks && artist.socialLinks.length > 0 && (
                                    <div className="flex space-x-2 mb-4">
                                        {artist.socialLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                {link.platform === "instagram" ? (
                                                    <Instagram className="h-5 w-5" />
                                                ) : (
                                                    <Globe className="h-5 w-5" />
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                <Button className="w-full" onClick={() => onArtistClick && onArtistClick(artist)}>
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

const defaultArtists: Artist[] = [
    {
        id: "1",
        name: "Elena Rodriguez",
        role: "Classical Pianist",
        category: "Music",
        bio: "Elena Rodriguez is an award-winning classical pianist known for her emotive interpretations of Chopin and Liszt. With over 15 years of performance experience, she has played at major concert halls worldwide and released three critically acclaimed albums.",
        image: "/placeholder.svg?height=400&width=400",
        featured: true,
        socialLinks: [
            { platform: "instagram", url: "https://instagram.com" },
            { platform: "website", url: "https://example.com" },
        ],
        works: [
            {
                id: "work1",
                title: "Nocturnes & Preludes",
                type: "album",
                year: "2021",
                image: "/placeholder.svg?height=300&width=300",
                description: "A collection of Chopin's most beautiful nocturnes and preludes.",
            },
        ],
        rating: 4.9,
    },
    {
        id: "2",
        name: "Marcus Chen",
        role: "Contemporary Painter",
        category: "Visual Arts",
        bio: "Marcus Chen creates bold, abstract paintings that explore themes of identity and urbanization. His work has been exhibited in galleries across Europe and North America, and he was the recipient of the National Arts Grant in 2020.",
        image: "/placeholder.svg?height=400&width=400",
        featured: false,
        socialLinks: [
            { platform: "instagram", url: "https://instagram.com" },
            { platform: "website", url: "https://example.com" },
        ],
        rating: 4.7,
    },
    {
        id: "3",
        name: "Sophia Williams",
        role: "Theater Director",
        category: "Theater",
        bio: "Sophia Williams is a visionary theater director known for her innovative adaptations of classic plays. Her production of 'Hamlet' set in a dystopian future received critical acclaim and multiple theater awards.",
        image: "/placeholder.svg?height=400&width=400",
        featured: false,
        rating: 4.8,
    },
    {
        id: "4",
        name: "Carlos Mendez",
        role: "Jazz Saxophonist",
        category: "Music",
        bio: "Carlos Mendez is a virtuoso saxophonist who blends traditional jazz with Latin influences. He has performed with some of the biggest names in jazz and leads his own quartet that tours internationally.",
        image: "/placeholder.svg?height=400&width=400",
        featured: true,
        socialLinks: [{ platform: "instagram", url: "https://instagram.com" }],
        works: [
            {
                id: "work1",
                title: "Latin Jazz Fusion",
                type: "album",
                year: "2022",
                image: "/placeholder.svg?height=300&width=300",
                description: "An innovative blend of traditional jazz and Latin rhythms.",
            },
        ],
        rating: 4.9,
    },
    {
        id: "5",
        name: "Aisha Johnson",
        role: "Contemporary Dancer",
        category: "Dance",
        bio: "Aisha Johnson is a contemporary dancer and choreographer whose work explores themes of identity and social justice. She has performed with leading dance companies and now leads her own dance collective.",
        image: "/placeholder.svg?height=400&width=400",
        featured: false,
        rating: 4.6,
    },
    {
        id: "6",
        name: "David Kim",
        role: "Sculptor",
        category: "Visual Arts",
        bio: "David Kim creates large-scale metal sculptures that transform public spaces. His work combines industrial materials with organic forms, creating pieces that interact with their environment and change with the light throughout the day.",
        image: "/placeholder.svg?height=400&width=400",
        featured: false,
        socialLinks: [{ platform: "website", url: "https://example.com" }],
        rating: 4.7,
    },
]
