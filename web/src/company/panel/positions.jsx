import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'

const Positions = () => {
  const items = [
    {
      position: 'Frontend Developer',
    },
    {
      position: 'Backend Developer',
    },
    {
      position: 'Full Stack Developer',
    },
    {
      position: 'UI/UX Designer',
    },
    {
      position: 'Product Manager',
    },
  ]

  return (
    <TableContainer fontSize="2xl" w="xl" m="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Pozycja</Th>
            <Th>
              <Button display="block" m="auto">
                Dodaj pozycję
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, id) => (
            <Tr key={id}>
              <Td>{item.position}</Td>
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

export default Positions
