import React from 'react'

import {Box, Flex, HStack, Heading, Text} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import {useParams} from 'react-router-dom'

import {setPrompts} from '@/chat/state'
import {useAppDispatch} from '@/store'

import {tools} from '../constants'

const ToolViewer = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const tool = React.useMemo(() => tools.find((t) => t.id === id), [id])

  React.useEffect(() => {
    dispatch(
      setPrompts([
        {
          role: 'system',
          content:
            'You are a helpful assistan. In the next message I will provide a text document, you should remember its contents, because the user will ask about it.',
        },
        {role: 'system', content: tool?.description || ''},
        {role: 'assistant', content: `Witaj! Masz jakieś pytania do narzędzia: ${tool?.name}?`},
      ])
    )
  }, [tool, dispatch])

  return (
    <Flex direction="column" w="100%" h="100vh" bg="gray.700" align="center">
      <HStack px={4} py={2} bg="gray.900" boxShadow="lg" w="100%" justify="space-between">
        <Heading size="lg">{tool?.name}</Heading>
      </HStack>
      <Flex p={6} direction="column" overflowY="auto" w="100%" align="center" fontSize="lg" color="white">
        <Box maxW="container.md">
          {tool?.description ? (
            <ReactMarkdown children={tool.description} components={ChakraUIRenderer()} skipHtml />
          ) : (
            <Text>Narzedzie nie ma opisu :O</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default ToolViewer
