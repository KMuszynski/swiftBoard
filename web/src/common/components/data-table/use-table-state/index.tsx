import * as React from 'react'

import {PostgrestFilterBuilder} from '@supabase/postgrest-js'
import _ from 'lodash'

import {Defaults, SortBy as SortByWithFieldTag, TableState} from './types'

const defaultRowsPerPage = 10

type Filter = PostgrestFilterBuilder<any, any, any>

const useTableState = (defaults?: Defaults): TableState => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(defaults?.rowsPerPage ?? defaultRowsPerPage)
  const [sortBy, setSortBy] = React.useState<SortByWithFieldTag>(
    defaults?.sortBy ? {column: defaults.sortBy} : {column: ''}
  )
  const [descending, setDescending] = React.useState(defaults?.descending ?? false)
  const [previousCount, setPreviousCount] = React.useState(0)
  const [filter, _setFilter] = React.useState<(builder: Filter) => Filter>()

  const setFilter = React.useCallback(
    (newFilter?: (v: Filter) => Filter) => _setFilter(newFilter && (() => newFilter)),
    []
  )

  const goToPreviousPage = React.useCallback(() => {
    setPage(page - 1)
  }, [setPage, page])
  const goToNextPage = React.useCallback(() => {
    setPage(page + 1)
  }, [setPage, page])

  return {
    descending,
    filter,
    goToNextPage,
    goToPreviousPage,
    page,
    previousCount,
    rowsPerPage,
    setDescending,
    setFilter,
    setPage,
    setPreviousCount,
    setRowsPerPage,
    setSortBy,
    sortBy,
  }
}

export default useTableState
