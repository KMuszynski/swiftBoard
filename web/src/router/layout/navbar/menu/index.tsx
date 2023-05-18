import {Box} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import SignInMenu from './signin-menu'
import UserMenu from './user-menu'

const NavbarMenu = () => {
  const user = useAppSelector(selectProfile)

  return <Box zIndex="popover">{user ? <UserMenu /> : <SignInMenu />}</Box>
}

export default NavbarMenu
