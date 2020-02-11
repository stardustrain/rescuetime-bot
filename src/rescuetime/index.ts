import { requestAll } from '../utils/api'
import { getDayilDataSummary, compareWithYesterday } from './dailyReportUtils'
import {
  parseOverview,
  parseActivity,
  parseEfficiency,
} from './weeklyReportUtils'
import { dailyDataRequestUrls, weeklyDataRequestUrls } from '../utils/urls'

export const getDailyData = async () => {
  const {
    todayEfficiencyUrl,
    yesterDayEfficiencyUrl,
    todayOverviewUrl,
    yesterdayOverviewUrl,
    activityUrl,
    today,
  } = dailyDataRequestUrls

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
    const {
      overviewUrl,
      activityUrl,
      efficiencyUrl,
      from,
      to,
    } = weeklyDataRequestUrls

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
