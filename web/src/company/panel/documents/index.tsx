import React from 'react'

import {DeleteIcon, DownloadIcon, EditIcon} from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'

import {CompanyDocumentSigned} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useListQuery} from '@/common/hooks'
import {useAppSelector} from '@/store'

import DocumentsUpload from './upload'

const Documents = () => {
  const user = useAppSelector(selectProfile)
  const [documents, loading, fetch] = useListQuery<CompanyDocumentSigned>(
    React.useMemo(
      () => ({
        from: 'company_documents_signed',
        order: ['name'],
        match: user?.company ? {company: user?.company} : undefined,
      }),
      [user]
    )
  )

  return (
    <Stack w="2xl" m="auto">
      <DocumentsUpload onComplete={fetch} />
      {loading ? (
        <Spinner />
      ) : (
        <TableContainer fontSize="2xl" m="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nazwa</Th>
                <Th isNumeric>Akcje</Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map((d, i) => (
                <Tr key={i}>
                  <Td>{d.name}</Td>
                  <Td>
                    <HStack justify="flex-end">
                      <Tooltip label="Pobierz">
                        <IconButton
                          aria-label="download-document"
                          icon={<DownloadIcon />}
                          size="sm"
                          as={Link}
                          target="_blank"
                          href={d.url ?? undefined}
                        />
                      </Tooltip>
                      <Tooltip label="Edytuj">
                        <IconButton aria-label="edit-document" icon={<EditIcon />} size="sm" />
                      </Tooltip>
                      <Tooltip label="Usuń">
                        <IconButton aria-label="delete-document" icon={<DeleteIcon />} size="sm" />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  )
}

export default Documents
