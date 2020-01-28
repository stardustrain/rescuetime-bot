import { mergeTimeByCategory, getSpentTime } from '../misc'

describe('misc.ts', () => {
  describe('mergeTimeByCategory(efficiencies: Parsedefficiency[])', () => {
    test('should return merged time spent data by category.', () => {
      expect(mergeTimeByCategory([
        { rank: 1, timeSpent: 53080, efficiency: 'Very Productive Time' },
        { rank: 2, timeSpent: 10990, efficiency: 'Distracting Time' },
        { rank: 3, timeSpent: 10106, efficiency: 'Neutral Time' },
        { rank: 4, timeSpent: 1967, efficiency: 'Productive Time' },
        { rank: 5, timeSpent: 1283, efficiency: 'Very Distracting Time' },
      ])).toEqual({
        productiveTime: 55047,
        distractingTime: 12273,
        neutralTime: 10106,
      })
    })
  })

  describe('getSpentTime(ce: Parsedefficiency)', () => {
    test('should return value of timeSpent.', () => {
      expect(getSpentTime({ rank: 1, timeSpent: 53080, efficiency: 'Very Productive Time' })).toEqual(53080)
    })

    test('should return 0 when received invalid Parsedefficiency.', () => {
      const empty: any = {}
      expect(getSpentTime(empty)).toEqual(0)
      expect(getSpentTime()).toEqual(0)
    })
  })
})
