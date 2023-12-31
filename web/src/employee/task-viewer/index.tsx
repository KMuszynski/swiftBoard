import React from 'react'

import {Box, Flex, HStack, Heading, Stack, Text} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import {useParams} from 'react-router-dom'

import {EmployeeTask} from '@/api/models'
import {setPrompts} from '@/chat/state'
import LoadingView from '@/common/components/loading-view'
import {useGetQuery} from '@/common/hooks'
import {useAppDispatch} from '@/store'
import {formatTimestamp} from '@/utils/string'

const TaskViewer = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const [task, loading] = useGetQuery<EmployeeTask>(
    React.useMemo(
      () => ({
        from: 'employee_tasks',
        match: {id},
      }),
      [id]
    )
  )

  React.useEffect(() => {
    dispatch(
      setPrompts([
        {
          role: 'system',
          content:
            'You are a helpful assistan. In the next message you will receive a text document, you should remember its contents, because the user will ask about it.',
        },
        {role: 'system', content: task?.description || ''},
        {role: 'assistant', content: `Witaj! Masz jakieś pytania do zadania: ${task?.name}?`},
      ])
    )
  }, [task, dispatch])

  return (
    <Flex direction="column" w="100%" h="100vh" bg="gray.700" align="center">
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <HStack px={4} py={2} bg="gray.900" boxShadow="lg" w="100%" justify="space-between">
            <Heading size="lg">{task?.name}</Heading>
            <Heading size="lg">{task?.points}pkt</Heading>
          </HStack>
          <Flex p={6} direction="column" overflowY="auto" w="100%" align="center" fontSize="lg" color="white">
            <Stack align="center" mb={4}>
              {task?.assigned_at && <Text>Przypisane: {formatTimestamp(task.assigned_at)}</Text>}
              {task?.deadline && (
                <Text fontFamily="'Roboto'">Deadline: {formatTimestamp(task.deadline)}</Text>
              )}
            </Stack>
            <Box maxW="container.md">
              {task?.description ? (
                <ReactMarkdown children={task.description} components={ChakraUIRenderer()} skipHtml />
              ) : (
                <Text>Zadanie nie ma opisu :O</Text>
              )}
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default TaskViewer
