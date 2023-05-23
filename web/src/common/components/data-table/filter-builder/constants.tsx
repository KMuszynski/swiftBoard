import {Option, Translations} from 'react-querybuilder'

import {FilterVariant, Operator, RuleGroupTypeExtended} from './types'

export const emptyQuery: RuleGroupTypeExtended = {
  combinator: 'and',
  rules: [],
}

export const translations: Partial<Translations> = {
  addGroup: {
    label: 'Dodaj grupę',
    title: 'Dodaj grupę',
  },
  addRule: {
    label: 'Dodaj filtr',
    title: 'Dodaj filtr',
  },
  combinators: {
    title: 'Kombinatory',
  },
  fields: {
    title: 'Pola',
  },
  notToggle: {
    label: 'Nie',
    title: 'Nie',
  },
  operators: {
    title: 'Operatory',
  },
  value: {
    title: 'Wartość',
  },
}

// is there any advantage of passing TFunction instead of calling i18n.t()?
export const labelTranslations: Record<Operator, string> = {
  and: 'oraz',
  empty: 'puste',
  eq: '=',
  gt: '>',
  gte: '>=',
  ilike: 'przypomina',
  lt: '<',
  lte: '<=',
  notempty: 'nie puste',
  noteq: '!=',
  notilike: 'nie przypomina',
  notnull: 'niepuste',
  notov: 'nie zawiera',
  null: 'puste',
  or: 'lub',
  ov: 'zawiera',
}

const toNameLabelPair = (labelOperator: Operator): Option => ({
  label: labelTranslations[labelOperator],
  name: labelOperator,
})

const combinators: Operator[] = ['and', 'or']

export const allLabeledCombinators = combinators.map((c) => toNameLabelPair(c))

const operators: Operator[] = [
  'empty',
  'eq',
  'gt',
  'gte',
  'ilike',
  'lt',
  'lte',
  'notempty',
  'noteq',
  'notilike',
  'notnull',
  'notov',
  'null',
  'ov',
]

export const allLabeledOperators = operators.map((f) => toNameLabelPair(f))

const textOperators = () => {
  const operators: Operator[] = ['eq', 'noteq', 'ilike', 'notilike', 'null', 'notnull']
  return operators.map((f) => toNameLabelPair(f))
}

const selectOperators = () => {
  const operators: Operator[] = ['eq', 'noteq']
  return operators.map((f) => toNameLabelPair(f))
}

const rangeOperators = () => {
  const operators: Operator[] = ['eq', 'noteq', 'lt', 'lte', 'gt', 'gte', 'null', 'notnull']
  return operators.map((f) => toNameLabelPair(f))
}

const dateOperators = () => {
  const operators: Operator[] = ['gt', 'gte', 'lt', 'lte', 'null', 'notnull']
  return operators.map((f) => toNameLabelPair(f))
}

const listOperators = () => {
  const operators: Operator[] = ['ov', 'notov', 'empty', 'notempty']
  return operators.map((f) => toNameLabelPair(f))
}

const existsOperators = () => {
  const operators: Operator[] = ['null', 'notnull']
  return operators.map((f) => toNameLabelPair(f))
}

export const filterInputVariantToOperators: Record<FilterVariant, Option[]> = {
  boolean: [toNameLabelPair('eq')],
  date: dateOperators(),
  datetime: dateOperators(),
  exists: existsOperators(),
  list: listOperators(),
  number: rangeOperators(),
  select: selectOperators(),
  text: textOperators(),
  monetary: rangeOperators(),
}

export const filterInputVariantToInputType: Partial<Record<FilterVariant, string>> = {
  date: 'date',
  datetime: 'datetime-local',
  number: 'number',
  select: 'text',
  text: 'text',
}

export const filterInputVariantToValueEditorType: Partial<Record<FilterVariant, string>> = {
  boolean: 'select',
  select: 'select',
}

export const booleanTranslations: Record<string, string> = {
  true: 'tak',
  false: 'nie',
}

export const filterInputVariantToSelectPresets: Partial<Record<FilterVariant, Option[]>> = {
  boolean: [
    {
      label: 'tak',
      name: 'true',
    },
    {
      label: 'nie',
      name: 'false',
    },
  ],
}
