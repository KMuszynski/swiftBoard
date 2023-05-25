import {FormControl, FormLabel, Input, Select, Stack, Text} from '@chakra-ui/react'

import {Database} from '@/api/database.types'
import {CompanyEmployee} from '@/api/models'
import EditorModal from '@/common/components/editor-modal'
import {useEditorModalState} from '@/common/hooks'
import {companyRoleItems, emptyEmployee} from '@/company/costants'
import {CommonModalProps} from '@/utils/types'

const inputToUpsertArgs = (
  input: CompanyEmployee,
  company: string
): Database['public']['Functions']['upsert_company_user']['Args'] => ({
  company_id: company,
  email: input.email || '',
  position: input.position || '',
  requirements: input.requirements || [],
  responsibilities: input.responsibilities || [],
  role: input.role || 'employee',
})

const EmployeeEditorModal = ({
  item,
  company,
  open,
  onClose,
  onComplete,
}: CommonModalProps & {item: CompanyEmployee | null; company: string}) => {
  const {input, handleInputChange, handleUpsert, loading} = useEditorModalState<CompanyEmployee>({
    item,
    customRPC: 'upsert_company_user',
    emptyInput: emptyEmployee,
    inputToUpsertArgs: () => inputToUpsertArgs(input, company),
    open,
    onComplete,
    onClose,
  })

  return (
    <EditorModal
      title={`${item ? 'Edytuj' : 'Dodaj'} pracownika`}
      isOpen={open}
      onClose={onClose}
      onSubmit={handleUpsert}
      loading={loading}
    >
      <Stack>
        <FormControl isDisabled={loading || !!item}>
          <FormLabel>E-mail</FormLabel>
          <Input name="email" value={input.email ?? ''} onChange={handleInputChange} />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Stanowisko</FormLabel>
          <Input name="position" value={input.position ?? ''} onChange={handleInputChange} />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Rola</FormLabel>
          <Select name="role" value={input.role} onChange={handleInputChange}>
            {Object.entries(companyRoleItems).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Obowiązki</FormLabel>
          {/* TODO: create a strings list input */}
          <Stack>
            {input.responsibilities.map((r, i) => (
              <Text key={i}>{r}</Text>
            ))}
          </Stack>
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Wymagania</FormLabel>
          <Stack>
            {input.requirements.map((r, i) => (
              <Text key={i}>{r}</Text>
            ))}
          </Stack>
        </FormControl>
      </Stack>
    </EditorModal>
  )
}

export default EmployeeEditorModal
