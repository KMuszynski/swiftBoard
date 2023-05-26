import * as React from 'react'

import {useToast} from '@chakra-ui/react'
import {ImageType} from 'react-images-uploading'

import {supabase} from '@/api'
import {Database} from '@/api/database.types'
import {UpsertResponse} from '@/api/types'
import {AnyObject} from '@/utils/types'

export type ImageParams<T extends AnyObject> = {
  image?: ImageType
  key: string // column containing the image path in the database
  signed_key?: keyof T
  bucket: string
  scope?: string
}

export type useSupabaseUpsertParams<T extends AnyObject> = {
  input: T
  table?: string // optional when using customRPC, but needed for image upload
  imageParams?: ImageParams<T>
  customRPC?: keyof Database['public']['Functions'] // custom upsert function for more complicated entities
  inputToUpsertArgs?: (input: T) => AnyObject
  onComplete?: () => void
  onClose?: () => void
}

const useSupabaseUpsert = <T extends AnyObject>({
  input,
  table,
  imageParams,
  customRPC,
  inputToUpsertArgs,
  onComplete,
  onClose,
}: useSupabaseUpsertParams<T>) => {
  const toast = useToast()
  const [loading, setLoading] = React.useState(false)

  const handleImageUpload = React.useCallback(
    async (id: string) => {
      if (!imageParams || !table) return

      let path: string | null = null
      const {image, key, bucket, scope} = imageParams

      if (!image?.file && input[key] && image?.dataURL) return // image didn't change

      try {
        if (image?.file) {
          path = `${scope ? '/' + scope : ''}/${id}/${
            image.file.name
          }_${new Date().getTime()}.${image.file.name.split('.').pop()}`
          const {error} = await supabase.storage.from(bucket).upload(path, image.file, {upsert: true})
          if (error) throw error
        }

        const {error} = await supabase
          .from(table)
          .update({
            [key]: path, // null or path to newly uploaded img
          })
          .eq('id', id)
        if (error) throw error
      } catch (e) {
        console.error('Failed to upload image', e)
        toast({
          isClosable: true,
          status: 'error',
          title: 'Nie udało się zaktualizować zdjęcia',
        })
      }
    },
    [imageParams, table, toast, input]
  )

  const handleUpsert = React.useCallback(async () => {
    setLoading(true)

    try {
      const covertedInput = inputToUpsertArgs ? inputToUpsertArgs(input) : input

      const values: AnyObject = {}
      Object.entries(covertedInput).forEach(([k, v]) => {
        values[k] = v === '' ? undefined : v // filtering out empty strings
      })
      values.id = covertedInput.id || undefined

      console.log(values)

      let query
      if (customRPC) query = supabase.rpc(customRPC, values as any)
      else if (table)
        query = supabase
          .from(table)
          .upsert({...values, updated_at: new Date()})
          .select('id')
      else throw new Error('No upsert function or table specified')

      const {data, error} = await query
      if (error) throw error

      let id
      if (customRPC) {
        const response = data as unknown as UpsertResponse
        if ('error' in response) throw new Error(response.error)

        id = response.id
      } else {
        const response = data as unknown as
          | {
              id: string
            }[]
          | null
        if (!response?.length) throw new Error("Failed to retrieve upserted item's id")

        id = response[0].id
      }

      if (imageParams && id) await handleImageUpload(id)

      toast({isClosable: true, status: 'success', title: input.id ? 'Zaktualizowano' : 'Dodano'})
      onComplete && onComplete()
      onClose && onClose()
    } catch (e) {
      console.log((e as Error).message)
      toast({
        isClosable: true,
        status: 'error',
        title: (e as Error).message.includes('duplicate')
          ? 'Duplikat'
          : `Nie udało się ${input.id ? 'zaktualizować' : 'dodać'} zasobu`,
      })
    } finally {
      setLoading(false)
    }
  }, [toast, input, table, imageParams, customRPC, inputToUpsertArgs, onComplete, onClose, handleImageUpload])

  return {handleUpsert, loading}
}

export default useSupabaseUpsert
