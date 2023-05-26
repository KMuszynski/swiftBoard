import React from 'react'

import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {
  Button,
  HStack,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {CompanyEmployee} from '@/api/models'
import {selectProfile} from '@/auth/state'
import DeleteResourceDialog from '@/common/components/delete-resource-dialog'
import {useListQuery} from '@/common/hooks'
import {emptyEmployee} from '@/company/costants'
import {useAppSelector} from '@/store'

import AssignTaskModal from './assign-task-modal'
import EmployeeEditorModal from './editor-modal'

const Employees = () => {
  const user = useAppSelector(selectProfile)
  const [employees, loading, fetch] = useListQuery<CompanyEmployee>(
    React.useMemo(
      () => ({
        from: 'company_employees',
        order: ['full_name'],
        match: {company: user?.company},
      }),
      [user]
    )
  )

  const editorModal = useDisclosure()
  const assignTaskModal = useDisclosure()
  const deleteDialog = useDisclosure()
  const [employee, setEmployee] = React.useState(emptyEmployee)

  const handleAdd = React.useCallback(() => {
    setEmployee(emptyEmployee)
    editorModal.onOpen()
  }, [])
  const handleEdit = React.useCallback(
    (id: string) => {
      setEmployee(employees.find((e) => e.id === id) ?? emptyEmployee)
      editorModal.onOpen()
    },
    [employees]
  )
  const handleAssignTask = React.useCallback(
    (id: string) => {
      setEmployee(employees.find((e) => e.id === id) ?? emptyEmployee)
      editorModal.onOpen()
    },
    [employees]
  )
  const handleOpenDelete = React.useCallback(
    (id: string) => {
      setEmployee(employees.find((e) => e.id === id) ?? emptyEmployee)
      deleteDialog.onOpen()
    },
    [employees]
  )
  const handleDelete = React.useCallback(async () => {
    const {error, count} = await supabase
      .from('company_users')
      .delete({count: 'exact'})
      .match({user: employee.id, company: employee.company})
    if (error) throw error
    if (!count) throw new Error('No rows deleted')
  }, [employee])

  return !user?.company ? null : (
    <>
      <TableContainer fontSize="2xl" w="8xl" m="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Imię</Th>
              <Th>E-mail</Th>
              <Th>Rola</Th>
              <Th>Pozycja</Th>
              <Th isNumeric>Taski</Th>
              <Th isNumeric>Punkty</Th>
              <Th isNumeric>
                <Button onClick={handleAdd}>Dodaj pracownika</Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              employees.map((item, i) => (
                <Row
                  key={i}
                  item={item}
                  onEdit={handleEdit}
                  onAssignTask={handleAssignTask}
                  onDelete={handleOpenDelete}
                />
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <EmployeeEditorModal
        item={employee}
        onComplete={fetch}
        company={user.company}
        open={editorModal.isOpen}
        onClose={editorModal.onClose}
      />
      <AssignTaskModal
        open={assignTaskModal.isOpen}
        onClose={assignTaskModal.onClose}
        userID={employee.id ?? ''}
      />
      <DeleteResourceDialog
        table="company_users"
        onDelete={handleDelete}
        onClose={deleteDialog.onClose}
        open={deleteDialog.isOpen}
        onComplete={fetch}
        headerText="Usunąć pracownika?"
        name={employee?.full_name}
        onSuccessTitle="Pracownik został usunięty"
        onFailTitle="Nie udało się usunąć pracownika"
      />
    </>
  )
}

type RowProps = {
  item: CompanyEmployee
  onEdit: (id: string) => void
  onAssignTask: (id: string) => void
  onDelete: (id: string) => void
}

const Row = ({item, onEdit, onAssignTask, onDelete}: RowProps) => {
  const finishedTasks = React.useMemo(
    () => item.task_statuses?.filter((s) => s !== 'assigned').length || 0,
    [item]
  )
  return !item.id ? null : (
    <Tr>
      <Td>{item.full_name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.position_name}</Td>
      <Td isNumeric>
        {finishedTasks}/{(item.task_statuses?.length || 0) - finishedTasks}
      </Td>
      <Td isNumeric>{item.points}</Td>
      <Td isNumeric>
        <HStack justify="flex-end">
          <Tooltip label="Przydziel zadanie">
            <IconButton
              aria-label="assign-task"
              icon={<AddIcon />}
              size="sm"
              onClick={() => onAssignTask(item.id || '')}
            />
          </Tooltip>
          <Tooltip label="Edytuj pracownika">
            <IconButton
              aria-label="edit-employee"
              icon={<EditIcon />}
              size="sm"
              onClick={() => onEdit(item.id || '')}
            />
          </Tooltip>
          <Tooltip label="Usuń pracownika">
            <IconButton
              aria-label="edit-employee"
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => onDelete(item.id || '')}
            />
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  )
}

export default Employees
