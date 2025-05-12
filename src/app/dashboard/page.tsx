"use client"

import { useAuth } from "@/contexts/auth-context"
import UserProfile from "@/components/user-profile"

export default function DashboardPage() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <header className="border-b bg-background">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <h1 className="text-xl font-bold">Website Generator</h1>
                    <UserProfile />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h2>
                <p>This is your dashboard. You can start creating websites here.</p>
            </main>
        </div>
    )
}
