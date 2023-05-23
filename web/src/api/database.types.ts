export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          email: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
      }
    }
    Views: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          last_sign_in_at: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
      }
    }
    Functions: {
      generate_signed_file_url: {
        Args: {
          bucket_name: string
          path: string
        }
        Returns: string
      }
      get_env: {
        Args: {
          env: string
        }
        Returns: string
      }
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
