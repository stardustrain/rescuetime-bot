import { isNil, pipe, toPairs, map, join } from 'ramda'

const floor = Math.floor

export const parseTime = (time?: number) => {
  if (isNil(time)) {
    throw Error('Wrong time.')
  }

  const absTime = Math.abs(time)
  const hour = floor(absTime)
  const mins = (hour === 0) ? floor(absTime * 60) : floor((absTime * 60) - (hour * 60))

  return {
    hour,
    mins,
    isDecrease: time < 0
  }
}

export const getQueryString = (queryObejct: { [key: string]: string | number }) => {
  if (isNil(queryObejct)) {
    throw Error('Wrong query object.')
  }

  return (pipe(
    (obj: { [key: string]: string | number }) => toPairs<string | number>(obj),
    (xs) => map((x) => join('=', x), xs),
    join('&')
  ))(queryObejct)
}
