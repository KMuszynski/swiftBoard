import React from 'react'

import {Box, Button, Flex, Input, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {ADMIN_PANEL} from '../../router/paths'
import FileInput from './file-input'

const CompanyCreator = () => {
  const [files, setFiles] = React.useState([])

  const handleSubmit = async () => {
    // Logic for handling the submission

    // Downloading files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileURL = typeof file === 'string' ? file : URL.createObjectURL(file)

      const link = document.createElement('a')
      link.href = fileURL
      link.download = typeof file === 'string' ? getFileNameFromURL(file) : file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Delay to allow the browser to release the object URL
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (typeof file !== 'string') {
        URL.revokeObjectURL(fileURL)
      }
    }
  }

  // Helper function to extract the file name from a URL
  const getFileNameFromURL = (url) => {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }

  return (
    <Box fontSize="2xl" w="2xl" bg="gray.800" rounded="xl" pb="6" px="6" margin="auto" mt="10">
      <Box py="6">
        <Text pb="4">1. Jak się nazywa Twoja firma?</Text>
        <Input />
      </Box>
      <Box py="6">
        <Text pb="4">2. Opisz krótko swoją firmę.</Text>
        <Input />
      </Box>
      <Box py="6">
        <Text pb="4">3. Załącz dodatkowe pliki (.pdf).</Text>
        <FileInput files={files} setFiles={setFiles} />
      </Box>
      <Flex justify="flex-end">
        <Button as={Link} to={ADMIN_PANEL} onClick={handleSubmit}>
          Zapisz
        </Button>
      </Flex>
    </Box>
  )
}

export default CompanyCreator
