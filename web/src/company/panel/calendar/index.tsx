import * as React from 'react'

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Box, Flex, IconButton, Stack, Text, useBreakpointValue} from '@chakra-ui/react'
import {addDays, format, intervalToDuration, isToday, startOfWeek, subDays} from 'date-fns'
import {pl} from 'date-fns/locale'

import {PGTimeRangeSlot} from '@/api/types'
import {setPrompts} from '@/chat/state'
import {events} from '@/company/costants'
import {useAppDispatch} from '@/store'
import {formatDate, formatEventDuration} from '@/utils/string'

const CompanyCalendar = ({employee}: {employee: boolean}) => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(
      setPrompts([
        {
          role: 'system',
          content: `You are a helpful assistan. Current date: ${new Date().toISOString()}. In the next message you will receive an array of events with from and to times in json format use it when answering about questions about upcoming or past events. You should think of these events as meetings of the user you are having conversation with in his company calendar.`,
        },
        {role: 'system', content: JSON.stringify(events)},
        {
          role: 'assistant',
          content: `Witaj! Masz jakieś pytania odnośnie ${employee ? 'swojego' : 'firmowego'} kalendarza?`,
        },
      ])
    )
  }, [employee, dispatch])

  const scrollRef = React.useRef<HTMLDivElement>(null)

  const daysToShow = useBreakpointValue({
    base: 2,
    md: 7,
    sm: 3,
  })
  const [range, setRange] = React.useState<PGTimeRangeSlot>()
  React.useEffect(() => {
    if (!daysToShow) return

    const from = daysToShow === 7 ? startOfWeek(new Date(), {weekStartsOn: 1}) : new Date()
    setRange({
      from,
      to: addDays(from, daysToShow ?? 1 - 1),
    })
  }, [daysToShow]) // eslint-disable-line

  const daysInWeek = React.useMemo(
    () =>
      range
        ? Array(daysToShow)
            .fill(1)
            .map((_, i) => addDays(range.from, i))
        : undefined,
    [range, daysToShow]
  )

  const handlePreviousWeek = React.useCallback(
    () =>
      setRange(
        (prev) =>
          prev && {
            from: subDays(prev.from, daysToShow ?? 1),
            to: subDays(prev.to, daysToShow ?? 1),
          }
      ),
    [daysToShow]
  )
  const handleNextWeek = React.useCallback(
    () =>
      setRange(
        (prev) =>
          prev && {
            from: addDays(prev.from, daysToShow ?? 1),
            to: addDays(prev.to, daysToShow ?? 1),
          }
      ),
    [daysToShow]
  )

  React.useEffect(() => {
    // reset calendar view to 8:00am on range change
    scrollRef.current && (scrollRef.current.scrollTop = 480) // 8 * 60 pixels = 8:00am
  }, [range])

  const groupedByDay = React.useMemo(
    () =>
      events?.reduce((res, e) => {
        const key = formatDate(e.from)
        return {
          ...res,
          [key]: [...(res[key] || []), e].sort((a, b) => a.from.getTime() - b.from.getTime()),
        }
      }, {} as Record<string, PGTimeRangeSlot[]>) || {},
    []
  )

  return (
    <Stack spacing={0} w="100%" h="100%" bg="gray.900" rounded="lg">
      <Stack direction="row" spacing={[4, null, 16]} align="center" justify="center" p={2}>
        <IconButton
          aria-label="Poprzedni tydzień"
          icon={<ChevronLeftIcon boxSize="40px" />}
          variant="outline"
          onClick={handlePreviousWeek}
          colorScheme="blue"
          rounded="full"
        />
        <Text fontSize="lg" fontWeight={500}>
          {range
            ? range.from.getMonth() === range.to.getMonth()
              ? `${range.from.getDate()}-${format(range.to, 'd LLLL y', {locale: pl})}`
              : `${format(range.from, 'd LLLL', {locale: pl})} - ${format(range.to, 'd LLLL y', {
                  locale: pl,
                })}`
            : '...'}
        </Text>
        <IconButton
          aria-label="Następny tydzień"
          icon={<ChevronRightIcon boxSize="40px" />}
          variant="outline"
          colorScheme="blue"
          rounded="full"
          onClick={handleNextWeek}
        />
      </Stack>

      <Flex direction="column" h="100%" overflowY="scroll" ref={scrollRef}>
        <Flex position="sticky" top={0} zIndex="sticky">
          <Box w="48px" bg="gray.900" />
          {daysInWeek?.map((day, i) => (
            <Flex
              key={i}
              flex={1}
              w="100%"
              h="82px"
              justify="center"
              align="center"
              bg={isToday(day) ? 'blue.900' : 'gray.600'}
              color="white"
              border="1px solid"
              borderColor="gray.300"
            >
              <Text fontWeight={700}>{format(day, 'd cccccc', {locale: pl})}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex align="stretch" position="relative" bg="gray.800">
          <Flex
            h="1440px" // 24 * 50 -> 1 px == 1 minute
            w="48px"
            direction="column"
            justify="space-between"
            align="flex-end"
            bg="gray.900"
            pr={2}
          >
            {Array(24)
              .fill(1)
              .map((_, i) => (
                <Flex
                  key={i}
                  position="absolute"
                  top={`${i * 60}px`}
                  w="100%"
                  left="0"
                  direction="column"
                  pl={2}
                >
                  <Box bg="gray.300" h="2px" w="100%" />
                  <Text>{i}:00</Text>
                </Flex>
              ))}
          </Flex>
          {daysInWeek?.map((day, i) => (
            <Flex key={i} flex={1} px={1} border="1px solid" borderColor="gray.300" position="relative">
              {groupedByDay[formatDate(day)]?.map((e, i) => (
                <EventTile key={i} event={e} />
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Stack>
  )
}

const EventTile = ({event}: {event: PGTimeRangeSlot}) => {
  const top = React.useMemo(() => event.from.getHours() * 60 + event.from.getMinutes(), [event])

  const heigth = React.useMemo(() => {
    const duration = intervalToDuration({
      start: event.from,
      end: event.to,
    })
    return (duration.hours || 0) * 60 + (duration.minutes || 0)
  }, [event])

  return (
    <Box
      w="calc(100% - 8px)"
      position="absolute"
      top={top}
      h={heigth}
      bg="cyan.600"
      rounded="lg"
      color="white"
      p={2}
      opacity={0.9}
    >
      <Text zIndex={2}>{formatEventDuration(event)}</Text>
    </Box>
  )
}

export default CompanyCalendar
