import {Company, CompanyEmployee, CompanyRole} from '@/api/models'

export const emptyCompany: Company = {
  id: '',
  created_at: '',
  updated_at: '',
  description: '',
  logo: null,
  name: '',
}

export const emptyEmployee: CompanyEmployee = {
  id: '',
  avatar_url: null,
  company: '',
  email: '',
  full_name: '',
  points: 0,
  position: '',
  requirements: [],
  responsibilities: [],
  role: 'employee',
  task_statuses: [],
}

export const companyRoleItems: Record<CompanyRole, string> = {
  admin: 'Administrator',
  employee: 'Pracownik',
}
