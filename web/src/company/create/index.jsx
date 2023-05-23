import React from 'react'

import {Box, Button, Flex, Input, Text} from '@chakra-ui/react'

import {supabase} from '../../api'
import FileInput from './file-input'

const CompanyCreator = () => {
  const [files, setFiles] = React.useState([])

  const handleSubmit = async () => {
    // Logic for handling the submission

    // Uploading files
    try {
      console.log(files)
      for (const file of files) {
        const filename = `${file.name}`

        const {error} = await supabase.storage.from('documents').upload(filename, file, {upsert: true})
        if (error) throw error
      }
    } catch (err) {
      console.log(err)
    }
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
        <Button onClick={handleSubmit}>Zapisz</Button>
      </Flex>
    </Box>
  )
}

export default CompanyCreator
