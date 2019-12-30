import { gt, lte, cond, always, T, values, all, equals, pick } from 'ramda'

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

export const format = (time: { hour: number, mins: number, isDecrease: boolean } | string) => {
  if (typeof time === 'string') { return time }

  const formattedMessage = (cond<{ hour: number, mins: number, isDecrease: boolean }, string>([
    [(x) => all(equals(0))(values(pick(['hour', 'mins'], x))), always('')],
    [(x) => equals(0, x.hour), always(`${time.mins}분`)],
    [(x) => equals(0, x.mins), always(`${time.hour}시간`)],
    [T, always(`${time.hour}시간 ${time.mins}분`)]
  ]))(time)

  return `${time.isDecrease ? '-' : ''}${formattedMessage}`
}
