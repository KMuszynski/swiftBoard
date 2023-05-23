import {PostgrestFilterBuilder} from '@supabase/postgrest-js'

export type TableState = {
  descending: boolean
  page: number
  rowsPerPage: number
  sortBy: SortBy
  setRowsPerPage: (value: number) => void
  setPage: (value: number) => void
  setSortBy: (value: SortBy) => void
  setDescending: (value: boolean) => void
  goToPreviousPage: () => void
  goToNextPage: () => void
  previousCount: number
  setPreviousCount: (value: number) => void
  setFilter: (
    value?: (builder: PostgrestFilterBuilder<any, any, any>) => PostgrestFilterBuilder<any, any, any>
  ) => void
  filter?: (builder: PostgrestFilterBuilder<any, any, any>) => PostgrestFilterBuilder<any, any, any>
}

export type Defaults = {
  rowsPerPage?: number
  sortBy?: string
  descending?: boolean
}

export type Cursors = {
  start: string
  end: string
}

export type SortBy = {
  column: string
  tag?: string
}
