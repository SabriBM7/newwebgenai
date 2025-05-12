import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

// For server-side usage
export function createServerClient() {
    const cookieStore = cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing Supabase environment variables")
    }

    return createClient<Database>(supabaseUrl, supabaseServiceKey, {
        cookies: {
            get(name) {
                return cookieStore.get(name)?.value
            },
        },
    })
}
