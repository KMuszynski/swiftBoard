import {createStandaloneToast, extendTheme} from '@chakra-ui/react'

import {FONT_AVENIR} from './contants'
import * as foundations from './foundations'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  ...foundations,
  fonts: {
    heading: FONT_AVENIR,
    body: FONT_AVENIR,
  },
})

export const {ToastContainer, toast} = createStandaloneToast({theme, defaultOptions: {isClosable: true}})

export default theme
