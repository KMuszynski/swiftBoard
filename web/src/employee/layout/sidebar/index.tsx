import {Avatar, Divider, Flex, HStack, Spacer, Stack, Text} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import UserMenu from './menu'
import SignOutButton from './sign-out-button'
import TasksList from './tasks-list'
import ToolsList from './tools-list'

const EmployeeSidebar = () => {
  const user = useAppSelector(selectProfile)
  return !user ? null : (
    <Stack p={4} spacing={6} w="100%" bg="rgba(23, 25, 35, 0.5)">
      <HStack spacing={4}>
        <Avatar size="md" src={user.avatar_url || undefined} />
        <Flex direction="column">
          <Text whiteSpace="nowrap">{user.full_name}</Text>
          <Text whiteSpace="nowrap" fontSize="sm" opacity={0.8}>
            {user.position}
          </Text>
        </Flex>
      </HStack>
      <Stack overflowY="auto">
        <Divider />
        <UserMenu />
        <Divider />
        <TasksList />
        <Divider />
        <ToolsList />
      </Stack>
      <Spacer />
      <SignOutButton />
    </Stack>
  )
}

export default EmployeeSidebar
