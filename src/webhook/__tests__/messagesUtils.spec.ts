import {
  getProductiveImogi,
  getDistractingImogi,
  getScoreImogi,
  generateWeeklyOverviewData,
  generateWeeklyActivityData,
  generateWeeklyefficiencyData,
  getScaledActivityScore,
  getAvgTimeSpent,
  getTotalTimeSpent,
} from '../messageUtils'

describe('messageUtils.ts', () => {
  describe('getProductiveImogi(hour: number)', () => {
    test('should return clap imogi when gte 4 hours.', () => {
      expect(getProductiveImogi(4)).toEqual(':clap:')
      expect(getProductiveImogi(5)).toEqual(':clap:')
    })

    test('should return weary imogi when lt 2 hours.', () => {
      expect(getProductiveImogi(1)).toEqual(':weary:')
      expect(getProductiveImogi(2)).toEqual('')
    })

    test('should return empty when lt 4 hours and gte 2 hours.', () => {
      expect(getProductiveImogi(2)).toEqual('')
      expect(getProductiveImogi(3)).toEqual('')
    })
  })

  describe('getDistractingImogi(hour: number)', () => {
    test('should return clap imogi when lt 1 hours.', () => {
      expect(getDistractingImogi(0)).toEqual(':clap:')
      expect(getDistractingImogi(1)).toEqual('')
    })

    test('should return weary imogi when gte 2 hours.', () => {
      expect(getDistractingImogi(1)).toEqual('')
      expect(getDistractingImogi(2)).toEqual(':weary:')
      expect(getDistractingImogi(3)).toEqual(':weary:')
    })

    test('should return empty when gte 1 hours and lt 2 hours.', () => {
      expect(getDistractingImogi(0)).toEqual(':clap:')
      expect(getDistractingImogi(1)).toEqual('')
      expect(getDistractingImogi(2)).toEqual(':weary:')
      expect(getDistractingImogi(3)).toEqual(':weary:')
    })
  })

  describe('getScoreImogi()', () => {
    test('should return :goodjob: when received score that gte 80.', () => {
      expect(getScoreImogi(100)).toEqual(':goodjob:')
      expect(getScoreImogi(90)).toEqual(':goodjob:')
      expect(getScoreImogi(80)).toEqual(':goodjob:')
      expect(getScoreImogi(79)).not.toEqual(':goodjob:')
    })

    test('should return empty string when received score that lt 80 and gte 50.', () => {
      expect(getScoreImogi(80)).not.toEqual('')
      expect(getScoreImogi(79)).toEqual('')
      expect(getScoreImogi(50)).toEqual('')
      expect(getScoreImogi(49)).not.toEqual('')
    })

    test('should return :skull: when received score that lt 50.', () => {
      expect(getScoreImogi(50)).not.toEqual(':skull:')
      expect(getScoreImogi(49)).toEqual(':skull:')
      expect(getScoreImogi(25)).toEqual(':skull:')
    })
  })

  describe('getTotalTimeSpent(time: number)', () => {
    test('should return formatted total spented time that 6 days.', () => {
      expect(getTotalTimeSpent(46687)).toEqual('12시간 58분')
      expect(getTotalTimeSpent(14531)).toEqual('4시간 2분')
      expect(getTotalTimeSpent(3953)).toEqual('1시간 5분')
    })
  })

  describe('getAvgTimeSpent(time: number)', () => {
    test('should return formatted spented time that average on 6 days.', () => {
      expect(getAvgTimeSpent(46687)).toEqual('2시간 9분')
      expect(getAvgTimeSpent(14531)).toEqual('40분')
      expect(getAvgTimeSpent(3953)).toEqual('10분')
    })
  })

  describe('generateWeeklyOverviewData(overviews?: ParsedOverview)', () => {
    test('should return generated data when recieved valid data.', () => {
      expect(
        generateWeeklyOverviewData([
          { rank: 1, timeSpent: 46687, category: 'Software Development' },
          { rank: 2, timeSpent: 14531, category: 'Communication & Scheduling' },
          { rank: 3, timeSpent: 3953, category: 'Business' },
          { rank: 4, timeSpent: 3331, category: 'Reference & Learning' },
          { rank: 5, timeSpent: 2940, category: 'Utilities' },
        ]),
      ).toEqual([
        { rank: 1, totalTimeSpent: '12시간 58분', avgTimeSpent: '2시간 9분', category: 'Software Development' },
        { rank: 2, totalTimeSpent: '4시간 2분', avgTimeSpent: '40분', category: 'Communication & Scheduling' },
        { rank: 3, totalTimeSpent: '1시간 5분', avgTimeSpent: '10분', category: 'Business' },
        { rank: 4, totalTimeSpent: '55분', avgTimeSpent: '9분', category: 'Reference & Learning' },
        { rank: 5, totalTimeSpent: '49분', avgTimeSpent: '8분', category: 'Utilities' },
      ])
    })

    test('should rasing error when received invalid data.', () => {
      const empty: any = {}
      expect(() => generateWeeklyOverviewData()).toThrow('Overview generate failed.')
      expect(() => generateWeeklyOverviewData(empty)).toThrow('Overview generate failed.')
    })
  })

  describe('getScaledActivityScore(activityScores: ParsedActivity[])', () => {
    test('should return scaled score.', () => {
      expect(
        getScaledActivityScore({
          activities: [
            {
              rank: 1,
              timeSpent: 28930,
              activity: 'Visual Studio Code',
              category: 'Editing & IDEs',
              weightedProductivty: 2,
            },
            {
              rank: 2,
              timeSpent: 10946,
              activity: 'Slack',
              category: 'Instant Message',
              weightedProductivty: -1,
            },
            {
              rank: 3,
              timeSpent: 5580,
              activity: 'github.com',
              category: 'General Software Development',
              weightedProductivty: 2,
            },
            {
              rank: 4,
              timeSpent: 3541,
              activity: 'Terminal',
              category: 'Systems Operations',
              weightedProductivty: 2,
            },
            {
              rank: 5,
              timeSpent: 2987,
              activity: 'localhost:3000',
              category: 'General Software Development',
              weightedProductivty: 2,
            },
          ],
        }),
      ).toEqual(32)

      expect(
        getScaledActivityScore({
          activities: [
            {
              rank: 1,
              timeSpent: 4 * 6 * 3600,
              activity: 'Visual Studio Code',
              category: 'Editing & IDEs',
              weightedProductivty: 2,
            },
          ],
        }),
      ).toEqual(80)

      expect(
        getScaledActivityScore({
          activities: [
            {
              rank: 1,
              timeSpent: 5 * 6 * 3600,
              activity: 'Visual Studio Code',
              category: 'Editing & IDEs',
              weightedProductivty: 2,
            },
          ],
        }),
      ).toEqual(100)

      expect(
        getScaledActivityScore({
          activities: [
            {
              rank: 1,
              timeSpent: 4821,
              activity: 'Visual Studio Code',
              category: 'Editing & IDEs',
              weightedProductivty: 2,
            },
            {
              rank: 2,
              timeSpent: 1824,
              activity: 'Slack',
              category: 'Instant Message',
              weightedProductivty: -1,
            },
            {
              rank: 3,
              timeSpent: 930,
              activity: 'github.com',
              category: 'General Software Development',
              weightedProductivty: 2,
            },
            {
              rank: 4,
              timeSpent: 708,
              activity: 'Terminal',
              category: 'Systems Operations',
              weightedProductivty: 2,
            },
            {
              rank: 5,
              timeSpent: 497,
              activity: 'localhost:3000',
              category: 'General Software Development',
              weightedProductivty: 2,
            },
          ],
          isDayily: true,
        }),
      ).toEqual(33)
    })
  })

  describe('generateWeeklyActivityData(activities?: ParsedActivity[])', () => {
    test('should return generated data when recieved valid data.', () => {
      expect(
        generateWeeklyActivityData([
          {
            rank: 1,
            timeSpent: 28930,
            activity: 'Visual Studio Code',
            category: 'Editing & IDEs',
            weightedProductivty: 2,
          },
          {
            rank: 2,
            timeSpent: 10946,
            activity: 'Slack',
            category: 'Instant Message',
            weightedProductivty: -1,
          },
          {
            rank: 3,
            timeSpent: 5580,
            activity: 'github.com',
            category: 'General Software Development',
            weightedProductivty: 2,
          },
          {
            rank: 4,
            timeSpent: 3541,
            activity: 'Terminal',
            category: 'Systems Operations',
            weightedProductivty: 2,
          },
          {
            rank: 5,
            timeSpent: 2987,
            activity: 'localhost:3000',
            category: 'General Software Development',
            weightedProductivty: 2,
          },
        ]),
      ).toEqual({
        score: 32,
        rows: [
          { rank: 1, totalTimeSpent: '8시간 2분', avgTimeSpent: '1시간 20분', activity: 'Visual Studio Code' },
          { rank: 2, totalTimeSpent: '3시간 2분', avgTimeSpent: '30분', activity: 'Slack' },
          { rank: 3, totalTimeSpent: '1시간 33분', avgTimeSpent: '15분', activity: 'github.com' },
          { rank: 4, totalTimeSpent: '59분', avgTimeSpent: '9분', activity: 'Terminal' },
          { rank: 5, totalTimeSpent: '49분', avgTimeSpent: '8분', activity: 'localhost:3000' },
        ],
      })
    })

    test('should rasing error when received invalid data.', () => {
      const empty: any = {}
      expect(() => generateWeeklyActivityData()).toThrow('Activity generate failed.')
      expect(() => generateWeeklyActivityData(empty)).toThrow('Activity generate failed.')
    })
  })

  describe('generateWeeklyefficiencyData(efficiencies?: ParsedEfficiency[])', () => {
    test('should return generated data when received valid data.', () => {
      expect(
        generateWeeklyefficiencyData([
          { rank: 1, timeSpent: 53080, efficiency: 'Very Productive Time' },
          { rank: 2, timeSpent: 10990, efficiency: 'Distracting Time' },
          { rank: 3, timeSpent: 10106, efficiency: 'Neutral Time' },
          { rank: 4, timeSpent: 1967, efficiency: 'Productive Time' },
          { rank: 5, timeSpent: 1283, efficiency: 'Very Distracting Time' },
        ]),
      ).toEqual([
        { timeSpent: 55047, totalTimeSpent: '15시간 17분', avgTimeSpent: '2시간 32분', efficiency: 'Productive Time' },
        { timeSpent: 12273, totalTimeSpent: '3시간 24분', avgTimeSpent: '34분', efficiency: 'Distracting Time' },
        { timeSpent: 10106, totalTimeSpent: '2시간 48분', avgTimeSpent: '28분', efficiency: 'Neutral Time' },
      ])
    })

    test('should rasing error when received invalid data.', () => {
      const empty: any = {}
      expect(() => generateWeeklyefficiencyData()).toThrow('Efficiency generate failed.')
      expect(() => generateWeeklyefficiencyData(empty)).toThrow('Efficiency generate failed.')
    })
  })
})
