import React from 'react'

import {Button, Checkbox, Flex, HStack, Skeleton, Spacer, Stack, Text} from '@chakra-ui/react'
import {Link, generatePath, useParams} from 'react-router-dom'

import {supabase} from '@/api'
import {EmployeeTask} from '@/api/models'
import {useListQuery, useLoadingState} from '@/common/hooks'
import {EMPLOYEE_TASK} from '@/router/paths'

const TasksList = () => {
  const {id} = useParams()
  const [tasks, loading, fetch] = useListQuery<EmployeeTask>(
    React.useMemo(
      () => ({
        from: 'employee_tasks',
        order: ['status', 'deadline'],
      }),
      []
    )
  )

  const [handleTaskStatusChange, changingStatus] = useLoadingState(
    React.useCallback(async (task?: EmployeeTask) => {
      if (!task) return

      const status = task.status === 'completed' ? 'assigned' : 'completed'
      const {error} = await supabase
        .from('user_tasks')
        .update({status, completed_at: status === 'completed' ? new Date().toUTCString() : undefined})
        .match({task: task.id, user: task.user})
      if (error) throw error
      fetch()
    }, [])
  )
  console.log(tasks)

  return (
    <Stack>
      <Text fontWeight="bold">Twoje zadania</Text>
      {loading ? (
        Array.from(Array(5), (_, i) => <Skeleton key={i} h="40px" rounded="md" />)
      ) : !tasks.length ? (
        <Text>Nie masz żadnych zadań!</Text>
      ) : (
        tasks.map((t, i) => (
          <Flex
            key={i}
            bg={t.id === id ? 'whiteAlpha.300' : 'gray.800'}
            fontWeight={400}
            whiteSpace="normal"
            h="unset"
            minH="40px"
            w="100%"
            textAlign="left"
            transition="all 250ms ease"
            rounded="md"
            opacity={t.status === 'completed' ? 0.5 : 1}
            _hover={{
              bg: 'whiteAlpha.300',
            }}
            _active={{
              bg: 'whiteAlpha.100',
            }}
          >
            <Checkbox
              p={2}
              isChecked={t.status === 'completed'}
              isDisabled={changingStatus}
              onChange={() => handleTaskStatusChange(t)}
            />

            <Flex p={2} w="100%" as={Link} to={generatePath(EMPLOYEE_TASK, {id: t.id})}>
              <Text>{t.name}</Text>
              <Spacer />
              <Text>{t.points}</Text>
            </Flex>
          </Flex>
        ))
      )}
    </Stack>
  )
}

export default TasksList
