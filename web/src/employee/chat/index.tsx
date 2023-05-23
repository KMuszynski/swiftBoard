import React from 'react'

import {AddIcon} from '@chakra-ui/icons'
import {Avatar, Box, Flex, HStack, Icon, IconButton, Text, Textarea, Tooltip} from '@chakra-ui/react'
import {IoSend} from 'react-icons/io5'
import {SiOpenai} from 'react-icons/si'
import Select, {SingleValue} from 'react-select'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'
import {selectStyles} from '@/theme/components/select'
import {SelectOption} from '@/utils/types'

type ChatMessage = {
  role: 'user' | 'system' | 'assistant'
  content: string
}

const startMessages: ChatMessage[] = [
  {role: 'system', content: 'You are a helpful assistant.'},
  {role: 'user', content: 'Who won the world series in 2020?'},
  {
    role: 'assistant',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.',
  },
  {role: 'user', content: 'Where was it played?'},
  {role: 'system', content: 'You are a helpful assistant.'},
  {role: 'user', content: 'Who won the world series in 2020?'},
  {
    role: 'assistant',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.',
  },
  {role: 'user', content: 'Where was it played?'},
  {role: 'system', content: 'You are a helpful assistant.'},
  {role: 'user', content: 'Who won the world series in 2020?'},
  {
    role: 'assistant',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nulla et vitae praesentium, ab perferendis ipsum similique dicta a aliquam sed nesciunt sequi veniam excepturi dignissimos facilis! Nihil corporis debitis, sint temporibus nostrum itaque quae recusandae praesentium obcaecati inventore exercitationem consequatur repudiandae accusantium totam ex! Facilis enim explicabo minima iure.',
  },
  {role: 'user', content: 'Where was it played?'},
]

const chats = [
  {
    id: '1',
    name: 'Starter chat',
  },
  {
    id: '2',
    name: 'Task 2',
  },
  {
    id: '3',
    name: 'Task 3',
  },
  {
    id: '4',
    name: 'Task 4',
  },
]

const Message = ({msg}: {msg: ChatMessage}) => {
  const user = useAppSelector(selectProfile)
  return msg.role === 'user' ? (
    <Flex w="100%" justify="flex-end" align="flex-end" gap={4}>
      <Text bg="blue.900" px={4} py={2} rounded="10px 10px 0 10px">
        {msg.content}
      </Text>
      <Avatar src={user?.avatar_url || undefined} size="sm" />
    </Flex>
  ) : (
    <Flex w="100%" align="flex-end" gap={4}>
      <Icon as={SiOpenai} boxSize={8} />
      <Text bg="gray.900" px={4} py={2} rounded="10px 10px 10px 0">
        {msg.content}
      </Text>
    </Flex>
  )
}

const Chat = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const [messages, setMessages] = React.useState(startMessages)
  const reversed = React.useMemo(() => [...messages].reverse(), [messages])

  const [input, setInput] = React.useState('')
  const handleInputChange = React.useCallback(({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(value)
    if (textareaRef.current)
      textareaRef.current.style.height = !value ? 'auto' : `${textareaRef.current?.scrollHeight}px`
  }, [])

  const [selectedChat, setSelectedChat] = React.useState('')
  React.useEffect(() => {
    setSelectedChat(chats[0].id)
  }, [])
  const handleChatChange = React.useCallback(
    (v: SingleValue<SelectOption>) => v?.value && setSelectedChat(v?.value),
    []
  )

  const handleSend = React.useCallback(() => {
    if (!input) return
    setMessages((prev) => [
      ...prev,
      {role: 'user', content: input},
      {role: 'assistant', content: 'Random response'},
    ])
    setInput('')
  }, [input])

  const chatOptions: SelectOption[] = React.useMemo(
    () => chats.map((c) => ({value: c.id, label: c.name})),
    []
  )

  return (
    <Flex bg="blackAlpha.600" w="100%" py={4} gap={6} h="100vh" direction="column">
      <HStack px={4}>
        <Box flex={1}>
          <Select
            placeholder="Chat"
            value={chatOptions?.filter((s) => s.value === selectedChat)}
            options={chatOptions}
            onChange={handleChatChange}
            styles={selectStyles}
          />
        </Box>
        <Tooltip label="Nowy chat">
          <IconButton aria-label="new-chat" icon={<AddIcon />} />
        </Tooltip>
      </HStack>
      <Flex px={4} h="100%" direction="column-reverse" gap={4} overflowY="auto">
        {reversed.map((m, i) => (
          <Message key={i} msg={m} />
        ))}
      </Flex>
      <Flex px={4} position="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          placeholder="Zadaj pytanie..."
          onChange={handleInputChange}
          resize="none"
          minH="72px"
          maxH="250px"
          bg="gray.800"
          fontSize="lg"
        />
        <IconButton
          position="absolute"
          aria-label="send-msg"
          icon={<IoSend />}
          right={9}
          bottom={4}
          zIndex="tooltip"
          onClick={handleSend}
          isDisabled={!input}
        />
      </Flex>
    </Flex>
  )
}

export default Chat
