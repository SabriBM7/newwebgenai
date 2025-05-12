import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { slugify } from "@/lib/utils"

// Schema for website update
const websiteUpdateSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    published: z.boolean().optional(),
})

// GET a specific website
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const website = await prisma.website.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
            include: {
                settings: true,
                sections: {
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        })

        if (!website) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 })
        }

        return NextResponse.json(website)
    } catch (error) {
        console.error("Error fetching website:", error)
        return NextResponse.json({ error: "Failed to fetch website" }, { status: 500 })
    }
}

// PATCH update a website
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Check if website exists and belongs to user
        const existingWebsite = await prisma.website.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        })

        if (!existingWebsite) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 })
        }

        const json = await request.json()
        const body = websiteUpdateSchema.parse(json)

        // Update slug if title is changed
        let slug = existingWebsite.slug
        if (body.title && body.title !== existingWebsite.title) {
            const baseSlug = slugify(body.title)

            // Check if slug exists and create a unique one if needed
            slug = baseSlug
            let counter = 1

            while (
                await prisma.website.findFirst({
                    where: {
                        slug,
                        id: { not: params.id },
                    },
                })
                ) {
                slug = `${baseSlug}-${counter}`
                counter++
            }
        }

        // Update the website
        const website = await prisma.website.update({
            where: {
                id: params.id,
            },
            data: {
                ...(body.title && { title: body.title }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.published !== undefined && { published: body.published }),
                ...(body.title && { slug }),
            },
            include: {
                settings: true,
            },
        })

        return NextResponse.json(website)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }

        console.error("Error updating website:", error)
        return NextResponse.json({ error: "Failed to update website" }, { status: 500 })
    }
}

// DELETE a website
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Check if website exists and belongs to user
        const existingWebsite = await prisma.website.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        })

        if (!existingWebsite) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 })
        }

        // Delete the website (cascades to sections and settings)
        await prisma.website.delete({
            where: {
                id: params.id,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting website:", error)
        return NextResponse.json({ error: "Failed to delete website" }, { status: 500 })
    }
}
