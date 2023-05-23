import React from 'react'

import {CloseIcon} from '@chakra-ui/icons'
import {Box, Button, IconButton, Input} from '@chakra-ui/react'

type Props = {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const FileInput = ({files, setFiles}: Props) => {
  const hiddenInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    hiddenInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    setFiles((prevFiles) => (selectedFiles ? [...prevFiles, ...selectedFiles] : []))
  }

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  return (
    <>
      <Button onClick={handleClick}>Dodaj</Button>
      <Input
        type="file"
        ref={hiddenInputRef}
        accept=".pdf"
        display="none"
        onChange={handleFileChange}
        multiple
      />
      {files.map((file, index) => (
        <Box fontSize="sm" pt="2" key={index}>
          <IconButton
            size="sm"
            mr="3"
            icon={<CloseIcon />}
            aria-label="Usuń"
            variant="ghost"
            onClick={() => handleRemoveFile(index)}
          />
          {file.name}
        </Box>
      ))}
    </>
  )
}

export default FileInput
