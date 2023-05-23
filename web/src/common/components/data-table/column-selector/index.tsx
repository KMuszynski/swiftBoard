import * as React from 'react'

import {
  Button,
  Checkbox,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react'

import {sentenceCase} from '@/utils/string'
import {CommonModalProps} from '@/utils/types'

type LabeledItem = {
  id: string
  label?: string
}

type Props = CommonModalProps & {
  items: LabeledItem[]
  initialValue: string[]
  onApply: (value: string[]) => void
}

const ColumnSelector = ({onClose, open, initialValue, items, onApply}: Props) => {
  const [value, setValue] = React.useState(initialValue)
  React.useEffect(() => setValue(initialValue), [open, initialValue])

  const handleApplyClick = React.useCallback(() => {
    onApply(value)
    onClose()
  }, [onApply, value, onClose])

  const handleSelectAllToggle = React.useCallback(
    () => setValue((prev) => (prev.length === items.length ? [] : items.map(({id}) => id))),
    [items]
  )

  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <Flex direction="row" alignItems="center">
          <ModalHeader whiteSpace="nowrap">Wybierz kolumny</ModalHeader>
          <Spacer />
          <Button mr={12} variant="ghost" size="sm" onClick={handleSelectAllToggle}>
            {value.length === items.length ? 'Odznacz' : 'Zaznacz'} wszystkie
          </Button>
          <ModalCloseButton mt={1.5} />
        </Flex>
        <ModalBody>
          <List>
            {items.map(({id, label}, index) => (
              <ListItem key={index} pt={1} pb={1}>
                <Flex flexDirection="row" alignItems="center">
                  <Checkbox
                    isChecked={value.includes(id)}
                    onChange={({target: {checked}}) =>
                      setValue(checked ? [...value, id] : value.filter((v) => v !== id))
                    }
                    size="lg"
                    mr={2}
                  >
                    {label ?? sentenceCase(id)}
                  </Checkbox>
                </Flex>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleApplyClick} isDisabled={!value.length}>
            Zatwierdź
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ColumnSelector
