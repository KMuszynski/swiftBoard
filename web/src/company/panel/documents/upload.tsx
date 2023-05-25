import React from 'react'

import {CloseIcon} from '@chakra-ui/icons'
import {Button, HStack, IconButton, Input, InputGroup, InputRightAddon, Stack} from '@chakra-ui/react'

import {supabase} from '@/api'
import {uploadFile} from '@/api/utils'
import {selectProfile} from '@/auth/state'
import Dropzone from '@/common/components/dropzone'
import {useLoadingState} from '@/common/hooks'
import {COMPANIES_BUCKET} from '@/constants'
import {useAppSelector} from '@/store'

type Document = File & {
  customName?: string
}

const DocumentsUpload = ({onComplete}: {onComplete: () => void}) => {
  const user = useAppSelector(selectProfile)
  const [files, setFiles] = React.useState<Document[]>([])

  const handleDrop = React.useCallback(
    (files: Document[]) =>
      setFiles((prev) => [
        ...prev,
        ...(files.map((f) => {
          f.customName = f.name.split('.', 2)[0]
          return f
        }) as Document[]),
      ]),
    []
  )

  const handleRemoveFile = React.useCallback(
    (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index)),
    []
  )
  const handleNameChange = React.useCallback(
    (index: number, value: string) =>
      setFiles((prev) =>
        prev.map((f, i) => {
          if (i === index) f.customName = value
          return f
        })
      ),
    []
  )

  const [handleSave, loading] = useLoadingState(
    React.useCallback(async () => {
      if (!user?.company) return

      const uploadedFiles: {file: Document; path: string}[] = []
      for (const file of files) {
        const path = await uploadFile(file, COMPANIES_BUCKET, user?.company)
        uploadedFiles.push({file, path})
      }

      const {error} = await supabase.from('company_documents').insert(
        uploadedFiles.map((f) => ({
          company: user?.company!,
          name: f.file.customName || f.file.name,
          path: f.path,
        }))
      )
      if (error) throw error

      onComplete && onComplete()
      setFiles([])
    }, [user, files, onComplete]),
    {
      onSuccessToast: 'Dokumenty zostały zapisane',
      onErrorToast: 'Nie udało się zapisać dokumentów',
    }
  )

  return (
    <Stack>
      <Dropzone multiple onDrop={handleDrop} disabled={loading} />
      {files.map((file, i) => (
        <HStack fontSize="sm" pt="2" key={i}>
          <IconButton
            size="sm"
            rounded="full"
            icon={<CloseIcon />}
            aria-label="Usuń"
            onClick={() => handleRemoveFile(i)}
          />
          <InputGroup>
            <Input value={file.customName} onChange={(e) => handleNameChange(i, e.target.value)} />
            <InputRightAddon children={'.' + file.name?.split('.', 2)[1]} />
          </InputGroup>
        </HStack>
      ))}
      {!!files.length && (
        <Button colorScheme="green" isLoading={loading} onClick={handleSave}>
          Prześlij
        </Button>
      )}
    </Stack>
  )
}

export default DocumentsUpload
