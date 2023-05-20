import * as React from 'react'

import {Button, FormControl, Input, Link, Stack} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

import {supabase} from '../../api'
import useLoadingState from '../../common/hooks/use-loading-state'
import {SIGN_UP} from '../../router/paths'
import SocialSignInButtons from '../social-signin'

const toasts = {
  onErrorToast: 'Logowanie nie powiodło się',
  onSuccessToast: 'Witaj w BudoAkademii!',
}

const Form = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleEmailChange = React.useCallback(({target: {value}}) => setEmail(value), [])
  const handlePasswordChange = React.useCallback(({target: {value}}) => setPassword(value), [])

  const [handleSubmit, loading] = useLoadingState(
    React.useCallback(async () => {
      if (!email || !password) return

      const {error} = await supabase.auth.signInWithPassword({email, password})
      if (error) throw error
    }, [email, password]),
    toasts
  )

  const isSubmitDisabled = React.useMemo(() => !email || !password, [email, password])

  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <Input
          type="email"
          placeholder="E-mail"
          variant="filled"
          value={email}
          onChange={handleEmailChange}
          isDisabled={loading}
        />
      </FormControl>
      <Input
        type="password"
        value={password}
        variant="filled"
        placeholder="Hasło"
        isRequired
        isDisabled={loading}
        onChange={handlePasswordChange}
      />
      <Stack spacing={4}>
        <Link color="blue.400" fontSize="sm">
          Nie pamiętasz hasła?
        </Link>
        <Button
          bg="blue.400"
          color="white"
          _hover={{
            bg: 'blue.500',
          }}
          size="sm"
          onClick={handleSubmit}
          isLoading={loading}
          isDisabled={isSubmitDisabled}
        >
          Zaloguj się
        </Button>
        <Button
          colorScheme="gray"
          _hover={{
            bg: 'blue.500',
          }}
          size="sm"
          as={RouterLink}
          to={SIGN_UP}
          isDisabled={loading}
        >
          Stwórz nowe konto
        </Button>
      </Stack>
      <SocialSignInButtons isDisabled={loading} />
    </Stack>
  )
}

export default Form
