import {useCallback, useState} from 'react'

import {useToast} from '@chakra-ui/react'

const useLoadingState = (onSubmit, options) => {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    try {
      await onSubmit()

      options?.onSuccessToast &&
        toast({
          status: 'success',
          title: options.onSuccessToast,
        })
    } catch (e) {
      setError(e)
      console.error(e)
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
