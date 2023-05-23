import React, {useCallback, useMemo} from 'react'

import {DeleteIcon} from '@chakra-ui/icons'
import {Box, Button, Center, Flex, Icon, Image, Stack, useColorModeValue} from '@chakra-ui/react'
import {MdImage as ImageIcon} from 'react-icons/md'
import ImageUploading, {ImageListType, ImageType} from 'react-images-uploading'

const defaultSize = '300px'

const ImageUpload = ({
  value,
  onChange,
  editing,
  height,
  width,
  overlay,
}: {
  onChange: (value: ImageType | undefined) => void
  value?: ImageType
  editing: boolean
  height?: number | string
  width?: number
  overlay?: React.ReactElement
}) => {
  const emptyImageBackground = useColorModeValue('gray.100', 'whiteAlpha.200')

  const onImageChange = useCallback(
    (imageList: ImageListType) => {
      imageList.length && onChange(imageList[0])
    },
    [onChange]
  )

  const onImageRemove = useCallback(() => {
    onChange(undefined)
  }, [onChange])

  const values = useMemo(() => (value ? [value] : []), [value])

  return (
    <ImageUploading multiple={false} value={values} onChange={onImageChange} maxNumber={1}>
      {({onImageUpload, isDragging, dragProps}) => (
        <Flex justify="flex-start" position="relative">
          {value?.dataURL ? (
            <Stack align="center" width={width || '100%'}>
              <Box position="relative" width={width || '100%'}>
                <Image
                  src={value.dataURL}
                  width={width || '100%'}
                  height={height || defaultSize}
                  objectFit="contain"
                  rounded="xl"
                />
                {editing && (
                  <Center
                    id="image-overlay"
                    position="absolute"
                    top={0}
                    opacity={0}
                    backgroundColor="blackAlpha.600"
                    onClick={onImageRemove}
                    width="100%"
                    height="100%"
                    zIndex={1}
                    cursor="pointer"
                    _hover={{opacity: 1}}
                    rounded="xl"
                  >
                    <DeleteIcon color="white" boxSize={5} />
                  </Center>
                )}
              </Box>
            </Stack>
          ) : editing ? (
            <Button
              colorScheme={isDragging ? 'teal' : 'gray'}
              onClick={onImageUpload}
              {...dragProps}
              height={height || defaultSize}
              width={width || '100%'}
              rounded="lg"
            >
              <Icon as={ImageIcon} boxSize={8} />
            </Button>
          ) : (
            <Box
              width={width || '100%'}
              height={height || defaultSize}
              backgroundColor={emptyImageBackground}
            />
          )}
          {overlay && (
            <Box position="absolute" left={0} top={0} width="100%" height="100%" zIndex={0}>
              {overlay}
            </Box>
          )}
        </Flex>
      )}
    </ImageUploading>
  )
}

export default ImageUpload
