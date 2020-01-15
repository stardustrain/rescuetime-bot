import dayjs from 'dayjs'
import { generateUrl, requestAll } from '../utils/api'
import { getQueryString } from '../utils/parseUtils'
import { getDayilDataSummary, compareWithYesterday } from './dailyReportUtils'
import {
  parseOverview,
  parseActivity,
  parseEfficiency,
  getWeekRange,
} from './weeklyReportUtils'

export const getDailyData = async () => {
  const t = dayjs().subtract(1, 'day')
  const today = t.format('YYYY-MM-DD')
  const yesterday = t.subtract(1, 'day').format('YYYY-MM-DD')

  const queryObject = {
    format: 'json',
    rb: today,
    re: today,
    rk: 'efficiency',
  }

  const todayEfficiencyUrl = `${generateUrl('/data')}&${getQueryString(queryObject)}`
  const yesterDayEfficiencyUrl = `${generateUrl('/data')}&${getQueryString({
    ...queryObject,
    rb: yesterday,
    re: yesterday,
  })}`

  const todayOverviewUrl = `${generateUrl('/data')}&${getQueryString({
    ...queryObject,
    rk: 'overview',
  })}`
  const yesterdayOverviewUrl = `${generateUrl('/data')}&${getQueryString({
    ...queryObject,
    rb: yesterday,
    re: yesterday,
    rk: 'overview',
  })}`

  const activityUrl = `${generateUrl('/data')}&${getQueryString({
    ...queryObject,
    rk: 'activity',
  })}`

  try {
    const [todayEfficiency, yesterDayEfficiency, todayOverview, yesterdayOverview, activity] = await requestAll([
      todayEfficiencyUrl,
      yesterDayEfficiencyUrl,
      todayOverviewUrl,
      yesterdayOverviewUrl,
      activityUrl,
    ])

    const todaySummary = getDayilDataSummary({
      efficiency: todayEfficiency,
      overview: todayOverview,
      activity,
    })
    const yesterdaySummary = getDayilDataSummary({
      efficiency: yesterDayEfficiency,
      overview: yesterdayOverview,
      activity,
    })

    return {
      summary: todaySummary,
      compareYesterday: compareWithYesterday([todaySummary, yesterdaySummary]),
      date: today,
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
      rb: from,
      re: to,
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
