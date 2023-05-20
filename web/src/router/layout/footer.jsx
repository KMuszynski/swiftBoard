import {Box, Button, Container, Flex, IconButton, Link, Stack, Text} from '@chakra-ui/react'
import {FaFacebookF, FaInstagram} from 'react-icons/fa'
import {Link as RouterLink} from 'react-router-dom'

import {CONTACT, FAQ, PRIVACY_POLICY, TERMS_AND_CONDITIONS} from '../paths'
import LogoIcon from './navbar/logo-icon'

const links = [
  {
    to: CONTACT,
    label: 'Kontakt',
  },
  {
    to: FAQ,
    label: 'FAQ',
  },
  {
    to: TERMS_AND_CONDITIONS,
    label: 'Regulamin',
  },
  {
    to: PRIVACY_POLICY,
    label: 'Polityka prywatności',
  },
]

const socialButtonStyles = {
  variant: 'ghost',
  border: '2px solid',
  display: 'flex',
  rounded: 'full',
  _hover: {
    bg: 'white',
    color: 'gray.800',
  },
}

const Footer = () => (
  <Flex bg="gray.800" color="white">
    <Container py={8} maxW="container.xl">
      <Flex align="center" justify="space-between" gap={4}>
        <Flex align="center" gap={4}>
          <LogoIcon boxSize={16} color="white" />
          <Box alignSelf="stretch" w="2px" bg="white" />
          <Flex gap={2}>
            <IconButton
              {...socialButtonStyles}
              as={Link}
              href="https://www.facebook.com/swiftboard"
              target="_blank"
              icon={<FaFacebookF />}
              aria-label="Strona na Facebooku"
            />
            <IconButton
              {...socialButtonStyles}
              as={Link}
              href="https://www.facebook.com/swiftboard"
              target="_blank"
              icon={<FaInstagram />}
              aria-label="Strona na Facebooku"
            />
          </Flex>
        </Flex>
        <Stack align="flex-end" spacing={4}>
          <Flex gap={4}>
            {links.map((l) => (
              <Button key={l.to} as={RouterLink} to={l.to} variant="link" color="white">
                {l.label}
              </Button>
            ))}
          </Flex>
          <Text>© 2023 SwiftBoard</Text>
        </Stack>
      </Flex>
    </Container>
  </Flex>
)

export default Footer
