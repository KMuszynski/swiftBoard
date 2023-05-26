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
      companies: {
        Row: {
          created_at: string
          description: string
          id: string
          logo: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          logo?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          logo?: string | null
          name?: string
          updated_at?: string
        }
      }
      company_documents: {
        Row: {
          company: string
          created_at: string
          id: string
          name: string
          path: string
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          name: string
          path: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          name?: string
          path?: string
        }
      }
      company_positions: {
        Row: {
          company: string
          created_at: string
          id: string
          name: string
          requirements: string[]
          responsibilities: string[]
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          name: string
          requirements?: string[]
          responsibilities?: string[]
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          name?: string
          requirements?: string[]
          responsibilities?: string[]
          updated_at?: string
        }
      }
      company_users: {
        Row: {
          company: string
          created_at: string
          points: number
          position: string | null
          requirements: string[]
          responsibilities: string[]
          role: Database["public"]["Enums"]["company_user_role"]
          updated_at: string
          user: string
        }
        Insert: {
          company: string
          created_at?: string
          points?: number
          position?: string | null
          requirements?: string[]
          responsibilities?: string[]
          role?: Database["public"]["Enums"]["company_user_role"]
          updated_at?: string
          user: string
        }
        Update: {
          company?: string
          created_at?: string
          points?: number
          position?: string | null
          requirements?: string[]
          responsibilities?: string[]
          role?: Database["public"]["Enums"]["company_user_role"]
          updated_at?: string
          user?: string
        }
      }
      positions: {
        Row: {
          created_at: string
          id: string
          name: string
          requirements: string[]
          responsibilities: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          requirements?: string[]
          responsibilities?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          requirements?: string[]
          responsibilities?: string[]
          updated_at?: string
        }
      }
      secrets: {
        Row: {
          created_at: string
          name: string
          value: string
        }
        Insert: {
          created_at?: string
          name: string
          value: string
        }
        Update: {
          created_at?: string
          name?: string
          value?: string
        }
      }
      tasks: {
        Row: {
          company: string
          created_at: string
          description: string
          documents: string[]
          id: string
          max_points: number
          min_points: number
          name: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          documents?: string[]
          id?: string
          max_points: number
          min_points?: number
          name: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          documents?: string[]
          id?: string
          max_points?: number
          min_points?: number
          name?: string
          updated_at?: string
        }
      }
      user_tasks: {
        Row: {
          assigned_at: string
          completed_at: string | null
          deadline: string | null
          raport: string | null
          status: Database["public"]["Enums"]["task_status"]
          task: string
          user: string
        }
        Insert: {
          assigned_at?: string
          completed_at?: string | null
          deadline?: string | null
          raport?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task: string
          user: string
        }
        Update: {
          assigned_at?: string
          completed_at?: string | null
          deadline?: string | null
          raport?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task?: string
          user?: string
        }
      }
      users: {
        Row: {
          avatar_override: string | null
          avatar_url: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar_override?: string | null
          avatar_url?: string | null
          email: string
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar_override?: string | null
          avatar_url?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
      }
    }
    Views: {
      company_documents_signed: {
        Row: {
          company: string | null
          created_at: string | null
          id: string | null
          name: string | null
          path: string | null
          url: string | null
        }
      }
      company_employees: {
        Row: {
          avatar_url: string | null
          company: string | null
          email: string | null
          full_name: string | null
          id: string | null
          points: number | null
          position_id: string | null
          position_name: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          role: Database["public"]["Enums"]["company_user_role"] | null
          task_statuses: Database["public"]["Enums"]["task_status"][] | null
        }
      }
      company_info: {
        Row: {
          description: string | null
          id: string | null
          logo: string | null
          name: string | null
        }
      }
      employee_tasks: {
        Row: {
          assigned_at: string | null
          company: string | null
          deadline: string | null
          description: string | null
          documents: string[] | null
          id: string | null
          name: string | null
          points: number | null
          raport: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          user: string | null
        }
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          company: string | null
          company_role: Database["public"]["Enums"]["company_user_role"] | null
          email: string | null
          full_name: string | null
          id: string | null
          points: number | null
          position: string | null
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
      generate_user_avatar_url: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_env: {
        Args: {
          env: string
        }
        Returns: string
      }
      get_remaining_task_points: {
        Args: {
          task_id: string
          user_id: string
        }
        Returns: number
      }
      get_secret: {
        Args: {
          secret: string
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
      upsert_company: {
        Args: {
          name: string
          description: string
          company_id?: string
        }
        Returns: Json
      }
      upsert_company_user: {
        Args: {
          company_id: string
          email: string
          role: Database["public"]["Enums"]["company_user_role"]
          responsibilities: string[]
          requirements: string[]
          position?: string
        }
        Returns: Json
      }
    }
    Enums: {
      company_user_role: "admin" | "employee"
      task_status: "assigned" | "completed" | "failed"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
