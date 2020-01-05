import { parseOverview } from '../weeklyReportUtils'

const overview: any = {
  rowHeaders: [
    'Rank',
    'Time Spent (seconds)',
    'Number of People',
    'Category'
  ],
  rows: [
    [1, 43490, 1, 'Software Development'],
    [2, 10513, 1, 'Communication & Scheduling'],
    [3, 7172, 1, 'Uncategorized'],
    [4, 4720, 1, 'Business'],
    [5, 3605, 1, 'Utilities'],
  ]
}

describe('weeklyReportUtils.ts', () => {
  describe('parseOverview(overview: Overview)', () => {
    test('should return array of object which pairs row header and row.', () => {
      expect(parseOverview(overview)).toEqual([{
        rank: 1,
        timeSpent: 43490,
        category: 1,
      }, {
        rank: 2,
        timeSpent: 10513,
        category: 2,
      }])
    })
  })
})
