import * as React from 'react'

import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import {Th, chakra} from '@chakra-ui/react'
import {HeaderGroup} from 'react-table'

import {AnyObject} from '@/utils/types'

type Props<T extends AnyObject> = {
  column: HeaderGroup<T>
  onClick?: (column: HeaderGroup<T>) => void
  sorted?: boolean
  descending?: boolean
  sortable?: boolean
}

const TableHeader = <T extends AnyObject = AnyObject>({
  column,
  onClick,
  sorted,
  descending,
  sortable = true,
}: Props<T>) => {
  const handleClick = React.useCallback(
    () => sortable && onClick && onClick(column),
    [sortable, onClick, column]
  )

  return (
    <Th cursor={sortable ? 'pointer' : ''} onClick={handleClick} whiteSpace="nowrap">
      {column.render('Header')}
      <chakra.span pl="4">
        {sortable &&
          sorted &&
          (descending ? (
            <TriangleDownIcon aria-label="sorted descending" />
          ) : (
            <TriangleUpIcon aria-label="sorted ascending" />
          ))}
      </chakra.span>
    </Th>
  )
}

export default TableHeader
