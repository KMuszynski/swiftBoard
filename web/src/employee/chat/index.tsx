import {Flex, Stack, Text, Textarea} from '@chakra-ui/react'

const Chat = () => {
  return (
    <Stack bg="blackAlpha.600" w="100%" p={4}>
      <Flex h="100%">
        <Text>Chat</Text>
      </Flex>
      <Textarea placeholder="Zadaj pytanie..." resize="none" minH="150px" bg="gray.800" />
    </Stack>
  )
}

export default Chat
