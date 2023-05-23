import * as React from 'react'

import {ImageType} from 'react-images-uploading'

import {AnyObject} from '@/utils/types'

import useSupabaseUpsert, {useSupabaseUpsertParams} from './use-upsert'

type Params<T extends AnyObject> = Omit<useSupabaseUpsertParams<T>, 'input'> & {
  item?: T | null
  emptyInput: T
  open?: boolean
}

const useEditorModalState = <T extends AnyObject>({
  table,
  item,
  emptyInput,
  imageParams,
  customRPC,
  inputToUpsertArgs,
  onComplete,
  onClose,
  open,
}: Params<T>) => {
  const [input, setInput] = React.useState<T>(emptyInput)
  const [image, setImage] = React.useState<ImageType>()

  React.useEffect(() => {
    setInput(item || emptyInput)

    if (item && imageParams) {
      const key = imageParams.signed_key || imageParams.key
      setImage(item[key] ? {dataURL: item[key] as string} : undefined)
    }
  }, [item, open]) // eslint-disable-line

  const {handleUpsert, loading} = useSupabaseUpsert<T>({
    table,
    input,
    imageParams: imageParams ? {...imageParams, image} : undefined,
    customRPC,
    inputToUpsertArgs,
    onComplete,
    onClose,
  })

  // for most use cases, uses "name" prop of the input element
  const handleInputChange = React.useCallback(
    ({target}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const {type, name} = target
      const value = 'checked' in target && type === 'checkbox' ? target.checked : target.value

      setInput((input) => ({...input, [name]: value}))
    },
    []
  )

  // for any other input element not supported by 'handleInputChange'
  const handleCustomInputChange = React.useCallback((partial: Partial<T>) => {
    setInput((input) => ({...input, ...partial}))
  }, [])

  return {input, handleInputChange, handleCustomInputChange, image, setImage, handleUpsert, loading}
}

export default useEditorModalState
