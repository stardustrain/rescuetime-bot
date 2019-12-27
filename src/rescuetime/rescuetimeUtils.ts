import { pick, head } from 'ramda'

import { DailySummary } from '../@types/models'

const TODAY_INDEX = 0
const YESTERDAY_INDEX = 1
const floor = Math.floor

const dailyDataFileds = [
  'id',
  'date',
  'productivityPulse',
  'allProductivePercentage',
  'allDistractingPercentage',
  'allProductiveHours',
  'allDistractingHours',
  'totalHours',
  'softwareDevelopmentHours',
  'softwareDevelopmentPercentage',
  'referenceAndLearningHours',
  'referenceAndLearningPercentage',
]

export const compareWithYesterday = (data: DailySummary[]) => {
  const today = data[TODAY_INDEX]
  const yesterday = data[YESTERDAY_INDEX]

  return {
    pulse: today.productivityPulse - yesterday.productivityPulse,
    allProductiveMins: {
      today: floor(today.allProductiveHours * 60),
      yesterday: floor(yesterday.allProductiveHours * 60),
      compare: floor((today.allProductiveHours * 60) - (yesterday.allProductiveHours * 60)),
    },
    allDistractingMins: {
      today: floor(today.allDistractingHours * 60),
      yesterday: floor(yesterday.allDistractingHours * 60),
      compare: floor((today.allDistractingHours * 60) - (yesterday.allDistractingHours * 60)),
    },
    softwareDevelopmentMins: {
      today: floor(today.softwareDevelopmentHours * 60),
      yesterday: floor(yesterday.softwareDevelopmentHours * 60),
      compare: floor((today.softwareDevelopmentHours * 60) - (yesterday.softwareDevelopmentHours * 60)),
    }
  }
}

export const getDayilDataSummary = (data: DailySummary[]): Partial<DailySummary> => ({
  ...pick(dailyDataFileds, head(data)),
})
