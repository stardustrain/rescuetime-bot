import { getToday, getWeekRange } from './misc'
import { generateUrl } from './api'
import { getQueryString } from './parseUtils'

export const dailyDataRequestUrls = (() => {
  const t = getToday()
  const today = t.subtract(1, 'day').format('YYYY-MM-DD')
  const yesterday = t.subtract(2, 'day').format('YYYY-MM-DD')

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

  return {
    todayEfficiencyUrl,
    yesterDayEfficiencyUrl,
    todayOverviewUrl,
    yesterdayOverviewUrl,
    activityUrl,
    today,
  }
})()

export const weeklyDataRequestUrls = (() => {
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

  return {
    overviewUrl,
    activityUrl,
    efficiencyUrl,
    from,
    to,
  }
})()
