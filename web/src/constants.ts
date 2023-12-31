export const WEB_BASE_URL = import.meta.env.VITE_WEB_BASE_URL || 'http://localhost:3000'

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000'
export const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg0NTMzNjAwLAogICAgImV4cCI6IDE4NDIzODY0MDAKfQ.iawb9M8wZwNWP0OaxcTOQ5_uogXPGubShoQK76oRrbE'

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
export const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL || 'http://localhost:3000/api'

// Buckets
export const AVATARS_BUCKET = 'avatars'
export const COMPANIES_BUCKET = 'companies'
