import * as React from 'react'

import {FormControl, Select} from '@chakra-ui/react'
import {ValueSelectorProps} from 'react-querybuilder'

const ValueSelector = ({handleOnChange, options, value, title}: ValueSelectorProps) => {
  const handleChange = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => handleOnChange(value),
    [handleOnChange]
  )

  const isCombinatorSelect = React.useMemo(() => (title === 'Połączenia' ? 'filled' : undefined), [title])

  return (
    <FormControl title={title}>
      <Select
        value={value}
        onChange={handleChange}
        size="sm"
        borderRadius="lg"
        variant={isCombinatorSelect ? 'filled' : undefined}
        fontWeight={isCombinatorSelect ? 600 : undefined}
      >
        {options.map((option) => (
          <option key={`key-${option.label}`} value={'name' in option ? option.name : option.options[0].name}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default ValueSelector
