import {FormControl, FormLabel, Input, Stack, Textarea} from '@chakra-ui/react'

import {Database} from '@/api/database.types'
import {CompanyPosition} from '@/api/models'
import EditorModal from '@/common/components/editor-modal'
import {useEditorModalState} from '@/common/hooks'
import {emptyPosition} from '@/company/costants'
import {CommonModalProps} from '@/utils/types'

const inputToUpsertArgs = (
  input: CompanyPosition,
  company: string
): Database['public']['Tables']['company_positions']['Insert'] => ({
  company,
  id: input.id,
  name: input.name,
  requirements: input.requirements || '',
  responsibilities: input.responsibilities || '',
})

const PositionEditorModal = ({
  item,
  company,
  open,
  onClose,
  onComplete,
}: CommonModalProps & {item: CompanyPosition; company: string}) => {
  const {input, handleInputChange, handleUpsert, loading} = useEditorModalState<CompanyPosition>({
    item,
    table: 'company_positions',
    emptyInput: emptyPosition,
    inputToUpsertArgs: () => inputToUpsertArgs(input, company),
    open,
    onComplete,
    onClose,
  })

  return (
    <EditorModal
      title={`${item.id ? 'Edytuj' : 'Dodaj'} stanowisko`}
      isOpen={open}
      onClose={onClose}
      onSubmit={handleUpsert}
      loading={loading}
    >
      <Stack>
        <FormControl isDisabled={loading}>
          <FormLabel>Nazwa</FormLabel>
          <Input name="name" value={input.name ?? ''} onChange={handleInputChange} />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Obowiązki</FormLabel>
          <Textarea
            name="responsibilities"
            value={input.responsibilities ?? ''}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Wymagania</FormLabel>
          <Textarea name="requirements" value={input.requirements ?? ''} onChange={handleInputChange} />
        </FormControl>
      </Stack>
    </EditorModal>
  )
}

export default PositionEditorModal
