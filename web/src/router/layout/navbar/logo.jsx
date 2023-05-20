import {Flex, Heading} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {HOME} from '../../paths'
import LogoIcon from './logo-icon'

const Logo = () => (
  <Flex as={Link} to={HOME} align="center" gap={2}>
    <Heading size="lg" fontStyle="italic">
      SwiftBoard
    </Heading>
    <LogoIcon boxSize="32px" color="white" />
  </Flex>
)

export default Logo
