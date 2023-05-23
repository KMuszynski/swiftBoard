import {DeleteIcon, EditIcon} from '@chakra-ui/icons'

import {AnyObject} from '@/utils/types'

import {DataTableAction} from './types'

export const editAction = <T extends AnyObject>(onClick: (item: T) => void): DataTableAction<T> => ({
  icon: <EditIcon />,
  id: 'edit',
  onClick,
  tooltip: 'Edytuj',
})

export const deleteAction = <T extends AnyObject>(onClick: (item: T) => void): DataTableAction<T> => ({
  icon: <DeleteIcon />,
  id: 'delete',
  onClick,
  tooltip: 'Usuń',
})
