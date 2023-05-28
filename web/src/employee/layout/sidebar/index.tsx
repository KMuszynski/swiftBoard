import {Avatar, Box, Divider, Flex, HStack, Spacer, Stack, Text} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import Logo from '@/router/layout/navbar/logo'
import {useAppSelector} from '@/store'

import UserMenu from './menu'
import SignOutButton from './sign-out-button'
import TasksList from './tasks-list'
import ToolsList from './tools-list'

const EmployeeSidebar = () => {
  const user = useAppSelector(selectProfile)
  return !user ? null : (
    <Stack spacing={0} w="100%" bg="rgba(23, 25, 35, 0.5)">
      <Flex w="100%" justify="center" p={2}>
        <Logo />
      </Flex>
      <HStack p={4} spacing={4}>
        <Avatar size="md" src={user.avatar_url || undefined} />
        <Flex direction="column">
          <Text whiteSpace="nowrap">{user.full_name}</Text>
          <Text whiteSpace="nowrap" fontSize="sm" opacity={0.8}>
            {user.position}
          </Text>
        </Flex>
      </HStack>
      <Divider />
      <Stack p={4} overflowY="auto">
        <UserMenu />
        <Divider />
        <TasksList />
        <Divider />
        <ToolsList />
      </Stack>
      <Spacer />
      <Divider />
      <Box p={2} w="100%">
        <SignOutButton />
      </Box>
    </Stack>
  )
}

export default EmployeeSidebar
