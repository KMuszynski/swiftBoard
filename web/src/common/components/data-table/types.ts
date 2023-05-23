import React from 'react'

import {Accessor, Column as _Column} from 'react-table'

import {AnyObject} from '@/utils/types'

import {TableState} from './use-table-state/types'

export type Column<T extends AnyObject> = Omit<_Column<T>, 'accessor'> & {
  id: string // ColumnSelector uses IDs so just make it a required field
  renderer?: Accessor<T>
  renderAs?: RenderPreset
  sortable?: boolean
  disableNoWrap?: boolean
  sortFieldTag?: string // The name of the field passed to the "sortBy" arg of the query. Defaults to snake case `id`.
  toCSV?: (item: T) => string
}

export type RenderPreset =
  | 'timestamp'
  | 'code'
  | 'checkbox'
  | 'boolean'
  | 'longString'
  | 'monetary'
  | 'booleanIcons'
  | 'tags'
  | 'avatar'

export type Props<T extends AnyObject> = {
  data: T[]
  columns: Column<T>[]
  defaultSelectedColumns?: string[] // defaults to all available columns if undefined

  loading?: boolean
  onRefresh?: () => Promise<void> | void
  onAdd?: () => void
  customToolbarActions?: React.ReactNode
  totalCount?: number | null
  tableState: TableState

  actions?: DataTableAction<T>[] // Displayed in the very last column of the table
}

export type DataTableAction<T extends AnyObject> = {
  id: string
  icon: JSX.Element
  tooltip?: string
} & (
  | {
      onClick: (item: T) => void
    }
  | {
      to: (item: T) => string
    }
)
