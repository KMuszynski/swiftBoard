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

const AddTaskModal = ({isOpen, onOpen, onClose}) => {
  const initialRef = React.useRef(null)
  const toast = useToast()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('')

  const user = useAppSelector(selectProfile)
  const company = user.company
  const pointsBigInt = BigInt(points)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !points) {
      toast({
        title: 'Błąd. ',
        description: 'Uzupełnij wszystkie pola.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const {data, error} = await supabase
      .from('tasks')
      .insert([{company, name, description, points: {pointsBigInt}}])

    if (error) {
      console.log(error)
      toast({
        title: 'Task nie dodany.',
        description: 'Dodanie nowego taska nie powiodło się.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    if (data) {
      console.log(data)
      toast({
        title: 'Task dodany.',
        description: 'Nowy task został pomyślnie dodany.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
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
              <FormLabel>Liczba punktów</FormLabel>
              <Input
                placeholder="liczba punktów"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
