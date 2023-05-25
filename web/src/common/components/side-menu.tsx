import {Box, Button, Stack, Text, chakra} from '@chakra-ui/react'
import {NavLink} from 'react-router-dom'

const ChakraNavLink = chakra(NavLink)

export type SideMenuItem =
  | {
      label: string
      children: SideMenuItem[]
    }
  | ({
      label: string
      color?: string
      fontWeight?: number
    } & (
      | {
          link: string
          end?: boolean
          onClick?: never
        }
      | {
          link?: never
          end?: never
          onClick: () => void
        }
    ))

const LinkStyle = ({isActive}: {isActive: boolean}): React.CSSProperties => ({
  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.16)' : undefined,
})

const SideMenu = ({items}: {items: SideMenuItem[]}) => {
  return (
    <>
      <Stack px={[4, null, 0]} display={['none', null, 'flex']}>
        {items.map((item, i) =>
          'children' in item ? (
            <Stack key={i}>
              <Text fontSize="sm" fontWeight={600}>
                {item.label}
              </Text>
              <Box pl={1}>
                <SideMenu items={item.children} />
              </Box>
            </Stack>
          ) : item.link ? (
            <ChakraNavLink
              key={i}
              to={item.link}
              end={item.end}
              color={item.color}
              bg="gray.800"
              w="100%"
              px={4}
              py={2}
              rounded="md"
              transition="all"
              transitionDuration="normal"
              _hover={{
                bg: 'whiteAlpha.300',
              }}
              _active={{
                bg: 'whiteAlpha.100',
              }}
              fontWeight={item.fontWeight ?? 300}
              style={LinkStyle}
            >
              {item.label}
            </ChakraNavLink>
          ) : (
            <Button
              key={i}
              variant="brandLink"
              color={item.color ?? 'black'}
              fontWeight={item.fontWeight ?? 300}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          )
        )}
      </Stack>
    </>
  )
}

export default SideMenu
