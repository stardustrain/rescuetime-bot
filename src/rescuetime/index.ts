import dayjs from 'dayjs'

import { request, generateUrl, requestAll } from '../utils/api'
import { getQueryString } from '../utils/parseUtils'
import { getDayilDataSummary, compareWithYesterday } from './dailyReportUtils'
import { parseOverview, parseActivity, parseEffieciency } from './weeklyReportUtils'

import { DailySummary } from '../@types/models'

export const getDailyData = async () => {
  try {
    const { data } = await request<DailySummary[]>(generateUrl('/daily_summary_feed'))
    return {
      summary: getDayilDataSummary(data),
      compareYesterday: compareWithYesterday(data)
    }
  } catch (e) {
    console.error(e)
  }
}

export const getWeeklyData = async () => {
  try {
    const currentDate = dayjs()
    const from = currentDate.subtract(6, 'day').format('YYYY-MM-DD')
    const to = currentDate.subtract(1, 'day').format('YYYY-MM-DD')

    const queryObject = {
      format: 'json',
      rb: from,
      re: to,
      rk: 'overview',
    }

    const overviewUrl = `${generateUrl('/data')}&${getQueryString(queryObject)}`
    const activityUrl = `${generateUrl('/data')}&${getQueryString({
      ...queryObject,
      rk: 'activity',
    })}`
    const efficiencyUrl = `${generateUrl('/data')}&${getQueryString({
      ...queryObject,
      rk: 'efficiency',
    })}`

    const [
      overview,
      activity,
      efficiency,
    ] = await requestAll([overviewUrl, activityUrl, efficiencyUrl])

    return {
      overview: parseOverview(overview),
      activity: parseActivity(activity),
      efficiency: parseEffieciency(efficiency),
    }
  } catch (e) {
    console.error(e)
  }
}
