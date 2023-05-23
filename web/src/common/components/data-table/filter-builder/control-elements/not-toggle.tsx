import * as React from 'react'

import {Checkbox} from '@chakra-ui/react'
import {NotToggleProps} from 'react-querybuilder'

const NotToggle = ({className, handleOnChange, checked, title}: NotToggleProps) => {
  const handleChangeCheckbox = React.useCallback(
    ({target: {checked}}: React.ChangeEvent<HTMLInputElement>) => handleOnChange(checked),
    [handleOnChange]
  )

  return (
    <Checkbox className={className} checked={!!checked} onChange={handleChangeCheckbox}>
      {title}
    </Checkbox>
  )
}

export default NotToggle
