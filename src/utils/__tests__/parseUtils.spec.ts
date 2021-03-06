import { parseTime, getQueryString, parseActivity, parseEfficiency, parseOverview } from '../parseUtils'

const emptyData: any = {
  rowHeaders: [],
  rows: [],
}

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
      expect(
        getQueryString({
          a: 1,
          b: 2,
          c: 'test',
        }),
      ).toEqual('a=1&b=2&c=test')
    })
  })

  describe('parseOverview(overview: Overview)', () => {
    test('should return first 5 array of object which pairs row header and row.', () => {
      const overview: any = {
        rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Category'],
        rows: [
          [1, 43490, 1, 'Software Development'],
          [2, 10513, 1, 'Communication & Scheduling'],
          [3, 7172, 1, 'Uncategorized'],
          [4, 4720, 1, 'Business'],
          [5, 3605, 1, 'Utilities'],
          [6, 3126, 1, 'Reference & Learning'],
          [7, 1403, 1, 'News & Opinion'],
        ],
      }

      expect(parseOverview(overview)).toEqual([
        {
          rank: 1,
          timeSpent: 43490,
          category: 'Software Development',
        },
        {
          rank: 2,
          timeSpent: 10513,
          category: 'Communication & Scheduling',
        },
        {
          rank: 3,
          timeSpent: 7172,
          category: 'Uncategorized',
        },
        {
          rank: 4,
          timeSpent: 4720,
          category: 'Business',
        },
        {
          rank: 5,
          timeSpent: 3605,
          category: 'Utilities',
        },
        {
          rank: 6,
          timeSpent: 3126,
          category: 'Reference & Learning',
        },
        {
          rank: 7,
          timeSpent: 1403,
          category: 'News & Opinion',
        },
      ])
    })

    test('should return empty array when received empty overview.', () => {
      expect(parseOverview(emptyData)).toEqual([])
    })
  })

  describe('parseActivity(activity: Activity)', () => {
    test('should return object which pairs row header and row.', () => {
      const activity: any = {
        rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Activity', 'Category', 'Productivity'],
        rows: [
          [1, 22015, 1, 'Visual Studio Code', 'Editing & IDEs', 2],
          [2, 10002, 1, 'github.com', 'General Software Development', 2],
          [3, 7423, 1, 'Slack', 'Instant Message', -1],
          [4, 5542, 1, 'Terminal', 'Systems Operations', 2],
          [5, 3185, 1, 'ondemandkorea.atlassian.net', 'General Business', 2],
          [6, 3012, 1, 'felipecastro.com', 'Uncategorized', 0],
        ],
      }

      expect(parseActivity(activity)).toEqual([
        {
          rank: 1,
          timeSpent: 22015,
          activity: 'Visual Studio Code',
          category: 'Editing & IDEs',
          weightedProductivty: 2,
        },
        {
          rank: 2,
          timeSpent: 10002,
          activity: 'github.com',
          category: 'General Software Development',
          weightedProductivty: 2,
        },
        {
          rank: 3,
          timeSpent: 7423,
          activity: 'Slack',
          category: 'Instant Message',
          weightedProductivty: -1,
        },
        {
          rank: 4,
          timeSpent: 5542,
          activity: 'Terminal',
          category: 'Systems Operations',
          weightedProductivty: 2,
        },
        {
          rank: 5,
          timeSpent: 3185,
          activity: 'ondemandkorea.atlassian.net',
          category: 'General Business',
          weightedProductivty: 2,
        },
        {
          rank: 6,
          timeSpent: 3012,
          activity: 'felipecastro.com',
          category: 'Uncategorized',
          weightedProductivty: 0,
        },
      ])
    })

    test('should return empty array when received empty activity.', () => {
      expect(parseActivity(emptyData)).toEqual([])
    })
  }),
    describe('parseEfficiency(efficiency: Efficiency)', () => {
      test('should return first 5 array of object which pairs row header and row.', () => {
        const efficiency: any = {
          rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Efficiency'],
          rows: [
            [1, 48287, 1, 'Very Productive Time'],
            [2, 14049, 1, 'Neutral Time'],
            [3, 7454, 1, 'Distracting Time'],
            [4, 2944, 1, 'Productive Time'],
            [5, 2653, 1, 'Very Distracting Time'],
          ],
        }
        expect(parseEfficiency(efficiency)).toEqual([
          {
            rank: 1,
            timeSpent: 48287,
            efficiency: 'Very Productive Time',
          },
          {
            rank: 2,
            timeSpent: 14049,
            efficiency: 'Neutral Time',
          },
          {
            rank: 3,
            timeSpent: 7454,
            efficiency: 'Distracting Time',
          },
          {
            rank: 4,
            timeSpent: 2944,
            efficiency: 'Productive Time',
          },
          {
            rank: 5,
            timeSpent: 2653,
            efficiency: 'Very Distracting Time',
          },
        ])
      })

      test('should return empty array when received empty efficiency.', () => {
        expect(parseEfficiency(emptyData)).toEqual([])
      })
    })
})
