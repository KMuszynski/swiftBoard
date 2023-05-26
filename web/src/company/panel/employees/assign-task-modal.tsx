import React, {useState} from 'react'

import {FormControl, FormLabel, Input, Select} from '@chakra-ui/react'

import {supabase} from '@/api'
import {Task} from '@/api/models'
import {selectProfile} from '@/auth/state'
import EditorModal from '@/common/components/editor-modal'
import {useListQuery, useLoadingState} from '@/common/hooks'
import {useAppSelector} from '@/store'
import {CommonModalProps} from '@/utils/types'

const AssignTaskModal = ({open, onClose, userID}: CommonModalProps & {userID: string}) => {
  const user = useAppSelector(selectProfile)
  const [tasks, fetchingTasks] = useListQuery<Task>(
    React.useMemo(
      () => ({
        from: 'tasks',
        order: ['created_at'],
        match: {company: user?.company || ''},
      }),
      [user]
    )
  )

  const [deadline, setDeadline] = useState('')
  const [selectedTask, setSelectedTask] = useState('')

  const [handleSubmit, loading] = useLoadingState(
    React.useCallback(async () => {
      const {error} = await supabase.from('user_tasks').insert([{task: selectedTask, deadline, user: userID}])
      if (error) throw error
      onClose()
    }, [userID, selectedTask, deadline]),
    {
      onErrorToast: 'Nie udało się przydzielić zadania',
      onSuccessToast: 'Pomyślnie przydzielono zadanie',
    }
  )

  return (
    <EditorModal
      title="Przydziel zadanie pracownikowi"
      isOpen={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <FormLabel>Wybierz zadanie</FormLabel>
      <FormControl mt={4}>
        <Select
          variant="filled"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          placeholder="wybierz zadanie"
          isDisabled={fetchingTasks || loading}
        >
          {tasks?.map((task, i) => (
            <option key={i} value={task.id}>
              {task.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Deadline</FormLabel>
        <Input
          placeholder="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          isDisabled={loading}
        />
      </FormControl>
    </EditorModal>
  )
}

export default AssignTaskModal
