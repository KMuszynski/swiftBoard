import {useState} from 'react'
import React from 'react'

import {AddIcon, DeleteIcon, EditIcon, HamburgerIcon, SearchIcon} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

import {Task} from '@/api/models'
import {selectProfile} from '@/auth/state'
import DeleteResourceDialog from '@/common/components/delete-resource-dialog'
import {useListQuery} from '@/common/hooks'
import {emptyTask} from '@/company/costants'
import {useAppSelector} from '@/store'

import TaskEditorModal from '../tasks/editor-modal'

const EmployeeDetails = () => {
  const [task, setTask] = useState(emptyTask)
  const [filter, setFilter] = useState('')
  const user = useAppSelector(selectProfile)
  const [tasks, _, fetch] = useListQuery<Task>(
    React.useMemo(
      () => ({
        from: 'tasks',
        order: ['created_at'],
        match: {company: user?.company || ''},
      }),
      [user]
    )
  )

  const editorModal = useDisclosure()
  const deleteDialog = useDisclosure()

  const handleFilterChange = (event) => setFilter(event.target.value)

  const tasksFiltered = tasks?.filter((task) => {
    return task.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleAdd = React.useCallback(() => {
    setTask(emptyTask)
    editorModal.onOpen()
  }, [])
  const handleEdit = React.useCallback(
    (id: string) => {
      setTask(tasks.find((t) => t.id === id) || emptyTask)
      editorModal.onOpen()
    },
    [tasks]
  )
  const handleDelete = React.useCallback(
    (id: string) => {
      setTask(tasks.find((t) => t.id === id) || emptyTask)
      deleteDialog.onOpen()
    },
    [tasks]
  )

  return (
    <>
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
              onClick={handleAdd}
            />
            {user?.company && (
              <TaskEditorModal
                item={task}
                company={user?.company}
                open={editorModal.isOpen}
                onClose={editorModal.onClose}
                onComplete={fetch}
              />
            )}
          </Flex>
          {tasksFiltered &&
            tasksFiltered.map((task, i) => (
              <SingleTask key={i} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </Stack>
      </Center>
      <DeleteResourceDialog
        table="tasks"
        id={task.id}
        onClose={deleteDialog.onClose}
        open={deleteDialog.isOpen}
        onComplete={fetch}
        headerText="Usunąć zadanie?"
        name={task.name}
        onSuccessTitle="Zadanie zostało usunięte"
        onFailTitle="Nie udało się usunąć zadania"
      />
    </>
  )
}

type SingleTaskProps = {
  task: Task
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const SingleTask = ({task, onEdit, onDelete}: SingleTaskProps) => {
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
                <MenuItem icon={<EditIcon />} onClick={() => onEdit(task.id)}>
                  Edytuj zadanie
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={() => onDelete(task.id)}>
                  Usuń zadanie
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <AccordionPanel pb={2}>
            <ReactMarkdown children={task.description} components={ChakraUIRenderer()} skipHtml />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default EmployeeDetails
