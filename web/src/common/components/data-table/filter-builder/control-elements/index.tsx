import {Controls} from 'react-querybuilder'

import DragHandle from './drag-handle'
import FilterControl from './filter-control'
import NotToggle from './not-toggle'
import OperatorSelector from './operator-selector'
import ValueEditor from './value-editor'
import ValueSelector from './value-selector'

const controlElements: Partial<Controls> = {
  addGroupAction: FilterControl,
  addRuleAction: FilterControl,
  combinatorSelector: ValueSelector,
  fieldSelector: ValueSelector,
  notToggle: NotToggle,
  operatorSelector: OperatorSelector,
  removeGroupAction: FilterControl,
  removeRuleAction: FilterControl,
  valueEditor: ValueEditor,
  dragHandle: DragHandle,
}

export default controlElements
