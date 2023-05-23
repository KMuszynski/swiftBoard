import {Flex} from '@chakra-ui/react'

import Logo from './logo'
import NavbarMenu from './menu'

const Navbar = () => (
  <Flex p={4} minH="60px" boxShadow="lg" bg="gray.800">
    <Flex w="100%" align="center" justify="space-between">
      <Logo />
      <NavbarMenu />
    </Flex>
  </Flex>
)

export default Navbar
