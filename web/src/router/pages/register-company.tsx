import {Box, Heading, Stack, Text} from '@chakra-ui/react'

import CompanyEditorForm from '@/company/editor-form'

const RegisterCompanyPage = () => {
  return (
    <Stack align="center" spacing={6} p={8}>
      <Heading>Rejestracja firmy</Heading>
      <Box bg="gray.800" p={4} rounded="xl" boxShadow="glowBlue">
        <CompanyEditorForm item={null} />
      </Box>
      <Text>Więcej informacji dodasz w panelu zarządzania firmą!</Text>
    </Stack>
  )
}

export default RegisterCompanyPage
