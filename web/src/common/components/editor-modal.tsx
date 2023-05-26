import React from 'react'

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'

type Props = ModalProps & {
  children: React.ReactNode
  loading?: boolean
  title?: string
  isDisabled?: boolean
  onSubmit: () => void
}

const EditorModal = ({children, loading, title, isDisabled, onSubmit, onClose, ...rest}: Props) => (
  <Modal onClose={onClose} size="xl" {...rest}>
    <ModalOverlay />
    <ModalContent>
      {title && <ModalHeader>{title}</ModalHeader>}
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Flex gap={2}>
          <Button isDisabled={loading} onClick={onClose} variant="outline">
            Anuluj
          </Button>
          <Button isLoading={loading} isDisabled={isDisabled} onClick={onSubmit}>
            Zapisz
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default EditorModal
