import {useEffect, useState} from 'react'
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

import {supabase} from '@/api'
import {Task} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useListQuery} from '@/common/hooks'
import {emptyTask} from '@/company/costants'
import {useAppSelector} from '@/store'

import TaskEditorModal from './editor-modal'

const Tasks = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [task, setTask] = useState(emptyTask)
  const [filter, setFilter] = useState('')
  const user = useAppSelector(selectProfile)
  const [tasks, loading, fetch] = useListQuery<Task>(
    React.useMemo(
      () => ({
        from: 'tasks',
        order: ['created_at'],
        match: {company: user?.company || ''},
      }),
      [user]
    )
  )

  const handleFilterChange = (event) => setFilter(event.target.value)

  const tasksFiltered = tasks?.filter((task) => {
    return task.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleEdit = (index: number) => {
    setTask(tasks?.at(index) || emptyTask)
  }

  const handleDelete = async (id) => {
    try {
      const {data, error} = await supabase.from('tasks').delete().eq('id', id).select()
      if (error) throw error

      fetch()
    } catch (error) {
      console.log(error)
    }
  }

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
          {user?.company && (
            <TaskEditorModal
              item={task}
              company={user?.company}
              open={isOpen}
              onClose={onClose}
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
  )
}

const SingleTask = ({task, onEdit, onDelete}) => {
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
                <MenuItem icon={<EditIcon />} onClick={onEdit}>
                  Edytuj zadanie
                </MenuItem>

                <MenuItem icon={<DeleteIcon />} onClick={() => onDelete(task.id)}>
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
