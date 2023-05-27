import {Flex, Stack, Text} from '@chakra-ui/react'
import {Link, generatePath, useParams} from 'react-router-dom'

import {tools} from '@/employee/constants'
import {EMPLOYEE_TOOL} from '@/router/paths'

const ToolsList = () => {
  const {id} = useParams()

  return (
    <Stack>
      <Text fontWeight="bold">Twoje narzędzia</Text>
      {tools.map((t, i) => (
        <Flex
          key={i}
          bg={t.id === id ? 'whiteAlpha.300' : 'gray.800'}
          fontWeight={400}
          whiteSpace="normal"
          h="unset"
          minH="40px"
          w="100%"
          textAlign="left"
          transition="all 250ms ease"
          rounded="md"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
          _active={{
            bg: 'whiteAlpha.100',
          }}
          as={Link}
          to={generatePath(EMPLOYEE_TOOL, {id: t.id})}
        >
          <Flex p={2} w="100%">
            <Text>{t.name}</Text>
          </Flex>
        </Flex>
      ))}
    </Stack>
  )
}

export default ToolsList
