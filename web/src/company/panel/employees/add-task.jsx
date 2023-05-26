import React, {useState} from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import fetchTasks from '../tasks/fetching-tasks'

const AddTaskUser = ({isOpen, onClose, userId}) => {
  const user = useAppSelector(selectProfile)

  const [deadline, setDeadline] = useState('')
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState('')
  const initialRef = React.useRef(null)

  fetchTasks(setTasks, user?.company)

  const handleSubmit = async (e) => {
    const {data, error} = await supabase
      .from('user_tasks')
      .insert([{task: selectedTask, deadline, user: userId}])

    if (error) {
      console.log(error)
      toast({
        title: 'Zadanie nie dodane.',
        description: 'Dodanie nowego zadania nie powiodło się.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Zadanie dodane.',
        description: 'Nowe zadanie zostało pomyślnie dodane.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      fetchTasks(setTasks, user.company)
      onClose()
    }
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Przydziel zadanie</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormLabel>Wybierz zadanie</FormLabel>
          <FormControl mt={4}>
            <Select
              variant="filled"
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              placeholder="wybierz zadanie"
            >
              {tasks.map((task) => (
                <option value={task.id}>{task.name}</option>
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
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isDisabled={selectedTask === 'wybierz zadanie' || !selectedTask}
          >
            Zapisz
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddTaskUser
