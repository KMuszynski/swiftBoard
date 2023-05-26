import React from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {Database} from '@/api/database.types'
import {useLoadingState} from '@/common/hooks'
import {CommonModalProps} from '@/utils/types'

type Props = CommonModalProps & {
  table?: keyof Database['public']['Tables']
  id?: string | number
  onDelete?: () => Promise<void>
  headerText?: string
  name?: string | null
  onFailTitle?: string
  onSuccessTitle?: string
}

const DeleteResourceDialog = ({
  onClose,
  open,
  table,
  id,
  onComplete,
  onDelete,
  headerText,
  name,
  onFailTitle,
  onSuccessTitle,
}: Props) => {
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null)

  const [handleSubmit, loading] = useLoadingState(
    React.useCallback(async () => {
      if (onDelete) {
        await onDelete()
      } else if (!!id && !!table) {
        const {error, count} = await supabase.from(table).delete({count: 'exact'}).match({id})
        if (error) throw error
        if (!count) throw new Error('No rows deleted')
      } else {
        throw new Error('Missing item details')
      }

      onClose()
      onComplete && onComplete()
    }, [id, onClose, onComplete, onDelete, table]),
    {
      onErrorToast: onFailTitle || 'Nie udało się usunąć zasobu',
      onSuccessToast: onSuccessTitle || 'Usunięto',
    }
  )

  return (
    <AlertDialog isOpen={open} onClose={onClose} size="lg" leastDestructiveRef={cancelButtonRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{headerText || 'Czy jesteś pewny?'}</AlertDialogHeader>
        <AlertDialogBody>
          Czy na pewno chcesz usunąć {name ? <strong>{name}</strong> : 'zasób'}? Pamiętaj, że zmiany są
          nieodwracalne.
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack py={2} justifyContent="space-evenly">
            <Button colorScheme="red" isLoading={loading} onClick={handleSubmit}>
              Usuń
            </Button>
            <Button ref={cancelButtonRef} variant="ghost" onClick={onClose} isDisabled={loading}>
              Anuluj
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteResourceDialog
