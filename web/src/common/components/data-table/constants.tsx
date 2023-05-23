import {CheckIcon, CloseIcon} from '@chakra-ui/icons'
import {Avatar, Checkbox, Image, Tag, Text, Tooltip, Wrap, WrapItem} from '@chakra-ui/react'

import defaultAvatar from '@/common/icons/default-avatar.svg'
import {formatTimestamp} from '@/utils/string'

import {RenderPreset} from './types'

export const defaultRowsPerPagePresets = [5, 10, 25, 50, 100]

export const renderPresetToRenderer: Record<RenderPreset, (value: any) => any> = {
  avatar: (value: any) => (
    <Avatar src={value ?? ''} icon={<Image src={defaultAvatar} boxSize="64px" />} boxSize="64px" />
  ),
  boolean: (value: any) => ((value as boolean) ? 'Prawda' : 'Fałsz'),
  booleanIcons: (value: any) => (
    <div>
      {value ? (
        <Tooltip label="Tak">
          <CheckIcon color="#3eb03e" />
        </Tooltip>
      ) : (
        <Tooltip label="Nie">
          <CloseIcon color="#e53e3e" />
        </Tooltip>
      )}
    </div>
  ),
  checkbox: (value: any) => <Checkbox checked={value} isDisabled={true} />,
  code: (value: any) => <code>{value || '-'}</code>,
  longString: (value: any) => (
    <Tooltip label={value}>
      <Text overflow="hidden" maxWidth={100} textOverflow="ellipsis">
        {value}
      </Text>
    </Tooltip>
  ),
  monetary: (value: any) => ((+value || 0) / 100).toFixed(2),
  tags: (value: any) => (
    <Wrap w="200px">
      {value?.map((v: any, i: number) => (
        <WrapItem key={i}>
          <Tag>{v}</Tag>
        </WrapItem>
      ))}
    </Wrap>
  ),
  timestamp: (value: any) => (value ? formatTimestamp(new Date(value)) : '-'),
}

const booleanCSV = (value: any) => ((value as boolean) ? 'Tak' : 'Nie')

export const renderPresetToCSV: {[key in RenderPreset]?: (value: any) => any} = {
  boolean: booleanCSV,
  booleanIcons: booleanCSV,
  checkbox: booleanCSV,
  // in Poland we use "," as decimal place seperators
  monetary: (value: any) => ((+value || 0) / 100).toLocaleString('pl', {minimumFractionDigits: 2}),
  tags: (value: any) => value?.join(', '),
}
