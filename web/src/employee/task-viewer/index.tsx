import React from 'react'

import {Heading, Stack} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import {useParams} from 'react-router-dom'

import {EmployeeTask} from '@/api/models'
import LoadingView from '@/common/components/loading-view'
import {useGetQuery} from '@/common/hooks'

const TaskViewer = () => {
  const {id} = useParams()
  const [task, loading] = useGetQuery<EmployeeTask>(
    React.useMemo(
      () => ({
        from: 'employee_tasks',
        match: {id},
      }),
      [id]
    )
  )

  return (
    <Stack w="100%" p={6} bg="gray.200" color="black" h="100vh" overflowY="auto">
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <Heading>{task?.name}</Heading>
          {task?.description && (
            <ReactMarkdown children={task.description} components={ChakraUIRenderer()} skipHtml />
          )}
        </>
      )}
    </Stack>
  )
}

export default TaskViewer
