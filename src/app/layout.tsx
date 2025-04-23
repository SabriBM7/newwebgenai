// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NewWebGenAI',
    description: 'Generate websites with AI',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
        {/* Main container with max-width and centered content */}
        <div className="min-h-screen flex flex-col">
            {/* Header would go here */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>
            {/* Footer would go here */}
        </div>
        </body>
        </html>
    )
}