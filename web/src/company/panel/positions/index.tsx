import React from 'react'

import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {
  Button,
  HStack,
  IconButton,
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

import {CompanyPosition} from '@/api/models'
import {selectProfile} from '@/auth/state'
import DeleteResourceDialog from '@/common/components/delete-resource-dialog'
import {useListQuery} from '@/common/hooks'
import {emptyPosition} from '@/company/costants'
import {useAppSelector} from '@/store'

import PositionEditorModal from './editor-modal'

const Positions = () => {
  const user = useAppSelector(selectProfile)

  const [positions, _, fetch] = useListQuery<CompanyPosition>(
    React.useMemo(
      () => ({
        from: 'company_positions',
        order: ['created_at'],
        match: {company: user?.company || ''},
      }),
      [user]
    )
  )

  const editorModal = useDisclosure()
  const deleteDialog = useDisclosure()
  const [position, setPosition] = React.useState(emptyPosition)

  const handleAdd = React.useCallback(() => {
    setPosition(emptyPosition)
    editorModal.onOpen()
  }, [])
  const handleEdit = React.useCallback(
    (id: string) => {
      setPosition(positions.find((e) => e.id === id) ?? emptyPosition)
      editorModal.onOpen()
    },
    [positions]
  )
  const handleDelete = React.useCallback(
    (id: string) => {
      setPosition(positions.find((e) => e.id === id) ?? emptyPosition)
      deleteDialog.onOpen()
    },
    [positions]
  )

  return (
    <>
      <TableContainer fontSize="2xl" w="xl" m="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Pozycja</Th>
              <Th isNumeric>
                <Button onClick={handleAdd}>Dodaj pozycję</Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {positions.map((item, i) => (
              <Tr key={i}>
                <Td>{item.name}</Td>
                <Td isNumeric>
                  <HStack justify="flex-end">
                    <Tooltip label="Edytuj stanowisko">
                      <IconButton
                        aria-label="edit-position"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => handleEdit(item.id || '')}
                      />
                    </Tooltip>
                    <Tooltip label="Usuń stanowisko">
                      <IconButton
                        aria-label="edit-position"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => handleDelete(item.id || '')}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <PositionEditorModal
        item={position}
        open={editorModal.isOpen}
        onClose={editorModal.onClose}
        company={user?.company || ''}
        onComplete={fetch}
      />
      <DeleteResourceDialog
        table="company_positions"
        id={position.id}
        onClose={deleteDialog.onClose}
        open={deleteDialog.isOpen}
        onComplete={fetch}
        headerText="Usunąć stanowisko?"
        name={position.name}
        onSuccessTitle="Stanowisko zostało usunięty"
        onFailTitle="Nie udało się usunąć stanowiska"
      />
    </>
  )
}

export default Positions
