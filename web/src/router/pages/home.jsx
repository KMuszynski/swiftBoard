import {Box, Button, Flex, Heading, Stack, Text} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {selectProfile} from '../../auth/state'
import {COMPANY_CREATOR} from '../paths'

const Home = () => {
  const user = useSelector(selectProfile)

  return (
    <Box h="calc(100vh - 128px)" py={8}>
      <Stack w="100%" align="center" spacing={12}>
        <Heading size="2xl">
          Witaj w <i>SwiftBoard!</i>
        </Heading>
        <Flex gap={12}>
          <Stack flex={1} textAlign="center" bg="gray.800" p={8} rounded="lg">
            <Text fontSize="xl" fontWeight="bold">
              Jesteś pracownikiem?
            </Text>
            <Text>Poczekaj na dodanie do firmy przez swojego pracodawcę</Text>
          </Stack>
          <Stack flex={1} align="center" bg="gray.800" p={8} rounded="lg">
            <Text fontSize="xl" fontWeight="bold">
              Jesteś pracodawcą?
            </Text>
            <Button as={Link} colorScheme="blue" to={COMPANY_CREATOR}>
              Załóż konto firmowe
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default Home
