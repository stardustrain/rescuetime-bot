import { request, generateUrl, requestAll } from '../utils/api'
import { getQueryString } from '../utils/parseUtils'
import { getDayilDataSummary, compareWithYesterday } from './dailyReportUtils'
import {
  parseOverview,
  parseActivity,
  parseEfficiency,
  getWeekRange,
} from './weeklyReportUtils'

import { DailySummary } from '../@types/models'

export const getDailyData = async () => {
  try {
    const { data } = await request<DailySummary[]>(
      generateUrl('/daily_summary_feed'),
    )
    return {
      summary: getDayilDataSummary(data),
      compareYesterday: compareWithYesterday(data),
    }
  } catch (e) {
    console.error(e)
  }
}

export const getWeeklyData = async () => {
  try {
    const { from, to } = getWeekRange()

    const queryObject = {
      format: 'json',
      rb: '2020-01-05',
      re: '2020-01-11',
      rk: 'overview',
    }

    const overviewUrl = `${generateUrl('/data')}&${getQueryString(
      queryObject,
    )}`
    const activityUrl = `${generateUrl('/data')}&${getQueryString({
      ...queryObject,
      rk: 'activity',
    })}`
    const efficiencyUrl = `${generateUrl('/data')}&${getQueryString({
      ...queryObject,
      rk: 'efficiency',
    })}`

    const [overview, activity, efficiency] = await requestAll([
      overviewUrl,
      activityUrl,
      efficiencyUrl,
    ])

    return {
      from,
      to,
      overview: parseOverview(overview),
      activity: parseActivity(activity),
      efficiency: parseEfficiency(efficiency),
    }
  } catch (e) {
    console.error(e)
  }
}
