import React from 'react'

import {ValueEditorProps} from 'react-querybuilder'

import DatetimeInput from '@/common/components/datetime-input'

const DatetimeValueEditor = ({value, handleOnChange}: ValueEditorProps) => {
  const handleChangeDatetime = React.useCallback(
    (dt: Date | null) => handleOnChange(dt ? dt.toISOString() : ''),
    [handleOnChange]
  )

  const currentValue = React.useMemo(() => (value ? new Date(value) : new Date()), [value])

  React.useEffect(() => {
    handleOnChange(new Date().toISOString())
  }, []) // eslint-disable-line

  return (
    <DatetimeInput
      showTimeSelect={true}
      defaultValue={currentValue}
      onChange={handleChangeDatetime}
      borderRadius="lg"
      size="sm"
    />
  )
}

export default DatetimeValueEditor
