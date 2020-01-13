import { isEmpty, isNil, sum, pipe, map } from 'ramda'

import { parseTime } from '../utils/parseUtils'
import {
  getChartImogi,
  getDistractingImogi,
  getProductiveImogi,
  format,
  generateWeeklyActivityData,
  generateWeeklyOverviewData,
  generateWeeklyefficiencyData,
} from './messageUtils'

import { DailySummary, WeeklyData } from '../@types/models'

export const generateCompareMessage = (data?: {[key: string]: any}) => {
  if (isEmpty(data) || isNil(data)) {
    throw new Error('Yesterday compare message generate failed.')
  }

  const { allProductiveMins, allDistractingMins, softwareDevelopmentMins } = data

  return {
    compareProductiveImogi: `${getChartImogi(allProductiveMins.compare)}`,
    compareProductiveTime: format(parseTime(allProductiveMins.compare / 60)),
    compareDistractingImogi: `${getChartImogi(allDistractingMins.compare)}`,
    compareDistractingTime: format(parseTime(allDistractingMins.compare / 60)),
    compareSoftwareDevelopmentImogi: `${getChartImogi(softwareDevelopmentMins.compare)}`,
    compareSoftwareTime: format(parseTime(softwareDevelopmentMins.compare / 60)),
  }
}

export const generateTodayMessage = (summaryData?: Partial<DailySummary>, compareData?: {[key: string]: any}) => {
  if (isEmpty(summaryData) || isNil(summaryData)) {
    throw new Error('Summary generate failed.')
  }

  const productiveTime = parseTime(summaryData.allProductiveHours)
  const distractingTime = parseTime(summaryData.allDistractingHours)
  const programTime = parseTime(summaryData.softwareDevelopmentHours)

  const produtiveEmogi = (typeof productiveTime === 'string') ? '' : getProductiveImogi((productiveTime.hour))
  const distractingEmogi = (typeof distractingTime === 'string') ? '' : getDistractingImogi((distractingTime.hour))

  const {
    compareProductiveImogi,
    compareProductiveTime,
    compareDistractingImogi,
    compareDistractingTime,
    compareSoftwareDevelopmentImogi,
    compareSoftwareTime,
  } = generateCompareMessage(compareData)

  return {
    totalHour: `:alarm_clock: 전체 시간 *${format(parseTime(summaryData.totalHours))}* :heartbeat: Pulse ${summaryData.productivityPulse}\n\n`,
    productiveTime: `:runner: 생산성 ${produtiveEmogi}\n>:alarm_clock: *${format(productiveTime)}* | ${summaryData.allProductivePercentage}% | ${compareProductiveImogi} ${compareProductiveTime}\n\n`,
    distractingTime: `:zany_face: 산만함 ${distractingEmogi}\n>:alarm_clock: *${format(distractingTime)}* | ${summaryData.allDistractingPercentage}% | ${compareDistractingImogi} ${compareDistractingTime}\n\n`,
    devTime: `:computer: 프로그램 개발 ${produtiveEmogi}\n>:alarm_clock: *${format(programTime)}* | ${summaryData.softwareDevelopmentPercentage}% | ${compareSoftwareDevelopmentImogi} ${compareSoftwareTime}`,
  }
}

export const generateWeeklyMessage = (weeklyData?: WeeklyData) => {
  if (isEmpty(weeklyData) || isNil(weeklyData)) {
    throw new Error('WeeklyData generate failed.')
  }

  const { score } = generateWeeklyActivityData(weeklyData.activity)
  const efficiencies = generateWeeklyefficiencyData(weeklyData.efficiency)
  const overviews = generateWeeklyOverviewData(weeklyData.overview)

  const totalTime = (pipe(
    map((x: any) => x.timeSpent / (60 * 60)),
    sum,
    parseTime,
    format,
  ))(efficiencies)

  return {
    totalHour: `:alarm_clock: 전체 시간 *${totalTime}* :100: Score: ${score}\n\n`,
    efficiencyRank: `:chart: 어떻게 시간을 썼나요?\n${efficiencies.map((efficiency) => `${efficiency.rank}. ${efficiency.efficiency} ${efficiency.totalTimeSpent}, 평균 ${efficiency.avgTimeSpent}\n`).join('')}`,
    overviewRank: `어디에 시간을 썼나요?\n${overviews.map((overview) => `${overview.rank}. ${overview.totalTimeSpent}, 평균 ${overview.avgTimeSpent}을 ${overview.category}에 사용하였습니다.\n`).join('')}`,
  }
}
