import { camelizeKeys } from 'humps'
import { indexBy, prop } from 'ramda'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

import { Parsedefficiency } from '../rescuetime/weeklyReportUtils'

export const getSpentTime = (ce?: Parsedefficiency) => ce?.timeSpent ?? 0

export const mergeTimeByCategory = (efficiencies: Parsedefficiency[]) => {
  const ce = camelizeKeys(indexBy(prop('efficiency'), efficiencies)) as {[key: string]: Parsedefficiency}

  return {
    productiveTime: getSpentTime(ce.productiveTime) + getSpentTime(ce.veryProductiveTime),
    distractingTime: getSpentTime(ce.distractingTime) + getSpentTime(ce.veryDistractingTime),
    neutralTime: getSpentTime(ce.neutralTime),
  }
}

export const getToday = () => dayjs().utc().utcOffset(9)
