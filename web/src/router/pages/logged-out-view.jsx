import {Flex, Heading, Stack, Text} from '@chakra-ui/react'

import AuthForm from '../../auth/form'

const LoggedOutView = () => (
  <Flex h="100vh">
    <Flex flex={1} h="100%" align="center" justify="flex-end" spacing={0} p={16}>
      <Stack align="center">
        <Heading size="4xl" fontStyle="italic">
          SwiftBoard
        </Heading>
        <Text fontSize="xl">onboarding simplified.</Text>
      </Stack>
    </Flex>
    <Flex flex={1} h="100%" justify="flex-start" align="center" spacing={4} p={16} bg="gray.800">
      <AuthForm />
    </Flex>
  </Flex>
)

export default LoggedOutView
