import { gt, lte, cond, always, T, values, all, equals, pick, reduce, isNil, isEmpty } from 'ramda'

import { scaleLinear } from 'd3-scale'

import { parseTime } from '../utils/parseUtils'
import { ParsedOverview, ParsedActivity, Parsedefficiency } from '../rescuetime/weeklyReportUtils'

// 4 hour spent productive activity on 6 days, last 2 is value of weightedProductivty.
const OBJECTIVE_PRODUCTIVITY_SCORE = 4 * 6 * 3600 * 2

const STANDARD_PRODUCTIVE_TIME = 4
const MINIMUM_PRODUCTIVE_TIME = 2
const STANDARD_DISTRACTING_TIME = 2
const MINIMUM_DISTRACTING_TIME = 1

export const getProductiveImogi = cond<number, string>([
  [lte(STANDARD_PRODUCTIVE_TIME), always(':clap:')],
  [gt(MINIMUM_PRODUCTIVE_TIME), always(':weary:')],
  [T, always('')],
])

export const getDistractingImogi = cond<number, string>([
  [gt(MINIMUM_DISTRACTING_TIME), always(':clap:')],
  [lte(STANDARD_DISTRACTING_TIME), always(':weary:')],
  [T, always('')],
])

export const getChartImogi = (compareTime: number) => (
  compareTime > 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:'
)

export const format = (time: { hour: number, mins: number, isDecrease: boolean } | string) => {
  if (typeof time === 'string') { return time }

  const formattedMessage = (cond<{ hour: number, mins: number, isDecrease: boolean }, string>([
    [(x) => all(equals(0))(values(pick(['hour', 'mins'], x))), always('')],
    [(x) => equals(0, x.hour), always(`${time.mins}분`)],
    [(x) => equals(0, x.mins), always(`${time.hour}시간`)],
    [T, always(`${time.hour}시간 ${time.mins}분`)],
  ]))(time)

  return `${time.isDecrease ? '-' : ''}${formattedMessage}`
}

export const getScaledActivityScore = (activityScores: ParsedActivity[]) => {
  const totalScore = reduce((acc, v) => acc + (v.timeSpent * v.weightedProductivty), 0, activityScores)
  const scale = scaleLinear()
    .domain([0, OBJECTIVE_PRODUCTIVITY_SCORE])
    .range([0, 100])

  return Math.floor(scale(totalScore))
}

// NOTE: timeSpent unit is seconds.
export const getTotalTimeSpent = (time: number) => format(parseTime(time / (60 * 60)))
// NOTE: Check 6 days data.
export const getAvgTimeSpent = (time: number) => format(parseTime(time / (60 * 60 * 6)))


export const generateWeeklyOverviewData = (overviews?: ParsedOverview[]) => {
  if (isNil(overviews) || isEmpty(overviews)) {
    throw Error('Overview generate failed.')
  }

  return overviews.map(({ rank, timeSpent, category }) => ({
    rank,
    totalTimeSpent: getTotalTimeSpent(timeSpent),
    avgTimeSpent: getAvgTimeSpent(timeSpent),
    category,
  }))
}

export const generateWeeklyActivityData = (activities?: ParsedActivity[]) => {
  if (isNil(activities) || isEmpty(activities)) {
    throw Error('Activity generate failed.')
  }

  const score = getScaledActivityScore(activities)
  const results = activities.map(({ rank, timeSpent, activity }) => ({
    rank,
    totalTimeSpent: getTotalTimeSpent(timeSpent),
    avgTimeSpent: getAvgTimeSpent(timeSpent),
    activity,
  }))

  return {
    score,
    rows: results,
  }
}

export const generateWeeklyefficiencyData = (efficiencies: Parsedefficiency[]) => {
  // TODO: Implement this function.
  // { rank, totalTimeSpent, avgTimeSpent, efficiency}
}
