import React from 'react'

import {Divider, Flex, Spacer} from '@chakra-ui/layout'
import {Button, Fade, useColorModeValue} from '@chakra-ui/react'
import {QueryBuilderDnD} from '@react-querybuilder/dnd'
import * as ReactDnD from 'react-dnd'
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend'
import {
  Field,
  OptionGroup,
  QueryBuilder,
  RuleGroupType,
  RuleType,
  ValueEditorType,
  transformQuery,
} from 'react-querybuilder'
import {useSearchParams} from 'react-router-dom'

import {
  allLabeledCombinators,
  allLabeledOperators,
  emptyQuery,
  filterInputVariantToInputType,
  filterInputVariantToOperators,
  filterInputVariantToSelectPresets,
  filterInputVariantToValueEditorType,
  translations,
} from './constants'
import controlElements from './control-elements'
import './default.css'
import {FilterField, Operator, RuleTypeExtended} from './types'
import {buildFilterFromQueryString, buildQueryFilter} from './utils'

type Props = {
  fields: FilterField[]
  loading?: boolean
  onSubmit?: () => void
}

const FilterBuilder = ({fields: _fields, loading, onSubmit}: Props) => {
  const [query, setQuery] = React.useState<RuleGroupType>(emptyQuery)
  const handleQueryChange = React.useCallback((query: RuleGroupType) => {
    setQuery(query)
  }, [])
  const fields: Field[] | OptionGroup<Field>[] | Record<string, Field> = React.useMemo(
    () =>
      _fields.map((field) => ({
        ...field,
        inputType: filterInputVariantToInputType[field.variant],
        operators: field.operators ?? filterInputVariantToOperators[field.variant],
        valueEditorType: (filterInputVariantToValueEditorType[field.variant] ||
          (field.values && 'select')) as ValueEditorType,
        values: field.values ?? filterInputVariantToSelectPresets[field.variant],
      })),
    [_fields]
  )

  const [searchParams, setSearchParams] = useSearchParams()
  // update query state on search params change
  React.useEffect(() => {
    setQuery(buildFilterFromQueryString(searchParams.get('filter') ?? '') ?? emptyQuery)
  }, [searchParams])

  // Add properties to query rules.
  // https://react-querybuilder.js.org/docs/tips/adding-removing-query-properties#adding-properties
  const ruleProcessor = React.useCallback(
    (r: RuleType): RuleTypeExtended => ({
      ...r,
      operator: r.operator as Operator,
      variant: fields.find((f) => f.name === r.field)?.variant,
    }),
    [fields]
  )

  const handleSubmit = React.useCallback(() => {
    setSearchParams(
      query?.rules.length ? {filter: buildQueryFilter(transformQuery(query, {ruleProcessor}))} : ''
    )
    onSubmit && onSubmit()
  }, [setSearchParams, ruleProcessor, onSubmit, query])

  const handleClearAll = React.useCallback(() => {
    setQuery(emptyQuery)
  }, [setQuery])

  return (
    <Flex
      direction="column"
      borderRadius="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
      mb={2}
    >
      <QueryBuilderDnD dnd={{...ReactDnD, ...ReactDndHtml5Backend}}>
        <QueryBuilder
          fields={fields}
          onQueryChange={handleQueryChange}
          controlElements={controlElements}
          operators={allLabeledOperators}
          translations={translations}
          combinators={allLabeledCombinators}
          query={query}
        />
      </QueryBuilderDnD>
      <Divider />
      <Flex direction="row">
        <Fade in={!!query?.rules.length}>
          <Button size="sm" my={1} ml={2} onClick={handleClearAll} variant="ghost">
            Wyczyść filtry
          </Button>
        </Fade>
        <Spacer />
        <Button size="sm" my={1} mr={2} onClick={handleSubmit} isLoading={loading}>
          Zatwierdź
        </Button>
      </Flex>
    </Flex>
  )
}

export default FilterBuilder
