import React from 'react'

import {NumberInput, NumberInputField} from '@chakra-ui/react'
import {ValueEditorProps} from 'react-querybuilder'

const MonetaryValueEditor = ({value, handleOnChange}: ValueEditorProps) => {
  const handleChange = React.useCallback(
    (v: string) => handleOnChange((+v * 100).toString()),
    [handleOnChange]
  )
  return (
    <NumberInput w="100%" value={(+value || 0) / 100} onChange={handleChange} precision={2} size="sm">
      <NumberInputField borderRadius="lg" />
    </NumberInput>
  )
}

export default MonetaryValueEditor
