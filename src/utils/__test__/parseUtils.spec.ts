import { parseTime } from '../parseUtils'

describe('rescuetimeUtils.ts', () => {
  describe('parseTime(time?: number) ', () => {
    test('should return object includes hour and mins.', () => {
      expect(parseTime(-0.17)).toEqual({
        hour: 0,
        mins: -11,
      })

      expect(parseTime(1.53)).toEqual({
        hour: 1,
        mins: 31,
      })
    })

    test('should throw error when received invalid time.', () => {
      expect(() => parseTime()).toThrow('Wrong time.')
    })
  })
})
