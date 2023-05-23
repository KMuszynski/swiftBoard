import * as React from 'react'

import {AddIcon, CloseIcon} from '@chakra-ui/icons'
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import {useSearchParams} from 'react-router-dom'

import FilterBuilder from '.'
import AppliedFilters from './applied-filters'
import {FilterField} from './types'
import {buildFilterFromQueryString, buildQueryFilter, removeFieldFromFilter} from './utils'

type Props = {
  filterFields: FilterField[]
}

const FilterMenu = ({filterFields}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {isOpen, onOpen, onClose} = useDisclosure()

  const appliedFilters = React.useMemo(
    () => buildFilterFromQueryString(searchParams.get('filter') ?? ''),
    [searchParams]
  )

  const handleClearFilter = React.useCallback(() => {
    setSearchParams('')
  }, [setSearchParams])

  const handleRemoveFilter = React.useCallback(
    (path: number[]) => {
      if (!appliedFilters) return

      const newQuery = buildQueryFilter(removeFieldFromFilter(appliedFilters, path))
      setSearchParams(newQuery ? {filter: newQuery} : '')
    },
    [appliedFilters, setSearchParams]
  )

  return (
    <>
      <HStack align="center">
        <Tooltip label="Dodaj filtry" isDisabled={!appliedFilters}>
          <Button
            aria-label="add-filters"
            size="sm"
            variant={appliedFilters ? 'outline' : 'ghost'}
            onClick={onOpen}
            colorScheme="blue"
            p={2}
          >
            <HStack>
              <AddIcon />
              {!appliedFilters && <Text fontWeight="light">Dodaj filtry</Text>}
            </HStack>
          </Button>
        </Tooltip>
        {appliedFilters && (
          <>
            <Tooltip label="Wyczyść filtry">
              <Button aria-label="clear-filter" size="sm" variant="ghost" p={1} onClick={handleClearFilter}>
                <CloseIcon />
              </Button>
            </Tooltip>
            <Flex gap={1} wrap="wrap" align="center" color="blue.200">
              <AppliedFilters
                value={appliedFilters}
                onRemove={handleRemoveFilter}
                filterFields={filterFields}
              />
            </Flex>
          </>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj filtry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FilterBuilder fields={filterFields} onSubmit={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FilterMenu
