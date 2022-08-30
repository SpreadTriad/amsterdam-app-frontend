import {ExceptionDate} from '@/modules/contact/types'

export const holidays: string[] = ['2022-12-26', '2022-08-30']

export const exceptionDates: ExceptionDate[] = [
  {
    date: '2022-12-26',
  },
  {
    date: '2022-12-05',
    opens: {
      hours: 9,
      minutes: 0,
    },
    closes: {
      hours: 16,
      minutes: 0,
    },
  },
]
