import {Box, Image} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {Outlet} from 'react-router'

import {selectProfile} from '../../auth/state'
import LoggedOutView from '../pages/logged-out-view'
import Navbar from './navbar'
import gradientBg from '/gradient-bg-2.png'

const Layout = () => {
  const user = useSelector(selectProfile)

  return (
    <Box>
      {user ? (
        <>
          {/* TODO: separate layout for employee panel */}
          {user.company_role !== 'employee' && <Navbar />}
          <Box
            w="100%"
            minH={user.company_role !== 'employee' ? 'calc(100vh - 68px)' : '100vh'}
            position="relative"
          >
            <Outlet />
            <Image
              src={gradientBg}
              pos="absolute"
              w="100%"
              h="100%"
              opacity={0.2}
              top={0}
              left={0}
              pointerEvents="none"
              zIndex={-1}
            />
          </Box>
        </>
      ) : (
        <LoggedOutView />
      )}
    </Box>
  )
}

export default Layout
