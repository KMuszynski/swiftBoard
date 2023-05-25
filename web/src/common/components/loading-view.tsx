import {Center} from '@chakra-ui/layout'
import {Flex, Spinner, SpinnerProps, Text} from '@chakra-ui/react'

const LoadingView = ({label, ...rest}: SpinnerProps & {label?: string}) => (
  <Center h="100%" w="100%">
    <Flex direction="column" align="center">
      <Spinner size="xl" {...rest} />
      <Text fontSize="xl" mt="5">
        {label ?? 'Ładowanie...'}
      </Text>
    </Flex>
  </Center>
)

export default LoadingView
