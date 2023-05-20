import {Box} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {Outlet} from 'react-router'

import {selectProfile} from '../../auth/state'
import LoggedOutView from '../pages/logged-out-view'
import Navbar from './navbar'

const Layout = () => {
  const user = useSelector(selectProfile)

  return (
    <Box bg="gray.900">
      {user ? (
        <>
          <Navbar />
          <Box w="100%" p={4} minH="calc(100vh - 68px)">
            <Outlet />
          </Box>
        </>
      ) : (
        <LoggedOutView />
      )}
    </Box>
  )
}

export default Layout
