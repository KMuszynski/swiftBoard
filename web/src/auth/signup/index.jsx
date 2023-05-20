import {useCallback, useMemo, useState} from 'react'

import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import isEmail from 'validator/es/lib/isEmail'

import {supabase} from '../../api'
import useLoadingState from '../../common/hooks/use-loading-state'
import {HOME, SIGN_IN} from '../../router/paths'
import SocialSignIn from '../social-signin'
import {emptySignUpInput, isInputValid, isPasswordValid} from './utils'

const toasts = {
  onErrorToast: 'Rejestracja nie powiodła się',
  onSuccessToast: 'Teraz wystarczy, że potwierdzisz swój e-mail!',
}

const SignUp = () => {
  const [input, setInput] = useState(emptySignUpInput)
  const navigate = useNavigate()

  const [handleSubmit, loading] = useLoadingState(
    useCallback(async () => {
      if (!isInputValid(input)) return

      const {error} = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      })
      if (error) throw error

      navigate(HOME, {replace: true})
    }, [navigate, input]),
    toasts
  )

  const handleInputChange = useCallback(({target: {name, value}}) => {
    setInput((input) => ({...input, [name]: value}))
  }, [])

  const isSubmitDisabled = useMemo(() => !isInputValid(input), [input])

  return (
    <Container maxW="container.xl" mb={8} px={8}>
      <Stack align="center" spacing={8}>
        <Heading>Rejestracja</Heading>
        <Stack spacing={4} w="400px">
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
          <FormControl isRequired isInvalid={!!input.password && !isPasswordValid(input.password)}>
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
          <FormControl
            isRequired
            isInvalid={!!input.repeatPassword && input.password !== input.repeatPassword}
          >
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
          <Button
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            size="sm"
            isLoading={loading}
            isDisabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            Zarejestruj się
          </Button>
          <Flex direction="row" alignItems="center">
            <Divider flex={1} />
            <Text fontSize="xs" mx={2} color="gray.200">
              Masz już konto?
            </Text>
            <Divider flex={1} />
          </Flex>
          <Button
            colorScheme="gray"
            _hover={{
              bg: 'blue.500',
            }}
            size="sm"
            as={RouterLink}
            to={SIGN_IN}
            isDisabled={loading}
          >
            Zaloguj się
          </Button>
          <SocialSignIn isDisabled={loading} />
        </Stack>
      </Stack>
    </Container>
  )
}

export default SignUp
