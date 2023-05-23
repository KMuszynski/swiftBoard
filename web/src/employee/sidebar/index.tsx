import {Divider, Stack} from '@chakra-ui/react'

import UserMenu from './menu'
import TasksList from './tasks-list'

const EmployeeSidebar = () => {
  return (
    <Stack p={4} spacing={6} w="100%" bg="blackAlpha.600" h="100vh">
      <UserMenu />
      <Divider />
      <TasksList />
    </Stack>
  )
}

export default EmployeeSidebar
