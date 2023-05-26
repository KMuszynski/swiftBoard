import {useState} from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

const Positions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPosition, setNewPosition] = useState({
    position: '',
    responsibilities: '',
    description: '',
  })
  const [items, setItems] = useState([
    {
      position: 'Frontend Developer',
      responsibilities: 'Responsibilities for frontend development',
      description: 'Description of frontend developer role',
    },
    {
      position: 'Backend Developer',
      responsibilities: 'Responsibilities for backend development',
      description: 'Description of backend developer role',
    },
    {
      position: 'Full Stack Developer',
      responsibilities: 'Responsibilities for full stack development',
      description: 'Description of full stack developer role',
    },
    {
      position: 'UI/UX Designer',
      responsibilities: 'Responsibilities for UI/UX design',
      description: 'Description of UI/UX designer role',
    },
    {
      position: 'Product Manager',
      responsibilities: 'Responsibilities for product management',
      description: 'Description of product manager role',
    },
  ])
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [editPosition, setEditPosition] = useState(null)

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setNewPosition((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddPosition = () => {
    setItems((prevState) => [...prevState, newPosition])
    setNewPosition({
      position: '',
      responsibilities: '',
      description: '',
    })
    setIsModalOpen(false)
  }

  const handlePositionClick = (position) => {
    if (selectedPosition === position) {
      setSelectedPosition(null)
      setEditPosition(null)
    } else {
      setSelectedPosition(position)
      setEditPosition(null)
    }
  }

  const handleDeletePosition = (position) => {
    setItems((prevState) => prevState.filter((item) => item !== position))
    setSelectedPosition(null)
    setEditPosition(null)
  }

  const handleEditPosition = (position) => {
    setSelectedPosition(null)
    setEditPosition(position)
  }

  const handleSaveEditPosition = () => {
    setItems((prevState) =>
      prevState.map((item) => {
        if (item === editPosition) {
          return {
            ...item,
            position: selectedPosition.position,
            responsibilities: selectedPosition.responsibilities,
            description: selectedPosition.description,
          }
        }
        return item
      })
    )
    setSelectedPosition(null)
    setEditPosition(null)
  }

  return (
    <TableContainer fontSize="2xl" w="xl" m="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Pozycja</Th>
            <Th>
              <Button display="block" m="auto" onClick={() => setIsModalOpen(true)}>
                Dodaj pozycję
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, id) => (
            <Tr key={id}>
              <Td onClick={() => handlePositionClick(item)} _hover={{cursor: 'pointer', color: 'teal.500'}}>
                {item.position}
              </Td>
              <Td>
                <Button
                  display="flex"
                  m="auto"
                  size="sm"
                  fontSize="sm"
                  onClick={() => handleDeletePosition(item)}
                  colorScheme="red"
                  variant="outline"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj pozycję</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Pozycja</FormLabel>
              <Input type="text" name="position" value={newPosition.position} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Odpowiedzialności</FormLabel>
              <Textarea
                name="responsibilities"
                value={newPosition.responsibilities}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Wymagania</FormLabel>
              <Textarea name="description" value={newPosition.description} onChange={handleInputChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddPosition}>
              Dodaj
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {selectedPosition && (
        <Modal isOpen={Boolean(selectedPosition)} onClose={() => setSelectedPosition(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedPosition.position}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Odpowiedzialności</FormLabel>
                <Textarea
                  value={selectedPosition.responsibilities}
                  onChange={(e) =>
                    setSelectedPosition((prevPosition) => ({
                      ...prevPosition,
                      responsibilities: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Wymagania</FormLabel>
                <Textarea
                  value={selectedPosition.description}
                  onChange={(e) =>
                    setSelectedPosition((prevPosition) => ({
                      ...prevPosition,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleSaveEditPosition}>
                Zapisz
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </TableContainer>
  )
}

export default Positions
