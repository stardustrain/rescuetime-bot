import { take, map } from 'ramda'

import { Overview, Activity, Efficiency } from '../@types/models'

export type ParsedOverview = ReturnType<typeof parseOverview>[0]
export type ParsedActivity = ReturnType<typeof parseActivity>[0]
export type Parsedefficiency = ReturnType<typeof parseefficiency>[0]

export const parseOverview = (overview: Overview) =>
  map((row) => ({
    rank: row[0],
    timeSpent: row[1],
    category: row[3],
  }), take(5, overview.rows))

export const parseActivity = (activity: Activity) =>
  map((row) => ({
    rank: row[0],
    timeSpent: row[1],
    activity: row[3],
    category: row[4],
    weightedProductivty: row[5],
  }), take(5, activity.rows))

export const parseefficiency = (efficiency: Efficiency) =>
  map((row) => ({
    rank: row[0],
    timeSpent: row[1],
    efficiency: row[3],
  }), efficiency.rows)
