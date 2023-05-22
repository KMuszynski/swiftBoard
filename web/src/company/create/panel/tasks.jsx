import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'

const Tasks = () => {
  const items = [
    {
      name: 'Wprowadzenie do firmy',
      points: 20,
    },
    {
      name: 'Zapoznanie z narzędziami pracy',
      points: 15,
    },
    {
      name: 'Szkolenie z zasad bezpieczeństwa',
      points: 10,
    },
  ]

  return (
    <TableContainer w="4xl" m="auto" fontSize="2xl">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nazwa</Th>
            <Th isNumeric>Punkty</Th>
            <Th>
              <Button display="block" m="auto">
                Dodaj zadanie
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, id) => (
            <Tr key={id}>
              <Td>{item.name}</Td>
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

export default Tasks
