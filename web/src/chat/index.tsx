import React from 'react'

import {AddIcon} from '@chakra-ui/icons'
import {Box, Flex, HStack, IconButton, Textarea, Tooltip} from '@chakra-ui/react'
import {IoSend} from 'react-icons/io5'
import Select, {SingleValue} from 'react-select'

import {ChatMessage} from '@/api/models'
import {useLoadingState} from '@/common/hooks'
import {OPENAI_API_KEY, OPENAI_API_URL} from '@/constants'
import {useAppDispatch, useAppSelector} from '@/store'
import {selectStyles} from '@/theme/components/select'
import {SelectOption} from '@/utils/types'

import {LoadingMessage, Message} from './message'
import {selectPrompts, setPrompts} from './state'

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

const Chat = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const prompts = useAppSelector(selectPrompts)
  const dispatch = useAppDispatch()
  const reversed = React.useMemo(() => [...prompts].reverse(), [prompts])

  const [input, setInput] = React.useState('')

  // resize textare on input change
  React.useEffect(() => {
    const taRef = textareaRef.current
    if (taRef) {
      taRef.style.height = '72px'
      taRef.style.height = `${taRef?.scrollHeight + 2}px`
    }
  }, [input])

  const [selectedChat, setSelectedChat] = React.useState('')
  React.useEffect(() => {
    setSelectedChat(chats[0].id)
  }, [])
  const handleChatChange = React.useCallback(
    (v: SingleValue<SelectOption>) => v?.value && setSelectedChat(v?.value),
    []
  )

  const [handleSend, loading] = useLoadingState(
    React.useCallback(async () => {
      // if input is only whitespace - clear it and return
      if (!/\S/.test(input)) {
        setInput('')
        return
      }

      if (!OPENAI_API_KEY) throw new Error('No OpenAI API Key')

      const newPrompts: ChatMessage[] = [...prompts, {role: 'user', content: input}]
      dispatch(setPrompts(newPrompts))
      setInput('')

      const response = await fetch(OPENAI_API_URL + '/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newPrompts,
          max_tokens: 200,
        }),
      })
      const data = await response.json()

      if (!data?.choices.length) throw new Error('Invalid chat response')
      let msg = data?.choices[0]?.message?.content
      if (!msg) throw new Error('Invalid chat response')

      const finishReason = data?.choices[0]?.finish_reason
      if (finishReason === 'length') msg += '...'

      dispatch(setPrompts([...newPrompts, {role: 'assistant', content: msg}]))
    }, [dispatch, input, prompts]),
    {
      onErrorToast: 'Wysyłanie wiadomości nie powiodło się',
    }
  )

  const handleEnter = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const chatOptions: SelectOption[] = React.useMemo(
    () => chats.map((c) => ({value: c.id, label: c.name})),
    []
  )

  return (
    <Flex w="100%" py={4} gap={6} h="100%" direction="column">
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
        {loading && <LoadingMessage />}
        {reversed.map((m, i) => (
          <Message key={i} msg={m} />
        ))}
      </Flex>
      <Flex px={4} position="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          placeholder="Zadaj pytanie..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
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
          isDisabled={!input || loading}
        />
      </Flex>
    </Flex>
  )
}

export default Chat
