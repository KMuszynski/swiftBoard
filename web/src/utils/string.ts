import {format} from 'date-fns'
import _ from 'lodash'

export const sentenceCase = (input: string) => _.startCase(_.toLower(input))

export const polishDateFormat = 'dd.MM.yyyy'
export const formatDate = (value: Date | string) => format(new Date(value), polishDateFormat)

export const polishTimestampFormat = 'dd.MM.yyyy HH:mm'
export const formatTimestamp = (value: Date | string) => format(new Date(value), polishTimestampFormat)
