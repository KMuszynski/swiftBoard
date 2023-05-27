import {Box} from '@chakra-ui/react'

import CompanyCalendar from '@/company/panel/calendar'

const EmployeeCalendar = () => {
  return (
    <Box py={4} pl={4} pr={6} w="100%">
      <CompanyCalendar employee={true} />
    </Box>
  )
}

export default EmployeeCalendar
