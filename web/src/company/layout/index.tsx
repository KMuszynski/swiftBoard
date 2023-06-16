import {ChevronLeftIcon} from '@chakra-ui/icons'
import {Box, Flex, IconButton, Image, useDisclosure} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'

import Chat from '@/chat'
import gradientBg from '@/common/assets/gradient-bg-2.png'
import Navbar from '@/router/layout/navbar'

const CompanyPanelLayout = () => {
  const {isOpen, onToggle} = useDisclosure({defaultIsOpen: false})

  return (
    <Box h="calc(100vh - 68px)">
      <Navbar />
      <Flex h="100%" w="100%" pos="relative" overflow="hidden">
        <Flex h="100%" w="100%" pr={isOpen ? '512px' : '50px'} transition="all 500ms ease" overflowY="auto">
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
          <Flex zIndex={5} position="relative" align="center" pl={2} bg="gray.900" h="calc(100vh - 68px)">
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
    </Box>
  )
}

export default CompanyPanelLayout
