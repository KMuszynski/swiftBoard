import {format} from 'date-fns'
import _ from 'lodash'

import {PGTimeRangeSlot} from '@/api/types'

export const sentenceCase = (input: string) => _.startCase(_.toLower(input))

export const polishDateFormat = 'dd.MM.yyyy'
export const formatDate = (value: Date | string) => format(new Date(value), polishDateFormat)

export const polishTimestampFormat = 'dd.MM.yyyy HH:mm'
export const formatTimestamp = (value: Date | string) => format(new Date(value), polishTimestampFormat)

export const formatMeetingDuration = (start: Date | string, end: Date | string) =>
  `${format(new Date(start), 'dd.MM.yyyy | HH:mm')} - ${format(new Date(end), 'HH:mm')}`

export const formatEventTime = (value: Date | string) => format(new Date(value), "dd.MM.yyyy | 'godz.' HH:mm")

export const formatEventDuration = (value: PGTimeRangeSlot) =>
  `${format(value.from, 'HH:mm')} - ${format(value.to, 'HH:mm')}`

export const formatTimeSlot = (value: PGTimeRangeSlot) =>
  `${formatTimestamp(new Date(value.from))} - ${formatTimestamp(new Date(value.to))}`

const weekDaysPlural = ['poniedziałki', 'wtorki', 'środy', 'czwartki', 'piątki', 'soboty', 'niedziele']

export const formatWeeklyDuration = (value: PGTimeRangeSlot) =>
  `${weekDaysPlural[value.from.getDay()]} | ${format(new Date(value.from), 'HH:mm')} - ${format(
    new Date(value.to),
    'HH:mm'
  )}`
