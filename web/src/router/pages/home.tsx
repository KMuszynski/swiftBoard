import {Box, Button, Flex, Heading, Stack, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {selectProfile} from '@/auth/state'
import CompanyPanel from '@/company/panel'
import EmployeePanel from '@/employee'
import {useAppSelector} from '@/store'

import {REGISTER_COMAPNY} from '../paths'

const Home = () => {
  const user = useAppSelector(selectProfile)

  return !user?.company ? (
    <Box h="calc(100vh - 68px)">
      <Stack w="100%" align="center" spacing={12} py={8}>
        <Heading size="2xl">
          Witaj w <i>SwiftBoard!</i>
        </Heading>
        <Flex direction="column" gap={12}>
          <Stack flex={1} textAlign="center" bg="gray.800" p={8} rounded="lg" boxShadow="glowBlue">
            <Text fontSize="xl" fontWeight="bold">
              Jesteś pracownikiem?
            </Text>
            <Text>Poczekaj na dodanie do firmy przez swojego pracodawcę</Text>
          </Stack>
          <Stack flex={1} align="center" bg="gray.800" p={8} rounded="lg" boxShadow="glowBlue">
            <Text fontSize="xl" fontWeight="bold">
              Jesteś pracodawcą?
            </Text>
            <Button as={Link} colorScheme="blue" to={REGISTER_COMAPNY} rounded="full">
              Zarejestruj swoją firmę!
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  ) : user?.company_role === 'admin' ? (
    <CompanyPanel />
  ) : (
    <EmployeePanel />
  )
}

export default Home
