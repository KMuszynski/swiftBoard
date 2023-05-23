import * as React from 'react'

import {HStack, Tag, TagCloseButton, Text} from '@chakra-ui/react'

import {formatDate, formatTimestamp} from '@/utils/string'

import {booleanTranslations, labelTranslations} from './constants'
import {FilterField, RuleGroupTypeExtended, RuleTypeExtended} from './types'

type Props = {
  value: RuleGroupTypeExtended
  filterFields: FilterField[]
  path?: number[]
  onRemove?: (path: number[]) => void
}

const AppliedFilters = ({value, filterFields, path = [], onRemove}: Props) => {
  const handleRemove = React.useCallback(
    (index: number) => {
      onRemove && onRemove([...path, index])
    },
    [path, onRemove]
  )

  return (
    <>
      {value.rules?.map((r, i) => (
        <React.Fragment key={i}>
          {i ? (
            <Text color="blue.400" fontSize="sm">
              {value.combinator !== 'and' && value.combinator !== 'or'
                ? 'UNDEFINED OP'
                : labelTranslations[value.combinator]}
            </Text>
          ) : null}
          {'rules' in r ? (
            <>
              <Text>(</Text>
              <AppliedFilters
                key={i}
                value={r}
                path={[...path, i]}
                onRemove={onRemove}
                filterFields={filterFields}
              />
              <Text>)</Text>
            </>
          ) : (
            <FilterTag key={i} rule={r} index={i} filterFields={filterFields} onRemove={handleRemove} />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

type FilterTagProps = {
  filterFields: FilterField[]
  onRemove: (i: number) => void
  index: number
  rule: RuleTypeExtended
}

const FilterTag = ({index, rule, filterFields, onRemove}: FilterTagProps) => {
  const handleRemove = React.useCallback(() => {
    onRemove(index)
  }, [index, onRemove])

  const filterField = React.useMemo(
    () => filterFields.find((f) => f.name === rule.field),
    [filterFields, rule]
  )

  const value = React.useMemo(() => {
    switch (filterField?.variant) {
      case 'boolean':
        return booleanTranslations[rule.value]
      case 'date':
        return rule.value ? formatDate(new Date(rule.value)) : rule.value
      case 'datetime':
        return rule.value ? formatTimestamp(new Date(rule.value)) : rule.value
      case 'monetary':
        return +rule.value ? +rule.value / 100 : rule.value
      case 'select':
        return filterField?.values?.find((v) => v.name === rule.value)?.label || rule.value
    }

    return rule.value
  }, [rule, filterField])

  return (
    <Tag borderRadius="full">
      <HStack spacing={1}>
        <Text>{filterField?.label || rule.field}</Text>
        <Text color="blue.400">{labelTranslations[rule.operator]}</Text>
        <Text>{value}</Text>
      </HStack>
      <TagCloseButton onClick={handleRemove} />
    </Tag>
  )
}

export default AppliedFilters
