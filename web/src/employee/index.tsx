import {Flex} from '@chakra-ui/react'

import Chat from './chat'
import EmployeeSidebar from './sidebar'
import TaskViewer from './task-viewer'

const EmployeePanel = () => {
  return (
    <Flex h="100%" w="100%">
      <Flex flex={1}>
        <EmployeeSidebar />
      </Flex>
      <Flex flex={5}>
        <TaskViewer />
      </Flex>
      <Flex flex={2}>
        <Chat />
      </Flex>
    </Flex>
  )
}

export default EmployeePanel
