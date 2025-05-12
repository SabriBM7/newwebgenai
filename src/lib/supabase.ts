import { createClient } from "@supabase/supabase-js"

// For client-side usage
let supabaseClient: ReturnType<typeof createClient> | undefined

export function getSupabaseClient() {
    if (supabaseClient) return supabaseClient

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables")
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseClient
}
