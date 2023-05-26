import React from 'react'

import {
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import {CompanyEmployee} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useListQuery} from '@/common/hooks'
import {useAppSelector} from '@/store'

import AddTaskUser from './add-task-to-user'
import EmployeeEditorModal from './editor-modal'

const Employees = () => {
  const editorModal = useDisclosure()
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
              <Th>
                <Button display="block" m="auto" onClick={editorModal.onOpen}>
                  Dodaj pracownika
                </Button>
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
              employees.map((item, i) => <Row key={i} item={item} />)
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <EmployeeEditorModal
        open={editorModal.isOpen}
        onClose={editorModal.onClose}
        onComplete={fetch}
        item={null}
        company={user.company}
      />
    </>
  )
}

const Row = ({item}: {item: CompanyEmployee}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const finishedTasks = React.useMemo(
    () => item.task_statuses?.filter((s) => s !== 'assigned').length || 0,
    [item]
  )
  return (
    <Tr>
      <Td>{item.full_name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.position}</Td>
      <Td isNumeric>
        {finishedTasks}/{(item.task_statuses?.length || 0) - finishedTasks}
      </Td>
      <Td isNumeric>{item.points}</Td>
      <Td>
        <Button display="flex" m="auto" size="sm" fontSize="4xl" onClick={onOpen}>
          +
        </Button>
        <AddTaskUser isOpen={isOpen} onClose={onClose} userId={item.id} />
      </Td>
    </Tr>
  )
}

export default Employees
