import React from 'react'

import {AddIcon, CloseIcon} from '@chakra-ui/icons'
import {HStack, IconButton, Input, InputProps, Stack, Text} from '@chakra-ui/react'

type Props = Omit<InputProps, 'value' | 'onChange'> & {
  value: string[]
  onChange: (v: string[]) => void
}

const ListInput = ({value, onChange, ...rest}: Props) => {
  const [input, setInput] = React.useState('')
  const handleDelete = React.useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange]
  )

  const handleAdd = React.useCallback(() => {
    if (input === '') return
    onChange([...value, input])
    setInput('')
  }, [value, onChange, input])

  return (
    <Stack>
      <HStack>
        <IconButton
          aria-label="add-value"
          icon={<AddIcon />}
          onClick={handleAdd}
          rounded="full"
          variant="outline"
          colorScheme="green"
          size="sm"
        />
        <Input value={input} onChange={(e) => setInput(e.target.value)} {...rest} />
      </HStack>
      {value.map((v, i) => (
        <HStack>
          <IconButton
            aria-label="remove-value"
            icon={<CloseIcon />}
            onClick={() => handleDelete(i)}
            rounded="full"
            variant="outline"
            colorScheme="red"
            size="sm"
          />
          <Text key={i}>{v}</Text>
        </HStack>
      ))}
    </Stack>
  )
}

export default ListInput
