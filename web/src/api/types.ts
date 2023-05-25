import {PostgrestFilterBuilder} from '@supabase/postgrest-js'

import {AnyObject} from '@/utils/types'

import {Database} from './database.types'

export type FilterBuilderFn<T extends AnyObject> = (
  builder: PostgrestFilterBuilder<Database['public'], T, T[]>
) => PostgrestFilterBuilder<Database['public'], T, T[]>

export type SupabaseQueryParams<T extends AnyObject> = {
  from: string // database table
  fields?: string // comma separated list of columns, all fields '*' by default
  order?: Extract<keyof T, string>[]
  descending?: boolean
  match?: Partial<T> // equality filter shorthand
  filter?: FilterBuilderFn<T>
  finalize?: FilterBuilderFn<T> //constant filter
}

export type UpsertResponse = {
  error?: string
  id?: string
}
