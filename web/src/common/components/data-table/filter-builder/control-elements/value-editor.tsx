import React from 'react'

import {Box, Checkbox, Input} from '@chakra-ui/react'
import {ValueEditorProps} from 'react-querybuilder'

import DatetimeValueEditor from './datetime-value-editor'
import MonetaryValueEditor from './monetary-value-editor'
import RadioValueEditor from './radio-value-editor'
import SelectValueEditor from './select-value-editor'

const ValueEditor = (props: ValueEditorProps) => {
  const {
    operator,
    value,
    handleOnChange,
    title,
    type,
    inputType,
    fieldData: {variant},
  } = props

  const handleChangeText = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => handleOnChange(value),
    [handleOnChange]
  )

  const handleChangeCheckbox = React.useCallback(
    ({target: {checked}}: React.ChangeEvent<HTMLInputElement>) => handleOnChange(checked),
    [handleOnChange]
  )

  if (operator === 'null' || operator === 'notnull' || operator === 'empty' || operator === 'notempty') {
    return null
  }

  if (type === 'select') {
    return <SelectValueEditor {...props} />
  }

  if (type === 'checkbox') {
    return <Checkbox onChange={handleChangeCheckbox} checked={!!value} mr={2} size="sm" />
  }

  if (type === 'radio') {
    return <RadioValueEditor {...props} />
  }

  if (variant === 'datetime') {
    return <DatetimeValueEditor {...props} />
  }

  if (variant === 'monetary') {
    return <MonetaryValueEditor {...props} />
  }

  return (
    <Box w="100%">
      <Input
        type={inputType || 'text'}
        value={value}
        title={title}
        onChange={handleChangeText}
        size="sm"
        borderRadius="lg"
        placeholder={title}
      />
    </Box>
  )
}

ValueEditor.displayName = 'ValueEditor'

export default ValueEditor
