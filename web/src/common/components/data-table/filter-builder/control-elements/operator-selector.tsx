import {OperatorSelectorProps} from 'react-querybuilder'

import ValueSelector from './value-selector'

const OperatorSelector = (props: OperatorSelectorProps) =>
  props.fieldData.variant === 'boolean' ? null : (
    <ValueSelector
      options={props.options}
      value={props.value}
      title={props.value}
      handleOnChange={props.handleOnChange}
      level={props.level}
      path={props.path}
      schema={props.schema}
    />
  )

export default OperatorSelector
