import { pipe, toPairs, map, join, zip } from 'ramda'

import { request, generateUrl } from '../utils/api'
import { getDayilDataSummary, compareWithYesterday } from './rescuetimeUtils'

import { DailySummary, WeeklyData } from '../@types/models'

const getQueryString = (queryObejct: { [key: string]: string }) => (pipe(
  (obj: { [key: string]: string }) => toPairs<string>(obj),
  (xs) => map((x) => x.join('='), xs),
  join('&')
))(queryObejct)

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
    const queryString = getQueryString({
      format: 'json',
      rb: '2019-12-27',
      re: '2019-12-27',
      rk: 'overview',
    })

    const url = `${generateUrl('/data')}&${queryString}`
    const { data } = await request<WeeklyData>(url)

  } catch (e) {
    console.error(e)
  }
}
