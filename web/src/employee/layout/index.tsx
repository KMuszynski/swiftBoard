import {ChevronLeftIcon} from '@chakra-ui/icons'
import {Box, Flex, IconButton, Image, useDisclosure} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'

import Chat from '../chat'
import EmployeeSidebar from './sidebar'
import gradientBg from '/gradient-bg-2.png'

const EmployeePanelLayout = () => {
  const {isOpen, onToggle} = useDisclosure({defaultIsOpen: true})

  return (
    <Flex h="100vh" w="100%" pos="relative" overflow="hidden">
      <Flex flex={1} minW="316px">
        <EmployeeSidebar />
      </Flex>
      <Box w="1px" bg="whiteAlpha.300" alignSelf="stretch" />
      <Flex flex={5} mr={isOpen ? '512px' : '25'} transition="all 500ms ease">
        <Outlet />
      </Flex>
      <Box
        w="512px"
        position="absolute"
        transition="all 500ms ease"
        borderLeft="1px solid"
        borderColor="whiteAlpha.600"
        right={isOpen ? 0 : '-487px'}
      >
        <Flex zIndex={100} position="relative" align="center" pl={2} bg="gray.900">
          <Chat />
          <IconButton
            position="absolute"
            aria-label="toggle-chat"
            icon={<ChevronLeftIcon boxSize="40px" transform="auto" rotate={isOpen ? '180deg' : '0'} />}
            onClick={onToggle}
            left={0}
            zIndex={100}
            variant="solid"
            bg="gray.800"
            _hover={{
              bg: 'gray.700',
            }}
            _active={{
              bg: 'gray.900',
            }}
            transform="translateX(-50%)"
            h="180px"
          />
        </Flex>
      </Box>
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
}

export default EmployeePanelLayout
