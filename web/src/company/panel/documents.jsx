import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'

const Documents = () => {
  const items = [
    {
      name: 'Przepisy BHP',
      url: 'test',
    },
    {
      name: 'Privacy policy',
      url: 'test',
    },
    {
      name: 'Role w firmie',
      url: 'test',
    },
  ]

  return (
    <TableContainer fontSize="2xl" w="8xl" m="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nazwa</Th>
            <Th>Podgląd</Th>
            <Th isNumeric>Taski</Th>
            <Th isNumeric>Punkty</Th>
            <Th>
              <Button display="block" m="auto">
                Dodaj pracownika
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, id) => (
            <Tr key={id}>
              <Td>{item.name}</Td>
              <Td>{item.position}</Td>
              <Td isNumeric>
                {item.tasksEnded}/{item.allTasks}
              </Td>
              <Td isNumeric>{item.points}</Td>
              <Td>
                <Button display="flex" m="auto" size="sm" fontSize="4xl">
                  +
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Documents
