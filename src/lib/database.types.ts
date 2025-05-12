export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            document_chunks: {
                Row: {
                    id: number
                    content: string
                    metadata: Json
                    embedding: number[] | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    content: string
                    metadata?: Json
                    embedding?: number[] | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    content?: string
                    metadata?: Json
                    embedding?: number[] | null
                    created_at?: string
                }
                Relationships: []
            }
            documents: {
                Row: {
                    id: number
                    title: string
                    description: string | null
                    file_path: string | null
                    file_type: string | null
                    created_at: string
                    user_id: string | null
                }
                Insert: {
                    id?: number
                    title: string
                    description?: string | null
                    file_path?: string | null
                    file_type?: string | null
                    created_at?: string
                    user_id?: string | null
                }
                Update: {
                    id?: number
                    title?: string
                    description?: string | null
                    file_path?: string | null
                    file_type?: string | null
                    created_at?: string
                    user_id?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            match_documents: {
                Args: {
                    query_embedding: number[]
                    match_threshold: number
                    match_count: number
                }
                Returns: {
                    id: number
                    content: string
                    metadata: Json
                    similarity: number
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}
