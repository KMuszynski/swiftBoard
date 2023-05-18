import {type ComponentStyleConfig} from '@chakra-ui/react'
import defaultTheme from '@chakra-ui/theme'
import {type StyleFunctionProps} from '@chakra-ui/theme-tools'

import {FONT_AVENIR} from '../contants'

// This is a placeholder copied from another project

const baseStyle = () => ({
  fontFamily: FONT_AVENIR,
  margin: '0',
})

const variantBrandSolid = (props: StyleFunctionProps) => {
  return {
    ...defaultTheme.components.Button.variants?.solid(props),
    backgroundColor: 'brand.orange',
    color: '#fff',
    borderRadius: '13px',
    _hover: {
      backgroundColor: 'brand.grayBlue',
      color: 'brand.orange',
    },
  }
}

const variantBrandOutline = (props: StyleFunctionProps) => {
  return {
    ...defaultTheme.components.Button.variants?.outline(props),
    color: 'brand.orange',
    fontWeight: '400',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '10px',
    borderColor: 'brand.orange',
    _hover: {
      backgroundColor: 'brand.orange',
      color: '#fff',
    },
  }
}

const variantBrandLink = (props: StyleFunctionProps) => {
  return {
    ...defaultTheme.components.Button.variants?.link(props),
    color: 'brand.orange',
    backgroundColor: 'transparent',
    fontWeight: '400',
  }
}

const variantBrandIcon = (props: StyleFunctionProps) => {
  return {
    ...defaultTheme.components.Button.variants?.ghost(props),
    color: 'text.gray.400',
    backgroundColor: 'transparent',
    _hover: {
      color: 'brand.orange',
    },
  }
}

const variants = {
  brandSolid: variantBrandSolid,
  brandOutline: variantBrandOutline,
  brandLink: variantBrandLink,
  brandIcon: variantBrandIcon,
}

const Button: ComponentStyleConfig = {
  baseStyle,
  variants,
}

export default Button
