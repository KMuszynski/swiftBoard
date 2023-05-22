import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'

const Employees = () => {
  const items = [
    {
      name: 'Bartek Nowacki',
      position: 'fullstack',
      tasksEnded: 7,
      allTasks: 7,
      points: 100,
    },
    {
      name: 'Krzysztof Muszyński',
      position: 'fullstack',
      tasksEnded: 5,
      allTasks: 10,
      points: 70,
    },
    {
      name: 'Wojciech Mokwiński',
      position: 'fullstack',
      tasksEnded: 7,
      allTasks: 8,
      points: 70,
    },
  ]

  return (
    <TableContainer fontSize="2xl" w="8xl" m="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Imię</Th>
            <Th>Pozycja</Th>
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

export default Employees
