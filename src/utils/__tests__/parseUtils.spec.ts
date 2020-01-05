import { parseTime, getQueryString } from '../parseUtils'

describe('rescuetimeUtils.ts', () => {
  describe('parseTime(time?: number) ', () => {
    test('should return object includes hour and mins.', () => {
      expect(parseTime(-0.17)).toEqual({
        hour: 0,
        mins: 10,
        isDecrease: true,
      })

      expect(parseTime(1.53)).toEqual({
        hour: 1,
        mins: 31,
        isDecrease: false,
      })

      expect(parseTime(0)).toEqual({
        hour: 0,
        mins: 0,
        isDecrease: false,
      })
    })

    test('should throw error when received invalid time.', () => {
      expect(() => parseTime()).toThrow('Wrong time.')
    })
  })

  describe('getQueryString(queryObejct: { [key: string]: string })', () => {
    test('should return query string from query object.', () => {
      expect(getQueryString({})).toEqual('')
      expect(getQueryString({
        a: 1,
        b: 2,
        c: 'test'
      })).toEqual('a=1&b=2&c=test')
    })
  })
})
