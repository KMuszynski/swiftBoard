import * as React from 'react'

import {Avatar, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tag, Text} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import useLoadingState from '@/common/hooks/use-loading-state'
import {ADMIN_PANEL, USER_PROFILE} from '@/router/paths'

const toasts = {
  onErrorToast: 'Wylogowywanie nie powiodło się',
}

const NavbarMenu = () => {
  const navigate = useNavigate()
  const user = useSelector(selectProfile)

  const [handleSignOut, loading] = useLoadingState(
    React.useCallback(async () => {
      const {error} = await supabase.auth.signOut()
      if (error) throw error
      navigate('/', {replace: true})
    }, [navigate]),
    toasts
  )

  return !user ? null : (
    <Menu placement="bottom-end">
      <MenuButton rounded="full" cursor="pointer" minW={0}>
        <HStack spacing={4}>
          {user.role === 'admin' && <Tag colorScheme="red">admin</Tag>}
          <Text whiteSpace="nowrap">{user.email}</Text>
          <Avatar size="sm" src={user.avatar_url || undefined} />
        </HStack>
      </MenuButton>
      <MenuList zIndex="popover">
        <MenuItem as={Link} to={USER_PROFILE} isDisabled={loading}>
          Twoje konto
        </MenuItem>
        {user.role === 'admin' && (
          <MenuItem as={Link} to={ADMIN_PANEL} isDisabled={loading}>
            Panel administratora
          </MenuItem>
        )}
        <MenuDivider />
        <MenuItem onClick={handleSignOut} isDisabled={loading}>
          Wyloguj się
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default NavbarMenu
