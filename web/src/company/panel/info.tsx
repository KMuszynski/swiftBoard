import React from 'react'

import {Box, Center, Spinner} from '@chakra-ui/react'

import {Company} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useGetQuery} from '@/common/hooks'
import {useAppSelector} from '@/store'

import CompanyEditorForm from '../editor-form'

const CompanyInfo = () => {
  const user = useAppSelector(selectProfile)
  const [company, loading] = useGetQuery<Company>(
    React.useMemo(
      () => ({
        from: 'company_info',
        match: user?.company ? {id: user?.company} : undefined,
      }),
      [user]
    )
  )

  return (
    <Center p={4}>
      {loading ? (
        <Spinner />
      ) : (
        <Box w="xl">
          <CompanyEditorForm item={company} />
        </Box>
      )}
    </Center>
  )
}

export default CompanyInfo
