import { camelizeKeys } from 'humps'
import { indexBy, prop } from 'ramda'

import { Parsedefficiency } from '../rescuetime/weeklyReportUtils'

export const mergeTimeByCategory = (efficiencies: Parsedefficiency[]) => {
  const ce = camelizeKeys(indexBy(prop('efficiency'), efficiencies)) as {[key: string]: Parsedefficiency}

  return {
    productiveTime: ce.productiveTime.timeSpent + ce.veryProductiveTime.timeSpent,
    distractingTime: ce.distractingTime.timeSpent + ce.veryDistractingTime.timeSpent,
    neutralTime: ce.neutralTime.timeSpent,
  }
}
