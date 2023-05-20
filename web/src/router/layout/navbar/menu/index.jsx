import {Box} from '@chakra-ui/react'
import {useSelector} from 'react-redux'

import {selectProfile} from '../../../../auth/state'
import SignInMenu from './signin-menu'
import UserMenu from './user-menu'

const NavbarMenu = () => {
  const user = useSelector(selectProfile)

  return <Box zIndex="popover">{user ? <UserMenu /> : <SignInMenu />}</Box>
}

export default NavbarMenu
