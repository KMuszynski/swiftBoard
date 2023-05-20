import {Box, Container} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import Footer from './footer.jsx'
import Navbar from './navbar'

const Layout = () => (
  <Box bg="gray.900">
    <Navbar />
    <Container maxW="container.xl" p={4} minH="calc(100vh - 96px)">
      <Outlet />
    </Container>
    <Footer />
  </Box>
)

export default Layout
