import {Button, Checkbox, HStack, Spacer, Stack, Text} from '@chakra-ui/react'

const tasks = [
  {
    id: '1',
    name: 'Task 1',
    status: 'assigned',
    points: 2,
  },
  {
    id: '2',
    name: 'Task 2',
    status: 'failed',
    points: 5,
  },
  {
    id: '3',
    name: 'Task 3',
    status: 'passed',
    points: 12,
  },
  {
    id: '4',
    name: 'Task 4',
    status: 'assigned',
    points: 8,
  },
]

const TasksList = () => {
  return (
    <Stack>
      <Text fontWeight="bold">Twoje zadania</Text>
      {tasks.map((t, i) => (
        <Button key={i} p={2} bg="gray.800">
          <HStack w="100%">
            <Checkbox isChecked={t.status === 'passed'} />
            <Text>{t.name}</Text>
            <Spacer />
            <Text>{t.points}</Text>
          </HStack>
        </Button>
      ))}
    </Stack>
  )
}

export default TasksList
