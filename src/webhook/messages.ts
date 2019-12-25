import { gt, lte, cond, always, T } from 'ramda'
import { parseTime } from '../rescuetime/rescuetimeUtils'
import { DailySummary } from '../@types/models'

const STANDARD_PRODUCTIVE_TIME = 4
const MINIMUM_PRODUCTIVE_TIME = 2
const STANDARD_DISTRACTING_TIME = 2
const MINIMUM_DISTRACTING_TIME = 1

const getProductiveImogi = cond<number, string>([
  [lte(STANDARD_PRODUCTIVE_TIME), always(':clap:')],
  [gt(MINIMUM_PRODUCTIVE_TIME), always(':weary:')],
  [T, always('')]
])

const getDistractingImogi = cond<number, string>([
  [gt(MINIMUM_DISTRACTING_TIME), always(':clap:')],
  [lte(STANDARD_DISTRACTING_TIME), always(':weary:')],
  [T, always('')]
])

const getChartImogi = (compareTime: number) => (
  compareTime > 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:'
)

const format = (time: { hour: number, mins: number } | string) => {
  if (typeof time === 'string') { return time }
  return `${time.hour}시간 ${time.mins}분 `
}

export const generateCompareMessage = (data?: {[key: string]: any}) => {
  if (!data) {
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
  if (!summaryData) {
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
    devTime: `:computer: 프로그램 개발 ${produtiveEmogi}\n>:alarm_clock: *${format(programTime)}* | ${summaryData.softwareDevelopmentPercentage}% | ${compareSoftwareDevelopmentImogi} ${compareSoftwareTime}`
  }
}
