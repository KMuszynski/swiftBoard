import React from 'react'

import {Flex, Heading, Stack} from '@chakra-ui/react'
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
          <Flex color="black">{task?.description}</Flex>
        </>
      )}
    </Stack>
  )
}

export default TaskViewer
