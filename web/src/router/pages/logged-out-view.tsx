import {Flex, Heading, Image, Stack, Text} from '@chakra-ui/react'

import AuthForm from '@/auth/form'
import gradientBg from '@/common/assets/gradient-bg-2.png'

import wave from '/wave.svg'

const LoggedOutView = () => (
  <Flex h="100vh" position="relative" overflow="hidden">
    <Image src={wave} w="100%" position="absolute" bottom="-76px" opacity={0.3} pointerEvents="none" />
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
    <Flex flex={1} h="100%" align="center" justify="flex-end" p={16}>
      <Stack align="center" spacing={0}>
        <Heading size="4xl" fontStyle="italic">
          SwiftBoard
        </Heading>
        <Text fontSize="xl">onboarding simplified.</Text>
      </Stack>
    </Flex>
    <Flex flex={1} h="100%" justify="flex-start" align="center" p={16}>
      <Flex bg="gray.800" p={6} rounded="xl" zIndex="banner" boxShadow="glowBlue">
        <AuthForm />
      </Flex>
    </Flex>
  </Flex>
)

export default LoggedOutView
