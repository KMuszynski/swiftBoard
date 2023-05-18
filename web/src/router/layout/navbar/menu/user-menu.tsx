import * as React from 'react'

import {Avatar, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tag, Text} from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom'

import {supabase} from '@/api'
import {Can} from '@/auth/abilities'
import {selectProfile} from '@/auth/state'
import {useLoadingState} from '@/common/hooks'
import {ADMIN_PANEL, USER_PROFILE} from '@/router/paths'
import {useAppSelector} from '@/store'

const toasts = {
  onErrorToast: 'Wylogowywanie nie powiodło się',
}

const UserMenu = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectProfile)

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
      <MenuList>
        <MenuItem as={Link} to={USER_PROFILE} isDisabled={loading}>
          Twoje konto
        </MenuItem>
        <Can I="access" an="AdminPanel">
          <MenuItem as={Link} to={ADMIN_PANEL} isDisabled={loading}>
            Panel administratora
          </MenuItem>
        </Can>
        <MenuDivider />
        <MenuItem onClick={handleSignOut} isDisabled={loading}>
          Wyloguj się
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
