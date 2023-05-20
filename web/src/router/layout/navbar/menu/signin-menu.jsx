import {Menu, MenuButton, MenuList, Text, useColorModeValue} from '@chakra-ui/react'

import SignInForm from '../../../../auth/signin/form'

const SignInMenu = () => (
  <Menu placement="bottom-end" isLazy>
    <MenuButton
      p={2}
      rounded="md"
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.700'),
        textDecoration: 'none',
      }}
      fontSize="sm"
      cursor="pointer"
    >
      <Text whiteSpace="nowrap">Zaloguj się</Text>
    </MenuButton>
    <MenuList minWidth={300} p={3}>
      <SignInForm />
    </MenuList>
  </Menu>
)

export default SignInMenu
