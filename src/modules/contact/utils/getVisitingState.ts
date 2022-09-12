import {holidays} from '@/modules/contact/data'
import {VisitingHour} from '@/modules/contact/types'
import {Preposition} from '@/types'
import {adjustHoursAndMinutes, dayjs, Dayjs, formatDayName} from '@/utils'

type VisitingState = {
  dayName?: string
  preposition: Preposition
  time24hr: string
  time12hr: string
}

export const getVisitingState = (
  visitingHours: VisitingHour[],
  date: Dayjs = dayjs(),
): VisitingState | null => {
  for (let offset = 0; offset <= 31; offset++) {
    const candidate = date.startOf('day').add(offset, 'day')

    // Find the first upcoming date with opening times.
    const candidateVisitingHours = visitingHours.find(
      ({closing, dayOfWeek}) =>
        candidate.day() === dayOfWeek &&
        !holidays.some(holiday => candidate.isSame(dayjs(holiday), 'day')) &&
        date.isBefore(adjustHoursAndMinutes(candidate, closing)),
    )

    if (candidateVisitingHours) {
      const {opening, closing} = candidateVisitingHours
      const candidateOpeningTime = adjustHoursAndMinutes(candidate, opening)
      const candidateClosingTime = adjustHoursAndMinutes(candidate, closing)
      let {preposition, dayName, time} = {} as VisitingState & {time: Dayjs}

      if (candidate.isSame(date, 'day')) {
        if (date.isBefore(candidateOpeningTime)) {
          preposition = Preposition.from
          time = candidateOpeningTime
        } else {
          preposition = Preposition.until
          time = candidateClosingTime
        }
      } else {
        preposition = Preposition.from
        dayName = formatDayName(candidate, date)
        time = candidateOpeningTime
      }

      return {
        dayName,
        preposition,
        time24hr: time.format('HH.mm'),
        time12hr: time.format('h:mm'),
      }
    }
  }

  return null
}
