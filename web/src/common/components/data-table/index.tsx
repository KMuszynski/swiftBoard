import * as React from 'react'

import {AddIcon, ChevronLeftIcon, ChevronRightIcon, RepeatIcon} from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Select,
  Skeleton,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import {TbLayoutColumns as ColumnsIcon} from 'react-icons/tb'
import {useLocation} from 'react-router-dom'
import {Column, HeaderGroup, IdType, useTable} from 'react-table'

import {AnyObject} from '@/utils/types'

import ActionButton from './action-button'
import ColumnSelector from './column-selector'
import useColumnSelectorState from './column-selector/use-column-selector-state'
import {defaultRowsPerPagePresets, renderPresetToRenderer} from './constants'
import ExportToCSVButton from './export-csv'
import FilterMenu from './filter-builder/menu'
import TableHeader from './table-header'
import {Column as DataTableColumn, Props} from './types'

// TODO: Add table id so that filters can be used when there are multiple tables on a single page,
// then store the id of the table in url search params and based on that apply filters
const DataTable = <T extends AnyObject>({
  data,
  columns,
  loading,
  totalCount,
  onRefresh,
  onAdd,
  customToolbarActions,
  defaultSelectedColumns,
  tableState,
  actions,
  filterFields,
  table,
}: Props<T>) => {
  const {
    descending,
    page,
    rowsPerPage,
    sortBy,
    setRowsPerPage,
    setDescending,
    setSortBy,
    goToPreviousPage,
    goToNextPage,
    previousCount,
    setPreviousCount,
    setPage,
    setFilter,
  } = tableState

  const computedData = React.useMemo(
    () => (loading ? Array.from(new Array(previousCount || rowsPerPage)).map(() => ({} as T)) : data),
    [loading, data, rowsPerPage, previousCount]
  )

  const computedColumns: Column<T>[] = React.useMemo(
    () =>
      columns.map((c) => {
        if (!c.renderAs) {
          return {
            ...c,
            accessor: loading
              ? () => null // make sure no fields of empty casted objects are accessed in loading state
              : ((c.renderer ?? c.id) as keyof T extends never ? IdType<T> : never),
          }
        }
        const {renderAs} = c
        return {
          ...c,
          accessor: loading
            ? () => null // make sure no fields of empty casted objects are accessed in loading state
            : c.renderAs
            ? (item: T) => renderPresetToRenderer[renderAs](item[c.id as keyof T])
            : ((c.renderer ?? c.id) as keyof T extends never ? IdType<T> : never),
        } as Column<T>
      }),
    [columns, loading]
  )

  const columnByID = React.useMemo(() => {
    const map: Record<string, DataTableColumn<T>> = {}
    for (const c of columns) {
      map[c.id] = c
    }
    return map
  }, [columns])

  const {handleSelectedColumnsChange, selectedColumns, selectedColumnIDs} = useColumnSelectorState<T>(
    computedColumns,
    defaultSelectedColumns
  )

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns: selectedColumns,
    data: computedData,
  })

  const {
    isOpen: columnSelectorOpen,
    onOpen: onColumnSelectorOpen,
    onClose: onColumnSelectorClose,
  } = useDisclosure()
  const {isOpen: actionsOpen, onToggle: onActionsToggle} = useDisclosure()

  const columnSelectorItems = React.useMemo(
    () =>
      loading ? [] : computedColumns.map(({id, Header}) => ({id: id as string, label: Header as string})),
    [loading, computedColumns]
  )

  const handleRowsPerPageChange = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
      setPage(0)
      setRowsPerPage(+value)
    },
    [setRowsPerPage, setPage]
  )

  const handlePreviousClick = React.useCallback(() => {
    goToPreviousPage()
    totalCount !== undefined && totalCount !== null && setPreviousCount(totalCount)
  }, [goToPreviousPage, setPreviousCount, totalCount])
  const handleNextClick = React.useCallback(() => {
    goToNextPage()
    totalCount !== undefined && totalCount !== null && setPreviousCount(totalCount)
  }, [goToNextPage, setPreviousCount, totalCount])

  const handleHeaderClick = React.useCallback(
    (column: HeaderGroup<T>) => {
      setDescending(!descending && sortBy.column === column.id)
      setSortBy({column: column.id, tag: columnByID[column.id]?.sortFieldTag})
    },
    [setDescending, setSortBy, sortBy, descending, columnByID]
  )

  const {search} = useLocation()
  const searchParams = React.useMemo(() => new URLSearchParams(search), [search])
  React.useEffect(() => {
    const filterQuery = searchParams.get('filter')
    setFilter(filterQuery ? (builder) => builder.or(filterQuery) : undefined)
    setPage(0)
  }, [search, searchParams, setPage, setFilter])

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg">
        <Flex px={2} py={1}>
          {filterFields && <FilterMenu filterFields={filterFields} />}
          <Spacer />
          {customToolbarActions}
          {onAdd && (
            <IconButton ml={2} aria-label="add" variant="outline" onClick={onAdd}>
              <AddIcon />
            </IconButton>
          )}
          {onRefresh && (
            <IconButton
              aria-label="refresh"
              variant="outline"
              ml={2}
              onClick={onRefresh}
              isDisabled={loading}
            >
              <RepeatIcon />
            </IconButton>
          )}
          {table && (
            <ExportToCSVButton<T>
              table={table}
              tableState={tableState}
              selectedColumns={selectedColumnIDs}
              columnByID={columnByID}
            />
          )}
          <IconButton ml={2} aria-label="columns" variant="outline" onClick={onColumnSelectorOpen}>
            <Icon as={ColumnsIcon} />
          </IconButton>
        </Flex>
        <Divider />
        <Box overflowX="auto">
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                  <>
                    {headerGroup.headers.map((column, columnIndex) => (
                      <TableHeader
                        key={columnIndex}
                        column={column}
                        onClick={handleHeaderClick}
                        sorted={sortBy.column === column.id}
                        descending={descending}
                        sortable={columnByID[column.id]?.sortable}
                      />
                    ))}
                    {!!actions?.length && (
                      <Th position="sticky" right={0} textAlign="right">
                        Akcje
                      </Th>
                    )}
                  </>
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()} key={rowIndex}>
                    <>
                      {row.cells.map((cell, cellIndex) => (
                        <Td
                          {...cell.getCellProps()}
                          key={cellIndex}
                          whiteSpace={columnByID[cell.column.id]?.disableNoWrap ? undefined : 'nowrap'}
                        >
                          {loading ? <Skeleton height="20px" /> : cell.render('Cell')}
                        </Td>
                      ))}
                      {!!actions?.length && (
                        <Td position="sticky" right={0}>
                          <HStack justify="flex-end">
                            {(actions.length <= 3 || actionsOpen) &&
                              actions.map((action, i) => (
                                <Box key={i} animation="">
                                  <ActionButton item={row.original} action={action} />
                                </Box>
                              ))}
                            {actions.length > 3 && (
                              <IconButton
                                aria-label="show-actions"
                                size="sm"
                                icon={actionsOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                onClick={onActionsToggle}
                              />
                            )}
                          </HStack>
                        </Td>
                      )}
                    </>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
        <Flex padding={2} alignItems="center">
          <chakra.span ml={4}>Łączna liczba: {totalCount}</chakra.span>
          <Spacer />
          <Text mr={2}>Rozmiar strony:</Text>
          <Select
            width={85}
            mr={8}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            isDisabled={loading}
          >
            {defaultRowsPerPagePresets.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <IconButton
            aria-label="previous-page"
            variant="outline"
            icon={<ChevronLeftIcon h={6} w={6} />}
            isDisabled={!page || loading}
            onClick={handlePreviousClick}
          />
          <chakra.span mr={4} ml={4}>
            Strona {page + 1} z {Math.ceil((totalCount ?? 0) / rowsPerPage)}
          </chakra.span>
          <IconButton
            aria-label="next-page"
            variant="outline"
            icon={<ChevronRightIcon h={6} w={6} />}
            isDisabled={page + 1 === Math.ceil((totalCount ?? 0) / rowsPerPage) || loading}
            onClick={handleNextClick}
          />
        </Flex>
      </Box>
      <ColumnSelector
        open={columnSelectorOpen}
        onClose={onColumnSelectorClose}
        items={columnSelectorItems}
        initialValue={selectedColumnIDs}
        onApply={handleSelectedColumnsChange}
      />
    </>
  )
}

export default DataTable
