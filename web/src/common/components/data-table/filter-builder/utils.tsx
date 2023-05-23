import _ from 'lodash'

import {Operator, RuleGroupTypeExtended, RuleTypeExtended, TransformFunction} from './types'

export const operatorMapper: Record<Operator, string> = {
  and: 'and',
  empty: 'cd.{}',
  eq: 'eq',
  gt: 'gt',
  gte: 'gte',
  ilike: 'ilike',
  lt: 'lt',
  lte: 'lte',
  notempty: 'not.cd.{}',
  noteq: 'not.eq',
  notilike: 'not.ilike',
  notnull: 'not.is.null',
  notov: 'not.ov',
  null: 'is.null',
  or: 'or',
  ov: 'ov',
}

// We wrap values in double quotes to escape reserved characters
// https://postgrest.org/en/v9.0/api.html#reserved-characters
const defaultToQueryTransform: Record<Operator, TransformFunction> = {
  and: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  empty: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  eq: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  gt: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  gte: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  ilike: (input) => ({...input, operator: operatorMapper[input.operator], value: `"%${input.value}%"`}),
  lt: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  lte: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  notempty: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  noteq: (input) => ({...input, operator: operatorMapper[input.operator], value: `"${input.value}"`}),
  notilike: (input) => ({...input, operator: operatorMapper[input.operator], value: `"%${input.value}%"`}),
  notnull: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  notov: (input) => ({...input, operator: operatorMapper[input.operator], value: `{"${input.value}"}`}),
  null: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  or: (input) => ({...input, operator: operatorMapper[input.operator], value: null}),
  ov: (input) => ({...input, operator: operatorMapper[input.operator], value: `{"${input.value}"}`}),
}

const escapeDoubleQuote = (input: string) => input.replaceAll('"', '\\"')

export const buildQueryFilter = (query: RuleGroupTypeExtended) => {
  const rules: string[] = []

  for (const r of query.rules) {
    // Check if r is an instance of RuleType.
    if ('rules' in r) {
      const nestedRule = buildQueryFilter(r)
      if (nestedRule !== '') {
        rules.push(nestedRule)
      }
      continue
    }

    const transformInput = {
      operator: r.operator,
      value: escapeDoubleQuote(`${r.value}`),
    }

    const {operator, value} = defaultToQueryTransform[r.operator](transformInput)
    if (value !== null) {
      rules.push(`${r.field}.${operator}.${value}`)
      continue
    }
    rules.push(`${r.field}.${operator}`)
  }

  if (!rules.length) {
    return ''
  }

  const result = rules.join(',')
  if (query.combinator === 'and') {
    return `and(${result})`
  }
  return `or(${result})`
}

// example query string
// and(name.eq."test",start_date.gte."2022-04-10",public.eq."true",or(organizer_name.eq."hello",name.eq."test"))
export const buildFilterFromQueryString = (
  query: string,
  level: number = 0, // to ensure unique keys
  index: number = 0
): RuleGroupTypeExtended | undefined => {
  if (!query) return undefined

  try {
    const indexOf28 = query.indexOf('(') // 28h = ascii '('
    if (indexOf28 < 0) throw new Error("No '(' in rule")

    const combinator = query.slice(0, indexOf28)
    const rules = splitRules(query.slice(indexOf28 + 1, -1)).reduce((acc, r, i) => {
      if (r.includes('(')) {
        const groupRule = buildFilterFromQueryString(r, level + 1, i)
        return groupRule ? acc.concat(groupRule) : acc
      }

      const result: RuleTypeExtended = {
        id: `r-${level}-${i}`,
        field: '',
        operator: 'or',
        value: '',
      }
      const indexOfDot = r.indexOf('.')
      if (indexOfDot < 0) throw new Error("No '.' in rule")
      result.field = r.slice(0, indexOfDot)

      const rest = r.slice(indexOfDot + 1)
      for (const [k, v] of Object.entries(operatorMapper) as [Operator, string][]) {
        if (rest.startsWith(v + '.') || rest === v) {
          result.operator = k
          result.value = rest
            .slice(v.length + 1)
            .replaceAll('"', '')
            .replaceAll('%', '') // drop % from 'ilike' values
            .replaceAll('{', '') // drop {} from 'ov' values
            .replaceAll('}', '')
          return acc.concat(result)
        }
      }
      // if no operator matched return previous value
      return acc
    }, [] as (RuleGroupTypeExtended | RuleTypeExtended)[])
    return {
      id: `g-${level}-${index}`,
      combinator,
      rules,
    } as RuleGroupTypeExtended
  } catch (e) {
    console.log('Failed to build filter from query string', e)
    return undefined
  }
}

const splitRules = (rules: string): string[] => {
  const result = []
  let lastComma = -1
  let bracketCount = 0

  for (let i = 0; i < rules.length; i++) {
    switch (rules[i]) {
      case '(':
        ++bracketCount
        continue
      case ')':
        --bracketCount
        continue
      case ',':
        if (bracketCount) continue
        result.push(rules.slice(lastComma + 1, i))
        lastComma = i
    }
  }
  result.push(rules.slice(lastComma + 1))
  return result
}

export const removeFieldFromFilter = (
  filter: RuleGroupTypeExtended,
  path: number[] // e.g. [2, 1] means remove filter.rules[2].rules[1]
): RuleGroupTypeExtended => {
  if (!path.length) return filter

  let rules: (RuleGroupTypeExtended | RuleTypeExtended)[] = []
  if (path.length === 1) rules = filter.rules.filter((_, i) => i !== path[0])
  else
    rules = filter.rules
      .reduce(
        (acc, r, i) =>
          i === path[0]
            ? 'rules' in r
              ? acc.concat(removeFieldFromFilter(r, path.slice(1)))
              : acc // if path is impossible just remove the top element
            : acc.concat(r),
        [] as (RuleGroupTypeExtended | RuleTypeExtended)[]
      )
      .reduce(
        (acc, r) =>
          'rules' in r && r.rules.length < 2
            ? r.rules.length
              ? acc.concat(r.rules[0]) // if only 1 rule in group take it out
              : acc // remove group if doesnt have rules
            : acc.concat(r),
        [] as (RuleGroupTypeExtended | RuleTypeExtended)[]
      )

  return {...filter, rules}
}
