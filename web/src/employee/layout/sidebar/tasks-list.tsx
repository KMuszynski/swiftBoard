import {Button, Checkbox, HStack, Skeleton, Spacer, Stack, Text} from '@chakra-ui/react'
import {Link, generatePath} from 'react-router-dom'

import {EmployeeTask} from '@/api/models'
import {useListQuery} from '@/common/hooks'
import {EMPLOYEE_TASK} from '@/router/paths'

const TasksList = () => {
  const [tasks, loading] = useListQuery<EmployeeTask>({
    from: 'employee_tasks',
  })

  return (
    <Stack>
      <Text fontWeight="bold">Twoje zadania</Text>
      {loading ? (
        Array.from(Array(5), (_, i) => <Skeleton key={i} h="40px" rounded="md" />)
      ) : !tasks.length ? (
        <Text>Nie masz żadnych zadań!</Text>
      ) : (
        tasks.map((t, i) => (
          <Button
            key={i}
            as={Link}
            to={generatePath(EMPLOYEE_TASK, {id: t.id})}
            p={2}
            bg="gray.800"
            fontWeight={400}
            whiteSpace="normal"
            h="unset"
            minH="40px"
          >
            <HStack w="100%" textAlign="left" spacing={4}>
              <Checkbox isChecked={t.status === 'completed'} />
              <Text>{t.name}</Text>
              <Spacer />
              <Text>{t.points}</Text>
            </HStack>
          </Button>
        ))
      )}
    </Stack>
  )
}

export default TasksList
