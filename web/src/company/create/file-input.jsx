import React from 'react'

import {CloseIcon} from '@chakra-ui/icons'
import {Box, Button, IconButton, Input} from '@chakra-ui/react'

const FileInput = ({files, setFiles}) => {
  const hiddenInputRef = React.useRef(null)

  const handleClick = () => {
    hiddenInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
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
