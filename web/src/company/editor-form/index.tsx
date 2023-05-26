import React from 'react'

import {Box, Button, Flex, FormControl, FormLabel, Input, Stack, Textarea} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import {Database} from '@/api/database.types'
import {Company} from '@/api/models'
import ImageUpload from '@/common/components/image-upload'
import {useEditorModalState} from '@/common/hooks'
import {COMPANIES_BUCKET} from '@/constants'
import {HOME} from '@/router/paths'

import {emptyCompany} from '../costants'

const inputToUpsertArgs = (input: Company): Database['public']['Functions']['upsert_company']['Args'] => ({
  company_id: input.id || undefined,
  description: input.description,
  name: input.name,
})

const CompanyEditorForm = ({item}: {item: Company | null}) => {
  const navigate = useNavigate()

  const onComplete = React.useCallback(() => {
    navigate(HOME)
  }, [navigate])

  const {input, handleInputChange, image, setImage, handleUpsert, loading} = useEditorModalState<Company>({
    item,
    table: 'companies',
    customRPC: 'upsert_company',
    emptyInput: emptyCompany,
    inputToUpsertArgs,
    onComplete,
    imageParams: {
      bucket: COMPANIES_BUCKET,
      key: 'logo',
    },
  })

  return (
    <Flex gap={10} justify="center" align="center" pt={28}>
      <ImageUpload width={420} height={420} editing={true} value={image} onChange={setImage} />
      <Box>
        <FormControl isDisabled={loading} w="2xl" pb={3}>
          <FormLabel fontSize="xl">Nazwa</FormLabel>
          <Input name="name" value={input.name ?? ''} onChange={handleInputChange} fontSize="lg" />
        </FormControl>
        <FormControl isDisabled={loading} w="2xl" pb={3}>
          <FormLabel fontSize="xl">Opis</FormLabel>
          <Textarea
            fontSize="md"
            name="description"
            value={input.description ?? ''}
            onChange={handleInputChange}
            minH={item ? '350px' : '150px'}
          />
        </FormControl>
        <Flex justify="flex-end">
          <Button colorScheme="blue" onClick={handleUpsert} isLoading={loading}>
            Zapisz
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default CompanyEditorForm
