import {useCallback, useState} from 'react'

import {Button, Divider, Flex, LightMode, Stack, Text, useToast} from '@chakra-ui/react'
import {Provider} from '@supabase/supabase-js'
import {FaLinkedin} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

import {supabase} from '../../api'
import {WEB_BASE_URL} from '../../constants'

const SocialSignIn = ({isDisabled}) => {
  const toast = useToast()
  const [providerLoading, setProviderLoading] = useState<Provider | null>(null)

  const handleProvider = useCallback(
    async (provider: Provider) => {
      setProviderLoading(provider)
      try {
        const {error} = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: WEB_BASE_URL,
          },
        })
        if (error) throw error
      } catch (e) {
        setProviderLoading(null)
        toast({
          description: (e as Error).toString(),
          isClosable: true,
          status: 'error',
          title: 'Logowanie nie powiodło się',
        })
      }
    },
    [toast]
  )
  const handleGoogle = useCallback(() => handleProvider('google'), [handleProvider])
  const handleLinkedIn = useCallback(() => handleProvider('linkedin'), [handleProvider])

  return (
    <>
      <Flex direction="row" alignItems="center">
        <Divider flex={1} />
        <Text fontSize="xs" mx={2} color="gray.200">
          lub zaloguj się za pomocą...
        </Text>
        <Divider flex={1} />
      </Flex>
      <LightMode>
        <Stack spacing={4}>
          <Button
            colorScheme="linkedin"
            leftIcon={<FaLinkedin />}
            size="sm"
            onClick={handleLinkedIn}
            isLoading={providerLoading === 'facebook'}
            isDisabled={isDisabled || !!providerLoading}
            boxShadow="lg"
          >
            LinkedIn
          </Button>
          <Button
            leftIcon={<FcGoogle />}
            size="sm"
            onClick={handleGoogle}
            isLoading={providerLoading === 'google'}
            isDisabled={isDisabled || !!providerLoading}
            bg="white"
            boxShadow="lg"
            color="gray.900"
          >
            Google
          </Button>
        </Stack>
      </LightMode>
    </>
  )
}

export default SocialSignIn
