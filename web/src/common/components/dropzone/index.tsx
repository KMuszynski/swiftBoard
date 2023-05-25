import React from 'react'

import {Box, Spinner, Text} from '@chakra-ui/react'
import {DropEvent, FileRejection, useDropzone} from 'react-dropzone'

import {acceptStyle, baseStyle, focusedStyle, rejectStyle} from './styles'

const Dropzone = ({
  disabled,
  loading,
  multiple,
  onDrop,
}: {
  disabled?: boolean
  loading?: boolean
  multiple?: boolean
  onDrop?: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
}) => {
  const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject} = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled: disabled ?? loading,
    multiple,
    onDrop,
  })

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const cursor = React.useMemo(() => (disabled ?? loading ? 'not-allowed' : 'pointer'), [disabled, loading])

  return (
    <Box {...getRootProps({style})} cursor={cursor}>
      <input {...getInputProps()} />
      {loading ? (
        <Spinner />
      ) : (
        <Text>
          Przeciągnij {multiple ? 'pliki' : 'plik'} tutaj, albo kliknij, aby wybrać{' '}
          {multiple ? 'pliki' : 'plik'}.
        </Text>
      )}
    </Box>
  )
}

export default Dropzone
