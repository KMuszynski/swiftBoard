import {type StylesConfig} from 'react-select'

export const selectStyles: StylesConfig<any> = {
  control: (styles, {menuIsOpen}) => ({
    ...styles,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    height: '100%',
    borderRadius: menuIsOpen ? '0.375rem 0.375rem 0 0' : '0.375rem',
    color: '#fff',
  }),
  input: (styles) => ({
    ...styles,
    color: '#fff',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '0 0 16px 16px',
    backgroundColor: '#171923',
    overflowX: 'hidden',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    margin: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.64)',
      },
    },
    msOverflowStyle: 'none',
    overflowX: 'hidden',
    overflowY: 'visible',
    scrollbarWidth: 'none',
  }),
  option: (styles, {isFocused}) => ({
    ...styles,
    color: isFocused ? '#000' : '#fff',
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#fff',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#000',
  }),
}
