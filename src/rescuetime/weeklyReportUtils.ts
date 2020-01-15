import { map } from 'ramda'
import dayjs from 'dayjs'

import { Overview, Activity, Efficiency } from '../@types/models'

export type ParsedOverview = ReturnType<typeof parseOverview>[0]
export type ParsedActivity = ReturnType<typeof parseActivity>[0]
export type Parsedefficiency = ReturnType<typeof parseEfficiency>[0]

export const getWeekRange = () => {
  const currentDate = dayjs()
  const from = currentDate.subtract(6, 'day').format('YYYY-MM-DD')
  const to = currentDate.subtract(1, 'day').format('YYYY-MM-DD')

  return {
    from,
    to,
  }
}

export const parseOverview = (overview: Overview) =>
  map(
    row => ({
      rank: row[0],
      timeSpent: row[1],
      category: row[3],
    }), overview.rows)

export const parseActivity = (activity: Activity) =>
  map(
    row => ({
      rank: row[0],
      timeSpent: row[1],
      activity: row[3],
      category: row[4],
      weightedProductivty: row[5],
    }), activity.rows)

export const parseEfficiency = (efficiency: Efficiency) =>
  map(
    row => ({
      rank: row[0],
      timeSpent: row[1],
      efficiency: row[3],
    }), efficiency.rows)
