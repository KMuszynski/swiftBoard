import {useCallback, useState} from 'react'

import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import isEmail from 'validator/es/lib/isEmail'

import {supabase} from '../../api'
import useLoadingState from '../../common/hooks/use-loading-state'
import SocialSignIn from './social-signin'
import {isInputValid, isPasswordValid} from './utils'

const toasts = {
  onErrorToast: 'Rejestracja nie powiodła się',
  onSuccessToast: 'Teraz wystarczy, że potwierdzisz swój e-mail!',
}

const emptyInput = {
  email: '',
  password: '',
  repeatPassword: '',
}

const AuthForm = () => {
  const {isOpen: isSignUp, onToggle} = useDisclosure()
  const [input, setInput] = useState(emptyInput)

  const [handleSubmit, loading] = useLoadingState(
    useCallback(async () => {
      if (isSignUp && !isInputValid(input)) return

      const credentials = {
        email: input.email,
        password: input.password,
      }
      const req = isSignUp ? supabase.auth.signUp(credentials) : supabase.auth.signInWithPassword(credentials)
      const {error} = await req
      if (error) throw error
    }, [isSignUp, input]),
    toasts
  )

  const handleInputChange = useCallback(({target: {name, value}}) => {
    setInput((input) => ({...input, [name]: value}))
  }, [])

  return (
    <Stack spacing={4} w="400px" textAlign="center">
      <Heading size="xl">{isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}</Heading>
      <FormControl isRequired={true} isInvalid={!!input.email && !isEmail(input.email)}>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          variant="filled"
          value={input.email}
          onChange={handleInputChange}
          isDisabled={loading}
        />
        <FormErrorMessage>Niepoprawny adres e-mail</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={isSignUp && !!input.password && !isPasswordValid(input.password)}>
        <Input
          type="password"
          name="password"
          variant="filled"
          value={input.password ?? ''}
          onChange={handleInputChange}
          isDisabled={loading}
          isRequired
          placeholder="Hasło"
        />
        <FormErrorMessage>Hasło musi składać się przynajmniej z 6 znaków</FormErrorMessage>
      </FormControl>
      {isSignUp && (
        <FormControl isRequired isInvalid={!!input.repeatPassword && input.password !== input.repeatPassword}>
          <Input
            type="password"
            name="repeatPassword"
            variant="filled"
            value={input.repeatPassword ?? ''}
            onChange={handleInputChange}
            isDisabled={loading}
            isRequired
            placeholder="Powtórz hasło"
          />
          <FormErrorMessage>Hasła nie są identyczne</FormErrorMessage>
        </FormControl>
      )}
      <Button variant="link" color="blue.400" fontSize="sm">
        Nie pamiętasz hasła?
      </Button>
      <Button
        bg="blue.400"
        color="white"
        _hover={{
          bg: 'blue.500',
        }}
        size="sm"
        isLoading={loading}
        isDisabled={isSignUp && !isInputValid(input)}
        onClick={handleSubmit}
      >
        {isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}
      </Button>
      <Flex direction="row" alignItems="center">
        <Divider flex={1} />
        <Text fontSize="xs" mx={2} color="gray.200">
          {isSignUp ? 'Masz już konto?' : 'Jesteś tu nowy?'}
        </Text>
        <Divider flex={1} />
      </Flex>
      <Button
        colorScheme="gray"
        _hover={{
          bg: 'blue.500',
        }}
        size="sm"
        onClick={onToggle}
        isDisabled={loading}
      >
        {isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}
      </Button>
      <SocialSignIn isDisabled={loading} />
    </Stack>
  )
}

export default AuthForm
