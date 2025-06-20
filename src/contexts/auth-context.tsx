"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
    user: User | null
    session: Session | null
    isLoading: boolean
    signIn: (
        email: string,
        password: string,
    ) => Promise<{
        error: Error | null
        data: { user: User | null; session: Session | null }
    }>
    signUp: (
        email: string,
        password: string,
    ) => Promise<{
        error: Error | null
        data: { user: User | null; session: Session | null }
    }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signIn = async (email: string, password: string) => {
        const response = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return response
    }

    const signUp = async (email: string, password: string) => {
        const response = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        return response
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const value = {
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
