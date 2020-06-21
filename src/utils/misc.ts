import { camelizeKeys } from 'humps'
import { indexBy, prop } from 'ramda'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { ParsedEfficiency } from './parseUtils'

dayjs.extend(utc)

export const getSpentTime = (ce?: ParsedEfficiency) => ce?.timeSpent ?? 0

export const getWeekRange = () => {
  const currentDate = getToday()
  const from = currentDate.subtract(6, 'day').format('YYYY-MM-DD')
  const to = currentDate.subtract(1, 'day').format('YYYY-MM-DD')

  return {
    from,
    to,
  }
}

export const mergeTimeByCategory = (efficiencies: ParsedEfficiency[]) => {
  const ce = camelizeKeys(indexBy(prop('efficiency'), efficiencies)) as { [key: string]: ParsedEfficiency }

  return {
    productiveTime: getSpentTime(ce.productiveTime) + getSpentTime(ce.veryProductiveTime),
    distractingTime: getSpentTime(ce.distractingTime) + getSpentTime(ce.veryDistractingTime),
    neutralTime: getSpentTime(ce.neutralTime),
  }
}

export const getToday = () => dayjs().utc().utcOffset(9)
