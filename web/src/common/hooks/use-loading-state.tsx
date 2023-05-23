import * as React from 'react'

import {useToast} from '@chakra-ui/react'

type Options = {
  onErrorToast?: string
  onSuccessToast?: string
}

const useLoadingState = (
  onSubmit: () => Promise<void> | void,
  options?: Options
): [() => Promise<void>, boolean, Error | null] => {
  const toast = useToast()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const handleSubmit = React.useCallback(async () => {
    setLoading(true)
    try {
      await onSubmit()

      options?.onSuccessToast &&
        toast({
          status: 'success',
          title: options.onSuccessToast,
        })
    } catch (e) {
      setError(e as Error)
      console.error(e as Error)
      options?.onErrorToast &&
        toast({
          status: 'error',
          title: options.onErrorToast,
        })
    } finally {
      setLoading(false)
    }
  }, [onSubmit, options, toast])

  return [handleSubmit, loading, error]
}

export default useLoadingState
