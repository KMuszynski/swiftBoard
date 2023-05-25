import {Database} from './database.types'

export type User = Database['public']['Tables']['users']['Row']
export type UserProfile = Database['public']['Views']['user_profile']['Row']
export type UserRole = Database['public']['Enums']['user_role']

export type Company = Database['public']['Tables']['companies']['Row']
export type CompanyRole = Database['public']['Enums']['company_user_role']
export type CompanyUser = Database['public']['Tables']['company_users']['Row']
export type CompanyEmployee = Database['public']['Views']['company_employees']['Row']
export type CompanyDocument = Database['public']['Tables']['company_documents']['Row']
export type CompanyDocumentSigned = Database['public']['Views']['company_documents_signed']['Row']

export type Task = Database['public']['Tables']['tasks']['Row']
