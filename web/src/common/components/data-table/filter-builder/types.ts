import type {Option, RuleGroupType, RuleType} from 'react-querybuilder'

export type FilterVariant =
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'select'
  | 'boolean'
  | 'list'
  | 'exists'
  | 'monetary'

// Reference: https://postgrest.org/en/stable/api.html#operators
export type Operator =
  | 'and'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'ilike'
  | 'lt'
  | 'lte'
  | 'noteq'
  | 'notilike'
  | 'notnull'
  | 'null'
  | 'or'
  | 'ov'
  | 'notov'
  | 'empty'
  | 'notempty'

export type FilterTransformInput = {operator: Operator; value: any}
export type FilterTransformOutput = {operator: string; value: string | null}

export type TransformFunction = (input: FilterTransformInput) => FilterTransformOutput

export type FilterField = {
  name: string
  label: string
  operators?: Option[]
  valueEditorType?: 'text' | 'select' | 'checkbox' | 'radio' | null
  variant: FilterVariant
  values?: Option[]
  filterFieldTag?: string
}

export type RuleTypeExtended = Omit<RuleType, 'operator'> & {
  operator: Operator
  variant?: FilterVariant
}

export type RuleGroupTypeExtended = Omit<RuleGroupType, 'rules'> & {
  rules: (RuleTypeExtended | RuleGroupTypeExtended)[]
}
