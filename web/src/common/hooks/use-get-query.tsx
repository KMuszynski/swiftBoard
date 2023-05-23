import React from 'react'

import {SupabaseQueryParams} from '@/api/types'
import {buildSupabaseQuery} from '@/api/utils'
import {AnyObject} from '@/utils/types'

import {useLoadingState} from '.'

type Props<T extends AnyObject> = SupabaseQueryParams<T> & {
  autoRefetch?: boolean
  errSnackbarTitle?: string
  parsingFunction?: (item: unknown) => T
}

const useGetQuery = <T extends AnyObject>({
  errSnackbarTitle,
  parsingFunction,
  autoRefetch = true,
  ...params
}: Props<T>): [T | null, boolean, () => Promise<void>, Error | null] => {
  const [data, setData] = React.useState<T | null>(null)

  const [fetch, loading, error] = useLoadingState(
    React.useCallback(async () => {
      const {data, error} = await buildSupabaseQuery(params).limit(1).maybeSingle()
      if (error) throw error

      setData(parsingFunction && data ? parsingFunction(data) : data)
    }, [params, parsingFunction]),
    {onErrorToast: errSnackbarTitle || 'Nie udało się wczytać zasobu'}
  )

  React.useEffect(() => {
    autoRefetch && fetch()
  }, [params.descending, params.fields, params.filter, params.match, params.order]) // eslint-disable-line

  return [data, loading, fetch, error]
}

export default useGetQuery
