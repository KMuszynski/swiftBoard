import React from 'react'

import {Select as ChakraSelect, FormControl, FormLabel, Stack, Textarea} from '@chakra-ui/react'
import Select, {SingleValue} from 'react-select'

import {Database} from '@/api/database.types'
import {CompanyEmployee, CompanyPosition, User} from '@/api/models'
import {selectProfile} from '@/auth/state'
import EditorModal from '@/common/components/editor-modal'
import {useEditorModalState, useListQuery} from '@/common/hooks'
import {companyRoleItems, emptyEmployee} from '@/company/costants'
import {useAppSelector} from '@/store'
import {selectStyles} from '@/theme/components/select'
import {CommonModalProps, SelectOption} from '@/utils/types'

const inputToUpsertArgs = (
  input: CompanyEmployee,
  company: string
): Database['public']['Tables']['company_users']['Insert'] => ({
  company,
  user: input.id || '',
  position: input.position_id,
  requirements: input.requirements || '',
  responsibilities: input.responsibilities || '',
  role: input.role || 'employee',
})

const EmployeeEditorModal = ({
  item,
  company,
  open,
  onClose,
  onComplete,
}: CommonModalProps & {item: CompanyEmployee; company: string}) => {
  const user = useAppSelector(selectProfile)
  const {input, handleInputChange, handleCustomInputChange, handleUpsert, loading} =
    useEditorModalState<CompanyEmployee>({
      item,
      table: 'company_users',
      emptyInput: emptyEmployee,
      inputToUpsertArgs: () => inputToUpsertArgs(input, company),
      open,
      onComplete,
      onClose,
    })

  const [users] = useListQuery<User>(
    React.useMemo(
      () => ({
        from: 'users',
        order: ['email'],
      }),
      []
    )
  )
  const usersOptions: SelectOption[] = React.useMemo(
    () => users.map((u) => ({value: u.id, label: u.email})),
    [users]
  )
  const handleUserChange = React.useCallback(
    (v: SingleValue<SelectOption>) => v?.value && handleCustomInputChange({id: v.value}),
    [handleCustomInputChange]
  )

  const [positions] = useListQuery<CompanyPosition>(
    React.useMemo(
      () => ({
        from: 'company_positions',
        order: ['name'],
        match: user?.company ? {company: user?.company} : undefined,
      }),
      [user]
    )
  )
  const positionsOptions: SelectOption[] = React.useMemo(
    () => positions.map((p) => ({value: p.id, label: p.name})),
    [positions]
  )
  const handlePositionChange = React.useCallback(
    (v: SingleValue<SelectOption>) => v?.value && handleCustomInputChange({position_id: v.value}),
    [handleCustomInputChange]
  )

  return (
    <EditorModal
      title={`${item.id ? 'Edytuj' : 'Dodaj'} pracownika`}
      isOpen={open}
      onClose={onClose}
      onSubmit={handleUpsert}
      loading={loading}
    >
      <Stack>
        <FormControl isDisabled={loading || !!item.id}>
          <FormLabel>E-mail</FormLabel>
          <Select
            placeholder="E-mail"
            value={usersOptions.filter((s) => s.value === input.id)}
            options={usersOptions}
            onChange={handleUserChange}
            styles={selectStyles}
            isDisabled={loading || !!item.id}
          />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Stanowisko</FormLabel>
          <Select
            placeholder="Stanowisko"
            value={positionsOptions.filter((s) => s.value === input.position_id)}
            options={positionsOptions}
            onChange={handlePositionChange}
            styles={selectStyles}
            isDisabled={loading}
          />
        </FormControl>
        <FormControl isDisabled={loading}>
          <FormLabel>Rola</FormLabel>
          <ChakraSelect name="role" value={input.role} onChange={handleInputChange}>
            {Object.entries(companyRoleItems).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </ChakraSelect>
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

export default EmployeeEditorModal
