import React from 'react'

import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import {Database} from '@/api/database.types'
import {Task} from '@/api/models'
import EditorModal from '@/common/components/editor-modal'
import {useEditorModalState} from '@/common/hooks'
import {emptyTask} from '@/company/costants'
import {CommonModalProps} from '@/utils/types'

const inputToUpsertArgs = (
  input: Task,
  company: string
): Database['public']['Tables']['tasks']['Insert'] => ({
  ...input,
  company,
})

const TaskEditorModal = ({
  item,
  company,
  open,
  onClose,
  onComplete,
}: CommonModalProps & {item: Task | null; company: string}) => {
  const {input, handleInputChange, handleCustomInputChange, handleUpsert, loading} =
    useEditorModalState<Task>({
      item,
      table: 'tasks',
      emptyInput: emptyTask,
      inputToUpsertArgs: () => inputToUpsertArgs(input, company),
      open,
      onComplete,
      onClose,
    })

  const handleMaxPointsChange = React.useCallback(
    (v) => handleCustomInputChange({max_points: v ? +v : undefined}),
    [handleCustomInputChange]
  )
  const handleMinPointsChange = React.useCallback(
    (v) => handleCustomInputChange({min_points: v ? +v : undefined}),
    [handleCustomInputChange]
  )

  return (
    <EditorModal
      title={`${item ? 'Edytuj' : 'Dodaj'} zadanie`}
      isOpen={open}
      onClose={onClose}
      onSubmit={handleUpsert}
      loading={loading}
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Tytuł</FormLabel>
          <Input name="name" value={input.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Opis</FormLabel>
          <Textarea name="description" value={input.description} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Liczba punktów</FormLabel>
          <HStack>
            <Stack>
              <FormLabel>Max</FormLabel>
              <NumberInput min={0} value={input.max_points} onChange={handleMaxPointsChange}>
                <NumberInputField />
              </NumberInput>
            </Stack>
            <Stack>
              <FormLabel>Min</FormLabel>
              <NumberInput min={0} value={input.min_points} onChange={handleMinPointsChange}>
                <NumberInputField />
              </NumberInput>
            </Stack>
          </HStack>
        </FormControl>
      </Stack>
    </EditorModal>
  )
}

export default TaskEditorModal