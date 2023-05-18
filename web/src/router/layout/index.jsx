import {Container} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import Footer from './footer'
import Navbar from './navbar'

const Layout = () => (
  <>
    <Navbar />
    <Container maxW="container.xl" p={4} minH="calc(100vh - 116px)">
      <Outlet />
    </Container>
    <Footer />
  </>
)

export default Layout
