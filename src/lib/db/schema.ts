// This is a Prisma schema example - you would put this in prisma/schema.prisma

/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or your preferred database
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  websites      Website[]
}

model Website {
  id          String   @id @default(cuid())
  title       String
  description String?
  slug        String   @unique
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  sections    Section[]
  settings    WebsiteSettings?
}

model Section {
  id        String   @id @default(cuid())
  type      String   // e.g., "header", "hero", "features"
  order     Int
  content   Json     // Stores the section content as JSON
  websiteId String
  website   Website  @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model WebsiteSettings {
  id            String   @id @default(cuid())
  colorScheme   Json     // Stores color scheme as JSON
  typography    Json     // Stores typography settings as JSON
  customDomain  String?
  analytics     Json?    // Stores analytics settings as JSON
  websiteId     String   @unique
  website       Website  @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model AIGenerationHistory {
  id        String   @id @default(cuid())
  prompt    Json     // Stores the generation prompt
  result    Json     // Stores the generation result
  userId    String
  websiteId String?
  createdAt DateTime @default(now())
}
*/

// TypeScript types based on the schema
export type User = {
    id: string
    name?: string
    email: string
    emailVerified?: Date
    image?: string
    createdAt: Date
    updatedAt: Date
}

export type Website = {
    id: string
    title: string
    description?: string
    slug: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
}

export type Section = {
    id: string
    type: string
    order: number
    content: any // JSON content
    websiteId: string
    createdAt: Date
    updatedAt: Date
}

export type WebsiteSettings = {
    id: string
    colorScheme: {
        primary: string
        secondary: string
        accent: string
        background: string
        text: string
    }
    typography: {
        headingFont: string
        bodyFont: string
        baseFontSize: string
        scaleRatio: number
    }
    customDomain?: string
    analytics?: any
    websiteId: string
    createdAt: Date
    updatedAt: Date
}

export type AIGenerationHistory = {
    id: string
    prompt: any
    result: any
    userId: string
    websiteId?: string
    createdAt: Date
}
