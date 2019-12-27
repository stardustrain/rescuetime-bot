import { gt, lte, cond, always, T, values, all, equals } from 'ramda'

const STANDARD_PRODUCTIVE_TIME = 4
const MINIMUM_PRODUCTIVE_TIME = 2
const STANDARD_DISTRACTING_TIME = 2
const MINIMUM_DISTRACTING_TIME = 1

export const getProductiveImogi = cond<number, string>([
  [lte(STANDARD_PRODUCTIVE_TIME), always(':clap:')],
  [gt(MINIMUM_PRODUCTIVE_TIME), always(':weary:')],
  [T, always('')]
])

export const getDistractingImogi = cond<number, string>([
  [gt(MINIMUM_DISTRACTING_TIME), always(':clap:')],
  [lte(STANDARD_DISTRACTING_TIME), always(':weary:')],
  [T, always('')]
])

export const getChartImogi = (compareTime: number) => (
  compareTime > 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:'
)

export const format = (time: { hour: number, mins: number } | string) => {
  if (typeof time === 'string') { return time }

  return (cond<{ hour: number, mins: number }, string>([
    [(x) => all(equals(0))(values(x)), always('')],
    [(x) => equals(0, x.hour), always(`${time.mins}분`)],
    [(x) => equals(0, x.mins), always(`${time.hour}시간`)],
    [T, always(`${time.hour}시간 ${time.mins}분`)]
  ]))(time)
}
