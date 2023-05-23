import React from 'react'

import {FormControl, Select} from '@chakra-ui/react'
import {ValueEditorProps} from 'react-querybuilder'

const SelectValueEditor = ({value, handleOnChange, values}: ValueEditorProps) => {
  const handleChangeText = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => handleOnChange(value),
    [handleOnChange]
  )

  return (
    <FormControl>
      <Select value={value} onChange={handleChangeText} size="sm" borderRadius="lg">
        {values?.map((v) => (
          <option key={v.name} value={v.name}>
            {v.label}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectValueEditor
