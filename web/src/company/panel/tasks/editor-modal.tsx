import React from 'react'

import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

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

  const [previewDescription, setPreviewDescription] = React.useState(false)

  const handleMaxPointsChange = React.useCallback(
    (v) => handleCustomInputChange({max_points: v ? +v : undefined}),
    [handleCustomInputChange]
  )
  const handleMinPointsChange = React.useCallback(
    (v) => handleCustomInputChange({min_points: v ? +v : undefined}),
    [handleCustomInputChange]
  )

  const isSubmitDisabled = React.useMemo(
    () => !input.name || !input.description || input.min_points > input.max_points,
    [input]
  )

  return (
    <EditorModal
      title={`${item ? 'Edytuj' : 'Dodaj'} zadanie`}
      isOpen={open}
      onClose={onClose}
      onSubmit={handleUpsert}
      loading={loading}
      isDisabled={isSubmitDisabled}
      size="3xl"
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Tytuł</FormLabel>
          <Input name="name" value={input.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <HStack mb={2}>
            <Text>Opis</Text>
            <Spacer />
            <Text>Edytowanie</Text>
            <Switch isChecked={previewDescription} onChange={() => setPreviewDescription((prev) => !prev)} />
            <Text>Podgląd</Text>
          </HStack>
          {previewDescription ? (
            <Box p={2} rounded="md" border="1px solid" borderColor="whiteAlpha.300">
              <ReactMarkdown children={input.description} components={ChakraUIRenderer()} skipHtml />
            </Box>
          ) : (
            <Textarea
              name="description"
              minH="300px"
              value={input.description}
              onChange={handleInputChange}
            />
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Liczba punktów</FormLabel>
          <HStack>
            <Stack spacing={0}>
              <FormLabel>Min</FormLabel>
              <NumberInput min={0} value={input.min_points} onChange={handleMinPointsChange}>
                <NumberInputField />
              </NumberInput>
            </Stack>
            <Stack spacing={0}>
              <FormLabel>Max</FormLabel>
              <NumberInput min={0} value={input.max_points} onChange={handleMaxPointsChange}>
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
