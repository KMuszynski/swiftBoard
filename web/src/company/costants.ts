import {Company, CompanyEmployee, CompanyPosition, CompanyRole, Task} from '@/api/models'
import {PGTimeRangeSlot} from '@/api/types'

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
  requirements: '',
  responsibilities: '',
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
  requirements: '',
  responsibilities: '',
}

export const events: PGTimeRangeSlot[] = [
  {
    from: new Date('2023-05-28T06:00:00.000Z'),
    to: new Date('2023-05-28T09:15:00.000Z'),
  },
  {
    from: new Date('2023-05-25T08:00:00.000Z'),
    to: new Date('2023-05-28T14:15:00.000Z'),
  },
  {
    from: new Date('2023-05-23T05:00:00.000Z'),
    to: new Date('2023-05-23T07:15:00.000Z'),
  },
  {
    from: new Date('2023-05-24T07:30:00.000Z'),
    to: new Date('2023-05-24T09:15:00.000Z'),
  },
  {
    from: new Date('2023-05-24T10:00:00.000Z'),
    to: new Date('2023-05-24T13:45:00.000Z'),
  },
  {
    from: new Date('2023-05-26T09:15:00.000Z'),
    to: new Date('2023-05-26T13:45:00.000Z'),
  },

  {
    from: new Date('2023-06-03T08:00:00.000Z'),
    to: new Date('2023-06-03T10:15:00.000Z'),
  },
  {
    from: new Date('2023-06-03T11:30:00.000Z'),
    to: new Date('2023-06-03T13:45:00.000Z'),
  },
  {
    from: new Date('2023-06-03T14:45:00.000Z'),
    to: new Date('2023-06-03T16:00:00.000Z'),
  },
  {
    from: new Date('2023-06-04T09:15:00.000Z'),
    to: new Date('2023-06-04T10:30:00.000Z'),
  },
  {
    from: new Date('2023-06-04T14:00:00.000Z'),
    to: new Date('2023-06-04T16:15:00.000Z'),
  },
  {
    from: new Date('2023-06-05T15:45:00.000Z'),
    to: new Date('2023-06-05T17:00:00.000Z'),
  },
  {
    from: new Date('2023-06-05T17:30:00.000Z'),
    to: new Date('2023-06-05T18:45:00.000Z'),
  },
  {
    from: new Date('2023-06-06T10:15:00.000Z'),
    to: new Date('2023-06-06T11:30:00.000Z'),
  },
  {
    from: new Date('2023-06-06T14:45:00.000Z'),
    to: new Date('2023-06-06T16:00:00.000Z'),
  },
  {
    from: new Date('2023-06-07T12:30:00.000Z'),
    to: new Date('2023-06-07T13:45:00.000Z'),
  },
]
