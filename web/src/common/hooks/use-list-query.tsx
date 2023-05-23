import React from 'react'

import {useToast} from '@chakra-ui/react'

import {SupabaseQueryParams} from '@/api/types'
import {buildSupabaseQuery} from '@/api/utils'
import {AnyObject} from '@/utils/types'

export type useListQueryArgs<T extends AnyObject> = SupabaseQueryParams<T> & {
  pageNumber?: number
  itemsPerPage?: number
  autoRefetch?: boolean
  errSnackbarTitle?: string
  parsingFunction?: (item: unknown) => T
}

const useListQuery = <T extends AnyObject>({
  from,
  order,
  match,
  fields,
  filter,
  finalize,
  descending,
  pageNumber,
  itemsPerPage,
  parsingFunction,
  errSnackbarTitle,
  autoRefetch = true,
}: useListQueryArgs<T>): [T[], boolean, () => Promise<void>, number, Error | null] => {
  const toast = useToast()
  const [loading, setLoading] = React.useState(false)
  const ac = React.useRef<AbortController>()
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<T[]>([])
  const [rows, setRows] = React.useState<number>(0)

  const fetch = React.useCallback(async () => {
    loading && ac.current?.abort()

    setLoading(true)
    ac.current = new AbortController()
    try {
      let query = buildSupabaseQuery({from, order, match, fields, filter, finalize, descending}).abortSignal(
        ac.current.signal
      )

      if (itemsPerPage) {
        query = query.limit(itemsPerPage)
        if (pageNumber) {
          const offset = itemsPerPage * pageNumber
          query = query.range(offset, offset + itemsPerPage - 1) // Both start and end indices are inclusive
        }
      }

      const {data, count, error} = await query
      if (error) throw error

      setData((parsingFunction ? data?.map((item: unknown) => parsingFunction(item)) : data) || [])
      setRows(count ?? 0)
    } catch (e) {
      if ((e as Error).message.includes('aborted')) return
      console.error(e)
      setError(e as Error)
      toast({
        title: errSnackbarTitle || 'Nie udało się wczytać zasobów',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [
    descending,
    filter,
    finalize,
    itemsPerPage,
    order,
    pageNumber,
    from,
    fields,
    match,
    errSnackbarTitle,
    parsingFunction,
    toast,
    loading,
  ])

  React.useEffect(() => {
    autoRefetch && fetch()
  }, [descending, filter, finalize, itemsPerPage, order, pageNumber, match]) // eslint-disable-line

  return [data, loading, fetch, rows, error]
}

export default useListQuery
