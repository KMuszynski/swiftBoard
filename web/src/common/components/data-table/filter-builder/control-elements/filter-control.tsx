import {CloseIcon} from '@chakra-ui/icons'
import {Button, IconButton} from '@chakra-ui/react'
import {ActionProps} from 'react-querybuilder'

const FilterControl = ({handleOnClick, title}: ActionProps) => {
  return title?.match('Remove') ? (
    <IconButton aria-label="delete-button" onClick={handleOnClick} variant="ghost" size="sm">
      <CloseIcon />
    </IconButton>
  ) : (
    <Button color="primary" title={title} onClick={handleOnClick} pr={6} pl={6} variant="solid" size="sm">
      {title}
    </Button>
  )
}

export default FilterControl
