import {Container, Heading, Stack} from '@chakra-ui/react'

import SignInForm from './form'

const SignIn = () => (
  <Container maxW="container.xl" mb={8} px={8}>
    <Stack align="center" spacing={8}>
      <Heading>Zaloguj się</Heading>
      <Stack w="400px">
        <SignInForm />
      </Stack>
    </Stack>
  </Container>
)

export default SignIn
