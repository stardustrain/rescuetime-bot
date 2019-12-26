import { request } from '../utils/api'

import { getDayilDataSummary, compareWithYesterday } from './rescuetimeUtils'

import { DailySummary } from '../@types/models'

export const getDailyData = async () => {
  try {
    const { data } = await request<DailySummary[]>('/daily_summary_feed')
    return {
      summary: getDayilDataSummary(data),
      compareYesterday: compareWithYesterday(data)
    }
  } catch (e) {
    console.error(e)
  }
}

export const getWeeklyData = async () => {

}
