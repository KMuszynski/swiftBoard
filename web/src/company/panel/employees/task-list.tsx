import React from 'react'

import {Stack, Text} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'

import {EmployeeTask} from '@/api/models'
import {useListQuery} from '@/common/hooks'

const EmployeeDetails = () => {
  const {id} = useParams()
  const [tasks, loading, fetch] = useListQuery<EmployeeTask>(
    React.useMemo(
      () => ({
        from: 'employee_tasks',
        match: {user: id},
      }),
      [id]
    )
  )

  console.log(tasks)

  return (
    <Stack>
      <Text>Zadania pracownika</Text>
      {tasks?.map((t) => (
        <Text>{t.name}</Text>
      ))}
    </Stack>
  )
}

export default EmployeeDetails
