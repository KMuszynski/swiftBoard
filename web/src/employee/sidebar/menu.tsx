import * as React from 'react'

import {Avatar, HStack, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import useLoadingState from '@/common/hooks/use-loading-state'

const toasts = {
  onErrorToast: 'Wylogowywanie nie powiodło się',
}

const UserMenu = () => {
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
          <Avatar size="sm" src={user.avatar_url || undefined} />
          <Text whiteSpace="nowrap">{user.full_name}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleSignOut} isDisabled={loading}>
          Wyloguj się
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
