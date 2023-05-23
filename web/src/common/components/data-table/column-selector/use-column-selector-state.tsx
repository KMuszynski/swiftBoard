import * as React from 'react'

import {Column} from 'react-table'

import {AnyObject} from '@/utils/types'

const useColumnSelectorState = <T extends AnyObject>(
  availableColumns: Column<T>[],
  defaultColumns?: string[]
) => {
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(
    defaultColumns ?? availableColumns.map(({id}) => id as string)
  )

  const handleSelectedColumnsChange = React.useCallback(
    (value: string[]) => setSelectedColumns(value),
    [setSelectedColumns]
  )

  const filteredColumns = React.useMemo(
    () => availableColumns.filter(({id}) => selectedColumns.includes(id as string)),
    [availableColumns, selectedColumns]
  )

  return {
    handleSelectedColumnsChange,
    selectedColumnIDs: selectedColumns,
    selectedColumns: filteredColumns,
  }
}

export default useColumnSelectorState
