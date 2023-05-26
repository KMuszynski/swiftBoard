import {Company, CompanyEmployee, CompanyPosition, CompanyRole, Task} from '@/api/models'

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
  position_id: '',
  position_name: '',
  requirements: [],
  responsibilities: [],
  role: 'employee',
  task_statuses: [],
}

export const companyRoleItems: Record<CompanyRole, string> = {
  admin: 'Administrator',
  employee: 'Pracownik',
}

export const emptyTask: Task = {
  id: '',
  company: '',
  created_at: '',
  updated_at: '',
  description: '',
  documents: [],
  max_points: 0,
  min_points: 0,
  name: '',
}

export const emptyPosition: CompanyPosition = {
  id: '',
  company: '',
  created_at: '',
  updated_at: '',
  name: '',
  requirements: [],
  responsibilities: [],
}
