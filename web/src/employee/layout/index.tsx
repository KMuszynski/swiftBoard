import {Box, Flex, Image} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'

import EmployeeSidebar from './sidebar'
import gradientBg from '/gradient-bg-2.png'

const EmployeePanelLayout = () => (
  <Flex h="100vh" w="100%" pos="relative">
    <Flex w="316px">
      <EmployeeSidebar />
    </Flex>
    <Box w="1px" bg="whiteAlpha.300" alignSelf="stretch" />
    <Flex flex={1}>
      <Outlet />
    </Flex>
    <Image
      src={gradientBg}
      pos="absolute"
      w="100%"
      h="100%"
      opacity={0.2}
      top={0}
      left={0}
      pointerEvents="none"
      zIndex={-1}
    />
    <Box pos="absolute" w="100%" h="100%" bg="blackAlpha.600" zIndex={-1} />
  </Flex>
)

export default EmployeePanelLayout
