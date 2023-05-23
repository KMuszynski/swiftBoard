import * as React from 'react'

import {IconButton, Tooltip} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import {AnyObject} from '@/utils/types'

import {DataTableAction} from './types'

type Props<T extends AnyObject> = {
  action: DataTableAction<T>
  item: T
}

const ActionButton = <T extends AnyObject>({action, item}: Props<T>) => {
  const navigate = useNavigate()
  const handleClick = React.useCallback(
    () => ('onClick' in action ? action.onClick(item) : navigate(action.to(item))),
    [navigate, item, action]
  )

  return (
    <Tooltip label={action.tooltip}>
      <IconButton size="sm" aria-label="edit-button" onClick={handleClick}>
        {action.icon}
      </IconButton>
    </Tooltip>
  )
}

export default ActionButton
