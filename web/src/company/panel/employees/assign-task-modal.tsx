import React, {useState} from 'react'

import {FormControl, FormLabel, Input} from '@chakra-ui/react'
import Select, {SingleValue} from 'react-select'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import EditorModal from '@/common/components/editor-modal'
import {useLoadingState} from '@/common/hooks'
import {useAppSelector} from '@/store'
import {selectStyles} from '@/theme/components/select'
import {CommonModalProps, SelectOption} from '@/utils/types'

const AssignTaskModal = ({userID, open, onClose, onComplete}: CommonModalProps & {userID: string}) => {
  const user = useAppSelector(selectProfile)

  const [deadline, setDeadline] = useState('')
  const [selectedTask, setSelectedTask] = useState('')

  React.useEffect(() => {
    setDeadline('')
    setSelectedTask('')
  }, [open])

  const [tasks, setTasks] = useState<SelectOption[]>([])
  const [fetchTasks, fetchingTasks] = useLoadingState(
    React.useCallback(async () => {
      if (!user?.company || !userID) return

      const {data, error} = await supabase.rpc('get_user_assignable_tasks', {
        company_id: user.company,
        user_id: userID,
      })
      if (error) throw error

      setTasks(data?.map((t) => ({value: t.id, label: t.name})) || [])
    }, [userID, user])
  )
  React.useEffect(() => {
    fetchTasks()
  }, [userID])

  const handleTaskChange = React.useCallback((v: SingleValue<SelectOption>) => {
    setSelectedTask(v?.value ?? '')
  }, [])

  const [handleSubmit, loading] = useLoadingState(
    React.useCallback(async () => {
      const {error} = await supabase
        .from('user_tasks')
        .insert({user: userID, task: selectedTask, deadline: deadline || null})
      if (error) throw error
      onComplete && onComplete()
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
      <FormControl mt={4}>
        <FormLabel>Wybierz zadanie</FormLabel>
        <Select
          placeholder="Zadanie"
          value={tasks.filter((s) => s.value === selectedTask)}
          options={tasks}
          onChange={handleTaskChange}
          styles={selectStyles}
          isDisabled={loading}
          isLoading={fetchingTasks}
        />
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
