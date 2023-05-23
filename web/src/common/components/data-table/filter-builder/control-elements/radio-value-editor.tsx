import {FormControl, Radio, RadioGroup} from '@chakra-ui/react'
import {ValueEditorProps} from 'react-querybuilder'

const RadioValueEditor = ({value, handleOnChange, title, values}: ValueEditorProps) => (
  <FormControl title={title} as="fieldset">
    <RadioGroup value={value} onChange={handleOnChange} size="sm">
      {values?.map((v) => (
        <Radio key={v.name} value={v.name}>
          {v.label}
        </Radio>
      ))}
    </RadioGroup>
  </FormControl>
)

export default RadioValueEditor
