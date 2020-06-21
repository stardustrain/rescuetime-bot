import { isNil, pipe, toPairs, map, join } from 'ramda'

import { Overview, Activity, Efficiency } from '../@types/models'

const floor = Math.floor

//NOTE: time unit is hour. ex) 1h 30min -> time: 1.5
export const parseTime = (time?: number) => {
  if (isNil(time)) {
    throw Error('Wrong time.')
  }

  const absTime = Math.abs(time)
  const hour = floor(absTime)
  const mins = hour === 0 ? floor(absTime * 60) : floor(absTime * 60 - hour * 60)

  return {
    hour,
    mins,
    isDecrease: time < 0,
  }
}

export const getQueryString = (queryObejct: { [key: string]: string | number }) => {
  if (isNil(queryObejct)) {
    throw Error('Wrong query object.')
  }

  return pipe(
    (obj: { [key: string]: string | number }) => toPairs<string | number>(obj),
    (xs) => map((x) => join('=', x), xs),
    join('&'),
  )(queryObejct)
}

export const parseOverview = (overview: Overview) =>
  map(
    (row) => ({
      rank: row[0],
      timeSpent: row[1],
      category: row[3],
    }),
    overview.rows,
  )

export const parseActivity = (activity: Activity) =>
  map(
    (row) => ({
      rank: row[0],
      timeSpent: row[1],
      activity: row[3],
      category: row[4],
      weightedProductivty: row[5],
    }),
    activity.rows,
  )

export const parseEfficiency = (efficiency: Efficiency) =>
  map(
    (row) => ({
      rank: row[0],
      timeSpent: row[1],
      efficiency: row[3],
    }),
    efficiency.rows,
  )

export type ParsedOverview = ReturnType<typeof parseOverview>[0]
export type ParsedActivity = ReturnType<typeof parseActivity>[0]
export type ParsedEfficiency = ReturnType<typeof parseEfficiency>[0]
