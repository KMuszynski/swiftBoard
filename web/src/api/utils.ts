import {AnyObject} from '@/utils/types'

import {supabase} from '.'
import {SupabaseQueryParams} from './types'

export const buildSupabaseQuery = <T extends AnyObject>({
  fields,
  from,
  descending,
  order,
  match,
  filter,
  finalize,
}: SupabaseQueryParams<T>) => {
  let query = supabase.from(from).select<string, T>(fields, {count: 'exact'})

  if (order?.length) {
    order.forEach((o) => (query = query.order(o, {ascending: !descending})))
  }

  if (match) {
    query = query.match(match)
  }
  if (filter) {
    query = filter(query)
  }
  if (finalize) {
    query = finalize(query)
  }

  return query
}
