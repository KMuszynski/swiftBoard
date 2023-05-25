import React from 'react'

import {Button} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import {supabase} from '@/api'
import {useLoadingState} from '@/common/hooks'

const SignOutButton = () => {
  const navigate = useNavigate()

  const [handleSignOut, loading] = useLoadingState(
    React.useCallback(async () => {
      const {error} = await supabase.auth.signOut()
      if (error) throw error
      navigate('/', {replace: true})
    }, [navigate]),
    {
      onErrorToast: 'Wylogowywanie nie powiodło się',
    }
  )

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} isLoading={loading}>
      Wyloguj się
    </Button>
  )
}

export default SignOutButton
