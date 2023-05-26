import {Avatar, Flex, Icon, Text, chakra, shouldForwardProp} from '@chakra-ui/react'
import {isValidMotionProp, motion} from 'framer-motion'
import {SiOpenai} from 'react-icons/si'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import {ChatMessage} from '../types'

export const Message = ({msg}: {msg: ChatMessage}) => {
  const user = useAppSelector(selectProfile)
  return msg.role === 'system' ? null : msg.role === 'user' ? (
    <Flex w="100%" justify="flex-end" align="flex-end" gap={2}>
      <Text bg="blue.900" px={4} py={2} rounded="10px 10px 0 10px">
        {msg.content}
      </Text>
      <Avatar src={user?.avatar_url || undefined} size="sm" />
    </Flex>
  ) : (
    <Flex w="100%" align="flex-end" gap={2}>
      <Icon as={SiOpenai} boxSize={8} />
      <Text bg="gray.800" px={4} py={2} rounded="10px 10px 10px 0">
        {msg.content}
      </Text>
    </Flex>
  )
}

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export const LoadingMessage = () => (
  <Flex w="100%" align="flex-end" gap={4}>
    <Icon as={SiOpenai} boxSize={8} />
    <Flex bg="gray.900" p={4} rounded="10px 10px 10px 0" gap={1}>
      {Array.from(Array(3), (_, i) => (
        <MotionBox
          key={i}
          boxSize="8px"
          rounded="full"
          animate={{y: ['0px', '-5px', '0px'], opacity: [0.5, 1, 0.5]}}
          bg="white"
          // @ts-ignore
          transition={{
            ease: 'easeInOut',
            delay: 0.2 * i,
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}
    </Flex>
  </Flex>
)
