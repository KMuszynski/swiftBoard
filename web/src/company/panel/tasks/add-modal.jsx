import React, {useState} from 'react'

import {
  Box,
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
  Textarea,
  useToast,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import fetchTasks from './fetching-tasks'

const AddTaskModal = ({isOpen, onOpen, onClose, setTasks}) => {
  const initialRef = React.useRef(null)
  const toast = useToast()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [maxPoints, setMaxPoints] = useState('')
  const [minPoints, setMinPoints] = useState('')

  const user = useAppSelector(selectProfile)

  const handleSubmit = async (e) => {
    const {data, error} = await supabase
      .from('tasks')
      .insert([{company: user.company, name, description, max_points: maxPoints, min_points: minPoints}])

    if (error) {
      console.log(error)
      toast({
        title: 'Task nie dodany.',
        description: 'Dodanie nowego taska nie powiodło się.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Task dodany.',
        description: 'Nowy task został pomyślnie dodany.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      fetchTasks(setTasks, user.company)
      onClose()
    }
  }

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stwórz nowego taska</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tytuł</FormLabel>
              <Input
                ref={initialRef}
                placeholder="tytuł"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Opis</FormLabel>
              <Textarea
                placeholder="opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Maksymalna iczba punktów</FormLabel>
              <Input
                placeholder="maksymalna liczba punktów"
                type="number"
                value={maxPoints}
                onChange={(e) => setMaxPoints(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Minimalna iczba punktów</FormLabel>
              <Input
                placeholder="minimalna liczba punktów"
                type="number"
                value={minPoints}
                onChange={(e) => setMinPoints(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isDisabled={!name || !description || !maxPoints || !minPoints || minPoints > maxPoints}
            >
              Zapisz
            </Button>
            <Button onClick={onClose}>Anuluj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTaskModal
