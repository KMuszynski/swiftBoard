import {Database} from './database.types'

export type User = Database['public']['Tables']['users']['Row']
export type UserRole = Database['public']['Enums']['user_role']

// Admin models
export type AdminUser = Database['public']['Views']['admin_users']['Row']
