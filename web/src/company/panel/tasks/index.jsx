import {useEffect, useState} from 'react'

import {AddIcon, DeleteIcon, EditIcon, HamburgerIcon, SearchIcon} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import AddTaskModal from './add-modal'
import fetchTasks from './fetching-tasks'

const Tasks = () => {
  const [filter, setFilter] = useState('')
  const [tasks, setTasks] = useState(null)

  const user = useAppSelector(selectProfile)

  useEffect(() => {
    fetchTasks(setTasks, user.company)
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const tasksFiltered = tasks?.filter((task) => {
    return task.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleDelete = async (id) => {
    try {
      const {data, error} = await supabase.from('tasks').delete().eq('id', id).select()
      if (error) throw error

      if (data) {
        setTasks(
          tasks.filter((task) => {
            console.log(task.id)
            console.log(data)
            return task.id !== data[0].id
          })
        )
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Błąd.',
        description: 'Nie można usunąć zadania.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setTasks(null)
    }
  }

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Center>
      <Stack spacing={5} w="3xl" pt="8">
        <Flex>
          <InputGroup size="lg" mb={4} rounded="3xl">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              variant="filled"
              placeholder="Wyszukaj zadanie"
              value={filter}
              onChange={handleFilterChange}
            />
          </InputGroup>
          <IconButton
            aria-label="Add task"
            variant="ghost"
            icon={<AddIcon />}
            size="lg"
            ml={4}
            onClick={onOpen}
          />
          <AddTaskModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} setTasks={setTasks} />
        </Flex>
        {tasksFiltered &&
          tasksFiltered.map((task, id) => (
            <SingleTask task={task} id={id} key={id} handleDelete={handleDelete} />
          ))}
      </Stack>
    </Center>
  )
}

const SingleTask = ({task, handleDelete}) => {
  return (
    <Box bg="gray.700" rounded="3xl" boxShadow="2xl">
      <Accordion allowToggle m={1}>
        <AccordionItem border="none">
          <Flex align="center">
            <AccordionButton mr="3">
              <Box as="span" flex="1" textAlign="left">
                <Heading as="h3" size="md">
                  {task.name}
                </Heading>
                <Divider mb={2} mt={4} />
                <Text>
                  {task.min_points}-{task.max_points} punktów
                </Text>
              </Box>
              <AccordionIcon ml="5" />
            </AccordionButton>
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="ghost" size="lg" mr={3} />
              <MenuList>
                <MenuItem icon={<EditIcon />} onClick={null}>
                  Edytuj zadanie
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={() => handleDelete(task.id)}>
                  Usuń zadanie
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <AccordionPanel pb={2}>{task.description}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Tasks
