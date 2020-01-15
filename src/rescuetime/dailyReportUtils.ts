import { find, sum, values, propEq } from 'ramda'

import { parseEfficiency, parseOverview, parseActivity } from './weeklyReportUtils'
import { mergeTimeByCategory } from '../utils/misc'
import { getScaledActivityScore } from '../webhook/messageUtils'

import { Efficiency, Overview, Activity } from '../@types/models'

export type DailySummary = ReturnType<typeof getDayilDataSummary>
export type CompareSummary = ReturnType<typeof compareWithYesterday>
type DailyDataSummaryParams = {
  efficiency: Efficiency
  overview: Overview
  activity: Activity
}

const TODAY_INDEX = 0
const YESTERDAY_INDEX = 1
const floor = Math.floor

const getPercentage = (n: number) => parseFloat((n * 100).toFixed(1))

export const compareWithYesterday = (data: [DailySummary, DailySummary]) => {
  const today = data[TODAY_INDEX]
  const yesterday = data[YESTERDAY_INDEX]

  return {
    allProductiveTime: {
      today: floor(today.productiveTime),
      yesterday: floor(yesterday.productiveTime),
      compare: floor(today.productiveTime - yesterday.productiveTime),
    },
    allDistractingTime: {
      today: floor(today.distractingTime),
      yesterday: floor(yesterday.distractingTime),
      compare: floor(today.distractingTime - yesterday.distractingTime),
    },
    softwareDevelopmentTime: {
      today: floor(today.programDevlopmentTime),
      yesterday: floor(yesterday.programDevlopmentTime),
      compare: floor(today.programDevlopmentTime - yesterday.programDevlopmentTime),
    },
  }
}

export const getDayilDataSummary = ({
  efficiency,
  overview,
  activity,
}: DailyDataSummaryParams) => {
  const parsedEfficiency = mergeTimeByCategory(parseEfficiency(efficiency))
  const parsedOverview = find(propEq('category', 'Software Development'), parseOverview(overview))

  const programDevlopmentTime = parsedOverview?.timeSpent ?? 0
  const totalTime = sum(values(parsedEfficiency))

  return {
    totalTime,
    productiveTime: parsedEfficiency.productiveTime,
    distractingTime: parsedEfficiency.distractingTime,
    programDevlopmentTime,
    productiveTimePercentage: getPercentage(parsedEfficiency.productiveTime / totalTime) || 0,
    distractingTimePercentage: getPercentage(parsedEfficiency.distractingTime / totalTime) || 0,
    programDevlopmentTimePercentage: getPercentage(programDevlopmentTime / totalTime) || 0,
    score: getScaledActivityScore({ activities: parseActivity(activity), isDayily: true }),
  }
}
